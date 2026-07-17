import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getArticle, getArticleSlugs } from '@/lib/mdx'
import { SITE_META } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getArticle(slug)
  if (!data) return {}
  const { meta } = data
  return {
    title: meta.title,
    description: meta.excerpt,
    authors: [{ name: meta.author }],
    openGraph: { title: meta.title, description: meta.excerpt, type: 'article',
      publishedTime: meta.date, authors: [meta.author] },
    alternates: { canonical: `${SITE_META.url}/makaleler/${slug}` },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const data = getArticle(slug)
  if (!data) notFound()
  const { meta, content } = data

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: meta.title, description: meta.excerpt,
    author: { '@type': 'Person', name: meta.author },
    publisher: { '@type': 'Organization', name: SITE_META.name, url: SITE_META.url },
    datePublished: meta.date,
    url: `${SITE_META.url}/makaleler/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-stone mb-4">{meta.category}</p>
          <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(32px,5.5vw,72px)', letterSpacing: '0.02em', lineHeight: 0.95 }}>
            {meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <span className="font-mono text-[10px] text-stone">{meta.author}</span>
            <span className="font-mono text-[11px] text-dim">{meta.date}</span>
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
            <span key={t} className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone border border-border px-3 py-1.5">{t}</span>
          ))}
        </footer>
      </article>
    </>
  )
}
