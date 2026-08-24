'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { subscribeBulten, type BultenState } from '@/app/bulten/actions'
import { trackSubscribe } from '@/components/MetaPixel'

/**
 * Footer'daki bülten kayıt formu.
 * Server action'a gider; abone Resend Audience'a eklenir.
 */
export function BultenForm() {
  const [state, setState] = useState<BultenState>({ status: 'idle' })
  const [pending, startTransition] = useTransition()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await subscribeBulten(fd)
      if (res.status === 'success') trackSubscribe()
      setState(res)
    })
  }

  if (state.status === 'success') {
    return (
      <div className="flex items-start gap-3 py-1">
        <span className="text-neon font-mono text-[13px] leading-none mt-0.5" aria-hidden="true">✓</span>
        <p className="font-mono text-[12px] text-stone leading-relaxed">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2 max-w-md">
        <label htmlFor="bulten-eposta" className="sr-only">E-posta adresiniz</label>
        <input
          id="bulten-eposta"
          type="email"
          name="eposta"
          required
          autoComplete="email"
          placeholder="e-posta adresiniz"
          disabled={pending}
          aria-invalid={state.status === 'error'}
          aria-describedby={state.status === 'error' ? 'bulten-hata' : undefined}
          className="flex-1 bg-transparent border border-border focus:border-neon text-fg placeholder:text-dim font-mono text-[12px] px-3 py-2.5 outline-none transition-colors disabled:opacity-50"
        />
        {/* Honeypot — ekranda görünmez, ekran okuyucudan da gizli */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
        />
        <button
          type="submit"
          disabled={pending}
          className="font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg px-5 py-2.5 hover:bg-fg transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {pending ? 'gönderiliyor…' : 'abone ol'}
        </button>
      </div>

      {state.status === 'error' && (
        <p id="bulten-hata" role="alert" className="font-mono text-[11px] text-neon mt-2">
          {state.message}
        </p>
      )}

      <p className="font-mono text-[10px] text-dim mt-2.5 leading-relaxed">
        Haftada bir e-posta. İstediğiniz an çıkabilirsiniz.{' '}
        <Link href="/kvkk" className="underline hover:text-stone transition-colors">
          KVKK aydınlatma metni
        </Link>
      </p>
    </form>
  )
}
