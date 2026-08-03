import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { TERMS, TERM_GROUPS } from '@/lib/kaynaklar'

const title = 'Tiyatro Sözlüğü — Oyunculuk, Dramaturji ve Müzikal Terimleri'
const description = 'Tiyatro ve oyunculuk terimlerinin açıklamalı sözlüğü. Stanislavski, dramaturji, altmetin, belting, mizansen ve daha fazlası. Türkçe–İngilizce karşılıklarıyla.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_META.url}/kaynaklar/sozluk` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/kaynaklar/sozluk`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Tiyatro Sözlüğü' }],
  },
  keywords: [
    'tiyatro terimleri', 'tiyatro sözlüğü', 'oyunculuk terimleri',
    'dramaturji nedir', 'altmetin nedir', 'mizansen nedir', 'blocking nedir',
    'stanislavski nedir', 'method acting nedir', 'meisner tekniği',
    'yabancılaştırma efekti', 'epik tiyatro', 'belting nedir', 'mix voice nedir',
    'theatre dance nedir', 'devising nedir', 'fiziksel tiyatro nedir',
    'sahne mevcudiyeti', 'dördüncü duvar', 'soliloquy nedir',
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${SITE_META.url}/kaynaklar/sozluk`,
  name: 'Techne Lab Tiyatro Sözlüğü',
  description,
  url: `${SITE_META.url}/kaynaklar/sozluk`,
  inDefinedTermSet: `${SITE_META.url}/kaynaklar/sozluk`,
  hasDefinedTerm: TERMS.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_META.url}/kaynaklar/sozluk#${t.slug}`,
    name: t.term,
    alternateName: t.termEn,
    description: t.short,
    inDefinedTermSet: `${SITE_META.url}/kaynaklar/sozluk`,
    url: `${SITE_META.url}/kaynaklar/sozluk#${t.slug}`,
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: `${SITE_META.url}/kaynaklar` },
    { '@type': 'ListItem', position: 3, name: 'Tiyatro Sözlüğü', item: `${SITE_META.url}/kaynaklar/sozluk` },
  ],
}

export default function SozlukPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <Link href="/kaynaklar" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors mb-4 inline-block">
          ← kaynaklar
        </Link>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(36px,6vw,88px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          TİYATRO<br />SÖZLÜĞÜ
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          Prova salonunda, sınıfta ve metinde geçen terimler. Kısa tanım, ardından ne işe yaradığı.
          İngilizce karşılıklarıyla — çünkü bu alanın literatürü çoğunlukla İngilizce.
        </p>
        <p className="font-mono text-[12px] text-dim">{TERMS.length} terim · {TERM_GROUPS.length} başlık</p>
      </section>

      {/* Hızlı gezinme */}
      <section className="px-4 md:px-10 py-8 border-b border-border bg-bgAlt sticky top-16 z-20">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {TERM_GROUPS.map((g) => (
            <a
              key={g.key}
              href={`#${g.key}`}
              data-hover
              className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors"
            >
              {g.label}
            </a>
          ))}
        </div>
      </section>

      {TERM_GROUPS.map((group) => {
        const items = TERMS.filter((t) => t.group === group.key)
        if (items.length === 0) return null
        return (
          <section key={group.key} id={group.key} className="px-4 md:px-10 py-14 border-b border-border scroll-mt-32">
            <div className="mb-10">
              <h2 className="font-display text-fg mb-2" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
                {group.label.toUpperCase()}
              </h2>
              <p className="font-mono text-[12px] text-dim">{group.desc} · {items.length} terim</p>
            </div>

            <div className="space-y-px bg-border">
              {items.map((t) => (
                <article key={t.slug} id={t.slug} className="bg-bg p-7 md:p-9 scroll-mt-32">
                  <div className="md:grid md:grid-cols-[220px_1fr] md:gap-10">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-display text-neon leading-tight mb-1" style={{ fontSize: 'clamp(19px,1.8vw,26px)' }}>
                        {t.term}
                      </h3>
                      {t.termEn && t.termEn !== t.term && (
                        <p className="font-mono text-[11px] text-dim italic">{t.termEn}</p>
                      )}
                    </div>

                    <div>
                      <p className="font-mono text-[13px] text-fg leading-relaxed mb-4">{t.short}</p>
                      <p className="font-mono text-[12px] text-stone leading-relaxed mb-5">{t.body}</p>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        {t.related && t.related.length > 0 && (
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">ilgili:</span>
                            {t.related.map((r) => {
                              const rt = TERMS.find((x) => x.slug === r)
                              if (!rt) return null
                              return (
                                <a key={r} href={`#${r}`} data-hover className="font-mono text-[11px] text-stone hover:text-neon transition-colors underline decoration-dim underline-offset-4">
                                  {rt.term}
                                </a>
                              )
                            })}
                          </div>
                        )}
                        {t.link && (
                          <Link href={t.link.href} data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-neon hover:text-fg transition-colors">
                            {t.link.label} →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}

      <section className="px-4 md:px-10 py-16">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">terimden pratiğe</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          BİR TERİMİ BİLMEK İLE<br />ONU KULLANABİLMEK AYRI ŞEY.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Altmetnin ne olduğunu okumak beş dakika sürer. Bir sahnede altmetni bulmak ve
          oynayabilmek — orası atölyenin işi.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/atolyeler" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            atölyeler →
          </Link>
          <Link href="/kaynaklar/monologlar" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            monolog kütüphanesi →
          </Link>
        </div>
      </section>
    </>
  )
}
