'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GalleryImage } from '@/lib/data'

type Props = {
  images: GalleryImage[]
  preview?: number
  showFilter?: boolean // geriye dönük uyumluluk — yeni tasarımda filtre yok
}

/* Akış ritmi: kareler tekdüze olmasın diye dönen oran deseni.
   Monokrom taban + hover'da renk: farklı paletlerdeki kareler tek doku gibi akar. */
const RATIOS = ['4/5', '1/1', '3/4', '4/5', '16/13', '3/4', '1/1', '4/5']

export function Gallery({ images, preview = 0 }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const [idx, setIdx] = useState(0)

  const visible = preview > 0 ? images.slice(0, preview) : images

  const open = useCallback((img: GalleryImage, i: number) => {
    setSelected(img)
    setIdx(i)
  }, [])
  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => {
    const newIdx = (idx - 1 + visible.length) % visible.length
    setIdx(newIdx); setSelected(visible[newIdx])
  }, [idx, visible])
  const next = useCallback(() => {
    const newIdx = (idx + 1) % visible.length
    setIdx(newIdx); setSelected(visible[newIdx])
  }, [idx, visible])

  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [selected, prev, next, close])

  return (
    <>
      {/* ── Akışkan masonry — tek kesintisiz doku ─────────────── */}
      <div className="columns-2 md:columns-3 xl:columns-4 gap-2 px-2 md:px-4">
        {visible.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => open(img, i)}
            className="group relative block w-full mb-2 overflow-hidden break-inside-avoid focus:outline-none focus-visible:ring-1 focus-visible:ring-neon"
            style={{ aspectRatio: RATIOS[i % RATIOS.length] }}
            aria-label={img.alt}
            data-hover
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition-all duration-700 ease-out grayscale-[0.85] contrast-[1.06] brightness-[0.92] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
            />
            {/* Alt bilgi şeridi — hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-bg/90 backdrop-blur-sm px-3 py-2 flex items-baseline justify-between gap-2">
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-fg leading-tight line-clamp-1">
                {img.alt}
              </span>
              <span className="font-mono text-[10px] text-neon shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            {/* Neon köşe — hover */}
            <div className="absolute top-0 left-0 w-5 h-[2px] bg-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            <div className="absolute top-0 left-0 h-5 w-[2px] bg-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] bg-bg/98 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Fotoğraf görüntüleyici"
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" />
          <div className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.14em] text-stone z-20">
            {String(idx + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
          </div>
          <button
            onClick={close}
            className="absolute top-4 right-6 font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-neon transition-colors z-20"
            aria-label="Kapat"
            data-hover
          >
            kapat · esc
          </button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[86vh] mx-auto px-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.14em] text-stone text-center max-w-[80vw] truncate">
            {selected.alt}
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 font-mono text-[20px] text-stone hover:text-neon transition-colors p-4 z-20"
            aria-label="Önceki fotoğraf"
            data-hover
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 font-mono text-[20px] text-stone hover:text-neon transition-colors p-4 z-20"
            aria-label="Sonraki fotoğraf"
            data-hover
          >
            →
          </button>
        </div>
      )}
    </>
  )
}
