'use server'

import { Resend } from 'resend'
import { SITE_META } from '@/lib/data'

/**
 * Fiyat & Program Bilgisi formu.
 *
 * Akış: ziyaretçi bilgilerini bırakır → ona program içeriği + güncel fiyat
 * tablosu maille gider → bize lead bildirimi düşer → kişi Resend audience'a
 * (LEADS listesi) eklenir. Fiyat sitede bilinçli olarak gizli; bu form,
 * fiyatı "kaybolan ziyaretçi"ye değil "ulaşabildiğimiz kişiye" gösterir.
 *
 * Lead veritabanı: RESEND_LEADS_AUDIENCE_ID (yoksa RESEND_AUDIENCE_ID'ye,
 * o da yoksa yalnızca maillere düşer). Resend panelinden CSV alınabilir.
 */

export type BilgiFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
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
export async function submitBilgiForm(formData: FormData): Promise<BilgiFormState> {
  const name       = take(formData, 'name', 120)
  const email      = take(formData, 'email', 160)
  const phone      = take(formData, 'phone', 40)
  const occupation = take(formData, 'occupation', 160)
  const message    = take(formData, 'message', 2000)
  const kvkk       = formData.get('kvkk')
  // Honeypot — botlar doldurur, insanlar görmez.
  const website = take(formData, 'website', 200)

  if (website) return { status: 'success' } // bot: sessizce yut

  if (!name) return { status: 'error', message: 'Adını yazar mısın?' }
  if (!EMAIL_RE.test(email)) return { status: 'error', message: 'E-posta adresi geçerli görünmüyor.' }
  // Telefon zorunlu: numarası olmayan lead'e geri dönüş yapılamıyor.
  if (!phone) return { status: 'error', message: 'Telefon numaranı yazar mısın? Sana dönebilmemiz için gerekli.' }
  if (!message) return { status: 'error', message: 'Bize iletmek istediğini yazar mısın?' }
  if (!kvkk) return { status: 'error', message: 'Devam etmek için KVKK metnini onaylaman gerekiyor.' }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[bilgi] RESEND_API_KEY tanımsız — form iletilemedi:', { name })
    return {
      status: 'error',
      message: `Şu anda gönderilemedi. Bilgi için ${SITE_META.phone} numarasını arayabilir ya da ${SITE_META.email} adresine yazabilirsin.`,
    }
  }

  const resend = new Resend(apiKey)
  const from = process.env.RESEND_FROM || 'Techne Lab <onboarding@resend.dev>'

  try {
    // 1 — ÖNCE bize lead bildirimi.
    // Sıra kritik: kullanıcıya giden mail (yabancı bir adrese, bounce olabilir)
    // başarısız olursa lead bildirimi de düşmesin. Lead kaybı en pahalı hata.
    await resend.emails.send({
      from,
      to: SITE_META.email,
      replyTo: email,
      subject: `İletişim — ${name}`,
      html: `
        <div style="font-family:monospace;font-size:14px;line-height:1.8">
          <strong>Siteden yeni mesaj</strong><br/>
          Ad: ${esc(name)}<br/>
          E-posta: ${esc(email)}<br/>
          Telefon: ${esc(phone)}<br/>
          Meslek: ${esc(occupation) || '—'}<br/>
          <br/>
          <strong>Mesaj:</strong><br/>
          <div style="white-space:pre-wrap">${esc(message)}</div>
        </div>`,
    })

    // Otomatik ücret/program maili kaldırıldı: fiyat artık yalnızca telefonda
    // ve WhatsApp'ta paylaşılıyor. Sitede ve otomatik mailde rakam yok.

    // 2 — Lead veritabanı: Resend audience (varsa)
    const audienceId = process.env.RESEND_LEADS_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      // Hata fırlatırsa akışı bozmasın — mail zaten gitti.
      const [first, ...rest] = name.split(' ')
      await resend.contacts
        .create({ email, firstName: first, lastName: rest.join(' ') || undefined, audienceId, unsubscribed: false })
        .catch((e) => console.error('[bilgi] audience kaydı başarısız:', e))
    }

    return { status: 'success' }
  } catch (err) {
    console.error('[bilgi] Mail gönderilemedi:', err)
    return {
      status: 'error',
      message: `Bir şeyler ters gitti. ${SITE_META.phone} numarasından bize ulaşabilirsin.`,
    }
  }
}
