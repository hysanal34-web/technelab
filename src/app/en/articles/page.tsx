import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllEnArticles } from '@/lib/enArticles'
import { SITE_META } from '@/lib/data'

const url = `${SITE_META.url}/en/articles`

export const metadata: Metadata = {
  title: { absolute: 'Theatre & Drama in Istanbul — Articles in English | Techne Lab' },
  description:
    'Guides in English for expats, visitors and English speakers in Istanbul: English-speaking theatre, drama and acting classes, short workshops and the city’s stage scene.',
  alternates: {
    canonical: url,
    languages: { 'en-US': url, 'tr-TR': `${SITE_META.url}/makaleler`, 'x-default': `${SITE_META.url}/makaleler` },
  },
  openGraph: {
    title: 'Theatre & Drama in Istanbul — Articles in English',
    description: 'Guides in English for expats, visitors and English speakers in Istanbul.',
    url,
    locale: 'en_US',
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Techne Lab Istanbul' }],
  },
}

export default function EnArticlesPage() {
  const articles = getAllEnArticles()
  return (
    <div lang="en">
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">
          <Link href="/en" className="hover:text-fg transition-colors">techne lab · english</Link> / articles
        </p>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(44px,7.5vw,108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
          ARTICLES
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-xl leading-relaxed">
          Theatre, drama and the stage in Istanbul, written in English for people who live here,
          are passing through, or think in more than one language.
        </p>
      </section>
      <section className="px-4 md:px-10 py-16">
        {articles.length === 0 ? (
          <p className="font-mono text-[14px] text-stone">No articles yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {articles.map((a) => (
              <article key={a.slug} className="bg-bg p-8 group hover:bg-bgHi transition-colors duration-200">
                <Link href={`/en/articles/${a.slug}`} data-hover>
                  <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">{a.category}</p>
                  <h2 className="font-display leading-tight text-fg mb-4 group-hover:text-neon transition-colors duration-200"
                    style={{ fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '0.02em' }}>
                    {a.title}
                  </h2>
                  <p className="font-mono text-[13px] text-stone leading-relaxed mb-6 line-clamp-3">{a.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-dim">{a.date}</span>
                    <span className="font-mono text-[11px] text-neon tracking-[0.12em] uppercase">{a.readTime}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
