'use client'

import { IZIN_CEREZI, IZIN_GUN, izniCoz, izniYaz, type Izin } from '@/lib/izin'

/**
 * Tarayıcı tarafı izin yardımcıları.
 *
 * Banner kararı verdiğinde `tl-izin` olayı yayınlanır; piksel, Google etiketi
 * ve kaynak çerezi bu olayı dinleyip kendini açar ya da kapatır. Sayfa
 * yenilenmeden çalışır.
 */

export const IZIN_OLAYI = 'tl-izin'
/** Footer'daki "çerez tercihleri" linki bu olayla banner'ı yeniden açar. */
export const IZIN_AC_OLAYI = 'tl-izin-ac'

function cerezOku(ad: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const parca = document.cookie.split('; ').find((c) => c.startsWith(`${ad}=`))
  return parca?.slice(ad.length + 1)
}

export function izinOku(): Izin | null {
  return izniCoz(cerezOku(IZIN_CEREZI))
}

export function pazarlamaIzniVar(): boolean {
  return izinOku()?.pazarlama === true
}

export function analitikIzniVar(): boolean {
  return izinOku()?.analitik === true
}

export function izinKaydet(analitik: boolean, pazarlama: boolean): Izin {
  const iz: Izin = { analitik, pazarlama, zaman: Date.now() }
  const guvenli = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${IZIN_CEREZI}=${encodeURIComponent(izniYaz(iz))}; Path=/; Max-Age=${IZIN_GUN * 86400}; SameSite=Lax${guvenli}`
  window.dispatchEvent(new CustomEvent<Izin>(IZIN_OLAYI, { detail: iz }))
  return iz
}

/** İzin değişince çağrılır. Dönen fonksiyon aboneliği bitirir. */
export function izinDinle(cb: (iz: Izin) => void): () => void {
  const f = (e: Event) => cb((e as CustomEvent<Izin>).detail)
  window.addEventListener(IZIN_OLAYI, f)
  return () => window.removeEventListener(IZIN_OLAYI, f)
}

/** Birinci taraf çerez yaz (izin kontrolü çağıranın işi). */
export function cerezYaz(ad: string, deger: string, gun: number) {
  const guvenli = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ad}=${encodeURIComponent(deger)}; Path=/; Max-Age=${gun * 86400}; SameSite=Lax${guvenli}`
}

export function cerezSil(ad: string) {
  document.cookie = `${ad}=; Path=/; Max-Age=0; SameSite=Lax`
}

export { cerezOku }
