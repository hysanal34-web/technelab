'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Meta (Facebook/Instagram) Pixel
 *
 * Pixel ID ortam değişkeninden okunur:
 *   NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
 *
 * Vercel'de: Project Settings → Environment Variables
 * ID tanımlı değilse hiçbir script yüklenmez — yani bu component
 * ID gelene kadar siteye sıfır maliyet getirir.
 *
 * NEDEN GEREKLİ:
 * Pixel olmadan Meta, reklamla gelen kişinin başvurup başvurmadığını göremez.
 * Bu da şu üçünü imkânsız kılar:
 *   1. Hangi kitlenin gerçekten başvuru getirdiğini ölçmek
 *   2. Başvuranlara benzeyen kitle (Lookalike) kurmak
 *   3. Program sayfasını gezip başvurmayanları yeniden hedeflemek
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function MetaPixel() {
  const pathname = usePathname()
  const firstLoad = useRef(true)

  // Sayfa geçişlerinde PageView — Next.js client-side routing kullanıyor,
  // base script yalnızca ilk yüklemede çalışır.
  useEffect(() => {
    if (!PIXEL_ID) return
    if (firstLoad.current) {
      firstLoad.current = false
      return // ilk PageView'ı base script atıyor
    }
    window.fbq?.('track', 'PageView')
  }, [pathname])

  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}

/* ── Olay yardımcıları ──────────────────────────────────────────────
   Bunları component'lardan çağır. Pixel yoksa sessizce hiçbir şey yapmaz.
─────────────────────────────────────────────────────────────────── */

type EventParams = Record<string, string | number | undefined>

function track(event: string, params?: EventParams) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', event, params)
}

/**
 * Google Analytics 4 olayı.
 *
 * NEDEN BURADA: Google Ads dönüşümleri doğrudan reklam etiketinden değil,
 * GA4 olaylarının içe aktarılmasıyla kurulmalı — böylece tek bir olay hem
 * raporlamayı hem reklam optimizasyonunu besliyor, iki ayrı etiket
 * bakımı gerekmiyor.
 *
 * Google Ads tarafında: Araçlar → Dönüşümler → İçe aktar → GA4.
 * Aşağıdaki olay adları orada göreceğin adlar.
 */
function gtagEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}

/** Program sayfası görüntülendi — ilgi sinyali, yeniden pazarlama havuzu. */
export function trackViewContent(name: string, price: number, slug: string) {
  gtagEvent('view_item', {
    currency: 'TRY', value: price,
    items: [{ item_id: slug, item_name: name, item_category: 'program' }],
  })
  track('ViewContent', {
    content_name: name,
    content_ids: slug,
    content_type: 'product',
    value: price,
    currency: 'TRY',
  })
}

/** Başvuru formu açıldı — niyet sinyali, Lead'den önceki adım. */
export function trackInitiateCheckout(name: string, price: number, slug: string) {
  gtagEvent('begin_checkout', {
    currency: 'TRY', value: price,
    items: [{ item_id: slug, item_name: name, item_category: 'program' }],
  })
  track('InitiateCheckout', {
    content_name: name,
    content_ids: slug,
    value: price,
    currency: 'TRY',
  })
}

/**
 * Başvuru gönderildi — ANA HEDEF.
 * `value` parametresi kritik: Meta 165.000₺'lik başvuruyla 18.000₺'liği
 * ayırt eder ve bütçeyi değerli olana kaydırır.
 */
export function trackLead(name: string, price: number, slug: string) {
  // Google Ads'e içe aktarılacak ANA dönüşüm olayı.
  gtagEvent('generate_lead', {
    currency: 'TRY', value: price,
    items: [{ item_id: slug, item_name: name, item_category: 'program' }],
  })
  track('Lead', {
    content_name: name,
    content_ids: slug,
    value: price,
    currency: 'TRY',
  })
}

/** Bülten aboneliği — düşük eşikli dönüşüm, Lookalike kitle için değerli. */
export function trackSubscribe() {
  gtagEvent('sign_up', { method: 'newsletter' })
  track('Subscribe')
}

declare global {
  interface Window {
    gtag?: (command: string, eventOrId: string, params?: Record<string, unknown>) => void
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      eventOrId: string,
      params?: EventParams
    ) => void
  }
}
