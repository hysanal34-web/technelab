import type { MetadataRoute } from 'next'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_META.url
  const now = new Date()

  const statik: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '',               priority: 1.0, freq: 'weekly' },
    { path: '/atolyeler',     priority: 0.9, freq: 'weekly' },
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

  return [...sayfalar, ...programlar, ...makaleler]
}
