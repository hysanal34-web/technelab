import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { TERMS, MONOLOGUES, EXERCISES } from '@/lib/kaynaklar'

const title = 'Ücretsiz Tiyatro Kaynakları — Monolog, Sözlük, Ses Egzersizleri'
const description = 'Oyuncular ve yazarlar için ücretsiz kaynaklar: monolog kütüphanesi, tiyatro terimleri sözlüğü, ses ve nefes egzersizleri. Techne Lab İstanbul.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_META.url}/kaynaklar` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/kaynaklar`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Techne Lab Kaynaklar' }],
  },
  keywords: [
    'ücretsiz monolog', 'oyunculuk monologları', 'seçme monologu',
    'tiyatro terimleri', 'tiyatro sözlüğü', 'ses egzersizleri',
    'nefes egzersizleri oyunculuk', 'diksiyon egzersizleri',
    'oyunculuk kaynakları', 'tiyatro kaynak', 'oyuncu için kaynaklar',
  ],
}

const RESOURCES = [
  {
    href: '/kaynaklar/monologlar',
    code: '01',
    title: 'MONOLOG KÜTÜPHANESİ',
    sub: `${MONOLOGUES.length} monolog · seçme ve çalışma için`,
    desc: 'Shakespeare\'den Çehov\'a, Ibsen\'den Wilde\'a — telif hakkı serbest monologlar. Her biri için bağlam, ton ve oyuncuya çalışma notu.',
  },
  {
    href: '/kaynaklar/sozluk',
    code: '02',
    title: 'TİYATRO SÖZLÜĞÜ',
    sub: `${TERMS.length} terim · Türkçe & İngilizce`,
    desc: 'Stanislavski\'den belting\'e, dramaturjiden mizansene. Tiyatro, oyunculuk ve müzikal terimlerinin açıklamalı rehberi.',
  },
  {
    href: '/kaynaklar/ses-nefes',
    code: '03',
    title: 'SES & NEFES EGZERSİZLERİ',
    sub: `${EXERCISES.length} egzersiz · adım adım`,
    desc: 'Nefes desteği, rezonans, artikülasyon ve sahne öncesi hazırlık. Evde tek başına uygulanabilir, güvenlik notlarıyla.',
  },
  {
    href: '/atolye-testi',
    code: '04',
    title: 'HANGİ ATÖLYE SANA UYGUN?',
    sub: '2 dakika · 6 soru',
    desc: 'Ne aradığını, nasıl çalışmak istediğini ve neye zaman ayırabildiğini soruyoruz — sana en uygun programı öneriyoruz.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description,
  url: `${SITE_META.url}/kaynaklar`,
  isPartOf: { '@type': 'WebSite', name: SITE_META.name, url: SITE_META.url },
  hasPart: RESOURCES.map((r) => ({
    '@type': 'WebPage',
    name: r.title,
    description: r.desc,
    url: `${SITE_META.url}${r.href}`,
  })),
}

export default function KaynaklarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">ücretsiz · herkese açık</p>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(40px,7vw,100px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
          KAYNAKLAR
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">
          Oyuncular, yazarlar ve sahneyle ilgilenen herkes için açık kaynaklar. Kayıt yok, ücret yok.
          Atölyelerimizde kullandığımız malzemenin bir kısmını burada paylaşıyoruz.
        </p>
      </section>

      <section className="px-4 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {RESOURCES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              data-hover
              className="group bg-bg hover:bg-bgAlt transition-colors duration-200 p-8 md:p-10 block"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim group-hover:text-neon transition-colors block mb-4">
                {r.code} — {r.sub}
              </span>
              <h2
                className="font-display text-fg group-hover:text-neon transition-colors leading-none mb-4"
                style={{ fontSize: 'clamp(22px, 2.4vw, 36px)', letterSpacing: '0.01em' }}
              >
                {r.title}
              </h2>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{r.desc}</p>
              <span className="font-mono text-[11px] tracking-widest2 uppercase text-dim group-hover:text-neon transition-colors mt-6 block">
                aç →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 border-t border-border">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">bir sonraki adım</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          BU KAYNAKLAR BAŞLANGIÇ.<br />ASIL İŞ SALONDA OLUYOR.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Monolog okumak ile monoloğu bir grubun önünde çalışmak farklı şeyler. Techne Lab
          programları Pera ve Kadıköy&apos;de, küçük gruplarla yürüyor.
        </p>
        <Link
          href="/atolyeler"
          data-hover
          className="inline-block font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors"
        >
          atölyelere bak →
        </Link>
      </section>
    </>
  )
}
