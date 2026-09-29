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
 * zamanında donarsa filtre de donar ve seans geçtiği hâlde yayında kalır.
 * `searchParams` okunduğu için sayfa artık her istekte render ediliyor;
 * revalidate yedek olarak duruyor.
 */
export const revalidate = 3600

type Props = { searchParams: Promise<{ program?: string; seans?: string }> }

export default async function TanismaGunuPage({ searchParams }: Props) {
  const { program, seans } = await searchParams
  const tumu = aktifSessions()

  // ?program=<slug> → liste o programa daralır (reklam ve DM linkleri için).
  // Eşleşen aktif seans yoksa tüm liste gösterilir; boş form basılmaz.
  const daralmis = program ? tumu.filter((s) => s.slug === program) : []
  const sessions = daralmis.length > 0 ? daralmis : tumu

  // ?seans=<id> → o seans seçili gelir (yalnızca hâlâ aktifse).
  const secili = seans && sessions.some((s) => s.id === seans) ? seans : sessions.length === 1 ? sessions[0].id : ''

  return (
    <>
      <div className="h-[2px] w-full bg-neon" />
      <TanismaForm
        action={submitTanisma}
        sessions={sessions}
        initialSessionId={secili}
        filtered={daralmis.length > 0}
      />
    </>
  )
}
