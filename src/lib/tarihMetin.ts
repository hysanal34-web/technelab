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

/**
 * Verilen anın İstanbul'daki takvim günü ve gün içindeki dakikası.
 *
 * NEDEN: Vercel sunucusu UTC çalışıyor, tarayıcı ise kullanıcının saat
 * diliminde. `getHours()` / `getDate()` ile hesaplanan kesim İstanbul'da
 * fiilen 3 saat kayıyordu (18:00 kesimi 21:00'e düşüyordu) ve sunucuyla
 * tarayıcı aynı anda farklı tarih basabiliyordu. Seanslar İstanbul'da,
 * hesap da İstanbul saatine göre.
 *
 * `gun`: o takvim gününün yerel gece yarısı (yalnız yıl/ay/gün karşılaştırması
 * ve `getDay()` için; saat bilgisi taşımaz).
 */
export function istanbulSimdi(an = new Date()): { gun: Date; dakika: number } {
  const p: Record<string, string> = {}
  for (const x of new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(an)) p[x.type] = x.value
  return {
    gun: new Date(Number(p.year), Number(p.month) - 1, Number(p.day)),
    dakika: Number(p.hour) * 60 + Number(p.minute),
  }
}

/** "15:00" → 900. Metinde saat yoksa null. */
export function saatDakika(metin: string): number | null {
  const m = metin.match(/\b(\d{1,2})[:.](\d{2})\b/)
  if (!m) return null
  const sa = Number(m[1]), dk = Number(m[2])
  if (sa > 23 || dk > 59) return null
  return sa * 60 + dk
}

/** Metindeki tarih bugünden (İstanbul günü) önce mi? Çözülemeyen metin geçmiş sayılmaz. */
export function gecmisMi(metin: string, bugun = new Date()): boolean {
  if (KASITLI_GECMIS.test(metin)) return false
  const gunBasi = istanbulSimdi(bugun).gun
  const t = metinTarihiCoz(metin, gunBasi)
  if (!t) return false
  return t.getTime() < gunBasi.getTime()
}
