'use client'

import { useEffect } from 'react'
import { izinOku, izinDinle, cerezYaz, cerezSil, cerezOku } from '@/lib/izinIstemci'
import { KAYNAK_CEREZI, ZIYARETCI_CEREZI, kaynagiCoz, type Dokunus, type Kaynak } from '@/lib/izin'
import type { Izin } from '@/lib/izin'

/**
 * Reklam kaynağı ve tıklama kimlikleri.
 *
 * Yakalanan: utm_source, utm_medium, utm_campaign, utm_content, utm_term,
 * fbclid, gclid, wbraid, gbraid, yönlendiren alan adı, iniş sayfası.
 *
 * NEDEN ÇEREZ: reklam genelde program sayfasına düşüyor, form başka sayfada
 * dolduruluyor. Adres çubuğundaki parametreler ilk gezinmede kayboluyor.
 * Form gönderildiğinde sunucu bu çerezi okuyup dönüşümü kaynağıyla birlikte
 * kaydediyor (bkz. olcumSunucu.ts). 90 gün: Google'ın tıklama penceresi.
 *
 * İZİN (15 Ekim 2026): Hiçbir şey izin olmadan yazılmaz.
 *   gclid/wbraid/gbraid, fbclid  → pazarlama izni
 *   UTM, iniş sayfası, yönlendiren → analitik VEYA pazarlama izni
 *   anonim ziyaretçi kimliği      → analitik izni
 * Ziyaretçi izni sayfaya geldikten sonra verirse, iniş parametreleri bellekte
 * tutulduğu için kaybolmaz. İzin geri alınırsa bu çerezlerin hepsi silinir.
 *
 * `_fbc` (Meta tıklama çerezi) piksel tarafından yazılır. Piksel izinle
 * sonradan yüklenirse adres çubuğunda fbclid kalmamış olabilir; o durumda
 * sunucu `fbc`'yi buradaki fbclid ve tıklama zamanından kendisi kuruyor.
 */

const GUN = 90
const ZIYARETCI_GUN = 395
const TIKLAMA = ['gclid', 'wbraid', 'gbraid'] as const

/** Sayfa ilk açıldığındaki parametreler. Client-side gezinmede adres değişse de korunur. */
let inis: { p: URLSearchParams; yol: string; ref: string } | null = null

function inisiYakala() {
  if (inis) return inis
  let ref = ''
  try {
    if (document.referrer) {
      const h = new URL(document.referrer).hostname
      if (h && h !== location.hostname) ref = h
    }
  } catch { /* geçersiz referrer */ }
  inis = { p: new URLSearchParams(location.search), yol: location.pathname, ref }
  return inis
}

function sinirla(v: string | null): string | undefined {
  if (!v) return undefined
  const t = v.trim()
  // Uzun değerler reklam kimliği/UTM değildir; çerezi şişirmesin.
  return t && t.length <= 200 ? t : undefined
}

function uygula(iz: Izin | null) {
  try {
    const { p, yol, ref } = inisiYakala()

    if (!iz || (!iz.analitik && !iz.pazarlama)) {
      // İzin yok ya da geri alındı: daha önce yazılmış her şeyi temizle.
      for (const a of TIKLAMA) cerezSil(`tl_${a}`)
      cerezSil(KAYNAK_CEREZI)
      cerezSil(ZIYARETCI_CEREZI)
      return
    }

    if (iz.pazarlama) {
      for (const a of TIKLAMA) {
        const d = sinirla(p.get(a))
        if (d) cerezYaz(`tl_${a}`, d, GUN)
      }
    } else {
      for (const a of TIKLAMA) cerezSil(`tl_${a}`)
    }

    const yeni: Dokunus = {
      s: sinirla(p.get('utm_source')),
      m: sinirla(p.get('utm_medium')),
      c: sinirla(p.get('utm_campaign')),
      co: sinirla(p.get('utm_content')),
      te: sinirla(p.get('utm_term')),
      fb: iz.pazarlama ? sinirla(p.get('fbclid')) : undefined,
      g: iz.pazarlama ? sinirla(p.get('gclid')) : undefined,
      r: ref || undefined,
      lp: yol,
      ts: Date.now(),
    }
    const anlamli = Boolean(yeni.s || yeni.m || yeni.c || yeni.fb || yeni.g || yeni.r)
    const mevcut = kaynagiCoz(cerezOku(KAYNAK_CEREZI))

    let sonuc: Kaynak | null = mevcut
    if (!mevcut) sonuc = { ilk: yeni, son: yeni }
    else if (anlamli) sonuc = { ilk: mevcut.ilk, son: yeni }
    if (sonuc) {
      // Pazarlama izni geri alındıysa eski tıklama kimliklerini de at.
      if (!iz.pazarlama) {
        sonuc = {
          ilk: { ...sonuc.ilk, fb: undefined, g: undefined },
          son: { ...sonuc.son, fb: undefined, g: undefined },
        }
      }
      cerezYaz(KAYNAK_CEREZI, JSON.stringify(sonuc), GUN)
    }

    if (iz.analitik) {
      if (!cerezOku(ZIYARETCI_CEREZI)) {
        const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`
        cerezYaz(ZIYARETCI_CEREZI, id, ZIYARETCI_GUN)
      }
    } else {
      cerezSil(ZIYARETCI_CEREZI)
    }
  } catch {
    // Çerez yazılamazsa (gizli mod) ölçüm kaybolur ama site çalışmaya devam eder.
  }
}

export function TiklamaKimligi() {
  useEffect(() => {
    inisiYakala()
    uygula(izinOku())
    return izinDinle(uygula)
  }, [])

  return null
}

/** Pikselde ve beacon'da kullanılmak üzere son dokunuşun UTM'leri (izin varsa). */
export function sonDokunusUtm(): Record<string, string> {
  const k = kaynagiCoz(cerezOku(KAYNAK_CEREZI))
  const d = k?.son
  if (!d) return {}
  const o: Record<string, string> = {}
  if (d.s) o.utm_source = d.s
  if (d.m) o.utm_medium = d.m
  if (d.c) o.utm_campaign = d.c
  if (d.co) o.utm_content = d.co
  if (d.te) o.utm_term = d.te
  return o
}
