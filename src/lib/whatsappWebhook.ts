import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * WhatsApp Business Platform (Cloud API) webhook — saf yardımcılar.
 *
 * DURUM (15 Ekim 2026): Techne Lab'in WhatsApp hattının Cloud API'ye bağlı
 * olduğu doğrulanmadı. Webhook kodu hazır ama `WHATSAPP_APP_SECRET` ve
 * `WHATSAPP_VERIFY_TOKEN` tanımlanana kadar uç nokta 404 döner ve panel
 * WhatsApp görüşme sayılarını "Entegrasyon gerekli" olarak gösterir.
 * Gerçek mesaj sayısı hiçbir koşulda tahminle doldurulmaz.
 *
 * Bu dosyada ağ, depo ya da ortam değişkeni yok: testlerden doğrudan çağrılır.
 *
 * NE SAKLANIR: yön (gelen/giden), zaman, numaranın HMAC kimliği, mesajın bir
 * "WhatsApp'a tıkla" reklamından gelip gelmediği. Mesaj İÇERİĞİ, isim, numara
 * saklanmaz.
 */

/** Meta, gövdeyi uygulama gizli anahtarıyla imzalar: `X-Hub-Signature-256: sha256=<hex>`. */
export function waImzaDogrula(hamGovde: string, imzaBasligi: string | null, gizli: string): boolean {
  if (!imzaBasligi || !gizli) return false
  const beklenen = 'sha256=' + createHmac('sha256', gizli).update(hamGovde, 'utf8').digest('hex')
  const a = Buffer.from(imzaBasligi)
  const b = Buffer.from(beklenen)
  return a.length === b.length && timingSafeEqual(a, b)
}

export type WaHamOlay = {
  yon: 'gelen' | 'giden'
  /** wa_id (ülke kodlu numara, yalnız rakam). Kaydetmeden önce özetlenir. */
  numara: string
  zamanMs: number
  reklamdan: boolean
  reklamKimligi?: string
}

type Nesne = Record<string, unknown>
const dizi = (v: unknown): Nesne[] => (Array.isArray(v) ? (v.filter((x) => x && typeof x === 'object') as Nesne[]) : [])
const zaman = (v: unknown): number => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n * 1000 : Date.now()
}

/**
 * Webhook yükünden gelen ve giden mesajları çıkarır.
 *  field "messages"            → value.messages (gelen), value.statuses status=sent (giden, API'den)
 *  field "smb_message_echoes"  → value.message_echoes (giden, WhatsApp Business uygulamasından;
 *                                 "coexistence" kurulumunda)
 * Teslim edildi/okundu durumları sayılmaz: bir mesaj için birden çok gelir.
 */
export function waOlaylariniCoz(yuk: unknown): WaHamOlay[] {
  const cikti: WaHamOlay[] = []
  if (!yuk || typeof yuk !== 'object') return cikti
  for (const entry of dizi((yuk as Nesne).entry)) {
    for (const ch of dizi(entry.changes)) {
      const field = ch.field
      const value = (ch.value && typeof ch.value === 'object' ? ch.value : {}) as Nesne

      if (field === 'messages') {
        for (const m of dizi(value.messages)) {
          if (typeof m.from !== 'string') continue
          const ref = (m.referral && typeof m.referral === 'object' ? m.referral : null) as Nesne | null
          cikti.push({
            yon: 'gelen',
            numara: m.from,
            zamanMs: zaman(m.timestamp),
            reklamdan: Boolean(ref),
            reklamKimligi: ref && typeof ref.source_id === 'string' ? ref.source_id.slice(0, 64) : undefined,
          })
        }
        for (const s of dizi(value.statuses)) {
          if (s.status !== 'sent' || typeof s.recipient_id !== 'string') continue
          cikti.push({ yon: 'giden', numara: s.recipient_id, zamanMs: zaman(s.timestamp), reklamdan: false })
        }
      }

      if (field === 'smb_message_echoes') {
        for (const e of dizi(value.message_echoes)) {
          if (typeof e.to !== 'string') continue
          cikti.push({ yon: 'giden', numara: e.to, zamanMs: zaman(e.timestamp), reklamdan: false })
        }
      }
    }
  }
  return cikti
}

/** Panel için: kişi bazında görüşme özeti. Girdi kişi kimlikleri zaten özetlenmiş. */
export function waGorusmeOzeti(kayitlar: { yon: 'gelen' | 'giden'; zaman: string; kisi: string; reklamdan?: boolean }[]) {
  const kisiler = new Map<string, { ilkGelen?: number; yanit?: number; reklamdan: boolean }>()
  const sirali = [...kayitlar].sort((a, b) => a.zaman.localeCompare(b.zaman))
  let gelenMesaj = 0
  for (const k of sirali) {
    const t = Date.parse(k.zaman)
    const d = kisiler.get(k.kisi) ?? { reklamdan: false }
    if (k.yon === 'gelen') {
      gelenMesaj++
      if (d.ilkGelen === undefined) d.ilkGelen = t
      if (k.reklamdan) d.reklamdan = true
    } else if (d.ilkGelen !== undefined && d.yanit === undefined && t >= d.ilkGelen) {
      d.yanit = t
    }
    kisiler.set(k.kisi, d)
  }
  const gorusmeler = [...kisiler.entries()].filter(([, d]) => d.ilkGelen !== undefined)
  return {
    gelenMesaj,
    gorusme: gorusmeler.length,
    yanitlanan: gorusmeler.filter(([, d]) => d.yanit !== undefined).length,
    yanitlanmayan: gorusmeler.filter(([, d]) => d.yanit === undefined).length,
    reklamdan: gorusmeler.filter(([, d]) => d.reklamdan).length,
    /** kişi kimliği → ilk gelen mesaj zamanı (dönüşüm eşleştirmesi için) */
    ilkMesaj: new Map(gorusmeler.map(([k, d]) => [k, d.ilkGelen!])),
  }
}
