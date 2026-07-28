'use server'

import { Resend } from 'resend'
import { SITE_META } from '@/lib/data'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  field?: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(formData: FormData): Promise<ContactState> {
  const ad     = ((formData.get('ad')     as string | null) ?? '').trim().slice(0, 120)
  const eposta = ((formData.get('eposta') as string | null) ?? '').trim().slice(0, 160)
  const konu   = ((formData.get('konu')   as string | null) ?? '').trim().slice(0, 200)
  const mesaj  = ((formData.get('mesaj')  as string | null) ?? '').trim().slice(0, 4000)

  if (!ad)    return { status: 'error', field: 'ad',     message: 'Adınızı yazar mısınız?' }
  if (!eposta) return { status: 'error', field: 'eposta', message: 'Size dönebilmemiz için e-posta adresiniz gerekli.' }
  if (!EMAIL_RE.test(eposta)) {
    return { status: 'error', field: 'eposta', message: 'Geçerli bir e-posta adresi girin. Örnek: ad@ornek.com' }
  }
  if (!mesaj) return { status: 'error', field: 'mesaj', message: 'Mesaj alanı boş bırakılamaz.' }

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="background:#0A0A0C;color:#F5F5F0;font-family:monospace;padding:40px;margin:0">
  <p style="color:#C8FF00;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 8px">
    techne lab — iletişim formu
  </p>
  <h1 style="font-size:22px;margin:0 0 28px;font-family:Georgia,serif;font-weight:400;color:#fff">
    ${esc(konu || 'Konu belirtilmedi')}
  </h1>
  <div style="border-top:2px solid #C8FF00;padding-top:22px">
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:6px 20px 6px 0;color:#888;font-weight:600">Ad Soyad:</td><td style="padding:6px 0;color:#f0f0f0">${esc(ad)}</td></tr>
      <tr><td style="padding:6px 20px 6px 0;color:#888;font-weight:600">E-posta:</td><td style="padding:6px 0;color:#f0f0f0">${esc(eposta)}</td></tr>
    </table>
    <p style="margin:24px 0 0;color:#f0f0f0;line-height:1.7;white-space:pre-wrap">${esc(mesaj)}</p>
  </div>
</body></html>`

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[iletişim] dev fallback:', { ad, eposta, konu })
      return { status: 'success' }
    }
    return {
      status: 'error',
      message: `Mesajınız iletilemedi. Lütfen doğrudan ${SITE_META.email} adresine yazın.`,
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    process.env.RESEND_FROM || 'Techne Lab İletişim <onboarding@resend.dev>',
      to:      SITE_META.email,
      replyTo: eposta,
      subject: `İletişim — ${konu || ad}`,
      html,
    })
    return { status: 'success' }
  } catch (err) {
    console.error('[iletişim] Mail gönderilemedi:', err)
    return {
      status: 'error',
      message: `Bir hata oluştu. Lütfen tekrar deneyin ya da ${SITE_META.email} adresine yazın.`,
    }
  }
}
