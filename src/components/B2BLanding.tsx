import Link from 'next/link'
import Image from 'next/image'
import { SITE_META } from '@/lib/data'
import { getAllArticles } from '@/lib/mdx'
import { getAllEnArticles } from '@/lib/enArticles'
import { getTeamMember } from '@/lib/ekip'
import { BilgiForm } from '@/components/BilgiForm'
import { B2B_PAKET_NOTU, b2bChildren, b2bHub, b2bPath, isEn, type B2BPage } from '@/lib/b2b'

/**
 * Kurumsal / okul landing sayfası. Veri: lib/b2b.ts (kataloglardan).
 * Şema: Service (+ OfferCatalog: alt sayfalar ve formatlar), FAQPage,
 * BreadcrumbList, ImageObject. Fiyat bilinçli olarak YOK (talebe göre).
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
    ? { quick: 'in short', kunye: 'at a glance', gorusme: 'what we settle first', egitmen: 'trainers', yazilar: 'further reading', faq: 'Frequently asked questions', iletisim: 'book a call', alt: 'modules in detail', diger: 'other modules', ilgili: 'related pages', home: 'Home', moduller: 'programme catalogue', formatlar: 'formats', akis: 'a two-hour session', olcum: 'measurement', ornek: 'sample years', guvence: 'safeguarding and compliance', surec: 'from call to proposal', arastirma: 'what research says' }
    : { quick: 'kısaca', kunye: 'künye', gorusme: 'ilk görüşmede netleşenler', egitmen: 'eğitmen kadrosu', yazilar: 'bu konuda yazdıklarımız', faq: 'Sık sorulan sorular', iletisim: 'görüşme planla', alt: 'modüller tek tek', diger: 'diğer modüller', ilgili: 'ilgili sayfalar', home: 'Ana Sayfa', moduller: 'program kataloğu', formatlar: 'formatlar', akis: '2 saatlik bir oturumun akışı', olcum: 'ölçüm', ornek: 'örnek yıllar', guvence: 'güvence ve uyum', surec: 'görüşmeden teklife', arastirma: 'araştırma ne diyor' }

  const isKurumsal = p.audience === 'kurumsal' || p.audience === 'en/corporate'
  const images = [p.hero, ...(p.gallery ?? [])].filter((x): x is NonNullable<typeof x> => Boolean(x))

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
    audience: { '@type': 'Audience', audienceType: isKurumsal ? (en ? 'Companies and teams' : 'Şirketler ve ekipler') : (en ? 'Schools and teachers' : 'Okullar, kolejler ve öğretmenler') },
    provider: { '@type': 'Organization', '@id': `${SITE_META.url}#organization`, name: SITE_META.name, url: SITE_META.url },
    ...(images.length ? { image: images.map((i) => `${SITE_META.url}${i.src}`) } : {}),
    ...(children.length > 0 || (p.formatlar && p.formatlar.length > 0)
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: p.h1,
            itemListElement: [
              ...children.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c.h1, url: `${SITE_META.url}${b2bPath(c)}`, description: c.seoDesc } })),
              ...(p.formatlar ?? []).map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${f.ad} (${f.sure})`, description: `${f.kisi}. ${f.body}` } })),
            ],
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
  const Sec = ({ children: c, id }: { children: React.ReactNode; id?: string }) => (
    <section id={id} className="px-4 md:px-10 py-14 border-b border-border">{c}</section>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
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
        <div className={p.hero ? 'grid md:grid-cols-[1.2fr_1fr] gap-10 items-end' : ''}>
          <div>
            <h1 className="font-display text-fg mb-6 max-w-5xl" style={{ fontSize: 'clamp(34px,5.2vw,72px)', letterSpacing: '0.01em', lineHeight: 0.95 }}>
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
          </div>
          {p.hero && (
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-bgAlt">
              <Image src={p.hero.src} alt={p.hero.alt} fill priority sizes="(max-width:768px) 100vw, 45vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* KISACA — yapay zekâ özetlerinin alıntılayacağı blok */}
      <section className="px-4 md:px-10 py-12 border-b border-border" aria-labelledby="kisaca">
        <div className="max-w-3xl border-l-2 border-neon pl-6">
          <Label>{t.quick}</Label>
          <h2 id="kisaca" className="font-display text-fg mb-3" style={{ fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.15 }}>{p.quick.q}</h2>
          <p className="text-fg text-[15px] leading-relaxed">{p.quick.a}</p>
        </div>
      </section>

      {/* GÖVDE */}
      <Sec>
        <div className="max-w-3xl space-y-10">
          {p.sections.map((s) => (
            <div key={s.h}>
              <H2>{s.h}</H2>
              <p className="text-stone text-[15px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* KATALOG */}
      {p.moduller && p.moduller.length > 0 && (
        <Sec id="moduller">
          <Label>{t.moduller}</Label>
          <div className="grid md:grid-cols-2 gap-10">
            {p.moduller.map((g) => (
              <div key={g.grup}>
                <h3 className="font-mono text-[12px] tracking-[0.16em] uppercase text-fg mb-3">{g.grup}</h3>
                <ul className="border-t border-border">
                  {g.items.map((m) => (
                    <li key={m.ad} className="border-b border-border py-3 grid grid-cols-[1fr_auto] gap-4 items-baseline">
                      <span>
                        {m.href ? (
                          <Link href={m.href} className="text-fg hover:text-neon transition-colors font-display" style={{ fontSize: 18 }} data-hover>{m.ad}</Link>
                        ) : (
                          <span className="text-fg font-display" style={{ fontSize: 18 }}>{m.ad}</span>
                        )}
                        <span className="block text-stone text-[13px] mt-1">{m.body}</span>
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-dim whitespace-nowrap">{m.dil}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Sec>
      )}

      {/* FORMATLAR */}
      {p.formatlar && p.formatlar.length > 0 && (
        <Sec id="formatlar">
          <Label>{t.formatlar}</Label>
          <ul className="grid md:grid-cols-3 gap-px bg-border">
            {p.formatlar.map((f) => (
              <li key={f.ad} className="bg-bg p-6">
                <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-neon block mb-2">{f.sure}</span>
                <span className="font-display text-fg block mb-1" style={{ fontSize: 20, lineHeight: 1.1 }}>{f.ad}</span>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-dim block mb-3">{f.kisi}</span>
                <span className="text-stone text-[13px] leading-relaxed block">{f.body}</span>
              </li>
            ))}
          </ul>
        </Sec>
      )}

      {/* ÖRNEK YILLAR (okul) */}
      {p.ornekYillar && p.ornekYillar.length > 0 && (
        <Sec id="ornek-yillar">
          <Label>{t.ornek}</Label>
          <div className="grid md:grid-cols-3 gap-8">
            {p.ornekYillar.map((y) => (
              <div key={y.baslik}>
                <span className="font-display text-fg block" style={{ fontSize: 20 }}>{y.baslik}</span>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-dim block mb-3">{y.kademe}</span>
                <ol className="border-l border-border pl-4 space-y-2">
                  {y.adimlar.map((a) => (
                    <li key={a.donem} className="text-[14px]"><span className="font-mono text-[11px] uppercase text-neon mr-2">{a.donem}</span><span className="text-stone">{a.body}</span></li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Sec>
      )}

      {/* OTURUM AKIŞI */}
      {p.akis && p.akis.length > 0 && (
        <Sec id="akis">
          <Label>{t.akis}</Label>
          <ol className="grid md:grid-cols-5 gap-px bg-border max-w-5xl">
            {p.akis.map((a) => (
              <li key={a.t} className="bg-bg p-5">
                <span className="font-mono text-[12px] text-neon block mb-1">{a.t}</span>
                <span className="font-display text-fg block mb-1" style={{ fontSize: 18 }}>{a.ad}</span>
                <span className="text-stone text-[13px] leading-relaxed">{a.body}</span>
              </li>
            ))}
          </ol>
        </Sec>
      )}

      {/* ÖLÇÜM */}
      {p.olcum && p.olcum.length > 0 && (
        <Sec id="olcum">
          <Label>{t.olcum}</Label>
          <ol className="grid md:grid-cols-4 gap-px bg-border max-w-5xl">
            {p.olcum.map((o) => (
              <li key={o.zaman} className="bg-bg p-5">
                <span className="font-mono text-[12px] uppercase text-neon block mb-1">{o.zaman}</span>
                <span className="font-display text-fg block mb-1" style={{ fontSize: 18 }}>{o.ad}</span>
                <span className="text-stone text-[13px] leading-relaxed">{o.body}</span>
              </li>
            ))}
          </ol>
        </Sec>
      )}

      {/* GÜVENCE (okul) */}
      {p.guvence && p.guvence.length > 0 && (
        <Sec id="guvence">
          <Label>{t.guvence}</Label>
          <ul className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {p.guvence.map((g, i) => (
              <li key={g.ad} className="border-t border-border pt-4">
                <span className="font-mono text-[11px] text-dim block mb-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-fg block mb-1" style={{ fontSize: 18 }}>{g.ad}</span>
                <span className="text-stone text-[13px] leading-relaxed">{g.body}</span>
              </li>
            ))}
          </ul>
        </Sec>
      )}

      {/* GÖRSELLER */}
      {p.gallery && p.gallery.length > 0 && (
        <section className="px-4 md:px-10 py-10 border-b border-border">
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.gallery.map((g) => (
              <li key={g.src} className="relative aspect-[4/5] overflow-hidden bg-bgAlt">
                <Image src={g.src} alt={g.alt} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ALT SAYFALAR (hub) */}
      {children.length > 0 && (
        <Sec id="alt">
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
        </Sec>
      )}

      {/* KÜNYE + GÖRÜŞME */}
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

      {/* SÜREÇ */}
      {p.surec && p.surec.length > 0 && (
        <Sec id="surec">
          <Label>{t.surec}</Label>
          <ol className="grid md:grid-cols-5 gap-px bg-border max-w-5xl">
            {p.surec.map((s, i) => (
              <li key={s.ad} className="bg-bg p-5">
                <span className="font-mono text-[12px] text-neon block mb-1">{i + 1}</span>
                <span className="font-display text-fg block mb-1" style={{ fontSize: 18 }}>{s.ad}</span>
                <span className="text-stone text-[13px] leading-relaxed">{s.body}</span>
              </li>
            ))}
          </ol>
          {p.surecNotu && <p className="font-mono text-[12px] text-stone mt-4 max-w-3xl">{p.surecNotu}</p>}
        </Sec>
      )}

      {/* ARAŞTIRMA */}
      {p.arastirma && p.arastirma.length > 0 && (
        <Sec id="arastirma">
          <Label>{t.arastirma}</Label>
          <ul className="max-w-3xl space-y-5">
            {p.arastirma.map((a) => (
              <li key={a.kaynak} className="border-l-2 border-border pl-5">
                <p className="text-fg text-[15px] leading-relaxed">{a.text}</p>
                <p className="font-mono text-[11px] text-dim mt-1">
                  {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:text-neon underline">{a.kaynak}</a> : a.kaynak}
                </p>
              </li>
            ))}
          </ul>
          {p.arastirmaNotu && <p className="font-mono text-[12px] text-stone mt-6">{p.arastirmaNotu}</p>}
        </Sec>
      )}

      {/* EĞİTMENLER */}
      {egitmenler.length > 0 && (
        <Sec>
          <Label>{t.egitmen}</Label>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {egitmenler.map((m) => (
              <li key={m.slug}>
                <Link href={`/ekip/${m.slug}`} className="group block" data-hover>
                  {m.image && (
                    <span className="relative block w-full aspect-[4/5] overflow-hidden mb-3 bg-bgAlt">
                      <Image src={m.image} alt={m.name} fill sizes="(max-width:768px) 50vw, 16vw" className="object-cover object-top" />
                    </span>
                  )}
                  <span className="font-display text-fg group-hover:text-neon transition-colors block">{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Sec>
      )}

      {/* YAZILAR */}
      {yazilar.length > 0 && (
        <Sec>
          <Label>{t.yazilar}</Label>
          <ul className="border-t border-border max-w-3xl">
            {yazilar.map((a) => (
              <li key={a.slug} className="border-b border-border">
                <Link href={`${yaziBase}/${a.slug}`} className="group block py-5" data-hover>
                  <span className="font-display text-fg group-hover:text-neon transition-colors block leading-snug" style={{ fontSize: 'clamp(16px,1.8vw,22px)' }}>{a.title}</span>
                  {a.excerpt && <span className="font-mono text-[12px] text-stone leading-relaxed mt-2 block">{a.excerpt}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </Sec>
      )}

      {/* SSS */}
      <Sec>
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
      </Sec>

      {/* GÖRÜŞME */}
      <section id="gorusme" className="px-4 md:px-10 py-16 border-b border-border">
        <div className="max-w-3xl">
          <Label>{t.iletisim}</Label>
          <p className="text-fg text-[16px] leading-relaxed mb-6">{B2B_PAKET_NOTU[p.audience]}</p>
          <p className="font-mono text-[13px] text-stone mb-8">
            <a href={`mailto:${SITE_META.email}`} className="hover:text-neon underline">{SITE_META.email}</a>
            {' · '}
            <a href={`tel:${SITE_META.phoneE164}`} data-call-cta={`b2b-form-${p.audience}`} className="hover:text-neon underline">{SITE_META.phone}</a>
          </p>
          <BilgiForm compact variant={isKurumsal ? 'kurumsal' : 'okul'} lang={en ? 'en' : 'tr'} />
        </div>
      </section>

      {/* GEZİNME */}
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
