import type { Metadata } from 'next'
import { SITE_META, WORKSHOPS } from '@/lib/data'
import { WaitlistForm } from '@/components/WaitlistForm'

/**
 * Kayıt kapalı programlar için bekleme listesi.
 *
 * Neden var: kapalı programlarda ziyaretçiye önceden yalnızca bir mailto
 * linki veriliyordu; mail istemcisi açılınca çoğu kişi vazgeçiyordu. Sayfa,
 * o trafiği e-posta listesine çeviriyor. Tarih vaadi yok, yalnızca haber
 * verme sözü.
 */

export const metadata: Metadata = {
  title: 'Bekleme Listesi',
  description:
    'Kayıt kapalı oyunculuk programları için bekleme listesi. Yeni dönem tarihleri netleştiğinde ilk sana haber verelim.',
  alternates: { canonical: `${SITE_META.url}/bekleme-listesi` },
  // Arama sonucunda çıkması istenmiyor: hedef sayfa değil, dönüşüm sayfası.
  robots: { index: false, follow: true },
}

export default async function BeklemeListesiPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>
}) {
  const { program } = await searchParams

  // Kayıt kapalı ve arşivlenmemiş programlar — liste data.ts'ten geliyor.
  const kapali = WORKSHOPS.filter((w) => !w.active && !w.archived)
  const isimler = kapali.map((w) => w.title)

  const secili = kapali.find((w) => w.slug === program)?.title

  return (
    <div className="px-4 md:px-10 py-16 md:py-24 max-w-3xl mx-auto">
      <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-4">
        bekleme listesi
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-fg leading-tight mb-6">
        YENİ DÖNEM AÇILINCA
        <br />
        HABER VERELİM
      </h1>
      <p className="text-stone text-[15px] leading-relaxed mb-4 max-w-xl">
        {secili ? (
          <>
            <span className="text-fg">{secili}</span> şu an kayıt almıyor. Yeni dönem kesin açılacak
            ama tarihi henüz netleşmedi.
          </>
        ) : (
          <>
            Bazı programlarımız şu an kayıt almıyor. Yeni dönemler kesin açılacak ama tarihleri henüz
            netleşmedi.
          </>
        )}{' '}
        Aşağıya bırakırsan kontenjan açılmadan önce ilk sana yazarız.
      </p>
      <p className="font-mono text-[12px] text-dim leading-relaxed mb-10 max-w-xl">
        Bu bir ön kayıt değil, taahhüt değil. Sadece haber listesi.
      </p>

      <WaitlistForm programs={isimler} defaultProgram={secili} />

      <p className="font-mono text-[12px] text-dim leading-relaxed mt-10">
        Açık programları görmek istersen:{' '}
        <a href="/atolyeler" className="text-stone hover:text-neon underline">
          Atölyeler
        </a>
      </p>
    </div>
  )
}
