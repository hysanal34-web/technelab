'use client'
import { useLang } from '@/contexts/LanguageContext'

const STATS = [
  {
    n: '8+',
    tr: { l: 'Atölye',    sub: 'Bu sezon aktif' },
    en: { l: 'Workshops', sub: 'Active this season' },
  },
  {
    n: '2026',
    tr: { l: 'Kuruluş',  sub: '1 Mart, İstanbul' },
    en: { l: 'Founded',   sub: 'March 1, Istanbul' },
  },
  {
    n: '2',
    tr: { l: 'Lokasyon',  sub: 'Taksim & Kadıköy' },
    en: { l: 'Locations', sub: 'Taksim & Kadıköy' },
  },
  {
    n: '∞',
    tr: { l: 'Pratik',    sub: 'Laboratuvar ruhu' },
    en: { l: 'Practice',  sub: 'Laboratory spirit' },
  },
]

export function ClientStats() {
  const { lang } = useLang()
  return (
    <>
      {STATS.map(({ n, tr, en }, i) => {
        const { l, sub } = lang === 'en' ? en : tr
        return (
          <div
            key={i}
            className={`relative px-8 py-12 group overflow-hidden bg-bg hover:bg-bgAlt transition-colors duration-300 ${i < 3 ? 'border-r border-border' : ''}`}
          >
            <div className="absolute inset-0 bauhaus-grid opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div
              className="font-display text-neon mb-2 relative z-10"
              style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', letterSpacing: '0.02em', lineHeight: 1 }}
            >
              {n}
            </div>
            <div className="font-mono text-[11px] text-fg tracking-[0.16em] uppercase mb-1 relative z-10">{l}</div>
            <div className="font-mono text-[11px] text-dim relative z-10">{sub}</div>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon group-hover:w-full transition-all duration-500" />
          </div>
        )
      })}
    </>
  )
}
