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

  const isYouth = workshop.category === 'ingilizce-drama' && workshop.slug.includes('youth')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await action(formData)
      setState(result)
      if (result.status === 'success') {
        formRef.current?.reset()
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
            TEŞEKKÜRLERİ
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
            ['mekân',  workshop.venue],
            ['süre',   workshop.duration],
            ...(workshop.instructor ? [['eğitmen', workshop.instructor]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex gap-6 pb-3 border-b border-border">
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone w-16 shrink-0 pt-0.5">{k}</span>
              <span className="font-mono text-[12px] text-fg">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>

        {/* Ad Soyad */}
        <FieldGroup label="Ad Soyad" required>
          <Input name="name" placeholder="Adınız ve soyadınız" required autoComplete="name" />
        </FieldGroup>

        {/* E-posta */}
        <FieldGroup label="E-posta" required>
          <Input name="email" type="email" placeholder="ornek@mail.com" required autoComplete="email" />
        </FieldGroup>

        {/* Telefon */}
        <FieldGroup label="Telefon" required>
          <Input name="phone" type="tel" placeholder="+90 5xx xxx xx xx" required autoComplete="tel" />
        </FieldGroup>

        {/* Doğum Yılı — always show, required for Youth */}
        <FieldGroup label={isYouth ? 'Doğum Yılı' : 'Doğum Yılı'} required={isYouth}>
          <Input
            name="birthYear"
            type="number"
            placeholder="örn. 2005"
            min={1950}
            max={new Date().getFullYear()}
            required={isYouth}
          />
          {isYouth && (
            <p className="font-mono text-[10px] text-dim mt-1">Bu program 14–17 yaş grubuna yöneliktir.</p>
          )}
        </FieldGroup>

        {/* Meslek */}
        <FieldGroup label="Meslek / Çalışma Alanı">
          <Input name="occupation" placeholder="Oyuncu, öğrenci, mühendis…" autoComplete="organization-title" />
        </FieldGroup>

        {/* Deneyim */}
        <FieldGroup label="Sahne / Tiyatro Deneyiminiz">
          <Textarea
            name="experience"
            placeholder="Varsa önceki tiyatro, dans veya sahne deneyiminizden kısaca bahsedebilirsiniz."
            rows={3}
          />
        </FieldGroup>

        {/* Motivasyon */}
        <FieldGroup label="Neden Bu Program?">
          <Textarea
            name="motivation"
            placeholder="Bu programı neden seçtiniz? Beklentileriniz neler?"
            rows={3}
          />
        </FieldGroup>

        {/* Nasıl Duydu */}
        <FieldGroup label="Techne Lab'ı Nasıl Duydunuz?">
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
            <Link href="/kvkk" target="_blank" className="text-neon hover:text-fg underline underline-offset-2 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            {"'ni okudum, kişisel verilerimin Techne Lab İstanbul tarafından işlenmesini kabul ediyorum."}
          </label>
        </div>

        {/* Error message */}
        {state.status === 'error' && state.message && (
          <p className="font-mono text-[11px] text-red-400 border border-red-400/30 px-4 py-3 bg-red-400/5">
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

        <p className="font-mono text-[10px] text-dim text-center leading-relaxed">
          Başvurunuz tarafımıza iletilir. Kontenjan onayı sonrası e-posta ile bilgilendirilirsiniz.
        </p>
      </form>
    </div>
  )
}

// ── Alt bileşenler ──────────────────────────────────────────────────────────

function FieldGroup({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-stone mb-2">
        {label}
        {required && <span className="text-neon ml-1">*</span>}
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
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      min={min}
      max={max}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim/50 focus:outline-none focus:border-neon/60 transition-colors duration-200"
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
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim/50 focus:outline-none focus:border-neon/60 transition-colors duration-200 resize-none"
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
      name={name}
      defaultValue={defaultValue}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 focus:outline-none focus:border-neon/60 transition-colors duration-200 appearance-none"
    >
      {children}
    </select>
  )
}
