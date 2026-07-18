'use client'
import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { WORKSHOPS, type Workshop } from '@/lib/data'

/* ── Arama skoru ──────────────────────────────────────────────────────── */
const ALIASES: Record<string, string[]> = {
  // Disiplin
  dans:        ['broadway', 'koreograf', 'hareket', 'jazz', 'dance', 'musical dance'],
  müzikal:     ['musical', 'şan', 'broadway', 'techne musical'],
  şan:         ['şan', 'ses', 'müzikal', 'musical'],
  ses:         ['şan', 'ses', 'müzikal'],
  kamera:      ['camera', 'kamera önü', 'sinema', 'audition', 'praxis'],
  oyunculuk:   ['auteur', 'mevcudiyet', 'presence', 'beden', 'sahne', 'acting'],
  yazarlık:    ['auteur', 'dramaturg', 'metin', 'yazan oyuncu'],
  dramaturji:  ['auteur', 'dramaturg', 'metin'],
  ingilizce:   ['english', 'acting', 'drama', 'scene'],
  drama:       ['english drama', 'yaratıcı', 'acting', 'sahne'],
  beden:       ['mevcudiyet', 'presence', 'beden', 'fiziksel'],
  // Süre
  kısa:        ['4 hafta', 'yoğun program'],
  uzun:        ['8 hafta', '12 hafta', '8 ay', 'aylık'],
  haftalık:    ['hafta'],
  dönem:       ['dönemlik', '8 ay', 'ekim', 'mayıs'],
  // Hedef kitle
  genç:        ['english drama', 'ingilizce', 'yaratıcı drama'],
  yetişkin:    ['auteur', 'mevcudiyet', 'camera', 'broadway'],
  başlangıç:   ['english drama', 'yaratıcı', 'mevcudiyet'],
  ileri:       ['auteur', 'broadway', 'techne musical'],
  // Genel
  performans:  ['sahne', 'showcase', 'gösteri', 'performance'],
  audition:    ['camera', 'kamera önü', 'audition', 'praxis'],
  broadway:    ['broadway', 'jazz', 'dans', 'koreografi'],
  sahne:       ['sahne', 'performans', 'gösteri', 'showcase'],
}

function buildSearchText(w: Workshop) {
  return [w.title, w.sub, w.tagline, w.instructor, w.duration, w.desc, ...w.tags]
    .join(' ')
    .toLowerCase()
}

function scoreWorkshop(w: Workshop, tokens: string[]): number {
  const text = buildSearchText(w)
  let score = 0
  for (const token of tokens) {
    if (token.length < 2) continue
    if (text.includes(token)) score += 4
    if (w.slug.includes(token)) score += 2
    const aliases = ALIASES[token] ?? []
    for (const alias of aliases) {
      if (text.includes(alias)) score += 2
    }
  }
  return score
}

/* ── Örnek sorgular ───────────────────────────────────────────────────── */
const EXAMPLES = [
  'dans ve müzikal',
  'kısa program',
  'kamera önü oyunculuk',
  'ingilizce drama',
  'uzun dönem',
]

export function WorkshopAssistant() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo<Workshop[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const tokens = q.split(/\s+/)
    return WORKSHOPS.filter((w) => w.active)
      .map((w) => ({ w, score: scoreWorkshop(w, tokens) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ w }) => w)
  }, [query])

  const hasQuery   = query.trim().length > 0
  const showPanel  = focused && hasQuery

  return (
    <div className="relative">
      {/* ── Input ── */}
      <div
        className="flex items-center border border-fg/20 bg-bg transition-colors duration-200"
        style={{ borderColor: focused ? 'var(--neon)' : undefined }}
      >
        {/* Label */}
        <span className="flex-shrink-0 pl-5 pr-4 font-mono text-[11px] tracking-[0.22em] uppercase text-neon select-none border-r border-fg/10 py-4">
          BUL
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="dans, müzikal, kamera önü, ingilizce, kısa program..."
          className="flex-1 bg-transparent pl-5 pr-5 py-4 font-mono text-[12px] text-fg placeholder:text-dim/50 outline-none"
          data-hover
          autoComplete="off"
        />

        {hasQuery && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="flex-shrink-0 pr-5 font-mono text-[11px] text-dim/50 hover:text-dim transition-colors"
            data-hover
            tabIndex={-1}
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Örnek sorgular ── */}
      {!hasQuery && (
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setQuery(ex); inputRef.current?.focus() }}
              className="font-mono text-[11px] tracking-[0.12em] uppercase border border-fg/10 text-dim px-3 py-1 hover:border-neon/50 hover:text-stone transition-all duration-150"
              data-hover
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* ── Sonuç paneli ── */}
      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 border border-t-0 border-neon/30 bg-bg divide-y divide-border shadow-lg">
          {results.length > 0 ? (
            results.map((w) => (
              <Link
                key={w.id}
                href={`/atolyeler/${w.slug}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-bgAlt transition-colors duration-150 group"
                data-hover
              >
                {/* Sol: kod + isim */}
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neon flex-shrink-0">
                    {w.code}
                  </span>
                  <div className="min-w-0">
                    <span
                      className="font-display text-fg group-hover:text-neon transition-colors"
                      style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', letterSpacing: '0.02em' }}
                    >
                      {w.title}
                    </span>
                    <span className="font-mono text-[11px] italic text-stone ml-2 hidden sm:inline">
                      — {w.sub}
                    </span>
                  </div>
                </div>

                {/* Sağ: süre + fiyat */}
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-dim">{w.duration}</div>
                  <div
                    className="font-display text-neon"
                    style={{ fontSize: '14px', letterSpacing: '0.02em' }}
                  >
                    {(w.priceEarlyBird ?? w.price).toLocaleString('tr-TR')} ₺
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-mono text-[11px] text-dim">Eşleşen program yok.</span>
              <Link
                href="/atolyeler"
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon hover:underline"
                data-hover
              >
                tüm programlar →
              </Link>
            </div>
          )}

          {/* Alt link */}
          {results.length > 0 && (
            <div className="px-5 py-2 flex justify-end">
              <Link
                href="/atolyeler"
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim hover:text-stone transition-colors"
                data-hover
              >
                tüm programları gör →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
