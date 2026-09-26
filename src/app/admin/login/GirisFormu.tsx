'use client'

import { useActionState } from 'react'
import { girisYap, type GirisState } from '../actions'

/**
 * Yalnız form kısmı client. `devam` değeri sunucudan prop olarak geliyor.
 *
 * NEDEN useSearchParams DEĞİL: o hook statik render edilen bir sayfada
 * Suspense sınırını sunucuda boş bırakıyor; giriş formu HTML'de hiç
 * görünmüyor, ancak tarayıcı JavaScript'i çalıştırınca beliriyordu. Sunucu
 * component'ının `searchParams` prop'u bu sorunu tamamen ortadan kaldırıyor.
 */
export function GirisFormu({ devam }: { devam: string }) {
  const [state, action, bekliyor] = useActionState<GirisState, FormData>(girisYap, {})

  return (
    <form action={action} className="w-full max-w-[340px]">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon">techne lab</p>
      <h1 className="mt-3 font-display text-[28px] leading-tight text-fg">YÖNETİM PANELİ</h1>
      <p className="mt-2 font-mono text-[12px] leading-relaxed text-stone">
        Bu alan halka açık değil.
      </p>

      <input type="hidden" name="devam" value={devam} />

      <label
        htmlFor="sifre"
        className="mt-8 block font-mono text-[11px] uppercase tracking-[0.18em] text-stone"
      >
        şifre
      </label>
      <input
        id="sifre"
        name="sifre"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        className="mt-2 w-full border border-border bg-bgAlt px-3 py-3 font-mono text-[14px] text-fg outline-none focus:border-neon"
      />

      {state.hata && (
        <p role="alert" className="mt-3 font-mono text-[12px] text-[#FF6B6B]">
          {state.hata}
        </p>
      )}

      <button
        type="submit"
        disabled={bekliyor}
        className="mt-5 w-full bg-neon px-4 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {bekliyor ? 'kontrol ediliyor…' : 'giriş'}
      </button>
    </form>
  )
}
