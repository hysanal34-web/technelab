'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[sayfa hatası]', error)
  }, [error])

  return (
    <main className="min-h-[70vh] flex items-center px-4 md:px-10 py-24">
      <div className="max-w-xl">
        <div className="h-[2px] w-12 bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-4">
          bir şeyler ters gitti
        </p>
        <h1
          className="font-display text-fg mb-6"
          style={{ fontSize: 'clamp(36px,6vw,80px)', letterSpacing: '0.01em', lineHeight: 0.95 }}
        >
          PROVA<br /><span className="text-neon">YARIDA KALDI.</span>
        </h1>
        <p className="font-mono text-[14px] text-stone leading-relaxed mb-10 max-w-md">
          Beklenmedik bir hata oluştu. Sayfayı yeniden yüklemeyi deneyebilirsin —
          sorun sürerse bize haber ver, hemen bakalım.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={reset}
            className="font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
            data-hover
          >
            tekrar dene →
          </button>
          <Link
            href="/"
            className="font-mono text-[12px] tracking-[0.16em] uppercase text-fg border border-fg/25 px-6 py-3.5 hover:border-neon hover:text-neon transition-colors duration-200"
            data-hover
          >
            ana sayfa →
          </Link>
          <Link
            href="/iletisim"
            className="font-mono text-[12px] tracking-[0.16em] uppercase text-stone px-6 py-3.5 hover:text-neon transition-colors duration-200"
            data-hover
          >
            bize yaz →
          </Link>
        </div>

        {error.digest && (
          <p className="font-mono text-[11px] text-dim mt-10 tracking-[0.1em]">
            hata kodu: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}
