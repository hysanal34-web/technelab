import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getArticle, getArticleSlugs, getAllArticles } from '@/lib/mdx'
import { SITE_META } from '@/lib/data'
import { findTeamMemberByName } from '@/lib/ekip'
import { ArticleCTA, resolveArticleCta } from '@/components/ArticleCTA'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getArticle(slug)
  if (!data) return {}
  const { meta } = data
  const author = findTeamMemberByName(meta.author)
  return {
    // absolute: makale başlıklarına marka eki eklenmiyor.
    // Bunlar iki parçalı editoryal başlıklar; kısaltmak anlamı bozuyor,
    // marka eki de Google'ın kestiği alandan yer yiyor.
    title: { absolute: meta.title },
    description: meta.excerpt,
    authors: [{ name: meta.author, url: author ? `${SITE_META.url}/ekip/${author.slug}` : undefined }],
    openGraph: {
      title: meta.title, description: meta.excerpt, type: 'article',
      publishedTime: meta.date, authors: [meta.author],
      url: `${SITE_META.url}/makaleler/${slug}`,
      // Görseli olmayan makalede marka görseline düş — aksi halde 32 makalenin
      // paylaşım kartı (WhatsApp, LinkedIn, X) boş çıkıyor.
      images: [{ url: meta.image ?? `${SITE_META.url}/images/og-techne-lab.png`, alt: meta.title }],
    },
    alternates: { canonical: `${SITE_META.url}/makaleler/${slug}` },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const data = getArticle(slug)
  if (!data) notFound()
  const { meta, content } = data

  const author = findTeamMemberByName(meta.author)
  const authorUrl = author ? `${SITE_META.url}/ekip/${author.slug}` : undefined
  const pageUrl = `${SITE_META.url}/makaleler/${slug}`

  // Aynı kategoriden en yeni 3 yazı — konu kümesi içi bağ (topical cluster).
  const ilgili = getAllArticles()
    .filter((a) => a.slug !== slug && a.category === meta.category)
    .slice(0, 3)

  const { hub } = resolveArticleCta(meta.tags, meta.category)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    headline: meta.title,
    description: meta.excerpt,
    ...(meta.image ? { image: meta.image } : {}),
    inLanguage: 'tr',
    articleSection: meta.category,
    keywords: meta.tags.join(', '),
    // Yazar → /ekip/[slug] Person varlığına bağlanıyor (E-E-A-T).
    author: {
      '@type': 'Person',
      name: meta.author,
      ...(authorUrl ? { url: authorUrl, '@id': `${authorUrl}#person` } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_META.url}#organization`,
      name: SITE_META.name,
      url: SITE_META.url,
      logo: { '@type': 'ImageObject', url: `${SITE_META.url}/images/og-techne-lab.png` },
    },
    datePublished: meta.date,
    dateModified: meta.date,
    url: pageUrl,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab İstanbul', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: 'Makaleler', item: `${SITE_META.url}/makaleler` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article>
        {/* Hero image */}
        {meta.image && (
          <div className="relative w-full aspect-[21/9] overflow-hidden bg-bgAlt">
            <Image
              src={meta.image}
              alt={meta.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
          </div>
        )}
        <header className={`px-4 md:px-10 pb-16 border-b border-border ${meta.image ? 'pt-10' : 'pt-24'}`}>
          <div className="h-0.5 w-full bg-neon mb-8" />
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-stone">
              <li><Link href="/makaleler" className="hover:text-neon transition-colors">makaleler</Link></li>
              <li aria-hidden="true" className="text-dim">/</li>
              <li className="text-stone">{meta.category}</li>
            </ol>
          </nav>
          <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(32px,5.5vw,72px)', letterSpacing: '0.02em', lineHeight: 0.95 }}>
            {meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mb-6">
            {author ? (
              <Link href={`/ekip/${author.slug}`} className="font-mono text-[11px] text-stone hover:text-neon transition-colors" rel="author" data-hover>
                {meta.author} →
              </Link>
            ) : (
              <span className="font-mono text-[11px] text-stone">{meta.author}</span>
            )}
            <time dateTime={meta.date} className="font-mono text-[11px] text-dim">{meta.date}</time>
            <span className="font-mono text-[11px] text-fg tracking-[0.1em] uppercase">{meta.readTime}</span>
          </div>
          <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">{meta.excerpt}</p>
        </header>
        <div className="px-4 md:px-10 py-16">
          <div className="prose-tl">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <footer className="px-4 md:px-10 pb-12 flex flex-wrap gap-3 border-t border-border pt-8">
          {meta.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone border border-border px-3 py-1.5">{t}</span>
          ))}
        </footer>

        {/* Yazar kutusu — kim yazdı, neden güvenilir. Profil sayfasına bağ. */}
        {author && (
          <aside className="px-4 md:px-10 py-10 border-t border-border" aria-label="Yazar hakkında">
            <div className="max-w-3xl grid grid-cols-[72px_1fr] gap-5 items-start">
              {author.image ? (
                <Link href={`/ekip/${author.slug}`} className="relative w-[72px] h-[90px] overflow-hidden block" data-hover>
                  <Image src={author.image} alt={author.name} fill sizes="72px" className="object-cover object-top" />
                </Link>
              ) : <div />}
              <div>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-1">yazar</span>
                <Link href={`/ekip/${author.slug}`} className="font-display text-fg hover:text-neon transition-colors block mb-1" style={{ fontSize: 'clamp(17px,2vw,22px)' }} data-hover>
                  {author.name}
                </Link>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neon mb-3">{author.role}</p>
                <p className="font-mono text-[12px] text-stone leading-relaxed line-clamp-3">{author.bio}</p>
              </div>
            </div>
          </aside>
        )}

        {/* Makaleyi bitiren okuru ilgili programa ve disiplin hub'ına taşı. */}
        <ArticleCTA tags={meta.tags} category={meta.category} />

        {/* Aynı kümeden yazılar — okuru sitede tutar, kümeyi Google'a gösterir. */}
        {ilgili.length > 0 && (
          <section className="px-4 md:px-10 py-14 border-t border-border" aria-labelledby="ilgili-heading">
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-6">
              {meta.category} · devamı
            </span>
            <h2 id="ilgili-heading" className="sr-only">İlgili yazılar</h2>
            <ul className="border-t border-border max-w-3xl">
              {ilgili.map((a) => (
                <li key={a.slug} className="border-b border-border">
                  <Link href={`/makaleler/${a.slug}`} data-hover className="group block py-5">
                    <span className="font-display text-fg group-hover:text-neon transition-colors block leading-snug" style={{ fontSize: 'clamp(16px,1.8vw,22px)' }}>
                      {a.title}
                    </span>
                    {a.excerpt && (
                      <span className="font-mono text-[12px] text-stone leading-relaxed mt-2 block">{a.excerpt}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/makaleler" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors">
                tüm makaleler →
              </Link>
              {hub && (
                <Link href={`/${hub.slug}`} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors">
                  {hub.label} programları →
                </Link>
              )}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
