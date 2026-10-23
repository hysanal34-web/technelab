/**
 * Tanışma günü oturumları — tek form, tüm programlar. Form seçeneği ve
 * e-posta etiketi tek kaynaktan.
 *
 * Yayındaki tanışma günleri (6 Ekim 2026 itibarıyla):
 *   Youth     → Pera her Pazar 13:00 · Kadıköy her Cumartesi 15:00, ilk 17 Ekim (yinelenen)
 *   EDL       → Pera her Cumartesi 15:00 · Kadıköy her Pazartesi 20:00 (yinelenen)
 *   Musical   → Pera her Perşembe ve Cumartesi · Kadıköy her Pazartesi ve Salı (yinelenen, ilk 8/10/12/13 Ekim)
 *   Broadway  → Pera her Cumartesi 19:00 (yinelenen, ilk 10 Ekim)
 *
 * 2 Ekim 2026: 10 Ekim Kadıköy seansları (Youth · EDL · Musical · Broadway) kaldırıldı (Yağız).
 * O tarihe kayıt olanlara ekipçe ulaşılıyor. Geçmiş 27 Eylül ve 1 Ekim satırları arşivden silindi.
 *
 * Program bazlı link: /tanisma-gunu?program=<slug>  (liste o programa daralır)
 * Seans bazlı link:   /tanisma-gunu?seans=<id>      (seans seçili gelir)
 *
 * Program başlangıçları (data.ts): Pera EDL 3 Ekim 15:00 · Praxis 3 Ekim 11:00 ·
 * Broadway Pera 3 Ekim 19:00 · Youth Pera 4 Ekim 13:00 | Kadıköy EDL 14 Eylül 20:00 ·
 * Broadway Kadıköy 1 Ekim · Musical Lab 28 Eylül · Youth Kadıköy 3 Ekim · Auteur 7 Ekim
 *
 * 22 Ekim 2026 (Yağız): Tanışma günü OLAN programlar:
 *   English Drama Youth — Kadıköy Cumartesi 15:00 · Pera Pazar 13:00
 *   Techne Musical Lab  — Kadıköy Pazartesi ve Salı 19:00
 *   English Drama Lab   — Pera Cumartesi 15:00 · Kadıköy Pazartesi 20:00
 * Tanışma günü OLMAYAN programlar: Acting Praxis · Broadway Musical Dance ·
 * The Auteur Lab.
 *
 * Program sayfasındaki "tanışma gününe kaydol" düğmesi bu listeye bakıyor
 * (`atolyeler/[slug]/page.tsx`), yani buradan silinen program için düğme de
 * kendiliğinden kayboluyor. Ayrıca elle bir şey kapatmak gerekmiyor.
 *
 * GEÇMİŞ TARİH: artık elle temizlemeye gerek yok. `aktifSessions()` label'daki
 * tarihi okuyup geçmiş olanı eliyor; form ve server action ikisi de onu kullanıyor.
 * Buradaki satırı silmek yalnızca arşiv temizliği, doğruluk için şart değil.
 */
import { gecmisMi, istanbulSimdi, metinTarihiCoz, saatDakika } from '@/lib/tarihMetin'

export type TanismaSession = {
  id: string
  program: string
  /** data.ts'teki Workshop.slug — dönüşüm değeri buradan okunuyor. */
  slug: string
  label: string
  english: boolean   // İngilizce seviyesi sorulsun mu
  youth: boolean     // veli alanları + 8–17 yaş kontrolü
  minAge: number
  maxAge?: number
  /**
   * Her hafta yinelenen seans: 0 = Pazar … 1 = Pazartesi … 6 = Cumartesi.
   * Label'da tarih yazılmaz ("her Pazartesi"); `aktifSessions()` bir sonraki
   * tarihi hesaplayıp label'a yazar. Elle yenilemek gerekmez.
   */
  haftalik?: { gun: number; saat: string; /** İlk seans tarihi (YYYY-MM-DD); öncesinde listelenmez. */ baslangic?: string }
}

// 29 Eylül 2026: Ekim tanışma günleri eklendi (Yağız). Saati verilmeyen
// seanslarda saat label'a yazılmadı; kayıt sonrası DM/telefonla iletiliyor.
// Saati olanlar data.ts'teki program başlangıç saatleriyle aynı.
export const TANISMA_SESSIONS: readonly TanismaSession[] = [

  // English Drama Youth
  // 6 Ekim 2026 (Yağız): Pera grubu her Pazar 13:00 tanışmaya açık; tarih haftalık kendiliğinden yenilenir.
  // 6 Ekim 2026 (Yağız): Kadıköy grubu 17 Ekim Cumartesi 15:00'ten itibaren her hafta tanışmaya açık.
  { id: 'youth-kadikoy-cmt', program: 'English Drama Youth',    slug: 'english-drama-youth',    label: 'English Drama Youth (8–17) — Kadıköy · her Cumartesi · 15:00',    english: true,  youth: true,  minAge: 8, maxAge: 17, haftalik: { gun: 6, saat: '15:00', baslangic: '2026-10-17' } },
  { id: 'youth-pera-paz',    program: 'English Drama Youth',    slug: 'english-drama-youth',    label: 'English Drama Youth (8–17) — Pera · her Pazar · 13:00',          english: true,  youth: true,  minAge: 8, maxAge: 17, haftalik: { gun: 0, saat: '13:00' } },

  // Techne Musical Lab (program Kadıköy'de yürüyor)
  // 8 Ekim 2026 (Yağız): Musical tanışmaları HER HAFTA yinelenir.
  // 17 Ekim 2026 (Yağız): Pera seansları kaldırıldı, yalnız Kadıköy Pazartesi ve Salı
  // kaldı; saat 19:00 olarak netleşti ve label'a yazıldı.
  { id: 'musical-kadikoy-pzt', program: 'Techne Musical Lab',     slug: 'techne-musical-lab',     label: 'Techne Musical Lab — Kadıköy · her Pazartesi · 19:00',             english: false, youth: false, minAge: 15, maxAge: 55, haftalik: { gun: 1, saat: '19:00', baslangic: '2026-10-12' } },
  { id: 'musical-kadikoy-sal', program: 'Techne Musical Lab',     slug: 'techne-musical-lab',     label: 'Techne Musical Lab — Kadıköy · her Salı · 19:00',                  english: false, youth: false, minAge: 15, maxAge: 55, haftalik: { gun: 2, saat: '19:00', baslangic: '2026-10-13' } },

  // English Drama Lab
  // 17 Ekim 2026 (Yağız): kaldırılmıştı.
  // 22 Ekim 2026 (Yağız): geri açıldı, kaldırıldıktan sonra tanışma trafiği belirgin düştü.
  // Saatler data.ts'teki program saatleriyle aynı: Pera Cumartesi 15:00, Kadıköy Pazartesi 20:00.
  { id: 'edl-pera-cmt',      program: 'English Drama Lab',      slug: 'english-drama-lab',      label: 'English Drama Lab — Pera · her Cumartesi · 15:00',                 english: true,  youth: false, minAge: 18, haftalik: { gun: 6, saat: '15:00' } },
  { id: 'edl-kadikoy-pzt',   program: 'English Drama Lab',      slug: 'english-drama-lab',      label: 'English Drama Lab — Kadıköy · her Pazartesi · 20:00',              english: true,  youth: false, minAge: 18, haftalik: { gun: 1, saat: '20:00' } },

  // 17 Ekim 2026 (Yağız): Broadway Musical Dance ve Musical Pera seansları kaldırıldı.
  // Geri açılacaksa satırlar git geçmişinde: 17 Ekim 2026 öncesi sürüm.
] as const

/**
 * Bugün hâlâ geçerli olan seanslar.
 *
 * NEDEN VAR: 19 Eylül seansları üç gün boyunca formda kaldı ve kayıt almaya
 * devam etti. Geçmiş bir tarihe kaydolan kişi kaybedilmiş adaydır. Denetim
 * (`tarihDenetim.ts`) bunu panelde kırmızı gösteriyordu ama panele bakılana
 * kadar sayfa yanlış basmayı sürdürüyor. Burada tarih render anında eleniyor,
 * yani unutulması mümkün değil.
 *
 * Tarih label metninden okunuyor; ayrı bir tarih alanı tutulmuyor ki metinle
 * makine değeri birbirinden kaymasın (tek kaynak kuralı).
 */
export function aktifSessions(bugun = new Date()): readonly TanismaSession[] {
  return TANISMA_SESSIONS
    .filter((s) => !gecmisMi(s.label, bugun) && !bugunKapandiMi(s, bugun))
    .map((s) => (s.haftalik ? { ...s, label: haftalikLabel(s, bugun) } : s))
}

/** Seans saatinden bu kadar dakika önce kayıt kapanır (aynı gün). */
export const KAYIT_KAPANIS_DK = 60
/** Saati yazmayan seanslarda aynı gün kaydın kapandığı saat (İstanbul). */
const SAATSIZ_KESIM_DK = 18 * 60

/**
 * Tarihli (yinelenmeyen) seans bugünse ve label'da saat varsa, saatten
 * `KAYIT_KAPANIS_DK` önce listeden düşer. Yinelenen seanslar bunu
 * `sonrakiTarih` içinde zaten yapıyor (bir sonraki haftaya geçiyor).
 */
function bugunKapandiMi(s: TanismaSession, bugun: Date): boolean {
  if (s.haftalik) return false
  const ist = istanbulSimdi(bugun)
  const t = metinTarihiCoz(s.label, ist.gun)
  if (!t || t.getTime() !== ist.gun.getTime()) return false
  const saat = saatDakika(s.label)
  if (saat === null) return false // saatsiz tarihli seans: gün boyu açık (eski davranış)
  return ist.dakika >= saat - KAYIT_KAPANIS_DK
}

const GUN_ADI = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
const AY_ADI = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

/**
 * Yinelenen seansın bir sonraki tarihi (İstanbul takvimine göre).
 * Seans günü bugünse ve kayıt henüz kapanmadıysa bugün; yoksa gelecek hafta.
 * Kesim: `saat` verildiyse seans saatinden `KAYIT_KAPANIS_DK` dakika önce,
 * verilmediyse İstanbul saatiyle 18:00. Label'daki "her Pazartesi" yerine
 * "5 Ekim Pazartesi" yazılır; e-posta ve panel bu label'ı görür.
 */
export function sonrakiTarih(gun: number, bugun = new Date(), baslangic?: string, saat?: string): Date {
  const ist = istanbulSimdi(bugun)
  let d = new Date(ist.gun)
  const seansDk = saat ? saatDakika(saat) : null
  const kesim = seansDk !== null ? seansDk - KAYIT_KAPANIS_DK : SAATSIZ_KESIM_DK
  let gecKalindi = ist.dakika >= kesim
  if (baslangic) {
    const [y, m, g] = baslangic.split('-').map(Number)
    const b = new Date(y, m - 1, g)
    if (b.getTime() > d.getTime()) { d = b; gecKalindi = false } // ilk seanstan önce: ilk seansa git
  }
  let fark = (gun - d.getDay() + 7) % 7
  if (fark === 0 && gecKalindi) fark = 7
  d.setDate(d.getDate() + fark)
  return d
}

function haftalikLabel(s: TanismaSession, bugun: Date): string {
  const h = s.haftalik!
  const t = sonrakiTarih(h.gun, bugun, h.baslangic, h.saat)
  return s.label.replace(/her \S+/, `${t.getDate()} ${AY_ADI[t.getMonth()]} ${GUN_ADI[h.gun]}`)
}

/** Program B1 ve üzeri — daha düşük seviye seçeneği sunulmuyor. */
export const ENGLISH_LEVELS = ['B1', 'B2', 'C1 ve üzeri'] as const
