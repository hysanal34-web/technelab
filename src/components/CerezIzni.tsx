'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { izinOku, izinKaydet, IZIN_AC_OLAYI } from '@/lib/izinIstemci'

/**
 * Çerez izni.
 *
 * Karar verilene kadar Meta Pixel yüklenmez, Google etiketi çerez yazmaz
 * (consent mode "denied"). "Reddet" ve "Kabul et" aynı ağırlıkta: KVKK
 * rehberi reddetmeyi kabul etmekten zor kılan tasarımı geçersiz rıza sayıyor.
 *
 * Sayfa ilk çizildiğinde hiçbir şey basmaz (sunucu izni bilmiyor); bağlandıktan
 * sonra çereze bakar. Hidrasyon uyuşmazlığı olmaz.
 */

const METIN = {
  tr: {
    baslik: 'çerez tercihleri',
    govde:
      'Siteyi geliştirmek ve reklamlarımızın işe yarayıp yaramadığını ölçmek için çerez kullanıyoruz. Zorunlu çerezler dışındakiler yalnızca izin verirsen çalışır.',
    kabul: 'kabul et',
    ret: 'reddet',
    tercih: 'tercihler',
    kaydet: 'seçimi kaydet',
    analitik: 'Analitik',
    analitikAcik: 'Google Analytics, ziyaret ve tıklama sayımı, reklam kaynağı (UTM).',
    pazarlama: 'Pazarlama',
    pazarlamaAcik: 'Meta Pixel, Google Ads ve reklam tıklama kimlikleri. Reklam ölçümü ve yeniden hedefleme.',
    zorunlu: 'Zorunlu',
    zorunluAcik: 'Sitenin çalışması ve bu tercihin hatırlanması için. Kapatılamaz.',
    metin: 'aydınlatma metni',
  },
  en: {
    baslik: 'cookie preferences',
    govde:
      'We use cookies to improve the site and to measure whether our ads work. Anything beyond strictly necessary cookies runs only with your permission.',
    kabul: 'accept',
    ret: 'reject',
    tercih: 'preferences',
    kaydet: 'save choice',
    analitik: 'Analytics',
    analitikAcik: 'Google Analytics, visit and click counts, ad source (UTM).',
    pazarlama: 'Marketing',
    pazarlamaAcik: 'Meta Pixel, Google Ads and ad click IDs. Ad measurement and retargeting.',
    zorunlu: 'Necessary',
    zorunluAcik: 'Required for the site to work and to remember this choice. Always on.',
    metin: 'privacy notice',
  },
}

export function CerezIzni() {
  const pathname = usePathname()
  const [acik, setAcik] = useState(false)
  const [detay, setDetay] = useState(false)
  const [analitik, setAnalitik] = useState(false)
  const [pazarlama, setPazarlama] = useState(false)
  const kutu = useRef<HTMLDivElement>(null)

  // Banner açıkken mobilde WhatsApp butonunu banner'ın üstüne kaydır:
  // asıl iletişim kanalı karar verilene kadar örtülmesin.
  const gorunur = acik && !pathname?.startsWith('/admin')
  useEffect(() => {
    const kok = document.documentElement
    if (!gorunur || !kutu.current) {
      delete kok.dataset.cerezAcik
      return
    }
    const el = kutu.current
    const olc = () => kok.style.setProperty('--cerez-yukseklik', `${el.offsetHeight}px`)
    olc()
    kok.dataset.cerezAcik = '1'
    const ro = new ResizeObserver(olc)
    ro.observe(el)
    return () => { ro.disconnect(); delete kok.dataset.cerezAcik }
  }, [gorunur, detay])

  useEffect(() => {
    const mevcut = izinOku()
    if (!mevcut) setAcik(true)
    else {
      setAnalitik(mevcut.analitik)
      setPazarlama(mevcut.pazarlama)
    }
    const ac = () => {
      const m = izinOku()
      setAnalitik(m?.analitik ?? false)
      setPazarlama(m?.pazarlama ?? false)
      setDetay(true)
      setAcik(true)
    }
    window.addEventListener(IZIN_AC_OLAYI, ac)
    return () => window.removeEventListener(IZIN_AC_OLAYI, ac)
  }, [])

  // Yönetim paneli ziyaretçiye ait değil; orada banner gösterme.
  if (!acik || pathname?.startsWith('/admin')) return null

  const t = pathname?.startsWith('/en') ? METIN.en : METIN.tr

  function karar(a: boolean, p: boolean) {
    izinKaydet(a, p)
    setAcik(false)
    setDetay(false)
  }

  const btn = 'font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon'

  return (
    <div
      ref={kutu}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cerez-baslik"
      data-cerez-izni
      className="surface-dark fixed z-[9500] bottom-0 inset-x-0 md:inset-x-auto md:left-6 md:bottom-6 md:max-w-[440px] border-t-2 md:border-2 border-neon shadow-2xl"
    >
      <div className="p-5 md:p-6">
        <p id="cerez-baslik" className="font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-3">
          {t.baslik}
        </p>
        <p className="font-mono text-[12px] leading-relaxed text-stone mb-4">
          {t.govde}{' '}
          <Link href="/kvkk#cerezler" className="underline underline-offset-2 hover:text-neon">
            {t.metin}
          </Link>
        </p>

        {detay && (
          <div className="space-y-3 mb-5 border-t border-border pt-4">
            <Satir ad={t.zorunlu} aciklama={t.zorunluAcik} acik sabit />
            <Satir ad={t.analitik} aciklama={t.analitikAcik} acik={analitik} degistir={() => setAnalitik((v) => !v)} />
            <Satir ad={t.pazarlama} aciklama={t.pazarlamaAcik} acik={pazarlama} degistir={() => setPazarlama((v) => !v)} />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {detay ? (
            <button type="button" onClick={() => karar(analitik, pazarlama)} className={`${btn} bg-neon text-ink hover:bg-fg`}>
              {t.kaydet}
            </button>
          ) : (
            <button type="button" onClick={() => karar(true, true)} className={`${btn} bg-neon text-ink hover:bg-fg`}>
              {t.kabul}
            </button>
          )}
          <button type="button" onClick={() => karar(false, false)} className={`${btn} border border-fg text-fg hover:border-neon hover:text-neon`}>
            {t.ret}
          </button>
          {!detay && (
            <button type="button" onClick={() => setDetay(true)} className={`${btn} text-stone hover:text-fg`}>
              {t.tercih}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Satir({
  ad, aciklama, acik, sabit, degistir,
}: { ad: string; aciklama: string; acik: boolean; sabit?: boolean; degistir?: () => void }) {
  return (
    <label className={`flex items-start gap-3 ${sabit ? 'opacity-70' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        checked={acik}
        disabled={sabit}
        onChange={degistir}
        className="mt-0.5 accent-neon shrink-0"
      />
      <span>
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg block">{ad}</span>
        <span className="font-mono text-[11px] leading-relaxed text-stone">{aciklama}</span>
      </span>
    </label>
  )
}

/** Footer'da "çerez tercihleri" — banner'ı yeniden açar. */
export function CerezTercihLinki({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(IZIN_AC_OLAYI))}
      className={className}
    >
      çerez tercihleri
    </button>
  )
}
