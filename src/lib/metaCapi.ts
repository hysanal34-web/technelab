import 'server-only'
import crypto from 'crypto'

/**
 * Meta Conversions API (CAPI) — sunucu taraflı olay gönderimi.
 *
 * NEDEN GEREKLİ
 * Tarayıcıdaki piksel; iOS gizlilik ayarları (ATT), Safari ITP ve reklam
 * engelleyiciler yüzünden başvuruların yaklaşık %30'unu kaybediyor. Sunucudan
 * gönderilen olay bunların hiçbirinden etkilenmiyor. İkisi birlikte çalışır:
 * aynı olay hem tarayıcıdan hem sunucudan gider, Meta `event_id` ile ikisini
 * eşleştirip tek sayar. Yani çift sayım olmaz, eksik sayım kapanır.
 *
 * KURULUM
 *   META_PIXEL_ID          → Events Manager'daki piksel numarası
 *   META_CAPI_ACCESS_TOKEN → Events Manager → Ayarlar → Conversions API →
 *                            "Erişim belirteci oluştur"
 *   META_TEST_EVENT_CODE   → (opsiyonel) Test Events sekmesindeki kod.
 *                            Yalnızca kurulumu doğrularken kullan, sonra sil.
 *
 * GİZLİLİK
 * Kişisel veri Meta'ya ASLA açık gönderilmez. E-posta ve telefon burada
 * SHA-256 ile geri döndürülemez şekilde özetlenir (Meta'nın şartı budur).
 * Ad, mesaj, motivasyon metni gibi alanlar hiç gönderilmez.
 */

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const TEST_CODE = process.env.META_TEST_EVENT_CODE
const API_VERSION = 'v21.0'

/** Meta normalize kuralı: kırp, küçült, sonra SHA-256. */
function hash(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

/** Telefonu E.164'e yaklaştır: sadece rakam, Türkiye için 90 öneki. */
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  if (digits.startsWith('90')) return digits
  if (digits.startsWith('0')) return '90' + digits.slice(1)
  if (digits.startsWith('5')) return '90' + digits
  return digits
}

export type CapiEvent = {
  eventName: 'Lead' | 'CompleteRegistration' | 'Subscribe' | 'InitiateCheckout'
  /** Tarayıcı olayıyla eşleşen kimlik — çift sayımı engeller. */
  eventId: string
  eventSourceUrl?: string
  email?: string
  phone?: string
  /** Tarayıcıdaki _fbp çerezi — eşleşme kalitesini ciddi artırır. */
  fbp?: string
  /** Reklamdan gelen _fbc çerezi. */
  fbc?: string
  clientIp?: string
  userAgent?: string
  value?: number
  currency?: string
  contentName?: string
  contentId?: string
}

/**
 * Olayı Meta'ya gönderir.
 * Asla hata fırlatmaz — reklam takibi başvuru akışını bozmamalı.
 */
export async function sendCapiEvent(ev: CapiEvent): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return // kurulmadıysa sessizce geç

  const userData: Record<string, string | string[]> = {}
  if (ev.email) userData.em = hash(ev.email)
  if (ev.phone) {
    const p = normalizePhone(ev.phone)
    if (p) userData.ph = hash(p)
  }
  if (ev.fbp) userData.fbp = ev.fbp
  if (ev.fbc) userData.fbc = ev.fbc
  if (ev.clientIp) userData.client_ip_address = ev.clientIp
  if (ev.userAgent) userData.client_user_agent = ev.userAgent

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: ev.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: ev.eventId,
        event_source_url: ev.eventSourceUrl,
        action_source: 'website',
        user_data: userData,
        custom_data: {
          ...(ev.value !== undefined ? { value: ev.value } : {}),
          ...(ev.currency ? { currency: ev.currency } : {}),
          ...(ev.contentName ? { content_name: ev.contentName } : {}),
          ...(ev.contentId ? { content_ids: [ev.contentId], content_type: 'product' } : {}),
        },
      },
    ],
  }
  if (TEST_CODE) body.test_event_code = TEST_CODE

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        // Başvuru cevabını geciktirmesin
        signal: AbortSignal.timeout(4000),
      }
    )
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[capi] Meta reddetti:', res.status, text.slice(0, 400))
    }
  } catch (err) {
    console.error('[capi] gönderilemedi:', err)
  }
}

/** Tarayıcı ve sunucu olaylarını eşleştirmek için ortak kimlik. */
export function newEventId(): string {
  return crypto.randomUUID()
}
