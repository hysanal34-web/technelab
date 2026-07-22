'use client'

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

  const all     = WORKSHOPS.filter(w => !w.archived)
  const visible = cat === 'tümü' ? all : all.filter(w => w.category === cat)

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap items-stretch border-b border-border">
        {CATS.map(({ key, tr }) => {
          const cnt = key === 'tümü'
            ? all.length
            : all.filter(w => w.category === key).length
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
              <span className={`ml-2 text-[11px] ${cat === key ? 'text-neon/50' : 'text-dim/40'}`}>{cnt}</span>
            </button>
          )
        })}
      </div>

      {/* Programlar */}
      {visible.length > 0 && (
        <section className="px-4 md:px-10 pb-20">
          {visible.map((w) => (
            <WorkshopRow key={w.id} workshop={w} />
          ))}
        </section>
      )}
    </>
  )
}
