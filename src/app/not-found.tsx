import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center px-4 md:px-10 py-24 relative overflow-hidden">
      <div
        className="absolute -top-10 -right-6 font-display leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(120px,22vw,320px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(200,255,0,0.08)',
        }}
        aria-hidden="true"
      >
        404
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="h-[2px] w-12 bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-4">
          404 — sayfa bulunamadı
        </p>
        <h1
          className="font-display text-fg mb-6"
          style={{ fontSize: 'clamp(40px,7vw,96px)', letterSpacing: '0.01em', lineHeight: 0.92 }}
        >
          SAHNE<br /><span className="text-neon">BOŞ.</span>
        </h1>
        <p className="font-mono text-[14px] text-stone leading-relaxed mb-10 max-w-md">
          Aradığın sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir.
          Perde kapanmadan seni doğru yere götürelim.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/atolyeler"
            className="font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
            data-hover
          >
            programlar →
          </Link>
          <Link
            href="/"
            className="font-mono text-[12px] tracking-[0.16em] uppercase text-fg border border-fg/25 px-6 py-3.5 hover:border-neon hover:text-neon transition-colors duration-200"
            data-hover
          >
            ana sayfa →
          </Link>
          <Link
            href="/iletisim"
            className="font-mono text-[12px] tracking-[0.16em] uppercase text-stone border border-transparent px-6 py-3.5 hover:text-neon transition-colors duration-200"
            data-hover
          >
            bize yaz →
          </Link>
        </div>
      </div>
    </main>
  )
}
