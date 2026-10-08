import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getEnArticle, getEnArticleSlugs, getAllEnArticles } from '@/lib/enArticles'
import { SITE_META } from '@/lib/data'
import { findTeamMemberByName } from '@/lib/ekip'
import { extractFaq, faqJsonLd } from '@/lib/articleFaq'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getEnArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getEnArticle(slug)
  if (!data) return {}
  const { meta } = data
  const url = `${SITE_META.url}/en/articles/${slug}`
  const trUrl = meta.trSlug ? `${SITE_META.url}/makaleler/${meta.trSlug}` : undefined
  return {
    title: { absolute: meta.title },
    description: meta.excerpt,
    openGraph: {
      title: meta.title, description: meta.excerpt, type: 'article',
      publishedTime: meta.date, authors: [meta.author], url, locale: 'en_US',
      images: [{ url: meta.image ?? `${SITE_META.url}/images/og-techne-lab.png`, alt: meta.title }],
    },
    alternates: {
      canonical: url,
      languages: trUrl ? { 'en-US': url, 'tr-TR': trUrl, 'x-default': trUrl } : { 'en-US': url },
    },
  }
}

export default async function EnArticlePage({ params }: Props) {
  const { slug } = await params
  const data = getEnArticle(slug)
  if (!data) notFound()
  const { meta, content } = data

  const author = findTeamMemberByName(meta.author)
  const authorUrl = author ? `${SITE_META.url}/ekip/${author.slug}` : undefined
  const pageUrl = `${SITE_META.url}/en/articles/${slug}`
  const more = getAllEnArticles().filter((a) => a.slug !== slug).slice(0, 3)
  const faqLd = faqJsonLd(extractFaq(content))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    headline: meta.title,
    description: meta.excerpt,
    ...(meta.image ? { image: meta.image } : {}),
    inLanguage: 'en',
    articleSection: meta.category,
    keywords: meta.tags.join(', '),
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
    dateModified: meta.updated ?? meta.date,
    url: pageUrl,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab Istanbul', item: `${SITE_META.url}/en` },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE_META.url}/en/articles` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: pageUrl },
    ],
  }

  return (
    <div lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <article>
        {meta.image && (
          <div className="relative w-full aspect-[21/9] overflow-hidden bg-bgAlt">
            <Image src={meta.image} alt={meta.title} fill priority sizes="100vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
          </div>
        )}
        <header className={`px-4 md:px-10 pb-16 border-b border-border ${meta.image ? 'pt-10' : 'pt-24'}`}>
          <div className="h-0.5 w-full bg-neon mb-8" />
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-stone">
              <li><Link href="/en" className="hover:text-neon transition-colors">english</Link></li>
              <li aria-hidden="true" className="text-dim">/</li>
              <li><Link href="/en/articles" className="hover:text-neon transition-colors">articles</Link></li>
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
            {meta.trSlug && (
              <Link href={`/makaleler/${meta.trSlug}`} hrefLang="tr" className="font-mono text-[11px] text-stone hover:text-neon transition-colors">
                türkçe →
              </Link>
            )}
          </div>
          <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">{meta.excerpt}</p>
        </header>
        <div className="px-4 md:px-10 py-16">
          <div className="prose-tl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
        <footer className="px-4 md:px-10 pb-12 flex flex-wrap gap-3 border-t border-border pt-8">
          {meta.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone border border-border px-3 py-1.5">{t}</span>
          ))}
        </footer>

        <section className="px-4 md:px-10 py-14 border-t border-border">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-4">in english, at techne lab</span>
          <p className="font-mono text-[13px] text-stone max-w-2xl leading-relaxed mb-6">
            English Drama Lab runs weekly in Pera and Kadıköy, and there are free introduction sessions
            most weeks. Come once and see whether it is for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/english-drama-istanbul" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
              english drama lab →
            </Link>
            <Link href="/tanisma-gunu" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
              free intro session →
            </Link>
          </div>
        </section>

        {more.length > 0 && (
          <section className="px-4 md:px-10 py-14 border-t border-border" aria-labelledby="more-heading">
            <h2 id="more-heading" className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-6">more in english</h2>
            <ul className="border-t border-border max-w-3xl">
              {more.map((a) => (
                <li key={a.slug} className="border-b border-border">
                  <Link href={`/en/articles/${a.slug}`} data-hover className="group block py-5">
                    <span className="font-display text-fg group-hover:text-neon transition-colors block leading-snug" style={{ fontSize: 'clamp(16px,1.8vw,22px)' }}>
                      {a.title}
                    </span>
                    {a.excerpt && <span className="font-mono text-[12px] text-stone leading-relaxed mt-2 block">{a.excerpt}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  )
}
