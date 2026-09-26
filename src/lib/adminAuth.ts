/**
 * Admin oturumu — tek ortak şifre, HMAC imzalı çerez.
 *
 * NEDEN VERİTABANI DEĞİL: panele üç kişi giriyor (Yağız, Melis, reklam
 * arkadaşı). Kullanıcı tablosu, şifre sıfırlama akışı ve e-posta doğrulaması
 * kurmak bu ölçekte kazandırdığından fazlasını götürüyor. Şifre Vercel ortam
 * değişkeninde duruyor, kod deposunda değil.
 *
 * NEDEN JWT KÜTÜPHANESİ DEĞİL: taşıdığımız tek bilgi son kullanma zamanı.
 * Web Crypto ile HMAC-SHA256 yeterli ve middleware'in çalıştığı Edge
 * ortamında ek bağımlılık olmadan çalışıyor.
 *
 * Çerez: httpOnly (JavaScript okuyamaz) · sameSite=lax (CSRF) ·
 * secure (yalnız HTTPS, yerelde kapalı).
 */

export const ADMIN_COOKIE = 'tl_admin'
const GUN = 24 * 60 * 60 * 1000
export const OTURUM_SURESI = 7 * GUN

function gizliAnahtar(): string | null {
  // ADMIN_SESSION_SECRET tanımlı değilse şifrenin kendisi imza anahtarı olur.
  // Böylece tek değişken tanımlayarak da çalışıyor; şifre değişince eski
  // oturumların düşmesi istenen davranış zaten.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function imzala(mesaj: string, anahtar: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(anahtar),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(mesaj)))
}

/** Zamanlama saldırısına kapalı karşılaştırma. */
function esitMi(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let fark = 0
  for (let i = 0; i < a.length; i++) fark |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return fark === 0
}

/** Şifre doğruysa çerez değeri üretir, yanlışsa null. */
export async function oturumUret(sifre: string): Promise<string | null> {
  const dogruSifre = process.env.ADMIN_PASSWORD
  if (!dogruSifre) return null
  if (!esitMi(sifre, dogruSifre)) return null

  const anahtar = gizliAnahtar()
  if (!anahtar) return null

  const bitis = String(Date.now() + OTURUM_SURESI)
  return `${bitis}.${await imzala(bitis, anahtar)}`
}

/** Çerez geçerli ve süresi dolmamış mı. Middleware ve sunucu tarafında aynı. */
export async function oturumGecerliMi(cerez: string | undefined): Promise<boolean> {
  if (!cerez) return false
  const anahtar = gizliAnahtar()
  if (!anahtar) return false

  const nokta = cerez.indexOf('.')
  if (nokta < 1) return false

  const bitis = cerez.slice(0, nokta)
  const imza = cerez.slice(nokta + 1)
  if (!/^\d+$/.test(bitis)) return false
  if (Number(bitis) < Date.now()) return false

  return esitMi(imza, await imzala(bitis, anahtar))
}

/** Panel hiç kurulmamışsa (şifre tanımsız) giriş sayfası bunu söylüyor. */
export function panelKuruluMu(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}
