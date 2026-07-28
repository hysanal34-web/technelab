'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import type { FormState } from '@/app/atolyeler/[slug]/kayit/actions'

type WorkshopMin = {
  slug: string
  title: string
  sub: string
  category: string
  venue: string
  duration: string
  instructor?: string
}

type Props = {
  workshop: WorkshopMin
  action: (formData: FormData) => Promise<FormState>
}

const SOURCE_OPTIONS = [
  'Instagram',
  'Arkadaş tavsiyesi',
  'Google',
  'Daha önce Techne Lab\'daydım',
  'Diğer',
]

export default function RegistrationForm({ workshop, action }: Props) {
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)

  const isYouth = workshop.category === 'ingilizce-drama' && workshop.slug.includes('youth')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await action(formData)
      setState(result)
      if (result.status === 'success') {
        formRef.current?.reset()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (result.status === 'error') {
        // Hatalı alana odaklan, yoksa hata mesajını göster
        requestAnimationFrame(() => {
          const el = result.field
            ? formRef.current?.querySelector<HTMLElement>(`[name="${result.field}"]`)
            : null
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            el.focus({ preventScroll: true })
          } else {
            errRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            errRef.current?.focus({ preventScroll: true })
          }
        })
      }
    })
  }

  // ── Success screen ───────────────────────────────────────────────────────
  if (state.status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-24">
        <div className="max-w-sm w-full">
          <div className="h-[2px] w-12 bg-neon mb-8" />
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-4">
            başvuru alındı
          </p>
          <h2
            className="font-display text-fg mb-6"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '0.01em', lineHeight: 1 }}
          >
            TEŞEKKÜRLER
          </h2>
          <p className="font-mono text-[13px] text-stone leading-relaxed mb-8">
            Başvurunuz iletildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <div className="flex gap-6">
            <Link
              href={`/atolyeler/${workshop.slug}`}
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-fg transition-colors duration-200"
            >
              ← programa dön
            </Link>
            <Link
              href="/atolyeler"
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-fg transition-colors duration-200"
            >
              tüm programlar →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="px-4 md:px-10 py-16 grid md:grid-cols-[1fr_360px] gap-16 items-start max-w-screen-xl mx-auto">

      {/* Left — program info */}
      <div>
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-2">
          başvuru
        </p>
        <h2
          className="font-display text-fg mb-2"
          style={{ fontSize: 'clamp(32px,5vw,72px)', letterSpacing: '0.01em', lineHeight: 0.92 }}
        >
          {workshop.title}
        </h2>
        <p className="font-mono text-[14px] italic text-stone mb-10">{workshop.sub}</p>

        <div className="space-y-3">
          {[
            ['mekân', workshop.venue],
            ['süre',  workshop.duration],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-6 pb-3 border-b border-border">
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone w-16 shrink-0 pt-0.5">{k}</span>
              <span className="font-mono text-[12px] text-fg">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

        {/* Ad Soyad */}
        <FieldGroup htmlFor="name" label="Ad Soyad" required>
          <Input name="name" placeholder="Adınız ve soyadınız" required autoComplete="name" />
        </FieldGroup>

        {/* E-posta */}
        <FieldGroup htmlFor="email" label="E-posta" required>
          <Input name="email" type="email" placeholder="ornek@mail.com" required autoComplete="email" />
        </FieldGroup>

        {/* Telefon */}
        <FieldGroup htmlFor="phone" label="Telefon" required>
          <Input name="phone" type="tel" placeholder="+90 5xx xxx xx xx" required autoComplete="tel" />
        </FieldGroup>

        {/* Doğum Yılı — always show, required for Youth */}
        <FieldGroup htmlFor="birthYear" label="Doğum Yılı" required={isYouth}>
          <Input
            name="birthYear"
            type="number"
            placeholder="örn. 2005"
            min={1950}
            max={new Date().getFullYear()}
            required={isYouth}
          />
          {isYouth && (
            <p className="font-mono text-[11px] text-dim mt-1">Bu program 14–17 yaş grubuna yöneliktir.</p>
          )}
        </FieldGroup>

        {/* Meslek */}
        <FieldGroup htmlFor="occupation" label="Meslek / Çalışma Alanı">
          <Input name="occupation" placeholder="Oyuncu, öğrenci, mühendis…" autoComplete="organization-title" />
        </FieldGroup>

        {/* Deneyim */}
        <FieldGroup htmlFor="experience" label="Sahne / Tiyatro Deneyiminiz">
          <Textarea
            name="experience"
            placeholder="Varsa önceki tiyatro, dans veya sahne deneyiminizden kısaca bahsedebilirsiniz."
            rows={3}
          />
        </FieldGroup>

        {/* Motivasyon */}
        <FieldGroup htmlFor="motivation" label="Neden Bu Program?">
          <Textarea
            name="motivation"
            placeholder="Bu programı neden seçtiniz? Beklentileriniz neler?"
            rows={3}
          />
        </FieldGroup>

        {/* Portfolyo / Dosya Linki */}
        <FieldGroup htmlFor="portfolyoLink" label="Portfolyo / CV / Demo Linki">
          <Input
            name="portfolyoLink"
            type="url"
            placeholder="https://drive.google.com/…  veya  https://dropbox.com/…"
          />
          <p className="font-mono text-[11px] text-dim mt-2 leading-relaxed">
            Özgeçmiş, portfolyo, fotoğraf veya video — her türlü dosyayı Google Drive ya da Dropbox'a yükleyip bağlantıyı paylaşabilirsiniz. Linkin herkese açık olduğundan emin olun.
          </p>
        </FieldGroup>

        {/* Nasıl Duydu */}
        <FieldGroup htmlFor="source" label="Techne Lab'ı Nasıl Duydunuz?">
          <SelectField name="source" defaultValue="">
            <option value="" disabled>Seçiniz…</option>
            {SOURCE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </SelectField>
        </FieldGroup>

        {/* KVKK */}
        <div className="flex gap-3 items-start pt-2">
          <input
            type="checkbox"
            name="kvkk"
            id="kvkk"
            value="evet"
            required
            className="mt-0.5 accent-neon shrink-0 cursor-pointer"
          />
          <label htmlFor="kvkk" className="font-mono text-[11px] text-stone leading-relaxed cursor-pointer">
            <Link href="/kvkk" target="_blank" rel="noopener noreferrer" className="text-neon hover:text-fg underline underline-offset-2 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            {"'ni okudum, kişisel verilerimin Techne Lab İstanbul tarafından işlenmesini kabul ediyorum."}
          </label>
        </div>

        {/* Error message */}
        {state.status === 'error' && state.message && (
          <p ref={errRef} tabIndex={-1} role="alert" className="font-mono text-[12px] text-red-400 border border-red-400/40 px-4 py-3 bg-red-400/10 leading-relaxed">
            {state.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg border border-neon py-4 hover:bg-fg hover:border-fg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          data-hover
        >
          {isPending ? 'gönderiliyor…' : 'başvur →'}
        </button>

        <p className="font-mono text-[11px] text-dim text-center leading-relaxed">
          Başvurunuz tarafımıza iletilir. Kontenjan onayı sonrası e-posta ile bilgilendirilirsiniz.
        </p>
      </form>
    </div>
  )
}

// ── Alt bileşenler ──────────────────────────────────────────────────────────

function FieldGroup({
  htmlFor,
  label,
  required,
  children,
}: {
  htmlFor: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-2">
        {label}
        {required && <span className="text-neon ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (zorunlu)</span>}
      </label>
      {children}
    </div>
  )
}

function Input({
  name,
  type = 'text',
  placeholder,
  required,
  autoComplete,
  min,
  max,
}: {
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
  min?: number
  max?: number
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      aria-required={required || undefined}
      autoComplete={autoComplete}
      inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : undefined}
      min={min}
      max={max}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon transition-colors duration-200"
    />
  )
}

function Textarea({
  name,
  placeholder,
  rows = 3,
}: {
  name: string
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon transition-colors duration-200 resize-none"
    />
  )
}

function SelectField({
  name,
  defaultValue,
  children,
}: {
  name: string
  defaultValue: string
  children: React.ReactNode
}) {
  return (
    <select
      id={name}
      name={name}
      defaultValue={defaultValue}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon transition-colors duration-200 appearance-none"
    >
      {children}
    </select>
  )
}
