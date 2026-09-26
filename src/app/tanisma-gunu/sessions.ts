/**
 * Tanışma günü oturumları — tek form, tüm programlar. Form seçeneği ve
 * e-posta etiketi tek kaynaktan.
 *
 * Yayındaki tanışma günleri:
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
}

export const TANISMA_SESSIONS: readonly TanismaSession[] = [
  { id: 'youth-kadikoy-27', program: 'English Drama Youth',    slug: 'english-drama-youth',         label: 'English Drama Youth (10–17) — Kadıköy · 27 Eylül Pazar · 13:00',        english: true,  youth: true,  minAge: 10, maxAge: 17 },
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
  return TANISMA_SESSIONS.filter((s) => !gecmisMi(s.label, bugun))
}

/** Program B1 ve üzeri — daha düşük seviye seçeneği sunulmuyor. */
export const ENGLISH_LEVELS = ['B1', 'B2', 'C1 ve üzeri'] as const
