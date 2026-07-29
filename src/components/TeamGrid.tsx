'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type TeamMember = {
  name: string
  role: string
  bio: string
  slug: string
  image?: string
  programs: { label: string; slug: string }[]
}

export function TeamGrid({ members, initialOpen }: { members: TeamMember[]; initialOpen?: string }) {
  // Açık biyografi — aynı anda tek kart
  const [open, setOpen] = useState<string | null>(null)
  // Dokunmatik cihazda hover yok; ilk dokunuşta isim, ikincide biyografi
  const [touchRevealed, setTouchRevealed] = useState<string | null>(null)
  const openedAt = useRef(0)

  useEffect(() => {
    if (!initialOpen) return
    const match = members.find((m) => m.slug === initialOpen)
    if (!match) return
    setOpen(match.slug)
    openedAt.current = Date.now()
    setTimeout(() => {
      document.getElementById(`team-${initialOpen}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 200)
  }, [initialOpen, members])

  // Fare yeniden hareket edince biyografi kapansın — kullanıcı "geri dönebilsin"
  useEffect(() => {
    if (!open) return

    const onMove = () => {
      // Açılıştan hemen sonraki imleç titremesi kapatmasın
      if (Date.now() - openedAt.current < 600) return
      setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = useCallback((slug: string) => {
    setOpen((cur) => {
      if (cur === slug) return null
      openedAt.current = Date.now()
      return slug
    })
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
      {members.map((m, idx) => {
        const isOpen = open === m.slug
        const isTouched = touchRevealed === m.slug
        const shortRole = m.role.split('·')[0].trim()

        return (
          <article
            key={m.slug}
            id={`team-${m.slug}`}
            className="bg-bg group relative overflow-hidden"
            style={{ aspectRatio: '4/5' }}
            onTouchStart={() => setTouchRevealed(m.slug)}
          >
            {/* ── Fotoğraf ─────────────────────────────────────────── */}
            {m.image ? (
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className={`object-cover object-top transition-all duration-500 ${
                  isOpen ? 'scale-105 blur-[3px]' : 'group-hover:scale-[1.04]'
                }`}
              />
            ) : (
              <div className="absolute inset-0 bg-bgAlt" />
            )}

            {/* Sıra numarası */}
            <span className="absolute top-3 left-3 font-mono text-[11px] tracking-[0.18em] text-white/45 z-20">
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Neon üst çizgi */}
            <div className="absolute top-0 left-0 h-[2px] bg-neon z-20 w-0 group-hover:w-full transition-all duration-300" />

            {/* ── Katman 1: isim + görev (hover / dokunuş) ─────────── */}
            <button
              type="button"
              onClick={() => toggle(m.slug)}
              aria-expanded={isOpen}
              aria-label={`${m.name} — biyografiyi ${isOpen ? 'kapat' : 'aç'}`}
              className={`absolute inset-0 z-10 flex flex-col justify-end text-left p-4 transition-opacity duration-300 ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{
                background:
                  'linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.55) 38%, rgba(10,10,12,0.05) 70%, transparent 100%)',
              }}
            >
              <h2
                className="font-display text-white leading-tight mb-1 transition-transform duration-300 md:translate-y-1 md:group-hover:translate-y-0"
                style={{ fontSize: 'clamp(15px, 1.5vw, 21px)', letterSpacing: '0.01em' }}
              >
                {m.name}
              </h2>
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon">
                {shortRole}
              </p>

              {/* Yönlendirme — masaüstünde hover'da, mobilde dokunduktan sonra */}
              <span
                className={`font-mono text-[11px] tracking-[0.12em] uppercase text-white/55 mt-3 transition-opacity duration-300 ${
                  isTouched ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                }`}
              >
                biyografi için tıkla →
              </span>
            </button>

            {/* ── Katman 2: biyografi (tıklayınca) ─────────────────── */}
            <div
              className={`absolute inset-0 z-30 flex flex-col bg-bg/96 backdrop-blur-sm border-l-2 border-neon transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 scrollbar-none">
                <h3
                  className="font-display text-fg leading-tight"
                  style={{ fontSize: 'clamp(14px, 1.4vw, 19px)', letterSpacing: '0.01em' }}
                >
                  {m.name}
                </h3>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neon mt-1 mb-3">
                  {m.role}
                </p>
                <p className="font-mono text-[11px] leading-relaxed text-stone">{m.bio}</p>

                {m.programs.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 pt-3 border-t border-border">
                    {m.programs.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/atolyeler/${p.slug}`}
                        className="font-mono text-[11px] tracking-[0.08em] uppercase text-dim hover:text-neon transition-colors duration-200 py-1"
                        data-hover
                      >
                        {p.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setOpen(null)}
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors duration-200 text-left px-4 py-3 border-t border-border"
              >
                ← kapat
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
