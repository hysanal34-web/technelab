import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { BilgiForm } from '@/components/BilgiForm'

export const metadata: Metadata = {
  title: 'Fiyat & Program Bilgisi İste | Techne Lab İstanbul',
  description:
    'Techne Lab atölye ücretleri ve program içeriği — formu doldur, güncel fiyat tablosu ve müfredat e-postana gelsin. Oyunculuk, İngilizce drama, müzikal, dans ve yazarlık programları.',
  alternates: { canonical: `${SITE_META.url}/bilgi` },
  robots: { index: true, follow: true },
}

export default async function BilgiPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>
}) {
  const { program } = await searchParams
  return (
    <div className="px-4 md:px-10 py-16 md:py-24 max-w-3xl mx-auto">
      <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-4">
        fiyat &amp; program bilgisi
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-fg leading-tight mb-6">
        ÜCRETLER VE İÇERİK — MAİLİNE GELSİN
      </h1>
      <p className="text-stone text-[15px] leading-relaxed mb-10 max-w-xl">
        Program ücretlerini herkese açık yayınlamıyoruz; ilgilenen herkese ise açıkça söylüyoruz.
        Aşağıya bilgilerini bırak — seçtiğin programın güncel ücret tablosu, ödeme seçenekleri ve
        içerik özeti birkaç dakika içinde e-postanda olsun. Acelen varsa telefon her zaman daha hızlı:{' '}
        <a href={`tel:${SITE_META.phoneE164}`} data-call-cta="bilgi-page" className="text-fg hover:text-neon underline">
          {SITE_META.phone}
        </a>
      </p>
      <BilgiForm defaultProgram={program} />
    </div>
  )
}
