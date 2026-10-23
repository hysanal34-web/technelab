'use server'

import { Resend } from 'resend'
import { SITE_META } from '@/lib/data'
import { donusumuIsle } from '@/lib/olcumSunucu'
import { basvuruKaydet } from '@/lib/basvuruStore'

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

/** Kullanıcıya dönen hata metinleri. EN yalnız /en/corporate ve /en/schools formunda. */
const HATA = {
  tr: {
    ad: 'Adını yazar mısın?',
    eposta: 'E-posta adresi geçerli görünmüyor.',
    telefon: 'Telefon numaranı yazar mısın? Sana dönebilmemiz için gerekli.',
    mesaj: 'Bize iletmek istediğini yazar mısın?',
    kurum: 'Kurum ya da okul adını yazar mısınız?',
    kvkk: 'Devam etmek için KVKK metnini onaylaman gerekiyor.',
    yok: (tel: string, ep: string) => `Şu anda gönderilemedi. Bilgi için ${tel} numarasını arayabilir ya da ${ep} adresine yazabilirsin.`,
    genel: (tel: string) => `Bir şeyler ters gitti. ${tel} numarasından bize ulaşabilirsin.`,
  },
  en: {
    ad: 'Please enter your name.',
    eposta: 'That email address does not look valid.',
    telefon: 'Please enter a phone number so we can get back to you.',
    mesaj: 'Please write a short message.',
    kurum: 'Please enter your company or school name.',
    kvkk: 'Please accept the privacy notice to continue.',
    yok: (tel: string, ep: string) => `We could not send this right now. Please call ${tel} or write to ${ep}.`,
    genel: (tel: string) => `Something went wrong. Please call us on ${tel}.`,
  },
} as const

export async function submitBilgiForm(formData: FormData): Promise<BilgiFormState> {
  const name       = take(formData, 'name', 120)
  const email      = take(formData, 'email', 160)
  const phone      = take(formData, 'phone', 40)
  const occupation = take(formData, 'occupation', 160)
  const message    = take(formData, 'message', 2000)
  const kvkk       = formData.get('kvkk')
  // Reklam platformlarına e-posta/telefon özeti aktarımı için ayrı açık rıza.
  const reklamRizasi = formData.get('reklamRizasi') === 'evet'
  // Honeypot — botlar doldurur, insanlar görmez.
  const website = take(formData, 'website', 200)
  // B2B sayfalarındaki form (bkz. BilgiForm `variant`). Bilinmeyen değer genel sayılır.
  const kaynakHam  = take(formData, 'kaynak', 20)
  const kaynak: 'genel' | 'kurumsal' | 'okul' =
    kaynakHam === 'kurumsal' || kaynakHam === 'okul' ? kaynakHam : 'genel'
  const b2b        = kaynak !== 'genel'
  const dil        = take(formData, 'dil', 4) === 'en' ? 'en' : 'tr'
  const kurum      = take(formData, 'kurum', 160)
  const kisiSayisi = take(formData, 'kisiSayisi', 20)
  const h = HATA[dil]

  if (website) return { status: 'success' } // bot: sessizce yut

  if (!name) return { status: 'error', message: h.ad }
  if (!EMAIL_RE.test(email)) return { status: 'error', message: h.eposta }
  // Telefon zorunlu: numarası olmayan lead'e geri dönüş yapılamıyor.
  if (!phone) return { status: 'error', message: h.telefon }
  if (b2b && !kurum) return { status: 'error', message: h.kurum }
  // B2B'de mesaj (modül/not) isteğe bağlı: kurum adı ve telefon dönüş için yeterli.
  if (!b2b && !message) return { status: 'error', message: h.mesaj }
  if (!kvkk) return { status: 'error', message: h.kvkk }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[bilgi] RESEND_API_KEY tanımsız — form iletilemedi:', { name })
    return {
      status: 'error',
      message: h.yok(SITE_META.phone, SITE_META.email),
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
      subject: b2b
        ? `B2B ${kaynak === 'okul' ? 'Okul' : 'Kurumsal'} — ${kurum} — ${name}`
        : `İletişim — ${name}`,
      html: `
        <div style="font-family:monospace;font-size:14px;line-height:1.8">
          <strong>${b2b ? `B2B talebi (${kaynak === 'okul' ? 'okul' : 'kurumsal'}${dil === 'en' ? ', EN sayfa' : ''})` : 'Siteden yeni mesaj'}</strong><br/>
          Ad: ${esc(name)}<br/>
          E-posta: ${esc(email)}<br/>
          Telefon: ${esc(phone)}<br/>
          ${b2b
            ? `${kaynak === 'okul' ? 'Okul' : 'Kurum'}: ${esc(kurum)}<br/>
          Kişi sayısı: ${esc(kisiSayisi) || '—'}<br/>`
            : `Meslek: ${esc(occupation) || '—'}<br/>`}
          <br/>
          <strong>${b2b ? 'Modül / not' : 'Mesaj'}:</strong><br/>
          <div style="white-space:pre-wrap">${esc(message) || '—'}</div>
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

    // B2B talebi panele de düşsün (admin › başvurular, kaynak: b2b).
    // basvuruKaydet hata fırlatmaz; depo bağlı değilse sessizce false döner.
    if (b2b) {
      void basvuruKaydet({
        kaynak: 'b2b',
        program: kaynak === 'okul' ? 'Okul / kolej talebi' : 'Kurumsal talep',
        slug: kaynak === 'okul' ? 'okullar' : 'kurumsal',
        ad: name,
        email,
        telefon: phone,
        reklamRizasi,
        notlar: [
          `${kaynak === 'okul' ? 'Okul' : 'Kurum'}: ${kurum}`,
          kisiSayisi && `Kişi sayısı: ${kisiSayisi}`,
          message && `Not: ${message}`,
          dil === 'en' && 'İngilizce sayfadan',
        ].filter(Boolean).join('\n'),
      })
    }

    // Ölçüm: mesaj bize ULAŞTIKTAN sonra — gerçek, doğrulanmış iletişim.
    // Meta: Contact (tarayıcıyla aynı event_id). Rıza kapıları: olcumSunucu.ts
    await donusumuIsle({
      tur: 'iletisim',
      olaylar: ['Contact'],
      eventId: formData.get('eventId') as string | null,
      sayfa: formData.get('olaySayfasi') as string | null,
      yedekYol: b2b
        ? (kaynak === 'okul' ? (dil === 'en' ? '/en/schools' : '/okullar') : (dil === 'en' ? '/en/corporate' : '/kurumsal'))
        : '/bilgi',
      email,
      telefon: phone,
      reklamRizasi,
      ...(b2b ? { icerikAdi: `B2B ${kaynak === 'okul' ? 'Okul' : 'Kurumsal'}` } : {}),
      icerikKategorisi: b2b ? 'b2b_talep' : 'iletisim_formu',
    })

    return { status: 'success' }
  } catch (err) {
    console.error('[bilgi] Mail gönderilemedi:', err)
    return {
      status: 'error',
      message: h.genel(SITE_META.phone),
    }
  }
}
