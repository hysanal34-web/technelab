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

/**
 * `eventId`: aynı olay hem buradan (tarayıcı) hem sunucudan (CAPI) gidiyor.
 * Meta ikisini ancak AYNI event_id ile gelirse tekilleştirir; id verilmezse
 * tek form doldurma iki lead olarak sayılır. 8 Eylül'e kadar durum buydu.
 */
function track(event: string, params?: EventParams, eventId?: string) {
  if (typeof window === 'undefined' || !window.fbq) return
  if (eventId) window.fbq('track', event, params, { eventID: eventId })
  else window.fbq('track', event, params)
}

/** Tarayıcıda üretilip forma eklenen olay kimliği — CAPI'ye de aynısı gider. */
export function newBrowserEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
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

/**
 * Google Ads dönüşümü — doğrudan reklam etiketine.
 *
 * NEDEN GA4 İÇE AKTARMA DEĞİL: içe aktarılan dönüşümler saatler sonra
 * geliyor ve modellenmiş oluyor. Doğrudan etiket anında ulaşıyor.
 * Kısa kampanya pencerelerinde (erken kayıt gibi) bu fark önemli.
 *
 * Kimlik ve etiket ortam değişkeninden okunur:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
 *   NEXT_PUBLIC_ADS_LABEL_BASVURU=xxxxxxxxxxxxxxxx
 * İkisinden biri tanımsızsa sessizce atlanır — hata fırlatmaz.
 */
function trackAdsConversion(label: string | undefined, value?: number) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  if (!adsId || !label) return
  gtagEvent('conversion', {
    send_to: `${adsId}/${label}`,
    // 0 da geçerli bir sayı olduğu için `??` yetmiyordu: değeri 0 gönderilen
    // dönüşüm, değer bazlı teklif veren algoritma için hiç yok sayılıyor.
    value: value && value > 0 ? value : 1.0,
    currency: 'TRY',
  })
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
 * `value` parametresi kritik: Meta 140.000₺'lik başvuruyla 18.000₺'liği
 * ayırt eder ve bütçeyi değerli olana kaydırır.
 */
export function trackLead(name: string, price: number, slug: string, eventId?: string) {
  // GA4 tarafı — raporlama ve kitle oluşturma.
  gtagEvent('generate_lead', {
    currency: 'TRY', value: price,
    items: [{ item_id: slug, item_name: name, item_category: 'program' }],
  })

  // Google Ads tarafı — teklif optimizasyonunu besleyen BİRİNCİL dönüşüm.
  // GA4'ten içe aktarma yerine doğrudan etiket: daha hızlı ve daha doğru.
  // `value` program bedeli olarak gidiyor; Google 140.000₺'lik başvuruyla
  // 18.000₺'liği ayırt edip bütçeyi değerli olana kaydırabiliyor.
  trackAdsConversion(process.env.NEXT_PUBLIC_ADS_LABEL_BASVURU, price)
  track('Lead', {
    content_name: name,
    content_ids: slug,
    value: price,
    currency: 'TRY',
  }, eventId)
}

/**
 * Tanışma günü kaydı — şu an reklamlarda satılan asıl teklif.
 *
 * Başvurudan AYRI bir dönüşüm işlemi olarak gidiyor (NEXT_PUBLIC_ADS_LABEL_TANISMA).
 * Sebebi: ücretsiz tanışma kaydı ile ücretli program başvurusu aynı etikete
 * yazıldığında ne raporlanabiliyor ne de ayrı optimize edilebiliyor.
 * Etiket tanımlı değilse başvuru etiketine düşer — ölçüm hiç kaybolmasın.
 *
 * `value`: programın bedeli değil, tanışma kaydının **tahmini** değeri
 * (bedelin %10'u; bkz. TanismaForm). Gerçekleşen ciro değil — amaç
 * programlar arası ORANI korumak. Youth kaydı (11.000) ile Broadway kaydı
 * (1.650) arasındaki farkı gören algoritma bütçeyi kendiliğinden değerli
 * olana kaydırıyor. 7 Eylül'e kadar bu değer 0 gönderiliyordu, yani
 * Google ve Meta tüm kayıtları eşit değersiz görüyordu.
 */
export function trackTanismaLead(programName: string, value: number, slug: string, eventId?: string) {
  gtagEvent('generate_lead', {
    currency: 'TRY', value,
    lead_type: 'tanisma_gunu',
    items: [{ item_id: slug, item_name: programName, item_category: 'tanisma_gunu' }],
  })
  trackAdsConversion(
    process.env.NEXT_PUBLIC_ADS_LABEL_TANISMA ?? process.env.NEXT_PUBLIC_ADS_LABEL_BASVURU,
    value,
  )
  track('Lead', {
    content_name: programName,
    content_ids: slug,
    content_category: 'tanisma_gunu',
    value,
    currency: 'TRY',
  }, eventId)
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
      params?: EventParams,
      /** 4. argüman: { eventID } — CAPI ile tekilleştirme için. */
      options?: { eventID?: string }
    ) => void
  }
}
