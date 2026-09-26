/**
 * Serbest metin tarih çözücü. Bağımlılığı yok — hem sunucu hem istemci
 * tarafından import edilebilsin diye ayrı dosyada.
 *
 * Tarihler site genelinde serbest metin ("3 Ekim Cumartesi") olarak tutuluyor,
 * çünkü site bunları olduğu gibi basıyor. Tek kaynak metnin kendisi; makine
 * okunur ikinci bir alan tutulmuyor ki ikisi birbirinden kaymasın.
 */

const AYLAR: Record<string, number> = {
  ocak: 0, şubat: 1, subat: 1, mart: 2, nisan: 3, mayıs: 4, mayis: 4, haziran: 5,
  temmuz: 6, ağustos: 7, agustos: 7, eylül: 8, eylul: 8, ekim: 9, kasım: 10,
  kasim: 10, aralık: 11, aralik: 11,
}

export function metinTarihiCoz(metin: string, bugun = new Date()): Date | null {
  const m = metin.toLocaleLowerCase('tr-TR').match(/(\d{1,2})\s+([a-zçğıöşü]+)/)
  if (!m) return null
  const gun = Number(m[1])
  const ay = AYLAR[m[2]]
  if (ay === undefined || gun < 1 || gun > 31) return null

  const aday = new Date(bugun.getFullYear(), ay, gun)
  // Yıl yazılmıyor. 60 günden fazla geride kalan bir tarih büyük ihtimalle
  // gelecek yılı kastediyor (ör. Ocak, Kasım'da yazıldığında).
  const fark = (aday.getTime() - bugun.getTime()) / 86_400_000
  if (fark < -60) aday.setFullYear(aday.getFullYear() + 1)
  return aday
}

/**
 * Bilerek geçmişte yazılan tarihler. English Drama Lab Kadıköy grubu
 * "14 Eylül'de başladı · katılım açık" diyor: tarih geçmiş ama metin doğru,
 * çünkü gruba sonradan katılım alınıyor. Bunlar uyarı üretmemeli, yoksa her
 * gün kırmızı bir satır görünür ve uyarıya bakılmaz olur.
 */
export const KASITLI_GECMIS = /başladı|katılım açık|devam ediyor|sürüyor/i

/** Metindeki tarih bugünden önce mi? Çözülemeyen metin geçmiş sayılmaz. */
export function gecmisMi(metin: string, bugun = new Date()): boolean {
  if (KASITLI_GECMIS.test(metin)) return false
  const gunBasi = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate())
  const t = metinTarihiCoz(metin, gunBasi)
  if (!t) return false
  return t.getTime() < gunBasi.getTime()
}
