import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { submitTanisma } from './actions'
import { aktifSessions } from './sessions'
import TanismaForm from '@/components/TanismaForm'

export const metadata: Metadata = {
  title: 'Ücretsiz Tanışma Günü',
  description:
    'Techne Lab ücretsiz tanışma günü kayıt formu. Yaklaşan tanışma seansları ve kayıt.',
  alternates: { canonical: `${SITE_META.url}/tanisma-gunu` },
  robots: { index: false },
}

/**
 * Geçmiş seansları eleyen filtre render anında çalışıyor. Sayfa build
 * zamanında donarsa filtre de donar ve seans geçtiği hâlde yayında kalır —
 * asıl kaçınmaya çalıştığımız hata bu. Saatlik yenileme, gün dönümünden
 * sonra en fazla bir saat gecikme demek; seanslar gündüz olduğu için yeterli.
 */
export const revalidate = 3600

export default function TanismaGunuPage() {
  const sessions = aktifSessions()
  return (
    <>
      <div className="h-[2px] w-full bg-neon" />
      <TanismaForm action={submitTanisma} sessions={sessions} />
    </>
  )
}
