import type { Metadata } from 'next'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { WorkshopsFilter } from '@/components/WorkshopsFilter'

export const metadata: Metadata = {
  title: 'Atölyeler — Oyunculuk, Dans, Müzikal, Yazarlık Kursları',
  description: 'İstanbul\'da oyunculuk kursu, acting workshop, yaratıcı drama, İngilizce drama, Broadway müzikal dansı, oyun yazarlığı, dramaturji ve senaryo atölyeleri. Küçük gruplar, yoğun pratik. Pera ve Kadıköy.',
  alternates: { canonical: `${SITE_META.url}/atolyeler` },
  keywords: [
    'oyunculuk kursu istanbul',
    'oyunculuk atölyeleri',
    'acting workshop istanbul',
    'yaratıcı drama atölyesi',
    'ingilizce drama atölyesi',
    'english acting workshop',
    'dans kursu istanbul',
    'jazz dans atölyesi',
    'broadway müzikal dansı',
    'müzikal tiyatro kursu',
    'oyun yazarlığı atölyesi',
    'yaratıcı yazarlık kursu',
    'dramaturji atölyesi',
    'senaryo atölyesi istanbul',
    'sanat okulu istanbul',
    'art academy istanbul',
    'tiyatro kursu kadıköy',
  ],
  openGraph: {
    title: 'Techne Lab Atölyeleri — Oyunculuk, Dans, Müzikal, Yazarlık',
    description: 'İstanbul\'da oyunculuk kursu, acting workshop, yaratıcı drama, İngilizce drama, Broadway dans, müzikal, oyun yazarlığı ve dramaturji atölyeleri.',
    url: `${SITE_META.url}/atolyeler`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Techne Lab İstanbul — Tüm Atölyeler',
  description: 'İstanbul\'da oyunculuk, yazarlık, dans, müzikal ve İngilizce drama atölyeleri.',
  url: `${SITE_META.url}/atolyeler`,
  itemListElement: WORKSHOPS.map((w, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'Course',
      '@id': `${SITE_META.url}/atolyeler/${w.slug}#course`,
      name: `${w.title} — ${w.sub}`,
      description: w.desc,
      url: `${SITE_META.url}/atolyeler/${w.slug}`,
      image: w.images?.[0]
        ? `${SITE_META.url}/images/gallery/${w.images[0]}.jpg`
        : `${SITE_META.url}/images/og-techne-lab.png`,
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_META.url}#organization`,
        name: SITE_META.name,
        url: SITE_META.url,
      },
      offers: {
        '@type': 'Offer',
        availability: w.active ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        url: `${SITE_META.url}/atolyeler/${w.slug}`,
      },
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
            Oyunculuk, yazarlık, dramaturji, dans, müzikal ve İngilizce drama. Küçük gruplar, yoğun pratik. Pera ve Kadıköy.
          </p>
        </div>
      </section>

      {/* Client-side filter + list */}
      <WorkshopsFilter />
    </>
  )
}
