import type { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/sepet', '/odeme-basarili', '/*/kayit'],
      },
    ],
    sitemap: `${SITE_META.url}/sitemap.xml`,
    host: SITE_META.url,
  }
}
