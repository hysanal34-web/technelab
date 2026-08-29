import { getAllArticles } from '@/lib/mdx'
import { SITE_META } from '@/lib/data'

// RSS beslemesi — Google'ın yeni makaleleri sitemap taramasını beklemeden
// keşfetmesi için ek bir sinyal. Feedly/RSS okuyucular için de çalışır.
export const dynamic = 'force-static'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET() {
  const items = getAllArticles()
    .slice(0, 30)
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_META.url}/makaleler/${a.slug}</link>
      <guid isPermaLink="true">${SITE_META.url}/makaleler/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${esc(a.excerpt ?? '')}</description>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Techne Lab İstanbul — Makaleler</title>
    <link>${SITE_META.url}/makaleler</link>
    <description>Tiyatro, oyunculuk, İngilizce drama, müzikal ve yazarlık üzerine makaleler — Techne Lab İstanbul.</description>
    <language>tr</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
