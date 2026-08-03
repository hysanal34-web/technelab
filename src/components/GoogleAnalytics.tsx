'use client'

import Script from 'next/script'

/**
 * Google Analytics 4
 *
 * Measurement ID ortam değişkeninden okunur:
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *
 * Vercel'de: Project Settings → Environment Variables
 * Yerelde:   .env.local dosyası
 *
 * ID tanımlı değilse hiçbir script yüklenmez.
 * Not: Vercel Analytics'ten (@vercel/analytics) bağımsızdır, ikisi birlikte çalışır.
 */
export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  )
}
