'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/**
 * TiyatroBot'u ilk boyamadan sonra yükler.
 *
 * NEDEN: bot 60 KB'lık bir istemci bileşeni ve her sayfada layout'tan
 * yükleniyordu. Mobil PageSpeed (2 Ekim 2026) ana iş parçacığında uzun
 * görevler ve "kullanılmayan JavaScript" uyarısı veriyordu; ziyaretçinin
 * büyük çoğunluğu botu hiç açmıyor. Tarayıcı boşa çıkınca (ya da en geç
 * 3 sn sonra) yükleniyor; buton birkaç saniye geç görünür, içerik etkilenmez.
 */
const TiyatroBot = dynamic(() => import('./TiyatroBot').then((m) => m.TiyatroBot), { ssr: false })

export function TiyatroBotLazy() {
  const [hazir, setHazir] = useState(false)

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setHazir(true), { timeout: 3000 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setHazir(true), 2000)
    return () => window.clearTimeout(t)
  }, [])

  return hazir ? <TiyatroBot /> : null
}
