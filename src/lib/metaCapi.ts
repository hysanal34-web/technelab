import 'server-only'
import crypto from 'crypto'
import { olayOzeti, type CapiOlay } from '@/lib/metaCapiYuk'

/**
 * Meta Conversions API (CAPI) — sunucu taraflı gönderim.
 *
 * NEDEN GEREKLİ
 * Tarayıcı pikseli; iOS gizlilik ayarları, Safari ITP ve reklam engelleyiciler
 * yüzünden olayların bir kısmını kaybediyor. Sunucudan gönderilen olay bunların
 * hiçbirinden etkilenmiyor. İkisi birlikte çalışır: aynı olay hem tarayıcıdan
 * hem sunucudan gider, Meta `event_name + event_id` ile ikisini tek sayar.
 *
 * Yük `metaCapiYuk.ts` içinde kuruluyor (rıza kuralları orada). Bu dosya
 * yalnızca gönderir. Kim, ne zaman, hangi rızayla gönderir: `olcumSunucu.ts`.
 *
 * KURULUM (yalnızca sunucu ortam değişkenleri — tarayıcıya ÇIKMAZ)
 *   META_PIXEL_ID          → Events Manager'daki piksel (veri kümesi) numarası
 *   META_CAPI_ACCESS_TOKEN → Events Manager → Ayarlar → Conversions API →
 *                            "Erişim belirteci oluştur"
 *   META_TEST_EVENT_CODE   → (opsiyonel) Test Events kodu. Doluysa olaylar
 *                            gerçek raporlara değil Test Events sekmesine düşer.
 *   META_CAPI_KURU=1       → (opsiyonel) Hiçbir şey gönderme; yalnızca hangi
 *                            alanların gideceğini logla. Yerel denemeler için.
 *
 * Erişim belirteci URL'ye değil gövdeye yazılıyor: sorgu dizesi proxy ve
 * hata loglarına düşebiliyor.
 */

const API_SURUMU = 'v21.0'

export type CapiSonuc =
  | 'gonderildi'
  | 'kuru'
  | 'yapilandirilmadi'
  | 'atlandi'
  | `hata:${string}`

export function capiYapilandirildiMi(): boolean {
  return Boolean(process.env.META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN)
}

async function birDene(govde: string, piksel: string): Promise<{ ok: boolean; kod: string; tekrar: boolean }> {
  try {
    const res = await fetch(`https://graph.facebook.com/${API_SURUMU}/${piksel}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: govde,
      // Form cevabını geciktirmesin.
      signal: AbortSignal.timeout(3500),
    })
    if (res.ok) return { ok: true, kod: '200', tekrar: false }
    const metin = await res.text().catch(() => '')
    // Meta'nın hata mesajı kişisel veri içermez; yine de kısaltılıyor.
    console.error('[capi] Meta reddetti:', res.status, metin.slice(0, 300))
    return { ok: false, kod: String(res.status), tekrar: res.status >= 500 || res.status === 429 }
  } catch (err) {
    console.error('[capi] gönderilemedi:', (err as Error)?.name ?? 'hata')
    return { ok: false, kod: 'ag', tekrar: true }
  }
}

/**
 * Olayları tek istekte gönderir. Asla hata fırlatmaz — reklam ölçümü
 * başvuru akışını bozmamalı. Geçici hatada (ağ, 5xx, 429) bir kez yeniden dener.
 */
export async function capiGonder(olaylar: CapiOlay[]): Promise<CapiSonuc> {
  if (olaylar.length === 0) return 'atlandi'
  const piksel = process.env.META_PIXEL_ID
  const jeton = process.env.META_CAPI_ACCESS_TOKEN

  if (process.env.META_CAPI_KURU === '1') {
    for (const o of olaylar) console.info('[capi:kuru]', olayOzeti(o))
    return 'kuru'
  }
  if (!piksel || !jeton) return 'yapilandirilmadi'

  const govdeNesnesi: Record<string, unknown> = { data: olaylar, access_token: jeton }
  if (process.env.META_TEST_EVENT_CODE) govdeNesnesi.test_event_code = process.env.META_TEST_EVENT_CODE
  const govde = JSON.stringify(govdeNesnesi)

  let s = await birDene(govde, piksel)
  if (!s.ok && s.tekrar) {
    await new Promise((r) => setTimeout(r, 400))
    s = await birDene(govde, piksel)
  }
  return s.ok ? 'gonderildi' : `hata:${s.kod}`
}

/** Tarayıcı olayıyla eşleşecek kimlik gelmediyse sunucuda üretilir. */
export function newEventId(): string {
  return crypto.randomUUID()
}
