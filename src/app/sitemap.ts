import type { MetadataRoute } from 'next'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'
import { DISTRICTS } from '@/lib/semtler'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_META.url
  const now = new Date()

  const statik: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '',               priority: 1.0, freq: 'weekly' },
    { path: '/atolyeler',     priority: 0.9, freq: 'weekly' },
    { path: '/atolye-testi',  priority: 0.8, freq: 'monthly' },
    { path: '/kaynaklar',            priority: 0.8, freq: 'weekly' },
    { path: '/kaynaklar/monologlar', priority: 0.8, freq: 'monthly' },
    { path: '/kaynaklar/sozluk',     priority: 0.8, freq: 'monthly' },
    { path: '/kaynaklar/ses-nefes',  priority: 0.8, freq: 'monthly' },
    { path: '/en',                        priority: 0.8, freq: 'weekly' },
    { path: '/en/english-drama-istanbul', priority: 0.8, freq: 'weekly' },
    { path: '/isbirlikleri',  priority: 0.7, freq: 'monthly' },
    { path: '/ekip',          priority: 0.7, freq: 'monthly' },
    { path: '/galeri',        priority: 0.6, freq: 'monthly' },
    { path: '/hakkinda',      priority: 0.7, freq: 'monthly' },
    { path: '/makaleler',     priority: 0.7, freq: 'weekly' },
    { path: '/iletisim',      priority: 0.6, freq: 'monthly' },
    { path: '/kvkk',          priority: 0.3, freq: 'monthly' },
  ]

  const sayfalar: MetadataRoute.Sitemap = statik.map((s) => ({
    url: `${base}${s.path}`,
    lastModified: now,
    changeFrequency: s.freq,
    priority: s.priority,
  }))

  // Semt landing sayfaları — lokal SEO
  const semtler: MetadataRoute.Sitemap = DISTRICTS.map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const programlar: MetadataRoute.Sitemap = WORKSHOPS
    .filter((w) => !w.archived)
    .map((w) => ({
      url: `${base}/atolyeler/${w.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: w.active ? 0.9 : 0.4,
    }))

  // Yalnızca yayında olan makaleler
  const makaleler: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${base}/makaleler/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...sayfalar, ...semtler, ...programlar, ...makaleler]
}
