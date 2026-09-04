import type { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/data'

// AI cevap motorlarının (ChatGPT, Gemini, Perplexity, Claude, Apple Intelligence)
// siteyi tarayıp içerikten alıntı/öneri yapabilmesi için tarayıcılarını açıkça
// izinliyoruz. `userAgent: '*'` zaten hiçbirini engellemiyordu — bunlar, niyetin
// tesadüf değil bilinçli olduğunu gösteren ayrı, isim bazlı kurallar.
const AI_CRAWLERS = [
  'GPTBot',              // ChatGPT / OpenAI arama
  'OAI-SearchBot',       // ChatGPT arama (ayrı bot)
  'ChatGPT-User',        // ChatGPT kullanıcı-tetiklemeli tarama
  'Google-Extended',     // Gemini / AI Overviews eğitim + temellendirme
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',           // Claude / Anthropic
  'anthropic-ai',
  'Applebot-Extended',   // Apple Intelligence
  'Bytespider',          // TikTok / Doubao
  'Amazonbot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/sepet', '/odeme-basarili', '/*/kayit'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/sepet', '/odeme-basarili', '/*/kayit'],
      })),
    ],
    sitemap: `${SITE_META.url}/sitemap.xml`,
    host: SITE_META.url,
  }
}
