import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_META, WORKSHOPS } from '@/lib/data'
import { TEAM, getTeamMember } from '@/lib/ekip'
import { DISCIPLINES } from '@/lib/disiplinler'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return TEAM.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const m = getTeamMember(slug)
  if (!m) return {}
  const shortRole = m.role.split('·')[0].trim()
  const title = `${m.name} — ${shortRole} | Techne Lab İstanbul`
  const description = m.bio.length > 155 ? `${m.bio.slice(0, 152)}…` : m.bio
  return {
    title,
    description,
    alternates: { canonical: `${SITE_META.url}/ekip/${m.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_META.url}/ekip/${m.slug}`,
      images: m.image ? [{ url: `${SITE_META.url}${m.image}`, width: 800, height: 1000, alt: m.name }] : undefined,
    },
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params
  const m = getTeamMember(slug)
  if (!m) notFound()

  const programs = m.programs
    .map((p) => WORKSHOPS.find((w) => w.slug === p.slug))
    .filter((w): w is (typeof WORKSHOPS)[number] => Boolean(w))

  // İç link: bu eğitmenin çalıştığı programların bağlı olduğu disiplin hub sayfaları.
  const hubs = DISCIPLINES.filter((d) => m.programs.some((p) => d.workshopSlugs.includes(p.slug)))

  const others = TEAM.filter((t) => t.slug !== m.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_META.url}/ekip/${m.slug}#person`,
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    url: `${SITE_META.url}/ekip/${m.slug}`,
    image: m.image ? `${SITE_META.url}${m.image}` : undefined,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_META.url}#organization`,
      name: SITE_META.name,
      url: SITE_META.url,
    },
    ...(programs.length > 0
      ? {
          hasOccupation: programs.map((w) => ({
            '@type': 'EducationalOccupationalCredential',
            name: `${w.title} — Eğitmen`,
          })),
        }
      : {}),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab İstanbul', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: 'Ekip', item: `${SITE_META.url}/ekip` },
      { '@type': 'ListItem', position: 3, name: m.name, item: `${SITE_META.url}/ekip/${m.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="h-[3px] w-full bg-neon" />

      {/* Hero */}
      <section className="px-4 md:px-14 pt-20 pb-16 border-b border-border grid md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">
        {m.image && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <Image
              src={m.image}
              alt={m.name}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover object-top"
              priority
            />
            <div className="absolute top-0 left-0 h-[2px] w-full bg-neon" />
          </div>
        )}
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">
            <Link href="/ekip" className="hover:text-fg transition-colors">ekip</Link> / eğitmen
          </p>
          <h1
            className="font-display text-fg mb-3"
            style={{ fontSize: 'clamp(36px, 6vw, 76px)', letterSpacing: '0.01em', lineHeight: 0.95 }}
          >
            {m.name}
          </h1>
          <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-stone mb-8">{m.role}</p>
          <p className="font-mono text-[14px] text-stone leading-relaxed max-w-xl">{m.bio}</p>
        </div>
      </section>

      {/* Programlar */}
      {programs.length > 0 && (
        <section className="px-4 md:px-14 py-16 border-b border-border" aria-labelledby="programlar-heading">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-stone mb-4">verdiği atölyeler</p>
          <h2
            id="programlar-heading"
            className="font-display text-fg mb-10"
            style={{ fontSize: 'clamp(24px,3.2vw,44px)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            PROGRAMLAR
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {programs.map((w) => (
              <Link
                key={w.slug}
                href={`/atolyeler/${w.slug}`}
                className="group border border-border p-6 hover:border-neon/50 transition-colors duration-200 block"
              >
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-2 group-hover:text-neon transition-colors duration-200">
                  {w.code} · {w.venue}
                </p>
                <h3 className="font-display text-fg mb-1" style={{ fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '0.02em' }}>
                  {w.title}
                </h3>
                <p className="font-mono text-[11px] italic text-stone mb-4">{w.sub}</p>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon group-hover:tracking-[0.2em] transition-all duration-200">
                  İncele →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disiplin hub bağlantıları */}
      {hubs.length > 0 && (
        <section className="px-4 md:px-14 py-10 border-b border-border">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-4">ilgili alanlar</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {hubs.map((d) => (
              <Link key={d.slug} href={`/${d.slug}`} className="font-mono text-[12px] text-stone hover:text-neon transition-colors">
                {d.label} — İstanbul →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Diğer eğitmenler */}
      <section className="px-4 md:px-14 py-16">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-stone mb-4">ekipten diğerleri</p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-10">
          {others.map((t) => (
            <Link key={t.slug} href={`/ekip/${t.slug}`} className="font-mono text-[12px] text-stone hover:text-neon transition-colors">
              {t.name} →
            </Link>
          ))}
        </div>
        <Link href="/ekip" className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon hover:text-fg transition-colors">
          ← tüm ekibe dön
        </Link>
      </section>
    </>
  )
}
