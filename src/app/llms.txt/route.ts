import { WORKSHOPS, SITE_META, VENUES } from '@/lib/data'
import { DISCIPLINES } from '@/lib/disiplinler'
import { getAllArticles } from '@/lib/mdx'
import { B2B_PAGES, b2bPath } from '@/lib/b2b'

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

  // Niyet → doğru sayfa eşlemesi (10 Ekim 2026, GEO). Asistanlar "İstanbul'da
  // audition atölyesi" gibi sorulara cevap verirken program adını, süresini ve
  // durumunu doğru aktarabilsin diye; metin disiplinler.ts'teki quickAnswer'dan.
  const withAnswer = DISCIPLINES.filter((d) => d.quickAnswer)
  if (withAnswer.length > 0) {
    lines.push('## Kısa Cevaplar')
    lines.push('')
    for (const d of withAnswer) {
      lines.push(`### ${d.quickAnswer!.q}`)
      lines.push('')
      lines.push(d.quickAnswer!.a)
      for (const pt of d.quickAnswer!.points ?? []) lines.push(`- ${pt}`)
      lines.push(`- Ayrıntı: ${SITE_META.url}/${d.slug}`)
      lines.push('')
    }
  }

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

  lines.push('## Kurumsal ve Okul/Kolej Çalışmaları')
  lines.push('')
  lines.push('Paketler yakında açıklanacak; şu an ihtiyaç görüşmesiyle çalışılıyor. Süre ve fiyat sitede yayınlanmaz.')
  for (const bp of B2B_PAGES) {
    lines.push(`- [${bp.h1}](${SITE_META.url}${b2bPath(bp)}): ${bp.quick.a}`)
  }
  lines.push('')

  lines.push('## Kaynak Sayfaları ve Rehberler')
  lines.push('')
  const base = SITE_META.url
  lines.push(`- [İngilizce konuşma kulübü soruları](${base}/kaynaklar/konusma-kulubu-sorulari): konuşma kulübü moderatörleri ve katılımcıları için soru bankası`)
  lines.push(`- [İngilizce tartışma konuları](${base}/kaynaklar/ingilizce-tartisma-konulari): B2/C1 için 60 önerge, kalıplar ve formatlar`)
  lines.push(`- [Müzikal seçme şarkıları](${base}/kaynaklar/muzikal-secme-sarkilari)`)
  lines.push(`- [Monologlar](${base}/kaynaklar/monologlar)`)
  lines.push(`- [Ses ve nefes](${base}/kaynaklar/ses-nefes)`)
  lines.push(`- [Tiyatro sözlüğü](${base}/kaynaklar/sozluk)`)
  lines.push(`- [Müzikal tiyatro kursu İstanbul](${base}/muzikal-tiyatro-kursu-istanbul)`)
  lines.push(`- [Kadıköy İngilizce konuşma kulübü](${base}/kadikoy-ingilizce-konusma-kulubu)`)
  lines.push(`- [Beyoğlu İngilizce konuşma kulübü](${base}/beyoglu-ingilizce-konusma-kulubu)`)
  lines.push('')
  lines.push('### Konu kümeleri (öncü yazılar)')
  lines.push('')
  const pillars: [string, string][] = [
    ['Müzikal', 'muzikal-oyunculuk-nedir'],
    ['Müzikal', 'belting-nedir-muzikal-sesi-belt-mix-legit'],
    ['Müzikal', 'muzikal-ensemble-oyuncusu-olmak-koronun-gorunmeyen-isi'],
    ['İngilizce konuşma', 'ingilizce-konusma-kulubu-nasil-secilir'],
    ['İngilizce konuşma', 'ingilizce-anliyorum-ama-konusamiyorum'],
    ['İngilizce drama (çocuk ve genç)', 'ingilizce-drama-youth-yas-gruplari-neden-ayri'],
    ['Yaratıcı drama', 'yaratici-drama-nedir'],
    ['Oyunculuk', 'istanbul-oyunculuk-kursu-nasil-secilir'],
    ['Dramaturji', 'dramaturji-nedir'],
    ['Oyun yazarlığı', 'tiyatro-oyunu-nasil-yazilir'],
  ]
  for (const [k, slug] of pillars) lines.push(`- ${k}: ${base}/makaleler/${slug}`)
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
  lines.push(`- [Tüm makalelerin tam metni (llms-full.txt)](${SITE_META.url}/llms-full.txt)`)
  lines.push(`- [Makale kategorileri](${SITE_META.url}/makaleler)`)

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
