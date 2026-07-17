import type { Metadata } from 'next'
import Link from 'next/link'
import { GALLERY_IMAGES, SITE_META } from '@/lib/data'
import { Gallery } from '@/components/Gallery'

export const metadata: Metadata = {
  title: 'Galeri — Atölye & Sahne Fotoğrafları',
  description: 'Techne Lab İstanbul arşivi: provalardan, atölyelerden ve sahneden kareler. Oyunculuk, İngilizce drama, müzikal ve yazarlık programlarının atmosferi.',
  alternates: { canonical: `${SITE_META.url}/galeri` },
  openGraph: {
    title: 'Galeri — Techne Lab İstanbul',
    description: 'Provadan sahneye — arşivden kareler.',
    url: `${SITE_META.url}/galeri`,
    images: [{ url: `${SITE_META.url}/images/gallery/dslr-zl5a1093.jpg`, width: 1200, height: 800, alt: 'Techne Lab İstanbul sahne performansı' }],
  },
}

export default function GaleriPage() {
  return (
    <>
      {/* ── Header — minimal, arşiv etiketi gibi ─────────────── */}
      <section className="px-4 md:px-10 pt-24 pb-10 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" />
        <div
          className="absolute -top-2 -right-4 font-display leading-none select-none pointer-events-none hidden md:block"
          style={{ fontSize: 'clamp(80px,13vw,190px)', color: 'transparent', WebkitTextStroke: '1px var(--section-stroke)' }}
          aria-hidden="true"
        >
          ARŞİV
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">fotoğraf arşivi</p>
            <h1
              className="font-display text-fg leading-none"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '0.01em' }}
            >
              GALERİ
            </h1>
          </div>
          <div className="md:text-right md:pb-2">
            <p className="font-mono text-[13px] text-stone leading-relaxed max-w-xs md:ml-auto">
              Provadan sahneye, tek akış. Karelerin üzerine gel — renk geri gelsin.
            </p>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim mt-2">
              {GALLERY_IMAGES.length} kare · 2026—
            </p>
          </div>
        </div>
      </section>

      {/* ── Tek kesintisiz akış ──────────────────────────────── */}
      <section className="pb-10" aria-label="Fotoğraf galerisi">
        <Gallery images={GALLERY_IMAGES} />
      </section>

      {/* ── Kapanış ──────────────────────────────────────────── */}
      <section className="px-4 md:px-10 py-16 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3">bir sonraki kare seninki olsun</p>
          <p className="font-display text-fg leading-none" style={{ fontSize: 'clamp(26px, 4vw, 56px)', letterSpacing: '0.02em' }}>
            SAHNEDE YER AL
          </p>
        </div>
        <Link
          href="/atolyeler"
          className="font-mono text-[10px] tracking-[0.18em] uppercase bg-neon text-bg px-8 py-4 hover:bg-fg hover:text-bg transition-all duration-200 whitespace-nowrap"
          data-hover
        >
          atölyeleri gör →
        </Link>
      </section>
    </>
  )
}
