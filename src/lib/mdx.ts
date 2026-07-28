import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ArticleMeta = {
  slug: string; title: string; excerpt: string
  author: string; date: string; category: string
  tags: string[]; readTime: string; featured?: boolean
  image?: string
  status?: 'draft' | 'published'
}

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/makaleler')

/** Frontmatter'da eksik alan olsa bile sayfa patlamasın. */
function normalize(slug: string, data: Record<string, unknown>): ArticleMeta {
  return {
    slug,
    title:    typeof data.title === 'string' ? data.title : slug,
    excerpt:  typeof data.excerpt === 'string' ? data.excerpt : '',
    author:   typeof data.author === 'string' ? data.author : 'Techne Lab İstanbul',
    date:     typeof data.date === 'string' ? data.date : new Date().toISOString().slice(0, 10),
    category: typeof data.category === 'string' ? data.category : 'Tiyatro',
    tags:     Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readTime: typeof data.readTime === 'string' ? data.readTime : '5 dk',
    featured: data.featured === true,
    image:    typeof data.image === 'string' ? data.image : undefined,
    status:   data.status === 'draft' ? 'draft' : 'published',
  }
}

function readAll(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8')
      const { data } = matter(raw)
      return normalize(file.replace('.mdx', ''), data as Record<string, unknown>)
    })
}

export function getAllArticles(): ArticleMeta[] {
  return readAll()
    .filter((a) => a.status !== 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticle(slug: string) {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const meta = normalize(slug, data as Record<string, unknown>)
  // Taslaklar yayında erişilebilir olmasın
  if (meta.status === 'draft' && process.env.NODE_ENV === 'production') return null
  return { meta, content }
}

/** Yalnızca yayındaki makaleler statik olarak üretilir. */
export function getArticleSlugs(): string[] {
  return readAll()
    .filter((a) => a.status !== 'draft')
    .map((a) => a.slug)
}
