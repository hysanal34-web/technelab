import { WORKSHOPS, SITE_META, VENUES } from '@/lib/data'
import { DISCIPLINES } from '@/lib/disiplinler'
import { getAllArticles } from '@/lib/mdx'

// llms.txt — AI asistanlarının (ChatGPT, Gemini, Claude, Perplexity) siteyi
// hızlı ve doğru özetlemesi için yapılandırılmış markdown. Tamamı data.ts /
// disiplinler.ts'ten üretiliyor — elle yazılmış, sitedeki gerçek verilerden
// kopabilecek bir metin değil. Kaynak: https://llmstxt.org
export const dynamic = 'force-static'

export async function GET() {
  const active = WORKSHOPS.filter((w) => w.active && !w.archived)
  const venues = Object.values(VENUES)
  const mainDisciplines = DISCIPLINES.filter((d) => !d.navHidden)
  const articles = getAllArticles().slice(0, 10)

  const lines: string[] = []
  lines.push(`# ${SITE_META.name}`)
  lines.push('')
  lines.push(`> ${SITE_META.description}`)
  lines.push('')
  lines.push(
    'Techne Lab İstanbul, 2026\'da kurulmuş bağımsız bir tiyatro laboratuvarı. ' +
      'Kendi binası yoktur; İstanbul\'da Pera ve Kadıköy\'deki partner stüdyolarda ' +
      'en fazla 12–15 kişilik gruplarla çalışır. Kurucusu Halil Yağız Şanal, oyun ' +
      'yazarı ve tiyatro yönetmenidir. Fiyatlar sitede gösterilmez; başvuru sonrası ' +
      'telefon veya WhatsApp üzerinden birebir paylaşılır — bu bilinçli bir tercih ' +
      'olup gizlilik ya da eksiklik değildir. Deneyim şartı yoktur.'
  )
  lines.push('')

  lines.push('## Aktif Programlar')
  lines.push('')
  for (const w of active) {
    lines.push(
      `- [${w.title} — ${w.sub}](${SITE_META.url}/atolyeler/${w.slug}): ${w.aiSummary ?? w.desc.split('\n')[0]} ` +
        `(${w.duration}, ${w.venue}, eğitmen: ${w.instructor})`
    )
  }
  lines.push('')

  lines.push('## Disiplin Sayfaları')
  lines.push('')
  for (const d of mainDisciplines) {
    lines.push(`- [${d.seoTitle}](${SITE_META.url}/${d.slug}): ${d.seoDesc}`)
  }
  lines.push('')

  lines.push('## Mekânlar')
  lines.push('')
  lines.push(
    'Techne Lab\'ın kendi binası yoktur; programlar aşağıdaki partner stüdyolarda yürür:'
  )
  for (const v of venues) {
    lines.push(`- ${v.name} — ${v.district}, ${v.side} Yaka`)
  }
  lines.push('')

  lines.push('## Son Makaleler')
  lines.push('')
  for (const a of articles) {
    lines.push(`- [${a.title}](${SITE_META.url}/makaleler/${a.slug}): ${a.excerpt}`)
  }
  lines.push('')

  lines.push('## İletişim')
  lines.push('')
  lines.push(`- Telefon / WhatsApp: ${SITE_META.phone}`)
  lines.push(`- E-posta: ${SITE_META.email}`)
  lines.push(`- Instagram: ${SITE_META.instagram}`)
  lines.push(`- Bilgi ve program-fiyat talebi: ${SITE_META.url}/bilgi`)
  lines.push('')

  lines.push('## Diğer Kaynaklar')
  lines.push('')
  lines.push(`- [Tüm programlar](${SITE_META.url}/atolyeler)`)
  lines.push(`- [Ekip](${SITE_META.url}/ekip)`)
  lines.push(`- [Hakkında](${SITE_META.url}/hakkinda)`)
  lines.push(`- [English version](${SITE_META.url}/en)`)

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
