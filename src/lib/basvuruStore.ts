import { put, list, get } from '@vercel/blob'

/**
 * Başvuru deposu — Vercel Blob üzerinde, her başvuru ayrı bir nesne.
 *
 * 18 Eylül 2026'ya kadar başvurular hiçbir yerde saklanmıyordu: form Resend
 * ile e-posta atıp bitiyordu. Bir kayıt aranacaksa Gmail'de aranıyordu, kimin
 * arandığını kimse bilmiyordu. Bu dosya o boşluğu kapatıyor.
 *
 * NEDEN VERİTABANI DEĞİL: Vercel'de Postgres yalnızca Marketplace üzerinden,
 * tarayıcıyla kuruluyor. Blob ise komut satırından kurulabiliyor ve bu iş için
 * fazlasıyla yeterli: yılda birkaç yüz kayıt, tek okuyucu, basit filtre.
 *
 * NEDEN HER BAŞVURU AYRI NESNE: tek bir liste dosyası tutulsaydı her yazma
 * "oku, ekle, geri yaz" olurdu. Aynı anda iki form gelirse biri diğerinin
 * üstüne yazar ve aday kaybolurdu. Ayrı nesnede yarış yok, yazma her zaman
 * güvenli. Durum ve not güncellemesi ilgili nesnenin kendi üstüne yazıyor;
 * orada tek bir kişi çalışıyor.
 *
 * NEDEN ÖZEL (private) DEPO: içinde ad, telefon, e-posta ve veli bilgisi var.
 * Herkese açık bir blob URL'i, adresi bilen herkesin bu veriyi okuyabilmesi
 * demek olurdu. Okuma imzalı istekle yapılıyor.
 *
 * `basvuruKaydet` HİÇBİR KOŞULDA hata fırlatmaz. Form akışı canlı ve gelir
 * getiriyor; depo arızası yüzünden başvuru kaybetmek, başvuruyu kaydedememekten
 * çok daha pahalı. E-posta her koşulda gidiyor, depo ikincil.
 */

export type BasvuruDurum =
  | 'yeni'
  | 'arandi'
  | 'ulasilamadi'
  | 'tanismaya-kayit'
  | 'tanismaya-geldi'
  | 'kayit-oldu'
  | 'kaybedildi'

export const DURUMLAR: { deger: BasvuruDurum; etiket: string; renk: string }[] = [
  { deger: 'yeni',            etiket: 'Yeni',            renk: '#C8FF00' },
  { deger: 'arandi',          etiket: 'Arandı',          renk: '#7FB3FF' },
  { deger: 'ulasilamadi',     etiket: 'Ulaşılamadı',     renk: '#FFB86B' },
  { deger: 'tanismaya-kayit', etiket: 'Tanışmaya kayıt', renk: '#9AE6B4' },
  { deger: 'tanismaya-geldi', etiket: 'Tanışmaya geldi', renk: '#68D391' },
  { deger: 'kayit-oldu',      etiket: 'Kayıt oldu',      renk: '#38A169' },
  { deger: 'kaybedildi',      etiket: 'Kaybedildi',      renk: '#6B6B6B' },
]

export type Basvuru = {
  /** Blob yolu — hem kimlik hem adres. */
  id: string
  olusturuldu: string
  kaynak: 'tanisma' | 'program' | 'bulten'
  program: string
  slug: string
  ad: string
  email: string
  telefon: string
  notlar: string
  durum: BasvuruDurum
  ic_not: string

  /* ── Reklam ölçümü ────────────────────────────────────────────────────
   * Hepsi opsiyonel: bu alanlar 21 Eylül 2026'da eklendi, daha eski
   * kayıtlarda yok. `undefined` gelmesi normal, kod bunu varsayıyor.
   */

  /** Google Ads tıklama kimliği. Offline dönüşüm yüklemenin tek anahtarı. */
  gclid?: string
  /** iOS'ta gclid yerine gelen karşılıkları. */
  wbraid?: string
  gbraid?: string
  /** Meta tıklama ve tarayıcı çerezleri — eşleşme kalitesini yükseltiyor. */
  fbc?: string
  fbp?: string

  /**
   * Reklam platformlarına aktarım için AYRI açık rıza.
   *
   * NEDEN İLETİŞİM İZNİNDEN AYRI: duyuru almak ile kişisel verinin
   * Meta/Google'a yurt dışına aktarılması farklı amaçlar. KVKK ikisi için
   * ayrı açık rıza istiyor; tek kutuya bağlamak rızayı geçersiz kılar.
   *
   * `undefined` = kutu var olmadan önce alınmış kayıt. Dışa aktarma bunu
   * rıza saymıyor, `false` gibi davranıyor.
   */
  reklamRizasi?: boolean

  /** Offline dönüşüm dosyasına alındığı an. Aynı kaydı iki kez yüklememek için. */
  donusumGonderildi?: string
}

export type YeniBasvuru = Omit<
  Basvuru,
  'id' | 'olusturuldu' | 'durum' | 'ic_not' | 'donusumGonderildi'
>

const ONEK = 'basvurular/'

function jeton(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined
}

export function depoBagliMi(): boolean {
  return Boolean(jeton())
}

/** Sıralanabilir, çakışmayan yol: zaman damgası + rastgele son ek. */
function yeniYol(): string {
  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  const rnd = Math.random().toString(36).slice(2, 8)
  return `${ONEK}${ts}__${rnd}.json`
}

async function yaz(yol: string, kayit: Basvuru): Promise<void> {
  await put(yol, JSON.stringify(kayit), {
    // Depo özel: nesneler herkese açık URL ile servis edilmiyor.
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    // Önbelleksiz: durum değiştirildikten sonra listenin eski değeri
    // göstermemesi için. Nesneler küçük, maliyeti yok.
    cacheControlMaxAge: 0,
    token: jeton(),
  })
}

export async function basvuruKaydet(b: YeniBasvuru): Promise<boolean> {
  try {
    if (!depoBagliMi()) return false
    const yol = yeniYol()
    await yaz(yol, {
      ...b,
      id: yol,
      olusturuldu: new Date().toISOString(),
      durum: 'yeni',
      ic_not: '',
    })
    return true
  } catch (err) {
    console.error('[basvuruStore] kaydedilemedi (form akışı etkilenmedi):', err)
    return false
  }
}

async function tekOku(yol: string): Promise<Basvuru | null> {
  try {
    // useCache:false — durum değiştirildikten hemen sonra liste eski
    // değeri göstermesin diye doğrudan kaynaktan okunuyor.
    const sonuc = await get(yol, { access: 'private', useCache: false, token: jeton() })
    if (!sonuc || sonuc.statusCode !== 200) return null
    const metin = await new Response(sonuc.stream).text()
    return JSON.parse(metin) as Basvuru
  } catch {
    return null
  }
}

export async function basvurulariGetir(limit = 1000): Promise<Basvuru[]> {
  try {
    if (!depoBagliMi()) return []
    const { blobs } = await list({ prefix: ONEK, limit, token: jeton() })
    // Yol zaman damgasıyla başlıyor, ters sıralama = en yeni önce.
    const yollar = blobs.map((b) => b.pathname).sort().reverse()
    const kayitlar = await Promise.all(yollar.map(tekOku))
    return kayitlar.filter((k): k is Basvuru => k !== null)
  } catch (err) {
    console.error('[basvuruStore] okunamadı:', err)
    return []
  }
}

async function guncelle(id: string, degisim: Partial<Basvuru>): Promise<boolean> {
  try {
    if (!depoBagliMi()) return false
    if (!id.startsWith(ONEK)) return false
    const mevcut = await tekOku(id)
    if (!mevcut) return false
    await yaz(id, { ...mevcut, ...degisim, id })
    return true
  } catch (err) {
    console.error('[basvuruStore] güncellenemedi:', err)
    return false
  }
}

export async function durumGuncelle(id: string, durum: BasvuruDurum): Promise<boolean> {
  if (!DURUMLAR.some((d) => d.deger === durum)) return false
  return guncelle(id, { durum })
}

export async function icNotGuncelle(id: string, not: string): Promise<boolean> {
  return guncelle(id, { ic_not: not.slice(0, 2000) })
}
