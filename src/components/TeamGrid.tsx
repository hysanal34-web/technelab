'use client'
import { useState } from 'react'
import Link from 'next/link'

export type TeamMember = {
  name: string
  role: string
  bio: string
  programs: { label: string; slug: string }[]
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [open, setOpen] = useState<string | null>(null)

  function toggle(name: string) {
    setOpen((prev) => (prev === name ? null : name))
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
      {members.map((m) => {
        const isOpen = open === m.name
        return (
          <div
            key={m.name}
            className="bg-bg group relative overflow-hidden cursor-pointer"
            onClick={() => toggle(m.name)}
          >
            {/* Neon top edge on hover/open */}
            <div
              className={`absolute top-0 left-0 h-[2px] bg-neon transition-all duration-300 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />

            {/* Card body */}
            <div className="px-5 pt-8 pb-6 min-h-[180px] flex flex-col justify-between">
              {/* Index */}
              <span className="font-mono text-[10px] tracking-[0.18em] text-dim/40 block mb-4">
                {String(members.indexOf(m) + 1).padStart(2, '0')}
              </span>

              {/* Name */}
              <div className="flex-1">
                <h2
                  className={`font-display leading-none mb-2 transition-colors duration-200 ${isOpen ? 'text-neon' : 'text-fg group-hover:text-neon'}`}
                  style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', letterSpacing: '0.01em' }}
                >
                  {m.name}
                </h2>
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone leading-relaxed">
                  {m.role}
                </p>
              </div>

              {/* Toggle hint */}
              <div className={`font-mono text-[10px] tracking-[0.14em] text-dim mt-5 transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                bak →
              </div>
            </div>

            {/* Expanded bio overlay */}
            <div
              className={`absolute inset-0 bg-bg border-neon transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
              style={{ borderTop: isOpen ? '2px solid var(--neon)' : 'none' }}
            >
              <div className="px-5 pt-6 pb-5 h-full flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[11px] leading-relaxed text-stone">
                    {m.bio}
                  </p>
                </div>

                {/* Program links */}
                {m.programs.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
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
                  className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim hover:text-fg mt-4 self-start transition-colors"
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
