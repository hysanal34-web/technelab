'use client'

import { useEffect } from 'react'
import './globals.css'

/**
 * Kök layout'ta (Nav, LanguageProvider) hata olursa error.tsx devreye giremez;
 * Next'in çıplak ekranı yerine bu sayfa basılır. Kendi html/body etiketleri var.
 * Renkler satır içi de verildi: CSS yüklenemese bile okunur kalsın.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[kök hata]', error)
  }, [error])

  return (
    <html lang="tr">
      <body className="surface-dark bg-bg text-fg" style={{ background: '#0A0A0C', color: '#F5F5F0', margin: 0 }}>
        <main className="min-h-screen flex items-center px-4 md:px-10 py-24">
          <div className="max-w-xl">
            <div className="h-[2px] w-12 bg-neon mb-8" style={{ background: '#C8FF00' }} />
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-4" style={{ color: '#C8FF00' }}>
              bir şeyler ters gitti
            </p>
            <h1
              className="font-display text-fg mb-6"
              style={{ fontSize: 'clamp(36px,6vw,80px)', letterSpacing: '0.01em', lineHeight: 0.95 }}
            >
              PROVA<br /><span className="text-neon" style={{ color: '#C8FF00' }}>YARIDA KALDI.</span>
            </h1>
            <p className="font-mono text-[14px] text-stone leading-relaxed mb-10 max-w-md">
              Beklenmedik bir hata oluştu. Sayfayı yeniden yüklemeyi deneyebilirsin. Sorun sürerse
              bize haber ver, hemen bakalım.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={reset}
                className="font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
                style={{ background: '#C8FF00', color: '#0A0A0C' }}
              >
                tekrar dene →
              </button>
              {/* Kök hata: istemci yönlendiricisine güvenilmez, düz link tam sayfa yükler */}
              <a
                href="/"
                className="font-mono text-[12px] tracking-[0.16em] uppercase text-fg border border-fg/25 px-6 py-3.5 hover:border-neon hover:text-neon transition-colors duration-200"
              >
                ana sayfa →
              </a>
              <a
                href="/iletisim"
                className="font-mono text-[12px] tracking-[0.16em] uppercase text-stone px-6 py-3.5 hover:text-neon transition-colors duration-200"
              >
                bize yaz →
              </a>
            </div>

            {error.digest && (
              <p className="font-mono text-[11px] text-dim mt-10 tracking-[0.1em]">
                hata kodu: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  )
}
