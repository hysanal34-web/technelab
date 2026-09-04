import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { submitTanisma } from './actions'
import TanismaForm from '@/components/TanismaForm'

export const metadata: Metadata = {
  title: 'Ücretsiz Tanışma Günü — Techne Lab',
  description:
    'Techne Lab ücretsiz tanışma günü kayıt formu: English Drama Lab, English Drama Youth, Techne Musical Lab, Broadway Musical Dance, English Acting Praxis — Kadıköy ve Pera, 12–19 Eylül.',
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
