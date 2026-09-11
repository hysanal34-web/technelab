import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { TEAM } from '@/lib/ekip'
import { TeamGrid } from '@/components/TeamGrid'

export const metadata: Metadata = {
  title: 'Ekip — Eğitmenler & Sanatçılar',
  description:
    'Techne Lab İstanbul ekibi: oyuncular, yönetmenler, koreograflar ve eğitmenler. Yedi sanatçı, dört disiplin, tek sahne. Pera & Kadıköy.',
  alternates: { canonical: `${SITE_META.url}/ekip` },
  openGraph: {
    title: 'Ekip — Techne Lab İstanbul',
    description: 'Yedi sanatçı, dört disiplin, tek sahne.',
    url: `${SITE_META.url}/ekip`,
  },
}

// Selen Uçer — arşivde, program kesinleşmedi
// {
//   name: 'Selen Uçer', slug: 'selen-ucer', role: 'Eğitmen',
//   bio: 'Roosevelt Üniversitesi (Chicago) Tiyatro yüksek lisanslı. Boğaziçi Üniversitesi\'nde Kimya lisansının ardından sahneye geçti. New York\'ta off-Broadway projelerde yer aldı. Çok sayıda ulusal ve uluslararası ödüllü film ve tiyatro çalışması var.',
//   programs: [{ label: 'Camera Praxis', slug: 'camera-praxis' }],
// }

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_META.name,
  url: SITE_META.url,
  member: TEAM.map((m) => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    worksFor: { '@type': 'Organization', name: SITE_META.name },
  })),
}

type Props = { searchParams: Promise<{ open?: string }> }

export default async function EkipPage({ searchParams }: Props) {
  const { open } = await searchParams

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Neon top rule */}
      <div className="h-[3px] w-full bg-neon" />

      {/* Header */}
      <section className="px-4 md:px-14 pt-24 pb-12 border-b border-border relative overflow-hidden">
        <div
          className="absolute -top-4 -right-4 font-display leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(80px,14vw,200px)', color: 'transparent', WebkitTextStroke: '1px rgba(200,255,0,0.07)' }}
          aria-hidden="true"
        >
          CAST
        </div>
        <div className="flex items-end justify-between relative z-10">
          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">techne lab — ekip</p>
            <h1
              className="font-display text-fg"
              style={{ fontSize: 'clamp(44px, 7.5vw, 108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}
            >
              EKİP
            </h1>
          </div>
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim pb-2">
            {TEAM.length}&nbsp;sanatçı
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="pb-24">
        <TeamGrid members={TEAM} initialOpen={open} />
      </section>
    </>
  )
}
