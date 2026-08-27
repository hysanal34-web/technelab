'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { WORKSHOPS } from '@/lib/data'
import { submitBilgiForm, type BilgiFormState } from '@/app/bilgi/actions'

const INPUT =
  'w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon transition-colors duration-200'

/**
 * Fiyat & Program Bilgisi formu.
 *
 * Fiyat sitede görünmüyor (bilinçli karar) — bu form o merakı lead'e çeviriyor:
 * bilgini bırak, fiyat ve içerik tablosu mailine gelsin. `defaultProgram`
 * verilirse (atölye sayfası) program seçili gelir ve select gizlenir.
 */
export function BilgiForm({ defaultProgram, compact = false }: { defaultProgram?: string; compact?: boolean }) {
  const [state, setState] = useState<BilgiFormState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const active = WORKSHOPS.filter((w) => w.active)
  // Geçersiz ya da pasif slug geldiyse select'e düş — form çıkmaza girmesin.
  const validDefault = defaultProgram && active.some((w) => w.slug === defaultProgram) ? defaultProgram : undefined

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
          Program bilgisi ve ücret tablosu e-postana yola çıktı — birkaç dakika içinde gelmezse spam klasörüne bak.
          Sorun olursa telefonla da ulaşabilirsin.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" aria-label="Fiyat ve program bilgisi isteme formu">
      {!compact && (
        <p className="text-stone text-[14px] leading-relaxed">
          Ücret tablosu ve program içeriğini e-postana gönderelim. Form otuz saniye; mail anında gidiyor.
        </p>
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
        {validDefault ? (
          <input type="hidden" name="program" value={validDefault} />
        ) : (
          <div>
            <label htmlFor="bilgi-program" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2">
              ilgilendiğin program *
            </label>
            <select id="bilgi-program" name="program" required defaultValue="" className={INPUT}>
              <option value="" disabled>
                seç…
              </option>
              {active.map((w) => (
                <option key={w.slug} value={w.slug}>
                  {w.title} — {w.sub}
                </option>
              ))}
            </select>
          </div>
        )}
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
          okudum; bilgilerimin program bilgilendirmesi için işlenmesine onay veriyorum. *
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
        {isPending ? 'gönderiliyor…' : 'fiyat & içerik bilgisini mailime gönder →'}
      </button>
    </form>
  )
}
