/**
 * Tanışma günü oturumları — tek form, tüm programlar. Form seçeneği ve
 * e-posta etiketi tek kaynaktan.
 *
 * Yayındaki tanışma günleri:
 *   Taksim Pera · 19 Eylül Cmt → EDL 15:00 · Praxis 17:00 ·
 *       19:00 Broadway Musical Dance & Techne Musical Lab (tek seans, eğitmen Köksal Ünal)
 *   Kadıköy · 27 Eylül Paz → English Drama Youth 13:00 (iki yaka için tek tanışma günü)
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
 * Tanışma günü OLMAYAN programlar: The Auteur Lab · Broadway Kadıköy grubu.
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
  { id: 'edl-pera',         program: 'English Drama Lab',      slug: 'english-drama-lab',           label: 'English Drama Lab — Taksim Pera · 19 Eylül Cumartesi · 15:00',          english: true,  youth: false, minAge: 18 },
  { id: 'praxis',           program: 'English Acting Praxis',  slug: 'english-drama-final-project', label: 'English Acting Praxis — Taksim Pera · 19 Eylül Cumartesi · 17:00',      english: true,  youth: false, minAge: 18 },
  { id: 'broadway-pera',    program: 'Broadway Musical Dance', slug: 'broadway-musical-dance',      label: 'Broadway Musical Dance — Taksim Pera · 19 Eylül Cumartesi · 19:00',     english: false, youth: false, minAge: 12, maxAge: 55 },
  { id: 'musical-pera',     program: 'Techne Musical Lab',     slug: 'techne-musical-lab',          label: 'Techne Musical Lab — Taksim Pera · 19 Eylül Cumartesi · 19:00 (Broadway ile aynı seans)', english: false, youth: false, minAge: 15, maxAge: 55 },
  { id: 'youth-kadikoy-27', program: 'English Drama Youth',    slug: 'english-drama-youth',         label: 'English Drama Youth (10–17) — Kadıköy · 27 Eylül Pazar · 13:00',        english: true,  youth: true,  minAge: 10, maxAge: 17 },
] as const

/** Program B1 ve üzeri — daha düşük seviye seçeneği sunulmuyor. */
export const ENGLISH_LEVELS = ['B1', 'B2', 'C1 ve üzeri'] as const
