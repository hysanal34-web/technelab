'use server'

import { Resend } from 'resend'
import { headers, cookies } from 'next/headers'
import { SITE_META } from '@/lib/data'
import { sendCapiEvent, newEventId } from '@/lib/metaCapi'
import { TANISMA_SESSIONS } from './sessions'

export type TanismaFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  field?: string
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
function take(v: FormData, key: string, max = 300): string {
  return ((v.get(key) as string | null) ?? '').trim().slice(0, max)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+?90[\s-]?)?0?[\s-]?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

export async function submitTanisma(formData: FormData): Promise<TanismaFormState> {
  const name         = take(formData, 'name', 120)
  const email        = take(formData, 'email', 160)
  const phone        = take(formData, 'phone', 40)
  const birthYear    = take(formData, 'birthYear', 10)
  const occupation   = take(formData, 'occupation', 160)
  const session      = take(formData, 'session', 40)
  const englishLevel = take(formData, 'englishLevel', 40)
  const experience   = take(formData, 'experience', 2000)
  const motivation   = take(formData, 'motivation', 2000)
  const source       = take(formData, 'source', 160)
  const kvkk         = formData.get('kvkk')
  const iletisimIzni = formData.get('iletisimIzni') === 'evet'
  // Veli alanları (Youth)
  const guardianName  = take(formData, 'guardianName', 120)
  const guardianPhone = take(formData, 'guardianPhone', 40)
  const guardianEmail = take(formData, 'guardianEmail', 160)
  const parentConsent = formData.get('parentConsent')

  const sessionObj = TANISMA_SESSIONS.find((s) => s.id === session)
  if (!sessionObj) return { status: 'error', field: 'session', message: 'Hangi programın tanışma gününe katılacağınızı seçin.' }
  const isYouth = sessionObj.youth

  if (!name) return { status: 'error', field: 'name', message: isYouth ? 'Öğrencinin adı soyadı gerekli.' : 'Ad soyad alanı boş bırakılamaz.' }

  // İletişim: Youth'ta veli, diğerlerinde katılımcı
  const contactEmail = isYouth ? guardianEmail : email
  const contactPhone = isYouth ? guardianPhone : phone
  if (isYouth) {
    if (!guardianName)  return { status: 'error', field: 'guardianName',  message: 'Veli adı soyadı gerekli.' }
    if (!guardianEmail) return { status: 'error', field: 'guardianEmail', message: 'Veli e-posta adresi gerekli.' }
    if (!guardianPhone) return { status: 'error', field: 'guardianPhone', message: 'Veli telefon numarası gerekli.' }
    if (!parentConsent) return { status: 'error', field: 'parentConsent', message: 'Veli onayı olmadan kayıt alınamaz.' }
  } else {
    if (!email) return { status: 'error', field: 'email', message: 'E-posta adresi gerekli.' }
    if (!phone) return { status: 'error', field: 'phone', message: 'Telefon numarası gerekli.' }
  }
  if (!EMAIL_RE.test(contactEmail)) {
    return { status: 'error', field: isYouth ? 'guardianEmail' : 'email', message: 'Geçerli bir e-posta adresi girin. Örnek: ad@ornek.com' }
  }
  if (!PHONE_RE.test(contactPhone.replace(/[()]/g, ''))) {
    return { status: 'error', field: isYouth ? 'guardianPhone' : 'phone', message: 'Geçerli bir cep telefonu girin. Örnek: 0555 123 45 67' }
  }

  if (!birthYear) return { status: 'error', field: 'birthYear', message: 'Doğum yılı gerekli.' }
  const y = Number(birthYear)
  const thisYear = new Date().getFullYear()
  if (!Number.isInteger(y) || y < 1950 || y > thisYear) {
    return { status: 'error', field: 'birthYear', message: `Doğum yılını 1950–${thisYear} aralığında girin.` }
  }
  const age = thisYear - y
  if (age < sessionObj.minAge || (sessionObj.maxAge !== undefined && age > sessionObj.maxAge)) {
    const range = sessionObj.maxAge !== undefined ? `${sessionObj.minAge}–${sessionObj.maxAge}` : `${sessionObj.minAge}+`
    return { status: 'error', field: 'birthYear', message: `${sessionObj.program} ${range} yaş aralığına yönelik. Farklı bir program için bize yazabilirsiniz.` }
  }

  if (!isYouth && !occupation) return { status: 'error', field: 'occupation', message: 'Meslek / çalışma alanı gerekli.' }
  if (sessionObj.english && !englishLevel) return { status: 'error', field: 'englishLevel', message: 'İngilizce seviyenizi seçin.' }
  if (!kvkk) {
    return { status: 'error', field: 'kvkk', message: 'Devam etmek için KVKK aydınlatma metnini onaylamanız gerekiyor.' }
  }

  const stamp = new Date().toISOString()
  const r = (k: string, v: string): [string, string] => [k, v]
  const rows: [string, string][] = [
    r('Tanışma Günü', sessionObj.label),
    r(isYouth ? 'Öğrenci Adı Soyadı' : 'Ad Soyad', name),
    r('Doğum Yılı', birthYear),
    ...(email        ? [r('E-posta', email)] : []),
    ...(phone        ? [r('Telefon', phone)] : []),
    ...(occupation   ? [r(isYouth ? 'Okul / Sınıf' : 'Meslek', occupation)] : []),
    ...(englishLevel ? [r('İngilizce Seviyesi', englishLevel)] : []),
    ...(guardianName  ? [r('Veli Adı Soyadı', guardianName)] : []),
    ...(guardianPhone ? [r('Veli Telefon', guardianPhone)] : []),
    ...(guardianEmail ? [r('Veli E-posta', guardianEmail)] : []),
    ...(experience ? [r('Sahne Deneyimi', experience)] : []),
    ...(motivation ? [r('Beklenti', motivation)] : []),
    ...(source     ? [r('Nasıl Duydu', source)] : []),
    r('KVKK Onayı', `Evet — ${stamp}`),
    r('İletişim İzni (duyuru)', iletisimIzni ? `Evet — ${stamp}` : 'Hayır'),
    ...(isYouth ? [r('Veli Onayı', `Evet — ${stamp}`)] : []),
  ]

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:6px 20px 6px 0;color:#888;white-space:nowrap;vertical-align:top;font-weight:600">${esc(k)}:</td>
          <td style="padding:6px 0;color:#f0f0f0">${esc(v).replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('')

  const domain = SITE_META.url.replace(/^https?:\/\//, '')
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="background:#0A0A0C;color:#F5F5F0;font-family:monospace;padding:40px;margin:0">
  <p style="color:#C8FF00;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 8px">
    techne lab — tanışma günü kaydı
  </p>
  <h1 style="font-size:24px;margin:0 0 32px;font-family:Georgia,serif;font-weight:400;color:#fff">
    ${esc(sessionObj.program)} — Ücretsiz Tanışma
  </h1>
  <div style="border-top:2px solid #C8FF00;padding-top:24px">
    <table style="border-collapse:collapse;width:100%;max-width:560px">${tableRows}</table>
  </div>
  <p style="margin:40px 0 0;font-size:11px;color:#666;letter-spacing:0.1em">
    ${domain} · ${new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
  </p>
</body></html>`

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[tanışma] RESEND_API_KEY yok — dev fallback:', { name, session })
      return { status: 'success' }
    }
    console.error('[tanışma] RESEND_API_KEY tanımsız — kayıt gönderilemedi:', { name })
    return {
      status: 'error',
      message: `Kaydınız şu anda iletilemedi. Lütfen bilgilerinizi ${SITE_META.email} adresine doğrudan gönderin.`,
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    process.env.RESEND_FROM || 'Techne Lab Başvuru <onboarding@resend.dev>',
      to:      SITE_META.email,
      replyTo: contactEmail,
      subject: `Tanışma Günü — ${sessionObj.program} — ${name}`,
      html,
    })

    // Meta CAPI — ücretsiz etkinlik kaydı; değer yok, sadece Lead sinyali.
    try {
      const h = await headers()
      const c = await cookies()
      await sendCapiEvent({
        eventName: 'Lead',
        eventId: newEventId(),
        eventSourceUrl: `${SITE_META.url}/tanisma-gunu`,
        email: contactEmail,
        phone: contactPhone,
        fbp: c.get('_fbp')?.value,
        fbc: c.get('_fbc')?.value,
        clientIp: h.get('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: h.get('user-agent') ?? undefined,
        contentName: `Tanışma Günü — ${sessionObj.program}`,
        contentId: `tanisma-gunu-${sessionObj.id}`,
      })
    } catch (err) {
      console.error('[tanışma] CAPI atlandı:', err)
    }

    return { status: 'success' }
  } catch (err) {
    console.error('[tanışma] Mail gönderilemedi:', err)
    return {
      status: 'error',
      message: `Bir hata oluştu. Lütfen tekrar deneyin ya da doğrudan ${SITE_META.email} adresine yazın.`,
    }
  }
}
