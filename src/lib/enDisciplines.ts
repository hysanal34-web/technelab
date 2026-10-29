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
  /** Türkçe karşılık sayfası (hreflang tr-TR). Yoksa ana sayfa. */
  trSlug?: string
  /** Sayfadaki iddiaların kaynakları (kaynağı açılıp okunmuş olmalı). */
  sources?: { label: string; url: string }[]
  /** /en/articles altındaki ilgili yazılar. */
  articleSlugs?: string[]
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

  // 8 Ekim 2026: yeniden yazıldı. Eski metin "Eylül–Mayıs", "yalnız Kadıköy" ve
  // "İngilizce seviyesi önemli değil" diyordu; üçü de programla çelişiyordu (B1+,
  // Ekim–Mayıs, Pera & Kadıköy). Konumlandırma: İngilizcesi zaten olan çocuk.
  {
    slug: 'drama-classes-for-kids-istanbul',
    label: 'Drama for Kids & Teens',
    h1: 'ENGLISH DRAMA\nFOR KIDS & TEENS',
    eyebrow: 'Ages 8–17 · B1+ English · Pera & Kadıköy',
    seoTitle: 'English Drama Classes for Kids & Teens in Istanbul — Ages 8–17',
    seoDesc:
      "English drama and creativity programme in Istanbul for children who already speak English, ages 8–17. Weekly, October to May, in Pera and Kadıköy. Creative writing, design and jazz dance workshops; a fully English show in May.",
    keywords: [
      'drama classes for kids istanbul', 'english drama classes children istanbul',
      'kids theatre classes istanbul english', 'drama school for children istanbul',
      'after school activities istanbul english', 'teen drama classes istanbul',
      'english activities for kids istanbul', 'international school activities istanbul',
      'youth theatre istanbul', 'acting classes for teenagers istanbul',
      'expat kids activities istanbul', 'english speaking kids activities istanbul',
      'creative activities for teens istanbul', 'bilingual kids istanbul',
      'weekend activities for kids istanbul english', 'theatre for teenagers istanbul',
    ],
    lede:
      "For children who already speak English and need somewhere to use it. English Drama Youth runs in English from October to May, one day a week, in Pera and Kadıköy, and ends with a fully English performance in front of a live audience.",
    sections: [
      {
        heading: 'Who it is for',
        body: "Children aged 8 to 17 who already speak English at around B1 level or above: pupils at international schools, children of expat and mixed families, bilingual children, and Turkish children whose English is strong but who rarely get to use it outside the classroom. There is no level test. If your child can hold an everyday conversation in English, that is enough. No acting experience is needed.",
      },
      {
        heading: 'The gap we built it for',
        body: "Once a child reaches a working level of English, most of what Istanbul offers stops fitting. Language courses keep teaching what they already know. Most drama and theatre courses for children run in Turkish. The English drama options we found for this age group are either open to every level or designed to introduce English through play, which suits beginners but not a child who already speaks it. English Drama Youth starts from the other end: English is simply the working language, and the work itself is theatre.",
      },
      {
        heading: 'What the year looks like',
        body: "October to May, one session a week. Each month runs the same way: three weeks of drama (creative drama, improvisation, solo and ensemble work) and a fourth week with a guest artist, rotating between creative writing, design and jazz dance. October to December is play, trust and improvisation. January is character and text, with a scene-writing workshop. February to April is rehearsal, using scenes built from the children's own writing, designs and movement. In May come the dress and technical rehearsals and a fully English show for families and an audience.",
      },
      {
        heading: 'Creativity, not just conversation',
        body: "In the guest workshops children write short stories for their characters, design characters and masks, and build rhythm and ensemble movement with a dancer. Everything they make goes into a shared pool that becomes the material of the May show. They are not handed a finished play to memorise; they perform something they helped to write, design and choreograph, in English.",
      },
      {
        heading: 'What changes in their English',
        body: "The Council of Europe's CEFR describes a B1 speaker as someone who can keep going comprehensibly, though pausing to plan and repair is very evident; at B2, speech runs at a fairly even tempo. Much of the step from B1 to B2 is about speaking without stopping to plan every sentence. That is exactly what improvisation and rehearsal train: answering in the moment, repeating lines until they flow, speaking to an audience. Research points the same way. In a TESOL Quarterly study (Galante & Thomson, 2017), 24 Brazilian teenagers learning English followed either a four-month drama-based programme or communicative classes; 30 native-speaker listeners rated the drama group's speech as more fluent and easier to understand. A meta-analysis of 47 studies (Lee et al., Review of Educational Research, 2015) found positive effects of drama-based teaching on achievement and on psychological and social outcomes. We do not test or grade, so we will not promise a jump in level. What the year targets is the part of fluency grammar lessons rarely reach: speaking without translating first.",
      },
      {
        heading: 'Two age groups, two sides of the city',
        body: "Ages 8–14 and 15–17 work in separate classes; a twelve-year-old and a seventeen-year-old need different material and a different pace. Groups are capped at 12. The Pera group (European side) meets on Sundays at 13:00; it started on 4 October and joining is still open. The Kadıköy group (Asian side) started on Saturday 24 October at 15:00, and joining is open. Classes take place in partner studios.",
      },
      {
        heading: 'For parents who do not speak Turkish',
        body: "Everything can be done in English: questions, enrolment and updates during the year. Our online booking form is currently in Turkish, so the easiest route is to email or message us in English and we will book your child into a free introduction session on a Sunday in Pera or a Saturday in Kadıköy.",
      },
    ],
    faq: [
      {
        q: 'What English level does my child need?',
        a: "Around B1 or above: your child can follow an everyday conversation and answer in full sentences. There is no test; your own judgement is enough. If your child is just starting English, our A1+ beginner groups (ages 8–12 and 13–17) are coming soon: see /en/beginner-english-drama-for-kids-istanbul.",
      },
      {
        q: 'My child is at an international school and already fluent. Will this be too easy?',
        a: "The challenge here is not vocabulary. It is improvising with a partner, writing a scene, holding a character for eight months and performing for an audience. Children who already speak English easily tend to have the most room to play, which is the point of the programme.",
      },
      {
        q: "Will my child's English improve?",
        a: "We do not grade or test, so we do not promise a level. The work is built around the skill that separates B1 from B2 in the CEFR: speaking at an even tempo without stopping to plan. Studies of drama-based English teaching with teenagers have found larger gains in fluency than standard communicative classes (Galante & Thomson, TESOL Quarterly, 2017).",
      },
      {
        q: 'Are younger children mixed with teenagers?',
        a: 'No. Ages 8–14 and 15–17 work in separate classes. This separation is deliberate.',
      },
      {
        q: 'Is the final performance compulsory?',
        a: 'The performance is part of the programme and the whole group prepares it together. How prominent your child is on stage depends on their own pace; nobody is pushed further than they want to go.',
      },
      {
        q: 'Where and when are the classes?',
        a: 'Pera (Beyoğlu, European side) on Sundays at 13:00, and Kadıköy (Asian side) on Saturdays at 15:00 (started 17 October). One session a week, October to May.',
      },
      {
        q: 'Can my child join after the start?',
        a: 'Yes. The Pera group started on 4 October and joining is still open; the Kadıköy group started on 17 October. The first months are about play and trust, so a late start is easy to absorb.',
      },
      {
        q: 'Can we try a session first?',
        a: 'Yes. Free introduction sessions run weekly: Sundays at 13:00 in Pera and Saturdays at 15:00 in Kadıköy. Email or message us in English and we will book you in.',
      },
      {
        q: 'Do parents need to speak Turkish to enrol?',
        a: 'No. We handle enrolment and all communication in English if you prefer.',
      },
    ],
    workshopSlugs: ['english-drama-youth'],
    related: ['acting-classes-istanbul', 'theatre-workshops-for-expats-istanbul'],
    trSlug: 'cocuklar-icin-ingilizce-drama-istanbul',
    articleSlugs: ['english-drama-for-kids-teens-istanbul-parents-guide'],
    sources: [
      { label: 'Council of Europe, CEFR Table 3: qualitative aspects of spoken language use (B1, B2)', url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use' },
      { label: 'Galante & Thomson (2017), TESOL Quarterly 51(1): drama and L2 fluency. Summary: Brock University News, 4 April 2016', url: 'https://brocku.ca/brock-news/2016/04/brock-research-finds-drama-and-theatre-help-non-english-speaking-students-to-better-speak-english/' },
      { label: 'Lee, Patall, Cawthon & Steingut (2015), Review of Educational Research 85(1): meta-analysis of drama-based pedagogy', url: 'https://journals.sagepub.com/doi/10.3102/0034654314540477' },
    ],
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
        body: 'English Drama Lab is the main entry point: twelve weeks, entirely in English, no experience needed. English Acting Praxis goes further, ending with a masterclass from Casting Director Harika Uygur. Musical theatre and Broadway dance run with English support. And for those with children, our youth drama programme runs in English for ages 8–17.',
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
  // ── A1+ beginners (28 Oct 2026, coming soon; days not set) ──
  {
    slug: 'beginner-english-drama-istanbul',
    label: 'Beginner English Through Drama',
    h1: 'BEGINNER ENGLISH\nTHROUGH DRAMA',
    eyebrow: 'A1+ · Adults · Coming soon · Pera & Kadıköy',
    seoTitle: 'Beginner English Through Drama in Istanbul — A1+ Adults',
    seoDesc:
      'English for absolute beginners through drama, in Istanbul. 12 weeks, 2 hours a week, Pera and Kadıköy. No fluency promise; a real start to speaking. Waiting list open.',
    keywords: [
      'beginner english istanbul', 'english for beginners istanbul adults', 'english classes istanbul beginners',
      'learn english from zero istanbul', 'english through drama beginners', 'a1 english course istanbul',
      'english course kadikoy beginner', 'english course beyoglu beginner', 'speak english from zero',
    ],
    lede:
      "A1+ English Drama Lab is not a language school class. It is a theatre company's rehearsal room for people who are just starting English: body and situation first, words after. Twelve weeks, two hours a week, in Pera and Kadıköy. Days are not set yet; the waiting list is open.",
    sections: [
      { heading: 'What happens in a session', body: 'Each session opens with games: names, rhythm, voice. Then come instructions and situations. In the first weeks, listening and answering with movement is enough; nobody is pushed to speak. Everyday phrases (introducing yourself, asking for something, refusing, asking the way, apologising) are practised with a partner, inside a situation, again and again. In the final weeks the phrases move into characters and short English scenes. Grammar is not lectured; structures show up on stage and we talk about the rule when you need it.' },
      { heading: 'What to expect in 12 weeks, and what not to', body: "Cambridge estimates that reaching A2 from zero takes around 180–200 guided learning hours; this programme is 24. So we do not promise fluency or a level jump. What we expect: you say the phrases we practised with fewer pauses, you are more willing to speak English, and you can perform a short scene in English. It works best alongside a course, an app or your own study." },
      { heading: 'Why drama at the start', body: 'Beginner speech rests largely on ready-made phrases stored whole (Wray, 2002; Myles et al., 1998). Body-based instruction, starting with Asher\'s Total Physical Response, supports listening comprehension in the early stages. Drama gives those phrases a situation and a reason to be said. To be honest about the evidence: the strongest fluency study on drama (Galante & Thomson, 2017) was with B1 teenagers over 74 hours, and we found no controlled study of drama with adult A1 groups. We do not claim more than that.' },
      { heading: 'Stuck at A2?', body: 'The Council of Europe describes B1 as being able to keep going comprehensibly, even with very evident pauses for planning and repair. At A2, speech stays in very short utterances. Cambridge puts A2 at around 180–200 guided hours from zero and B1 at 350–400, so the step is long. This group also suits A2 speakers who know the phrases but lose the thread once a phrase runs out. Twelve weeks will not take you to B1; they train the keeping-going part.' },
      { heading: 'Who it is for', body: 'Adults starting English from zero or coming back after years. People who took a course and still freeze. Adults who think they started too late. No acting experience needed. If you can already hold an everyday conversation (around B1), English Drama Lab is the better fit.' },
    ],
    faq: [
      { q: 'I speak no English at all. Can I join?', a: 'Yes, this group is built for that. In the first weeks you do not have to speak; listening and responding with movement is part of the work.' },
      { q: 'Will I be fluent after 12 weeks?', a: 'No, and we do not promise it. 24 hours is a first step, not a level. The goal is to start speaking.' },
      { q: 'When does it start?', a: 'Days and times are being set. Join the waiting list and we will tell you first when they are announced.' },
      { q: 'Do I need Turkish?', a: 'No. The working language of the room is English at a beginner pace; questions and enrolment can be done in English or Turkish.' },
    ],
    workshopSlugs: ['a1-english-drama-lab', 'english-drama-lab'],
    related: ['beginner-english-drama-for-kids-istanbul', 'acting-classes-istanbul', 'theatre-workshops-for-expats-istanbul'],
    trSlug: 'sifirdan-ingilizce-konusma-istanbul',
    sources: [
      { label: 'Cambridge English: Guided learning hours', url: 'https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours' },
      { label: 'Galante & Thomson (2017), TESOL Quarterly', url: 'https://doi.org/10.1002/tesq.290' },
    ],
    articleSlugs: ['beginner-english-istanbul-guide', 'drama-for-beginner-english', 'a2-to-b1-english-why-it-takes-longer'],
  },
  {
    slug: 'beginner-english-drama-for-kids-istanbul',
    label: 'Beginner English Drama for Kids',
    h1: 'BEGINNER ENGLISH\nDRAMA FOR KIDS',
    eyebrow: 'A1+ · Ages 8–12 · 13–17 · Coming soon',
    seoTitle: 'Beginner English Drama for Kids in Istanbul — Ages 8–17',
    seoDesc:
      'English drama for children just starting English, ages 8–12 and 13–17 in separate groups. 12 weeks, 2 hours a week, Pera and Kadıköy. Waiting list open.',
    keywords: [
      'beginner english for kids istanbul', 'english classes for kids istanbul beginners',
      'english through play kids istanbul', 'kids english drama beginners', 'english for children istanbul',
      'after school english istanbul', 'english activities for kids istanbul beginners',
    ],
    lede:
      'For children who are just starting English. A1+ English Drama Youth uses games, movement and short scenes: hear the instruction, answer with the body, then say the phrase in a character\'s voice. No books, tests or grades. Ages 8–12 and 13–17 work separately, in Pera and Kadıköy, over twelve weeks.',
    sections: [
      { heading: 'How it works', body: 'Sessions open with name, rhythm and movement games. Instructions are answered with the body; children are not pushed to speak, and quiet participation counts. Greetings, requests, questions and feelings are repeated inside games and characters. In the final weeks the group builds short English scenes together.' },
      { heading: 'What parents can expect', body: 'We do not promise fluency or a level jump in twelve weeks. What we expect: your child says the phrases we practised more easily, is more willing to speak English, and can perform a short scene in English. A controlled study with Turkish third-graders found benefits of drama-based activities for speaking (Öztürk Pat & Yılmaz, 2021).' },
      { heading: 'Two age groups', body: 'Ages 8–12 and 13–17 are separate: different games, different pace, different worries. If your child already speaks English at around B1, our year-long English Drama Youth programme is the better fit.' },
    ],
    faq: [
      { q: 'My child speaks almost no English. Is that OK?', a: 'Yes, this group is for exactly that. Listening and answering with movement is enough at the start.' },
      { q: 'When does it start?', a: 'Days and times are being set. Join the waiting list and we will let you know first.' },
      { q: 'Is there a level test?', a: 'No. If your child can already chat in English, we will point you to English Drama Youth instead.' },
    ],
    workshopSlugs: ['a1-english-drama-youth', 'english-drama-youth'],
    related: ['drama-classes-for-kids-istanbul', 'beginner-english-drama-istanbul'],
    trSlug: 'cocuklar-icin-baslangic-ingilizce-drama',
    articleSlugs: ['drama-for-beginner-english', 'english-drama-for-kids-teens-istanbul-parents-guide'],
  },
  // ── English improv + public speaking (29 Oct 2026). Same programme: English Drama Lab.
  {
    slug: 'english-improv-istanbul',
    label: 'Improv in English',
    h1: 'IMPROV IN ENGLISH,\nEVERY WEEK',
    eyebrow: 'Adults · B1+ English · Pera & Kadıköy',
    seoTitle: 'Improv in English in Istanbul — Weekly Adult Workshop',
    seoDesc:
      'English-language improv in Istanbul for adults, including non-native speakers. Weekly, drop-in friendly, small groups, in Pera and Kadıköy. No experience needed.',
    keywords: [
      'improv classes istanbul english', 'english improv istanbul', 'improv workshop istanbul',
      'improv for non-native speakers', 'improv theatre istanbul english', 'drama classes for adults istanbul english',
      'improv kadikoy', 'improv beyoglu english', 'impro istanbul english',
    ],
    lede:
      'English-language improv in Istanbul has been hard to find for years. English Drama Lab runs improv and scene work in English every week, in Pera and Kadıköy, for adults whose shared language is English: expats, international residents and Turkish speakers alike. You can join any week.',
    sections: [
      { heading: 'What a session looks like', body: 'Warm-up games for voice, body and reaction speed. Then improvised scenes: you get a situation and solve it in English, with a partner, without a script. Status games, character work, group scenes. Groups are capped at twelve, so everyone is on their feet every week. No acting experience is needed; most participants have none.' },
      { heading: 'For non-native speakers too', body: 'You do not need to be a native speaker. If you can hold an everyday conversation in English (around B1), you can play. Mistakes are not corrected mid-scene; the scene keeps going, and so do you. That is much of the point: improv trains you to keep talking when you do not have the perfect sentence.' },
      { heading: 'What improv does, and what it does not', body: 'In randomised lab studies, even a short improv session increased comfort with uncertainty and positive mood compared with a scripted activity (Felsman, 2019; Felsman et al., 2020). A 10-week school improv programme was followed by lower social anxiety in teenagers, though without a control group (Felsman et al., 2023). Improv is not therapy, and evidence for adults is still limited. We do not promise a cure for nerves; we offer a weekly room where speaking without a script becomes normal.' },
      { heading: 'Improv and Toastmasters', body: 'Toastmasters clubs in Istanbul work on prepared speeches and structured feedback, and they do it well. Improv works on the unprepared part: reacting, listening, staying in a scene. Many people benefit from both.' },
    ],
    faq: [
      { q: 'Do I need acting experience?', a: 'No. The games build up step by step, and most participants have never been on a stage.' },
      { q: 'Is it in English the whole time?', a: 'Yes. English is the working language of the room. Trainers are conservatoire-trained theatre makers who work in English.' },
      { q: 'Can I come just once?', a: 'Yes. Participation is flexible: you can join a single session and continue with a 4- or 8-session pass if you like it.' },
      { q: 'What if my English is basic?', a: 'If you are just starting English, our A1+ beginner group is coming soon: see the beginner English through drama page.' },
    ],
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project'],
    related: ['public-speaking-english-istanbul', 'theatre-workshops-for-expats-istanbul', 'acting-classes-istanbul'],
    trSlug: 'yetiskinler-icin-ingilizce-drama-istanbul',
    sources: [
      { label: 'Felsman et al. (2023), The Arts in Psychotherapy', url: 'https://doi.org/10.1016/j.aip.2022.101985' },
      { label: 'Felsman (2019), University of Michigan', url: 'https://deepblue.lib.umich.edu/handle/2027.42/151483' },
    ],
    articleSlugs: ['improv-in-english-istanbul-guide', 'public-speaking-in-a-second-language'],
  },
  {
    slug: 'public-speaking-english-istanbul',
    label: 'Public Speaking in English',
    h1: 'SPEAKING UP\nIN ENGLISH',
    eyebrow: 'Adults · Confidence · Presentations · Pera & Kadıköy',
    seoTitle: 'Public Speaking in English, Istanbul — Drama Lab',
    seoDesc:
      'Speaking up in English at work, in meetings or on stage. Weekly drama and improv practice for voice, body and unprepared answers. Pera and Kadıköy, small groups.',
    keywords: [
      'public speaking course istanbul in english', 'public speaking istanbul', 'speaking confidence english istanbul',
      'presentation skills istanbul english', 'toastmasters istanbul alternative', 'english speaking confidence course',
      'fear of speaking english', 'presentation anxiety english non native',
    ],
    lede:
      'Speaking in front of people is hard. Doing it in a language that is not your first one adds another layer. English Drama Lab works on both through theatre: voice, body, eye contact and answering the unexpected, every week, in front of a small group.',
    sections: [
      { heading: 'Why it is harder in a second language', body: 'Language anxiety is linked to lower performance (a meta-analysis found a moderate negative correlation, r = −.36; Teimouri, Goetze & Plonsky, 2019). In English-language presentations, anxiety shows up most in delivery: voice, eye contact, posture (Ding et al., 2024). So we work on delivery, not only on words.' },
      { heading: 'What we do', body: 'Breath and posture, carrying a line without shouting, keeping your eyes on people. Then improvisation: an unexpected question, answered without preparation, in English. Our advice is simple: prepare and rehearse your opening, do not memorise the rest. A memorised text breaks at the first question; someone who has practised reacting keeps going.' },
      { heading: 'Honest about the evidence', body: 'Fear of public speaking responds well to structured psychological interventions (meta-analysis of 30 trials, g = 0.74; Ebrahimi et al., 2019). Improv training improved presentation skills in a controlled study, but modestly, and showed no direct short-term effect on presentation stress (Casteleyn, 2019). Our workshop is theatre practice, not therapy, and we do not claim numbers we have not measured.' },
    ],
    faq: [
      { q: 'Is this a presentation coaching service?', a: 'No, it is a group theatre workshop. What you practise there (voice, body, unprepared answers) carries into your presentations. Companies can ask about our separate corporate programme.' },
      { q: 'What level of English do I need?', a: 'Around B1: you can hold an everyday conversation. If you are earlier than that, see our beginner group, coming soon.' },
      { q: 'How is this different from Toastmasters?', a: 'Toastmasters focuses on prepared speeches and evaluation. We focus on the body and the unprepared moment. They complement each other.' },
    ],
    workshopSlugs: ['english-drama-lab'],
    related: ['english-improv-istanbul', 'acting-classes-istanbul', 'beginner-english-drama-istanbul'],
    trSlug: 'ingilizce-sunum-atolyesi-istanbul',
    sources: [
      { label: 'Ebrahimi et al. (2019), Frontiers in Psychology', url: 'https://doi.org/10.3389/fpsyg.2019.00488' },
      { label: 'Casteleyn (2019), Research in Drama Education', url: 'https://doi.org/10.1080/13569783.2018.1552129' },
      { label: 'Teimouri, Goetze & Plonsky (2019), SSLA', url: 'https://doi.org/10.1017/S0272263118000311' },
    ],
    articleSlugs: ['public-speaking-in-a-second-language', 'improv-in-english-istanbul-guide'],
  },
]

export function getEnPage(slug: string) {
  return EN_PAGES.find((p) => p.slug === slug)
}
