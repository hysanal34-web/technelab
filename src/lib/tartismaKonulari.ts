/**
 * /kaynaklar/ingilizce-tartisma-konulari — B2–C1 için İngilizce tartışma (debate) konuları.
 * Her önerge: "This house..." kalıbında motion + seviye + bir lehte bir aleyhte açılış argümanı.
 * Seviye mantığı CEFR B2/C1 sözlü etkileşim tanımlarından (konusmaSorulari.ts ile aynı).
 * Tüm önergeler ve argümanlar Techne Lab için özgün yazıldı.
 */
export type DLevel = 'B2' | 'C1'
export type Motion = { m: string; level: DLevel; pro: string; con: string }
export type DCategory = { key: string; tr: string; en: string; motions: Motion[] }

export const D_CATEGORIES: DCategory[] = [
  {
    key: 'teknoloji', tr: 'Teknoloji ve yapay zekâ', en: 'Technology & AI',
    motions: [
      { m: 'This house would ban smartphones in schools.', level: 'B2', pro: 'Attention is a skill, and schools should protect the place where it is learned.', con: 'Students will use phones all their lives; school is where they should learn to use them well.' },
      { m: 'This house believes AI will create more jobs than it destroys.', level: 'B2', pro: 'Every major technology so far has created new kinds of work nobody could predict.', con: 'The speed of change matters: new jobs may come, but not for the people who lose the old ones.' },
      { m: 'This house would require all AI-generated images to be labelled.', level: 'B2', pro: 'People have a right to know whether what they see really happened.', con: 'Labels are easy to remove, so honest users carry the cost and dishonest ones ignore it.' },
      { m: 'This house regrets the rise of social media influencers.', level: 'C1', pro: 'Influence without editorial responsibility blurs the line between advice and advertising.', con: 'Influencers broke the monopoly of traditional media and gave a voice to people it ignored.' },
      { m: 'This house believes the right to be forgotten should apply to everyone online.', level: 'C1', pro: 'People change; a mistake at twenty should not define a life at forty.', con: 'Deleting the past can protect the powerful as easily as it protects ordinary people.' },
    ],
  },
  {
    key: 'sehir', tr: 'Şehir ve yaşam', en: 'City life',
    motions: [
      { m: 'This house would make public transport free.', level: 'B2', pro: 'Free transport reduces traffic and treats mobility as a public right.', con: 'Something free is often underfunded; riders may get worse service, not better.' },
      { m: 'This house would ban private cars from city centres.', level: 'B2', pro: 'Streets designed for people are safer, quieter and better for local shops.', con: 'Not everyone can walk or cycle; a ban punishes the elderly and disabled first.' },
      { m: 'This house believes big cities are better places to raise children than small towns.', level: 'B2', pro: 'Cities offer more schools, culture and diversity of people to learn from.', con: 'Children need space, safety and time, all of which big cities make expensive.' },
      { m: 'This house would limit short-term holiday rentals in historic neighbourhoods.', level: 'C1', pro: 'When homes become hotels, neighbourhoods lose the residents that made them worth visiting.', con: 'Owners should decide how to use their property, and tourism money supports local businesses.' },
      { m: 'This house believes remote work is killing city centres.', level: 'C1', pro: 'Empty offices mean empty cafés, shops and public transport at lunchtime.', con: 'City centres are not dying, they are changing from places of work into places of leisure.' },
    ],
  },
  {
    key: 'egitim', tr: 'Eğitim', en: 'Education',
    motions: [
      { m: 'This house would abolish homework in primary school.', level: 'B2', pro: 'Young children learn more from play, rest and family time than from worksheets.', con: 'Homework builds routine and lets parents see what their children are learning.' },
      { m: 'This house believes university should be free for everyone.', level: 'B2', pro: 'Education benefits the whole society, so the whole society should pay for it.', con: 'Free university often helps richer families most, because their children are more likely to attend.' },
      { m: 'This house would replace exams with project-based assessment.', level: 'B2', pro: 'Projects show what students can do, not only what they can remember under pressure.', con: 'Exams are harder to cheat and treat every student by the same standard.' },
      { m: 'This house believes arts subjects are as important as maths and science.', level: 'C1', pro: 'Creativity, empathy and interpretation are skills every profession needs.', con: 'Limited school hours must go first to the subjects that open the most doors.' },
      { m: 'This house would teach all school subjects in English from age twelve.', level: 'C1', pro: 'Early immersion gives children fluency that later study rarely achieves.', con: 'Learning difficult content in a second language can weaken understanding of both.' },
    ],
  },
  {
    key: 'is', tr: 'İş ve kariyer', en: 'Work & career',
    motions: [
      { m: 'This house would introduce a four-day working week.', level: 'B2', pro: 'Rested people work better, and the extra day can go to family, health and learning.', con: 'Many jobs, like care and hospitality, cannot simply be compressed into four days.' },
      { m: 'This house believes it is better to be your own boss than an employee.', level: 'B2', pro: 'Independence means you decide what you work on and how you spend your time.', con: 'Being your own boss often means no holidays, no security and no one to share risk with.' },
      { m: 'This house would make salaries public within every company.', level: 'C1', pro: 'Transparency exposes unfair pay gaps that thrive in secrecy.', con: 'Public salaries can create resentment and ignore differences that are hard to measure.' },
      { m: 'This house believes loyalty to one employer is outdated.', level: 'B2', pro: 'Changing jobs is often the fastest way to learn new skills and earn more.', con: 'Deep expertise and trust take years to build in one place.' },
      { m: 'This house regrets the culture of always being available on email.', level: 'C1', pro: 'Constant availability turns rest into waiting and makes deep work impossible.', con: 'Flexibility works both ways; being reachable is the price of working from anywhere.' },
    ],
  },
  {
    key: 'cevre', tr: 'Çevre', en: 'Environment',
    motions: [
      { m: 'This house would ban single-use plastics completely.', level: 'B2', pro: 'Alternatives exist for most uses, and plastic waste stays in nature for a very long time.', con: 'Some plastics are essential in medicine and food safety; a total ban goes too far.' },
      { m: 'This house believes individuals cannot solve climate change, only governments can.', level: 'C1', pro: 'Energy systems and industry are shaped by policy, not by personal choices.', con: 'Governments respond to voters and consumers; individual choices create political pressure.' },
      { m: 'This house would tax meat to reduce its consumption.', level: 'C1', pro: 'Prices should reflect environmental cost, as they already do for fuel and tobacco.', con: 'Food taxes hit poorer families hardest and treat a cultural practice like a vice.' },
      { m: 'This house would stop short-haul flights where a train alternative exists.', level: 'B2', pro: 'Trains pollute less and often take a similar time door to door.', con: 'Train infrastructure must come first; banning flights before that only limits people.' },
      { m: 'This house believes tourism does more harm than good to natural places.', level: 'B2', pro: 'Crowds, waste and construction damage the very landscapes people come to see.', con: 'Tourism money often pays for protection that would otherwise not exist.' },
    ],
  },
  {
    key: 'kultur', tr: 'Kültür ve sanat', en: 'Culture & the arts',
    motions: [
      { m: 'This house believes theatre tickets should be subsidised for young people.', level: 'B2', pro: 'Habits form early; a theatre audience of the future must be built today.', con: 'Subsidies help those already interested; the real barrier is curiosity, not price.' },
      { m: 'This house would return museum objects to their countries of origin.', level: 'C1', pro: 'Objects taken in unequal times belong to the cultures that made them.', con: 'Great museums let millions see world culture side by side, which has its own value.' },
      { m: 'This house believes art made by AI is real art.', level: 'C1', pro: 'Art is defined by the experience of the audience, not the biography of the maker.', con: 'Art is a human act of choice and meaning; a tool that predicts patterns does not intend anything.' },
      { m: 'This house would separate the art from the artist.', level: 'C1', pro: 'A work can outlive and exceed the moral failures of the person who made it.', con: 'Supporting the work supports the artist, and audiences are not neutral.' },
      { m: 'This house believes streaming has made people watch films less carefully.', level: 'B2', pro: 'With endless choice and a pause button, attention becomes optional.', con: 'Streaming gave access to world cinema that most people could never see before.' },
    ],
  },
  {
    key: 'saglik', tr: 'Sağlık ve yaşam tarzı', en: 'Health & lifestyle',
    motions: [
      { m: 'This house would put a sugar tax on soft drinks.', level: 'B2', pro: 'Price changes behaviour, and the money can fund public health.', con: 'Adults should make their own choices without the state deciding what is good for them.' },
      { m: 'This house believes fitness apps do more harm than good.', level: 'B2', pro: 'Constant tracking can turn exercise into anxiety about numbers.', con: 'Apps motivate many people who would otherwise do nothing at all.' },
      { m: 'This house would make physical education a daily school subject.', level: 'B2', pro: 'Daily movement supports concentration as well as health.', con: 'More sport means fewer hours for other subjects in an already full day.' },
      { m: 'This house believes people should be paid for caring for elderly relatives.', level: 'C1', pro: 'Care is real work that is usually done for free and saves public money.', con: 'Turning family care into a paid service changes the relationship and costs a lot.' },
      { m: 'This house regrets the trend of productivity culture.', level: 'C1', pro: 'Measuring life in output makes rest feel like failure.', con: 'Wanting to use time well is not a disease; productivity tools help people reach goals.' },
    ],
  },
  {
    key: 'iliskiler', tr: 'İlişkiler ve toplum', en: 'Relationships & society',
    motions: [
      { m: 'This house believes it is impossible to have close friends online only.', level: 'B2', pro: 'Closeness needs shared physical experience: meals, silence, help in a crisis.', con: 'Many people find deep understanding online that they never found nearby.' },
      { m: 'This house would make voting compulsory.', level: 'C1', pro: 'When everyone votes, governments must answer to everyone, not only the most active.', con: 'The freedom to vote includes the freedom not to; forced votes may be random votes.' },
      { m: 'This house believes children should be allowed to choose their own bedtime.', level: 'B2', pro: 'Children learn responsibility by facing the results of their own choices.', con: 'Children need sleep to grow, and some decisions belong to adults.' },
      { m: 'This house believes politeness is more important than honesty.', level: 'C1', pro: 'Kindness keeps communities working; brutal honesty often hurts without helping.', con: 'Politeness that hides problems lets them grow; honesty is a form of respect.' },
      { m: 'This house would lower the voting age to sixteen.', level: 'B2', pro: 'Young people live longest with today\'s decisions and should have a say.', con: 'At sixteen most people still depend on their parents and have little life experience.' },
    ],
  },
  {
    key: 'dil', tr: 'Dil öğrenmek', en: 'Language learning',
    motions: [
      { m: 'This house believes translation apps make learning languages unnecessary.', level: 'B2', pro: 'For travel and business, instant translation already solves most problems.', con: 'A language is a way of thinking and connecting; an app gives you words, not relationships.' },
      { m: 'This house believes accent does not matter as long as you are understood.', level: 'B2', pro: 'Communication is the goal, and native-like accents are an unrealistic standard.', con: 'Accent still affects how people are judged, so learners deserve help with it.' },
      { m: 'This house would make a second foreign language compulsory in all schools.', level: 'C1', pro: 'Each new language makes the next one easier and widens a child\'s world.', con: 'Two foreign languages done badly are worth less than one done well.' },
      { m: 'This house believes speaking practice is more important than grammar study.', level: 'B2', pro: 'You learn to speak by speaking; grammar knowledge alone rarely becomes fluency.', con: 'Without structure, mistakes become habits that are hard to change later.' },
      { m: 'This house believes English as a global language threatens other cultures.', level: 'C1', pro: 'When one language dominates, local languages lose prestige and young speakers.', con: 'A shared language lets small cultures reach a global audience on their own terms.' },
    ],
  },
  {
    key: 'etik', tr: 'Etik ikilemler', en: 'Ethical dilemmas',
    motions: [
      { m: 'This house believes it is acceptable to lie to protect someone\'s feelings.', level: 'B2', pro: 'Small kind lies make daily life gentler without harming anyone.', con: 'Once lying is acceptable for good reasons, trust becomes fragile.' },
      { m: 'This house would allow zoos only for conservation purposes.', level: 'C1', pro: 'Keeping animals for entertainment cannot be justified when conservation can be.', con: 'Zoos inspire people to care about animals, which is itself a form of conservation.' },
      { m: 'This house believes billionaires should not exist.', level: 'C1', pro: 'Extreme wealth means extreme political power that no one elected.', con: 'Large fortunes usually reflect companies that created jobs and products people chose.' },
      { m: 'This house would give everyone a universal basic income.', level: 'C1', pro: 'A basic floor frees people to learn, care and take risks without fear.', con: 'It is very expensive and may reduce the motivation to work for some people.' },
      { m: 'This house believes you should always return a lost wallet, even with no one watching.', level: 'B2', pro: 'Character is what you do when no one sees you.', con: 'This is easy to agree with in theory; the real debate is about why people often do not.' },
    ],
  },
  {
    key: 'seyahat', tr: 'Seyahat ve yurt dışında yaşamak', en: 'Travel & moving abroad',
    motions: [
      { m: 'This house believes everyone should live abroad at least once.', level: 'B2', pro: 'Living elsewhere teaches you who you are when your habits are taken away.', con: 'Not everyone can afford to move, and meaningful growth can happen at home.' },
      { m: 'This house believes travel no longer broadens the mind.', level: 'C1', pro: 'Package tours and the same chains everywhere mean people see only what they expect.', con: 'Even a short trip can challenge assumptions if the traveller stays curious.' },
      { m: 'This house would charge tourists a daily fee in crowded cities.', level: 'B2', pro: 'Visitors use public services and should help pay for them.', con: 'Fees punish budget travellers and may barely reduce crowds.' },
      { m: 'This house believes digital nomads are good for the cities they live in.', level: 'C1', pro: 'They bring money, skills and international connections.', con: 'They can push up rents without joining local life.' },
      { m: 'This house believes it is more valuable to travel slowly than to see many places.', level: 'B2', pro: 'Staying longer lets you understand a place instead of only photographing it.', con: 'Seeing many places teaches comparison, and time off is limited for most people.' },
    ],
  },
  {
    key: 'medya', tr: 'Medya ve haber', en: 'Media & news',
    motions: [
      { m: 'This house believes printed newspapers will disappear within twenty years.', level: 'B2', pro: 'Many young readers already get their news from phones.', con: 'Print may shrink, but trusted journalism will survive in new forms.' },
      { m: 'This house would make news websites free to read.', level: 'B2', pro: 'Reliable information is a public good; paywalls push readers to worse sources.', con: 'Journalism costs money, and free often means funded by advertising and clicks.' },
      { m: 'This house believes social media platforms should be responsible for false information.', level: 'C1', pro: 'Platforms profit from engagement, so they should carry the cost of what spreads.', con: 'Making companies judges of truth gives them too much power over speech.' },
      { m: 'This house regrets the 24-hour news cycle.', level: 'C1', pro: 'Constant updates reward speed over accuracy and leave audiences anxious.', con: 'In emergencies, fast information can protect people.' },
      { m: 'This house believes celebrities should stay out of politics.', level: 'B2', pro: 'Fame gives a loud voice without expertise or accountability.', con: 'Celebrities are citizens too and can draw attention to ignored issues.' },
    ],
  },
]

export const D_TOTAL = D_CATEGORIES.reduce((n, c) => n + c.motions.length, 0)

export const PHRASES: { key: string; tr: string; items: string[] }[] = [
  { key: 'acilis', tr: 'Görüş açmak', items: ['The main reason I support this motion is…', 'Let me start with a simple example.', 'I\'d like to look at this from a different angle.', 'To put it simply, …'] },
  { key: 'katilma', tr: 'Katılmak ve üstüne eklemek', items: ['I agree, and I\'d go even further:', 'That\'s a fair point. Building on that, …', 'Exactly, and that\'s why…', 'You\'ve put your finger on something important.'] },
  { key: 'karsi', tr: 'Kibarca karşı çıkmak', items: ['I see what you mean, but…', 'I\'m not sure that follows.', 'That may be true in some cases, but not in most.', 'With respect, I think the evidence points the other way.'] },
  { key: 'kabul', tr: 'Kısmen kabul etmek (concession)', items: ['I\'ll grant you that…, however…', 'Even if that\'s true, it doesn\'t change the main issue.', 'You have a point there, but consider…', 'Admittedly, … Still, …'] },
  { key: 'curutme', tr: 'Çürütmek (rebuttal)', items: ['The problem with that argument is…', 'That assumes…, which isn\'t always the case.', 'Let\'s test that with a real example.', 'If that were true, we would expect to see…'] },
  { key: 'netlik', tr: 'Netleştirmek ve soru sormak', items: ['Could you give an example of that?', 'What exactly do you mean by…?', 'So, if I understand you correctly, …', 'How would that work in practice?'] },
  { key: 'kapanis', tr: 'Toparlamak', items: ['To sum up, the key difference between our sides is…', 'What this debate comes down to is…', 'So the real question is not…, but…', 'For these reasons, I urge you to vote for / against the motion.'] },
]

export const FORMATS: { key: string; name: string; time: string; body: string }[] = [
  { key: 'dort-kose', name: 'Dört köşe (Four corners)', time: '15–20 dk', body: 'Odanın dört köşesine "kesinlikle katılıyorum", "katılıyorum", "katılmıyorum", "kesinlikle katılmıyorum" yazın. Önergeyi okuyun, herkes bir köşeye yürüsün. Her köşe bir gerekçe söylesin, sonra ikna olan köşe değiştirebilir. Kalabalık ve karışık seviyeli gruplarda en kolay giriş.' },
  { key: 'mini-debate', name: 'Mini debate (2 + 2)', time: '25–30 dk', body: 'İki kişilik iki takım. Lehte ve aleyhte birer dakikalık açılış, ardından birer dakikalık çürütme, sonra grup soruları ve birer cümlelik kapanış. Takımlara 5 dakika hazırlık verin. Tarafı kura belirlesin: kendi fikrine karşı konuşmak en iyi çalışmadır.' },
  { key: 'fishbowl', name: 'Akvaryum (Fishbowl)', time: '20–30 dk', body: 'Ortada dört sandalye, çevrede dinleyiciler. Yalnızca ortadakiler konuşur; dışarıdan biri katılmak isterse ortadakilerden birinin omzuna dokunur ve yerini alır. Çekingen katılımcılar önce dinleyerek girer, konuşma kendiliğinden döner.' },
  { key: 'rol-debate', name: 'Rollü tartışma (Role debate)', time: '30 dk', body: 'Önergeyi bir kasaba meclisine çevirin: belediye başkanı, esnaf, öğrenci, emekli, turist. Herkes kendi rolünün çıkarından konuşur. Bir fikri savunmak yerine bir karakterin ihtiyacını savunmak kaygıyı düşürür ve dili daha gerçek bir bağlama koyar.' },
]
