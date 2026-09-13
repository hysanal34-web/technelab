'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import type { TanismaFormState } from '@/app/tanisma-gunu/actions'
import { TANISMA_SESSIONS, ENGLISH_LEVELS } from '@/app/tanisma-gunu/sessions'
import { trackTanismaLead, newBrowserEventId } from '@/components/MetaPixel'
import { WORKSHOPS, SITE_META } from '@/lib/data'

type Props = { action: (formData: FormData) => Promise<TanismaFormState> }

/**
 * Bir tanışma kaydının reklam platformlarına bildirilen tahmini değeri.
 * Program bedelinin %10'u — tanışmaya gelenlerin kabaca onda birinin kayda
 * döndüğü varsayımı. Mutlak rakam değil, programlar arası oran önemli:
 * Youth 11.000 ₺ · Musical 14.500 ₺ · Auteur 1.800 ₺ gibi.
 * Gerçek dönüşüm oranı ölçüldüğünde bu katsayı güncellenmeli.
 */
const TANISMA_LEAD_ORANI = 0.1

function tanismaLeadDegeri(slug: string): number {
  const price = WORKSHOPS.find((w) => w.slug === slug)?.price ?? 0
  return Math.round(price * TANISMA_LEAD_ORANI)
}

const SOURCE_OPTIONS = [
  'Instagram',
  'Arkadaş tavsiyesi',
  'Google',
  'Yapay zeka (ChatGPT, Gemini vb.)',
  "Daha önce Techne Lab'daydım",
  'Diğer',
]

const inputCls =
  'w-full bg-bgAlt border border-border text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:border-neon transition-colors duration-200'

export default function TanismaForm({ action }: Props) {
  const [state, setState] = useState<TanismaFormState>({ status: 'idle' })
  const [sessionId, setSessionId] = useState('')
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)

  const session = TANISMA_SESSIONS.find((s) => s.id === sessionId)
  const isYouth = session?.youth ?? false
  const askEnglish = session?.english ?? true

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // Aynı olay hem buradan hem sunucudaki CAPI'den Meta'ya gidiyor.
    // İkisi aynı kimliği taşımazsa tek kayıt iki lead olarak sayılıyor.
    const eventId = newBrowserEventId()
    formData.append('eventId', eventId)
    startTransition(async () => {
      const result = await action(formData)
      setState(result)
      if (result.status === 'success') {
        trackTanismaLead(
          `Tanışma Günü — ${session?.program ?? ''}`,
          session ? tanismaLeadDegeri(session.slug) : 0,
          `tanisma-gunu-${sessionId}`,
          eventId,
        )
        formRef.current?.reset()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (result.status === 'error') {
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

  if (state.status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-24">
        <div className="max-w-sm w-full">
          <div className="h-[2px] w-12 bg-neon mb-8" />
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-4">kayıt alındı</p>
          <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '0.01em', lineHeight: 1 }}>
            GÖRÜŞMEK ÜZERE
          </h2>
          <p className="font-mono text-[13px] text-stone leading-relaxed mb-8">
            Tanışma günü kaydınız alındı. Mekân adresini ve detayları size yazacağız; sorunuz olursa DM'den ulaşabilirsiniz.
          </p>
          <Link href="/atolyeler" className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-fg transition-colors duration-200">
            programları incele →
          </Link>
          {/* Sıcak lead'i bekletme: onay ekranından doğrudan konuşmaya köprü */}
          <p className="font-mono text-[12px] text-dim mt-8 leading-relaxed">
            Sorunuz varsa beklemeyin —{' '}
            <a
              href={`https://wa.me/${SITE_META.phoneE164.replace('+', '')}?text=${encodeURIComponent('Merhaba, tanışma gününe az önce kaydoldum — bir sorum var.')}`}
              target="_blank"
              rel="noopener noreferrer"
              data-call-cta="form-success-whatsapp"
              className="text-stone underline underline-offset-2 hover:text-fg transition-colors"
            >
              WhatsApp&apos;tan yazın
            </a>{' '}
            ya da <a href={`tel:${SITE_META.phoneE164}`} className="text-stone underline underline-offset-2 hover:text-fg transition-colors">{SITE_META.phone}</a> numarasını arayın.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-10 py-16 grid md:grid-cols-[1fr_360px] gap-16 items-start max-w-screen-xl mx-auto">
      {/* Sol — bilgi */}
      <div>
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-2">ücretsiz tanışma günü</p>
        <h1 className="font-display text-fg mb-2" style={{ fontSize: 'clamp(32px,5vw,72px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          TECHNE LAB
        </h1>

        <div className="space-y-3">
          {TANISMA_SESSIONS.map((s) => {
            const [prog, when] = s.label.split(' — ')
            return (
              <div key={s.id} className="flex flex-col sm:flex-row sm:gap-6 pb-3 border-b border-border">
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone sm:w-44 shrink-0 pt-0.5">{prog}</span>
                <span className="font-mono text-[12px] text-fg">{when}</span>
              </div>
            )
          })}
        </div>
        <p className="font-mono text-[11px] text-dim mt-4 leading-relaxed">
          Kayıt sonrası mekân adresini ve detayları size iletiyoruz.
        </p>
      </div>

      {/* Sağ — form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <Field htmlFor="session" label="Hangi Program?" required>
          <select
            id="session" name="session" required value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled>Seçiniz…</option>
            {TANISMA_SESSIONS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </Field>

        <Field htmlFor="name" label={isYouth ? 'Öğrencinin Adı Soyadı' : 'Ad Soyad'} required>
          <input id="name" name="name" placeholder={isYouth ? 'Öğrencinin adı ve soyadı' : 'Adınız ve soyadınız'} required autoComplete="name" className={inputCls} />
        </Field>

        <Field htmlFor="birthYear" label={isYouth ? 'Öğrencinin Doğum Yılı' : 'Doğum Yılı'} required>
          <input id="birthYear" name="birthYear" type="number" placeholder={isYouth ? 'örn. 2012' : 'örn. 1995'} min={1950} max={new Date().getFullYear()} required className={inputCls} />
        </Field>

        {isYouth ? (
          <>
            <Field htmlFor="occupation" label="Okul / Sınıf">
              <input id="occupation" name="occupation" placeholder="örn. 8. sınıf" className={inputCls} />
            </Field>
            <div className="pt-2 border-t border-border">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon mb-4">veli bilgileri</p>
            </div>
            <Field htmlFor="guardianName" label="Veli Adı Soyadı" required>
              <input id="guardianName" name="guardianName" required autoComplete="name" className={inputCls} />
            </Field>
            <Field htmlFor="guardianPhone" label="Veli Telefon" required>
              <input id="guardianPhone" name="guardianPhone" type="tel" inputMode="tel" placeholder="+90 5xx xxx xx xx" required autoComplete="tel" className={inputCls} />
            </Field>
            <Field htmlFor="guardianEmail" label="Veli E-posta" required>
              <input id="guardianEmail" name="guardianEmail" type="email" inputMode="email" placeholder="ornek@mail.com" required autoComplete="email" className={inputCls} />
            </Field>
          </>
        ) : (
          <>
            <Field htmlFor="email" label="E-posta" required>
              <input id="email" name="email" type="email" inputMode="email" placeholder="ornek@mail.com" required autoComplete="email" className={inputCls} />
            </Field>
            <Field htmlFor="phone" label="Telefon" required>
              <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="+90 5xx xxx xx xx" required autoComplete="tel" className={inputCls} />
            </Field>
            <Field htmlFor="occupation" label="Meslek / Çalışma Alanı" required>
              <input id="occupation" name="occupation" placeholder="Oyuncu, öğrenci, mühendis…" required autoComplete="organization-title" className={inputCls} />
            </Field>
          </>
        )}

        {askEnglish && (
          <Field htmlFor="englishLevel" label="İngilizce Seviyesi" required>
            <select id="englishLevel" name="englishLevel" defaultValue="" required className={`${inputCls} appearance-none`}>
              <option value="" disabled>Seçiniz…</option>
              {ENGLISH_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <p className="font-mono text-[11px] text-dim mt-1">Program B1 ve üzeri için. Sınav yok — kendi tahmininiz yeterli.</p>
          </Field>
        )}

        <Field htmlFor="instagram" label="Instagram Kullanıcı Adı">
          <input id="instagram" name="instagram" placeholder="@kullaniciadi" autoComplete="off" className={inputCls} />
        </Field>

        <Field htmlFor="experience" label="Sahne / Tiyatro / Dans Deneyimi">
          <textarea id="experience" name="experience" rows={3} placeholder="Varsa kısaca. Yoksa boş bırakın — gerekmiyor." className={`${inputCls} resize-none`} />
        </Field>

        <Field htmlFor="motivation" label="Beklentiniz">
          <textarea id="motivation" name="motivation" rows={3} placeholder="Neden gelmek istiyorsunuz? Bir cümle yeter." className={`${inputCls} resize-none`} />
        </Field>

        <Field htmlFor="source" label="Techne Lab'ı Nasıl Duydunuz?">
          <select id="source" name="source" defaultValue="" className={`${inputCls} appearance-none`}>
            <option value="" disabled>Seçiniz…</option>
            {SOURCE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>

        {isYouth && (
          <div className="flex gap-3 items-start pt-2">
            <input type="checkbox" name="parentConsent" id="parentConsent" value="evet" required className="mt-0.5 accent-neon shrink-0 cursor-pointer" />
            <label htmlFor="parentConsent" className="font-mono text-[11px] text-stone leading-relaxed cursor-pointer">
              Velisi olduğum öğrencinin tanışma atölyesine katılmasını onaylıyorum.
            </label>
          </div>
        )}

        {/* ── KVKK — aydınlatma özeti + ayrı rızalar ── */}
        <div className="pt-4 border-t border-border space-y-4">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon">kişisel verilerin korunması</p>

          <div className="font-mono text-[11px] text-dim leading-relaxed space-y-2 bg-bgAlt border border-border px-4 py-3">
            <p>
              <span className="text-stone">Veri sorumlusu:</span> Techne Lab İstanbul (Halil Yağız Şanal) · info@technelabistanbul.com
            </p>
            <p>
              <span className="text-stone">İşlenen veriler:</span> ad soyad, doğum yılı, telefon, e-posta, meslek ya da okul bilgisi,
              İngilizce seviyesi, sahne deneyimi ve beklenti notunuz; 18 yaş altı katılımcılar için velinin ad, telefon ve e-postası.
            </p>
            <p>
              <span className="text-stone">Amaç:</span> tanışma {isYouth ? 'atölyesine' : 'atölyesine'} kaydınızı almak, mekân ve saat bilgisini iletmek,
              programa uygunluğu (yaş, seviye) değerlendirmek ve sonrasında kayıt sürecinde sizinle iletişim kurmak.
            </p>
            <p>
              <span className="text-stone">Hukuki sebep:</span> KVKK m.5/2-c (sözleşme öncesi talep) ve m.5/2-f (meşru menfaat);
              18 yaş altı için velinin açık rızası.
            </p>
            <p>
              <span className="text-stone">Aktarım:</span> Verileriniz üçüncü kişilere satılmaz. Yalnızca e-posta/form altyapı sağlayıcılarımızda
              (Vercel, Resend) teknik olarak barındırılır.
            </p>
            <p>
              <span className="text-stone">Saklama:</span> Kayıt yapmazsanız 12 ay sonra silinir; kayıt yaparsanız program bitimine kadar ve
              yasal süre boyunca saklanır.
            </p>
            <p>
              <span className="text-stone">Haklarınız:</span> KVKK m.11 uyarınca verilerinize erişme, düzeltme, silme ve itiraz hakkınız var —
              info@technelabistanbul.com adresine yazmanız yeterli. Tam metin:{' '}
              <Link href="/kvkk" target="_blank" rel="noopener noreferrer" className="text-neon hover:text-fg underline underline-offset-2 transition-colors">
                KVKK Aydınlatma Metni
              </Link>
            </p>
          </div>

          <div className="flex gap-3 items-start">
            <input type="checkbox" name="kvkk" id="kvkk" value="evet" required className="mt-0.5 accent-neon shrink-0 cursor-pointer" />
            <label htmlFor="kvkk" className="font-mono text-[11px] text-stone leading-relaxed cursor-pointer">
              Yukarıdaki aydınlatma metnini okudum; {isYouth ? 'velisi olduğum öğrencinin ve kendi ' : ''}kişisel verilerimin
              belirtilen amaçlarla Techne Lab İstanbul tarafından işlenmesini kabul ediyorum.
              <span className="text-neon ml-1" aria-hidden="true">*</span>
            </label>
          </div>

          <div className="flex gap-3 items-start">
            <input type="checkbox" name="iletisimIzni" id="iletisimIzni" value="evet" className="mt-0.5 accent-neon shrink-0 cursor-pointer" />
            <label htmlFor="iletisimIzni" className="font-mono text-[11px] text-stone leading-relaxed cursor-pointer">
              Techne Lab&apos;ın yeni program, atölye ve etkinlik duyurularını e-posta ve WhatsApp ile almak istiyorum.
              <span className="block text-dim mt-0.5">İsteğe bağlı. İstediğiniz an tek mesajla çıkabilirsiniz; tanışma kaydınızı etkilemez.</span>
            </label>
          </div>
        </div>

        {state.status === 'error' && state.message && (
          <p ref={errRef} tabIndex={-1} role="alert" className="font-mono text-[12px] text-red-700 border border-red-700/40 px-4 py-3 bg-red-700/5 leading-relaxed">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg border border-neon py-4 hover:bg-fg hover:border-fg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          data-hover
        >
          {isPending ? 'gönderiliyor…' : 'kaydol →'}
        </button>

        <p className="font-mono text-[11px] text-dim text-center leading-relaxed">
          Ücretsiz. Kayıt sonrası mekân adresi ve detaylar size iletilir.
        </p>
      </form>
    </div>
  )
}

function Field({ htmlFor, label, required, children }: { htmlFor: string; label: string; required?: boolean; children: React.ReactNode }) {
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
