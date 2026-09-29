import Link from 'next/link'
import { aktifSessions } from '@/app/tanisma-gunu/sessions'

/**
 * "Salon": sahnenin hemen altı. Açık tanışma günleri tek kaynaktan
 * (sessions.ts), render anında süzülür; geçmiş tarih basılmaz.
 * Sunucu bileşeni: tarih hesabı istemciye inmez.
 */
export function BuHafta() {
  const sessions = aktifSessions()
  if (sessions.length === 0) return null
  const rows = sessions.map((s) => {
    const [prog, rest = ''] = s.label.split(' — ')
    const parts = rest.split(' · ')
    return { id: s.id, prog: prog.replace(/\s*\(.*?\)\s*/g, ' ').trim(), place: parts[0] ?? '', date: parts[1] ?? '', time: parts[2] ?? '' }
  })
  return (
    <section className="surface-dark border-t border-fg/10" aria-labelledby="buhafta-heading">
      <div className="px-6 md:px-12 py-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
        <div className="shrink-0">
          <p className="font-code text-[11px] tracking-[0.22em] uppercase text-neon mb-1">— ücretsiz tanışma günleri</p>
          <h2 id="buhafta-heading" className="font-display text-fg leading-none" style={{ fontSize: 'clamp(22px,2.4vw,32px)', letterSpacing: '0.02em' }}>
            AÇIK SEANSLAR
          </h2>
        </div>
        <ul className="flex gap-px overflow-x-auto bg-fg/10 border border-fg/10 md:flex-1 [scrollbar-width:none]">
          {rows.map((r) => (
            <li key={r.id} className="shrink-0 bg-bg">
              <Link href={`/tanisma-gunu?seans=${r.id}`} className="group block px-5 py-4 min-w-[190px] hover:bg-bgAlt transition-colors" data-hover>
                <span className="block font-display text-fg group-hover:text-neon transition-colors text-[20px] leading-none">{r.date}</span>
                <span className="block font-code text-[11px] tracking-[0.12em] uppercase text-fg/60 mt-2">{r.prog}</span>
                <span className="block font-code text-[11px] tracking-[0.12em] uppercase text-neon mt-1">{r.place}{r.time ? ` · ${r.time}` : ''}</span>
              </Link>
            </li>
          ))}
          <li className="shrink-0 bg-neon">
            <Link href="/tanisma-gunu" className="flex h-full items-center px-5 font-code text-[11px] tracking-[0.18em] uppercase text-ink hover:bg-fg transition-colors" data-hover>
              tümü →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
