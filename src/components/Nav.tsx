'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { WORKSHOPS } from '@/lib/data'
import { ThemeToggle } from '@/components/ThemeToggle'

const links = [
  { href: '/atolyeler', tr: 'atölyeler', en: 'workshops', hasMega: true },
  { href: '/ekip',      tr: 'ekip',      en: 'team',      hasMega: false },
  { href: '/galeri',    tr: 'galeri',    en: 'gallery',   hasMega: false },
  { href: '/hakkinda',  tr: 'hakkında',  en: 'about',     hasMega: false },
  { href: '/iletisim',  tr: 'iletişim',  en: 'contact',   hasMega: false },
]

const CATEGORIES = [
  { key: 'yazarlık',        label: 'Yazarlık',        en: 'Playwriting' },
  { key: 'oyunculuk',       label: 'Oyunculuk',       en: 'Acting' },
  { key: 'ingilizce-drama', label: 'İngilizce Drama', en: 'English Drama' },
  { key: 'dans-muzikal',    label: 'Dans & Müzikal',  en: 'Dance & Musical' },
]

function MegaMenu({ onClose, onEnter }: { onClose: () => void; onEnter: () => void }) {
  return (
    <div
      className="fixed left-0 right-0 bg-bg/98 backdrop-blur-md border-b border-border z-40 mega-drop"
      style={{ top: 64, boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onClose}
    >
      <div className="grid md:grid-cols-[repeat(4,1fr)_auto]">
        {CATEGORIES.map((cat, i) => {
          const cnt = WORKSHOPS.filter((w) => w.category === cat.key && w.active).length
          return (
            <Link
              key={cat.key}
              href="/atolyeler"
              onClick={onClose}
              className="group px-8 py-9 border-r border-border hover:bg-bgAlt transition-colors duration-200"
              data-hover
            >
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim group-hover:text-neon transition-colors duration-200 block mb-2">
                0{i + 1} · {cnt} program
              </span>
              <span className="font-display text-fg group-hover:text-neon transition-colors duration-200 leading-none block"
                style={{ fontSize: 'clamp(20px, 1.8vw, 30px)', letterSpacing: '0.02em' }}>
                {cat.label.toUpperCase()}
              </span>
            </Link>
          )
        })}
        <Link
          href="/atolyeler"
          onClick={onClose}
          className="group flex items-center px-8 py-9 bg-neon hover:bg-fg transition-colors duration-200"
          data-hover
        >
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-bg whitespace-nowrap">
            tümü →
          </span>
        </Link>
      </div>
    </div>
  )
}

export function Nav() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 80)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[9000] flex items-center justify-between px-8 md:px-12 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/97 backdrop-blur-md border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ height: 64 }}
    >
      {/* Neon left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-neon hidden md:block" aria-hidden="true" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group" data-hover>
        <div className="relative w-9 h-9 flex-shrink-0">
          <Image
            src="/images/techne-logo.png"
            alt="Techne Lab"
            fill
            sizes="32px"
            className="object-contain rounded-full group-hover:opacity-90 transition-opacity duration-200"
          />
        </div>
        <span
          className={`font-mono text-[13px] tracking-[0.12em] transition-colors duration-200 hidden md:block ${
            path === '/' ? 'text-neon' : 'text-fg group-hover:text-neon'
          }`}
        >
          TECHNE LAB İSTANBUL
        </span>
      </Link>

      {/* Desktop links */}
      <nav className="hidden md:flex items-center gap-9 relative" aria-label="Ana navigasyon">
        {links.map(({ href, tr, en, hasMega }) =>
          hasMega ? (
            <div
              key={href}
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <Link
                href={href}
                className={`relative font-mono text-[13px] tracking-[0.1em] lowercase transition-colors duration-200 group ${
                  path.startsWith(href) ? 'text-neon' : 'text-fg/70 hover:text-fg'
                }`}
                data-hover
              >
                {lang === 'en' ? en : tr}
                {path.startsWith(href) ? (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-neon" />
                ) : (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                )}
                {/* Dropdown arrow */}
                <span className={`ml-1 transition-transform duration-150 inline-block ${megaOpen ? 'rotate-180' : ''}`}
                  style={{ fontSize: 8 }}>
                  ▾
                </span>
              </Link>
              {megaOpen && (
                <MegaMenu onClose={closeMega} onEnter={openMega} />
              )}
            </div>
          ) : (
            <Link
              key={href}
              href={href}
              className={`relative font-mono text-[13px] tracking-[0.1em] lowercase transition-colors duration-200 group ${
                path.startsWith(href) ? 'text-neon' : 'text-fg/70 hover:text-fg'
              }`}
              data-hover
            >
              {lang === 'en' ? en : tr}
              {path.startsWith(href) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-neon" />
              )}
            </Link>
          )
        )}

        {/* TR / EN toggle */}
        <button
          onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg/50 hover:text-neon transition-colors duration-200 border border-fg/20 hover:border-neon px-2 py-0.5"
          aria-label="Dil / Language"
          data-hover
        >
          {lang === 'tr' ? 'EN' : 'TR'}
        </button>

        {/* Tema */}
        <ThemeToggle />
      </nav>

      {/* Mobile: hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1 w-6"
          aria-label="Menü"
        >
          <span className={`h-px bg-fg transition-all duration-200 ${menuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`} />
          <span className={`h-px bg-neon transition-all duration-200 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
          <span className={`h-px bg-fg transition-all duration-200 ${menuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-6'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg/98 backdrop-blur-md border-b border-border md:hidden z-50 max-h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="px-8 py-6 flex flex-col gap-5">
            {links.map(({ href, tr, en }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`font-mono text-[13px] tracking-[0.1em] lowercase ${path.startsWith(href) ? 'text-neon' : 'text-stone'}`}
              >
                {lang === 'en' ? en : tr}
              </Link>
            ))}
            {/* Programs by category in mobile */}
            <div className="pt-4 border-t border-border">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-4">programlar</p>
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className="mb-4">
                  <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim mb-2">{cat.label}</p>
                  {WORKSHOPS.filter(w => w.category === cat.key && !w.archived).map((w) => (
                    <Link
                      key={w.slug}
                      href={`/atolyeler/${w.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block font-mono text-[11px] text-stone py-1 hover:text-fg transition-colors"
                    >
                      {w.title === 'ENGLISH DRAMA LAB' ? `EDL — ${w.sub}` : w.title}
                      {!w.active && <span className="ml-2 text-[11px] text-stone/50">(kapalı)</span>}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            {/* Language + theme in mobile menu */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-dim hover:text-neon transition-colors text-left"
              >
                {lang === 'tr' ? '→ English' : '→ Türkçe'}
              </button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
