import type { Metadata } from 'next'
import Link from 'next/link'
import { WORKSHOPS, SITE_META, GALLERY_IMAGES } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'
import { WorkshopCard3D } from '@/components/WorkshopCard3D'
import { WorkshopAssistant } from '@/components/WorkshopAssistant'
import { ArticleCard } from '@/components/ArticleCard'
import { RevealSection } from '@/components/RevealSection'
import { Gallery } from '@/components/Gallery'
import { ClientStats } from '@/components/ClientStats'
import { InstagramSection } from '@/components/InstagramSection'
import { T } from '@/components/LangText'
import { DisciplineGrid } from '@/components/DisciplineGrid'
import { Yorumlar } from '@/components/Yorumlar'

export const metadata: Metadata = {
  title: {
    absolute: 'Techne Lab İstanbul — Oyunculuk, Dans, Müzikal & Yazarlık Atölyeleri',
  },
  description:
    'İstanbul\'da oyunculuk kursu, yaratıcı drama, İngilizce drama ve konuşma kulübü, Broadway müzikal dansı, oyun yazarlığı ve dramaturji atölyeleri. Pera & Kadıköy\'de küçük gruplar, yoğun pratik, seyircili final performansları.',
  alternates: { canonical: SITE_META.url },
  keywords: [
    // — Oyunculuk
    'oyunculuk kursu istanbul',
    'oyunculuk atölyesi',
    'oyunculuk atölyeleri istanbul',
    'acting workshop istanbul',
    'acting academy istanbul',
    'profesyonel oyunculuk eğitimi',
    'kamera önü oyunculuk',
    'sahne oyunculuğu kursu',
    'oyunculuk dersi kadıköy',

    // — Yaratıcı drama
    'yaratıcı drama istanbul',
    'drama kursu istanbul',
    'yetişkinler için drama',
    'drama atölyesi kadıköy',

    // — İngilizce drama & konuşma
    'ingilizce drama',
    'ingilizce yaratıcı drama',
    'ingilizce tiyatro istanbul',
    'english drama istanbul',
    'english acting workshop',
    'english acting istanbul',
    'ingilizce konuşma kulübü',
    'konuşma kulübü istanbul',
    'ingilizce konuşma pratiği istanbul',
    'gençler için ingilizce drama',

    // — Dans
    'dans kursu istanbul',
    'dans atölyesi istanbul',
    'modern dans kursu',
    'jazz dans istanbul',
    'theatre dance istanbul',
    'street dance istanbul',
    'sokak dansı kursu',
    'koreografi atölyesi',
    'dans dersi kadıköy',

    // — Müzikal & Broadway
    'müzikal tiyatro kursu',
    'müzikal kursu istanbul',
    'broadway dans istanbul',
    'broadway müzikal dansı',
    'musical theatre istanbul',
    'şan ve dans atölyesi',

    // — Yazarlık & dramaturji
    'yazarlık atölyesi istanbul',
    'yaratıcı yazarlık atölyesi',
    'oyun yazarlığı kursu',
    'dramaturji',
    'dramaturji atölyesi',
    'kurmaca yazarlık atölyesi',
    'senaryo atölyesi istanbul',
    'senaryo yazarlığı kursu',
    'metin yazarlığı atölyesi',

    // — Akademi & okul
    'sanat okulu istanbul',
    'sanat akademisi istanbul',
    'art academy istanbul',
    'performans sanatları okulu',
    'tiyatro okulu istanbul',
    'özel tiyatro atölyesi',

    // — Genel & marka
    'tiyatro atölyesi istanbul',
    'bağımsız tiyatro istanbul',
    'sahne sanatları atölyesi',
    'techne lab',
    'techne lab istanbul',
  ],
  openGraph: {
    title: 'Techne Lab İstanbul — Oyunculuk, Dans, Müzikal & Yazarlık Atölyeleri',
    description: 'Oyunculuk kursu, yaratıcı drama, İngilizce drama, oyun yazarlığı, dramaturji, dans ve müzikal. İstanbul\'un bağımsız tiyatro laboratuvarı — Pera & Kadıköy.',
    url: SITE_META.url,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Techne Lab İstanbul — Bağımsız Tiyatro' }],
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

      {/* ════════════════════════════════════════════════════════════
          HERO — 13 Eylül 2026 yeniden tasarımı ("Siyah Kutu")
          Siyah yüzey, Anton dev tipografi, neon tek kelimede.
          Grid, marquee, mono etiket yok — göz yorgunluğu buradan başlıyordu.
      ════════════════════════════════════════════════════════════ */}
      <section
        className="surface-dark relative overflow-hidden pt-[64px]"
        aria-label="Hero"
      >
        <div className="px-6 md:px-12 pt-16 md:pt-24 pb-14 md:pb-16">
          {/* Etiket — hafif eğik neon şerit */}
          <Link
            href="/atolyeler"
            className="inline-block bg-neon text-ink font-display text-[18px] md:text-[22px] tracking-[0.06em] px-4 py-2 -rotate-2 hover:rotate-0 transition-transform duration-200 mb-8 md:mb-10"
            data-hover
          >
            <T tr="2026–27 SEZONU · KAYITLAR AÇIK" en="2026–27 SEASON · ENROLMENT OPEN" />
          </Link>

          <h1
            className="font-display text-fg leading-[1.02] tracking-[0.005em]"
            style={{ fontSize: 'clamp(64px, 14.5vw, 210px)' }}
          >
            <T tr={<>DİSİPLİN<br /><span className="text-neon">ÖZGÜRLÜKTÜR.</span></>} en={<>DISCIPLINE<br /><span className="text-neon">IS FREEDOM.</span></>} />
          </h1>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <p className="font-body text-[19px] md:text-[24px] leading-[1.4] text-fg max-w-[620px]">
              <T
                tr="İstanbul'da bağımsız bir tiyatro laboratuvarı. Oyunculuk, yazarlık, İngilizce drama ve müzikal — küçük gruplar, seyircili final."
                en="An independent theatre laboratory in Istanbul. Acting, playwriting, English drama and musical theatre — small groups, live final."
              />
            </p>
            <div className="flex gap-8 md:gap-10">
              {[
                { n: '12', tr: 'MAKS. KİŞİ', en: 'MAX PER GROUP' },
                { n: String(WORKSHOPS.filter((w) => w.active).length), tr: 'PROGRAM', en: 'PROGRAMMES' },
                { n: '2', tr: 'SEMT · PERA & KADIKÖY', en: 'DISTRICTS · PERA & KADIKÖY' },
              ].map((f) => (
                <div key={f.tr} className="border-l-2 border-neon pl-3.5">
                  <span className="block font-display text-[36px] md:text-[40px] leading-none text-fg">{f.n}</span>
                  <span className="block font-code text-[12px] tracking-[0.04em] text-dim mt-1.5 max-w-[120px] leading-snug"><T tr={f.tr} en={f.en} /></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neon disiplin şeridi — sabit, hareketsiz */}
        <Link href="/atolyeler" className="block bg-neon text-ink hover:bg-fg hover:text-ink transition-colors duration-200 overflow-hidden" data-hover aria-label="Programlar">
          <div className="font-display text-[20px] md:text-[28px] tracking-[0.06em] px-6 md:px-12 py-3.5 md:py-4 whitespace-nowrap">
            <T
              tr="YAZARLIK · OYUNCULUK · İNGİLİZCE DRAMA · MÜZİKAL · BROADWAY DANSI · YAZARLIK · OYUNCULUK · İNGİLİZCE DRAMA · MÜZİKAL"
              en="PLAYWRITING · ACTING · ENGLISH DRAMA · MUSICAL THEATRE · BROADWAY DANCE · PLAYWRITING · ACTING · ENGLISH DRAMA"
            />
          </div>
        </Link>
      </section>

      {/* ════════════════════════════════════════════════════════════
          DİSİPLİNLER — hero'nun hemen altı.
          Sayfanın en değerli SEO alanı burası; keyword'ler dipteki
          bir metin yığınında değil, tıklanabilir navigasyonda duruyor.
      ════════════════════════════════════════════════════════════ */}
      <DisciplineGrid />


      {/* ════════════════════════════════════════════════════════════
          NASIL ÇALIŞIRIZ — Metodoloji (kimlik tekrarı değil)
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <section className="relative overflow-hidden border-y border-border bg-bgAlt" aria-label="Metodoloji">
          <div className="section-number absolute -top-6 -left-4 select-none" aria-hidden="true">01</div>

          <div className="relative z-10 grid md:grid-cols-[1fr_1fr] min-h-[360px]">
            {/* Left: metodoloji */}
            <div className="px-4 md:px-14 py-20 flex flex-col justify-center border-r border-border">
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-6">
                <T tr="— nasıl çalışırız" en="— how we work" />
              </p>
              <h2
                className="font-display text-fg mb-5 leading-none"
                style={{ fontSize: 'clamp(26px, 4vw, 52px)', letterSpacing: '0.02em' }}
              >
                <T tr={<>KÜÇÜK GRUPLAR,<br />YOĞUN PRATİK.</>} en={<>SMALL GROUPS,<br />DEEP PRACTICE.</>} />
              </h2>
              <p className="font-mono text-[12px] leading-relaxed text-stone max-w-md mb-8">
                <T
                  tr="Her program seyircili bir final performansıyla noktalanır. Metin, beden ve ses — aynı anda, aynı stüdyoda."
                  en="Every programme ends with a live final performance. Text, body and voice — simultaneously, in the same studio."
                />
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { tr: 'Maksimum 12 kişilik gruplar', en: 'Max 12 per group' },
                  { tr: 'Haftada 1–2 gün yoğun pratik', en: '1–2 sessions per week' },
                  { tr: 'Seyircili final performansı', en: 'Live final performance' },
                  { tr: 'Pera ve Kadıköy stüdyoları', en: 'Pera & Kadıköy studios' },
                ].map((item) => (
                  <li key={item.tr} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-neon flex-shrink-0" aria-hidden="true" />
                    <span className="font-mono text-[11px] tracking-[0.1em] text-stone">
                      <T tr={item.tr} en={item.en} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Sezon paneli — tipografik, görsel yok */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-bg gap-7 py-16 px-6 md:px-12">
              {/* Neon üst çizgi */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" aria-hidden="true" />

              <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-neon">
                <T tr="— aktif kayıt" en="— now enrolling" />
              </p>

              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-stone mb-3">
                  2026 — 2027
                </p>
                <h3
                  className="font-display text-fg leading-none mb-4"
                  style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', letterSpacing: '0.02em' }}
                >
                  <T tr={<>EYLÜL SEZONU<br />ATÖLYELERİ</>} en={<>SEPTEMBER<br />SEASON</>} />
                </h3>
                <p className="font-mono text-[12px] leading-relaxed text-stone max-w-sm">
                  <T
                    tr="Dört disiplin, dokuz program. Kayıtlar açık — gruplar dolduğunda kapanıyor."
                    en="Four disciplines, nine programmes. Enrolment is open — groups close when full."
                  />
                </p>
              </div>

              <ul className="flex flex-col gap-2 border-l border-neon/30 pl-4">
                {[
                  { tr: 'Yaratıcı yazarlık · dramaturji', en: 'Playwriting · dramaturgy' },
                  { tr: 'Oyunculuk · kamera önü', en: 'Acting · on-camera' },
                  { tr: 'İngilizce drama · 10–17 ve yetişkin', en: 'English drama · youth & adults' },
                  { tr: 'Müzikal · Broadway dansı', en: 'Musical theatre · Broadway dance' },
                ].map((item) => (
                  <li key={item.tr} className="font-mono text-[11px] tracking-[0.08em] text-stone">
                    <T tr={item.tr} en={item.en} />
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/atolyeler"
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon border-b border-neon/40 hover:border-neon pb-0.5 transition-colors duration-200 self-start"
                data-hover
              >
                <T tr="programları incele →" en="browse programmes →" />
              </Link>

              {/* Köşe dekor */}
              <div className="absolute bottom-0 right-0 w-px h-20 bg-fg/10" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 h-px w-20 bg-fg/10" aria-hidden="true" />
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
          KATILIMCI YORUMLARI
      ════════════════════════════════════════════════════════════ */}
      <RevealSection>
        <Yorumlar />
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
                  BLOG
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

          {/* bg-ink is always #0A0A0C — all text must be hardcoded light to survive light-mode */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-[#E8E5DF]/50 mb-4">iletişim</p>
              <h2
                id="contact-heading"
                className="font-display text-[#E8E5DF] leading-none mb-4"
                style={{ fontSize: 'clamp(28px, 5.5vw, 80px)', letterSpacing: '0.02em' }}
              >
                BİRLİKTE<br />
                <span style={{ color: '#B8F000' }}>ÜRETELİM</span>
              </h2>
              <p className="font-mono text-[11px] text-[#E8E5DF]/50 max-w-xs">
                Atölyeler, işbirlikleri, prodüksiyonlar.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/iletisim"
                className="font-mono text-[11px] tracking-[0.18em] uppercase bg-neon text-bg px-10 py-4 hover:bg-[#E8E5DF] hover:text-ink border border-neon transition-all duration-200 text-center whitespace-nowrap"
              >
                iletişime geç
              </Link>
              <a
                href={`mailto:${SITE_META.email}`}
                className="font-mono text-[11px] tracking-[0.12em] text-[#E8E5DF]/40 hover:text-[#E8E5DF]/70 transition-colors text-center"
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
