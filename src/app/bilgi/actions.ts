'use server'

import { Resend } from 'resend'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { priceSummary } from '@/lib/erkenKayit'

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
const TL = (n: number) => `${n.toLocaleString('tr-TR')} ₺`

/** Programın fiyat satırları — mail tablosu için. */
function priceRows(w: (typeof WORKSHOPS)[number]): [string, string][] {
  const rows: [string, string][] = []
  const p = priceSummary(w)
  if (!w.price) {
    rows.push(['Fiyat', 'Ön kayıt döneminde — netleşince ilk size haber veririz'])
    return rows
  }
  if (p && p.current < w.price) {
    rows.push(['Güncel fiyat', `${TL(p.current)} — KDV dahil (${p.urgency ?? 'indirimli dönem'})`])
    rows.push(['Liste fiyatı', `${TL(w.price)} — KDV dahil`])
  } else {
    rows.push(['Program ücreti', `${TL(w.price)} — KDV dahil`])
  }
  if (w.priceCash) rows.push(['Peşin / havale', `${TL(w.priceCash)} — KDV dahil`])
  if (w.monthlyPrice) rows.push(['Aylık ödeme', `${TL(w.monthlyPrice)} / ay — KDV dahil`])
  rows.push(['Ödeme', 'Kredi kartına taksit seçenekleri mevcuttur'])
  if (w.earlyBirdDeadline) rows.push(['Erken kayıt son tarih', w.earlyBirdDeadline])
  return rows
}

/** Kullanıcıya giden mail — program içeriği + fiyat tablosu. */
function infoMailHtml(w: (typeof WORKSHOPS)[number], name: string): string {
  const rows = priceRows(w)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;color:#666;font-size:13px">${k}</td><td style="padding:8px 12px;border:1px solid #e5e5e5;font-size:14px"><strong>${v}</strong></td></tr>`
    )
    .join('')

  const blocks = (w.blocks ?? [])
    .slice(0, 4)
    .map(
      (b) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e5e5;font-size:13px"><strong>${esc(b.title)}</strong><br/><span style="color:#666">${esc(b.body.slice(0, 200))}${b.body.length > 200 ? '…' : ''}</span></td></tr>`
    )
    .join('')

  const meta = [
    ['Süre', w.duration],
    ['Mekân', w.venue],
    ['Kontenjan', typeof w.maxStudents === 'number' ? `en fazla ${w.maxStudents} kişi` : '—'],
    w.instructor && w.instructor !== 'Techne Lab' ? ['Eğitmen', w.instructor] : null,
  ]
    .filter((r): r is [string, string] => !!r)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;color:#666;font-size:13px">${k}</td><td style="padding:8px 12px;border:1px solid #e5e5e5;font-size:14px">${esc(v)}</td></tr>`
    )
    .join('')

  const url = `${SITE_META.url}/atolyeler/${w.slug}`
  return `
  <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
    <div style="background:#0A0A0C;padding:24px;text-align:center">
      <span style="font-family:Georgia,serif;letter-spacing:3px;color:#F5F5F0;font-size:20px">TECHNE LAB <span style="color:#C8FF00">İSTANBUL</span></span>
    </div>
    <div style="padding:28px 24px">
      <p style="font-size:15px">Merhaba ${esc(name) || 'merhaba'},</p>
      <p style="font-size:14px;line-height:1.6"><strong>${esc(w.title)} — ${esc(w.sub)}</strong> programıyla ilgilendiğin için teşekkürler. İstediğin bilgiler aşağıda.</p>

      <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#666;margin:24px 0 8px">Program</h3>
      <table style="border-collapse:collapse;width:100%">${meta}</table>

      <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#666;margin:24px 0 8px">Ücret &amp; Ödeme</h3>
      <table style="border-collapse:collapse;width:100%">${rows}</table>

      ${blocks ? `<h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#666;margin:24px 0 8px">İçerik</h3><table style="border-collapse:collapse;width:100%">${blocks}</table>` : ''}

      <div style="margin:28px 0;text-align:center">
        <a href="${url}/kayit" style="background:#C8FF00;color:#0A0A0C;padding:13px 32px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;display:inline-block">Başvur</a>
      </div>
      <p style="font-size:13px;color:#666;line-height:1.6">
        Soruların için bu maile yanıt verebilir ya da doğrudan arayabilirsin:<br/>
        <a href="tel:${SITE_META.phoneE164}" style="color:#111"><strong>${SITE_META.phone}</strong></a> · <a href="${url}" style="color:#111">${url.replace('https://', '')}</a>
      </p>
    </div>
    <div style="background:#f5f5f0;padding:16px 24px;font-size:11px;color:#999;text-align:center">
      Bu maili, sitemizdeki bilgi formunu doldurduğun için aldın. Techne Lab İstanbul — Pera &amp; Kadıköy
    </div>
  </div>`
}

export async function submitBilgiForm(formData: FormData): Promise<BilgiFormState> {
  const name    = take(formData, 'name', 120)
  const email   = take(formData, 'email', 160)
  const phone   = take(formData, 'phone', 40)
  const slug    = take(formData, 'program', 80)
  const kvkk    = formData.get('kvkk')
  // Honeypot — botlar doldurur, insanlar görmez.
  const website = take(formData, 'website', 200)

  if (website) return { status: 'success' } // bot: sessizce yut

  if (!name) return { status: 'error', message: 'Adını yazar mısın?' }
  if (!EMAIL_RE.test(email)) return { status: 'error', message: 'E-posta adresi geçerli görünmüyor.' }
  if (!slug) return { status: 'error', message: 'Hangi programla ilgilendiğini seç.' }
  if (!kvkk) return { status: 'error', message: 'Devam etmek için KVKK metnini onaylaman gerekiyor.' }

  const w = WORKSHOPS.find((x) => x.slug === slug)
  if (!w) return { status: 'error', message: 'Program bulunamadı — sayfayı yenileyip tekrar dener misin?' }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[bilgi] RESEND_API_KEY tanımsız — form iletilemedi:', { slug, name })
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
      subject: `Bilgi İsteği — ${w.title} — ${name}`,
      html: `
        <div style="font-family:monospace;font-size:14px;line-height:1.8">
          <strong>Yeni bilgi isteği (lead)</strong><br/>
          Program: ${esc(w.title)} (${esc(slug)})<br/>
          Ad: ${esc(name)}<br/>
          E-posta: ${esc(email)}<br/>
          Telefon: ${esc(phone) || '—'}<br/>
        </div>`,
    })

    // 2 — Kullanıcıya fiyat & içerik maili.
    // Bu adım kırılgan (alıcı adresi bizim kontrolümüzde değil); patlarsa
    // logla ve devam et — lead bildirimi yukarıda zaten gitti.
    await resend.emails
      .send({
        from,
        to: email,
        replyTo: SITE_META.email,
        subject: `${w.title} — Program Bilgisi & Ücretler | Techne Lab`,
        html: infoMailHtml(w, name),
      })
      .catch((e) => console.error('[bilgi] Kullanıcıya bilgi maili gönderilemedi:', email, e))

    // 3 — Lead veritabanı: Resend audience (varsa)
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
