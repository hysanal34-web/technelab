import Link from 'next/link'
import type { Metadata } from 'next'
import { cikisYap } from '../actions'

export const metadata: Metadata = {
  title: 'Yönetim — Techne Lab',
  // Panel arama motorlarına kapalı. Middleware zaten giriş istiyor ama
  // bir sayfa yanlışlıkla açıkta kalırsa dizine girmesin.
  robots: { index: false, follow: false, nocache: true },
}

const MENU = [
  { yol: '/admin',            etiket: 'genel bakış' },
  { yol: '/admin/basvurular', etiket: 'başvurular' },
  { yol: '/admin/programlar', etiket: 'programlar' },
  { yol: '/admin/donusumler', etiket: 'dönüşümler' },
  { yol: '/admin/araclar',    etiket: 'araçlar' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <Link href="/admin" className="font-display text-[20px] leading-none text-neon">
            TECHNE LAB
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">yönetim</span>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {MENU.map((m) => (
              <Link
                key={m.yol}
                href={m.yol}
                className="font-mono text-[12px] lowercase tracking-[0.08em] text-stone transition-colors hover:text-fg"
              >
                {m.etiket}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="font-mono text-[11px] lowercase text-stone transition-colors hover:text-fg"
            >
              siteyi aç ↗
            </Link>
            <form action={cikisYap}>
              <button
                type="submit"
                className="font-mono text-[11px] lowercase text-stone transition-colors hover:text-fg"
              >
                çıkış
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-8">{children}</main>
    </div>
  )
}
