'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import Link from 'next/link'
import { submitBilgiForm, type BilgiFormState } from '@/app/bilgi/actions'
import { trackBilgiTalebi, newBrowserEventId, olaySayfasi } from '@/components/MetaPixel'
import { SITE_META } from '@/lib/data'

const INPUT =
  'w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon transition-colors duration-200'

/**
 * Genel iletişim formu.
 *
 * Program ve ücret soruları buraya değil WhatsApp'a yönlendiriliyor — fiyat
 * hiçbir otomatik kanalda paylaşılmıyor. Bu form soru, öneri, iş birliği gibi
 * serbest mesajlar için; mesaj doğrudan bize düşüyor, otomatik yanıt gitmiyor.
 */
type Variant = 'genel' | 'kurumsal' | 'okul'
type Dil = 'tr' | 'en'

/** Etiketler. EN yalnız B2B sayfalarında (/en/corporate, /en/schools) kullanılıyor. */
const METIN = {
  tr: {
    ad: 'ad soyad', eposta: 'e-posta', telefon: 'telefon', istege: '(isteğe bağlı)',
    meslek: 'meslek', kurumsal: 'kurum adı', okul: 'okul adı',
    kisi: 'kişi sayısı', kisiPh: 'örn. 12',
    kurumPhK: 'Şirket ya da kurum', kurumPhO: 'Okul ya da kolej',
    mesajGenel: 'bize ne iletmek istersin?', mesajB2B: 'ilgilendiğiniz modül ya da notunuz',
    mesajPhGenel: 'Soru, öneri, iş birliği teklifi ya da aklından geçen herhangi bir şey…',
    mesajPhB2B: 'Modül, tarih aralığı, kademe ya da aklınızdaki herhangi bir not…',
    adPh: 'Adın Soyadın',
    kvkkLink: 'KVKK aydınlatma metnini', kvkkSon: 'okudum; bilgilerimin bana geri dönüş yapılması amacıyla işlenmesine onay veriyorum.',
    reklam: 'Reklam ölçümü için e-posta ve telefonumun şifrelenerek Meta ve Google\'a aktarılmasına izin veriyorum.',
    reklamNot: 'İsteğe bağlı. İşaretlemezsen mesajın aynen iletilir.',
    gonder: 'mesajı gönder →', gonderiliyor: 'gönderiliyor…',
    basariUst: 'gönderildi ✓', basari: 'Mesajınız alınmıştır. Ekibimiz sizinle en kısa zamanda iletişime geçecektir.',
    formGenel: 'İletişim formu', formB2B: 'Kurumsal talep formu',
  },
  en: {
    ad: 'full name', eposta: 'email', telefon: 'phone', istege: '(optional)',
    meslek: 'occupation', kurumsal: 'company name', okul: 'school name',
    kisi: 'number of participants', kisiPh: 'e.g. 12',
    kurumPhK: 'Company or organisation', kurumPhO: 'School or college',
    mesajGenel: 'what would you like to tell us?', mesajB2B: 'module you are interested in, or a note',
    mesajPhGenel: 'A question, a suggestion, a collaboration idea…',
    mesajPhB2B: 'Module, preferred dates, year groups or any other note…',
    adPh: 'Your name',
    kvkkLink: 'I have read the privacy notice (KVKK)', kvkkSon: 'and consent to my details being processed so that you can get back to me.',
    reklam: 'I allow my email and phone number to be hashed and shared with Meta and Google for ad measurement.',
    reklamNot: 'Optional. Your message is sent either way.',
    gonder: 'send →', gonderiliyor: 'sending…',
    basariUst: 'sent ✓', basari: 'Thank you. We have received your message and will get back to you shortly.',
    formGenel: 'Contact form', formB2B: 'Enquiry form',
  },
} as const

export function BilgiForm({
  compact = false,
  variant = 'genel',
  lang = 'tr',
}: {
  compact?: boolean
  /** 'kurumsal' | 'okul': B2B sayfaları. Kurum/okul adı ve kişi sayısı sorulur, meslek sorulmaz. */
  variant?: Variant
  lang?: Dil
}) {
  const [state, setState] = useState<BilgiFormState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const basariRef = useRef<HTMLParagraphElement>(null)
  const t = METIN[lang]
  const b2b = variant !== 'genel'

  useEffect(() => {
    if (state.status === 'success') basariRef.current?.focus()
  }, [state.status])

  // Geçersiz ya da pasif slug geldiyse select'e düş — form çıkmaza girmesin.

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    // Piksel ve CAPI aynı kimliği taşısın — yoksa Meta tek mesajı iki sayar.
    const eventId = newBrowserEventId()
    fd.append('eventId', eventId)
    fd.append('olaySayfasi', olaySayfasi())
    startTransition(async () => {
      const res = await submitBilgiForm(fd)
      setState(res)
      if (res.status === 'success') {
        // Başvurudan ayrı bir olay: bkz. trackBilgiTalebi açıklaması.
        // B2B talebi de sunucuda `Contact` olarak gidiyor (aynı event_id);
        // ayrımı sunucudaki içerik kategorisi `b2b_talep` ve form adı yapıyor.
        trackBilgiTalebi(eventId)
        formRef.current?.reset()
      }
    })
  }

  if (state.status === 'success') {
    return (
      <div className="border border-neon p-6 md:p-8" role="status">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-2">{t.basariUst}</span>
        <p ref={basariRef} tabIndex={-1} className="text-fg text-[15px] leading-relaxed focus:outline-none">
          {t.basari}
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" aria-label={b2b ? t.formB2B : t.formGenel} data-olcum-form={b2b ? 'b2b_talep' : 'iletisim_formu'}>
      {!compact && (
        <>
          <p className="text-stone text-[14px] leading-relaxed">
            Bize iletmek istediğin her şey için: soru, öneri, iş birliği. Mesajın doğrudan bize düşüyor.
          </p>
          <div className="border border-border bg-neon/10 px-4 py-3">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon mb-1">
              programlar ve ücretler için
            </p>
            <p className="font-mono text-[11px] text-stone leading-relaxed">
              Program içerikleri, kontenjan ve ücret bilgisi için WhatsApp&apos;tan yazman en hızlısı —{' '}
              <a
                href={`https://wa.me/${SITE_META.phoneE164.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon underline underline-offset-2 hover:text-fg transition-colors"
              >
                {SITE_META.phone}
              </a>
            </p>
          </div>
        </>
      )}

      {/* Honeypot — insanlar görmez, botlar doldurur */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input type="hidden" name="kaynak" value={variant} />
      <input type="hidden" name="dil" value={lang} />

      <div className={compact ? 'space-y-4' : 'grid md:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor="bilgi-name" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            {t.ad} *
          </label>
          <input id="bilgi-name" name="name" required maxLength={120} autoComplete="name" className={INPUT} placeholder={t.adPh} />
        </div>
        <div>
          <label htmlFor="bilgi-email" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            {t.eposta} *
          </label>
          <input id="bilgi-email" name="email" type="email" required maxLength={160} autoComplete="email" className={INPUT} placeholder="ornek@mail.com" />
        </div>
        <div>
          <label htmlFor="bilgi-phone" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            {t.telefon} <span className="text-neon" aria-hidden="true">*</span>
          </label>
          <input id="bilgi-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={INPUT} placeholder="05xx xxx xx xx" />
        </div>
        {/* Program seçimi kaldırıldı: bu form artık genel iletişim kutusu.
            Program ve ücret soruları WhatsApp'a yönlendiriliyor. */}
        {b2b ? (
          <>
            <div>
              <label htmlFor="bilgi-kurum" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
                {variant === 'okul' ? t.okul : t.kurumsal} *
              </label>
              <input id="bilgi-kurum" name="kurum" required maxLength={160} autoComplete="organization" className={INPUT} placeholder={variant === 'okul' ? t.kurumPhO : t.kurumPhK} />
            </div>
            <div>
              <label htmlFor="bilgi-kisi" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
                {t.kisi} <span className="text-dim normal-case">{t.istege}</span>
              </label>
              <input id="bilgi-kisi" name="kisiSayisi" inputMode="numeric" maxLength={20} className={INPUT} placeholder={t.kisiPh} />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="bilgi-occupation" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
              {t.meslek} <span className="text-dim normal-case">{t.istege}</span>
            </label>
            <input id="bilgi-occupation" name="occupation" maxLength={160} autoComplete="organization-title" className={INPUT} placeholder="Oyuncu, öğrenci, mühendis…" />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="bilgi-message" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
          {b2b
            ? <>{t.mesajB2B} <span className="text-dim normal-case">{t.istege}</span></>
            : <>{t.mesajGenel} *</>}
        </label>
        <textarea
          id="bilgi-message"
          name="message"
          required={!b2b}
          rows={b2b ? 4 : 5}
          maxLength={2000}
          className={INPUT}
          placeholder={b2b ? t.mesajPhB2B : t.mesajPhGenel}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="kvkk"
          required
          className="mt-0.5 w-4 h-4 shrink-0 accent-[#C8FF00] bg-bgAlt border border-border"
        />
        <span className="font-mono text-[11px] leading-relaxed text-stone group-hover:text-fg transition-colors">
          <Link href="/kvkk" className="underline hover:text-neon" target="_blank">
            {t.kvkkLink}
          </Link>{' '}
          {t.kvkkSon} *
        </span>
      </label>

      {/* Reklam ölçümü ayrı açık rıza (tanışma ve başvuru formlarındakiyle aynı
          metin). Varsayılan kapalı; işaretlenmezse mesaj aynen iletilir. */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="reklamRizasi"
          value="evet"
          className="mt-0.5 w-4 h-4 shrink-0 accent-[#C8FF00] bg-bgAlt border border-border"
        />
        <span className="font-mono text-[11px] leading-relaxed text-stone group-hover:text-fg transition-colors">
          {t.reklam}
          <span className="block text-dim mt-0.5">{t.reklamNot}</span>
        </span>
      </label>

      {state.status === 'error' && (
        <p role="alert" className="font-mono text-[12px] text-red-700 border border-red-700/40 px-4 py-3 bg-red-700/5">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="font-mono text-[12px] tracking-[0.14em] uppercase bg-neon text-bg px-8 py-3.5 hover:bg-fg transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
      >
        {isPending ? t.gonderiliyor : t.gonder}
      </button>
    </form>
  )
}
