import type { Workshop } from '@/lib/data'

/**
 * Erken kayıt son tarihi hesaplayıcı.
 *
 * data.ts'de son tarih "15 Ağustos" gibi insan okunur bir metin.
 * Burada gerçek tarihe çevirip kaç gün kaldığını hesaplıyoruz —
 * böylece "15 Ağustos'a kadar" yerine "6 gün kaldı" diyebiliyoruz.
 * Aciliyet, statik bir tarihten çok daha güçlü çalışır.
 */

const AYLAR: Record<string, number> = {
  ocak: 0, şubat: 1, subat: 1, mart: 2, nisan: 3, mayıs: 4, mayis: 4, haziran: 5,
  temmuz: 6, ağustos: 7, agustos: 7, eylül: 8, eylul: 8, ekim: 9, kasım: 10, kasim: 10, aralık: 11, aralik: 11,
}

/** "15 Ağustos" → Date (içinde bulunulan sezon) */
export function parseDeadline(text: string, now = new Date()): Date | null {
  const m = text.trim().toLowerCase().match(/^(\d{1,2})\s+([a-zçğıöşü]+)/)
  if (!m) return null
  const day = Number(m[1])
  const month = AYLAR[m[2]]
  if (month === undefined) return null

  let year = now.getFullYear()
  const candidate = new Date(year, month, day, 23, 59, 59)
  // Tarih geçmişte kaldıysa gelecek yılı varsay (sezon dönümü)
  if (candidate.getTime() < now.getTime() - 1000 * 60 * 60 * 24 * 200) year += 1
  return new Date(year, month, day, 23, 59, 59)
}

// ══════════════════════════════════════════════════════════════════
// AĞUSTOS KAMPANYASI — tüm programlarda geçerli sezon indirimi
//
// Program bazlı erken kayıtla birlikte çalışır: hangisi ucuzsa o
// gösterilir. Örneğin Broadway'in %20'lik erken kaydı bu %15'ten
// iyi olduğu için orada erken kayıt fiyatı korunur.
//
// Kampanya bitince tek yapılacak: active: false. Fiyatlar otomatik
// olarak listeye döner, hiçbir sayfada elle düzeltme gerekmez.
// ══════════════════════════════════════════════════════════════════
export const CAMPAIGN = {
  active: true,
  percent: 15,
  label: 'ağustos indirimi',
  /** Kampanyanın son günü — bu günün sonuna kadar geçerli. */
  endsAt: new Date(2026, 7, 31, 23, 59, 59), // 31 Ağustos 2026
  shortNote: 'Ağustos boyunca tüm programlarda %15 indirim',
} as const

/** Kampanya bugün geçerli mi? */
export function campaignActive(now = new Date()): boolean {
  return CAMPAIGN.active && now.getTime() <= CAMPAIGN.endsAt.getTime()
}

/** Kampanyanın bitimine kaç gün kaldı? Bitmişse 0. */
export function campaignDaysLeft(now = new Date()): number {
  const ms = CAMPAIGN.endsAt.getTime() - now.getTime()
  return ms <= 0 ? 0 : Math.ceil(ms / (1000 * 60 * 60 * 24))
}

/** Kampanyalı fiyat — 50₺'ye yuvarlanır, ekranda tuhaf rakam olmasın. */
export function campaignPrice(base: number): number {
  const raw = base * (1 - CAMPAIGN.percent / 100)
  return Math.round(raw / 50) * 50
}

export type EarlyBirdState =
  | { status: 'none' }
  | { status: 'expired' }
  | { status: 'active'; daysLeft: number; deadline: Date; saving: number; label: string }

export function earlyBirdState(w: Workshop, now = new Date()): EarlyBirdState {
  if (!w.priceEarlyBird || w.priceEarlyBird >= w.price) return { status: 'none' }

  const saving = w.price - w.priceEarlyBird

  // Son tarih yoksa kontenjan bazlıdır (ilk N kişi) — süresiz aktif
  if (!w.earlyBirdDeadline) {
    return {
      status: 'active',
      daysLeft: Infinity,
      deadline: new Date(8640000000000000),
      saving,
      label: w.earlyBirdSlots ? `ilk ${w.earlyBirdSlots} kişi` : 'erken kayıt',
    }
  }

  const deadline = parseDeadline(w.earlyBirdDeadline, now)
  if (!deadline) return { status: 'none' }

  const ms = deadline.getTime() - now.getTime()
  if (ms <= 0) return { status: 'expired' }

  const daysLeft = Math.ceil(ms / (1000 * 60 * 60 * 24))
  const label =
    daysLeft === 1 ? 'son gün' :
    daysLeft <= 10 ? `${daysLeft} gün kaldı` :
    `${w.earlyBirdDeadline}'a kadar`

  return { status: 'active', daysLeft, deadline, saving, label }
}

/**
 * Kart ve listelerde gösterilecek kısa fiyat özeti.
 *
 * İki indirim kaynağı var ve ikisi yarışıyor:
 *   1. Program bazlı erken kayıt (data.ts → priceEarlyBird)
 *   2. Ağustos kampanyası (tüm programlarda %15)
 * Katılımcı hangisi ucuzsa onu görür — indirimler üst üste binmiyor.
 */
export function priceSummary(w: Workshop, now = new Date()) {
  if (!w.price) return null

  const eb = earlyBirdState(w, now)
  const ebActive = eb.status === 'active'
  const ebPrice = ebActive ? w.priceEarlyBird! : w.price

  const campOn = campaignActive(now)
  const campPrice = campOn ? campaignPrice(w.price) : w.price

  // Daha ucuz olan kazanır
  const useCampaign = campOn && campPrice < ebPrice
  const current = Math.min(ebPrice, campPrice)
  const discounted = current < w.price

  let urgency: string | null = null
  let hot = false

  if (useCampaign) {
    const dLeft = campaignDaysLeft(now)
    urgency =
      dLeft === 1 ? 'kampanya son gün' :
      dLeft <= 10 ? `kampanyaya ${dLeft} gün` :
      CAMPAIGN.label
    hot = dLeft <= 10
  } else if (ebActive) {
    urgency = eb.label
    hot = eb.daysLeft <= 10
  }

  return {
    current,
    original: discounted ? w.price : null,
    urgency,
    /** 10 günden az kaldıysa vurgulu göster */
    hot,
    /** Bu fiyat ağustos kampanyasından mı geliyor? */
    fromCampaign: useCampaign,
  }
}
