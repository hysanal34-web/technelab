'use client'

import { useState, useTransition, useRef } from 'react'
import { SITE_META } from '@/lib/data'
import { submitContact, type ContactState } from './actions'

const FIELDS = [
  { name: 'ad',     label: 'ad soyad', placeholder: 'Ad Soyad', type: 'text',  autoComplete: 'name' },
  { name: 'eposta', label: 'e-posta',  placeholder: 'E-posta',  type: 'email', autoComplete: 'email' },
  { name: 'konu',   label: 'konu',     placeholder: 'Konu',     type: 'text',  autoComplete: 'off' },
] as const

const FOCUS =
  'outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon'

export function ContactForm() {
  const [state, setState] = useState<ContactState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await submitContact(fd)
      setState(result)
      if (result.status === 'success') {
        formRef.current?.reset()
      } else if (result.status === 'error') {
        requestAnimationFrame(() => {
          const el = result.field
            ? formRef.current?.querySelector<HTMLElement>(`[name="${result.field}"]`)
            : null
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            el.focus({ preventScroll: true })
          } else {
            errRef.current?.focus({ preventScroll: true })
          }
        })
      }
    })
  }

  if (state.status === 'success') {
    return (
      <div className="border-l-2 border-neon pl-6 py-4">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-3">
          mesaj iletildi
        </p>
        <p className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '0.02em' }}>
          TEŞEKKÜRLER
        </p>
        <p className="font-mono text-[13px] text-stone leading-relaxed mb-6">
          Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.
        </p>
        <button
          onClick={() => setState({ status: 'idle' })}
          className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors duration-200 py-2"
        >
          ← yeni mesaj yaz
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {FIELDS.map(({ name, label, placeholder, type, autoComplete }) => (
        <div key={name}>
          <label htmlFor={name} className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-2">
            {label}
            {name !== 'konu' && <span className="ml-1" aria-hidden="true">*</span>}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={name !== 'konu'}
            autoComplete={autoComplete}
            className={`w-full bg-transparent border-b border-border py-3 font-mono text-[13px] text-fg ${FOCUS} transition-colors duration-200 placeholder:text-dim`}
          />
        </div>
      ))}

      <div>
        <label htmlFor="mesaj" className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-2">
          mesaj<span className="ml-1" aria-hidden="true">*</span>
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          rows={5}
          placeholder="Mesajınız…"
          required
          className={`w-full bg-transparent border-b border-border py-3 font-mono text-[13px] text-fg ${FOCUS} resize-none transition-colors duration-200 placeholder:text-dim`}
        />
      </div>

      {state.status === 'error' && state.message && (
        <p
          ref={errRef}
          tabIndex={-1}
          role="alert"
          className="font-mono text-[12px] text-red-400 border border-red-400/40 px-4 py-3 bg-red-400/10 leading-relaxed"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-start font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg px-8 py-4 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        data-hover
      >
        {isPending ? 'gönderiliyor…' : 'gönder'}
      </button>

      <p className="font-mono text-[11px] text-dim leading-relaxed">
        Doğrudan yazmayı tercih ederseniz:{' '}
        <a href={`mailto:${SITE_META.email}`} className="text-stone hover:text-neon transition-colors underline underline-offset-2">
          {SITE_META.email}
        </a>
      </p>
    </form>
  )
}
