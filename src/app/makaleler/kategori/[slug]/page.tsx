import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/mdx'
import { SITE_META } from '@/lib/data'
import { ArticleCard } from '@/components/ArticleCard'
import { KATEGORILER, kategoriBySlug } from '@/lib/kategoriler'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return KATEGORILER.map((k) => ({ slug: k.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const k = kategoriBySlug(slug)
  if (!k) return {}
  const url = `${SITE_META.url}/makaleler/kategori/${k.slug}`
  return {
    title: { absolute: k.seoTitle },
    description: k.seoDesc,
    alternates: { canonical: url },
    openGraph: {
      title: k.seoTitle, description: k.seoDesc, url,
      images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: k.label }],
    },
  }
}

export default async function KategoriPage({ params }: Props) {
  const { slug } = await params
  const k = kategoriBySlug(slug)
  if (!k) notFound()
  const all = getAllArticles().filter((a) => a.category === k.label)
  if (all.length === 0) notFound()
  const pillars = (k.pillars ?? []).map((s) => all.find((a) => a.slug === s)).filter((a): a is NonNullable<typeof a> => !!a)
  const rest = all.filter((a) => !pillars.some((p) => p.slug === a.slug))
  const ordered = [...pillars, ...rest]
  const url = `${SITE_META.url}/makaleler/kategori/${k.slug}`

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: k.seoTitle,
    description: k.seoDesc,
    inLanguage: 'tr',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_META.url}#website` },
    about: { '@type': 'Thing', name: k.label },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: ordered.length,
      itemListElement: ordered.map((a, i) => ({
        '@type': 'ListItem', position: i + 1,
        url: `${SITE_META.url}/makaleler/${a.slug}`, name: a.title,
      })),
    },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab İstanbul', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: 'Makaleler', item: `${SITE_META.url}/makaleler` },
      { '@type': 'ListItem', position: 3, name: k.label, item: url },
    ],
  }
  const digerler = KATEGORILER.filter((x) => x.slug !== k.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-stone">
            <li><Link href="/makaleler" className="hover:text-neon transition-colors">makaleler</Link></li>
            <li aria-hidden="true" className="text-dim">/</li>
            <li className="text-stone">{k.label}</li>
          </ol>
        </nav>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(40px,6.5vw,92px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          {k.label}
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-6">{k.intro}</p>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim mb-4">{all.length} yazı</p>
        {k.hubs.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="İlgili sayfalar">
            {k.hubs.map((h) => (
              <li key={h.href}>
                <Link href={h.href} className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon hover:text-fg transition-colors" data-hover>
                  {h.label} →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="px-4 md:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {ordered.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </section>
      <section className="px-4 md:px-10 pb-16" aria-labelledby="diger-kumeler">
        <h2 id="diger-kumeler" className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon mb-4">diğer kümeler</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {digerler.map((d) => (
            <li key={d.slug}>
              <Link href={`/makaleler/kategori/${d.slug}`} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors">
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
