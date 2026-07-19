'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import type { FormState } from '@/app/atolyeler/[slug]/kayit/actions'

type WorkshopMin = {
  slug: string
  title: string
  sub: string
  venue: string
  duration: string
  instructor?: string
}

type Props = {
  workshop: WorkshopMin
  action: (formData: FormData) => Promise<FormState>
}

const ENGLISH_LEVELS = [
  'Orta (B1–B2): Günlük diyalogları anlar, kendini ifade edebilir',
  'İleri (C1–C2): Akıcı konuşur, metinleri rahatça kavrar',
  'Anadil Seviyesi (Native / Bilingual)',
]

const SOURCE_OPTIONS = [
  'Instagram',
  'Arkadaş tavsiyesi',
  'Google',
  'Daha önce Techne Lab\'daydım',
  'Diğer',
]

export default function YouthRegistrationForm({ workshop, action }: Props) {
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

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

  // ── Success ─────────────────────────────────────────────────────────────
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
            Başvurunuz alındı! Yanıtlarınızı inceledikten sonra veli iletişim bilgileriniz üzerinden en kısa sürede sizinle iletişime geçeceğiz.
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
    <div className="px-4 md:px-10 py-16 max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-12">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-2">başvuru</p>
        <h2
          className="font-display text-fg mb-2"
          style={{ fontSize: 'clamp(28px,4vw,64px)', letterSpacing: '0.01em', lineHeight: 0.92 }}
        >
          {workshop.title}
        </h2>
        <p className="font-mono text-[14px] italic text-stone mb-4">{workshop.sub}</p>
        <p className="font-mono text-[12px] text-dim leading-relaxed">
          Ekim ayının ilk haftası başlıyoruz! Haftada bir gün Kadıköy ve Taksim (Pera) lokasyonlarında gerçekleşecek.
          Yıl sonunda bir sahne gösterisiyle taçlanacak bu süreç için lütfen formu veli / yasal vasi eşliğinde doldurunuz.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-10" noValidate>

        {/* Bölüm 1: Öğrenci Bilgileri */}
        <Section label="01 — Katılımcı Bilgileri">
          <FieldGroup label="Öğrencinin Adı ve Soyadı" required>
            <Input name="name" placeholder="Adı ve soyadı" required autoComplete="name" />
          </FieldGroup>
          <FieldGroup label="Öğrencinin Doğum Tarihi" required>
            <Input name="birthDate" type="date" required />
          </FieldGroup>
          <FieldGroup label="Öğrencinin Eğitim Gördüğü Okul ve Sınıfı" required>
            <Input name="school" placeholder="örn. Kadıköy Anadolu Lisesi, 10. Sınıf" required />
          </FieldGroup>
          <FieldGroup label="Katılmak İstediğiniz Lokasyon" required>
            <SelectField name="location" defaultValue="">
              <option value="" disabled>Seçiniz…</option>
              <option value="Kadıköy">Kadıköy</option>
              <option value="Taksim (Pera)">Taksim (Pera)</option>
              <option value="Her ikisi de bana uyar">Her ikisi de bana uyar</option>
            </SelectField>
          </FieldGroup>
        </Section>

        {/* Bölüm 2: Dil ve Drama Geçmişi */}
        <Section label="02 — Dil ve Drama Geçmişi">
          <FieldGroup label="Öğrencinin İngilizce Konuşma ve Anlama Seviyesi" required>
            {ENGLISH_LEVELS.map((level) => (
              <label key={level} className="flex gap-3 items-start mt-3 cursor-pointer group">
                <input
                  type="radio"
                  name="englishLevel"
                  value={level}
                  required
                  className="mt-0.5 accent-neon shrink-0"
                />
                <span className="font-mono text-[12px] text-stone group-hover:text-fg transition-colors leading-relaxed">
                  {level}
                </span>
              </label>
            ))}
            <p className="font-mono text-[10px] text-dim mt-3 leading-relaxed">
              Programın akışı için temel iletişim becerisi aranmaktadır.
            </p>
          </FieldGroup>
          <FieldGroup label="Öğrencinin Tiyatro / Oyunculuk / Yaratıcı Drama Geçmişi">
            <Textarea
              name="experience"
              placeholder="Daha önce eğitim aldı mı, okul kulübünde sahneye çıktı mı, yoksa ilk defa mı deneyimleyecek? Kısaca bahsedebilirsiniz."
              rows={3}
            />
          </FieldGroup>
          <FieldGroup label="Neden Bu Programa Katılmak İstiyorsunuz?">
            <Textarea
              name="motivation"
              placeholder="Bu soruyu öğrencinin yanıtlamasını rica ederiz. Bu süreçten beklentiniz nedir?"
              rows={3}
            />
          </FieldGroup>
        </Section>

        {/* Bölüm 3: Veli Bilgileri */}
        <Section label="03 — Veli / Yasal Vasi Bilgileri">
          <FieldGroup label="Veli Adı ve Soyadı" required>
            <Input name="guardianName" placeholder="Veli adı soyadı" required />
          </FieldGroup>
          <FieldGroup label="Yakınlık Derecesi" required>
            <Input name="guardianRel" placeholder="Anne, Baba, vb." required />
          </FieldGroup>
          <FieldGroup label="Veli Telefon Numarası" required>
            <Input name="guardianPhone" type="tel" placeholder="+90 5xx xxx xx xx" required autoComplete="tel" />
          </FieldGroup>
          <FieldGroup label="Veli E-posta Adresi" required>
            <Input name="guardianEmail" type="email" placeholder="veli@mail.com" required autoComplete="email" />
          </FieldGroup>
          <FieldGroup label="Techne Lab'ı Nasıl Duydunuz?">
            <SelectField name="source" defaultValue="">
              <option value="" disabled>Seçiniz…</option>
              {SOURCE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </SelectField>
          </FieldGroup>
        </Section>

        {/* Bölüm 4: Onaylar */}
        <Section label="04 — Onay">
          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              name="parentConsent"
              id="parentConsent"
              value="evet"
              required
              className="mt-0.5 accent-neon shrink-0 cursor-pointer"
            />
            <label htmlFor="parentConsent" className="font-mono text-[11px] text-stone leading-relaxed cursor-pointer">
              14–17 yaş aralığındaki çocuğumun / yasal sorumluluğunu taşıdığım öğrencinin "English Drama Youth!" programına katılmasına,
              provalarda ve yılsonu temsilinde yer almasına onay veriyorum.
              <span className="text-neon ml-1">*</span>
            </label>
          </div>
          <div className="flex gap-3 items-start mt-4">
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
              {"'ni okudum; bu formda paylaşılan kişisel verilerin başvuru ve kayıt süreçlerinin yürütülmesi amacıyla işlenmesini onaylıyorum."}
              <span className="text-neon ml-1">*</span>
            </label>
          </div>
        </Section>

        {/* Error */}
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
          {isPending ? 'gönderiliyor…' : 'başvuruyu gönder →'}
        </button>

        <p className="font-mono text-[10px] text-dim text-center leading-relaxed">
          Başvurunuz incelendikten sonra veli iletişim bilgileriniz üzerinden en kısa sürede yanıt verilecektir.
        </p>
      </form>
    </div>
  )
}

// ── Alt bileşenler ──────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5 border-t border-border pt-8">
      <legend className="font-mono text-[10px] tracking-[0.22em] uppercase text-neon mb-6 block">
        {label}
      </legend>
      {children}
    </fieldset>
  )
}

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
      <label className="block font-mono text-[10px] tracking-[0.16em] uppercase text-stone mb-2">
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
}: {
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim/50 focus:outline-none focus:border-neon/60 transition-colors duration-200"
    />
  )
}

function Textarea({ name, placeholder, rows = 3 }: { name: string; placeholder?: string; rows?: number }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim/50 focus:outline-none focus:border-neon/60 transition-colors duration-200 resize-none"
    />
  )
}

function SelectField({ name, defaultValue, children }: { name: string; defaultValue: string; children: React.ReactNode }) {
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
