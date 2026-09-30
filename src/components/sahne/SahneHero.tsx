'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { T } from '@/components/LangText'
import { SahneFallback } from './SahneFallback'
import type { SahneProgram } from './sahneVeri'

/**
 * Ana sayfa hero'su: sahne (ghost light).
 *
 * Geniş ekran: tam ekran sahne; marka sol üstte, program listesi sağda, zemin
 * bantlara kalır. Katmanlar: durağan SVG (anında) → 3D (boşta yüklenir, hazır
 * olunca üstüne süzülür) → HTML arayüz.
 *
 * Telefon: akış düzeni. Sahne kutusu (dikey kırpım) → marka → program listesi
 * (satırlar doğrudan program sayfasına gider). 3D yok, odak kartı yok.
 *
 * Kaydırma engellenmez: canvas tekerleği dinlemez.
 */
const Sahne3D = dynamic(() => import('./Sahne3D'), { ssr: false, loading: () => null })

/** 3D neden açılmıyor? Boş dize = açılabilir. Sebep konsola yazılır (destek için). */
function uc3dEngel(): string {
  if (typeof window === 'undefined') return 'ssr'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'hareketi-azalt'
  if (window.matchMedia('(max-width: 767px)').matches) return 'dar-ekran'
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return 'dokunmatik'
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return 'veri-tasarrufu'
  if ((nav.hardwareConcurrency ?? 8) < 4) return 'zayif-islemci'
  try {
    const c = document.createElement('canvas')
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return 'webgl-yok'
  } catch { return 'webgl-yok' }
  return ''
}

export function SahneHero({ programs }: { programs: SahneProgram[] }) {
  const [use3d, setUse3d] = useState(false)
  const [ready, setReady] = useState(false)
  const [hover, setHover] = useState(-1)      // listeden
  const [stageHover, setStageHover] = useState(-1) // sahneden
  const [focused, setFocused] = useState(-1)

  useEffect(() => {
    const engel = uc3dEngel()
    ;(window as Window & { __sahne?: string }).__sahne = engel || '3d'
    if (engel) { console.info('[sahne] 3D kapalı:', engel); return }
    const hasIdle = 'requestIdleCallback' in window
    const id = hasIdle
      ? window.requestIdleCallback(() => setUse3d(true), { timeout: 300 })
      : window.setTimeout(() => setUse3d(true), 150)
    return () => { if (hasIdle) window.cancelIdleCallback(id); else window.clearTimeout(id) }
  }, [])

  useEffect(() => {
    if (focused < 0) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocused(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focused])

  const onStageHover = useCallback((i: number) => setStageHover(i), [])
  const onSelect = useCallback((i: number) => setFocused(i), [])
  const onUnfocus = useCallback(() => setFocused(-1), [])
  const onReady = useCallback(() => setReady(true), [])

  const act = focused >= 0 ? focused : stageHover >= 0 ? stageHover : hover
  const sec = focused >= 0 ? programs[focused] : null
  const total = String(programs.length).padStart(2, '0')

  return (
    <section className="sahne-hero surface-dark relative overflow-hidden pt-[64px]" aria-label="Sahne">
      {/* 0 · durağan sahne — telefonda akışta bir kutu, geniş ekranda arka plan */}
      <div className={`relative h-[46svh] min-h-[280px] md:absolute md:inset-x-0 md:top-[64px] md:bottom-[14%] md:right-[320px] md:h-auto md:min-h-0 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <SahneFallback />
      </div>
      {/* 1 · 3D sahne (yalnızca geniş ekran) */}
      {use3d && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <Sahne3D programs={programs} hover={hover} focused={focused} onHover={onStageHover} onSelect={onSelect} onUnfocus={onUnfocus} onReady={onReady} />
        </div>
      )}
      {/* film greni */}
      <div className="sahne-gren pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* 2 · marka — gerçek HTML, LCP burada. Telefonda akışta, geniş ekranda sol üstte. */}
      <div className={`pointer-events-none relative z-10 px-6 pt-6 md:absolute md:left-12 md:top-[110px] md:max-w-[560px] md:px-0 md:pt-0 transition-all duration-500 ${focused >= 0 ? 'md:-translate-y-3 md:opacity-0' : ''}`}>
        <p className="font-code text-[11px] tracking-[0.22em] uppercase text-neon mb-3">
          <T tr="2026–27 sezonu · kayıtlar açık · Pera & Kadıköy" en="2026–27 season · enrolment open · Pera & Kadıköy" />
        </p>
        <h1 className="font-display text-fg leading-[0.92] tracking-[0.005em] inline-block" style={{ fontSize: 'clamp(44px, 5.8vw, 92px)' }}>
          <span className="sr-only">
            <T tr="Techne Lab İstanbul: bağımsız tiyatro laboratuvarı; oyunculuk, İngilizce drama, müzikal, dans ve yazarlık atölyeleri. " en="Techne Lab Istanbul: an independent theatre laboratory; acting, English drama, musical theatre, dance and playwriting workshops. " />
          </span>
          <span className="block">TECHNE LAB</span>
          <span className="block text-right text-neon mt-[0.06em]">ISTANBUL.</span>
        </h1>
        <p className="font-body text-[16px] md:text-[17px] leading-[1.4] text-fg/85 max-w-[460px] mt-4">
          <T
            tr="İstanbul'da bağımsız bir tiyatro laboratuvarı. Sahne boşken bile bir ışık yanar. Programlar ışığın içinde: birini seç, sahneye çık."
            en="An independent theatre laboratory in Istanbul. Even on an empty stage, one light stays on. The programmes are in its glow: pick one, step on stage."
          />
        </p>
      </div>

      {/* 3a · program listesi (telefon): akışta, satır doğrudan program sayfasına */}
      <nav className="relative z-10 px-6 pt-8 pb-8 md:hidden" aria-label="Programlar">
        <div className="flex justify-between border-b border-fg/20 pb-2.5 font-code text-[11px] tracking-[0.2em] uppercase text-fg/60">
          <span><T tr="Programlar" en="Programmes" /></span><span>{total}</span>
        </div>
        <ul>
          {programs.map((p, i) => (
            <li key={p.slug} className="border-b border-fg/15">
              <Link href={`/atolyeler/${p.slug}`} className="grid grid-cols-[34px_1fr_auto] items-center gap-2 py-3.5" data-hover>
                <span className="font-code text-[10px] tracking-[0.18em] text-neon">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span lang="en" className="block font-display text-[18px] tracking-[0.01em] leading-none text-fg">{p.title.toUpperCase()}</span>
                  <span className="block font-code text-[10px] tracking-[0.14em] uppercase text-fg/55 mt-1.5">{p.facts.slice(0, 3).join(' · ')}</span>
                </span>
                <span className="font-code text-[12px] text-neon" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3b · program listesi (geniş ekran): sağda, sahneyle aynı seçimi paylaşır */}
      <nav
        className={`hidden md:block absolute right-10 top-1/2 z-10 w-[280px] -translate-y-[46%] transition-all duration-500 ${focused >= 0 ? 'pointer-events-none translate-x-5 opacity-0' : ''}`}
        aria-label="Programlar"
        style={{ textShadow: '0 2px 14px rgba(0,0,0,.9)' }}
      >
        <div className="flex justify-between border-b border-fg/20 pb-2.5 font-code text-[11px] tracking-[0.2em] uppercase text-fg/60">
          <span><T tr="Programlar" en="Programmes" /></span><span>{total}</span>
        </div>
        <ul>
          {programs.map((p, i) => {
            const on = act === i
            return (
              <li key={p.slug} className="border-b border-fg/15">
                <button
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(-1)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(-1)}
                  onClick={() => setFocused(i)}
                  className={`grid w-full grid-cols-[34px_1fr_auto] items-center gap-2 py-3 text-left transition-all duration-200 ${on ? 'pl-2' : ''}`}
                  data-hover
                >
                  <span className={`font-code text-[10px] tracking-[0.18em] ${on ? 'text-neon' : 'text-fg/50'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span lang="en" className={`font-display text-[17px] tracking-[0.01em] leading-none transition-colors duration-200 ${on ? 'text-fg' : 'text-fg/70'}`}>{p.title.toUpperCase()}</span>
                  <span className={`font-code text-[12px] text-neon transition-all duration-200 ${on ? 'opacity-100' : '-translate-x-1.5 opacity-0'}`} aria-hidden="true">→</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 4 · odak kartı (geniş ekran) */}
      <div
        className={`hidden md:block absolute z-20 border-t-2 border-neon bg-bg/85 p-6 backdrop-blur-md transition-all duration-500 right-10 bottom-10 w-[390px] ${sec ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
        role="dialog"
        aria-live="polite"
        aria-hidden={!sec}
      >
        {sec && (
          <>
            <button type="button" onClick={() => setFocused(-1)} className="absolute right-4 top-3 font-code text-[11px] tracking-[0.18em] uppercase text-fg/60 hover:text-fg" data-hover>
              <T tr="Kapat ✕" en="Close ✕" />
            </button>
            <p className="font-code text-[11px] tracking-[0.2em] uppercase text-neon mb-2">{String(focused + 1).padStart(2, '0')} / {total}</p>
            <h2 lang="en" className="font-display text-fg leading-[0.92] text-[34px] md:text-[40px]">{sec.title.toUpperCase()}</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Program bilgileri">
              {sec.facts.map((f) => (
                <li key={f} className="border border-neon/50 px-2 py-1 font-code text-[11px] tracking-[0.1em] uppercase text-neon">{f}</li>
              ))}
            </ul>
            <p className="font-body text-[15px] leading-[1.5] text-fg/90 mt-3">{sec.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {sec.tanisma ? (
                <Link href={`/tanisma-gunu?program=${sec.slug}`} className="bg-neon px-4 py-3 font-code text-[11px] tracking-[0.16em] uppercase text-ink hover:bg-fg transition-colors" data-hover>
                  <T tr="Ücretsiz tanışmaya kaydol" en="Book a free taster" />
                </Link>
              ) : (
                <Link href={`/atolyeler/${sec.slug}/kayit`} className="bg-neon px-4 py-3 font-code text-[11px] tracking-[0.16em] uppercase text-ink hover:bg-fg transition-colors" data-hover>
                  <T tr="Başvur" en="Apply" />
                </Link>
              )}
              <Link href={`/atolyeler/${sec.slug}`} className="border border-fg/30 px-4 py-3 font-code text-[11px] tracking-[0.16em] uppercase text-fg hover:border-neon hover:text-neon transition-colors" data-hover>
                <T tr="Programı incele" en="View programme" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* 5 · ipucu (yalnızca 3D açıkken) */}
      {use3d && (
        <p className={`pointer-events-none absolute bottom-4 left-1/2 z-10 hidden md:block -translate-x-1/2 font-code text-[10px] tracking-[0.2em] uppercase text-fg/35 transition-opacity duration-500 ${focused >= 0 || !ready ? 'opacity-0' : ''}`}>
          <T tr="Zemindeki işarete tıkla · sahneye çık" en="Click a mark on the floor · step on stage" />
        </p>
      )}
    </section>
  )
}
