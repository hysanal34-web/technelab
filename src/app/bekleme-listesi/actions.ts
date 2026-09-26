'use server'

import { Resend } from 'resend'
import { SITE_META } from '@/lib/data'

/**
 * BEKLEME LİSTESİ — iki aşamalı.
 *
 * Neden iki aşama: bekleme listesinin işi hacim toplamak. Tek ekranda sekiz
 * alan sorulursa kayıt sayısı düşer. O yüzden 1. adımda yalnızca ad, e-posta
 * ve hangi program soruluyor; kişi kaydolduktan SONRA isteğe bağlı sorular
 * geliyor. Cevaplamasa bile e-postası elimizde kalıyor.
 *
 * Akış:
 *   joinWaitlist    → bize bildirim + Resend audience kaydı (lead güvenceye alındı)
 *   enrichWaitlist  → aynı kişi için ek bilgi maili (e-posta ile eşleştiriliyor)
 *
 * Fiyat bu formda da geçmiyor; site genelindeki kural burada da geçerli.
 */

export type WaitlistState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  /** 1. adım başarılıysa 2. adımın eşleştirme yapabilmesi için taşınıyor. */
  email?: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function take(v: FormData, key: string, max = 200): string {
  return ((v.get(key) as string | null) ?? '').trim().slice(0, max)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function resendClient(): { resend: Resend; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return {
    resend: new Resend(apiKey),
    from: process.env.RESEND_FROM || 'Techne Lab <onboarding@resend.dev>',
  }
}

// ── 1. ADIM ────────────────────────────────────────────────────────
export async function joinWaitlist(formData: FormData): Promise<WaitlistState> {
  const name    = take(formData, 'name', 120)
  const email   = take(formData, 'email', 160)
  const program = take(formData, 'program', 120)
  const kvkk    = formData.get('kvkk')
  const website = take(formData, 'website', 200) // honeypot

  if (website) return { status: 'success', email } // bot: sessizce yut

  if (!name) return { status: 'error', message: 'Adını yazar mısın?' }
  if (!EMAIL_RE.test(email)) return { status: 'error', message: 'E-posta adresi geçerli görünmüyor.' }
  if (!kvkk) return { status: 'error', message: 'Devam etmek için KVKK metnini onaylaman gerekiyor.' }

  const client = resendClient()
  if (!client) {
    console.error('[bekleme] RESEND_API_KEY tanımsız — kayıt iletilemedi:', { name })
    return {
      status: 'error',
      message: `Şu anda kaydedemedik. ${SITE_META.email} adresine yazarsan listeye elle ekleriz.`,
    }
  }

  try {
    await client.resend.emails.send({
      from: client.from,
      to: SITE_META.email,
      replyTo: email,
      subject: `Bekleme listesi — ${name}${program ? ` (${program})` : ''}`,
      html: `
        <div style="font-family:monospace;font-size:14px;line-height:1.8">
          <strong>Bekleme listesine yeni kayıt</strong><br/>
          Ad: ${esc(name)}<br/>
          E-posta: ${esc(email)}<br/>
          İlgilendiği program: ${esc(program) || '—'}<br/>
        </div>`,
    })

    const audienceId = process.env.RESEND_LEADS_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      const [first, ...rest] = name.split(' ')
      await client.resend.contacts
        .create({ email, firstName: first, lastName: rest.join(' ') || undefined, audienceId, unsubscribed: false })
        .catch((e) => console.error('[bekleme] audience kaydı başarısız:', e))
    }

    return { status: 'success', email }
  } catch (err) {
    console.error('[bekleme] Mail gönderilemedi:', err)
    return { status: 'error', message: `Bir şeyler ters gitti. ${SITE_META.email} adresinden bize ulaşabilirsin.` }
  }
}

// ── 2. ADIM (isteğe bağlı) ─────────────────────────────────────────
export async function enrichWaitlist(formData: FormData): Promise<WaitlistState> {
  const email      = take(formData, 'email', 160)
  const side       = take(formData, 'side', 60)
  const when       = take(formData, 'when', 60)
  const experience = take(formData, 'experience', 60)
  const goal       = take(formData, 'goal', 80)
  const age        = take(formData, 'age', 40)
  const occupation = take(formData, 'occupation', 160)
  const phone      = take(formData, 'phone', 40)
  const note       = take(formData, 'note', 1000)
  const website    = take(formData, 'website', 200)

  if (website) return { status: 'success' }
  // E-posta 1. adımdan geliyor; yoksa eşleştirme yapılamaz.
  if (!EMAIL_RE.test(email)) return { status: 'success' }

  const client = resendClient()
  if (!client) return { status: 'success' } // 1. adım zaten kaydedildi, sessiz geç

  const row = (k: string, v: string) => (v ? `${k}: ${esc(v)}<br/>` : '')

  try {
    await client.resend.emails.send({
      from: client.from,
      to: SITE_META.email,
      replyTo: email,
      subject: `Bekleme listesi · ek bilgi — ${email}`,
      html: `
        <div style="font-family:monospace;font-size:14px;line-height:1.8">
          <strong>Bekleme listesi kaydına ek bilgi</strong><br/>
          E-posta: ${esc(email)}<br/>
          ${row('Yaka', side)}
          ${row('Uygun zaman', when)}
          ${row('Deneyim', experience)}
          ${row('Hedef', goal)}
          ${row('Yaş', age)}
          ${row('Meslek', occupation)}
          ${row('Telefon', phone)}
          ${note ? `<br/><strong>Not:</strong><br/><div style="white-space:pre-wrap">${esc(note)}</div>` : ''}
        </div>`,
    })
    return { status: 'success' }
  } catch (err) {
    console.error('[bekleme] Ek bilgi gönderilemedi:', err)
    // Kullanıcıya hata gösterme: asıl kayıt 1. adımda zaten alındı.
    return { status: 'success' }
  }
}
