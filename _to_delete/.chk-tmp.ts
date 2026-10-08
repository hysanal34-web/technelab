import { DISCIPLINES } from './src/lib/disiplinler'
import { YORUMLAR } from './src/lib/yorumlar'
import fs from 'fs'
const pub = (slug: string) => { const f = `src/content/makaleler/${slug}.mdx`; if (!fs.existsSync(f)) return 'YOK'; return /status:\s*['"]draft/.test(fs.readFileSync(f,'utf8')) ? 'DRAFT' : 'ok' }
for (const d of DISCIPLINES.filter(d => d.guide || d.articleSlugs || d.yorumIds || d.facts)) {
  console.log('==', d.slug, 'faq', d.faq.length, 'guide', d.guide?.items.length, 'facts', d.facts?.rows.length)
  for (const g of d.guide?.items ?? []) if (g.href) { const s = g.href.replace('/makaleler/',''); console.log(' guide', s, pub(s)) }
  for (const s of d.articleSlugs ?? []) console.log(' art', s, pub(s))
  for (const id of d.yorumIds ?? []) console.log(' yorum', id, YORUMLAR.some(y => y.id === id) ? 'ok' : 'YOK')
  const words = JSON.stringify([d.intro,d.what,d.who,d.faq,d.criteria,d.guide,d.facts]).split(/\s+/).length
  console.log(' veri-kelime', words)
}
