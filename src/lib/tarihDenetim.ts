import { WORKSHOPS } from '@/lib/data'
import { TANISMA_SESSIONS } from '@/app/tanisma-gunu/sessions'
import { metinTarihiCoz, KASITLI_GECMIS } from '@/lib/tarihMetin'

export { metinTarihiCoz }

/**
 * Yayındaki tarihlerin geçmişte kalıp kalmadığını denetler.
 *
 * NEDEN VAR: bu projede en pahalı hata bu. Reklam geçmiş bir tarihi duyurunca
 * tıklayan kişi sayfaya gelir, tarihi görür ve kaybedilir — hem reklam
 * parası hem aday gitmiş olur. Elle kontrol edilecek beş kaynak var ve
 * unutuluyor; panel bunu her açılışta kendi yapıyor.
 *
 * Tarihler serbest metin ("3 Ekim Cumartesi") olarak tutuluyor, çünkü site
 * bunları olduğu gibi basıyor. Burada ay adından bir tarih üretiyoruz; yıl
 * yazılmadığı için en yakın makul yılı seçiyoruz (bugünden en fazla 60 gün
 * geride kalan bir tarih hâlâ "bu sezon" sayılır, daha eskisi gelecek yıla).
 */

export type TarihBulgusu = {
  kaynak: string
  program: string
  metin: string
  gecmis: boolean
  gunFarki: number | null
}

export function tarihleriDenetle(bugun = new Date()): TarihBulgusu[] {
  const bulgular: TarihBulgusu[] = []
  const gunBasi = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate())

  const ekle = (kaynak: string, program: string, metin: string) => {
    const t = metinTarihiCoz(metin, gunBasi)
    const gunFarki = t ? Math.round((t.getTime() - gunBasi.getTime()) / 86_400_000) : null
    const gecmis = gunFarki !== null && gunFarki < 0 && !KASITLI_GECMIS.test(metin)
    bulgular.push({ kaynak, program, metin, gecmis, gunFarki })
  }

  for (const w of WORKSHOPS) {
    if (!w.active || w.archived) continue
    for (const s of w.schedule ?? []) {
      const yer = s.place ? `${s.place} · ` : ''
      ekle('data.ts', w.title, `${yer}${s.date}${s.time ? ` · ${s.time}` : ''}`)
    }
  }

  for (const s of TANISMA_SESSIONS) {
    ekle('sessions.ts', s.program, s.label)
  }

  return bulgular
}
