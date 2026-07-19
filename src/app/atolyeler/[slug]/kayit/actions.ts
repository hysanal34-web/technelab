'use server'

import nodemailer from 'nodemailer'
import { WORKSHOPS, SITE_META } from '@/lib/data'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitRegistration(
  slug: string,
  formData: FormData
): Promise<FormState> {
  const name       = (formData.get('name')       as string | null)?.trim() ?? ''
  const email      = (formData.get('email')      as string | null)?.trim() ?? ''
  const phone      = (formData.get('phone')      as string | null)?.trim() ?? ''
  const birthDate  = (formData.get('birthDate')  as string | null)?.trim() ?? ''
  const birthYear  = (formData.get('birthYear')  as string | null)?.trim() ?? ''
  const school     = (formData.get('school')     as string | null)?.trim() ?? ''
  const location   = (formData.get('location')   as string | null)?.trim() ?? ''
  const englishLevel = (formData.get('englishLevel') as string | null)?.trim() ?? ''
  const occupation = (formData.get('occupation') as string | null)?.trim() ?? ''
  const experience = (formData.get('experience') as string | null)?.trim() ?? ''
  const motivation = (formData.get('motivation') as string | null)?.trim() ?? ''
  const source     = (formData.get('source')     as string | null)?.trim() ?? ''
  // Guardian fields (Youth program)
  const guardianName  = (formData.get('guardianName')  as string | null)?.trim() ?? ''
  const guardianRel   = (formData.get('guardianRel')   as string | null)?.trim() ?? ''
  const guardianPhone = (formData.get('guardianPhone') as string | null)?.trim() ?? ''
  const guardianEmail = (formData.get('guardianEmail') as string | null)?.trim() ?? ''
  const kvkk       = formData.get('kvkk')

  // Youth: validate guardian too
  const isYouth = slug === 'english-drama-youth'
  const contactEmail = isYouth ? guardianEmail : email
  const contactPhone = isYouth ? guardianPhone : phone
  const contactName  = isYouth ? guardianName  : name

  if (!name || !kvkk) {
    return { status: 'error', message: 'Lütfen zorunlu alanları doldurun.' }
  }
  if (!isYouth && (!email || !phone)) {
    return { status: 'error', message: 'Lütfen zorunlu alanları doldurun.' }
  }
  if (isYouth && (!guardianEmail || !guardianPhone)) {
    return { status: 'error', message: 'Lütfen veli iletişim bilgilerini doldurun.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailToCheck = isYouth ? guardianEmail : email
  if (emailToCheck && !emailRegex.test(emailToCheck)) {
    return { status: 'error', message: 'Geçerli bir e-posta adresi girin.' }
  }

  const workshop = WORKSHOPS.find((w) => w.slug === slug)
  const programName = workshop
    ? `${workshop.title} — ${workshop.sub}`
    : slug

  // Build HTML table rows
  const rows: [string, string][] = [
    ['Öğrenci Adı Soyadı', name],
    ...(birthDate    ? [['Doğum Tarihi',      birthDate]    as [string, string]] : []),
    ...(birthYear    ? [['Doğum Yılı',        birthYear]    as [string, string]] : []),
    ...(school       ? [['Okul / Sınıf',      school]       as [string, string]] : []),
    ...(location     ? [['Lokasyon Tercihi',  location]     as [string, string]] : []),
    ...(englishLevel ? [['İngilizce Seviyesi', englishLevel] as [string, string]] : []),
    ...(email        ? [['E-posta',           email]        as [string, string]] : []),
    ...(phone        ? [['Telefon',           phone]        as [string, string]] : []),
    ...(occupation   ? [['Meslek',            occupation]   as [string, string]] : []),
    ...(experience   ? [['Deneyim',           experience]   as [string, string]] : []),
    ...(motivation   ? [['Motivasyon',        motivation]   as [string, string]] : []),
    ...(source       ? [['Nasıl Duydu',       source]       as [string, string]] : []),
    // Guardian
    ...(guardianName  ? [['Veli Adı Soyadı', guardianName]  as [string, string]] : []),
    ...(guardianRel   ? [['Veli Yakınlığı',  guardianRel]   as [string, string]] : []),
    ...(guardianPhone ? [['Veli Telefon',    guardianPhone] as [string, string]] : []),
    ...(guardianEmail ? [['Veli E-posta',    guardianEmail] as [string, string]] : []),
  ]

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:6px 20px 6px 0;color:#888;white-space:nowrap;vertical-align:top;font-weight:600">${k}:</td>
          <td style="padding:6px 0;color:#f0f0f0">${v.replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0A0A0C;color:#F5F5F0;font-family:monospace;padding:40px;margin:0">
  <p style="color:#C8FF00;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 8px">
    techne lab — yeni başvuru
  </p>
  <h1 style="font-size:24px;margin:0 0 32px;font-family:Georgia,serif;font-weight:400;color:#fff">
    ${programName}
  </h1>
  <div style="border-top:2px solid #C8FF00;padding-top:24px">
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      ${tableRows}
    </table>
  </div>
  <p style="margin:40px 0 0;font-size:10px;color:#444;letter-spacing:0.1em">
    technelab.ist · ${new Date().toLocaleDateString('tr-TR', { day:'2-digit', month:'long', year:'numeric' })}
  </p>
</body>
</html>`

  // Dev fallback — log and succeed when env vars not configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('[kayıt] E-posta yok — konsola yazdı:', { slug, name, email, phone })
    return { status: 'success' }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from:    `"Techne Lab Başvuru" <${process.env.GMAIL_USER}>`,
      to:      SITE_META.email,
      replyTo: contactEmail || email,
      subject: `Yeni Başvuru — ${programName}`,
      html,
    })

    return { status: 'success' }
  } catch (err) {
    console.error('[kayıt] Mail gönderilemedi:', err)
    return {
      status: 'error',
      message: 'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan bize e-posta gönderin.',
    }
  }
}
