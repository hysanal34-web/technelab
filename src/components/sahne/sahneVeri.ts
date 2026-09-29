import { WORKSHOPS, type Workshop } from '@/lib/data'
import { aktifSessions } from '@/app/tanisma-gunu/sessions'

/**
 * Sahnedeki bloklar için veri — tek kaynak data.ts, tanışma bilgisi sessions.ts.
 *
 * Sunucuda hesaplanıp istemci bileşenine prop olarak iner; `aktifSessions()`
 * tarih okuduğu için istemcide çağrılmaz (gün dönümünde hidrasyon uyuşmazlığı).
 */
export type SahneProgram = {
  slug: string
  /** Bloğa kazınan ad: parantezli kısım ("(10–17)") atılmış hâli. */
  title: string
  /** Blok altındaki mono satır. */
  sub: string
  /** Odak kartındaki iki cümle. */
  desc: string
  /** Bu programın açık bir tanışma günü var mı — kart butonu buna göre. */
  tanisma: boolean
}

function kisaAciklama(w: Workshop): string {
  // desc'in ilk paragrafı, en fazla iki cümle
  const p = w.desc.split('\n')[0]
  const cumleler = p.match(/[^.!?]+[.!?]+/g) ?? [p]
  return cumleler.slice(0, 2).join(' ').trim()
}

export function sahneProgramlari(): SahneProgram[] {
  const acik = new Set(aktifSessions().map((s) => s.slug))
  return WORKSHOPS.filter((w) => w.active).map((w) => ({
    slug: w.slug,
    title: w.title.replace(/\s*\(.*?\)\s*/g, ' ').trim(),
    sub: `${w.venue} · ${w.duration}`,
    desc: kisaAciklama(w),
    tanisma: acik.has(w.slug),
  }))
}
