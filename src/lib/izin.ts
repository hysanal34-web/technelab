/**
 * Çerez ve ölçüm izni — tek kaynak.
 *
 * NEDEN VAR: 15 Ekim 2026'ya kadar Meta Pixel ve Google etiketi her ziyaretçide
 * izin sorulmadan yükleniyordu. KVKK Kurulu'nun çerez rehberine göre (2022)
 * zorunlu olmayan analitik ve pazarlama çerezleri açık rıza gerektiriyor.
 * Bu dosya rızanın nasıl saklandığını tanımlar; tarayıcı (banner, piksel)
 * ve sunucu (CAPI, dönüşüm kaydı) aynı çerezi aynı fonksiyonla okur.
 *
 * Bu dosya hem istemcide hem sunucuda çalışır: `server-only` ya da
 * tarayıcı API'si içermez.
 *
 * KATEGORİLER
 *   zorunlu   → her zaman açık. Oturum, form güvenliği, bu tercih çerezinin kendisi.
 *   analitik  → Google Analytics çerezleri, sitenin kendi ziyaretçi kimliği
 *               (tekil tıklama sayımı), reklam kaynağı (UTM) çerezi.
 *   pazarlama → Meta Pixel, Google Ads, reklam tıklama kimlikleri
 *               (fbclid/_fbc, gclid), Meta Conversions API'ye tarayıcı
 *               sinyallerinin (fbp, fbc, IP, tarayıcı bilgisi) aktarımı.
 *
 * E-posta/telefonun şifrelenerek Meta'ya aktarımı bu çerezle DEĞİL, formdaki
 * ayrı "reklam ölçümü" kutusuyla verilen açık rızayla yapılır (bkz. olcumSunucu).
 */

export const IZIN_CEREZI = 'tl_izin'

/** Metin değişirse sürümü artır: eski rızalar geçersiz sayılır, banner yeniden çıkar. */
export const IZIN_SURUMU = 1

/** 6 ay. Rıza süresiz olmamalı; yarım yılda bir yeniden sorulması makul. */
export const IZIN_GUN = 180

export type Izin = {
  /** analitik */
  analitik: boolean
  /** pazarlama */
  pazarlama: boolean
  /** Verildiği an (ms). */
  zaman: number
}

/** Çerez biçimi: `v1.a1.p0.t1760000000000` — kısa, JSON kaçış derdi yok. */
export function izniYaz(iz: Izin): string {
  return `v${IZIN_SURUMU}.a${iz.analitik ? 1 : 0}.p${iz.pazarlama ? 1 : 0}.t${iz.zaman}`
}

/** Geçersiz, eski sürüm ya da boş değer → null (karar verilmemiş sayılır). */
export function izniCoz(deger: string | undefined | null): Izin | null {
  if (!deger) return null
  const m = /^v(\d+)\.a([01])\.p([01])\.t(\d{10,14})$/.exec(decodeURIComponent(deger).trim())
  if (!m) return null
  if (Number(m[1]) !== IZIN_SURUMU) return null
  return { analitik: m[2] === '1', pazarlama: m[3] === '1', zaman: Number(m[4]) }
}

/** Reklam kaynağı (UTM + tıklama kimlikleri) çerezi. Analitik ya da pazarlama izniyle yazılır. */
export const KAYNAK_CEREZI = 'tl_kaynak'

/** Sitenin kendi anonim ziyaretçi kimliği. Yalnızca analitik izniyle. */
export const ZIYARETCI_CEREZI = 'tl_ziyaretci'

export type Dokunus = {
  /** utm_source */ s?: string
  /** utm_medium */ m?: string
  /** utm_campaign */ c?: string
  /** utm_content */ co?: string
  /** utm_term */ te?: string
  /** fbclid */ fb?: string
  /** gclid */ g?: string
  /** Yönlendiren alan adı (yol değil — yol kişisel veri taşıyabilir). */
  r?: string
  /** İniş sayfası yolu (sorgu dizesi hariç). */
  lp?: string
  /** Zaman (ms). fbclid → fbc dönüşümünde tıklama zamanı olarak kullanılır. */
  ts: number
}

/** İlk ve son dokunuş. İlk: kişiyi ilk getiren kanal. Son: dönüşüme en yakın kanal. */
export type Kaynak = { ilk: Dokunus; son: Dokunus }

const ALAN_SINIRI = 150

function kirp(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t ? t.slice(0, ALAN_SINIRI) : undefined
}

function dokunusTemizle(d: unknown): Dokunus | null {
  if (!d || typeof d !== 'object') return null
  const o = d as Record<string, unknown>
  const ts = typeof o.ts === 'number' && Number.isFinite(o.ts) ? o.ts : 0
  if (!ts) return null
  return {
    s: kirp(o.s), m: kirp(o.m), c: kirp(o.c), co: kirp(o.co), te: kirp(o.te),
    fb: kirp(o.fb), g: kirp(o.g), r: kirp(o.r), lp: kirp(o.lp), ts,
  }
}

/** Çerezdeki JSON'u güvenle okur; bozuksa null. */
export function kaynagiCoz(deger: string | undefined | null): Kaynak | null {
  if (!deger) return null
  try {
    const o = JSON.parse(decodeURIComponent(deger)) as Record<string, unknown>
    const ilk = dokunusTemizle(o.ilk)
    const son = dokunusTemizle(o.son)
    if (!ilk || !son) return null
    return { ilk, son }
  } catch {
    return null
  }
}

/** Bir dokunuşun "kanal" etiketi — panelde gruplama için. */
export function kanalEtiketi(d: Dokunus | undefined | null): string {
  if (!d) return 'bilinmiyor (izin yok)'
  if (d.s || d.m) return `${d.s ?? '(kaynak yok)'} / ${d.m ?? '(ortam yok)'}`
  if (d.fb) return 'facebook / reklam (fbclid)'
  if (d.g) return 'google / reklam (gclid)'
  if (d.r) return `${d.r} / yönlendirme`
  return 'doğrudan'
}
