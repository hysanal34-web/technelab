'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { displayRole } from '@/lib/roleLabel'

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border items-start">
      {members.map((m, idx) => {
        const isOpen = open === m.slug
        const isTouched = touchRevealed === m.slug
        const shortRole = displayRole(m.role)

        return (
          <article
            key={m.slug}
            id={`team-${m.slug}`}
            className={`bg-bg group relative overflow-hidden ${isOpen ? 'col-span-2 md:col-span-1' : ''}`}
            style={isOpen ? undefined : { aspectRatio: '4/5' }}
            onTouchStart={() => setTouchRevealed(m.slug)}
          >
            {/* ── Fotoğraf ─────────────────────────────────────────── */}
            {/* Kapalıyken kartı dolduran 4:5 fotoğraf; açıkken üstte kısa bir
                16:9 şerit — biyografi fotoğrafın ÜSTÜNE değil ALTINA gelir,
                kart içeriğe göre uzar. (14 Eylül: "biyografi okunmuyor" düzeltmesi) */}
            <div className={isOpen ? 'relative w-full' : 'absolute inset-0'} style={isOpen ? { aspectRatio: '16/9' } : undefined}>
              {m.image ? (
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className={`object-cover ${isOpen ? 'object-[50%_20%]' : 'object-top group-hover:scale-[1.04]'} transition-all duration-500`}
                />
              ) : (
                <div className="absolute inset-0 bg-bgAlt" />
              )}
            </div>

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
            {isOpen && (
              <div className="flex flex-col border-t-[3px] border-neon">
                <div className="px-5 pt-5 pb-2">
                  <h3 className="font-display text-fg leading-none text-[24px] md:text-[26px] tracking-[0.01em]">
                    {m.name}
                  </h3>
                  <p className="font-body text-[13px] tracking-[0.08em] uppercase text-dim mt-1.5 mb-4">
                    {m.role}
                  </p>
                  <p className="font-body text-[15px] md:text-[16px] leading-[1.65] text-fg">{m.bio}</p>

                  {m.programs.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-5 pt-4 border-t border-border">
                      {m.programs.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/atolyeler/${p.slug}`}
                          className="font-body text-[13px] font-semibold text-fg hover:text-neon transition-colors duration-200 py-1"
                          data-hover
                        >
                          {p.label} →
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/ekip/${m.slug}`}
                    className="font-body text-[13px] font-semibold text-ink bg-neon px-3 py-2 mt-4 inline-block hover:bg-fg hover:text-bg transition-colors duration-200"
                    data-hover
                  >
                    tam profil →
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="font-body text-[13px] tracking-[0.06em] uppercase text-dim hover:text-fg transition-colors duration-200 text-left px-5 py-3 border-t border-border"
                >
                  ← kapat
                </button>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
