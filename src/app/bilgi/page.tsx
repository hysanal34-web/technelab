import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { BilgiForm } from '@/components/BilgiForm'

export const metadata: Metadata = {
  title: 'İletişim | Techne Lab İstanbul',
  description:
    'Techne Lab İstanbul ile iletişime geç — soru, öneri ve iş birliği için mesaj bırak. Program içerikleri ve ücretler için WhatsApp ya da telefon.',
  alternates: { canonical: `${SITE_META.url}/bilgi` },
  robots: { index: true, follow: true },
}

export default function BilgiPage() {
  return (
    <div className="px-4 md:px-10 py-16 md:py-24 max-w-3xl mx-auto">
      <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-4">
        iletişim
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-fg leading-tight mb-6">
        BİZE YAZ
      </h1>
      <p className="text-stone text-[15px] leading-relaxed mb-10 max-w-xl">
        Aklına takılan, önermek istediğin ya da birlikte yapabileceğimiz bir şey varsa
        aşağıya yaz — mesajın doğrudan bize düşüyor. Program içerikleri, kontenjan ve
        ücretler için telefon ya da WhatsApp çok daha hızlı:{' '}
        <a href={`tel:${SITE_META.phoneE164}`} data-call-cta="bilgi-page" className="text-fg hover:text-neon underline">
          {SITE_META.phone}
        </a>
      </p>
      <BilgiForm />
    </div>
  )
}
