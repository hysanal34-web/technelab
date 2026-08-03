import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SITE_META, WORKSHOPS, VENUES } from '@/lib/data'
import { DISTRICTS } from '@/lib/semtler'

// Yalnızca tanımlı semt slug'ları render edilir — diğer tüm path'ler 404.
// Bu, root-level dinamik rotanın statik sayfalarla çakışmasını önler.
export const dynamicParams = false

export function generateStaticParams() {
  return DISTRICTS.map((d) => ({ semt: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ semt: string }> }): Promise<Metadata> {
  const { semt } = await params
  const d = DISTRICTS.find((x) => x.slug === semt)
  if (!d) return {}
  return {
    title: d.seoTitle,
    description: d.seoDesc,
    alternates: { canonical: `${SITE_META.url}/${d.slug}` },
    keywords: d.keywords,
    openGraph: {
      title: d.seoTitle,
      description: d.seoDesc,
      url: `${SITE_META.url}/${d.slug}`,
      images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: d.seoTitle }],
    },
  }
}

export default async function SemtPage({ params }: { params: Promise<{ semt: string }> }) {
  const { semt } = await params
  const d = DISTRICTS.find((x) => x.slug === semt)
  if (!d) notFound()

  const venues = VENUES.filter((v) => d.venueKeys.includes(v.key))
  const workshops = d.workshopSlugs
    .map((s) => WORKSHOPS.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w) && !w!.archived)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_META.url}/${d.slug}#localbusiness`,
    name: `${SITE_META.name} — ${d.name}`,
    description: d.seoDesc,
    url: `${SITE_META.url}/${d.slug}`,
    image: `${SITE_META.url}/images/techne-logo.png`,
    email: SITE_META.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: d.name,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    areaServed: d.nearby.map((n) => ({ '@type': 'Place', name: n })),
    parentOrganization: { '@id': `${SITE_META.url}#organization` },
    makesOffer: workshops.map((w) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Course',
        name: w.title,
        description: w.seoDesc,
        url: `${SITE_META.url}/atolyeler/${w.slug}`,
        provider: { '@type': 'Organization', name: SITE_META.name, '@id': `${SITE_META.url}#organization` },
      },
      availability: w.active ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: `${d.name} Tiyatro Kursu`, item: `${SITE_META.url}/${d.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">
          {d.side} · {workshops.length} program
        </p>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(34px,5.6vw,84px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          {d.displayName}<br />TİYATRO KURSU
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">{d.intro}</p>
      </section>

      {/* Semtin karakteri */}
      <section className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(22px,2.6vw,38px)', lineHeight: 1 }}>
          NEDEN {d.displayName}?
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-3xl leading-relaxed">{d.character}</p>
      </section>

      {/* Programlar */}
      <section className="px-4 md:px-10 py-14 border-b border-border">
        <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          {d.displayName}&apos;DEKİ PROGRAMLAR
        </h2>
        <p className="font-mono text-[12px] text-dim mb-10">
          Aşağıdaki programlar {d.name} tarafındaki partner mekânlarımızda yürüyor.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {workshops.map((w) => (
            <Link
              key={w.slug}
              href={`/atolyeler/${w.slug}`}
              data-hover
              className="group bg-bg hover:bg-bgAlt transition-colors p-7 md:p-8 block"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-neon">{w.code}</span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">
                  {w.active ? 'kayıt açık' : 'kayıt kapalı'}
                </span>
              </div>
              <h3 className="font-display text-fg group-hover:text-neon transition-colors leading-tight mb-2" style={{ fontSize: 'clamp(19px,1.9vw,28px)' }}>
                {w.title}
              </h3>
              <p className="font-mono text-[12px] text-stone leading-relaxed mb-4">{w.tagline}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] text-dim">{w.duration}</span>
                <span className="font-mono text-[11px] text-dim">{w.venue}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mekânlar */}
      <section className="px-4 md:px-10 py-14 border-b border-border">
        <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          MEKÂNLAR
        </h2>
        <p className="font-mono text-[12px] text-dim mb-10 max-w-2xl">
          Techne Lab mobil çalışan bir ekip — kendi mekânı yok. {d.name}&apos;deki programlar
          bu partner stüdyolarda gerçekleşiyor.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {venues.map((v) => (
            <div key={v.key} className="bg-bg">
              {v.photo && (
                <div className="relative w-full overflow-hidden bg-bgAlt" style={{ height: 'clamp(200px, 26vw, 340px)' }}>
                  <Image src={v.photo} alt={`${v.name} — ${v.district}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
                </div>
              )}
              <div className="p-7 md:p-8">
                <h3 className="font-display text-fg leading-tight mb-1" style={{ fontSize: 'clamp(19px,1.8vw,26px)' }}>
                  {v.name}
                </h3>
                <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">{v.district}</p>
                <p className="font-mono text-[12px] text-stone leading-relaxed">{v.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ulaşım */}
      <section className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          NASIL GELİNİR?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
          {d.transport.map((t) => (
            <div key={t.label}>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon block mb-2">{t.label}</span>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{t.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-3">yakın semtlerden ulaşım</span>
          <p className="font-mono text-[12px] text-stone leading-relaxed max-w-3xl">
            {d.nearby.join(' · ')} ve çevresinden katılım yoğun. Ders saatlerimiz akşam
            saatlerinde planlanıyor — çalışanlar için ulaşılabilir.
          </p>
        </div>
      </section>

      {/* SSS */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          {d.displayName} — SIKÇA SORULANLAR
        </h2>
        <div className="max-w-3xl space-y-8">
          {d.faq.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[19px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diğer semt + CTA */}
      <section className="px-4 md:px-10 py-16">
        <div className="flex flex-wrap gap-4 mb-12">
          <Link href="/atolyeler" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            tüm atölyeler →
          </Link>
          <Link href="/iletisim" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            soru sor →
          </Link>
        </div>

        <div className="border-t border-border pt-8">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-4">diğer lokasyon</span>
          {DISTRICTS.filter((x) => x.slug !== d.slug).map((other) => (
            <Link key={other.slug} href={`/${other.slug}`} data-hover className="font-display text-stone hover:text-neon transition-colors block" style={{ fontSize: 'clamp(20px,2.2vw,32px)' }}>
              {other.displayName} TİYATRO KURSU →
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
