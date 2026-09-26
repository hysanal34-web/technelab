import type { Basvuru } from '@/lib/basvuruStore'

/**
 * Kayıt tablosu ↔ site başvurusu eşleştirmesi ve offline dönüşüm dosyaları.
 *
 * SORUN: Google ve Meta bugün yalnızca "form dolduruldu"yu biliyor. Kimin
 * gerçekten kaydolup para ödediğini bilmiyorlar, dolayısıyla bütçeyi form
 * dolduran ama asla gelmeyen kitleye akıtıyorlar. Gerçek ciroyu geri
 * bildirmeden bu düzelmiyor.
 *
 * ÜÇ PARÇA ÜÇ YERDE:
 *   "kim ödedi, ne kadar"   → TECHNE LAB TÜM PROGRAMLAR tablosu (Drive)
 *   "hangi reklamdan geldi" → site başvuru kaydı (gclid / fbc çerezleri)
 *   "aktarıma rıza var mı"  → yine başvuru kaydı (reklamRizasi)
 * Ortak anahtar TELEFON. Tabloda e-posta sütunu yok.
 *
 * GOOGLE İLE META'NIN FARKI (tasarımın belkemiği):
 *   Google, tıklama kimliği (gclid) olmadan offline dönüşüm kabul etmiyor.
 *     → yalnızca siteden reklam üstünden gelip form dolduranlar gönderilebilir.
 *   Meta, hash'lenmiş telefonla tek başına eşleştirebiliyor.
 *     → DM'den, kapıdan, tavsiyeyle gelen kayıtlar da gönderilebilir.
 * Bu yüzden iki ayrı dosya üretiliyor, biri diğerinin alt kümesi değil.
 */

/* ────────────────────────────── normalleştirme ────────────────────────── */

/**
 * Türkiye cep numarasını E.164'e çevirir: +905XXXXXXXXX.
 * Eşleşmeyeni `null` döndürüyor — tabloda telefon sütununda Instagram
 * kullanıcı adı ("@fatmanursunbul") ve yurt dışı numarası da var.
 *
 * NEDEN SESSİZCE DÜZELTMİYOR: yanlış normalleştirilmiş bir numara, başka
 * birinin kaydıyla eşleşebilir ve yanlış kişinin verisi Meta'ya gider.
 * Şüpheli olanı eşleşmedi sayıp panelde göstermek doğru davranış.
 */
export function telefonNormal(ham: string): string | null {
  if (!ham) return null
  const rakam = ham.replace(/\D/g, '')
  if (!rakam) return null

  let govde = rakam
  if (govde.startsWith('90')) govde = govde.slice(2)
  else if (govde.startsWith('0')) govde = govde.slice(1)

  // Türkiye cebi: 10 hane, 5 ile başlar. Dışındaki her şey belirsiz.
  if (govde.length !== 10 || !govde.startsWith('5')) return null
  return `+90${govde}`
}

/** E-posta normalleştirme: Meta küçük harf ve boşluksuz bekliyor. */
export function epostaNormal(ham: string): string | null {
  const e = (ham ?? '').trim().toLocaleLowerCase('en-US')
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null
}

/**
 * "26.000", "24650", "1.500 ₺" → 26000 / 24650 / 1500
 *
 * Tabloda hem "140.250" (nokta binlik ayracı) hem "24650" (düz) yazılıyor.
 * Türkçe yazımda nokta binlik ayracıdır, ondalık değil. Kuruş tutulmadığı
 * için tüm noktaları atmak doğru sonucu veriyor.
 */
export function paraCozumle(ham: string): number {
  if (!ham) return 0
  const temiz = ham.replace(/[^\d.,]/g, '').replace(/[.,]/g, '')
  const n = Number(temiz)
  return Number.isFinite(n) ? n : 0
}

/* ──────────────────────────── tablo çözümleme ─────────────────────────── */

export type TabloSatiri = {
  ad: string
  telefonHam: string
  telefon: string | null
  program: string
  odenen: number
  toplam: number
}

/**
 * Drive tablosundan kopyalanıp yapıştırılan satırları çözümler.
 *
 * NEDEN API DEĞİL DE YAPIŞTIRMA: tablo tek sayfada, her program için ayrı
 * bir blok ve birleştirilmiş başlık satırlarıyla duruyor. Sütun sırası
 * bloklar arasında aynı ama blok başlangıçları düzensiz. API ile okumak da
 * aynı ayrıştırmayı gerektirirdi, üstüne servis hesabı kurulumu eklerdi.
 * Yapıştırma bugün çalışıyor ve kimlik bilgisi istemiyor.
 *
 * Beklenen sütunlar (tablodaki sırayla):
 *   SIRA · AD SOYAD · TELEFON · DURUM · TOPLAM ÜCRET · ÖDENEN · ...
 * Başlık satırları, boş satırlar ve blok başlıkları atlanıyor.
 */
export function tabloCozumle(yapistirilan: string, program = ''): TabloSatiri[] {
  const satirlar: TabloSatiri[] = []

  for (const ham of yapistirilan.split(/\r?\n/)) {
    if (!ham.trim()) continue
    // Sekme ayraçlı (Sheets'ten kopyalama böyle gelir). Sekme yoksa
    // noktalı virgüle düş — CSV indirip yapıştıranlar için.
    const h = ham.includes('\t') ? ham.split('\t') : ham.split(';')
    if (h.length < 3) continue

    const ad = (h[1] ?? '').trim()
    if (!ad) continue
    // Başlık satırı ve blok başlığı: veri değil.
    if (/^ad\s*soyad$/i.test(ad)) continue
    if (/^sira$/i.test((h[0] ?? '').trim())) continue

    const telefonHam = (h[2] ?? '').trim()
    const toplam = paraCozumle(h[4] ?? '')
    const odenen = paraCozumle(h[5] ?? '')

    satirlar.push({
      ad,
      telefonHam,
      telefon: telefonNormal(telefonHam),
      program,
      odenen,
      toplam,
    })
  }

  return satirlar
}

/* ─────────────────────────────── eşleştirme ───────────────────────────── */

export type Eslesme = {
  satir: TabloSatiri
  basvuru: Basvuru | null
  /** Aktarım değeri: kullanıcı "ödenen" ya da "toplam" seçiyor. */
  deger: number
  /** Neden gönderilemiyor — panelde satır satır gösteriliyor. */
  engel: string | null
}

export type DegerKaynagi = 'odenen' | 'toplam'

/**
 * Tablodaki her kayıt için site başvurusunu bulur ve gönderilebilirliği
 * değerlendirir. Hiçbir şeyi kendiliğinden elemiyor: engelli satırlar da
 * listede kalıyor ki neyin neden gönderilmediği görünsün.
 */
export function eslestir(
  satirlar: TabloSatiri[],
  basvurular: Basvuru[],
  degerKaynagi: DegerKaynagi,
): Eslesme[] {
  // Telefona göre indeks. Aynı numara birden fazla başvuruda olabilir
  // (önce tanışma, sonra program); en yenisi geçerli çünkü tıklama
  // kimliği de en yenisinde.
  const indeks = new Map<string, Basvuru>()
  for (const b of basvurular) {
    const t = telefonNormal(b.telefon)
    if (!t) continue
    const mevcut = indeks.get(t)
    if (!mevcut || b.olusturuldu > mevcut.olusturuldu) indeks.set(t, b)
  }

  return satirlar.map((satir) => {
    const basvuru = satir.telefon ? indeks.get(satir.telefon) ?? null : null
    const deger = degerKaynagi === 'odenen' ? satir.odenen : satir.toplam

    let engel: string | null = null
    if (!satir.telefon) engel = 'telefon okunamadı'
    else if (!basvuru) engel = 'site başvurusu yok'
    else if (!basvuru.reklamRizasi) engel = 'aktarım rızası yok'
    else if (deger <= 0) engel = 'tutar girilmemiş'

    return { satir, basvuru, deger, engel }
  })
}

/* ──────────────────────────────── hash'leme ───────────────────────────── */

/**
 * SHA-256, küçük harf onaltılık. Meta ve Google ikisi de bu biçimi bekliyor.
 *
 * NEDEN TARAYICIDA: hash'lenmemiş veri sunucuya ikinci kez gitmesin,
 * hiçbir yere loglanmasın. Panel zaten veriyi ekranda gösteriyor; dosya
 * üretimi aynı sayfada bitiyor.
 */
export async function hash(metin: string): Promise<string> {
  const veri = new TextEncoder().encode(metin)
  const ozet = await crypto.subtle.digest('SHA-256', veri)
  return Array.from(new Uint8Array(ozet))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/* ─────────────────────────────── dosyalar ─────────────────────────────── */

function kacir(h: string): string {
  return `"${String(h ?? '').replace(/"/g, '""')}"`
}

/** "2026-09-21 14:30:00" — Google'ın beklediği biçim. */
function googleZaman(iso: string): string {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  )
}

/**
 * Google Ads offline dönüşüm dosyası.
 *
 * Yalnızca `gclid` (ya da iOS karşılığı wbraid/gbraid) taşıyan kayıtlar
 * girebilir; Google tıklama kimliği olmayan satırı reddediyor.
 *
 * `donusumAdi` Google Ads'de ÖNCEDEN açılmış dönüşüm işleminin adıyla
 * harfi harfine aynı olmak zorunda, yoksa yükleme sessizce boş geçiyor.
 */
export function googleAdsCsv(esler: Eslesme[], donusumAdi: string): string {
  const satirlar: string[][] = []

  for (const e of esler) {
    if (e.engel || !e.basvuru) continue
    const b = e.basvuru
    const kimlik = b.gclid || b.wbraid || b.gbraid
    if (!kimlik) continue
    const sutun = b.gclid ? 'Google Click ID' : b.wbraid ? 'WBRAID' : 'GBRAID'
    satirlar.push([sutun, kimlik, googleZaman(b.olusturuldu), String(e.deger)])
  }

  // Google tek dosyada tek kimlik sütunu istiyor. gclid ezici çoğunlukta
  // olduğu için onu esas alıp diğerlerini ayrı indirmeye bırakmak yerine,
  // hepsini gclid sütununda topluyoruz; wbraid/gbraid satırları ayrı
  // dosyaya ihtiyaç duyarsa panel uyarı veriyor.
  const basliklar = ['Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency']
  const govde = satirlar.map((s) => [s[1], donusumAdi, s[2], s[3], 'TRY'])

  return [
    'Parameters:TimeZone=+03:00',
    basliklar.join(','),
    ...govde.map((s) => s.map(kacir).join(',')),
  ].join('\r\n')
}

/**
 * Meta offline dönüşüm dosyası.
 *
 * Google'dan farkı: tıklama kimliği ŞART DEĞİL. Hash'lenmiş telefon tek
 * başına eşleşme için yeterli, dolayısıyla siteden hiç geçmemiş kayıtlar
 * da gönderilebiliyor. Rıza kontrolü yine de uygulanıyor.
 */
export async function metaCsv(esler: Eslesme[], olayAdi: string): Promise<string> {
  const basliklar = ['email', 'phone', 'event_time', 'event_name', 'value', 'currency']
  const govde: string[][] = []

  for (const e of esler) {
    // Meta için "site başvurusu yok" engel değil; rıza ve telefon şart.
    if (!e.satir.telefon) continue
    if (!e.basvuru?.reklamRizasi) continue
    if (e.deger <= 0) continue

    const telHash = await hash(e.satir.telefon.replace('+', ''))
    const eposta = epostaNormal(e.basvuru.email ?? '')
    const epostaHash = eposta ? await hash(eposta) : ''
    const zaman = Math.floor(new Date(e.basvuru.olusturuldu).getTime() / 1000)

    govde.push([epostaHash, telHash, String(zaman), olayAdi, String(e.deger), 'TRY'])
  }

  return [basliklar.join(','), ...govde.map((s) => s.map(kacir).join(','))].join('\r\n')
}
