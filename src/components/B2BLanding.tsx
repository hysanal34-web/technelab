import Link from 'next/link'
import Image from 'next/image'
import { SITE_META } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'
import { getAllEnArticles } from '@/lib/enArticles'
import { getTeamMember } from '@/lib/ekip'
import { BilgiForm } from '@/components/BilgiForm'
import { B2B_PAKET_NOTU, b2bChildren, b2bHub, b2bPath, isEn, type B2BPage } from '@/lib/b2b'

/**
 * Kurumsal / okul landing sayfası (23 Ekim 2026). Veri: lib/b2b.ts.
 * Şema: Service (+ provider Organization), FAQPage, BreadcrumbList.
 * Fiyat, süre, paket içeriği bilinçli olarak YOK — paketler açıklanınca eklenecek.
 */
export function B2BLanding({ p }: { p: B2BPage }) {
  const en = isEn(p)
  const url = `${SITE_META.url}${b2bPath(p)}`
  const hub = b2bHub(p.audience)
  const children = p.slug === '' ? b2bChildren(p.audience) : []
  const siblings = p.slug !== '' ? b2bChildren(p.audience).filter((x) => x.slug !== p.slug) : []

  const tum = en ? getAllEnArticles() : getAllArticles()
  const yazilar = p.articleSlugs
    .map((s) => tum.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const yaziBase = en ? '/en/articles' : '/makaleler'

  const egitmenler = p.egitmenler
    .map((s) => getTeamMember(s))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))

  const t = en
    ? { quick: 'in short', kunye: 'at a glance', gorusme: 'what we settle in the first call', egitmen: 'trainers working in this area', yazilar: 'further reading', faq: 'Frequently asked questions', iletisim: 'book a call', alt: 'formats', diger: 'other formats', ilgili: 'related pages', home: 'Home' }
    : { quick: 'kısaca', kunye: 'künye', gorusme: 'ilk görüşmede netleşenler', egitmen: 'bu alanda çalışan eğitmenlerimiz', yazilar: 'bu konuda yazdıklarımız', faq: 'Sık sorulan sorular', iletisim: 'görüşme planla', alt: 'çalışma biçimleri', diger: 'diğer çalışma biçimleri', ilgili: 'ilgili sayfalar', home: 'Ana Sayfa' }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: p.h1,
    description: p.seoDesc,
    url,
    serviceType: p.label,
    areaServed: { '@type': 'City', name: 'Istanbul' },
    availableLanguage: ['tr', 'en'],
    audience: {
      '@type': 'Audience',
      audienceType: p.audience.includes('kurumsal') || p.audience.includes('corporate')
        ? (en ? 'Companies and teams' : 'Şirketler ve ekipler')
        : (en ? 'Schools and colleges' : 'Okullar ve kolejler'),
    },
    provider: { '@type': 'Organization', '@id': `${SITE_META.url}#organization`, name: SITE_META.name, url: SITE_META.url },
    ...(children.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: p.h1,
            itemListElement: children.map((c) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: c.h1, url: `${SITE_META.url}${b2bPath(c)}` },
            })),
          },
        }
      : {}),
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [p.quick, ...p.faq].map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const crumbs = [
    { name: t.home, item: SITE_META.url },
    { name: hub.label, item: `${SITE_META.url}${b2bPath(hub)}` },
    ...(p.slug ? [{ name: p.label, item: url }] : []),
  ]
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
  }

  const H2 = ({ children: c, id }: { children: React.ReactNode; id?: string }) => (
    <h2 id={id} className="font-display text-fg mb-5" style={{ fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.05 }}>{c}</h2>
  )
  const Label = ({ children: c }: { children: React.ReactNode }) => (
    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-4">{c}</span>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-14 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-stone">
            {p.slug ? (
              <>
                <li><Link href={b2bPath(hub)} className="hover:text-neon transition-colors">{hub.label}</Link></li>
                <li aria-hidden="true" className="text-dim">/</li>
                <li>{p.label}</li>
              </>
            ) : (
              <li>{p.eyebrow}</li>
            )}
          </ol>
        </nav>
        <h1 className="font-display text-fg mb-6 max-w-5xl" style={{ fontSize: 'clamp(34px,5.5vw,76px)', letterSpacing: '0.01em', lineHeight: 0.95 }}>
          {p.h1}
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">{p.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#gorusme" className="font-mono text-[12px] tracking-[0.14em] uppercase bg-neon text-bg px-5 py-3 hover:opacity-90 transition-opacity" data-hover>
            {t.iletisim} →
          </a>
          <a href={`tel:${SITE_META.phoneE164}`} data-call-cta={`b2b-${p.audience}-${p.slug || 'hub'}`} className="font-mono text-[12px] tracking-[0.14em] uppercase border border-border text-fg px-5 py-3 hover:border-neon transition-colors">
            {SITE_META.phone}
          </a>
        </div>
      </section>

      {/* Doğrudan cevap — yapay zekâ özetlerinin alıntılayacağı blok */}
      <section className="px-4 md:px-10 py-12 border-b border-border" aria-labelledby="kisaca">
        <div className="max-w-3xl border-l-2 border-neon pl-6">
          <Label>{t.quick}</Label>
          <h2 id="kisaca" className="font-display text-fg mb-3" style={{ fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.15 }}>{p.quick.q}</h2>
          <p className="text-fg text-[15px] leading-relaxed">{p.quick.a}</p>
        </div>
      </section>

      {children.length > 0 && (
        <section className="px-4 md:px-10 py-14 border-b border-border" aria-labelledby="alt">
          <Label>{t.alt}</Label>
          <ul className="grid md:grid-cols-2 gap-px bg-border">
            {children.map((c) => (
              <li key={c.slug} className="bg-bg">
                <Link href={b2bPath(c)} className="group block p-7 hover:bg-bgHi transition-colors" data-hover>
                  <span className="font-display text-fg group-hover:text-neon transition-colors block mb-2" style={{ fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.1 }}>{c.h1}</span>
                  <span className="font-mono text-[12px] text-stone leading-relaxed block">{c.seoDesc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="px-4 md:px-10 py-14 border-b border-border">
        <div className="max-w-3xl space-y-10">
          {p.sections.map((s) => (
            <div key={s.h}>
              <H2>{s.h}</H2>
              <p className="text-stone text-[15px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-14 border-b border-border grid md:grid-cols-2 gap-12">
        <div>
          <Label>{t.kunye}</Label>
          <dl className="border-t border-border">
            {p.kunye.map((r) => (
              <div key={r.k} className="grid grid-cols-[130px_1fr] gap-4 py-3 border-b border-border">
                <dt className="font-mono text-[11px] tracking-[0.12em] uppercase text-dim">{r.k}</dt>
                <dd className="text-fg text-[14px] leading-snug">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <Label>{t.gorusme}</Label>
          <ul className="space-y-2">
            {p.gorusme.map((g) => (
              <li key={g} className="text-stone text-[14px] leading-relaxed pl-4 border-l border-border">{g}</li>
            ))}
          </ul>
        </div>
      </section>

      {egitmenler.length > 0 && (
        <section className="px-4 md:px-10 py-14 border-b border-border" aria-labelledby="egitmenler">
          <Label>{t.egitmen}</Label>
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-6" id="egitmenler">
            {egitmenler.map((m) => (
              <li key={m.slug}>
                <Link href={`/ekip/${m.slug}`} className="group block" data-hover>
                  {m.image && (
                    <span className="relative block w-full aspect-[4/5] overflow-hidden mb-3 bg-bgAlt">
                      <Image src={m.image} alt={m.name} fill sizes="(max-width:768px) 50vw, 20vw" className="object-cover object-top" />
                    </span>
                  )}
                  <span className="font-display text-fg group-hover:text-neon transition-colors block">{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {yazilar.length > 0 && (
        <section className="px-4 md:px-10 py-14 border-b border-border" aria-labelledby="yazilar">
          <Label>{t.yazilar}</Label>
          <ul className="border-t border-border max-w-3xl" id="yazilar">
            {yazilar.map((a) => (
              <li key={a.slug} className="border-b border-border">
                <Link href={`${yaziBase}/${a.slug}`} className="group block py-5" data-hover>
                  <span className="font-display text-fg group-hover:text-neon transition-colors block leading-snug" style={{ fontSize: 'clamp(16px,1.8vw,22px)' }}>{a.title}</span>
                  {a.excerpt && <span className="font-mono text-[12px] text-stone leading-relaxed mt-2 block">{a.excerpt}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="px-4 md:px-10 py-14 border-b border-border" aria-labelledby="sss">
        <H2 id="sss">{t.faq}</H2>
        <div className="max-w-3xl divide-y divide-border border-y border-border">
          {p.faq.map((f) => (
            <details key={f.q} className="py-5 group">
              <summary className="cursor-pointer text-fg text-[16px] leading-snug list-none flex justify-between gap-4">
                <span>{f.q}</span><span className="text-neon font-mono" aria-hidden="true">+</span>
              </summary>
              <p className="text-stone text-[14px] leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="gorusme" className="px-4 md:px-10 py-16 border-b border-border">
        <div className="max-w-3xl">
          <Label>{t.iletisim}</Label>
          <p className="text-fg text-[16px] leading-relaxed mb-6">{B2B_PAKET_NOTU[p.audience]}</p>
          <p className="font-mono text-[13px] text-stone mb-8">
            <a href={`mailto:${SITE_META.email}`} className="hover:text-neon underline">{SITE_META.email}</a>
            {' · '}
            <a href={`tel:${SITE_META.phoneE164}`} data-call-cta={`b2b-form-${p.audience}`} className="hover:text-neon underline">{SITE_META.phone}</a>
          </p>
          <BilgiForm compact />
        </div>
      </section>

      <section className="px-4 md:px-10 py-12">
        {siblings.length > 0 && (
          <div className="mb-8">
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim block mb-3">{t.diger}</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><Link href={b2bPath(hub)} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors">{hub.label}</Link></li>
              {siblings.map((s) => (
                <li key={s.slug}><Link href={b2bPath(s)} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </div>
        )}
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim block mb-3">{t.ilgili}</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {p.links.map((l) => (
            <li key={l.href}><Link href={l.href} className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon transition-colors">{l.label} →</Link></li>
          ))}
        </ul>
      </section>
    </>
  )
}
