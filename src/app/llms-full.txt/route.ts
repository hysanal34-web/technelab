import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { SITE_META } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'
import { getAllEnArticles } from '@/lib/enArticles'
import { KATEGORILER, kategoriSlug } from '@/lib/kategoriler'

// llms-full.txt — llms.txt'nin tam sürümü (19 Ekim 2026, GEO). Yapay zekâ
// asistanları için bütün yayın makalelerinin gövdesi tek dosyada. Yalnızca
// `published` içerik; taslaklar girmez. Kaynak: https://llmstxt.org
export const dynamic = 'force-static'

function body(dir: string, slug: string): string {
  const p = path.join(process.cwd(), dir, `${slug}.mdx`)
  if (!fs.existsSync(p)) return ''
  return matter(fs.readFileSync(p, 'utf8')).content.trim()
}

export async function GET() {
  const out: string[] = []
  out.push(`# ${SITE_META.name} — tüm makaleler`)
  out.push('')
  out.push(`> ${SITE_META.description}`)
  out.push('')
  out.push(`Kısa sürüm: ${SITE_META.url}/llms.txt · Site: ${SITE_META.url}`)
  out.push('')

  const tr = getAllArticles()
  for (const k of KATEGORILER) {
    const grup = tr.filter((a) => a.category === k.label)
    if (grup.length === 0) continue
    out.push(`## ${k.label} (${SITE_META.url}/makaleler/kategori/${k.slug})`)
    out.push('')
    out.push(k.intro)
    out.push('')
    for (const a of grup) {
      out.push(`### ${a.title}`)
      out.push('')
      out.push(`URL: ${SITE_META.url}/makaleler/${a.slug} · Yazar: ${a.author} · Tarih: ${a.updated ?? a.date} · Kategori: ${a.category}`)
      out.push('')
      out.push(a.excerpt)
      out.push('')
      out.push(body('src/content/makaleler', a.slug))
      out.push('')
    }
  }
  // Kategorisi KATEGORILER'de olmayan yazı kalmasın.
  const kalan = tr.filter((a) => !KATEGORILER.some((k) => k.label === a.category))
  for (const a of kalan) {
    out.push(`### ${a.title}`)
    out.push('')
    out.push(`URL: ${SITE_META.url}/makaleler/${a.slug} · Kategori: ${a.category} (${kategoriSlug(a.category)})`)
    out.push('')
    out.push(body('src/content/makaleler', a.slug))
    out.push('')
  }

  const en = getAllEnArticles()
  if (en.length > 0) {
    out.push('## English articles')
    out.push('')
    for (const a of en) {
      out.push(`### ${a.title}`)
      out.push('')
      out.push(`URL: ${SITE_META.url}/en/articles/${a.slug} · Author: ${a.author} · Date: ${a.updated ?? a.date}`)
      out.push('')
      out.push(a.excerpt)
      out.push('')
      out.push(body('src/content/articles-en', a.slug))
      out.push('')
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
