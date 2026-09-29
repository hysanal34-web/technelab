'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Sayfa geçişi — "ışıklar kararıyor".
 *
 * Site içi bir linke tıklanınca 220 ms siyaha inilir, ince neon çizgi soldan
 * sağa süpürür, rota değişince ışıklar açılır. Yeni sayfa yüklenmesini
 * beklemez: geçiş süresi sabittir, içerik hazır olunca açılır.
 *
 * Kapsam dışı: yeni sekme, indirme, modifier tuşlu tıklama, aynı sayfa içi
 * çapa (#), harici adres, tarayıcı geri/ileri (o durumda yalnızca açılış
 * yapılır). "Hareketi azalt" açıksa hiç devreye girmez.
 */
export function PerdeGecisi() {
  const pathname = usePathname()
  const router = useRouter()
  const [on, setOn] = useState(false)
  const timer = useRef<number | null>(null)

  // Rota değişti: ışıklar açılır.
  useEffect(() => {
    if (timer.current) { window.clearTimeout(timer.current); timer.current = null }
    setOn(false)
  }, [pathname])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.gecisYok !== undefined) return
      let url: URL
      try { url = new URL(a.href, location.href) } catch { return }
      if (url.origin !== location.origin) return
      const hedef = url.pathname + url.search + url.hash
      const simdi = location.pathname + location.search
      if (url.pathname === location.pathname && url.hash) return          // sayfa içi çapa
      if (url.pathname + url.search === simdi) return                         // aynı sayfa
      // Yakalama aşamasında durduruyoruz: Next Link hemen gitmesin, perde insin, sonra gidelim.
      e.preventDefault(); e.stopPropagation()
      setOn(true)
      timer.current = window.setTimeout(() => { router.push(hedef) }, 230)
      // Emniyet: rota 2,5 sn içinde değişmezse perdeyi kaldır (ör. aynı sayfaya yönlendirme).
      window.setTimeout(() => setOn(false), 2500)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  return <div className={`perde-gecis${on ? ' on' : ''}`} aria-hidden="true" />
}
