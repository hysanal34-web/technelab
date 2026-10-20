import 'server-only'
import { put, list, get, del } from '@vercel/blob'
import { createHmac } from 'node:crypto'
import type { Dokunus, Kaynak } from '@/lib/izin'
import type { CapiSonuc } from '@/lib/metaCapi'

/**
 * Ölçüm deposu — dönüşüm ve tıklama kayıtları (Vercel Blob, özel depo).
 *
 * Başvuru deposuyla (`basvuruStore.ts`) aynı depo ve aynı ilke: her kayıt ayrı
 * nesne, yarış yok, yazma hiçbir koşulda hata fırlatmaz. Fark: burada KİŞİSEL
 * VERİ YOK. Ad, e-posta, telefon, mesaj tutulmaz. Tekil sayım için e-posta /
 * telefon, sunucuya özel bir anahtarla HMAC'lenip geri döndürülemez bir
 * kimliğe çevrilir; Meta'ya giden özetle aynı değildir, dışarıda eşleştirilemez.
 *
 * VERİTABANI DEĞİŞİKLİĞİ: yok. Yeni bir önek (`olcum/`) altında yeni nesneler
 * yazılıyor; mevcut `basvurular/` nesnelerine dokunulmuyor. Göç gerekmiyor.
 *
 * SAKLAMA: 13 ay (`SAKLAMA_GUN`). Panelde "eski kayıtları sil" düğmesi var.
 *
 * Yol: olcum/<tur>/<YYYY-MM-DD>/<zaman>__<rastgele>.json
 * Tarih yolda olduğu için panel, tarih aralığı dışındaki nesneleri okumadan eler.
 */

export const SAKLAMA_GUN = 395

export type TiklamaTuru = 'whatsapp' | 'telefon' | 'form_baslangic'

export type OlcumTiklama = {
  tur: TiklamaTuru
  zaman: string
  sayfa: string
  cta?: string
  form?: string
  /** Pikseldeki eventID ile aynı — Events Manager'la karşılaştırmak için. */
  kimlik?: string
  /** Anonim ziyaretçi kimliğinin HMAC'i. Yalnızca analitik izniyle. */
  ziyaretci?: string
  /** Son dokunuş kaynağı. Yalnızca izinle. */
  kaynak?: Dokunus
  izin: { analitik: boolean; pazarlama: boolean }
}

export type DonusumTuru = 'iletisim' | 'tanisma' | 'program' | 'bulten' | 'bekleme'

export type OlcumDonusum = {
  tur: DonusumTuru
  /** Meta'ya (piksel + CAPI) bildirilen standart olaylar. */
  olaylar: string[]
  eventId: string
  zaman: string
  sayfa: string
  program?: string
  slug?: string
  /** Kişinin HMAC kimliği (e-posta, yoksa telefon). Tekil kişi sayımı için. */
  kisi?: string
  /** Telefonun HMAC kimliği — WhatsApp görüşmesiyle eşleştirme için. */
  telefonKimligi?: string
  ziyaretci?: string
  kaynak?: Kaynak
  izin: { analitik: boolean; pazarlama: boolean }
  reklamRizasi: boolean
  capi: CapiSonuc
}

export type WaKayit = {
  yon: 'gelen' | 'giden'
  zaman: string
  /** WhatsApp numarasının HMAC kimliği. Numara saklanmaz. */
  kisi: string
  /** Mesaj bir "WhatsApp'a tıkla" reklamından mı geldi (referral). */
  reklamdan?: boolean
  /** Reklam kimliği (varsa) — kampanya eşlemesi için. Kişisel veri değil. */
  reklamKimligi?: string
}

const ONEK = 'olcum/'

function jeton(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined
}

export function olcumDepoBagliMi(): boolean {
  return Boolean(jeton())
}

/**
 * Geri döndürülemez kimlik. Anahtar yoksa null: tekil sayım yapılamaz ama
 * hiçbir şey açık saklanmaz.
 */
export function kimlikOzeti(deger: string | undefined | null): string | undefined {
  const anahtar = process.env.OLCUM_ANAHTARI || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  if (!deger || !anahtar) return undefined
  return createHmac('sha256', anahtar).update(deger.trim().toLowerCase()).digest('hex').slice(0, 32)
}

function yol(tur: string): string {
  const simdi = new Date()
  const gun = simdi.toISOString().slice(0, 10)
  const ts = simdi.toISOString().replace(/[:.]/g, '-')
  const rnd = Math.random().toString(36).slice(2, 8)
  return `${ONEK}${tur}/${gun}/${ts}__${rnd}.json`
}

async function yaz(tur: string, veri: unknown): Promise<boolean> {
  try {
    if (!olcumDepoBagliMi()) return false
    await put(yol(tur), JSON.stringify(veri), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
      token: jeton(),
    })
    return true
  } catch (err) {
    console.error('[olcumStore] yazılamadı (akış etkilenmedi):', (err as Error)?.message)
    return false
  }
}

export const tiklamaKaydet = (t: OlcumTiklama) => yaz('tiklama', t)
export const donusumKaydet = (d: OlcumDonusum) => yaz('donusum', d)
export const waKaydet = (w: WaKayit) => yaz('whatsapp', w)

async function oku<T>(p: string): Promise<T | null> {
  try {
    const s = await get(p, { access: 'private', token: jeton() })
    if (!s || s.statusCode !== 200) return null
    return JSON.parse(await new Response(s.stream).text()) as T
  } catch {
    return null
  }
}

async function tumYollar(onek: string): Promise<string[]> {
  const yollar: string[] = []
  let cursor: string | undefined
  for (let i = 0; i < 50; i++) {
    const r = await list({ prefix: onek, cursor, limit: 1000, token: jeton() })
    yollar.push(...r.blobs.map((b) => b.pathname))
    if (!r.hasMore || !r.cursor) break
    cursor = r.cursor
  }
  return yollar
}

/** Yoldaki tarih (YYYY-MM-DD) `baslangic`tan küçük olmayanları okur. */
export async function kayitlariGetir<T>(tur: 'tiklama' | 'donusum' | 'whatsapp', baslangic: string): Promise<T[]> {
  try {
    if (!olcumDepoBagliMi()) return []
    const yollar = (await tumYollar(`${ONEK}${tur}/`)).filter((p) => p.split('/')[2] >= baslangic)
    const sonuc: T[] = []
    // Aynı anda en fazla 25 okuma: depoyu boğmasın.
    for (let i = 0; i < yollar.length; i += 25) {
      const parca = await Promise.all(yollar.slice(i, i + 25).map((p) => oku<T>(p)))
      for (const k of parca) if (k) sonuc.push(k)
    }
    return sonuc
  } catch (err) {
    console.error('[olcumStore] okunamadı:', (err as Error)?.message)
    return []
  }
}

/** Saklama süresini aşan ölçüm kayıtlarını siler. Silinen nesne sayısını döner. */
export async function eskiKayitlariSil(gun = SAKLAMA_GUN): Promise<number> {
  if (!olcumDepoBagliMi()) return 0
  const sinir = new Date(Date.now() - gun * 86400_000).toISOString().slice(0, 10)
  const eski = (await tumYollar(ONEK)).filter((p) => (p.split('/')[2] ?? '9999') < sinir)
  for (let i = 0; i < eski.length; i += 100) await del(eski.slice(i, i + 100), { token: jeton() })
  return eski.length
}
