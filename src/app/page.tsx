import type { Metadata } from 'next'
import Link from 'next/link'
import { WORKSHOPS, SITE_META, GALLERY_IMAGES } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'
import { WorkshopCard3D } from '@/components/WorkshopCard3D'
import { WorkshopAssistant } from '@/components/WorkshopAssistant'
import { ArticleCard } from '@/components/ArticleCard'
import { RevealSection } from '@/components/RevealSection'
import { MarqueeStrip } from '@/components/MarqueeStrip'
import { Gallery } from '@/components/Gallery'
import { ClientStats } from '@/components/ClientStats'
import { InstagramSection } from '@/components/InstagramSection'
import { T } from '@/components/LangText'

export const metadata: Metadata = {
  title: {
    absolute: 'Techne Lab İstanbul — Tiyatro & Drama Atölyeleri',
  },
  description:
    'İstanbul\'da oyunculuk, yaratıcı drama, İngilizce drama, yazarlık ve müzikal atölyeleri. Taksim & Kadıköy\'de küçük gruplar, yoğun pratik, seyircili final performansları.',
  alternates: { canonical: SITE_META.url },
  keywords: [
    'yaratıcı drama istanbul',
    'ingilizce drama',
    'ingilizce yaratıcı drama',
    'ingilizce tiyatro istanbul',
    'tiyatro atölyesi istanbul',
    'oyunculuk kursu istanbul',
    'oyunculuk atölyesi',
    'yazarlık atölyesi istanbul',
    'dramaturji',
    'drama kursu istanbul',
    'müzikal tiyatro kursu',
    'broadway dans istanbul',
    'kamera önü oyunculuk',
    'bağımsız tiyatro istanbul',
    'yetişkinler için drama',
    'gençler için ingilizce drama',
    'techne lab',
  ],
  openGraph: {
    title: 'Techne Lab İstanbul — Tiyatro & Performans Atölyeleri',
    description: 'Oyunculuk, yazarlık, kamera ve dramaturji. İstanbul\'un bağımsız tiyatro laboratuvarı.',
    url: SITE_META.url,
    images: [{ url: `${SITE_META.url}/images/yagiz-bw.jpg`, width: 1200, height: 800, alt: 'Techne Lab İstanbul' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_META.name,
  url: SITE_META.url,
  logo: `${SITE_META.url}/images/techne-logo.png`,
  description: SITE_META.description,
  foundingDate: '2026',
  address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' },
  contactPoint: { '@type': 'ContactPoint', email: SITE_META.email, contactType: 'customer service' },
  sameAs: ['https://www.instagram.com/technelabistanbul'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tiyatro Atölyeleri',
    itemListElement: WORKSHOPS.map((w) => ({
      '@type': 'Course',
      name: `${w.title} — ${w.sub}`,
      description: w.desc,
      provider: { '@type': 'Organization', name: SITE_META.name },
    })),
  },
}

export default function HomePage() {
  const articles       = getAllArticles().slice(0, 3)
  const activeWorkshops = WORKSHOPS.filter((w) => w.active)
  const previewImages  = GALLERY_IMAGES.slice(0, 8)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Eylül 2025 Sezon Duyuru Bandı ── */}
      <Link
        href="/atolyeler"
        className="group flex items-center justify-between w-full bg-neon text-bg px-4 md:px-14 py-3.5 hover:bg-fg transition-colors duration-300"
        aria-label="Eylül 2025 Sezonu atölyelerimiz"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
            <T tr="Yeni Sezon" en="New Season" />
          </span>
          <span className="w-px h-3 bg-bg/30" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase font-medium">
            <T tr="Eylül 2025 Atölyeleri Açıldı" en="September 2025 Workshops Open" />
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase group-hover:translate-x-1 transition-transform duration-200">
          <T tr="Programlar →" en="See programs →" />
        </span>
      </Link>

      {/* ════════════════════════════════════════════════════════════
          HERO — Full-width, Techne Lab ön planda
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-bg"
        aria-label="Hero"
      >
        {/* Neon left rule */}
        <div className="hero-rule absolute top-0 left-0 w-[3px] h-full bg-neon z-10" aria-hidden="true" />

        {/* Subtle background grid */}
        <div className="absolute inset-0 bauhaus-grid" />


        {/* ── TOP: Eyebrow + Headline + Slogan ── */}
        <div className="relative z-10 px-4 md:px-14 pt-28 max-w-[1400px]">
          {/* Headline */}
          <h1
            className="hero-rise hero-rise-1 font-display leading-none text-fg mb-6"
            style={{ fontSize: 'clamp(44px, 7.5vw, 110px)', letterSpacing: '0.01em' }}
          >
            <span className="block">TECHNE</span>
            <span className="block">
              <span className="inline-block bg-neon text-bg px-[0.14em] -ml-[0.06em]" style={{ lineHeight: 0.95 }}>
                LAB
              </span>
              <span className="text-neon" aria-hidden="true">*</span>
            </span>
            <span
              className="block"
              style={{ fontSize: '0.34em', letterSpacing: '0.22em', color: 'transparent', WebkitTextStroke: '1.5px var(--fg)' }}
            >
              İSTANBUL
            </span>
          </h1>

          {/* Slogan */}
          <p
            className="hero-rise hero-rise-2 font-mono text-neon/70 mt-1"
            style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.22em' }}
          >
            DISCIPLINE IS FREEDOM.<span className="cursor-blink ml-1 text-neon" aria-hidden="true">▮</span>
          </p>

          {/* Tagline — Bağımsız Tiyatro kimliği, logo bloğunun altında */}
          <div className="hero-rise hero-rise-3 flex items-center gap-3 mt-5 mb-2">
            <div className="w-6 h-px bg-fg/30" />
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-stone">
              <T tr="Bağımsız Tiyatro · Taksim · Kadıköy · 2026—" en="Independent Theatre · Taksim · Kadıköy · 2026—" />
            </p>
          </div>

          {/* Dönen disiplinler — τέχνη'nin halleri */}
          <div className="hero-rise hero-rise-4 flex items-baseline gap-3 mt-6" aria-hidden="true">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">bu sezon →</span>
            <span className="cycle-wrap font-display text-neon" style={{ fontSize: 'clamp(24px, 3vw, 42px)', letterSpacing: '0.03em' }}>
              <span className="cycle-list">
                <span>YAZARLIK</span>
                <span>OYUNCULUK</span>
                <span>İNGİLİZCE DRAMA</span>
                <span>MÜZİKAL</span>
                <span>BROADWAY DANS</span>
                <span>YAZARLIK</span>
              </span>
            </span>
          </div>
        </div>

        {/* ── MID: Kaydırmalı fotoğraf şeridi ── */}
        <div className="hero-rise hero-rise-4 relative z-10 w-full overflow-hidden py-2" aria-hidden="true">
          <div
            className="flex gap-2"
            style={{
              width: 'max-content',
              animation: 'gallery-scroll 32s linear infinite',
            }}
          >
            {[
              '/images/gallery/dslr-zl5a1093.jpg',
              '/images/gallery/mevcudiyet-01.jpg',
              '/images/gallery/auteur-01.jpg',
              '/images/gallery/mevcudiyet-08.jpg',
              '/images/gallery/english-drama-2.jpg',
              '/images/gallery/musical-01.jpg',
              '/images/gallery/dslr-zl5a1079.jpg',
              '/images/gallery/mevcudiyet-06.jpg',
              '/images/gallery/auteur-03.jpg',
              '/images/gallery/dslr-zl5a1044.jpg',
              '/images/gallery/mevcudiyet-04.jpg',
              '/images/gallery/dslr-zl5a1077.jpg',
              // repeat for seamless loop
              '/images/gallery/dslr-zl5a1093.jpg',
              '/images/gallery/mevcudiyet-01.jpg',
              '/images/gallery/auteur-01.jpg',
              '/images/gallery/mevcudiyet-08.jpg',
              '/images/gallery/english-drama-2.jpg',
              '/images/gallery/musical-01.jpg',
              '/images/gallery/dslr-zl5a1079.jpg',
              '/images/gallery/mevcudiyet-06.jpg',
              '/images/gallery/auteur-03.jpg',
              '/images/gallery/dslr-zl5a1044.jpg',
              '/images/gallery/mevcudiyet-04.jpg',
              '/images/gallery/dslr-zl5a1077.jpg',
            ].map((src, i) => (
              <div key={i} className="relative flex-shrink-0 overflow-hidden" style={{ width: '220px', height: '130px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading={i > 7 ? 'lazy' : undefined} decoding="async" width={220} height={130} className="opacity-55 hover:opacity-80 transition-opacity duration-500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM: Manifesto + CTAs ── */}
        <div className="hero-rise hero-rise-5 relative z-10 px-4 md:px-14 pb-14 max-w-[1400px]">
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-24">

            {/* Manifesto */}
            <div className="max-w-md">
              <p className="font-mono text-[14px] text-stone leading-relaxed mb-3">
                <T
                  tr={<>İstanbul&apos;da bağımsız bir tiyatro.{' '}<span className="text-fg font-medium">Oyunculuk, yazarlık, kamera ve dramaturji</span>{' '}üzerine yoğun, küçük gruplu atölyeler.</>}
                  en={<>An independent theatre in Istanbul.{' '}<span className="text-fg font-medium">Acting, playwriting, camera and dramaturgy</span>{' '}— intensive, small-group workshops.</>}
                />
              </p>
              <p className="font-mono text-[12px] text-dim leading-relaxed">
                <T
                  tr="Küçük gruplar. Yoğun pratik. Metin, beden ve kamera — aynı anda."
                  en="Small groups. Intense practice. Text, body and camera — simultaneously."
                />
              </p>
            </div>

            {/* Discipline tags */}
            <div>
              {/* Discipline tags */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { label: 'Oyunculuk',      href: '/atolyeler/auteur-lab' },
                  { label: 'Yazarlık',       href: '/atolyeler/auteur-lab' },
                  { label: 'Kamera',         href: '/atolyeler/camera-praxis' },
                  { label: 'Dans',           href: '/atolyeler/broadway-musical-dance' },
                  { label: 'Müzikal',        href: '/atolyeler/techne-musical-lab' },
                  { label: 'İngilizce Drama',href: '/atolyeler/english-drama-lab' },
                ].map((n) => (
                  <Link key={n.label} href={n.href} className="flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon group-hover:scale-125 transition-transform duration-200" aria-hidden="true" />
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone group-hover:text-fg transition-colors duration-200">
                      {n.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-14 hidden md:flex flex-col items-end gap-2 z-10" aria-hidden="true">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-dim/60">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-fg/20" />
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ════════════════════════════════════════════════════════════
          HAKKINDA — Kısa tanıtım
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section className="relative overflow-hidden border-y border-border bg-bgAlt" aria-label="Hakkında">
          <div className="section-number absolute -top-6 -left-4 select-none" aria-hidden="true">01</div>

          <div className="relative z-10 grid md:grid-cols-[1fr_1fr] min-h-[360px]">
            {/* Left: metin */}
            <div className="px-4 md:px-14 py-20 flex flex-col justify-center border-r border-border">
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-6">
                <T tr="— neyiz biz" en="— who we are" />
              </p>
              <h2
                className="font-display text-fg mb-5 leading-none"
                style={{ fontSize: 'clamp(26px, 4vw, 52px)', letterSpacing: '0.02em' }}
              >
                TECHNE LAB<br />
                <span className="relative">
                  İSTANBUL
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-neon -mb-1" aria-hidden="true" />
                </span>
              </h2>
              <p className="font-mono text-[12px] leading-relaxed text-stone max-w-md mb-6">
                <T
                  tr="Techne Lab İstanbul; yazarlık, oyunculuk, yaratıcı drama, kamera, dans, müzikal ve gençlere yönelik atölyelerle Taksim ve Kadıköy'de faaliyetlerini yürüten bağımsız bir ekiptir."
                  en="Techne Lab Istanbul is an independent team running workshops in acting, playwriting, creative drama, camera, dance, musical theatre and youth programmes across Taksim and Kadıköy."
                />
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {['Oyunculuk', 'Yazarlık', 'Kamera', 'Dans', 'Müzikal', 'Dramaturji'].map((d) => (
                  <span key={d} className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg/50">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: performans fotoğrafı */}
            <div className="relative hidden md:block overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/gallery/auteur-02.jpg"
                alt="Techne Lab atölye"
                loading="lazy"
                decoding="async"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', opacity: 0.85 }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bgAlt/30" />
              <div className="absolute top-0 right-0 w-px h-20 bg-fg/20" />
              <div className="absolute top-0 right-0 h-px w-20 bg-fg/20" />
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ════════════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section className="border-b border-border" aria-label="Techne Lab rakamları">
          <h2 className="sr-only">Techne Lab'ı Anlatan Rakamlar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <ClientStats />
          </div>
        </section>
      </RevealSection>

      {/* ════════════════════════════════════════════════════════════
          ATÖLYELER — 3D Cards
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section className="px-4 md:px-14 py-24 border-b border-border bg-bg" aria-labelledby="workshops-heading">
          <div className="flex items-end justify-between mb-6">
            <div className="relative">
              <div className="section-number absolute -top-10 -left-6" aria-hidden="true">02</div>
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3 relative z-10">çalışma atölyeleri</p>
              <h2
                id="workshops-heading"
                className="font-display text-fg relative z-10"
                style={{ fontSize: 'clamp(28px, 5vw, 68px)', letterSpacing: '0.02em', lineHeight: 1 }}
              >
                PROGRAMLAR
              </h2>
            </div>
            <Link
              href="/atolyeler"
              className="font-mono text-[11px] tracking-[0.16em] uppercase border border-fg/30 text-stone px-4 py-2 hover:bg-fg hover:text-bg transition-all duration-200 hidden md:inline-block"
            >
              tümü →
            </Link>
          </div>

          {/* Assistant */}
          <div className="mb-10">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim mb-3">
              — sana uygun programı bul
            </p>
            <WorkshopAssistant />
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {activeWorkshops.map((w, i) => <WorkshopCard3D key={w.id} workshop={w} index={i} />)}
          </div>
        </section>
      </RevealSection>

      {/* ════════════════════════════════════════════════════════════
          GALERİ — Preview
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section className="border-b border-border bg-bg" aria-labelledby="gallery-heading">
          <div className="px-4 md:px-14 py-16 flex items-end justify-between">
            <div className="relative">
              <div className="section-number absolute -top-10 -left-6" aria-hidden="true">03</div>
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3 relative z-10">fotoğraf arşivi</p>
              <h2
                id="gallery-heading"
                className="font-display text-fg relative z-10"
                style={{ fontSize: 'clamp(28px, 5vw, 68px)', letterSpacing: '0.02em', lineHeight: 1 }}
              >
                GALERİ
              </h2>
            </div>
            <Link
              href="/galeri"
              className="font-mono text-[11px] tracking-[0.16em] uppercase border border-fg/30 text-stone px-4 py-2 hover:bg-fg hover:text-bg transition-all duration-200 hidden md:inline-block"
            >
              tüm galeri →
            </Link>
          </div>

          {/* Preview grid */}
          <div className="px-px pb-px">
            <Gallery images={previewImages} preview={8} />
          </div>

          {/* More link */}
          <div className="px-4 md:px-10 py-8 border-t border-border flex items-center justify-between">
            <p className="font-mono text-[11px] text-stone">
              Atölyelerden ve gösterilerden kareler.
            </p>
            <Link
              href="/galeri"
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone hover:text-fg transition-colors"
            >
              {GALLERY_IMAGES.length} fotoğrafın tamamı →
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* ════════════════════════════════════════════════════════════
          INSTAGRAM
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <InstagramSection />
      </RevealSection>

      {/* ════════════════════════════════════════════════════════════
          MAKALELER
      ════════════════════════════════════════════════════════════ */}
      {articles.length > 0 && (
        <RevealSection>
          <section className="px-4 md:px-14 py-24 bg-bg border-b border-border" aria-labelledby="articles-heading">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3">makale &amp; araştırma</p>
                <h2
                  id="articles-heading"
                  className="font-display text-fg"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 60px)', letterSpacing: '0.02em', lineHeight: 1 }}
                >
                  DÜŞÜNCELERİMİZ
                </h2>
              </div>
              <Link
                href="/makaleler"
                className="font-mono text-[11px] tracking-[0.16em] uppercase border border-fg/30 text-stone px-4 py-2 hover:bg-fg hover:text-bg transition-all duration-200 hidden md:inline-block"
              >
                tümü →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        </RevealSection>
      )}

      {/* ════════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section className="relative overflow-hidden px-4 md:px-14 py-24 bg-ink" aria-labelledby="contact-heading">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon/15 blur-3xl pointer-events-none" aria-hidden="true" />
          <div
            className="section-number absolute top-0 right-0 opacity-20"
            style={{ WebkitTextStroke: '1px rgba(232,229,223,0.12)' }}
            aria-hidden="true"
          >
            05
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-fg/50 mb-4">iletişim</p>
              <h2
                id="contact-heading"
                className="font-display text-fg leading-none mb-4"
                style={{ fontSize: 'clamp(28px, 5.5vw, 80px)', letterSpacing: '0.02em' }}
              >
                BİRLİKTE<br />
                <span style={{ color: '#B8F000' }}>ÜRETELİM</span>
              </h2>
              <p className="font-mono text-[11px] text-fg/50 max-w-xs">
                Atölyeler, işbirlikleri, prodüksiyonlar.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/iletisim"
                className="font-mono text-[11px] tracking-[0.18em] uppercase bg-neon text-ink px-10 py-4 hover:bg-fg hover:text-ink border border-neon transition-all duration-200 text-center whitespace-nowrap"
              >
                iletişime geç
              </Link>
              <a
                href={`mailto:${SITE_META.email}`}
                className="font-mono text-[11px] tracking-[0.12em] text-fg/40 hover:text-fg/70 transition-colors text-center"
              >
                {SITE_META.email}
              </a>
            </div>
          </div>
        </section>
      </RevealSection>
    </>
  )
}
