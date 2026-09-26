'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { joinWaitlist, enrichWaitlist, type WaitlistState } from '@/app/bekleme-listesi/actions'

const INPUT =
  'w-full bg-transparent border border-border focus:border-neon text-fg placeholder:text-dim font-mono text-[13px] px-3 py-2.5 outline-none transition-colors disabled:opacity-50'
const LABEL = 'font-mono text-[11px] tracking-[0.14em] uppercase text-stone block mb-2'

/** İsteğe bağlı 2. adımın seçenekleri. Sıra kasıtlı: en çok işe yarayan üstte. */
const SIDES = ['Kadıköy', 'Pera / Taksim', 'Fark etmez'] as const
const WHENS = ['Hafta içi akşam', 'Hafta sonu gündüz', 'Hafta sonu akşam', 'Fark etmez'] as const
const EXPERIENCES = ['Hiç sahneye çıkmadım', 'Biraz deneyimim var', 'Düzenli çalışıyorum', 'Profesyonelim'] as const
const GOALS = [
  'Konservatuvar / okul sınavı',
  'Casting ve seçmeler',
  'Kendim için',
  'Uzun aradan sonra dönüş',
] as const

export function WaitlistForm({
  programs,
  defaultProgram,
}: {
  /** Seçilebilecek programlar. Tek eleman varsa seçim gizlenir. */
  programs: string[]
  defaultProgram?: string
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [state, setState] = useState<WaitlistState>({ status: 'idle' })
  const [email, setEmail] = useState('')
  const [pending, startTransition] = useTransition()

  function onJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await joinWaitlist(fd)
      setState(res)
      if (res.status === 'success') {
        setEmail(res.email ?? '')
        setStep(2)
      }
    })
  }

  function onEnrich(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('email', email)
    startTransition(async () => {
      await enrichWaitlist(fd)
      setStep(3)
    })
  }

  // ── 3. ekran: kapanış ──
  if (step === 3) {
    return (
      <div className="border border-neon/40 bg-bgAlt p-7">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-3">Tamamdır</p>
        <p className="font-body text-[14px] text-stone leading-relaxed">
          Kaydın alındı. Tarih netleştiğinde ilk sana yazacağız; kontenjan açılmadan önce haber vereceğiz.
        </p>
      </div>
    )
  }

  // ── 2. ekran: isteğe bağlı sorular ──
  if (step === 2) {
    return (
      <div className="border border-border bg-bgAlt p-7">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-3">Listeye eklendin</p>
        <p className="font-body text-[14px] text-stone leading-relaxed mb-7">
          Birkaç soruya daha cevap verirsen grubu ve saatleri sana göre kurabiliriz. Hepsi isteğe bağlı,
          boş bırakıp geçebilirsin.
        </p>

        <form onSubmit={onEnrich} noValidate>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="wl-side" className={LABEL}>Hangi yaka sana uygun?</label>
              <select id="wl-side" name="side" defaultValue="" className={INPUT} disabled={pending}>
                <option value="">Seç</option>
                {SIDES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="wl-when" className={LABEL}>Ne zaman gelebilirsin?</label>
              <select id="wl-when" name="when" defaultValue="" className={INPUT} disabled={pending}>
                <option value="">Seç</option>
                {WHENS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="wl-exp" className={LABEL}>Deneyimin</label>
              <select id="wl-exp" name="experience" defaultValue="" className={INPUT} disabled={pending}>
                <option value="">Seç</option>
                {EXPERIENCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="wl-goal" className={LABEL}>Neden geliyorsun?</label>
              <select id="wl-goal" name="goal" defaultValue="" className={INPUT} disabled={pending}>
                <option value="">Seç</option>
                {GOALS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="wl-age" className={LABEL}>Yaşın</label>
              <input id="wl-age" name="age" inputMode="numeric" maxLength={3} className={INPUT} placeholder="28" disabled={pending} />
            </div>
            <div>
              <label htmlFor="wl-occ" className={LABEL}>Ne iş yapıyorsun?</label>
              <input id="wl-occ" name="occupation" maxLength={160} className={INPUT} placeholder="Öğrenci, mimar, oyuncu…" disabled={pending} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="wl-phone" className={LABEL}>Telefon <span className="text-dim normal-case tracking-normal">(WhatsApp&apos;tan yazalım diye)</span></label>
              <input id="wl-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={INPUT} placeholder="05xx xxx xx xx" disabled={pending} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="wl-note" className={LABEL}>Eklemek istediğin bir şey</label>
              <textarea id="wl-note" name="note" rows={3} maxLength={1000} className={INPUT} placeholder="İstersen boş bırak." disabled={pending} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3 hover:bg-fg transition-colors disabled:opacity-50"
            >
              {pending ? 'gönderiliyor…' : 'gönder'}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={pending}
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim hover:text-fg transition-colors disabled:opacity-50"
            >
              geç
            </button>
          </div>
        </form>
      </div>
    )
  }

  // ── 1. ekran: zorunlu alanlar ──
  return (
    <form onSubmit={onJoin} noValidate className="border border-border bg-bgAlt p-7">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="wl-name" className={LABEL}>Adın soyadın</label>
          <input id="wl-name" name="name" required maxLength={120} autoComplete="name" className={INPUT} placeholder="Adın Soyadın" disabled={pending} />
        </div>
        <div>
          <label htmlFor="wl-email" className={LABEL}>E-posta</label>
          <input id="wl-email" name="email" type="email" required maxLength={160} autoComplete="email" className={INPUT} placeholder="ornek@mail.com" disabled={pending} />
        </div>
      </div>

      {programs.length > 1 ? (
        <div className="mb-5">
          <label htmlFor="wl-program" className={LABEL}>Hangisi ilgini çekiyor?</label>
          <select id="wl-program" name="program" defaultValue={defaultProgram ?? ''} className={INPUT} disabled={pending}>
            <option value="">Henüz emin değilim</option>
            {programs.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      ) : (
        <input type="hidden" name="program" value={defaultProgram ?? programs[0] ?? ''} />
      )}

      <label className="flex items-start gap-3 cursor-pointer group mb-6">
        <input type="checkbox" name="kvkk" required disabled={pending} className="mt-1 accent-[#C8FF00] w-4 h-4 shrink-0" />
        <span className="font-mono text-[11px] text-dim leading-relaxed group-hover:text-stone transition-colors">
          Bilgilerimin bana dönüş yapılması amacıyla işlenmesini kabul ediyorum.{' '}
          <Link href="/kvkk" className="underline hover:text-neon" target="_blank">KVKK metni</Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3 hover:bg-fg transition-colors disabled:opacity-50 w-full sm:w-auto"
      >
        {pending ? 'kaydediliyor…' : 'haber ver →'}
      </button>

      {state.status === 'error' && (
        <p role="alert" className="font-mono text-[12px] text-red-400 mt-4">{state.message}</p>
      )}

      <p className="font-mono text-[11px] text-dim leading-relaxed mt-5">
        Tarih netleştiğinde tek bir mail atıyoruz. Bülten değil, istediğin an çıkabilirsin.
      </p>
    </form>
  )
}
