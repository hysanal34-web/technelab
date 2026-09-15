import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { submitTanisma } from './actions'
import TanismaForm from '@/components/TanismaForm'

export const metadata: Metadata = {
  title: 'Ücretsiz Tanışma Günü — Techne Lab',
  description:
    'Techne Lab ücretsiz tanışma günü kayıt formu: English Drama Lab, English Acting Praxis, Broadway Musical Dance — Taksim Pera 19 Eylül · English Drama Youth — Kadıköy 27 Eylül.',
  alternates: { canonical: `${SITE_META.url}/tanisma-gunu` },
  robots: { index: false },
}

export default function TanismaGunuPage() {
  return (
    <>
      <div className="h-[2px] w-full bg-neon" />
      <TanismaForm action={submitTanisma} />
    </>
  )
}
