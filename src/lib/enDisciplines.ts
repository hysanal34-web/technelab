// ══════════════════════════════════════════════════════════════════
// İNGİLİZCE LANDING SAYFALARI — expat & uluslararası kitle
//
// İstanbul'da İngilizce konuşan yerleşik yabancı, freelancer ve
// uluslararası okul velisi ciddi bir kitle — ve bu aramalarda
// rekabet Türkçe tarafına kıyasla neredeyse yok. "acting classes
// istanbul english", "drama classes for kids istanbul english"
// gibi sorgularda ilk sayfaya çıkmak çok daha kolay.
//
// Her sayfa gerçek bir programa bağlı; uydurma içerik yok.
// ══════════════════════════════════════════════════════════════════

export type EnPage = {
  slug: string
  label: string
  h1: string
  eyebrow: string
  seoTitle: string
  seoDesc: string
  keywords: string[]
  lede: string
  sections: { heading: string; body: string }[]
  faq: { q: string; a: string }[]
  workshopSlugs: string[]
  related: string[]
}

export const EN_PAGES: EnPage[] = [
  {
    slug: 'acting-classes-istanbul',
    label: 'Acting Classes',
    h1: 'ACTING CLASSES\nIN ISTANBUL',
    eyebrow: 'In English · All Levels',
    seoTitle: 'Acting Classes in Istanbul in English — Techne Lab',
    seoDesc:
      'English-language acting classes in Istanbul for expats and international residents. Small groups, no experience required. Pera and Kadıköy studios.',
    keywords: [
      'acting classes istanbul', 'acting classes in english istanbul',
      'acting school istanbul', 'drama classes istanbul english',
      'theatre classes istanbul', 'acting workshop istanbul english',
      'acting lessons istanbul', 'english speaking acting class istanbul',
      'acting for beginners istanbul', 'performing arts classes istanbul',
      'expat classes istanbul', 'creative classes istanbul english',
    ],
    lede:
      'You do not need Turkish to work on stage in Istanbul. Our acting groups run entirely in English — the same craft, the same rigour, in a language you already think in.',
    sections: [
      {
        heading: 'What the work looks like',
        body: 'We start with the body, not the text. Where the breath goes, how weight moves, whether you are actually seeing your partner. Voice comes next: support, resonance, carrying a line without pushing. Only then do we build character and work with script. Every session ends with everyone on their feet — nobody sits and watches. Groups are capped at twelve.',
      },
      {
        heading: 'Who joins',
        body: 'Expats and long-term residents who want something that is not another language exchange. Freelancers and remote workers looking for a real weekly commitment outside the laptop. People who acted years ago and want back in. Complete beginners — most of our participants have never been on a stage. Turkish is not required at any point.',
      },
      {
        heading: 'Where and when',
        body: 'Two studios: Pera on the European side, Kadıköy on the Asian side. Sessions run evenings and weekends so they fit around work. Programmes last between four weeks and eight months depending on the track.',
      },
    ],
    faq: [
      {
        q: 'Do I need to speak Turkish?',
        a: 'No. These groups run in English from start to finish — instruction, exercises, feedback and scripts. Several of our participants speak no Turkish at all.',
      },
      {
        q: 'I have never acted before. Is that a problem?',
        a: 'It is the normal starting point. Most people who join have no stage experience. The first weeks are built so that everyone begins from the same place.',
      },
      {
        q: 'How much does it cost?',
        a: 'Fees depend on the programme length and are shared directly once you apply. Write to us and we will walk you through the options.',
      },
      {
        q: 'Can I join mid-term?',
        a: 'Usually no — groups build trust over time and a late arrival disrupts that. But new intakes open several times a year. Tell us your timing and we will hold you a place.',
      },
    ],
    workshopSlugs: ['oyuncunun-mevcudiyeti', 'english-drama-lab', 'english-drama-final-project'],
    related: ['musical-theatre-classes-istanbul', 'theatre-workshops-for-expats-istanbul'],
  },

  {
    slug: 'musical-theatre-classes-istanbul',
    label: 'Musical Theatre & Dance',
    h1: 'MUSICAL THEATRE\n& BROADWAY DANCE',
    eyebrow: 'Singing · Dancing · Acting',
    seoTitle: 'Musical Theatre & Broadway Dance Classes Istanbul — Techne Lab',
    seoDesc:
      'Musical theatre and Broadway dance classes in Istanbul. Jazz, theatre dance and voice work in one programme. English-friendly, small groups, Kadıköy.',
    keywords: [
      'musical theatre istanbul', 'musical theatre classes istanbul',
      'broadway dance istanbul', 'jazz dance classes istanbul',
      'theatre dance istanbul', 'dance classes istanbul english',
      'singing and dancing classes istanbul', 'musical theatre school istanbul',
      'broadway classes istanbul', 'dance studio istanbul english speaking',
      'performing arts istanbul expats',
    ],
    lede:
      'Musical theatre asks for three things at once — you sing, you move, you act, and none of them wait for the others. Our programmes train all three in the same room.',
    sections: [
      {
        heading: 'Two ways in',
        body: 'Techne Musical Lab runs eight months, two sessions a week, and closes with a staged performance in front of an audience. It combines drama, theatre technique and musical work for ages 15 to 55. Broadway Musical Dance is shorter — twelve weeks of choreography built on jazz and theatre dance, taught by Köksal Ünal. No previous dance training required.',
      },
      {
        heading: 'The room',
        body: 'Kadıköy studio, sprung floor, mirrors, proper sound. Groups stay small so that corrections are individual rather than shouted at a crowd. If you have danced before, you will be pushed. If you have not, you will still finish the term with a full routine in your body.',
      },
      {
        heading: 'Language',
        body: 'Sessions run in Turkish with English support, and the instructors work comfortably in both. Dance instruction is largely physical — several of our international participants joined with no Turkish and had no difficulty following.',
      },
    ],
    faq: [
      {
        q: 'Can I join if I do not speak Turkish?',
        a: 'Yes. Dance instruction is demonstrated more than explained, and our instructors give notes in English when needed. Tell us in advance so we can make sure you are supported.',
      },
      {
        q: 'Do I need to be able to sing?',
        a: 'For the Musical Lab, no — voice work is part of what is taught. For Broadway Dance, singing is not involved at all.',
      },
      {
        q: 'I have no dance background. Too late?',
        a: 'No. Broadway Musical Dance is built to take absolute beginners through a full choreography in twelve weeks. Participants in their forties start from zero every term.',
      },
      {
        q: 'Is there a performance at the end?',
        a: 'The Musical Lab closes with a public performance in May. Broadway Dance ends with a filmed studio showing rather than a staged production.',
      },
    ],
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
    related: ['acting-classes-istanbul', 'theatre-workshops-for-expats-istanbul'],
  },

  {
    slug: 'drama-classes-for-kids-istanbul',
    label: 'Drama for Kids & Teens',
    h1: 'ENGLISH DRAMA\nFOR KIDS & TEENS',
    eyebrow: 'Ages 10–17 · Year-End Performance',
    seoTitle: 'English Drama Classes for Kids in Istanbul — Ages 10-17',
    seoDesc:
      'English drama classes for children and teenagers in Istanbul, ages 10-17. Eight-month programme ending in a public performance. Kadıköy, small groups.',
    keywords: [
      'drama classes for kids istanbul', 'english drama classes children istanbul',
      'kids theatre classes istanbul english', 'drama school for children istanbul',
      'after school activities istanbul english', 'teen drama classes istanbul',
      'english activities for kids istanbul', 'international school activities istanbul',
      'youth theatre istanbul', 'acting classes for teenagers istanbul',
      'expat kids activities istanbul',
    ],
    lede:
      'Children learn a language by using it, not by studying it. Our English drama programme puts them on their feet for eight months and ends with a real performance in front of an audience.',
    sections: [
      {
        heading: 'How the year runs',
        body: 'September to May, one session a week. The year moves through three phases: play and trust first, then character and text, then three months of rehearsal. In May they perform for a live audience — families, friends, and anyone who wants to come. That evening is the point of the whole year.',
      },
      {
        heading: 'Age groups',
        body: 'Two separate classes: ages 10–14 and ages 15–17. We keep them apart deliberately — a twelve-year-old and a seventeen-year-old need different work and move at different speeds. Your child will be placed by age at registration.',
      },
      {
        heading: 'Language level',
        body: 'The programme is built around age, not English level. Early weeks lean on movement and play; language enters gradually. The goal is not advanced grammar — it is the confidence to speak without stopping to translate first. Children from international schools and Turkish schools sit in the same room and both do fine.',
      },
    ],
    faq: [
      {
        q: 'My child\'s English is weak. Will they struggle?',
        a: 'No. The programme is grouped by age rather than language level. The first weeks are mostly physical and playful, and language comes in slowly. The aim is the courage to speak, not fluency on day one.',
      },
      {
        q: 'Will young children be in the same class as teenagers?',
        a: 'No. Ages 10–14 and 15–17 work in separate classes. This separation is deliberate.',
      },
      {
        q: 'Is the final performance compulsory?',
        a: 'The performance is part of the programme and the whole group prepares it together. How prominent your child is on stage is set by their own pace — nobody is pushed further than they want to go.',
      },
      {
        q: 'Where are the classes held?',
        a: 'At our Kadıköy studio on the Asian side. Families travel to us from Üsküdar, Ataşehir, Maltepe and across the city.',
      },
      {
        q: 'Do parents need to speak Turkish to enrol?',
        a: 'No. We handle enrolment and all communication in English if you prefer.',
      },
    ],
    workshopSlugs: ['english-drama-youth'],
    related: ['acting-classes-istanbul', 'theatre-workshops-for-expats-istanbul'],
  },

  {
    slug: 'theatre-workshops-for-expats-istanbul',
    label: 'For Expats',
    h1: 'THEATRE WORKSHOPS\nFOR EXPATS',
    eyebrow: 'Istanbul · In English',
    seoTitle: 'Theatre & Drama Workshops for Expats in Istanbul — In English',
    seoDesc:
      'English-language theatre workshops for expats, remote workers and international residents in Istanbul. Meet people, work on something real. Pera and Kadıköy.',
    keywords: [
      'expat activities istanbul', 'things to do in istanbul expats',
      'english speaking activities istanbul', 'meet people istanbul expats',
      'social activities istanbul english', 'hobby classes istanbul english',
      'expat community istanbul', 'digital nomad istanbul activities',
      'remote workers istanbul community', 'evening classes istanbul english',
      'creative workshops istanbul english', 'english speaking club istanbul',
    ],
    lede:
      'Moving to a city is easy. Building a life in it is the hard part. A weekly theatre group turns out to be one of the fastest ways through — you meet the same people every week and you do something together that actually requires you.',
    sections: [
      {
        heading: 'Why theatre works for this',
        body: 'Language exchanges and expat meetups are transactional — you talk, you leave, you rarely see the same person twice. A theatre group is the opposite. You commit for a term, you work with the same people every week, and the work itself demands you pay attention to each other. People come for the craft and leave with a circle.',
      },
      {
        heading: 'What we run in English',
        body: 'English Drama Lab is the main entry point: twelve weeks, entirely in English, no experience needed. English Acting Praxis goes further, ending with a masterclass from Casting Director Harika Uygur. Musical theatre and Broadway dance run with English support. And for those with children, our youth drama programme runs in English for ages 10–17.',
      },
      {
        heading: 'Practical',
        body: 'Studios in Pera and Kadıköy — reachable from both sides of the city. Sessions are in the evening or at weekends. Groups are capped at twelve. Enrolment, questions and correspondence can all be handled in English.',
      },
    ],
    faq: [
      {
        q: 'I am only in Istanbul for a few months. Worth it?',
        a: 'The twelve-week programmes fit a short stay well. If you are here for less than that, write to us anyway — we sometimes run shorter intensives.',
      },
      {
        q: 'Is this a language class?',
        a: 'No. We do not teach English. We work in English on theatre. If your English is intermediate or above you will be fine, and your fluency will improve as a side effect.',
      },
      {
        q: 'Will I be the only foreigner in the room?',
        a: 'No. Our English groups mix international residents with Turkish participants who want to work in English. That mix is part of what makes the room interesting.',
      },
      {
        q: 'How do I ask questions in English?',
        a: 'Write to us through the contact page or email info@technelabistanbul.com. We reply in English.',
      },
    ],
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project', 'techne-musical-lab', 'english-drama-youth'],
    related: ['acting-classes-istanbul', 'musical-theatre-classes-istanbul', 'drama-classes-for-kids-istanbul'],
  },
]

export function getEnPage(slug: string) {
  return EN_PAGES.find((p) => p.slug === slug)
}
