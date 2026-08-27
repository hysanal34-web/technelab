'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { submitBilgiForm, type BilgiFormState } from '@/app/bilgi/actions'
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
export function BilgiForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<BilgiFormState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  // Geçersiz ya da pasif slug geldiyse select'e düş — form çıkmaza girmesin.

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await submitBilgiForm(fd)
      setState(res)
      if (res.status === 'success') formRef.current?.reset()
    })
  }

  if (state.status === 'success') {
    return (
      <div className="border border-neon p-6 md:p-8" role="status">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-2">gönderildi ✓</span>
        <p className="text-fg text-[15px] leading-relaxed">
          Mesajınız alınmıştır. Ekibimiz sizinle en kısa zamanda iletişime geçecektir.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" aria-label="İletişim formu">
      {!compact && (
        <>
          <p className="text-stone text-[14px] leading-relaxed">
            Bize iletmek istediğin her şey için: soru, öneri, iş birliği. Mesajın doğrudan bize düşüyor.
          </p>
          <div className="border border-neon/30 bg-neon/[0.04] px-4 py-3">
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

      <div className={compact ? 'space-y-4' : 'grid md:grid-cols-2 gap-4'}>
        <div>
          <label htmlFor="bilgi-name" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            ad soyad *
          </label>
          <input id="bilgi-name" name="name" required maxLength={120} autoComplete="name" className={INPUT} placeholder="Adın Soyadın" />
        </div>
        <div>
          <label htmlFor="bilgi-email" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            e-posta *
          </label>
          <input id="bilgi-email" name="email" type="email" required maxLength={160} autoComplete="email" className={INPUT} placeholder="ornek@mail.com" />
        </div>
        <div>
          <label htmlFor="bilgi-phone" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            telefon <span className="text-neon" aria-hidden="true">*</span>
          </label>
          <input id="bilgi-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={INPUT} placeholder="05xx xxx xx xx" />
        </div>
        {/* Program seçimi kaldırıldı: bu form artık genel iletişim kutusu.
            Program ve ücret soruları WhatsApp'a yönlendiriliyor. */}
        <div>
          <label htmlFor="bilgi-occupation" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
            meslek <span className="text-dim normal-case">(isteğe bağlı)</span>
          </label>
          <input id="bilgi-occupation" name="occupation" maxLength={160} autoComplete="organization-title" className={INPUT} placeholder="Oyuncu, öğrenci, mühendis…" />
        </div>
      </div>

      <div>
        <label htmlFor="bilgi-message" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
          bize ne iletmek istersin? *
        </label>
        <textarea
          id="bilgi-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          className={INPUT}
          placeholder="Soru, öneri, iş birliği teklifi ya da aklından geçen herhangi bir şey…"
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
            KVKK aydınlatma metnini
          </Link>{' '}
          okudum; bilgilerimin bana geri dönüş yapılması amacıyla işlenmesine onay veriyorum. *
        </span>
      </label>

      {state.status === 'error' && (
        <p role="alert" className="font-mono text-[12px] text-red-400 border border-red-400/40 px-4 py-3">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="font-mono text-[12px] tracking-[0.14em] uppercase bg-neon text-bg px-8 py-3.5 hover:bg-fg transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
      >
        {isPending ? 'gönderiliyor…' : 'mesajı gönder →'}
      </button>
    </form>
  )
}
