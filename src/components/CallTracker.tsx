'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackWhatsAppClick, trackCallClick, trackFormStart, newBrowserEventId } from '@/components/MetaPixel'
import { sonDokunusUtm } from '@/components/TiklamaKimligi'

/**
 * İletişim tıklamaları ve form başlangıcı — sitenin tamamı için tek dinleyici.
 *
 * WHATSAPP / TELEFON
 * `tel:` ve WhatsApp (wa.me, api.whatsapp.com, whatsapp://) bağlantılarının
 * hepsi otomatik yakalanır; yeni bir buton eklemek için bir şey yapmak
 * gerekmiyor. `data-call-cta="nereden"` yazılırsa raporda o isimle görünür,
 * yazılmazsa sayfa yolu kullanılır.
 *
 *   Meta  → WhatsAppClick / CallClick (özel olay). 15 Ekim 2026'ya kadar
 *           ikisi de `Contact` gidiyordu; tıklama gerçek iletişim değil.
 *   GA4   → whatsapp_click / phone_call (adlar değişmedi, Google Ads içe
 *           aktarımları bozulmasın diye).
 *   Site  → /api/olcum'a beacon: panelde toplam ve tekil tıklama sayısı.
 *           Beacon izin gerektirmez ama izin yoksa sunucu kimlik ve kaynak
 *           bilgisi saklamaz (bkz. /api/olcum).
 *
 * Tıklama mesajın gönderildiği ya da aramanın yapıldığı ANLAMINA GELMEZ.
 * Panelde ayrı satırlarda raporlanır.
 *
 * FORM BAŞLANGICI
 * `data-olcum-form="ad"` taşıyan bir formun herhangi bir alanına ilk
 * odaklanmada FormStart. Sayfa başına form başına bir kez.
 */

type Tur = 'whatsapp' | 'telefon' | 'form_baslangic'

function beacon(govde: { tur: Tur; cta?: string; form?: string; kimlik?: string }) {
  try {
    const veri = JSON.stringify({ ...govde, sayfa: location.pathname })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/olcum', new Blob([veri], { type: 'application/json' }))
    } else {
      void fetch('/api/olcum', { method: 'POST', body: veri, keepalive: true, headers: { 'Content-Type': 'application/json' } })
    }
  } catch { /* ölçüm hatası siteyi bozmaz */ }
}

function iletisimTuru(href: string | null): 'whatsapp' | 'telefon' | null {
  if (!href) return null
  const h = href.trim().toLowerCase()
  if (h.startsWith('tel:')) return 'telefon'
  if (h.includes('wa.me/') || h.includes('api.whatsapp.com') || h.startsWith('whatsapp:')) return 'whatsapp'
  return null
}

/** Programatik açılışlar için (ör. Sahne Bot'un window.open'ı). */
export function iletisimTiklandi(tur: 'whatsapp' | 'telefon', cta: string) {
  const kimlik = newBrowserEventId()
  const utm = sonDokunusUtm()
  if (tur === 'whatsapp') trackWhatsAppClick({ cta, eventId: kimlik, utm })
  else trackCallClick({ cta, eventId: kimlik, utm })
  beacon({ tur, cta, kimlik })
}

export function CallTracker() {
  const pathname = usePathname()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!a) return
      const tur = iletisimTuru(a.getAttribute('href'))
      if (!tur) return
      const cta = a.dataset.callCta || `sayfa:${location.pathname}`
      iletisimTiklandi(tur, cta)
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  // Form başlangıcı: sayfa değişince "başlatıldı" kümesi sıfırlanır.
  useEffect(() => {
    const baslayan = new Set<string>()
    function onFocus(e: FocusEvent) {
      const form = (e.target as HTMLElement | null)?.closest<HTMLFormElement>('form[data-olcum-form]')
      if (!form) return
      const ad = form.dataset.olcumForm || 'form'
      if (baslayan.has(ad)) return
      baslayan.add(ad)
      trackFormStart(ad)
      beacon({ tur: 'form_baslangic', form: ad })
    }
    document.addEventListener('focusin', onFocus)
    return () => document.removeEventListener('focusin', onFocus)
  }, [pathname])

  return null
}
