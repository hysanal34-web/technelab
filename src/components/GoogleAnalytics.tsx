'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { izinOku, izinDinle } from '@/lib/izinIstemci'
import { IZIN_CEREZI, IZIN_SURUMU } from '@/lib/izin'

/**
 * Google Analytics 4 + Google Ads etiketi (gtag), Consent Mode v2 ile.
 *
 * Kimlikler ortam değişkeninden:
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
 *
 * İZİN (15 Ekim 2026)
 * İki mod var, NEXT_PUBLIC_GOOGLE_IZIN_MODU ile seçilir:
 *
 *   temel (varsayılan) → Ziyaretçi analitik ya da pazarlama iznini verene
 *     kadar Google etiketi HİÇ yüklenmez. KVKK açısından en temkinli seçenek.
 *     Bedeli: izin vermeyenlerin ziyareti GA4'te görünmez (Vercel Analytics
 *     çerezsiz olduğu için sayımı sürdürür).
 *
 *   gelismis → Etiket her zaman yüklenir ama izin yokken Consent Mode
 *     "denied" ile çalışır: çerez yazmaz, Google çerezsiz sinyallerle
 *     modelleme yapar. Ölçüm kaybı daha az; hukuki değerlendirmesi
 *     avukatınıza bırakılmalı.
 *
 * Her iki modda da izin kategorileri Google'a şöyle eşleniyor:
 *   analitik  → analytics_storage
 *   pazarlama → ad_storage, ad_user_data, ad_personalization
 */
export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  const MOD = process.env.NEXT_PUBLIC_GOOGLE_IZIN_MODU === 'gelismis' ? 'gelismis' : 'temel'
  const loaderId = GA_ID || ADS_ID

  const [yukle, setYukle] = useState(MOD === 'gelismis')

  useEffect(() => {
    const iz = izinOku()
    if (iz && (iz.analitik || iz.pazarlama)) setYukle(true)
    return izinDinle((yeni) => {
      if (yeni.analitik || yeni.pazarlama) setYukle(true)
      // Etiket zaten yüklüyse izni anında güncelle (geri alma dahil).
      window.gtag?.('consent', 'update', {
        analytics_storage: yeni.analitik ? 'granted' : 'denied',
        ad_storage: yeni.pazarlama ? 'granted' : 'denied',
        ad_user_data: yeni.pazarlama ? 'granted' : 'denied',
        ad_personalization: yeni.pazarlama ? 'granted' : 'denied',
      })
    })
  }, [])

  if (!loaderId || !yukle) return null

  // Varsayılan izin durumu, etiket yapılandırılmadan ÖNCE ve çerezden okunarak
  // kuruluyor: önce "denied" deyip sonra güncellemek ilk sayfa görüntülemesini
  // izinsiz saydırıyordu.
  const izinScript = `
    (function(){
      var m = document.cookie.match(/(?:^|; )${IZIN_CEREZI}=([^;]*)/);
      var v = m ? decodeURIComponent(m[1]) : '';
      var r = /^v${IZIN_SURUMU}\\.a([01])\\.p([01])\\./.exec(v);
      var a = r && r[1] === '1', p = r && r[2] === '1';
      gtag('consent', 'default', {
        analytics_storage: a ? 'granted' : 'denied',
        ad_storage: p ? 'granted' : 'denied',
        ad_user_data: p ? 'granted' : 'denied',
        ad_personalization: p ? 'granted' : 'denied',
        wait_for_update: 500
      });
    })();
  `

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
          window.gtag = gtag;
          ${izinScript}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ''}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
        `}
      </Script>
    </>
  )
}
