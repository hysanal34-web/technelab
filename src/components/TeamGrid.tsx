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

  function toggle(slug: string) {
    setOpen((prev) => (prev === slug ? null : slug))
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
      {members.map((m, idx) => {
        const isOpen = open === m.slug
        return (
          <div
            key={m.slug}
            id={`team-${m.slug}`}
            className="bg-bg group relative overflow-hidden cursor-pointer"
            style={{ aspectRatio: '3/4' }}
            onClick={() => toggle(m.slug)}
          >
            {/* Photo */}
            {m.image ? (
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className={`object-cover object-top transition-all duration-500 ${isOpen ? 'scale-105 brightness-[0.25]' : 'group-hover:scale-105 group-hover:brightness-75'}`}
              />
            ) : (
              /* Placeholder — görsel yoksa zemin rengi */
              <div className="absolute inset-0 bg-bg-alt" />
            )}

            {/* Neon top edge */}
            <div
              className={`absolute top-0 left-0 h-[2px] bg-neon z-10 transition-all duration-300 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />

            {/* Index */}
            <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] text-fg/30 z-10">
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Bottom name/role — hidden when open */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-10 transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
            >
              <div className="px-5 pb-5 pt-12">
                <h2
                  className="font-display text-fg leading-none mb-1"
                  style={{ fontSize: 'clamp(14px, 1.4vw, 20px)', letterSpacing: '0.01em' }}
                >
                  {m.name}
                </h2>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg/60">
                  {m.role.split('·')[0].trim()}
                </p>
              </div>
            </div>

            {/* Expanded bio overlay */}
            <div
              className={`absolute inset-0 z-20 flex flex-col p-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              {/* Header: name + role (fixed) */}
              <div className="flex-shrink-0 mb-3">
                <h2
                  className="font-display text-neon leading-none mb-1"
                  style={{ fontSize: 'clamp(14px, 1.4vw, 20px)', letterSpacing: '0.01em' }}
                >
                  {m.name}
                </h2>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg/50">
                  {m.role}
                </p>
              </div>

              {/* Scrollable bio */}
              <div className="flex-1 overflow-y-auto min-h-0 mb-3 pr-1"
                style={{ scrollbarWidth: 'none' }}
              >
                <p className="font-mono text-[11px] leading-relaxed text-fg/80">
                  {m.bio}
                </p>
              </div>

              {/* Bottom: program links + kapat (fixed) */}
              <div className="flex-shrink-0">
                {m.programs.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                    {m.programs.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/atolyeler/${p.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[10px] tracking-[0.10em] uppercase text-neon/70 hover:text-neon border-b border-neon/30 hover:border-neon transition-colors duration-200"
                        data-hover
                      >
                        {p.label} →
                      </Link>
                    ))}
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setOpen(null) }}
                  className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg/40 hover:text-fg transition-colors"
                >
                  ✕ kapat
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
