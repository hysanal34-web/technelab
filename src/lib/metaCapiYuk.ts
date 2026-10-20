import { createHash } from 'node:crypto'

/**
 * Meta Conversions API — saf yük oluşturucu.
 *
 * Ağ çağrısı, ortam değişkeni ya da `server-only` içermez: testlerden doğrudan
 * çağrılabilsin ve "Meta'ya ne gidiyor" sorusu tek fonksiyonda cevaplansın.
 * Gönderim `metaCapi.ts` içinde.
 *
 * GİZLİLİK KURALLARI (burada uygulanır, çağıranın unutmasına bırakılmaz)
 *  - E-posta ve telefon yalnızca `hashliIletisim` true ise ve yalnızca
 *    SHA-256 ile özetlenmiş olarak gider (Meta'nın normalize kuralıyla).
 *  - Tarayıcı sinyalleri (fbp, fbc, IP, tarayıcı) yalnızca `tarayiciSinyali`
 *    true ise gider (çerez banner'ında pazarlama izni).
 *  - Ad, mesaj, doğum yılı, meslek, deneyim gibi alanlar için tip yok:
 *    bu fonksiyona hiç gelemezler.
 */

export type CapiOlayAdi =
  | 'Lead'
  | 'Schedule'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Subscribe'

export type CapiGirdi = {
  olay: CapiOlayAdi
  /** Tarayıcı pikseliyle AYNI kimlik — tekilleştirme bununla yapılır. */
  eventId: string
  /** Saniye. Verilmezse şimdi. */
  zaman?: number
  /** Olayın gerçekleştiği sayfanın tam adresi (sorgu dizesi olmadan). */
  sayfa: string
  /** Formdaki ayrı "reklam ölçümü" açık rızası. */
  hashliIletisim: boolean
  /** Çerez banner'ında pazarlama izni. */
  tarayiciSinyali: boolean
  email?: string
  telefon?: string
  fbp?: string
  fbc?: string
  ip?: string
  tarayici?: string
  /** Sitenin anonim ziyaretçi kimliği — sunucuda tekrar özetlenir. */
  harici?: string
  deger?: number
  paraBirimi?: string
  icerikAdi?: string
  icerikKimligi?: string
  icerikKategorisi?: string
}

export type CapiOlay = {
  event_name: CapiOlayAdi
  event_time: number
  event_id: string
  event_source_url: string
  action_source: 'website'
  user_data: Record<string, string | string[]>
  custom_data: Record<string, unknown>
}

/** Meta normalize kuralı: kırp, küçük harf, SHA-256 (hex). */
export function ozetle(deger: string): string {
  return createHash('sha256').update(deger.trim().toLowerCase()).digest('hex')
}

/** E-posta: kırp, küçük harf. Geçersizse null. */
export function epostaNormalize(ham: string): string | null {
  const e = ham.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null
}

/** Telefon: yalnız rakam, ülke koduyla (Türkiye 90). Meta + işareti istemez. */
export function telefonNormalize(ham: string): string | null {
  const d = ham.replace(/\D/g, '')
  if (!d) return null
  if (d.startsWith('90') && d.length === 12) return d
  if (d.startsWith('0') && d.length === 11) return '90' + d.slice(1)
  if (d.startsWith('5') && d.length === 10) return '90' + d
  return d.length >= 8 ? d : null
}

/**
 * fbclid'den Meta'nın `fbc` biçimi: `fb.1.<tıklama zamanı ms>.<fbclid>`.
 * Piksel izinle sonradan yüklendiyse `_fbc` çerezi hiç oluşmamış olabilir.
 */
export function fbcOlustur(fbclid: string | undefined, tiklamaMs: number | undefined): string | undefined {
  if (!fbclid || !tiklamaMs) return undefined
  if (!/^[A-Za-z0-9_\-]{10,500}$/.test(fbclid)) return undefined
  return `fb.1.${Math.floor(tiklamaMs)}.${fbclid}`
}

/**
 * Tek bir olayın yükünü kurar. Gönderilecek hiçbir eşleştirme sinyali yoksa
 * null döner: Meta boş user_data'lı olayı zaten reddediyor, göndermenin anlamı yok.
 */
export function capiOlayiOlustur(g: CapiGirdi): CapiOlay | null {
  const ud: Record<string, string | string[]> = {}

  if (g.hashliIletisim) {
    const e = g.email ? epostaNormalize(g.email) : null
    if (e) ud.em = [ozetle(e)]
    const t = g.telefon ? telefonNormalize(g.telefon) : null
    if (t) ud.ph = [ozetle(t)]
    // Ülke: Türkiye. Eşleşme kalitesini artırır, kişiyi tanımlamaz.
    if (e || t) ud.country = [ozetle('tr')]
  }

  if (g.tarayiciSinyali) {
    if (g.fbp) ud.fbp = g.fbp
    if (g.fbc) ud.fbc = g.fbc
    if (g.ip) ud.client_ip_address = g.ip
    if (g.harici) ud.external_id = [ozetle(g.harici)]
  }
  // Meta "website" olaylarında tarayıcı bilgisini zorunlu tutuyor. Kişiyi tek
  // başına tanımlamaz; iki rızadan biri varsa eklenir.
  if ((g.tarayiciSinyali || g.hashliIletisim) && g.tarayici) ud.client_user_agent = g.tarayici.slice(0, 500)

  const eslesme = ['em', 'ph', 'fbp', 'fbc', 'client_ip_address', 'external_id'].some((k) => k in ud)
  if (!eslesme) return null

  const cd: Record<string, unknown> = {}
  if (g.deger !== undefined && g.deger > 0) {
    cd.value = Math.round(g.deger)
    cd.currency = g.paraBirimi ?? 'TRY'
  }
  if (g.icerikAdi) cd.content_name = g.icerikAdi.slice(0, 120)
  if (g.icerikKimligi) {
    cd.content_ids = [g.icerikKimligi.slice(0, 120)]
    cd.content_type = 'product'
  }
  if (g.icerikKategorisi) cd.content_category = g.icerikKategorisi

  return {
    event_name: g.olay,
    event_time: g.zaman ?? Math.floor(Date.now() / 1000),
    event_id: g.eventId,
    event_source_url: g.sayfa,
    action_source: 'website',
    user_data: ud,
    custom_data: cd,
  }
}

/** Loglanabilir özet: hangi alanların gittiği, değerleri değil. */
export function olayOzeti(o: CapiOlay): string {
  return `${o.event_name} id=${o.event_id} user_data=[${Object.keys(o.user_data).join(',')}] custom_data=[${Object.keys(o.custom_data).join(',')}]`
}
