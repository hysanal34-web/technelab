'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { pazarlamaIzniVar, izinDinle, cerezSil } from '@/lib/izinIstemci'

/**
 * Meta (Facebook/Instagram) Pixel
 *
 * Pixel ID ortam değişkeninden okunur:
 *   NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
 *
 * Vercel'de: Project Settings → Environment Variables
 * ID tanımlı değilse hiçbir script yüklenmez.
 *
 * İZİN (15 Ekim 2026): Piksel yalnızca ziyaretçi çerez banner'ında
 * "pazarlama" iznini verdiyse yüklenir. İzin yokken `fbevents.js` hiç
 * indirilmez, `_fbp` çerezi yazılmaz, hiçbir olay gitmez. İzin sonradan
 * geri alınırsa piksel `consent revoke` ile susturulur ve Meta çerezleri silinir.
 * Önceden `<noscript>` görseli de vardı; JavaScript'siz ziyaretçiye izin
 * sorulamadığı için kaldırıldı.
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
  const [izinli, setIzinli] = useState(false)
  const yuklendi = useRef(false)
  const ilkSayfa = useRef(true)

  useEffect(() => {
    setIzinli(pazarlamaIzniVar())
    return izinDinle((iz) => {
      setIzinli(iz.pazarlama)
      if (!iz.pazarlama && yuklendi.current) {
        // Geri alındı: pikseli sustur, Meta'nın birinci taraf çerezlerini sil.
        window.fbq?.('consent', 'revoke')
        cerezSil('_fbp')
        cerezSil('_fbc')
      } else if (iz.pazarlama && yuklendi.current) {
        window.fbq?.('consent', 'grant')
      }
    })
  }, [])

  // Sayfa geçişlerinde PageView — Next.js client-side routing kullanıyor,
  // base script yalnızca ilk yüklemede PageView atar.
  useEffect(() => {
    if (!PIXEL_ID || !izinli) return
    yuklendi.current = true
    if (ilkSayfa.current) {
      ilkSayfa.current = false
      return // ilk PageView'ı base script atıyor
    }
    window.fbq?.('track', 'PageView')
  }, [pathname, izinli])

  if (!PIXEL_ID || !izinli) return null

  return (
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
  )
}

/* ── Olay yardımcıları ──────────────────────────────────────────────
   Bunları component'lardan çağır. Pixel yoksa ya da ziyaretçi pazarlama
   iznini vermediyse sessizce hiçbir şey yapmaz.

   OLAY SÖZLÜĞÜ (Meta)  — ayrıntı: docs/olcum/META-OLCUM.md
   PageView             her sayfa (base script + sayfa geçişi)
   ViewContent          program detay sayfası
   InitiateCheckout     program başvuru sayfası açıldı
   FormStart*           bir forma ilk dokunuş (alan odaklandı)
   Contact              iletişim formu SUNUCUDA başarıyla işlendi
   Schedule             tanışma günü (randevu) kaydı SUNUCUDA oluştu
   Lead                 potansiyel müşteri: tanışma kaydı ve program başvurusu
   CompleteRegistration program başvuru (kayıt) formu SUNUCUDA tamamlandı
   Subscribe            bülten aboneliği
   FormSubmitSuccess*   herhangi bir form sunucuda başarıyla işlendi
   WhatsAppClick*       WhatsApp bağlantısına tıklandı (mesaj gönderildiği ANLAMINA GELMEZ)
   CallClick*           telefon bağlantısına tıklandı (görüşme yapıldığı ANLAMINA GELMEZ)
   (* = özel olay, trackCustom)

   Tıklamalar 15 Ekim 2026'ya kadar `Contact` olarak gidiyordu. Bu, "WhatsApp'a
   dokundu" ile "mesajı bize ulaştı"yı aynı kovaya koyuyordu. Artık Contact
   yalnızca sunucunun doğruladığı gerçek iletişim için.
─────────────────────────────────────────────────────────────────── */

type EventParams = Record<string, string | number | undefined>

function izinliPiksel(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function' && pazarlamaIzniVar()
}

/**
 * `eventId`: aynı olay hem buradan (tarayıcı) hem sunucudan (CAPI) gidiyor.
 * Meta ikisini ancak AYNI event_name + event_id ile gelirse tekilleştirir;
 * id verilmezse tek form doldurma iki lead olarak sayılır.
 */
function track(event: string, params?: EventParams, eventId?: string) {
  if (!izinliPiksel()) return
  if (eventId) window.fbq!('track', event, params, { eventID: eventId })
  else window.fbq!('track', event, params)
}

function trackCustom(event: string, params?: EventParams, eventId?: string) {
  if (!izinliPiksel()) return
  if (eventId) window.fbq!('trackCustom', event, params, { eventID: eventId })
  else window.fbq!('trackCustom', event, params)
}

/** Tarayıcıda üretilip forma eklenen olay kimliği — CAPI'ye de aynısı gider. */
export function newBrowserEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/** Olayın gerçekleştiği sayfa: alan adı + yol. Sorgu dizesi yok (kişisel veri taşıyabilir). */
export function olaySayfasi(): string {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}${window.location.pathname}`
}

/**
 * Google Analytics 4 olayı.
 *
 * Google Ads tarafında: Araçlar → Dönüşümler → İçe aktar → GA4.
 * Aşağıdaki olay adları orada göreceğin adlar. Google etiketi consent mode
 * altında çalışıyor; izin yoksa çerez yazmıyor (bkz. GoogleAnalytics.tsx).
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
 *
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
    content_category: 'program',
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
 * Program başvurusu (kayıt formu) sunucuda başarıyla işlendi.
 *
 * İki standart olay gider, ikisi de aynı event_id ile (Meta tekilleştirmeyi
 * olay adı + kimlik çiftiyle yaptığı için çakışmazlar):
 *   Lead                 → 15 Ekim öncesinden beri kampanyaların optimize
 *                          ettiği olay. Kaldırılırsa çalışan kampanyalar
 *                          sinyal kaybeder; o yüzden korunuyor.
 *   CompleteRegistration → "kayıt formunu tamamladı" kitlesi ve raporu için.
 * `value` program bedeli: Meta pahalı programa gelen başvuruyu ayırt eder.
 */
export function trackLead(name: string, price: number, slug: string, eventId?: string) {
  gtagEvent('generate_lead', {
    currency: 'TRY', value: price,
    items: [{ item_id: slug, item_name: name, item_category: 'program' }],
  })
  trackAdsConversion(process.env.NEXT_PUBLIC_ADS_LABEL_BASVURU, price)
  const params = { content_name: name, content_ids: slug, content_category: 'program_basvurusu', value: price, currency: 'TRY' }
  track('Lead', params, eventId)
  track('CompleteRegistration', { ...params, status: 'basvuru_alindi' }, eventId)
  trackFormSubmitSuccess('program_basvurusu', eventId)
}

/**
 * Tanışma günü kaydı — randevu. Sunucu kaydı oluşturduktan SONRA çağrılır;
 * butona basıldığı an değil.
 *
 *   Schedule → randevu oluştu (kitle 6 ve 10, randevu raporu)
 *   Lead     → kampanyaların bugüne kadar optimize ettiği olay; korunuyor.
 *
 * `value`: programın bedeli değil, tanışma kaydının tahmini değeri
 * (bedelin %10'u; bkz. TanismaForm). Amaç programlar arası ORANI korumak.
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
  const params = { content_name: programName, content_ids: slug, content_category: 'tanisma_gunu', value, currency: 'TRY' }
  track('Schedule', params, eventId)
  track('Lead', params, eventId)
  trackFormSubmitSuccess('tanisma_gunu', eventId)
}

/**
 * İletişim formu sunucuda başarıyla işlendi — `Contact`.
 *
 * NEDEN `Lead` DEĞİL: ücretli program başvurusuyla "bir sorum var" mesajı
 * aynı kovaya düşerse algoritma ikisini eşit değerli sanır ve ucuz olana,
 * yani soru soranlara akar. `Contact` ayrı bir kova.
 */
export function trackBilgiTalebi(eventId?: string) {
  gtagEvent('contact', { lead_type: 'bilgi_talebi' })
  track('Contact', { content_category: 'iletisim_formu' }, eventId)
  trackFormSubmitSuccess('iletisim_formu', eventId)
}

/** Bülten aboneliği — düşük eşikli dönüşüm. eventId sunucudaki CAPI ile aynı. */
export function trackSubscribe(eventId?: string) {
  gtagEvent('sign_up', { method: 'newsletter' })
  track('Subscribe', { content_category: 'bulten' }, eventId)
  trackFormSubmitSuccess('bulten', eventId)
}

/** Bekleme listesine katıldı. Standart olay yok: ne başvuru ne iletişim. */
export function trackBeklemeListesi() {
  gtagEvent('join_group', { group_id: 'bekleme_listesi' })
  trackFormSubmitSuccess('bekleme_listesi')
}

/** Formla ilk etkileşim. Sayfa başına form başına bir kez (bkz. FormIzleme). */
export function trackFormStart(form: string) {
  gtagEvent('form_start_tl', { form_name: form })
  trackCustom('FormStart', { form_name: form, page_path: location.pathname })
}

/** Form sunucuda başarıyla işlendi. Standart dönüşüm olayına ek, form bazlı rapor için. */
export function trackFormSubmitSuccess(form: string, eventId?: string) {
  trackCustom('FormSubmitSuccess', { form_name: form, page_path: location.pathname }, eventId ? `${eventId}:fss` : undefined)
}

/** WhatsApp bağlantısına tıklandı. Mesaj gönderildiği ANLAMINA GELMEZ. */
export function trackWhatsAppClick(p: { cta: string; eventId: string; utm?: EventParams }) {
  gtagEvent('whatsapp_click', { event_category: 'iletisim', event_label: p.cta })
  trackCustom('WhatsAppClick', { cta: p.cta, page_path: location.pathname, ...p.utm }, p.eventId)
}

/** Telefon bağlantısına tıklandı. Görüşme yapıldığı ANLAMINA GELMEZ. */
export function trackCallClick(p: { cta: string; eventId: string; utm?: EventParams }) {
  gtagEvent('phone_call', { event_category: 'iletisim', event_label: p.cta })
  trackCustom('CallClick', { cta: p.cta, page_path: location.pathname, ...p.utm }, p.eventId)
}

declare global {
  interface Window {
    gtag?: (command: string, eventOrId: string, params?: Record<string, unknown>) => void
    fbq?: (
      command: 'init' | 'track' | 'trackCustom' | 'consent',
      eventOrId: string,
      params?: EventParams,
      /** 4. argüman: { eventID } — CAPI ile tekilleştirme için. */
      options?: { eventID?: string }
    ) => void
  }
}
