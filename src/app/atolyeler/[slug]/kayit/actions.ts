'use server'

import { Resend } from 'resend'
import { WORKSHOPS, SITE_META } from '@/lib/data'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  field?: string
}

/** E-posta HTML'ine gömülecek kullanıcı girdisini kaçışla. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Aşırı uzun girdileri kırp — e-posta şişmesini ve spam'i engeller. */
function take(v: FormData, key: string, max = 300): string {
  return ((v.get(key) as string | null) ?? '').trim().slice(0, max)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+?90[\s-]?)?0?[\s-]?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

export async function submitRegistration(
  slug: string,
  formData: FormData
): Promise<FormState> {
  const name         = take(formData, 'name', 120)
  const email        = take(formData, 'email', 160)
  const phone        = take(formData, 'phone', 40)
  const birthDate    = take(formData, 'birthDate', 40)
  const birthYear    = take(formData, 'birthYear', 10)
  const school       = take(formData, 'school', 160)
  const location     = take(formData, 'location', 80)
  const englishLevel = take(formData, 'englishLevel', 80)
  const occupation   = take(formData, 'occupation', 160)
  const experience   = take(formData, 'experience', 2000)
  const motivation   = take(formData, 'motivation', 2000)
  const source       = take(formData, 'source', 160)
  // Veli alanları (Youth programı)
  const guardianName  = take(formData, 'guardianName', 120)
  const guardianRel   = take(formData, 'guardianRel', 80)
  const guardianPhone = take(formData, 'guardianPhone', 40)
  const guardianEmail = take(formData, 'guardianEmail', 160)
  const portfolyoLink = take(formData, 'portfolyoLink', 500)
  const kvkk          = formData.get('kvkk')
  const parentConsent = formData.get('parentConsent')

  const isYouth = slug === 'english-drama-youth'
  const contactEmail = isYouth ? guardianEmail : email
  const contactPhone = isYouth ? guardianPhone : phone

  // ── Doğrulama — hangi alanın eksik olduğunu söyle ──────────────
  if (!name)  return { status: 'error', field: 'name',  message: 'Ad soyad alanı boş bırakılamaz.' }

  if (isYouth) {
    if (!guardianName)  return { status: 'error', field: 'guardianName',  message: 'Veli adı soyadı gerekli.' }
    if (!guardianEmail) return { status: 'error', field: 'guardianEmail', message: 'Veli e-posta adresi gerekli.' }
    if (!guardianPhone) return { status: 'error', field: 'guardianPhone', message: 'Veli telefon numarası gerekli.' }
    if (!parentConsent) {
      return { status: 'error', field: 'parentConsent', message: 'Veli onayı olmadan başvuru alınamaz. Lütfen onay kutusunu işaretleyin.' }
    }
  } else {
    if (!email) return { status: 'error', field: 'email', message: 'E-posta adresi gerekli.' }
    if (!phone) return { status: 'error', field: 'phone', message: 'Telefon numarası gerekli.' }
  }

  if (!EMAIL_RE.test(contactEmail)) {
    return {
      status: 'error',
      field: isYouth ? 'guardianEmail' : 'email',
      message: 'Geçerli bir e-posta adresi girin. Örnek: ad@ornek.com',
    }
  }

  if (!PHONE_RE.test(contactPhone.replace(/[()]/g, ''))) {
    return {
      status: 'error',
      field: isYouth ? 'guardianPhone' : 'phone',
      message: 'Geçerli bir cep telefonu girin. Örnek: 0555 123 45 67',
    }
  }

  // Youth: 14–17 yaş kontrolü
  if (isYouth && birthDate) {
    const d = new Date(birthDate)
    if (!Number.isNaN(d.getTime())) {
      const age = Math.floor((Date.now() - d.getTime()) / 31557600000)
      if (age < 14 || age > 17) {
        return {
          status: 'error',
          field: 'birthDate',
          message: `Bu program 14–17 yaş grubuna yönelik. Girilen doğum tarihine göre yaş ${age}. Farklı bir program için bize yazabilirsiniz.`,
        }
      }
    }
  }

  if (!kvkk) {
    return { status: 'error', field: 'kvkk', message: 'Devam etmek için KVKK aydınlatma metnini onaylamanız gerekiyor.' }
  }

  const workshop = WORKSHOPS.find((w) => w.slug === slug)
  const programName = workshop ? `${workshop.title} — ${workshop.sub}` : slug
  const stamp = new Date().toISOString()

  // ── E-posta tablosu ────────────────────────────────────────────
  const row = (k: string, v: string): [string, string] => [k, v]
  const rows: [string, string][] = [
    row(isYouth ? 'Öğrenci Adı Soyadı' : 'Ad Soyad', name),
    ...(birthDate    ? [row('Doğum Tarihi',       birthDate)]    : []),
    ...(birthYear    ? [row('Doğum Yılı',         birthYear)]    : []),
    ...(school       ? [row('Okul / Sınıf',       school)]       : []),
    ...(location     ? [row('Lokasyon Tercihi',   location)]     : []),
    ...(englishLevel ? [row('İngilizce Seviyesi', englishLevel)] : []),
    ...(email        ? [row('E-posta',            email)]        : []),
    ...(phone        ? [row('Telefon',            phone)]        : []),
    ...(occupation   ? [row('Meslek',             occupation)]   : []),
    ...(experience   ? [row('Deneyim',            experience)]   : []),
    ...(motivation   ? [row('Motivasyon',         motivation)]   : []),
    ...(source       ? [row('Nasıl Duydu',        source)]       : []),
    ...(guardianName  ? [row('Veli Adı Soyadı', guardianName)]  : []),
    ...(guardianRel   ? [row('Veli Yakınlığı',  guardianRel)]   : []),
    ...(guardianPhone ? [row('Veli Telefon',    guardianPhone)] : []),
    ...(guardianEmail ? [row('Veli E-posta',    guardianEmail)] : []),
    ...(portfolyoLink ? [row('Portfolyo / Drive Linki', portfolyoLink)] : []),
    // Onay kayıtları — KVKK denetiminde kanıt niteliğinde
    row('KVKK Onayı', `Evet — ${stamp}`),
    ...(isYouth ? [row('Veli Onayı', `Evet — ${stamp}`)] : []),
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
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0A0A0C;color:#F5F5F0;font-family:monospace;padding:40px;margin:0">
  <p style="color:#C8FF00;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 8px">
    techne lab — yeni başvuru
  </p>
  <h1 style="font-size:24px;margin:0 0 32px;font-family:Georgia,serif;font-weight:400;color:#fff">
    ${esc(programName)}
  </h1>
  <div style="border-top:2px solid #C8FF00;padding-top:24px">
    <table style="border-collapse:collapse;width:100%;max-width:560px">
      ${tableRows}
    </table>
  </div>
  <p style="margin:40px 0 0;font-size:11px;color:#666;letter-spacing:0.1em">
    ${domain} · ${new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
  </p>
</body>
</html>`

  // ── Gönderim ───────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    // Yalnızca yerel geliştirmede sessizce başarılı say.
    if (process.env.NODE_ENV !== 'production') {
      console.log('[kayıt] RESEND_API_KEY yok — dev fallback:', { slug, name })
      return { status: 'success' }
    }
    // Production'da asla "başarılı" deme — başvuru sessizce kaybolmasın.
    console.error('[kayıt] RESEND_API_KEY tanımsız — başvuru gönderilemedi:', { slug, name })
    return {
      status: 'error',
      message: `Başvurunuz şu anda iletilemedi. Lütfen bilgilerinizi ${SITE_META.email} adresine doğrudan gönderin — sizi kaybetmek istemiyoruz.`,
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from:    process.env.RESEND_FROM || 'Techne Lab Başvuru <onboarding@resend.dev>',
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
      message: `Bir hata oluştu. Lütfen tekrar deneyin ya da doğrudan ${SITE_META.email} adresine yazın.`,
    }
  }
}
