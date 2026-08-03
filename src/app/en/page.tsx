import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META, WORKSHOPS } from '@/lib/data'

const title = 'Acting Classes & Theatre Workshops in Istanbul — Techne Lab'
const description = 'English-language theatre workshops in Istanbul. Acting, drama, musical theatre and playwriting for expats and international residents. Small groups in Pera and Kadıköy.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_META.url}/en`,
    languages: {
      'tr-TR': SITE_META.url,
      'en-US': `${SITE_META.url}/en`,
      'x-default': SITE_META.url,
    },
  },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/en`,
    locale: 'en_US',
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Techne Lab Istanbul' }],
  },
  keywords: [
    'acting classes istanbul', 'theatre workshop istanbul', 'english drama istanbul',
    'acting school istanbul', 'drama classes istanbul', 'english theatre istanbul',
    'expat activities istanbul', 'english speaking activities istanbul',
    'musical theatre istanbul', 'playwriting workshop istanbul',
    'acting classes in english istanbul', 'theatre courses istanbul',
    'improv istanbul', 'performing arts istanbul', 'creative classes istanbul',
    'english classes istanbul adults', 'things to do in istanbul expats',
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_META.url}/en#organization-en`,
  name: SITE_META.name,
  url: `${SITE_META.url}/en`,
  description,
  email: SITE_META.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Istanbul',
    addressRegion: 'Istanbul',
    addressCountry: 'TR',
  },
  areaServed: ['Istanbul', 'Beyoğlu', 'Pera', 'Kadıköy'],
  inLanguage: ['en', 'tr'],
  sameAs: [`https://instagram.com/${SITE_META.instagram.replace('@', '')}`],
}

const FAQ = [
  {
    q: 'Do I need to speak Turkish to join?',
    a: 'No. Our English Drama programmes run entirely in English — from warm-ups to scene work to feedback. Many participants are expats, international students or professionals who have recently moved to Istanbul. Turkish is never required.',
  },
  {
    q: 'What English level do I need?',
    a: 'B1 and above is comfortable. You do not need to be fluent. Drama work actually suits intermediate speakers well, because the scene gives you a reason to speak rather than asking you to perform grammar. If you can hold a conversation, you can join.',
  },
  {
    q: 'I have never acted before. Is that a problem?',
    a: 'Not at all. Most people who join have no stage background. Groups are capped at 12–14 so everyone gets individual attention, and the first weeks are built to make the room safe before anything is asked of you.',
  },
  {
    q: 'Where are the classes held?',
    a: 'We work out of three partner studios — one in Pera (Beyoğlu, European side) and two in Kadıköy (Asian side). Which programme runs where is listed on each programme page. Some programmes open groups on both sides.',
  },
  {
    q: 'How long are the programmes?',
    a: 'Most run 12 weeks, one evening per week. Our musical theatre programme is longer — eight months, twice a week, ending in a performance with an audience. Playwriting is an intensive 8-week block.',
  },
  {
    q: 'Can I join mid-term?',
    a: 'Generally no — the groups build on each other week by week and a late arrival disrupts that. But new groups open regularly. Write to us and we will tell you when the next intake starts.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const PROGRAMS = [
  {
    slug: 'english-drama-lab',
    en: 'English Drama Lab',
    line: 'Twelve weeks of drama work in English. Scene study, improvisation and voice — for people who want their English to become usable, not just correct.',
    tag: 'For B1+ · Pera & Kadıköy',
  },
  {
    slug: 'english-drama-acting-focus',
    en: 'English Drama — Acting Focus',
    line: 'For those who want the acting to go deeper. Character construction, text analysis and scene work, all in English.',
    tag: 'Some experience helpful',
  },
  {
    slug: 'english-drama-final-performance',
    en: 'English Drama — Final Performance',
    line: 'Ends with a performance in front of an audience. The full arc: rehearsal room to stage.',
    tag: 'Advanced track',
  },
  {
    slug: 'techne-musical-lab',
    en: 'Techne Musical Lab',
    line: 'Eight months of acting, singing and dance in one integrated programme. Ends with a staged performance.',
    tag: 'Kadıköy · Oct–May',
  },
  {
    slug: 'broadway-musical-dance',
    en: 'Broadway Musical Dance',
    line: 'Jazz and theatre dance foundations, Broadway repertoire. No dance background required.',
    tag: '12 weeks · Kadıköy',
  },
  {
    slug: 'auteur-lab',
    en: 'Auteur Lab — Playwriting',
    line: 'Playwriting and dramaturgy. Structure, dialogue, conflict. You leave with written work.',
    tag: 'Pera · 8 weeks',
  },
]

export default function EnglishHome() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <div className="flex items-center gap-4 mb-4">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon">english · istanbul</p>
          <Link href="/" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors">
            türkçe →
          </Link>
        </div>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(32px,5.4vw,82px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          ACTING CLASSES<br />IN ISTANBUL —<br />IN ENGLISH.
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-8">
          Techne Lab is an independent theatre company in Istanbul. We run acting, drama,
          musical theatre and playwriting workshops — several of them entirely in English,
          for expats, international students and anyone who would rather work in English.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/en/english-drama-istanbul" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            english drama programme →
          </Link>
          <Link href="/iletisim" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            get in touch →
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          WHAT MAKES THIS DIFFERENT
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl">
          {[
            {
              n: '01',
              t: 'A stage, not a classroom',
              d: 'You are not conjugating verbs. You are playing a character who needs something. Language becomes a tool rather than a subject — which is why it sticks.',
            },
            {
              n: '02',
              t: 'Small groups',
              d: 'Twelve to fourteen people. Everyone speaks, everyone gets feedback, no one hides at the back. This is the single biggest difference from a language school.',
            },
            {
              n: '03',
              t: 'Working artists teach',
              d: 'Our instructors are directors, performers and writers who work professionally. What you get is practice, not theory.',
            },
          ].map((x) => (
            <div key={x.n}>
              <span className="font-mono text-[11px] tracking-[0.18em] text-neon block mb-3">{x.n}</span>
              <h3 className="font-display text-fg text-[20px] mb-3 leading-snug">{x.t}</h3>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programmes */}
      <section className="px-4 md:px-10 py-14 border-b border-border">
        <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          PROGRAMMES
        </h2>
        <p className="font-mono text-[12px] text-dim mb-10 max-w-2xl">
          Programme pages are in Turkish — but the programmes themselves run in English where marked.
          Write to us in English any time; we answer in English.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {PROGRAMS.map((p) => {
            const w = WORKSHOPS.find((x) => x.slug === p.slug)
            if (!w || w.archived) return null
            return (
              <Link
                key={p.slug}
                href={`/atolyeler/${p.slug}`}
                data-hover
                className="group bg-bg hover:bg-bgAlt transition-colors p-7 md:p-8 block"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-neon">{w.code}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">{p.tag}</span>
                </div>
                <h3 className="font-display text-fg group-hover:text-neon transition-colors leading-tight mb-3" style={{ fontSize: 'clamp(19px,1.9vw,28px)' }}>
                  {p.en}
                </h3>
                <p className="font-mono text-[12px] text-stone leading-relaxed mb-4">{p.line}</p>
                <span className="font-mono text-[11px] tracking-widest2 uppercase text-dim group-hover:text-neon transition-colors">
                  details →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Locations */}
      <section className="px-4 md:px-10 py-14 border-b border-border">
        <h2 className="font-display text-fg mb-8" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          WHERE WE WORK
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          <div>
            <h3 className="font-display text-neon text-[22px] mb-3">Pera · Beyoğlu</h3>
            <p className="font-mono text-[12px] text-stone leading-relaxed mb-3">
              European side, walking distance from İstiklal Caddesi and Şişhane metro.
              Historically the centre of Turkish theatre. English Drama and playwriting run here.
            </p>
            <Link href="/beyoglu-tiyatro-kursu" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors">
              more about this location →
            </Link>
          </div>
          <div>
            <h3 className="font-display text-neon text-[22px] mb-3">Kadıköy</h3>
            <p className="font-mono text-[12px] text-stone leading-relaxed mb-3">
              Asian side, reachable by Marmaray or ferry. Two studios with large floors —
              home to our musical theatre and dance programmes, plus English Drama groups.
            </p>
            <Link href="/kadikoy-tiyatro-kursu" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors">
              more about this location →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          QUESTIONS PEOPLE ASK
        </h2>
        <div className="max-w-3xl space-y-8">
          {FAQ.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[19px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-16">
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          COME AND SEE.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Write to us in English — tell us roughly what you are looking for and we will
          tell you honestly whether we have something that fits.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/iletisim" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            contact us →
          </Link>
          <Link href="/kaynaklar/monologlar" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            free monologue library →
          </Link>
        </div>
      </section>
    </>
  )
}
