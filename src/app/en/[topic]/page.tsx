import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_META, WORKSHOPS } from '@/lib/data'
import { EN_PAGES, getEnPage } from '@/lib/enDisciplines'

type Props = { params: Promise<{ topic: string }> }

export function generateStaticParams() {
  return EN_PAGES.map((p) => ({ topic: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params
  const p = getEnPage(topic)
  if (!p) return {}
  const url = `${SITE_META.url}/en/${p.slug}`
  return {
    title: p.seoTitle,
    description: p.seoDesc,
    keywords: p.keywords,
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'tr-TR': SITE_META.url, 'x-default': SITE_META.url },
    },
    openGraph: {
      title: p.seoTitle,
      description: p.seoDesc,
      url,
      locale: 'en_US',
      images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Techne Lab Istanbul' }],
    },
  }
}

export default async function EnTopicPage({ params }: Props) {
  const { topic } = await params
  const p = getEnPage(topic)
  if (!p) notFound()

  const url = `${SITE_META.url}/en/${p.slug}`
  const programmes = p.workshopSlugs
    .map((s) => WORKSHOPS.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w) && !w!.archived)

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab Istanbul', item: `${SITE_META.url}/en` },
      { '@type': 'ListItem', position: 2, name: p.label, item: url },
    ],
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: programmes.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: `${w.title} — ${w.sub}`,
        url: `${SITE_META.url}/atolyeler/${w.slug}`,
        inLanguage: 'en',
        provider: { '@type': 'Organization', name: SITE_META.name, '@id': `${SITE_META.url}#organization` },
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      {/* Hero */}
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <Link
          href="/en"
          data-hover
          className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors mb-4 inline-block"
        >
          ← english home
        </Link>
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-4">{p.eyebrow}</p>
        <h1
          className="font-display text-fg mb-6 whitespace-pre-line"
          style={{ fontSize: 'clamp(30px,5vw,76px)', letterSpacing: '0.01em', lineHeight: 0.92 }}
        >
          {p.h1}
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">{p.lede}</p>
      </section>

      {/* Sections */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <div className="max-w-3xl space-y-12">
          {p.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-fg mb-4" style={{ fontSize: 'clamp(20px,2.6vw,34px)', letterSpacing: '0.02em', lineHeight: 1.05 }}>
                {s.heading}
              </h2>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programmes */}
      {programmes.length > 0 && (
        <section className="px-4 md:px-10 py-16 border-b border-border">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-3">programmes</p>
          <h2 className="font-display text-fg mb-8" style={{ fontSize: 'clamp(22px,3vw,40px)', letterSpacing: '0.02em', lineHeight: 1 }}>
            WHAT YOU CAN JOIN
          </h2>
          <ul className="border-t border-border">
            {programmes.map((w) => (
              <li key={w.slug} className="border-b border-border">
                <Link href={`/atolyeler/${w.slug}`} data-hover className="group flex items-baseline justify-between gap-4 py-5">
                  <div className="min-w-0">
                    <span className="font-display text-fg group-hover:text-neon transition-colors block leading-none" style={{ fontSize: 'clamp(16px,2vw,26px)', letterSpacing: '0.01em' }}>
                      {w.title}
                    </span>
                    <span className="font-mono text-[11px] text-dim mt-1.5 block">
                      {w.sub} · {w.duration} · {w.venue}
                    </span>
                  </div>
                  <span className="font-mono text-[13px] text-dim group-hover:text-neon group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-3">questions</p>
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(22px,3vw,40px)', letterSpacing: '0.02em', lineHeight: 1 }}>
          BEFORE YOU ASK
        </h2>
        <div className="max-w-3xl space-y-8">
          {p.faq.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[18px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related + CTA */}
      <section className="px-4 md:px-10 py-16">
        {p.related.length > 0 && (
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim block mb-4">also in english</span>
            <div className="flex flex-wrap gap-3">
              {p.related.map((r) => {
                const rp = getEnPage(r)
                if (!rp) return null
                return (
                  <Link
                    key={r}
                    href={`/en/${rp.slug}`}
                    data-hover
                    className="font-mono text-[11px] tracking-[0.12em] uppercase border border-border text-stone px-3.5 py-2 hover:border-neon hover:text-neon transition-colors"
                  >
                    {rp.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <div className="border-t border-border pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-mono text-[13px] text-stone max-w-md leading-relaxed">
            Questions in English are welcome. Tell us what you are looking for and we will point you to the right group.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/iletisim"
              className="font-mono text-[11px] tracking-[0.18em] uppercase bg-neon text-bg px-8 py-3.5 hover:bg-fg transition-colors text-center whitespace-nowrap"
            >
              get in touch →
            </Link>
            <a
              href={`mailto:${SITE_META.email}`}
              className="font-mono text-[11px] tracking-[0.12em] text-stone hover:text-neon transition-colors self-center whitespace-nowrap"
            >
              {SITE_META.email}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
