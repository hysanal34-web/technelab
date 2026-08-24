'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SITE_META, type Workshop } from '@/lib/data'

/**
 * Program sayfasında mobil alt sabit bar.
 *
 * Masaüstünde sağdaki kayıt kutusu sticky, ama yalnızca ilk bölüm boyunca.
 * Müfredat, SSS ve alt bölümlerde — yani sayfanın çoğunda — kullanıcı
 * başvuru butonunu göremiyordu. Bu bar ilk ekranı geçtikten sonra
 * devreye giriyor ve fiyatla birlikte hep görünür kalıyor.
 */
export function StickyApplyBar({ w }: { w: Workshop }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!w.active) return null

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-[8500] md:hidden border-t-2 border-neon bg-bg/98 backdrop-blur-md transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <span className="font-display text-fg leading-none block truncate" style={{ fontSize: 15 }}>
            {w.title}
          </span>
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-stone">
            {typeof w.maxStudents === 'number' ? `kontenjan ${w.maxStudents} kişi` : w.duration}
          </span>
        </div>
        <div className="flex items-stretch gap-2 shrink-0">
          {/* Arama butonu — mobilde tek dokunuşla telefon.
              Form doldurmak isteyen "başvur"a, hemen konuşmak isteyen
              buraya gidiyor; iki niyet birbirini yemiyor. */}
          <a
            href={`tel:${SITE_META.phoneE164}`}
            data-call-cta={`program:${w.slug}`}
            aria-label={`${SITE_META.phone} numarasını ara`}
            className="flex items-center justify-center px-4 border border-neon text-neon hover:bg-neon hover:text-bg transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
          </a>
          <Link
            href={`/atolyeler/${w.slug}/kayit`}
            className="font-mono text-[12px] tracking-[0.14em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200 flex items-center"
          >
            başvur →
          </Link>
        </div>
      </div>
    </div>
  )
}
