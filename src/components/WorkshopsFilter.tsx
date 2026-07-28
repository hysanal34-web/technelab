'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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

const VALID = new Set<string>(CATS.map(c => c.key))

function FilterInner() {
  const params = useSearchParams()
  const fromUrl = params.get('kategori')
  const initial: Cat = fromUrl && VALID.has(fromUrl) ? (fromUrl as Cat) : 'tümü'

  const [cat, setCat] = useState<Cat>(initial)

  // Kullanıcı zaten /atolyeler'deyken mega menüden kategori seçerse
  // component unmount olmaz — URL değişimini dinle.
  useEffect(() => { setCat(initial) }, [initial])

  const all     = WORKSHOPS.filter(w => w.active)
  const visible = cat === 'tümü' ? all : all.filter(w => w.category === cat)

  return (
    <>
      {/* Kategori filtresi */}
      <div
        className="flex items-stretch border-b border-border overflow-x-auto scrollbar-none"
        role="tablist"
        aria-label="Program kategorileri"
      >
        {CATS.map(({ key, tr }) => {
          const cnt = key === 'tümü'
            ? all.length
            : all.filter(w => w.category === key).length
          const selected = cat === key
          return (
            <button
              key={key}
              onClick={() => setCat(key)}
              role="tab"
              aria-selected={selected}
              className={`font-mono text-[11px] tracking-[0.18em] uppercase px-5 md:px-6 py-4 border-r border-border transition-all duration-150 whitespace-nowrap ${
                selected
                  ? 'text-neon bg-neon/5 border-b-[2px] border-b-neon -mb-px'
                  : 'text-stone hover:text-fg'
              }`}
              data-hover
            >
              {tr}
              <span className={`ml-2 text-[11px] ${selected ? 'text-neon/70' : 'text-dim'}`}>{cnt}</span>
            </button>
          )
        })}
      </div>

      {/* Programlar */}
      {visible.length > 0 ? (
        <section className="px-4 md:px-10 pb-20">
          {visible.map((w) => (
            <WorkshopRow key={w.id} workshop={w} />
          ))}
        </section>
      ) : (
        <section className="px-4 md:px-10 py-24 text-center">
          <p className="font-display text-fg mb-4" style={{ fontSize: 'clamp(24px,3vw,38px)', letterSpacing: '0.02em' }}>
            BU KATEGORİDE ŞU AN AÇIK PROGRAM YOK
          </p>
          <p className="font-mono text-[14px] text-stone mb-8 max-w-xl mx-auto leading-relaxed">
            Yeni dönem açıldığında burada olacak. Haberdar olmak istersen bize yazabilirsin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setCat('tümü')}
              className="font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
              data-hover
            >
              tüm programlar →
            </button>
            <Link
              href="/iletisim"
              className="font-mono text-[12px] tracking-[0.16em] uppercase text-fg border border-fg/25 px-6 py-3.5 hover:border-neon hover:text-neon transition-colors duration-200"
              data-hover
            >
              haber ver →
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export function WorkshopsFilter() {
  return (
    <Suspense fallback={<div className="border-b border-border" style={{ height: 53 }} />}>
      <FilterInner />
    </Suspense>
  )
}
