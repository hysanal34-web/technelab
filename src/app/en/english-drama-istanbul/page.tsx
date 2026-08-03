import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META, WORKSHOPS } from '@/lib/data'

const title = 'English Drama Classes in Istanbul — Speak English Through Theatre'
const description = 'English drama workshops in Istanbul for expats and international residents. Twelve weeks, small groups, Pera and Kadıköy. B1 level and above — fluency not required.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_META.url}/en/english-drama-istanbul`,
    languages: {
      'tr-TR': `${SITE_META.url}/atolyeler/english-drama-lab`,
      'en-US': `${SITE_META.url}/en/english-drama-istanbul`,
    },
  },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/en/english-drama-istanbul`,
    locale: 'en_US',
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'English Drama Istanbul' }],
  },
  keywords: [
    'english drama istanbul', 'english speaking club istanbul',
    'english conversation practice istanbul', 'drama classes in english istanbul',
    'english theatre istanbul', 'improve english speaking istanbul',
    'expat classes istanbul', 'english activities istanbul',
    'acting in english istanbul', 'english practice group istanbul',
    'meet people istanbul expat', 'english language theatre turkey',
  ],
}

const FAQ = [
  {
    q: 'How is this different from a conversation club?',
    a: 'A conversation club puts you in a café and hopes speaking happens. Drama gives you a reason to speak — a character who wants something from another character. You also get structured feedback from an instructor, which conversation clubs almost never offer. Most people who join us have already tried a conversation club and found themselves plateauing.',
  },
  {
    q: 'What if my English is not good enough?',
    a: 'B1 is enough. That means you can hold a conversation, even if it is imperfect. Drama work suits this level particularly well: the scene carries you, and speaking as a character removes much of the self-consciousness that blocks people in language settings.',
  },
  {
    q: 'Is this an acting course or an English course?',
    a: 'Both, honestly. You will do real drama work — scene study, improvisation, voice, movement. And because all of it happens in English, your English changes as a side effect. People come for either reason and get both.',
  },
  {
    q: 'Who else will be in the room?',
    a: 'A mix. Expats who recently moved to Istanbul, Turkish professionals preparing for international work, students heading abroad, and people who simply want to use their English somewhere real. Groups are 12–14 people.',
  },
  {
    q: 'Do I have to perform in front of an audience?',
    a: 'Not in the core programme. There is a separate advanced track that ends in a public performance, but the twelve-week English Drama Lab stays within the group. Nobody is pushed onto a stage.',
  },
  {
    q: 'When do new groups start and how do I join?',
    a: 'New groups open several times a year in both Pera and Kadıköy. Write to us in English through the contact page and we will tell you the next intake date, the schedule and current availability.',
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

const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'English Drama Lab — Istanbul',
  description,
  url: `${SITE_META.url}/en/english-drama-istanbul`,
  inLanguage: 'en',
  provider: {
    '@type': 'Organization',
    name: SITE_META.name,
    '@id': `${SITE_META.url}#organization`,
    url: SITE_META.url,
  },
  educationalLevel: 'B1 and above',
  teaches: ['Spoken English', 'Acting', 'Improvisation', 'Voice and presence'],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    courseWorkload: 'P12W',
    location: {
      '@type': 'Place',
      name: 'Techne Lab Istanbul',
      address: { '@type': 'PostalAddress', addressLocality: 'Istanbul', addressCountry: 'TR' },
    },
  },
}

export default function EnglishDramaIstanbul() {
  const w = WORKSHOPS.find((x) => x.slug === 'english-drama-lab')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <Link href="/en" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors mb-4 inline-block">
          ← english home
        </Link>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(30px,5vw,76px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          ENGLISH DRAMA<br />IN ISTANBUL
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">
          Twelve weeks of theatre work, entirely in English. Not a language class —
          a drama workshop that happens to change how you speak.
        </p>
      </section>

      {/* The problem */}
      <section className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          &ldquo;I UNDERSTAND EVERYTHING.<br />I JUST CAN&apos;T SPEAK.&rdquo;
        </h2>
        <div className="max-w-3xl space-y-5">
          <p className="font-mono text-[13px] text-stone leading-relaxed">
            This is the most common sentence we hear. And it points to something real:
            passive and active language are separate skills that develop separately.
          </p>
          <p className="font-mono text-[13px] text-stone leading-relaxed">
            Watching series builds input. Vocabulary apps build recall. Neither one builds
            the ability to produce language in real time, under pressure, with a body attached.
          </p>
          <p className="font-mono text-[13px] text-stone leading-relaxed">
            What does build it: meaningful context, immediate feedback, and repetition
            that does not feel like repetition. A rehearsal room provides all three.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 md:px-10 py-14 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          HOW IT ACTUALLY WORKS
        </h2>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 max-w-5xl">
          {[
            {
              t: 'A character speaks, not you',
              d: 'Speaking a foreign language as yourself carries the fear of being judged. Speaking as a character removes most of it. This small shift is the single biggest unlock we see.',
            },
            {
              t: 'The scene demands speech',
              d: 'Silence is not an option in a scene. You have to respond, and you have to respond now. That pressure is exactly what builds fluency — and it is missing from unstructured conversation practice.',
            },
            {
              t: 'The body is involved',
              d: 'Language is not only cognitive. Breath, voice, gesture and emotion carry speech. Drama trains all of them together, which is why the results feel more permanent.',
            },
            {
              t: 'Feedback that names things',
              d: 'The instructor watches both the acting and the language. "That phrasing weakened the line — try this instead" is something you will hear here and almost nowhere else.',
            },
            {
              t: 'The context keeps changing',
              d: 'A different scene, character and emotional register every week. Your English gets activated in many registers rather than the same three café topics.',
            },
            {
              t: 'Twelve people, not forty',
              d: 'Everyone speaks in every session. There is no back row to hide in — and no waiting your turn for twenty minutes.',
            },
          ].map((x) => (
            <div key={x.t}>
              <h3 className="font-display text-neon text-[20px] mb-3 leading-snug">{x.t}</h3>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical */}
      <section className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          THE PRACTICAL DETAILS
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
          {[
            { l: 'Duration', v: w?.duration ?? '12 weeks, one evening per week' },
            { l: 'Group size', v: `${w?.maxStudents ?? 12} people maximum` },
            { l: 'Level', v: 'B1 and above · fluency not required' },
            { l: 'Locations', v: 'Pera (Beyoğlu) and Kadıköy' },
            { l: 'Language', v: 'Entirely in English' },
            { l: 'Experience', v: 'None required' },
            { l: 'Performance', v: 'Not required in this track' },
            { l: 'Who joins', v: 'Expats, students, professionals' },
          ].map((x) => (
            <div key={x.l}>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-2">{x.l}</span>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          QUESTIONS
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
          NEXT GROUPS ARE FORMING.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Write to us in English. Tell us your level roughly and which side of the city
          works for you — we will tell you what is opening and when.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/iletisim" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            contact us →
          </Link>
          <Link href="/atolyeler/english-drama-lab" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            full programme page →
          </Link>
        </div>
      </section>
    </>
  )
}
