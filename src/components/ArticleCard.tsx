import Link from 'next/link'
import type { ArticleMeta } from '@/lib/mdx'

export function ArticleCard({ article: a }: { article: ArticleMeta }) {
  return (
    <article className="bg-bg p-8 group hover:bg-bgHi transition-colors duration-200">
      <Link href={`/makaleler/${a.slug}`} data-hover>
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">{a.category}</p>
        <h3 className="font-display leading-tight text-fg mb-4 group-hover:text-neon transition-colors duration-200"
          style={{ fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '0.02em' }}>
          {a.title}
        </h3>
        <p className="font-mono text-[13px] text-stone leading-relaxed mb-6 line-clamp-3">{a.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-dim">{a.author} — {a.date}</span>
          <span className="font-mono text-[11px] text-neon tracking-[0.12em] uppercase">{a.readTime}</span>
        </div>
      </Link>
    </article>
  )
}
