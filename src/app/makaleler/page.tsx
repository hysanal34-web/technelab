import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { ArticleCard } from '@/components/ArticleCard'
import { SITE_META } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Makale & Araştırma — Tiyatro, Dramaturji, Performans',
  description: 'Dramaturji, oyunculuk, sahne tasarımı ve çağdaş tiyatro üzerine makaleler. Techne Lab İstanbul araştırma yazıları.',
  alternates: { canonical: `${SITE_META.url}/makaleler` },
  keywords: [
    'tiyatro',
    'çağdaş tiyatro',
    'yaratıcı drama',
    'doğaçlama',
    'ingilizce drama',
    'dramaturji',
    'oyunculuk pedagojisi',
    'bağımsız tiyatro istanbul',
    'sahne sanatları',
    'performans sanatları',
    'tiyatro eğitimi',
    'tiyatro makalesi',
    'techne lab araştırma',
  ],
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  return (
    <>
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">makale & araştırma</p>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(44px,7.5vw,108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
          BLOG
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-lg leading-relaxed">
          Dramaturji, oyunculuk pedagojisi, çağdaş sahne pratiği ve bağımsız tiyatro üzerine.
        </p>
      </section>
      <section className="px-4 md:px-10 py-16">
        {articles.length === 0 ? (
          <p className="font-mono text-[14px] text-stone">Henüz makale yok.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </section>
    </>
  )
}
