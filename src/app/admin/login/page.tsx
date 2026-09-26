import { GirisFormu } from './GirisFormu'

export const dynamic = 'force-dynamic'

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ devam?: string }>
}) {
  const { devam } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <GirisFormu devam={devam ?? ''} />
    </main>
  )
}
