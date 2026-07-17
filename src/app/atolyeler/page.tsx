import type { Metadata } from 'next'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { WorkshopsFilter } from '@/components/WorkshopsFilter'

export const metadata: Metadata = {
  title: 'Atölyeler — Tiyatro & Performans Programları',
  description: 'Oyunculuk, yazarlık, kamera önü, dans, müzikal ve İngilizce drama atölyeleri. Küçük gruplar, yoğun pratik. Taksim ve Kadıköy.',
  alternates: { canonical: `${SITE_META.url}/atolyeler` },
  openGraph: {
    title: 'Techne Lab Atölyeleri — Tiyatro & Performans',
    description: 'İstanbul\'da oyunculuk, yazarlık, kamera, dans, müzikal ve İngilizce drama atölyeleri.',
    url: `${SITE_META.url}/atolyeler`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Techne Lab Atölyeleri',
  itemListElement: WORKSHOPS.map((w, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'Course',
      name: `${w.title} — ${w.sub}`,
      description: w.desc,
      provider: { '@type': 'Organization', name: SITE_META.name },
      url: `${SITE_META.url}/atolyeler/${w.slug}`,
    },
  })),
}

export default function WorkshopsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="px-4 md:px-10 pt-24 pb-0 border-b border-border">
        <div className="h-px w-full bg-neon mb-0" />
        <div className="py-16">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">atölyeler</p>
          <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(44px,7.5vw,108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
            ATÖLYELER
          </h1>
          <p className="font-mono text-[14px] text-stone max-w-xl leading-relaxed">
            Oyunculuk, yazarlık, kamera, dans, müzikal ve İngilizce drama. Küçük gruplar, yoğun pratik. Taksim ve Kadıköy.
          </p>
        </div>
      </section>

      {/* Client-side filter + list */}
      <WorkshopsFilter />
    </>
  )
}
