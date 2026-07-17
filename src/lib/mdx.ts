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

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8')
      const { data } = matter(raw)
      return { slug: file.replace('.mdx', ''), ...data } as ArticleMeta
    })
    .filter((a) => a.status !== 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticle(slug: string) {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return { meta: { slug, ...data } as ArticleMeta, content }
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}
