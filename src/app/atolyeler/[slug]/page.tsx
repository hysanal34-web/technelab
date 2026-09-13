import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { DISCIPLINES } from '@/lib/disiplinler'
import { findTeamMembersForInstructor } from '@/lib/ekip'
import { getWorkshopFaq } from '@/lib/faq'
import { yorumlarFor } from '@/lib/yorumlar'
import { ProgramYorumlari } from '@/components/Yorumlar'
import { TrackProgramView } from '@/components/PixelEvents'
import { StickyApplyBar } from '@/components/StickyApplyBar'
import { priceSummary } from '@/lib/fiyat'
type Props = { params: Promise<{ slug: string }> }


export async function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = WORKSHOPS.find((w) => w.slug === slug)
  if (!w) return {}
  return {
    title: w.seoTitle,
    description: w.seoDesc,
    alternates: { canonical: `${SITE_META.url}/atolyeler/${w.slug}` },
    openGraph: {
      title: w.seoTitle, description: w.seoDesc,
      url: `${SITE_META.url}/atolyeler/${w.slug}`,
      images: w.images?.[0]
        ? [{ url: `${SITE_META.url}/images/gallery/${w.images[0]}.jpg`, width: 1200, height: 800, alt: `${w.title} — ${w.sub}` }]
        : undefined,
    },
  }
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params
  const w = WORKSHOPS.find((w) => w.slug === slug)
  if (!w) notFound()

  // SEO: bu programı listeleyen disiplin sayfaları (spoke → hub iç bağlantısı)
  const hubs = DISCIPLINES.filter((d) => d.workshopSlugs.includes(w.slug))

  // Eğitmen adını /ekip/[slug] profiline bağla (varsa) — E-E-A-T iç linki
  const instructorMembers = findTeamMembersForInstructor(w.instructor)

  // Schema startDate: '7 Ekim Çarşamba' gibi Türkçe tarihleri ISO'ya çevir.
  // Çevrilemezse startDate hiç yazılmaz — yanlış tarih vermekten iyidir.
  const TR_MONTHS: Record<string, string> = {
    ocak: '01', şubat: '02', mart: '03', nisan: '04', mayıs: '05', haziran: '06',
    temmuz: '07', ağustos: '08', eylül: '09', ekim: '10', kasım: '11', aralık: '12',
  }
  const toIsoDate = (tr: string): string | undefined => {
    const m = tr.toLocaleLowerCase('tr-TR').match(/(\d{1,2})\s+([a-zçğıöşü]+)/)
    if (!m || !TR_MONTHS[m[2]]) return undefined
    const year = new Date().getFullYear()
    return `${year}-${TR_MONTHS[m[2]]}-${m[1].padStart(2, '0')}`
  }
  const startDate = w.schedule?.[0] ? toIsoDate(w.schedule[0].date) : undefined

  const courseImage = w.images?.[0]
    ? `${SITE_META.url}/images/gallery/${w.images[0]}.jpg`
    : `${SITE_META.url}/images/og-techne-lab.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_META.url}/atolyeler/${w.slug}#course`,
    name: `${w.title} — ${w.sub}`,
    description: w.desc,
    url: `${SITE_META.url}/atolyeler/${w.slug}`,
    image: courseImage,
    inLanguage: w.category === 'ingilizce-drama' ? ['tr', 'en'] : 'tr',
    teaches: w.tags.join(', '),
    keywords: w.tags.join(', '),
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_META.url}#organization`,
      name: SITE_META.name,
      url: SITE_META.url,
    },
    // Fiyat sitede gösterilmiyor; schema'da da rakam vermiyoruz.
    // Google, sayfada olmayan bir fiyatı schema'da görürse uyuşmazlık uyarısı veriyor.
    offers: {
      '@type': 'Offer',
      availability: w.active ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `${SITE_META.url}/atolyeler/${w.slug}`,
      validFrom: new Date().toISOString().slice(0, 10),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      courseWorkload: w.duration,
      ...(startDate ? { startDate } : {}),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: `Techne Lab — ${w.venue}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: w.venue.includes('Pera') ? 'Beyoğlu' : 'Kadıköy',
          addressRegion: 'İstanbul',
          addressCountry: 'TR',
        },
      },
      instructor: {
        '@type': 'Person',
        name: w.instructor !== 'Techne Lab' ? w.instructor : 'Techne Lab',
        description: w.instructor !== 'Techne Lab' ? w.instructorBio : undefined,
      },
      maximumAttendeeCapacity: typeof w.maxStudents === 'number' ? w.maxStudents : undefined,
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Techne Lab İstanbul', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: 'Atölyeler', item: `${SITE_META.url}/atolyeler` },
      { '@type': 'ListItem', position: 3, name: `${w.title} — ${w.sub}`, item: `${SITE_META.url}/atolyeler/${w.slug}` },
    ],
  }

  // Programa özel SSS — Google "Bunlar da soruldu" kutuları için
  const faq = getWorkshopFaq(w)
  const yorumlar = yorumlarFor(w.slug)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Meta: program görüntülendi — yeniden pazarlama havuzu */}
      <TrackProgramView name={w.title} price={priceSummary(w)?.current ?? w.price} slug={w.slug} />

      {/* Hero Görsel */}
      {w.images && w.images[0] && (
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(460px,65vh,740px)' }}>
          <Image
            src={`/images/gallery/${w.images[0]}.jpg`}
            alt={`${w.title} — ${w.sub}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              filter: 'brightness(0.42)',
              objectPosition: w.slug === 'english-drama-final-project' ? 'center top' : 'center center',
            }}
          />
          {/* Gradient: üst hafif, alt yoğun — metin okuma konforu */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,12,0.15) 0%, rgba(10,10,12,0.45) 45%, rgba(10,10,12,0.96) 100%)' }} />
          {/* Neon üst çizgi */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-neon" />

          {/* ── Merkez metin bloku ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-16">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-neon mb-5">
              atölye · {w.code}
            </p>
            {/* SEO: alt başlık (anahtar kelimeler) H1'in içinde — görsel aynı */}
            <h1 className="mb-6">
              <span
                className="font-display text-white block mb-4"
                style={{ fontSize: 'clamp(44px,7.5vw,108px)', letterSpacing: '0.01em', lineHeight: 0.88 }}
              >
                {w.title}
              </span>
              <span className="font-mono font-normal text-[14px] md:text-[16px] italic text-white/55 block">
                {w.sub}
              </span>
            </h1>
            {w.instructor && w.instructor !== 'Techne Lab' && (
              <>
                <div className="h-px w-10 bg-neon/50 mb-5" />
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/70">
                  {instructorMembers.length > 0
                    ? instructorMembers.map((m, i) => (
                        <span key={m.slug}>
                          {i > 0 && ' · '}
                          <Link href={`/ekip/${m.slug}`} className="hover:text-neon transition-colors" data-hover>
                            {m.name}
                          </Link>
                        </span>
                      ))
                    : w.instructor}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero (görselsiz fallback başlık) */}
      {(!w.images || !w.images[0]) && (
        <div className="relative border-b border-border">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-neon" />
          <div className="px-4 md:px-10 pt-24 pb-8">
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">atölye · {w.code}</p>
            <h1 className="mb-3">
              <span className="font-display text-fg block mb-3" style={{ fontSize: 'clamp(40px,6.5vw,96px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
                {w.title}
              </span>
              <span className="font-mono font-normal text-[16px] italic text-stone block">{w.sub}</span>
            </h1>
            {w.instructor && w.instructor !== 'Techne Lab' && (
              <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-stone mt-4">
                {instructorMembers.length > 0
                  ? instructorMembers.map((m, i) => (
                      <span key={m.slug}>
                        {i > 0 && ' · '}
                        <Link href={`/ekip/${m.slug}`} className="hover:text-neon transition-colors" data-hover>
                          {m.name}
                        </Link>
                      </span>
                    ))
                  : w.instructor}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Info bloku */}
      <section className="relative border-b border-border">
        {(!w.images || !w.images[0]) && <div className="absolute top-0 inset-x-0 h-0.5 bg-neon" />}
        <div className="px-4 md:px-10 pt-12 pb-16 grid md:grid-cols-[1fr_320px] gap-16 items-start">
          <div className="order-2 md:order-1">
            {w.images && w.images[0] && (
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">atölye · {w.code}</p>
            )}
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim mb-6">{w.tagline}</p>
            <p className="font-mono text-[15px] text-stone leading-relaxed max-w-xl">{w.desc}</p>
          </div>

          {/* Satın alma kutusu */}
          <aside className="order-1 md:order-2 sticky top-20 border border-border bg-bgAlt p-6 md:p-8" aria-label="Kayıt bilgileri">
            {/* Başlangıç tarihi — karar anındaki ilk soru */}
            {(w.schedule?.length || w.scheduleNote) && (
              <div className="mb-6 pb-6 border-b border-border">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-3">başlangıç</p>
                {w.schedule?.length ? (
                  w.schedule.map((s) => (
                    <div key={`${s.place}-${s.date}`} className="flex items-baseline gap-2 mb-1.5 last:mb-0">
                      <span className="font-display text-fg leading-none" style={{ fontSize: 17 }}>{s.date}</span>
                      {s.time && <span className="font-mono text-[11px] text-stone">{s.time}</span>}
                      {s.place && <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-neon">· {s.place}</span>}
                    </div>
                  ))
                ) : (
                  <p className="font-mono text-[12px] text-stone">{w.scheduleNote}</p>
                )}
              </div>
            )}

            <div className="space-y-4 mb-8">
              {[
                ['mekân', `${w.venue} — kayıt sonrası adres iletilir`],
                ['süre', w.duration],
                ['kontenjan', `max. ${w.maxStudents} kişi`],
                ...(w.ageRange ? [['yaş', w.ageRange]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone w-16 shrink-0 pt-0.5">{k}</span>
                  <span className="font-mono text-[13px] text-fg">{v}</span>
                </div>
              ))}
            </div>

            {/* Katılım koşulları — rakam yerine kontenjan ve kapsam.
                Fiyat başvuru sonrası birebir paylaşılıyor; sitede etiket yok. */}
            {w.active && (
              <div className="border-t border-border pt-6 mb-6">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-4">
                  katılım
                </p>
                <ul className="flex flex-col gap-2 mb-4">
                  {[
                    typeof w.maxStudents === 'number' ? `Kontenjan ${w.maxStudents} kişiyle sınırlı` : null,
                    w.ageRange ?? null,
                    w.duration,
                    w.venue,
                    // Tüm programlarda görünür — fiyat gizli olsa da ödeme kolaylığı satın alma engelini düşürüyor.
                    'Kredi kartına taksit seçenekleri mevcuttur',
                  ].filter(Boolean).map((line) => (
                    <li key={line as string} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-neon flex-shrink-0 mt-2" aria-hidden="true" />
                      <span className="font-mono text-[12px] text-stone leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
                {/* Burs — Musical Lab ve Youth'ta. Başvuru değerlendirmesiyle veriliyor. */}
                {typeof w.scholarshipPercent === 'number' && (
                  <div className="border border-neon/30 bg-neon/[0.04] px-4 py-3 mb-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon mb-1">
                      %{w.scholarshipPercent}&apos;e varan burs
                    </p>
                    <p className="font-mono text-[11px] text-stone leading-relaxed">
                      Başvurunuz değerlendirildikten sonra, uygun görülen katılımcılara
                      program bedelinde %{w.scholarshipPercent}&apos;e varan burs uygulanır.
                    </p>
                  </div>
                )}

                {/* Arkadaşınla gel — tüm programlarda geçerli.
                    Yalnızca oran yazılı, tutar değil. */}
                {typeof w.friendDiscountPercent === 'number' && (
                  <div className="border border-neon/30 bg-neon/[0.04] px-4 py-3 mb-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon mb-1">
                      arkadaşınla gel · %{w.friendDiscountPercent} indirim
                    </p>
                    <p className="font-mono text-[11px] text-stone leading-relaxed">
                      Bir arkadaşınızla birlikte kayıt olduğunuzda ikinizin ücretinde de
                      %{w.friendDiscountPercent} indirim uygulanır.
                    </p>
                  </div>
                )}

                {/* Ücret sitede yayınlanmıyor — merak eden WhatsApp'a yönlendiriliyor. */}
                <p className="font-mono text-[11px] text-dim leading-relaxed">
                  Ücret ve ödeme seçenekleri için{' '}
                  <a
                    href={`https://wa.me/${SITE_META.phoneE164.replace('+', '')}?text=${encodeURIComponent(
                      `Merhaba, ${w.title} programı hakkında bilgi alabilir miyim?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone underline hover:text-neon transition-colors"
                  >
                    WhatsApp&apos;tan yaz
                  </a>{' '}
                  ya da{' '}
                  <a href={`tel:${SITE_META.phoneE164}`} className="text-stone underline hover:text-neon transition-colors">
                    {SITE_META.phone}
                  </a>{' '}
                  numarasını ara.
                </p>
              </div>
            )}

            {!w.active ? (
              <div className="border border-stone/30 bg-bgAlt px-6 py-5 text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-stone mb-2">Kayıt Kapalı</p>
                <p className="font-mono text-[11px] text-dim leading-relaxed mb-4">
                  Bu program şu an aktif kayıt almıyor. Bilgi almak için bize ulaşın.
                </p>
                <a
                  href={`mailto:${SITE_META.email}?subject=${encodeURIComponent(`${w.title} — Bilgi Talebi`)}`}
                  className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-fg border border-stone/40 text-center py-3 px-6 transition-colors duration-200 inline-block"
                  data-hover
                >
                  bilgi al →
                </a>
              </div>
            ) : (
              <Link
                href={`/atolyeler/${w.slug}/kayit`}
                className="block font-mono text-[11px] tracking-[0.14em] uppercase text-bg bg-neon hover:bg-fg border border-neon text-center py-4 transition-all duration-200"
                data-hover
              >
                başvur →
              </Link>
            )}
          </aside>
        </div>
      </section>

      {/* Müfredat */}
      <section className="px-4 md:px-10 py-20 border-b border-border" aria-labelledby="curriculum-heading">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-stone mb-4">müfredat</p>
        <h2 id="curriculum-heading" className="font-display text-fg mb-12" style={{ fontSize: 'clamp(28px,4vw,56px)', letterSpacing: '0.02em', lineHeight: 1 }}>
          PROGRAM İÇERİĞİ
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {w.blocks.map((b) => (
            <div key={b.title} className="bg-bg p-8 border-t-2 border-neon">
              {b.span && (
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone mb-4">{b.span}</p>
              )}
              <h3 className="font-display text-fg mb-4" style={{ fontSize: 'clamp(18px,2vw,24px)', letterSpacing: '0.02em' }}>
                {b.title}
              </h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Foto Strip */}
      {w.images && w.images.length > 1 && (
        <section className="border-b border-border" aria-label="Atölye görselleri">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {w.images.slice(1, 5).map((img, i) => (
              <div
                key={img}
                className="overflow-hidden"
                style={{ height: 'clamp(160px,18vw,260px)', position: 'relative' }}
              >
                <Image
                  src={`/images/gallery/${img}.jpg`}
                  alt={`${w.title} atölyesinden kare ${i + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDL Ailesi — diğer English Drama programları */}
      {w.edlFamily && w.edlFamily.length > 0 && (() => {
        const related = w.edlFamily!.map(slug => WORKSHOPS.find(x => x.slug === slug)).filter(Boolean) as typeof WORKSHOPS
        return (
          <section className="px-4 md:px-10 py-16 border-b border-border" aria-labelledby="edl-heading">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone mb-3">english drama lab ailesi</p>
            <h2 id="edl-heading" className="font-display text-fg mb-10" style={{ fontSize: 'clamp(22px,3vw,40px)', letterSpacing: '0.02em', lineHeight: 1 }}>
              DİĞER ENGLISH DRAMA PROGRAMLARI
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/atolyeler/${r.slug}`}
                  className="group border border-border p-6 hover:border-neon/50 transition-colors duration-200 block"
                >
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone mb-2 group-hover:text-neon transition-colors duration-200">{r.code} · {r.duration}</p>
                  <h3 className="font-display text-fg mb-1" style={{ fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '0.02em' }}>{r.title}</h3>
                  <p className="font-mono text-[11px] italic text-stone mb-4">{r.tagline}</p>
                  <p className="font-mono text-[11px] text-dim leading-relaxed mb-5 line-clamp-3">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-dim">{r.venue}</span>
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon group-hover:tracking-[0.2em] transition-all duration-200">İncele →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })()}

      {/* Katılımcı yorumları — SSS'ten önce, karar anına yakın */}
      {yorumlar.length > 0 && (
        <div className="px-4 md:px-10">
          <ProgramYorumlari yorumlar={yorumlar} />
        </div>
      )}

      {/* SSS — Google "Bunlar da soruldu" kutuları */}
      <section className="px-4 md:px-10 py-16 border-b border-border" aria-labelledby="sss-heading">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-neon mb-3">merak edilenler</p>
        <h2 id="sss-heading" className="font-display text-fg mb-10" style={{ fontSize: 'clamp(22px,3vw,40px)', letterSpacing: '0.02em', lineHeight: 1 }}>
          SIKÇA SORULAN SORULAR
        </h2>
        <div className="max-w-3xl space-y-8">
          {faq.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[18px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <p className="font-mono text-[12px] text-dim mb-4">Sorunun cevabı burada yoksa doğrudan yaz — hızlı dönüyoruz.</p>
          <Link href="/iletisim" className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon hover:text-fg transition-colors">
            iletişime geç →
          </Link>
        </div>
      </section>

      {/* Tags */}
      <section className="px-4 md:px-10 py-10 flex flex-wrap items-center gap-3 border-b border-border" aria-label="Kategoriler">
        {w.tags.map((t) => (
          <span key={t} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone border border-border px-3 py-1.5">
            {t}
          </span>
        ))}
      </section>

      {/* Lokasyon + disiplin bağlantıları — iç link (spoke → hub) */}
      <section className="px-4 md:px-10 py-10 border-b border-border">
        {hubs.length > 0 && (
          <>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-4">bu programın alanı</span>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
              {hubs.map((d) => (
                <Link key={d.slug} href={`/${d.slug}`} className="font-mono text-[12px] text-stone hover:text-neon transition-colors">
                  {d.label} — İstanbul →
                </Link>
              ))}
            </div>
          </>
        )}
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-4">bu bölgedeki diğer programlar</span>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/kadikoy-tiyatro-kursu" className="font-mono text-[12px] text-stone hover:text-neon transition-colors">
            Kadıköy tiyatro kursları →
          </Link>
          <Link href="/beyoglu-tiyatro-kursu" className="font-mono text-[12px] text-stone hover:text-neon transition-colors">
            Beyoğlu · Pera tiyatro kursları →
          </Link>
          <Link href="/atolye-testi" className="font-mono text-[12px] text-stone hover:text-neon transition-colors">
            Hangi atölye sana uygun? →
          </Link>
        </div>
      </section>

      {/* Mobil alt bar: tek dokunuşla ara + başvur. Aktif olmayan programda render olmaz. */}
      <StickyApplyBar w={w} />
    </>
  )
}
