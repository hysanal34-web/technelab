import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WORKSHOPS, SITE_META } from '@/lib/data'
type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = WORKSHOPS.find((w) => w.slug === slug)
  if (!w) return {}
  return {
    title: w.seoTitle,
    description: w.seoDesc,
    alternates: { canonical: `${SITE_META.url}/atolyeler/${w.slug}` },
    openGraph: {
      title: w.seoTitle, description: w.seoDesc,
      url: `${SITE_META.url}/atolyeler/${w.slug}`,
      images: w.images?.[0]
        ? [{ url: `${SITE_META.url}/images/gallery/${w.images[0]}.jpg`, width: 1200, height: 800, alt: `${w.title} — ${w.sub}` }]
        : undefined,
    },
  }
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params
  const w = WORKSHOPS.find((w) => w.slug === slug)
  if (!w) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${w.title} — ${w.sub}`,
    description: w.desc,
    url: `${SITE_META.url}/atolyeler/${w.slug}`,
    provider: { '@type': 'Organization', name: SITE_META.name, url: SITE_META.url },
    offers: {
      '@type': 'Offer',
      availability: w.active ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `${SITE_META.url}/atolyeler/${w.slug}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      location: { '@type': 'Place', name: w.venue, address: 'İstanbul, Türkiye' },
      instructor: { '@type': 'Person', name: w.instructor },
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab İstanbul', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: 'Atölyeler', item: `${SITE_META.url}/atolyeler` },
      { '@type': 'ListItem', position: 3, name: `${w.title} — ${w.sub}`, item: `${SITE_META.url}/atolyeler/${w.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero Görsel */}
      {w.images && w.images[0] && (
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px,52vh,600px)' }}>
          <Image
            src={`/images/gallery/${w.images[0]}.jpg`}
            alt={`${w.title} — ${w.sub}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.6)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,10,12,0.92) 100%)' }} />
          <div className="absolute top-0 inset-x-0 h-0.5 bg-neon" />
          <div className="absolute bottom-8 left-4 right-4 md:left-10 md:right-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-3">atölye · {w.code}</p>
              <h1 className="font-display text-white" style={{ fontSize: 'clamp(38px,6vw,88px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
                {w.title}
              </h1>
              <p className="font-mono text-[15px] italic text-white/60 mt-2">{w.sub}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero (görselsiz fallback başlık) */}
      {(!w.images || !w.images[0]) && (
        <div className="relative border-b border-border">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-neon" />
          <div className="px-4 md:px-10 pt-24 pb-8">
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">atölye · {w.code}</p>
            <h1 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(40px,6.5vw,96px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
              {w.title}
            </h1>
            <p className="font-mono text-[16px] italic text-stone mb-4">{w.sub}</p>
          </div>
        </div>
      )}

      {/* Info bloku */}
      <section className="relative border-b border-border">
        {(!w.images || !w.images[0]) && <div className="absolute top-0 inset-x-0 h-0.5 bg-neon" />}
        <div className="px-4 md:px-10 pt-12 pb-16 grid md:grid-cols-[1fr_320px] gap-16 items-start">
          <div>
            {w.images && w.images[0] && (
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">atölye · {w.code}</p>
            )}
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim mb-6">{w.tagline}</p>
            <p className="font-mono text-[15px] text-stone leading-relaxed max-w-xl">{w.desc}</p>
          </div>

          {/* Satın alma kutusu */}
          <aside className="sticky top-20 border border-border bg-bgAlt p-8" aria-label="Kayıt bilgileri">
            <div className="space-y-4 mb-8">
              {[
                ['eğitmen', w.instructor || 'Techne Lab'],
                ['mekân', w.venue],
                ['süre', w.duration],
                ['kontenjan', `max. ${w.maxStudents} kişi`],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone w-16 shrink-0 pt-0.5">{k}</span>
                  <span className="font-mono text-[13px] text-fg">{v}</span>
                </div>
              ))}
            </div>

            {!w.active ? (
              <div className="border border-stone/30 bg-bgAlt px-6 py-5 text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-stone mb-2">Kayıt Kapalı</p>
                <p className="font-mono text-[11px] text-dim leading-relaxed mb-4">
                  Bu program şu an aktif kayıt almıyor. Bilgi almak için bize ulaşın.
                </p>
                <a
                  href={`mailto:${SITE_META.email}?subject=${encodeURIComponent(`${w.title} — Bilgi Talebi`)}`}
                  className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-fg border border-stone/40 text-center py-3 px-6 transition-colors duration-200 inline-block"
                  data-hover
                >
                  bilgi al →
                </a>
              </div>
            ) : SITE_META.formUrls[w.slug] ? (
              <a
                href={SITE_META.formUrls[w.slug]}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-[11px] tracking-[0.14em] uppercase text-bg bg-neon hover:bg-fg border border-neon text-center py-4 transition-all duration-200"
                data-hover
              >
                başvur →
              </a>
            ) : (
              <a
                href={`mailto:${SITE_META.email}?subject=${encodeURIComponent(`${w.title} — Başvuru`)}`}
                className="block font-mono text-[11px] tracking-[0.14em] uppercase text-bg bg-neon hover:bg-fg border border-neon text-center py-4 transition-all duration-200"
                data-hover
              >
                başvur →
              </a>
            )}
          </aside>
        </div>
      </section>

      {/* Müfredat */}
      <section className="px-4 md:px-10 py-20 border-b border-border" aria-labelledby="curriculum-heading">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-stone mb-4">müfredat</p>
        <h2 id="curriculum-heading" className="font-display text-fg mb-12" style={{ fontSize: 'clamp(28px,4vw,56px)', letterSpacing: '0.02em', lineHeight: 1 }}>
          PROGRAM İÇERİĞİ
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {w.blocks.map((b) => (
            <div key={b.title} className="bg-bg p-8 border-t-2 border-neon">
              {b.span && (
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone mb-4">{b.span}</p>
              )}
              <h3 className="font-display text-fg mb-4" style={{ fontSize: 'clamp(18px,2vw,24px)', letterSpacing: '0.02em' }}>
                {b.title}
              </h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Foto Strip */}
      {w.images && w.images.length > 1 && (
        <section className="border-b border-border" aria-label="Atölye görselleri">
          <div className="grid grid-cols-4 gap-px bg-border">
            {w.images.slice(1, 5).map((img, i) => (
              <div
                key={img}
                className="overflow-hidden"
                style={{ height: 'clamp(160px,18vw,260px)', position: 'relative' }}
              >
                <Image
                  src={`/images/gallery/${img}.jpg`}
                  alt={`${w.title} atölyesinden kare ${i + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDL Ailesi — diğer English Drama programları */}
      {w.edlFamily && w.edlFamily.length > 0 && (() => {
        const related = w.edlFamily!.map(slug => WORKSHOPS.find(x => x.slug === slug)).filter(Boolean) as typeof WORKSHOPS
        return (
          <section className="px-4 md:px-10 py-16 border-b border-border" aria-labelledby="edl-heading">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-3">english drama lab ailesi</p>
            <h2 id="edl-heading" className="font-display text-fg mb-10" style={{ fontSize: 'clamp(22px,3vw,40px)', letterSpacing: '0.02em', lineHeight: 1 }}>
              DİĞER ENGLISH DRAMA PROGRAMLARI
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/atolyeler/${r.slug}`}
                  className="group border border-border p-6 hover:border-neon/50 transition-colors duration-200 block"
                >
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-2 group-hover:text-neon transition-colors duration-200">{r.code} · {r.duration}</p>
                  <h3 className="font-display text-fg mb-1" style={{ fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '0.02em' }}>{r.sub}</h3>
                  <p className="font-mono text-[11px] italic text-stone mb-4">{r.tagline}</p>
                  <p className="font-mono text-[11px] text-dim leading-relaxed mb-5 line-clamp-3">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-dim">{r.venue}</span>
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon group-hover:tracking-[0.2em] transition-all duration-200">İncele →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })()}

      {/* Tags */}
      <section className="px-4 md:px-10 py-10 flex flex-wrap items-center gap-3 border-b border-border" aria-label="Kategoriler">
        {w.tags.map((t) => (
          <span key={t} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone border border-border px-3 py-1.5">
            {t}
          </span>
        ))}
      </section>
    </>
  )
}
