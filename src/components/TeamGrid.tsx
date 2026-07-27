'use client'
import { useState, useEffect } from 'react'
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
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    if (initialOpen) {
      const match = members.find((m) => m.slug === initialOpen)
      if (match) {
        setOpen(match.slug)
        setTimeout(() => {
          const el = document.getElementById(`team-${initialOpen}`)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 200)
      }
    }
  }, [initialOpen, members])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
      {members.map((m, idx) => {
        const isOpen = open === m.slug
        return (
          <div
            key={m.slug}
            id={`team-${m.slug}`}
            className="bg-bg group flex flex-col"
          >
            {/* Fotoğraf */}
            <div
              className="relative w-full overflow-hidden flex-shrink-0"
              style={{ aspectRatio: '4/5' }}
            >
              {m.image ? (
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 bg-bg-alt" />
              )}

              {/* İndeks numarası */}
              <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.18em] text-white/50 z-10 mix-blend-overlay">
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Neon top accent */}
              <div
                className={`absolute top-0 left-0 h-[2px] bg-neon z-10 transition-all duration-300 ${
                  'w-0 group-hover:w-full'
                }`}
              />
            </div>

            {/* Metin alanı */}
            <div className="flex flex-col flex-1 px-4 pt-4 pb-5 border-t border-border">
              {/* İsim + unvan */}
              <h2
                className="font-display text-fg group-hover:text-neon transition-colors duration-200 leading-tight mb-1"
                style={{ fontSize: 'clamp(13px, 1.3vw, 17px)', letterSpacing: '0.01em' }}
              >
                {m.name}
              </h2>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-stone mb-3">
                {m.role.split('·')[0].trim()}
              </p>

              {/* Bio */}
              <div className="flex-1">
                <p
                  className={`font-mono text-[11px] leading-relaxed text-stone transition-all duration-300 ${
                    isOpen ? '' : 'line-clamp-3'
                  }`}
                >
                  {m.bio}
                </p>

                {/* Devamını gör / kapat */}
                {m.bio.length > 120 && (
                  <button
                    onClick={() => setOpen(isOpen ? null : m.slug)}
                    className="font-mono text-[10px] tracking-[0.12em] uppercase text-neon/60 hover:text-neon transition-colors duration-200 mt-2"
                  >
                    {isOpen ? '↑ kapat' : '↓ devamı'}
                  </button>
                )}
              </div>

              {/* Program linkleri */}
              {m.programs.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-4 pt-3 border-t border-border">
                  {m.programs.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/atolyeler/${p.slug}`}
                      className="font-mono text-[10px] tracking-[0.08em] uppercase text-dim hover:text-neon transition-colors duration-200"
                      data-hover
                    >
                      {p.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
