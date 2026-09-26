'use client'

import { useEffect } from 'react'

/**
 * Reklam tıklama kimliğini yakalar ve birinci taraf çerezde saklar.
 *
 * NEDEN GEREKLİ: Google Ads'e "bu kayıt hangi reklamdan geldi" demenin tek
 * yolu `gclid`. Tıklama kimliği olmadan offline dönüşüm yüklenemiyor — yani
 * kayıt olan, para ödeyen kişi Google tarafında hiç görünmüyor, algoritma
 * "form dolduran"a göre optimize etmeye devam ediyor.
 *
 * NEDEN ÇEREZ, NEDEN GİZLİ FORM ALANI DEĞİL: reklam genelde program sayfasına
 * düşüyor, form başka sayfada dolduruluyor. Adres çubuğundaki `?gclid=...`
 * ilk gezinmede kayboluyor. Çerez 90 gün taşıyor (Google'ın tıklama-dönüşüm
 * penceresiyle aynı).
 *
 * NEDEN ÜSTÜNE YAZIYOR: aynı kişi iki farklı reklamdan gelirse son tıklama
 * geçerli. Google'ın kendi atıf modeli de son tıklamayı esas alıyor.
 *
 * `wbraid` / `gbraid`: iOS'ta gizlilik kısıtları yüzünden Google `gclid`
 * yerine bunları gönderiyor. Aynı işi görüyorlar, ayrı sütuna yazılıyorlar.
 *
 * Meta tarafında buna gerek yok: piksel `fbclid`'i kendisi `_fbc` çerezine
 * yazıyor ve sunucu tarafı zaten onu okuyor.
 */

/** Google'ın tıklama-dönüşüm penceresi 90 gün. Daha uzunu işe yaramıyor. */
const GUN = 90

const ANAHTARLAR = ['gclid', 'wbraid', 'gbraid'] as const

function cerezYaz(ad: string, deger: string) {
  // SameSite=Lax: reklamdan gelen üst düzey gezinmede çerez gönderiliyor,
  // üçüncü taraf bağlamında gönderilmiyor. Bu iş için doğru denge.
  const gun = `; Max-Age=${GUN * 24 * 60 * 60}`
  const guvenli = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ad}=${encodeURIComponent(deger)}; Path=/${gun}; SameSite=Lax${guvenli}`
}

export function TiklamaKimligi() {
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search)
      for (const anahtar of ANAHTARLAR) {
        const deger = p.get(anahtar)
        // Uzun değerler reklam kimliği değildir; çerezi şişirmesin.
        if (deger && deger.length <= 200) cerezYaz(`tl_${anahtar}`, deger)
      }
    } catch {
      // Çerez yazılamazsa (gizli mod, izin reddi) ölçüm kaybolur ama
      // site çalışmaya devam eder. Sessiz geçmek doğru davranış.
    }
  }, [])

  return null
}
