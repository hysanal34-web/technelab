'use server'

import { Resend } from 'resend'
import { donusumuIsle } from '@/lib/olcumSunucu'

export type BultenState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Bülten kaydı — Resend Audience'a ekler.
 *
 * RESEND_AUDIENCE_ID tanımlı değilse sessizce info@ adresine bildirim gönderir;
 * böylece Audience kurulmadan önce de form çalışır, hiçbir kayıt kaybolmaz.
 */
export async function subscribeBulten(formData: FormData): Promise<BultenState> {
  const eposta = ((formData.get('eposta') as string | null) ?? '').trim().slice(0, 160)

  // Honeypot — botlar bu gizli alanı doldurur, insanlar dolduramaz
  const tuzak = ((formData.get('website') as string | null) ?? '').trim()
  if (tuzak) return { status: 'success', message: 'Kaydınız alındı.' }

  if (!eposta) {
    return { status: 'error', message: 'E-posta adresinizi yazar mısınız?' }
  }
  if (!EMAIL_RE.test(eposta)) {
    return { status: 'error', message: 'Geçerli bir e-posta adresi girin. Örnek: ad@ornek.com' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[bulten] RESEND_API_KEY tanımsız')
    return { status: 'error', message: 'Kayıt şu an alınamıyor. Lütfen biraz sonra tekrar deneyin.' }
  }

  const resend = new Resend(apiKey)
  const audienceId = process.env.RESEND_AUDIENCE_ID

  try {
    if (audienceId) {
      const { error } = await resend.contacts.create({
        email: eposta,
        unsubscribed: false,
        audienceId,
      })
      // Zaten kayıtlıysa Resend hata döner — kullanıcıya başarı göster,
      // ikinci kez abone olmaya çalışmak bir hata değil.
      if (error && !/already|exists/i.test(error.message ?? '')) {
        console.error('[bulten] contacts.create:', error)
        return { status: 'error', message: 'Kayıt alınamadı. Lütfen tekrar deneyin.' }
      }
    } else {
      // Audience henüz kurulmadıysa — bildirim olarak gönder
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'Techne Lab Bülten <onboarding@resend.dev>',
        to: 'info@technelabistanbul.com',
        subject: `Yeni bülten kaydı — ${eposta}`,
        text: `Bültene yeni kayıt:\n\n${eposta}\n\n(RESEND_AUDIENCE_ID tanımlanınca bu kayıtlar otomatik listeye düşecek.)`,
      })
    }

    // Ölçüm: Meta CAPI Subscribe (tarayıcıyla aynı event_id) + dönüşüm kaydı.
    // Bu formda ayrı "reklam ölçümü" kutusu yok: e-posta özeti Meta'ya GİTMEZ,
    // yalnızca pazarlama çerez izni varsa tarayıcı sinyalleri gider.
    await donusumuIsle({
      tur: 'bulten',
      olaylar: ['Subscribe'],
      eventId: formData.get('eventId') as string | null,
      sayfa: formData.get('olaySayfasi') as string | null,
      yedekYol: '/',
      email: eposta,
      reklamRizasi: false,
      icerikKategorisi: 'bulten',
    })

    return { status: 'success', message: 'Kaydınız alındı. İlk bültende görüşmek üzere.' }
  } catch (err) {
    console.error('[bulten] beklenmeyen hata:', err)
    return { status: 'error', message: 'Kayıt alınamadı. Lütfen tekrar deneyin.' }
  }
}
