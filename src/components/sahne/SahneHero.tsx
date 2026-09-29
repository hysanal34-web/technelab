'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { T } from '@/components/LangText'
import { SahneFallback } from './SahneFallback'
import type { SahneProgram } from './sahneVeri'

/**
 * Ana sayfa hero'su: sahne.
 *
 * Katmanlar (alttan üste): durağan SVG sahne (her zaman var; anında boyanır) →
 * 3D sahne (yalnızca masaüstü, WebGL var, "hareketi azalt" kapalı; boşta
 * yüklenir ve hazır olunca üstüne süzülür) → HTML arayüz (başlık, numaralı
 * program listesi, odak kartı). Liste ile sahne aynı seçimi paylaşır.
 *
 * Kaydırma engellenmez: canvas tekerleği dinlemez. Sürükleme sahneyi döndürür.
 */
const Sahne3D = dynamic(() => import('./Sahne3D'), { ssr: false, loading: () => null })

function uc3dUygunMu(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px), (pointer: coarse)').matches) return false
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
  if (nav.connection?.saveData) return false
  if ((nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4) return false
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

export function SahneHero({ programs }: { programs: SahneProgram[] }) {
  const [use3d, setUse3d] = useState(false)
  const [ready, setReady] = useState(false)
  const [hover, setHover] = useState(-1)      // listeden
  const [stageHover, setStageHover] = useState(-1) // sahneden
  const [focused, setFocused] = useState(-1)

  useEffect(() => {
    if (!uc3dUygunMu()) return
    // İlk boyayı ve metni bekle; 3D boşta gelsin.
    const hasIdle = 'requestIdleCallback' in window
    const id = hasIdle
      ? window.requestIdleCallback(() => setUse3d(true), { timeout: 1200 })
      : window.setTimeout(() => setUse3d(true), 400)
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
    <section className="surface-dark relative overflow-hidden pt-[64px]" style={{ minHeight: 'max(560px, 100svh)' }} aria-label="Sahne">
      {/* 0 · durağan sahne */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <SahneFallback programs={programs} />
      </div>
      {/* 1 · 3D sahne */}
      {use3d && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <Sahne3D programs={programs} hover={hover} focused={focused} onHover={onStageHover} onSelect={onSelect} onUnfocus={onUnfocus} onReady={onReady} />
        </div>
      )}
      {/* film greni */}
      <div className="sahne-gren pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* 2 · başlık — gerçek HTML, LCP burada */}
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-12 md:pb-12 transition-all duration-500 ${focused >= 0 ? 'translate-y-3 opacity-0' : ''}`}>
        <p className="font-code text-[11px] tracking-[0.22em] uppercase text-neon mb-3">
          <T tr="2026–27 sezonu · kayıtlar açık · Pera & Kadıköy" en="2026–27 season · enrolment open · Pera & Kadıköy" />
        </p>
        <h1 className="font-display text-fg leading-[0.92] tracking-[0.005em] inline-block" style={{ fontSize: 'clamp(46px, 7.2vw, 112px)' }}>
          <span className="sr-only">
            <T tr="Techne Lab İstanbul: bağımsız tiyatro laboratuvarı; oyunculuk, İngilizce drama, müzikal, dans ve yazarlık atölyeleri. " en="Techne Lab Istanbul: an independent theatre laboratory; acting, English drama, musical theatre, dance and playwriting workshops. " />
          </span>
          <span className="block">TECHNE LAB</span>
          <span className="block text-right text-neon mt-[0.06em]"><T tr="İSTANBUL." en="ISTANBUL." /></span>
        </h1>
        <p className="font-body text-[16px] md:text-[18px] leading-[1.4] text-fg/85 max-w-[460px] mt-4">
          <T
            tr="İstanbul'da bağımsız bir tiyatro laboratuvarı. Sahnedeki her blok bir program: birini seç, sahneye yaklaş."
            en="An independent theatre laboratory in Istanbul. Every block on stage is a programme: pick one, step closer."
          />
        </p>
      </div>

      {/* 3 · program listesi (masaüstü) */}
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
                  <span className={`font-display text-[17px] tracking-[0.01em] leading-none transition-colors duration-200 ${on ? 'text-fg' : 'text-fg/70'}`}>{p.title.toLocaleUpperCase('tr-TR')}</span>
                  <span className={`font-code text-[12px] text-neon transition-all duration-200 ${on ? 'opacity-100' : '-translate-x-1.5 opacity-0'}`} aria-hidden="true">→</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 4 · odak kartı */}
      <div
        className={`absolute z-20 border-t-2 border-neon bg-bg/85 p-6 backdrop-blur-md transition-all duration-500 left-4 right-4 bottom-4 md:left-auto md:right-10 md:bottom-10 md:w-[390px] ${sec ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
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
            <h2 className="font-display text-fg leading-[0.92] text-[34px] md:text-[40px]">{sec.title.toLocaleUpperCase('tr-TR')}</h2>
            <p className="font-code text-[11px] tracking-[0.18em] uppercase text-fg/60 mt-2">{sec.sub}</p>
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
          <T tr="Sürükle · dön / Bloğa tıkla · yaklaş" en="Drag · orbit / Click a block · step closer" />
        </p>
      )}
    </section>
  )
}
