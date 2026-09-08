/**
 * Tanışma günü oturumları — tek form, tüm programlar. Form seçeneği ve
 * e-posta etiketi tek kaynaktan.
 *
 * Tarih ve saatler yayında. Başlangıçlar: Pera EDL 3 Ekim 15:00 · Praxis 3 Ekim 11:00 · Broadway 3 Ekim 19:00 · Youth 4 Ekim 13:00 | Kadıköy EDL 14 Eylül 20:00 · Broadway 1 Ekim Perşembe · Musical Lab 28 Eylül · Youth 3 Ekim · Auteur 7 Ekim
 *   Kadıköy · 12 Eylül Cmt (tek gün, tüm Kadıköy programları) → EDL 14:00 · Youth 13:00 · Auteur 16:30 · Broadway 18:30 · Musical Lab 18:30 (Broadway ile aynı seans)
 *   Taksim Pera · 13 Eylül Paz → Youth 13:00
 *   Taksim Pera · 19 Eylül Cmt → EDL 15:00 · Praxis 17:00 · Broadway 19:00
 *   (Pera'da Musical Lab programı yok — Pera'da yalnızca Broadway dans var.)
 */
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
}

export const TANISMA_SESSIONS: readonly TanismaSession[] = [
  { id: 'auteur',        program: 'The Auteur Lab',         slug: 'auteur-lab',                  label: 'The Auteur Lab — Kadıköy · 12 Eylül Cumartesi · 16:30',     english: false, youth: false, minAge: 18 },
  { id: 'edl-kadikoy',   program: 'English Drama Lab',      slug: 'english-drama-lab',           label: 'English Drama Lab — Kadıköy · 12 Eylül Cumartesi · 14:00',  english: true,  youth: false, minAge: 18 },
  { id: 'edl-pera',      program: 'English Drama Lab',      slug: 'english-drama-lab',           label: 'English Drama Lab — Taksim Pera · 19 Eylül Cumartesi · 15:00',     english: true,  youth: false, minAge: 18 },
  { id: 'youth-kadikoy', program: 'English Drama Youth',    slug: 'english-drama-youth',         label: 'English Drama Youth (10–17) — Kadıköy · 12 Eylül Cumartesi · 13:00', english: true, youth: true, minAge: 10, maxAge: 17 },
  { id: 'youth-pera',    program: 'English Drama Youth',    slug: 'english-drama-youth',         label: 'English Drama Youth (10–17) — Taksim Pera · 13 Eylül Pazar · 13:00',        english: true, youth: true, minAge: 10, maxAge: 17 },
  { id: 'musical',       program: 'Techne Musical Lab',     slug: 'techne-musical-lab',          label: 'Techne Musical Lab — Kadıköy · 12 Eylül Cumartesi · 18:30',     english: false, youth: false, minAge: 15, maxAge: 55 },
  { id: 'broadway-kadikoy', program: 'Broadway Musical Dance', slug: 'broadway-musical-dance',   label: 'Broadway Musical Dance — Kadıköy · 12 Eylül Cumartesi · 18:30', english: false, youth: false, minAge: 12, maxAge: 55 },
  { id: 'broadway-pera',    program: 'Broadway Musical Dance', slug: 'broadway-musical-dance',   label: 'Broadway Musical Dance — Taksim Pera · 19 Eylül Cumartesi · 19:00',    english: false, youth: false, minAge: 12, maxAge: 55 },
  { id: 'praxis',        program: 'English Acting Praxis',  slug: 'english-drama-final-project', label: 'English Acting Praxis — Taksim Pera · 19 Eylül Cumartesi · 17:00', english: true, youth: false, minAge: 18 },
] as const

/** Program B1 ve üzeri — daha düşük seviye seçeneği sunulmuyor. */
export const ENGLISH_LEVELS = ['B1', 'B2', 'C1 ve üzeri'] as const
