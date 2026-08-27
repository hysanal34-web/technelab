import Link from 'next/link'
import { WORKSHOPS } from '@/lib/data'

/**
 * Makale sonu CTA.
 * Blog trafiği eskiden hiçbir yere akmıyordu — makaleler tag'lerine göre
 * en yakın aktif programa bağlanıyor, eşleşme yoksa atölye testine düşüyor.
 */

const RULES: { match: RegExp; slug: string }[] = [
  { match: /yazar|dramaturj|metin|oyun yaz|senaryo|devising/i, slug: 'auteur-lab' },
  { match: /müzikal|muzikal|şan|sarki|şarkı|vokal/i,          slug: 'techne-musical-lab' },
  { match: /dans|koreograf|broadway|hareket|beden/i,           slug: 'broadway-musical-dance' },
  { match: /ingilizce|i̇ngilizce|english|dil|konuşma/i,        slug: 'english-drama-lab' },
  { match: /kamera|dizi|film|audition|casting|self.?tape|set/i, slug: 'camera-praxis' },
  { match: /çocuk|genç|ergen|lise|veli|yaş/i,                  slug: 'english-drama-youth' },
  { match: /oyuncu|ses|nefes|mevcudiyet|sahne|performans|doğaçlama|stanislavski|meisner|chekhov|karakter/i, slug: 'oyuncunun-mevcudiyeti' },
]

export function ArticleCTA({ tags, category }: { tags: string[]; category?: string }) {
  const haystack = [...tags, category ?? ''].join(' ')
  const rule = RULES.find((r) => r.match.test(haystack))
  const w = rule ? WORKSHOPS.find((x) => x.slug === rule.slug && x.active) : undefined

  if (!w) {
    return (
      <section className="px-4 md:px-10 py-14 border-t border-border bg-bgAlt">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">okumaktan yapmaya</p>
        <h2
          className="font-display text-fg mb-6"
          style={{ fontSize: 'clamp(24px,3.5vw,44px)', letterSpacing: '0.02em', lineHeight: 1.05 }}
        >
          BU KONUYU SAHNEDE ÇALIŞMAK İSTER MİSİN?
        </h2>
        <Link
          href="/atolyeler"
          className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
          data-hover
        >
          programları gör →
        </Link>
      </section>
    )
  }

  const start = w.schedule?.[0]

  return (
    <section className="px-4 md:px-10 py-14 border-t border-border bg-bgAlt">
      <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">okumaktan yapmaya</p>
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end max-w-4xl">
        <div>
          <h2
            className="font-display text-fg mb-3"
            style={{ fontSize: 'clamp(24px,3.5vw,44px)', letterSpacing: '0.02em', lineHeight: 1.05 }}
          >
            {w.title}
          </h2>
          <p className="font-body text-[13px] text-stone leading-relaxed mb-4 max-w-xl">{w.tagline}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.12em] uppercase">
            {start && <span className="text-neon">{start.date}{start.time ? ` · ${start.time}` : ''}</span>}
            <span className="text-stone">{w.duration}</span>
            <span className="text-stone">{w.venue}</span>
          </div>
        </div>
        <Link
          href={`/atolyeler/${w.slug}`}
          className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200 whitespace-nowrap"
          data-hover
        >
          programı incele →
        </Link>
      </div>
    </section>
  )
}
