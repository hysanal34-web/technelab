'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Workshop } from '@/lib/data'

const WORKSHOP_IMAGES: Record<string, string> = {
  'auteur-lab':                    '/images/covers/auteur-lab.png',
  'camera-praxis':                 '/images/covers/camera-praxis.png',
  'english-drama-lab':             '/images/covers/english-drama-lab.png',
  'oyuncunun-mevcudiyeti':         '/images/covers/oyuncunun-mevcudiyeti.png',
  'english-drama-final-project':   '/images/gallery/english-drama-11.jpg',
  'english-drama-youth':           '/images/covers/english-drama-youth.png',
  'techne-musical-lab':            '/images/gallery/musical-01.jpg',
  'broadway-musical-dance':        '/images/gallery/dslr-zl5a1044.jpg',
}

// Bauhaus accent colours per card (border + number tint)
const ACCENTS = ['#C8FF00', '#C8FF00', '#C8FF00', '#C8FF00']
const BG_PATTERNS = [
  'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.06) 0%, transparent 60%)',
  'radial-gradient(ellipse at 20% 80%, rgba(200,255,0,0.05) 0%, transparent 60%)',
  'radial-gradient(ellipse at 80% 80%, rgba(200,255,0,0.07) 0%, transparent 60%)',
  'radial-gradient(ellipse at 20% 20%, rgba(200,255,0,0.05) 0%, transparent 60%)',
]

export function WorkshopCard3D({ workshop: w, index }: { workshop: Workshop; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const accent = ACCENTS[index % ACCENTS.length]
  const bgPattern = BG_PATTERNS[index % BG_PATTERNS.length]
  const imgSrc = WORKSHOP_IMAGES[w.slug]

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setIsHovering(false)
  }

  return (
    <div
      ref={cardRef}
      className="card-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/atolyeler/${w.slug}`}
        className="card-3d block relative overflow-hidden border border-border group"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)${isHovering ? ' translateZ(6px)' : ''}`,
          transition: isHovering
            ? 'transform 0.12s ease'
            : 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          background: 'var(--card-bg)',
          backgroundImage: bgPattern,
        }}
        data-hover
      >
        {/* ── Image area ─────────────────────────────────────────────── */}
        <div className="relative h-52 overflow-hidden bg-bgAlt">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={w.title}
              fill
              className="object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-700 scale-105 group-hover:scale-100"
            />
          ) : (
            <div className="absolute inset-0 bauhaus-grid" />
          )}
          {/* Gradient fade to card body */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bgAlt/20 to-bgAlt" />

          {/* Ghost number — Bauhaus scale */}
          <div
            className="absolute -bottom-4 right-3 font-display leading-none select-none pointer-events-none"
            style={{
              fontSize: 'clamp(80px, 10vw, 130px)',
              color: 'transparent',
              WebkitTextStroke: `1px rgba(232,229,223,0.12)`,
              transition: 'all 0.4s',
            }}
          >
            {w.code}
          </div>

          {/* Tags top-left */}
          <div className="absolute top-4 left-4 flex gap-1.5">
            {w.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] tracking-[0.14em] uppercase px-2 py-0.5"
                style={{
                  border: `1px solid rgba(184,240,0,0.4)`,
                  color: '#0A0A0C',
                  background: 'rgba(184,240,0,0.92)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Content area ───────────────────────────────────────────── */}
        <div className="p-6 pb-7">
          {/* Instructor */}
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase mb-2 text-stone">
            {w.instructor}
          </p>

          {/* Title */}
          <h3
            className="font-display leading-none text-fg mb-1"
            style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', letterSpacing: '0.02em' }}
          >
            {w.title}
          </h3>
          <p className="font-mono text-[11px] italic text-stone mb-3">{w.sub}</p>

          {/* Divider */}
          <div className="w-8 h-[2px] mb-4 bg-neon" />

          {/* Description */}
          <p className="font-mono text-[11px] text-stone leading-relaxed line-clamp-2 mb-6">
            {w.desc}
          </p>

          {/* Footer row */}
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-[11px] tracking-[0.12em] text-dim mb-0.5">
                {w.duration}
              </div>
              <div className="font-mono text-[11px] tracking-[0.12em] text-dim">{w.venue}</div>
            </div>
            <span
              className="font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-2 transition-all duration-200 border border-fg/20 text-stone group-hover:border-neon group-hover:text-ink group-hover:bg-neon"
            >
              detay →
            </span>
          </div>
        </div>

        {/* ── Neon bottom sweep ──────────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: accent }}
        />

        {/* ── Top-left corner accent ─────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 w-6 h-px transition-all duration-300 group-hover:w-12"
          style={{ background: accent }}
        />
        <div
          className="absolute top-0 left-0 h-6 w-px transition-all duration-300 group-hover:h-12"
          style={{ background: accent }}
        />
      </Link>
    </div>
  )
}
