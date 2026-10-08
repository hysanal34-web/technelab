import fs from 'fs'
import matter from 'gray-matter'
import { extractFaq } from './src/lib/articleFaq.ts'
for (const f of ['yaratici-drama-asamalari','ingilizce-orta-seviyede-takili-kalmak','cocuklarda-yaratici-drama','oyun-metni-analizi-dramaturjik-sorular']) {
  const {content} = matter(fs.readFileSync(`src/content/makaleler/${f}.mdx`,'utf8'))
  const x = extractFaq(content); console.log(f, x.length, JSON.stringify(x[0]).slice(0,160), '|', JSON.stringify(x.at(-1)).slice(0,120))
}
let n=0; for (const f of fs.readdirSync('src/content/makaleler')) { const {content}=matter(fs.readFileSync('src/content/makaleler/'+f,'utf8')); if (extractFaq(content).length>=2) n++ } console.log('faq-li makale', n)
