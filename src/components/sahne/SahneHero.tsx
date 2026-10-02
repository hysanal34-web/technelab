'use client'

import { useCallback, useEffect, useState } from 'react'
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
 * Telefon: aynı sahne, dikey kadraj. Ampul üstte, bantlar tek sütun; banda
 * dokununca kart alttan açılır. Marka sahnenin altında, liste hero'nun altında
 * (3D açılmayan cihazlar ve erişilebilirlik için satırlar program sayfasına gider).
 *
 * Kaydırma engellenmez: canvas tekerleği dinlemez.
 */
/**
 * Statik import: three.js sayfanın ilk JS paketine girer ve HTML'deki preload ile
 * hidrasyonla aynı anda iner. Önceden dynamic() ile ikinci bir ağ turu vardı; canlıda
 * ilk boyadan 3D'ye kadar ~1 sn karanlık kalıyordu, çoğu o chunk'ı beklemekti.
 * Sahne her açılışın kahramanı, paket ağırlığı buna değer. Sunucuda render edilmez
 * (use3d sunucuda false).
 */
import Sahne3D from './Sahne3D'

/** 3D neden açılmıyor? Boş dize = açılabilir. Sebep konsola yazılır (destek için). */
function uc3dEngel(): string {
  if (typeof window === 'undefined') return 'ssr'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'hareketi-azalt'
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return 'veri-tasarrufu'
  if ((nav.hardwareConcurrency ?? 8) < 2) return 'zayif-islemci'
  try {
    const c = document.createElement('canvas')
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return 'webgl-yok'
  } catch { return 'webgl-yok' }
  return ''
}

export function SahneHero({ programs }: { programs: SahneProgram[] }) {
  const [use3d, setUse3d] = useState(false)
  const [ready, setReady] = useState(false)
  /**
   * Durağan sahnedeki ampul yanık mı? 3D bekleniyorsa sönük kalır: 3D'nin ilk
   * karesi de karanlık, ışık 3D'nin içinde yanar; geçişte "başka bir kare"
   * görünmez. 3D açılmayacaksa (engel) ya da 6 sn içinde hazır olmazsa burada yanar.
   */
  const [fbLit, setFbLit] = useState(false)
  const [hover, setHover] = useState(-1)      // listeden
  const [stageHover, setStageHover] = useState(-1) // sahneden
  const [focused, setFocused] = useState(-1)

  useEffect(() => {
    const engel = uc3dEngel()
    ;(window as Window & { __sahne?: string }).__sahne = engel || '3d'
    if (engel) { console.info('[sahne] 3D kapalı:', engel); const t = window.setTimeout(() => setFbLit(true), 350); return () => window.clearTimeout(t) }
    // Sayfa önce otursun (hidrasyon, font, ilk boya). Üç adım:
    // 1) three.js chunk'ı ağdan gelsin (parse bu sırada değil, bileşen bağlanınca);
    // 2) tarayıcı boşa düşünce 3D bağlanır; kurulum Sahne3D içinde parça parça;
    // 3) hazır olunca SVG'den 3D'ye geçilir (onReady).
    // Kurulum Sahne3D içinde parça parça olduğu için beklemenin anlamı kalmadı:
    // bileşen ilk boş anda bağlanır. Karanlık süre ne kadar kısaysa "donmuş
    // kare" hissi o kadar az.
    const hasIdle = 'requestIdleCallback' in window
    const id = hasIdle
      ? window.requestIdleCallback(() => setUse3d(true), { timeout: 150 })
      : window.setTimeout(() => setUse3d(true), 150)
    return () => { if (hasIdle) window.cancelIdleCallback(id); else window.clearTimeout(id) }
  }, [])

  // 3D 6 sn içinde hazır olmadıysa (yavaş ağ, WebGL hatası) salon karanlık kalmasın.
  useEffect(() => {
    if (ready) return
    const t = window.setTimeout(() => setFbLit(true), 6000)
    return () => window.clearTimeout(t)
  }, [ready])

  useEffect(() => {
    if (focused < 0) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocused(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focused])

  const onStageHover = useCallback((i: number) => setStageHover(i), [])
  const onSelect = useCallback((i: number) => setFocused(i), [])
  const onUnfocus = useCallback(() => setFocused(-1), [])
  const onReady = useCallback(() => {
    ;(window as Window & { __sahneHazir?: number }).__sahneHazir = Math.round(performance.now()) // destek: sayfa açılışından kaç ms sonra 3D göründü
    setReady(true)
  }, [])

  const act = focused >= 0 ? focused : stageHover >= 0 ? stageHover : hover
  const sec = focused >= 0 ? programs[focused] : null
  const total = String(programs.length).padStart(2, '0')

  return (
    <>
    <section className="sahne-hero surface-dark relative overflow-hidden pt-[64px]" style={{ minHeight: 'max(560px, 100svh)' }} aria-label="Sahne">
      {/* 0 · durağan sahne: 3D gelene kadar (ya da hiç gelmezse) */}
      <div className={`absolute inset-x-0 top-[64px] bottom-[34%] md:bottom-[14%] md:right-[320px] transition-opacity duration-300 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <SahneFallback lit={fbLit} />
      </div>
      {/* 1 · 3D sahne: iki katman da karanlık, geçiş kısa ve görünmez */}
      {use3d && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <Sahne3D programs={programs} hover={hover} focused={focused} onHover={onStageHover} onSelect={onSelect} onUnfocus={onUnfocus} onReady={onReady} />
        </div>
      )}
      {/* film greni */}
      <div className="sahne-gren pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* 2 · marka — gerçek HTML, LCP burada. Telefonda altta (sahnenin üstüne gölgeyle biner), geniş ekranda sol üstte. */}
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-5 pt-12 bg-gradient-to-t from-bg via-bg/70 to-transparent md:inset-auto md:left-12 md:top-[110px] md:max-w-[560px] md:bg-none md:px-0 md:pb-0 md:pt-0 transition-all duration-500 ${focused >= 0 ? 'translate-y-3 opacity-0 md:-translate-y-3' : ''}`}>
        <p className="font-code text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-neon mb-2 md:mb-3">
          <span className="hidden md:inline"><T tr="2026–27 sezonu · kayıtlar açık · Pera & Kadıköy" en="2026–27 season · enrolment open · Pera & Kadıköy" /></span>
          <span className="md:hidden"><T tr="2026–27 · kayıtlar açık" en="2026–27 · enrolment open" /></span>
        </p>
        <h1 className="font-display text-fg leading-[0.92] tracking-[0.005em] inline-block" style={{ fontSize: 'clamp(34px, 5.8vw, 92px)' }}>
          <span className="sr-only">
            <T tr="Techne Lab İstanbul: bağımsız tiyatro laboratuvarı; oyunculuk, İngilizce drama, müzikal, dans ve yazarlık atölyeleri. " en="Techne Lab Istanbul: an independent theatre laboratory; acting, English drama, musical theatre, dance and playwriting workshops. " />
          </span>
          <span className="block">TECHNE LAB</span>
          <span className="block text-right text-neon mt-[0.06em]">ISTANBUL.</span>
        </h1>
        <p className="hidden md:block font-body text-[17px] leading-[1.4] text-fg/85 max-w-[460px] mt-4">
          <T
            tr="İstanbul'da bağımsız bir tiyatro laboratuvarı. Sahne boşken bile bir ışık yanar. Programlar ışığın içinde: birini seç, sahneye çık."
            en="An independent theatre laboratory in Istanbul. Even on an empty stage, one light stays on. The programmes are in its glow: pick one, step on stage."
          />
        </p>
        <p className="md:hidden font-body text-[13px] leading-[1.35] text-fg/80 mt-2">
          <T tr="Bağımsız tiyatro laboratuvarı. Programlar ışığın içinde: birini seç, sahneye çık." en="An independent theatre lab. The programmes are in the light: pick one, step on stage." />
        </p>
        {/* Her zaman yerinde (görünmez olsa da): 3D bağlanınca yer açılıp marka yukarı zıplamasın. */}
        <p className={`mt-2 font-code text-[10px] tracking-[0.2em] uppercase text-neon/60 md:hidden transition-opacity duration-500 ${ready ? '' : 'opacity-0'}`} aria-hidden={!ready}>
          <T tr="Zemindeki banda dokun · sahneye çık" en="Tap a mark on the floor · step on stage" />
        </p>
      </div>

      {/* 3 · program listesi (geniş ekran): sağda, sahneyle aynı seçimi paylaşır */}
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

      {/* 4 · odak kartı: telefonda alttan açılan tam genişlik kart, geniş ekranda sağ altta */}
      <div
        className={`absolute z-20 border-t-2 border-neon bg-bg/90 p-5 md:p-6 backdrop-blur-md transition-all duration-500 inset-x-0 bottom-0 md:inset-x-auto md:right-10 md:bottom-10 md:w-[390px] ${sec ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
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
            <h2 lang="en" className="font-display text-fg leading-[0.92] text-[30px] md:text-[40px]">{sec.title.toUpperCase()}</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Program bilgileri">
              {sec.facts.map((f) => (
                <li key={f} className="border border-neon/50 px-2 py-1 font-code text-[11px] tracking-[0.1em] uppercase text-neon">{f}</li>
              ))}
            </ul>
            <p className="font-body text-[14px] md:text-[15px] leading-[1.5] text-fg/90 mt-3">{sec.desc}</p>
            <div className="mt-4 md:mt-5 flex flex-wrap gap-2.5">
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

    {/* 6 · program listesi (telefon): hero'nun altında, satır doğrudan program sayfasına */}
    <nav className="surface-dark px-6 pt-6 pb-8 md:hidden" aria-label="Programlar">
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
    </>
  )
}
