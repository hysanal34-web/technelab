import type { ArticleMeta } from '@/lib/mdx'

/**
 * Bir makalenin altında gösterilecek "ilgili yazılar" seçimi.
 *
 * NEDEN VAR: önceden seçim `aynı kategori → en yeni 3` idi. İki şeyi birden
 * bozuyordu:
 *
 *  1. Kategori kalabalıksa (Teknik'te 24 yazı var) her makale hep aynı üç
 *     yeni yazıya link veriyordu. Kalan 21'i hiç gelen link almıyordu.
 *  2. Kategoride tek yazı varsa (Oyunculuk, Pedagoji, Tiyatro) liste boş
 *     kalıyordu; yazı ne link veriyor ne link alıyordu.
 *
 * 26 Eylül 2026 ölçümü, 90 yayın makalesi üzerinde:
 *
 *            yetim   tek link   ort. gelen   max   kümeler arası
 *   eski        60          2         2.86    23        0 / 270
 *   yeni         0          1         3.00    20       98 / 270
 *
 * Yani makalelerin üçte ikisi bu bloktan hiç link almıyordu ve hiçbir link
 * kümeler arasında geçmiyordu.
 *
 * ÇÖZÜM: kategori içinde halka (ring) gibi dolaşıyoruz. Her makale kendi
 * sırasından sonraki komşulara link veriyor, böylece kümede herkes sırayla
 * link alıyor. Üç slotun biri komşu kümeye ayrılmış durumda; yöntem yazısını
 * okuyan kişi böylece ticari kümeye bir adım yaklaşıyor.
 *
 * Sıralama tarihe göre sabit olduğu için seçim de deterministik: aynı build
 * aynı sonucu verir, sayfa her derlemede farklı link göstermez.
 */

/**
 * Kategori yakınlığı. Kümede yer kalmazsa buradan doldurulur — rastgele bir
 * yazı yerine konusu yakın bir yazı gösterilsin diye.
 */
const YAKIN_KATEGORI: Record<string, string[]> = {
  'Oyunculuk':       ['Tiyatro', 'Teknik', 'Yaratıcı Drama', 'Sektör'],
  'Teknik':          ['Oyunculuk', 'Tiyatro', 'Dramaturji', 'Yazarlık'],
  'Yaratıcı Drama':  ['Pedagoji', 'Oyunculuk', 'İngilizce Drama'],
  'Pedagoji':        ['Yaratıcı Drama', 'Oyunculuk', 'İngilizce Drama'],
  'İngilizce Drama': ['Yaratıcı Drama', 'Oyunculuk', 'Dans & Müzikal'],
  'Dans & Müzikal':  ['Oyunculuk', 'İngilizce Drama', 'Teknik'],
  'Yazarlık':        ['Dramaturji', 'Teknik', 'Sektör'],
  'Dramaturji':      ['Yazarlık', 'Teknik', 'Oyunculuk'],
  'Sektör':          ['Kültür', 'Tiyatro', 'Teknik', 'Oyunculuk'],
  'Kültür':          ['Sektör', 'Teknik', 'Oyunculuk'],
  'Tiyatro':         ['Oyunculuk', 'Teknik', 'Sektör'],
}

/**
 * Üç linkin kaçı kendi kümesinden. Kalanı komşu kümeye ayrılıyor.
 *
 * NEDEN AYRILIYOR: yalnızca "önce kendi kümen, yetmezse komşu" dersek kalabalık
 * kategori (Teknik'te 24 yazı) hiçbir zaman komşuya düşmez. O zaman küçük
 * kategoriler (Oyunculuk, Pedagoji, Tiyatro: birer yazı) kimseden link almaz —
 * ölçtüğümüz yetimlerin sebebi tam olarak buydu. Bir slotu zorla komşuya
 * ayırmak hem o yazıları kurtarıyor hem de kümeler arası geçiş kuruyor:
 * yöntem yazısını okuyan kişi ticari kümeye bir adım yaklaşıyor.
 */
const KENDI_KUMESINDEN = 2

/**
 * @param hepsi   Yayındaki tüm makaleler (getAllArticles çıktısı, tarihe göre sıralı)
 * @param slug    Şu an açık olan makale
 * @param kategori Şu an açık olan makalenin kategorisi
 * @param adet    Kaç ilgili yazı gösterilecek
 */
export function ilgiliMakaleler(
  hepsi: readonly ArticleMeta[],
  slug: string,
  kategori: string,
  adet = 3,
): ArticleMeta[] {
  const secilen: ArticleMeta[] = []
  const alindi = new Set<string>([slug])

  const ekle = (aday: ArticleMeta) => {
    if (secilen.length >= adet) return
    if (alindi.has(aday.slug)) return
    alindi.add(aday.slug)
    secilen.push(aday)
  }

  // 1) Kendi kategorisi — halka olarak, kendi sırandan sonrakiler.
  // Böylece kümedeki her yazı sırayla link alıyor, hep aynı üçü değil.
  // En fazla KENDI_KUMESINDEN tane: kalan slot komşuya ayrılmış durumda.
  const kume = hepsi.filter((a) => a.category === kategori)
  const benimYerim = kume.findIndex((a) => a.slug === slug)
  if (kume.length > 1) {
    const baslangic = benimYerim >= 0 ? benimYerim : 0
    const hedef = Math.min(KENDI_KUMESINDEN, adet)
    for (let i = 1; i < kume.length && secilen.length < hedef; i++) {
      ekle(kume[(baslangic + i) % kume.length])
    }
  }

  // 2) Komşu kategoriler. Küçük kümeler linki buradan alıyor, o yüzden
  // kalabalık kategorilerde bile en az bir slot buraya geliyor.
  //
  // Komşu listesini hep baştan taramıyoruz: öyle yapınca listedeki ilk
  // kategori bütün çapraz linki emiyor. Tek yazılık bir kümeyse (Oyunculuk,
  // Tiyatro) o tek yazı 35 gelen link topluyordu — yetimin tersi, aynı
  // dengesizlik. Başlangıcı slug'a göre kaydırınca çapraz linkler komşular
  // arasında dağılıyor.
  const yakinlar = YAKIN_KATEGORI[kategori] ?? []
  const yakinKayma = yakinlar.length > 0 ? slugKaymasi(slug, yakinlar.length) : 0
  for (let y = 0; y < yakinlar.length; y++) {
    if (secilen.length >= adet) break
    const yakin = yakinlar[(yakinKayma + y) % yakinlar.length]
    const komsu = hepsi.filter((a) => a.category === yakin)
    if (komsu.length === 0) continue
    // Sabit bir noktadan değil, slug'a göre kayarak giriyoruz ki farklı
    // makaleler komşu kümenin farklı yazılarına link versin.
    const kayma = slugKaymasi(slug, komsu.length)
    for (let i = 0; i < komsu.length && secilen.length < adet; i++) {
      ekle(komsu[(kayma + i) % komsu.length])
    }
  }

  // 3) Kendi kümesine geri dön — komşular doldurmadıysa boş slot kalmasın.
  if (secilen.length < adet && kume.length > 1) {
    const baslangic = benimYerim >= 0 ? benimYerim : 0
    for (let i = 1; i < kume.length && secilen.length < adet; i++) {
      ekle(kume[(baslangic + i) % kume.length])
    }
  }

  // 4) Son çare: genel havuz. Liste boş dönmesin.
  if (secilen.length < adet) {
    const kayma = slugKaymasi(slug, Math.max(hepsi.length, 1))
    for (let i = 0; i < hepsi.length && secilen.length < adet; i++) {
      ekle(hepsi[(kayma + i) % hepsi.length])
    }
  }

  return secilen
}

/**
 * Slug'dan sabit bir başlangıç noktası. Rastgele değil: aynı slug her zaman
 * aynı sayıyı verir, yoksa her build farklı link üretir ve tarayıcı sürekli
 * değişen bir sayfa görür.
 */
function slugKaymasi(slug: string, mod: number): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return mod > 0 ? h % mod : 0
}
