/**
 * Tanışma günü oturumları — tek form, tüm programlar. Form seçeneği ve
 * e-posta etiketi tek kaynaktan.
 *
 * Yayındaki tanışma günleri (2 Ekim 2026 itibarıyla):
 *   Youth     → Pera 4 Ekim Paz 13:00
 *   EDL       → Pera 3 Ekim Cmt 15:00 · Kadıköy her Pazartesi 20:00 (yinelenen, tarih kendiliğinden)
 *   Musical + Broadway → Pera 3 Ekim Cmt 19:00
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
 * DİKKAT: Musical Lab yalnızca Kadıköy'de yürüyor; tanışma seansı Pera'da, Broadway ile
 * ortak. Metinlerde "tanışma Pera'da, program Kadıköy'de" ayrımı açıkça yazılmalı.
 *
 * 15 Eylül 2026: 12 ve 13 Eylül seansları kaldırıldı, Youth için 27 Eylül Pazar eklendi,
 * Musical Lab 19 Eylül Broadway seansına eklendi (iki programın eğitmeni de Köksal Ünal).
 *
 * 22 Eylül 2026: 19 Eylül Pera seansları (EDL · Praxis · Broadway · Musical Lab) geçtiği
 * için kaldırıldı. Bu dört programın tanışma günü şu an YOK; programlar 3 Ekim'de
 * başlıyor, yeni tarih verilince buraya eklenecek.
 *
 * Tanışma günü OLMAYAN programlar: The Auteur Lab · Broadway Kadıköy grubu.
 *
 * GEÇMİŞ TARİH: artık elle temizlemeye gerek yok. `aktifSessions()` label'daki
 * tarihi okuyup geçmiş olanı eliyor; form ve server action ikisi de onu kullanıyor.
 * Buradaki satırı silmek yalnızca arşiv temizliği, doğruluk için şart değil.
 */
import { gecmisMi } from '@/lib/tarihMetin'

export type TanismaSession = {
  id: string
  program: string
  /** data.ts'teki Workshop.slug — dönüşüm değeri buradan okunuyor. */
  slug: string
  label: string
  english: boolean   // İngilizce seviyesi sorulsun mu
  youth: boolean     // veli alanları + 10–17 yaş kontrolü
  minAge: number
  maxAge?: number
  /**
   * Her hafta yinelenen seans: 0 = Pazar … 1 = Pazartesi … 6 = Cumartesi.
   * Label'da tarih yazılmaz ("her Pazartesi"); `aktifSessions()` bir sonraki
   * tarihi hesaplayıp label'a yazar. Elle yenilemek gerekmez.
   */
  haftalik?: { gun: number; saat: string }
}

// 29 Eylül 2026: Ekim tanışma günleri eklendi (Yağız). Saati verilmeyen
// seanslarda saat label'a yazılmadı; kayıt sonrası DM/telefonla iletiliyor.
// Saati olanlar data.ts'teki program başlangıç saatleriyle aynı.
export const TANISMA_SESSIONS: readonly TanismaSession[] = [

  // English Drama Youth
  { id: 'youth-pera-4',      program: 'English Drama Youth',    slug: 'english-drama-youth',    label: 'English Drama Youth (10–17) — Pera · 4 Ekim Pazar · 13:00',       english: true,  youth: true,  minAge: 10, maxAge: 17 },

  // English Drama Lab
  // 2 Ekim 2026 (Yağız): Kadıköy grubu her Pazartesi 20:00 tanışmaya açık; tarih haftalık kendiliğinden yenilenir.
  { id: 'edl-kadikoy-pzt',   program: 'English Drama Lab',      slug: 'english-drama-lab',      label: 'English Drama Lab — Kadıköy · her Pazartesi · 20:00',               english: true,  youth: false, minAge: 18, haftalik: { gun: 1, saat: '20:00' } },
  { id: 'edl-pera-3',        program: 'English Drama Lab',      slug: 'english-drama-lab',      label: 'English Drama Lab — Pera · 3 Ekim Cumartesi · 15:00',              english: true,  youth: false, minAge: 18 },

  // Techne Musical Lab (program Kadıköy'de yürüyor)
  { id: 'musical-pera-3',    program: 'Techne Musical Lab',     slug: 'techne-musical-lab',     label: 'Techne Musical Lab — Pera · 3 Ekim Cumartesi · 19:00',             english: false, youth: false, minAge: 15, maxAge: 55 },

  // Broadway Musical Dance
  { id: 'broadway-pera-3',     program: 'Broadway Musical Dance', slug: 'broadway-musical-dance', label: 'Broadway Musical Dance — Pera · 3 Ekim Cumartesi · 19:00',     english: false, youth: false, minAge: 12, maxAge: 55 },
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
    .filter((s) => !gecmisMi(s.label, bugun))
    .map((s) => (s.haftalik ? { ...s, label: haftalikLabel(s, bugun) } : s))
}

const GUN_ADI = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
const AY_ADI = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

/**
 * Yinelenen seansın bir sonraki tarihi. Seans günü bugünse ve saat 18:00'i
 * geçmediyse bugün; yoksa gelecek hafta. Label'daki "her Pazartesi" yerine
 * "5 Ekim Pazartesi" yazılır; e-posta ve panel bu label'ı görür.
 */
export function sonrakiTarih(gun: number, bugun = new Date()): Date {
  const d = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate())
  let fark = (gun - d.getDay() + 7) % 7
  if (fark === 0 && bugun.getHours() >= 18) fark = 7
  d.setDate(d.getDate() + fark)
  return d
}

function haftalikLabel(s: TanismaSession, bugun: Date): string {
  const h = s.haftalik!
  const t = sonrakiTarih(h.gun, bugun)
  return s.label.replace(/her \S+/, `${t.getDate()} ${AY_ADI[t.getMonth()]} ${GUN_ADI[h.gun]}`)
}

/** Program B1 ve üzeri — daha düşük seviye seçeneği sunulmuyor. */
export const ENGLISH_LEVELS = ['B1', 'B2', 'C1 ve üzeri'] as const
