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
  // Google Ads dönüşüm kimliği (AW-...). Tanımlıysa aynı gtag üzerinden
  // ikinci bir hedef olarak yapılandırılır — ayrı script yüklenmez.
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

  // gtag'i yükleyecek bir kimlik yoksa hiçbir şey basma.
  const loaderId = GA_ID || ADS_ID
  if (!loaderId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ''}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
        `}
      </Script>
    </>
  )
}
