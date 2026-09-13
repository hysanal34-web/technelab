import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/mdx'
import { SITE_META, WORKSHOPS } from '@/lib/data'
import { getDiscipline, type Discipline } from '@/lib/disiplinler'
import { DISTRICTS } from '@/lib/semtler'
import { findTeamMembersForInstructor, type TeamMember } from '@/lib/ekip'

/**
 * Disiplin landing sayfası — "oyunculuk kursu istanbul", "dans kursu istanbul"
 * gibi yüksek hacimli sorgular için. Rakipler (GalataSanat, Sinema Akademi)
 * bu sayfaları kuruyor ama içerikleri boş / noindex. Bizimki gerçek program
 * verisine bağlı: fiyat, eğitmen, tarih hepsi data.ts'ten geliyor.
 */
export function DisciplinePage({ d }: { d: Discipline }) {
  const workshops = d.workshopSlugs
    .map((s) => WORKSHOPS.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w) && !w!.archived)

  const districts = d.districtSlugs
    .map((s) => DISTRICTS.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  const related = d.related
    .map((s) => getDiscipline(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  // Bu disiplindeki programların eğitmenleri — tekilleştirilmiş, /ekip/[slug]'a bağlı.
  // Rakip analizi: Sinema Akademi / Drama Akademi / Kadıköy GS eğitmen adı vermiyor;
  // Dormen veriyor ve en güçlü E-E-A-T sinyali o. Hub sayfasında isim + unvan + link.
  const egitmenler = workshops
    .flatMap((w) => findTeamMembersForInstructor(w.instructor))
    .filter((m, i, arr): m is TeamMember => arr.findIndex((x) => x.slug === m.slug) === i)

  // ── Schema.org: Course listesi ────────────────────────────────────
  const courseListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: d.seoTitle,
    description: d.seoDesc,
    url: `${SITE_META.url}/${d.slug}`,
    numberOfItems: workshops.length,
    itemListElement: workshops.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: `${w.title} — ${w.sub}`,
        description: w.seoDesc,
        url: `${SITE_META.url}/atolyeler/${w.slug}`,
        provider: {
          '@type': 'Organization',
          name: SITE_META.name,
          '@id': `${SITE_META.url}#organization`,
        },
        // Fiyat bilinçli olarak yayınlanmıyor — sitede hiçbir yerde, structured
        // data'da da görünmemeli. schema.org Offer içinde price alanı Google'ın
        // arama sonucunda rakam göstermesine yol açıyordu; kaldırıldı.
        // Yalnızca stok durumu bırakıldı.
        ...(w.price > 0 && {
          offers: {
            '@type': 'Offer',
            availability: w.active
              ? 'https://schema.org/InStock'
              : 'https://schema.org/SoldOut',
            url: `${SITE_META.url}/atolyeler/${w.slug}`,
          },
        }),
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'onsite',
          courseWorkload: w.duration,
          // Eğitmen → /ekip/[slug] Person varlığı. Eşleşme yoksa yalnızca ad.
          ...(() => {
            const kisiler = findTeamMembersForInstructor(w.instructor)
            if (kisiler.length > 0) {
              return {
                instructor: kisiler.map((m) => ({
                  '@type': 'Person',
                  '@id': `${SITE_META.url}/ekip/${m.slug}#person`,
                  name: m.name,
                  url: `${SITE_META.url}/ekip/${m.slug}`,
                })),
              }
            }
            return w.instructor && w.instructor !== 'Techne Lab'
              ? { instructor: { '@type': 'Person', name: w.instructor } }
              : {}
          })(),
          location: {
            '@type': 'Place',
            name: w.venue,
            address: {
              '@type': 'PostalAddress',
              addressLocality: w.venue,
              addressRegion: 'İstanbul',
              addressCountry: 'TR',
            },
          },
        },
      },
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
      { '@type': 'ListItem', position: 2, name: 'Atölyeler', item: `${SITE_META.url}/atolyeler` },
      { '@type': 'ListItem', position: 3, name: d.label, item: `${SITE_META.url}/${d.slug}` },
    ],
  }

    // Disiplinin anahtar kelimeleriyle örtüşen makaleler.
  // Blog trafiği ile satış sayfaları arasında iki yönlü bağ kuruyor:
  // makale → program CTA'sı zaten var, burada program sayfası → makale.
  const ilgiliYazilar = (() => {
    const havuz = [...d.keywords, d.label].join(' ').toLocaleLowerCase('tr-TR')
    const kelimeler = havuz.split(/[\s,]+/).filter((k) => k.length > 4)
    return getAllArticles()
      .map((a) => {
        const metin = [a.title, ...(a.tags ?? []), a.category ?? ''].join(' ').toLocaleLowerCase('tr-TR')
        const skor = kelimeler.reduce((t, k) => t + (metin.includes(k) ? 1 : 0), 0)
        return { a, skor }
      })
      .filter((x) => x.skor > 0)
      .sort((x, y) => y.skor - x.skor)
      .slice(0, 3)
      .map((x) => x.a)
  })()

return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── Hero ── */}
      <section className="px-4 md:px-10 pt-28 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />

        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-dim">
            <li><Link href="/" className="hover:text-neon transition-colors">Ana Sayfa</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/atolyeler" className="hover:text-neon transition-colors">Atölyeler</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neon">{d.label}</li>
          </ol>
        </nav>

        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">{d.eyebrow}</p>
        <h1
          className="font-display text-fg mb-7 whitespace-pre-line"
          style={{ fontSize: 'clamp(34px,5.6vw,84px)', letterSpacing: '0.01em', lineHeight: 0.92 }}
        >
          {d.h1}
        </h1>
        <p className="font-body text-[15px] text-stone max-w-2xl leading-relaxed">{d.intro}</p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            href="/atolyeler"
            data-hover
            className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors"
          >
            programları gör →
          </Link>
          <Link
            href="/iletisim"
            data-hover
            className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors"
          >
            soru sor →
          </Link>
        </div>
      </section>

      {/* ── Nasıl çalışıyoruz ── */}
      <section className="px-4 md:px-10 py-16 border-b border-border bg-bgAlt">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 max-w-6xl">
          <h2 className="font-display text-fg leading-none" style={{ fontSize: 'clamp(24px,3.2vw,46px)' }}>
            NASIL<br />ÇALIŞIYORUZ
          </h2>
          <p className="font-body text-[14px] text-stone leading-relaxed">{d.what}</p>
        </div>
      </section>

      {/* ── Kimler için ── */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 max-w-6xl">
          <h2 className="font-display text-fg leading-none" style={{ fontSize: 'clamp(24px,3.2vw,46px)' }}>
            KİMLER<br />İÇİN
          </h2>
          <p className="font-body text-[14px] text-stone leading-relaxed">{d.who}</p>
        </div>
      </section>

      {/* ── Programlar ── */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          {d.label.toLocaleUpperCase('tr-TR')} PROGRAMLARI
        </h2>
        <p className="font-mono text-[12px] text-dim mb-10">
          {workshops.length} program · İstanbul · küçük gruplar
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {workshops.map((w) => (
            <Link
              key={w.slug}
              href={`/atolyeler/${w.slug}`}
              data-hover
              className="group bg-bg hover:bg-bgAlt transition-colors p-7 md:p-8 block"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-neon">{w.code}</span>
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim">
                  {w.active ? 'kayıt açık' : 'kayıt kapalı'}
                </span>
              </div>
              <h3
                className="font-display text-fg group-hover:text-neon transition-colors leading-tight mb-2"
                style={{ fontSize: 'clamp(19px,1.9vw,28px)' }}
              >
                {w.title}
              </h3>
              <p className="font-mono text-[12px] text-stone leading-relaxed mb-5">{w.tagline}</p>

              <div className="mb-5 pb-5 border-b border-border">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone">
                  {typeof w.maxStudents === 'number' ? `${w.maxStudents} kişilik grup` : w.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] text-dim">{w.duration}</span>
                <span className="font-mono text-[11px] text-dim">{w.venue}</span>
                {w.instructor && w.instructor !== 'Techne Lab' && (
                  <span className="font-mono text-[11px] text-dim">{w.instructor}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Eğitmenler ── */}
      {egitmenler.length > 0 && (
        <section className="px-4 md:px-10 py-16 border-b border-border" aria-labelledby="egitmenler-heading">
          <h2 id="egitmenler-heading" className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
            KİMİNLE ÇALIŞACAKSIN?
          </h2>
          <p className="font-mono text-[12px] text-dim mb-10 max-w-2xl">
            Eğitmenlerimizin adı ve geçmişi açık. &quot;Alanında uzman&quot; demiyoruz — kim olduğunu yazıyoruz.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {egitmenler.map((m) => (
              <Link
                key={m.slug}
                href={`/ekip/${m.slug}`}
                data-hover
                className="group bg-bg hover:bg-bgAlt transition-colors p-6 md:p-7 grid grid-cols-[64px_1fr] gap-5 items-start"
              >
                {m.image ? (
                  <span className="relative w-16 h-20 overflow-hidden block">
                    <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover object-top" />
                  </span>
                ) : <span className="w-16 h-20 bg-bgAlt block" />}
                <span className="block">
                  <span
                    className="font-display text-fg group-hover:text-neon transition-colors block leading-tight mb-1"
                    style={{ fontSize: 'clamp(17px,1.8vw,22px)' }}
                  >
                    {m.name}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-neon block mb-2">
                    {m.role.split('·')[0].trim()}
                  </span>
                  <span className="font-mono text-[11px] text-stone leading-relaxed block line-clamp-2">
                    {m.bio}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Lokasyonlar ── */}
      <section className="px-4 md:px-10 py-16 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          NEREDE?
        </h2>
        <p className="font-mono text-[12px] text-dim mb-10 max-w-2xl">
          Techne Lab mobil çalışan bir ekip — kendi mekânı yok. Programlar partner
          stüdyolarda yürüyor.
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-border">
          {districts.map((x) => (
            <Link
              key={x.slug}
              href={`/${x.slug}`}
              data-hover
              className="group bg-bg hover:bg-bgAlt transition-colors p-7 md:p-8 block"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon block mb-3">
                {x.side}
              </span>
              <h3
                className="font-display text-fg group-hover:text-neon transition-colors leading-tight mb-3"
                style={{ fontSize: 'clamp(20px,2.2vw,32px)' }}
              >
                {x.displayName}
              </h3>
              <p className="font-mono text-[11px] text-stone leading-relaxed">
                {x.nearby.slice(0, 6).join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          SIKÇA SORULANLAR
        </h2>
        <div className="max-w-3xl space-y-8">
          {d.faq.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[19px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-body text-[13.5px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── İlgili yazılar ── */}
      {ilgiliYazilar.length > 0 && (
        <section className="px-4 md:px-10 py-16 border-t border-border bg-bgAlt">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-6">
            bu konuda yazdıklarımız
          </span>
          <ul className="border-t border-border max-w-3xl">
            {ilgiliYazilar.map((a) => (
              <li key={a.slug} className="border-b border-border">
                <Link href={`/makaleler/${a.slug}`} data-hover className="group block py-5">
                  <span className="font-display text-fg group-hover:text-neon transition-colors block leading-snug" style={{ fontSize: 'clamp(16px,1.8vw,22px)' }}>
                    {a.title}
                  </span>
                  {a.excerpt && (
                    <span className="font-mono text-[12px] text-stone leading-relaxed mt-2 block">
                      {a.excerpt}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── İlgili disiplinler ── */}
      <section className="px-4 md:px-10 py-16">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim block mb-6">
          diğer disiplinler
        </span>
        <div className="flex flex-col gap-1">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              data-hover
              className="font-display text-stone hover:text-neon transition-colors leading-tight"
              style={{ fontSize: 'clamp(20px,2.2vw,32px)' }}
            >
              {r.label.toLocaleUpperCase('tr-TR')} →
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
