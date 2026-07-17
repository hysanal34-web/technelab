'use client'

import Link from 'next/link'
import { useState } from 'react'
import { WORKSHOPS } from '@/lib/data'
import { WorkshopRow } from '@/components/WorkshopRow'

type Cat = 'tümü' | 'yazarlık' | 'oyunculuk' | 'ingilizce-drama' | 'dans-muzikal'

const CATS: { key: Cat; tr: string }[] = [
  { key: 'tümü',            tr: 'Tümü' },
  { key: 'yazarlık',        tr: 'Yazarlık' },
  { key: 'oyunculuk',       tr: 'Oyunculuk' },
  { key: 'ingilizce-drama', tr: 'İngilizce Drama' },
  { key: 'dans-muzikal',    tr: 'Dans & Müzikal' },
]

export function WorkshopsFilter() {
  const [cat, setCat] = useState<Cat>('tümü')

  const visible  = cat === 'tümü' ? WORKSHOPS : WORKSHOPS.filter(w => w.category === cat)
  const active   = visible.filter(w => w.active)
  const passive  = visible.filter(w => !w.active)

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap items-stretch border-b border-border">
        {CATS.map(({ key, tr }) => {
          const cnt = key === 'tümü'
            ? WORKSHOPS.length
            : WORKSHOPS.filter(w => w.category === key).length
          return (
            <button
              key={key}
              onClick={() => setCat(key)}
              className={`font-mono text-[11px] tracking-[0.18em] uppercase px-5 md:px-6 py-4 border-r border-border transition-all duration-150 ${
                cat === key
                  ? 'text-neon bg-neon/5 border-b-[2px] border-b-neon -mb-px'
                  : 'text-dim hover:text-fg'
              }`}
              data-hover
            >
              {tr}
              <span className={`ml-2 text-[10px] ${cat === key ? 'text-neon/50' : 'text-dim/40'}`}>{cnt}</span>
            </button>
          )
        })}
      </div>

      {/* 2 atölye indirimi — neon blok */}
      <div className="mx-4 md:mx-10 my-8 bg-neon px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-bg mb-1" style={{ fontSize: 'clamp(24px,3.4vw,42px)', letterSpacing: '0.02em' }}>
              2 ATÖLYE ALANA %25 İNDİRİM
            </p>
            <p className="font-mono text-[11px] text-bg/70">
              İki farklı program seçip sepete eklediğinizde indirim otomatik uygulanır.
            </p>
          </div>
          <Link href="/sepet" className="font-mono text-[10px] tracking-[0.14em] uppercase bg-bg text-fg px-5 py-3 hover:bg-fg hover:text-bg transition-all duration-200 whitespace-nowrap" data-hover>
            sepete git →
          </Link>
        </div>
      </div>

      {/* Aktif programlar */}
      {active.length > 0 && (
        <section className="px-4 md:px-10 pb-8">
          {active.map((w) => (
            <WorkshopRow key={w.id} workshop={w} />
          ))}
        </section>
      )}

      {/* Pasif (satışa kapalı) programlar */}
      {passive.length > 0 && (
        <section className="px-4 md:px-10 pb-20">
          <div className="flex items-center gap-4 py-5 border-t border-border mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-stone/40" />
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-stone/60">Satışa Kapalı Programlar</p>
          </div>
          {passive.map((w) => (
            <WorkshopRow key={w.id} workshop={w} />
          ))}
        </section>
      )}
    </>
  )
}
