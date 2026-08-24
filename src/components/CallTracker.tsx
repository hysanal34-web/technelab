'use client'

import { useEffect } from 'react'

/**
 * Tıklanabilir telefon numaralarını dönüşüm olarak sayar.
 *
 * Neden global bir dinleyici: telefon linki artık iletişim sayfasında,
 * program sayfalarındaki mobil barda, WhatsApp butonunda ve ileride
 * eklenecek her yerde olacak. Her birine ayrı onClick koymak yerine
 * document seviyesinde tek dinleyici — yeni bir tel: linki eklemek
 * için `data-call-cta="nereden"` yazmak yeterli.
 *
 * Gönderilen olaylar:
 *  - GA4  → `phone_call` (Google Ads'e dönüşüm olarak içe aktarılacak)
 *  - Meta → `Contact` (standart olay, Lookalike için değerli sinyal)
 */
export function CallTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-call-cta]')
      if (!el) return

      const source = el.dataset.callCta || 'bilinmiyor'
      const isWhatsApp = el.getAttribute('href')?.includes('wa.me')

      type Tracked = Window & {
        gtag?: (...a: unknown[]) => void
        fbq?: (...a: unknown[]) => void
      }
      const w = window as Tracked

      w.gtag?.('event', isWhatsApp ? 'whatsapp_click' : 'phone_call', {
        event_category: 'iletisim',
        event_label: source,
      })
      w.fbq?.('track', 'Contact', {
        content_name: source,
        content_category: isWhatsApp ? 'whatsapp' : 'telefon',
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
