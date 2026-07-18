import Link from 'next/link'
import { SITE_META } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-border mt-0">
      <div className="px-4 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display text-2xl tracking-wider text-fg mb-1">TECHNE LAB İSTANBUL</div>
          <div className="font-mono text-[11px] tracking-widest2 uppercase text-dim">Bağımsız Tiyatro &amp; Performans — İstanbul</div>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Footer navigasyon">
          {[
            ['/atolyeler','atölyeler'],
            ['/ekip','ekip'],
            ['/galeri','galeri'],
            ['/makaleler','makaleler'],
            ['/hakkinda','hakkında'],
            ['/iletisim','iletişim'],
          ].map(([href,label]) => (
            <Link key={href} href={href} className="font-mono text-[11px] tracking-[0.12em] lowercase text-stone hover:text-neon transition-colors duration-200">
              {label}
            </Link>
          ))}
        </nav>

        <div className="text-right">
          <a href={`mailto:${SITE_META.email}`} className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 block mb-1">
            {SITE_META.email}
          </a>
          <a href="https://instagram.com/technelabistanbul" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 block">
            {SITE_META.instagram}
          </a>
        </div>
      </div>

      <div className="px-4 md:px-10 pb-5 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-[11px] text-dim tracking-[0.1em]">© 2026 TECHNE LAB İSTANBUL</span>
        <span className="font-mono text-[11px] text-dim/60 tracking-[0.14em] uppercase hidden md:block" title="τέχνη — zanaat">τέχνη · zanaat · istanbul</span>
        <span className="font-mono text-[11px] text-dim tracking-[0.1em] uppercase">Tüm Hakları Saklıdır</span>
      </div>
    </footer>
  )
}
