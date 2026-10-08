import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * İngilizce makaleler (/en/articles). Türkçe makalelerle aynı frontmatter şeması;
 * ek olarak isteğe bağlı `trSlug`: içeriğin Türkçe karşılığı varsa hreflang için.
 */
export type EnArticleMeta = {
  slug: string; title: string; excerpt: string
  author: string; date: string; category: string
  tags: string[]; readTime: string; featured?: boolean
  image?: string
  status?: 'draft' | 'published'
  updated?: string
  trSlug?: string
}

const DIR = path.join(process.cwd(), 'src/content/articles-en')

function normalize(slug: string, d: Record<string, unknown>): EnArticleMeta {
  return {
    slug,
    title:    typeof d.title === 'string' ? d.title : slug,
    excerpt:  typeof d.excerpt === 'string' ? d.excerpt : '',
    author:   typeof d.author === 'string' ? d.author : 'Techne Lab Istanbul',
    date:     typeof d.date === 'string' ? d.date : new Date().toISOString().slice(0, 10),
    category: typeof d.category === 'string' ? d.category : 'Theatre',
    tags:     Array.isArray(d.tags) ? (d.tags as string[]) : [],
    readTime: typeof d.readTime === 'string' ? d.readTime : '5 min',
    featured: d.featured === true,
    image:    typeof d.image === 'string' ? d.image : undefined,
    status:   d.status === 'draft' ? 'draft' : 'published',
    updated:  typeof d.updated === 'string' ? d.updated : undefined,
    trSlug:   typeof d.trSlug === 'string' ? d.trSlug : undefined,
  }
}

function readAll(): EnArticleMeta[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'))
      return normalize(file.replace('.mdx', ''), data as Record<string, unknown>)
    })
}

export function getAllEnArticles(): EnArticleMeta[] {
  return readAll()
    .filter((a) => a.status !== 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getEnArticle(slug: string) {
  const p = path.join(DIR, `${slug}.mdx`)
  if (!fs.existsSync(p)) return null
  const { data, content } = matter(fs.readFileSync(p, 'utf8'))
  const meta = normalize(slug, data as Record<string, unknown>)
  if (meta.status === 'draft' && process.env.NODE_ENV === 'production') return null
  return { meta, content }
}

export function getEnArticleSlugs(): string[] {
  return readAll().filter((a) => a.status !== 'draft').map((a) => a.slug)
}
