import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'İletişim — Techne Lab İstanbul',
  description: 'Techne Lab İstanbul ile iletişime geçin. Atölye başvurusu, prodüksiyon işbirliği, kurumsal projeler.',
  alternates: { canonical: `${SITE_META.url}/iletisim` },
}

const instagramHandle = SITE_META.instagram.replace(/^@/, '')

export default function ContactPage() {
  return (
    <>
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">iletişim</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(44px,7.5vw,108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
          BİRLİKTE<br /><span className="text-neon">ÜRETELİM</span>
        </h1>
      </section>

      <section className="px-4 md:px-10 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-mono text-[14px] text-stone leading-relaxed mb-10">
            Prodüksiyon işbirliği, atölye başvurusu veya kurumsal projeler için iletişime geçin.
          </p>

          <div className="flex gap-6 py-3.5 border-b border-border">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon w-16 shrink-0 pt-0.5">e-posta</span>
            <a
              href={`mailto:${SITE_META.email}`}
              className="font-mono text-[13px] text-fg hover:text-neon transition-colors duration-200"
            >
              {SITE_META.email}
            </a>
          </div>

          <div className="flex gap-6 py-3.5 border-b border-border">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon w-16 shrink-0 pt-0.5">konum</span>
            <span className="font-mono text-[13px] text-fg">İstanbul, Türkiye</span>
          </div>

          <div className="flex gap-6 py-3.5 border-b border-border">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon w-16 shrink-0 pt-0.5">instagram</span>
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-fg hover:text-neon transition-colors duration-200"
            >
              {SITE_META.instagram}
            </a>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  )
}
