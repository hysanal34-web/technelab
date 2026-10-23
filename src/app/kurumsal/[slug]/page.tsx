import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { B2BLanding } from '@/components/B2BLanding'
import { b2bChildren, b2bPage } from '@/lib/b2b'
import { b2bMetadata } from '@/lib/b2bMeta'

export const dynamicParams = false

export function generateStaticParams() {
  return b2bChildren('kurumsal').map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = b2bPage('kurumsal', slug)
  return p ? b2bMetadata(p) : {}
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const p = b2bPage('kurumsal', slug)
  if (!p) notFound()
  return <B2BLanding p={p} />
}
