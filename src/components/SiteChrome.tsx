'use client'

import { usePathname } from 'next/navigation'

/**
 * Site kabuğunu (menü, footer, bot, WhatsApp düğmesi, ölçüm etiketleri)
 * yalnız halka açık sayfalarda gösterir.
 *
 * NEDEN GEREKLİ: /admin kendi başlığını ve menüsünü çiziyor. Kök layout
 * herkesi sardığı için panel sayfalarında iki menü üst üste biniyordu.
 *
 * ÖLÇÜM DE BURADA: piksel ve GA etiketleri de bu sargının içinde. Panelde
 * gezinmek kendi reklam verini kirletiyordu — her yönetim ziyareti PageView
 * olarak sayılıyor, dönüşüm oranını aşağı çekiyordu.
 *
 * `usePathname` sunucu render'ında da çalışıyor, yani kabuk HTML'e hiç
 * basılmıyor; tarayıcıda "önce görünüp sonra kaybolma" olmuyor.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
