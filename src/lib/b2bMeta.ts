import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { b2bPath, isEn, type B2BPage } from '@/lib/b2b'

export function b2bMetadata(p: B2BPage): Metadata {
  const url = `${SITE_META.url}${b2bPath(p)}`
  const en = isEn(p)
  const tr = en ? (p.enPath ? `${SITE_META.url}${p.enPath}` : undefined) : url
  const enUrl = en ? url : (p.enPath ? `${SITE_META.url}${p.enPath}` : undefined)
  return {
    title: { absolute: p.seoTitle },
    description: p.seoDesc,
    keywords: p.keywords,
    alternates: {
      canonical: url,
      ...(tr && enUrl ? { languages: { 'tr-TR': tr, 'en-US': enUrl, 'x-default': tr } } : {}),
    },
    openGraph: {
      title: p.seoTitle,
      description: p.seoDesc,
      url,
      locale: en ? 'en_US' : 'tr_TR',
      images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: p.seoTitle }],
    },
  }
}
