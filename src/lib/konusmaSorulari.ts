/**
 * /kaynaklar/konusma-kulubu-sorulari — İngilizce konuşma kulübü soru bankası.
 * Seviye mantığı CEFR "Informal discussion" ve "Conversation" tanımlayıcılarından:
 *   B1: tanıdık konular, kişisel görüş ve deneyim, karşılaştırma.
 *   B2: görüş savunma, alternatifleri tartma, varsayım kurma ("what would happen if").
 *   C1: soyut ve etik ikilem, ima ve mizah, başkasının fikrini toparlayıp üstüne ekleme.
 * Her soru: ana soru + takip sorusu (follow-up). Her konu: ısınma + rol kartı.
 * Tüm sorular Techne Lab için özgün yazıldı.
 */
export type Level = 'b1' | 'b2' | 'c1'
export type Q = { q: string; f: string }
export type Topic = {
  key: string
  tr: string
  en: string
  warmup: string
  words: string[]
  levels: Record<Level, Q[]>
  role: string
}

export const LEVELS: { key: Level; label: string; desc: string }[] = [
  { key: 'b1', label: 'B1', desc: 'Tanıdık konular, kişisel deneyim, kısa gerekçe. Hedef: konuşmayı başlatmak ve sürdürmek.' },
  { key: 'b2', label: 'B2', desc: 'Görüş savunma, artı-eksi tartma, "ya şöyle olsaydı" varsayımları. Hedef: tartışmaya aktif katılmak.' },
  { key: 'c1', label: 'C1', desc: 'Soyut ve etik ikilemler, ima, mizah, başkasının fikrine bağlanmak. Hedef: karmaşık tartışmayı yönlendirmek.' },
]

export const TOPICS: Topic[] = [
  {
    key: 'istanbul', tr: 'İstanbul’da yaşamak', en: 'Living in Istanbul',
    warmup: 'Describe your neighbourhood in three words. Then explain one of them.',
    words: ['commute', 'crowded', 'neighbourhood', 'rent', 'ferry'],
    levels: {
      b1: [
        { q: 'Which part of Istanbul do you know best, and what do you like about it?', f: 'Is there a place there you would show a visitor first?' },
        { q: 'How do you usually get around the city?', f: 'What is the best and the worst journey you make every week?' },
        { q: 'Do you prefer the European side or the Asian side? Why?', f: 'Has your answer changed over the years?' },
        { q: 'What do you do in Istanbul on a free Sunday?', f: 'Is it different in summer and winter?' },
      ],
      b2: [
        { q: 'Some people say Istanbul is several cities in one. Do you agree?', f: 'Which two neighbourhoods feel most like different countries to you?' },
        { q: 'If you could change one thing about daily life in the city, what would it be and who would object?', f: 'Would the change have any side effects?' },
        { q: 'Is it better to live close to work in a small flat or far away in a bigger one?', f: 'What would you give up first?' },
        { q: 'What would happen to the city if the ferries stopped for a month?', f: 'Who would suffer most, and who might actually benefit?' },
      ],
      c1: [
        { q: 'Can a city be loved and hated by the same person at the same time? What does that tell us about belonging?', f: 'Is your relationship with the city closer to love, habit or loyalty?' },
        { q: 'Who really decides what a neighbourhood becomes: residents, investors, or the people who move in later?', f: 'Can you think of a place where this has happened in front of you?' },
        { q: 'Istanbul is often described through nostalgia. Is nostalgia a way of seeing the city or a way of avoiding it?', f: 'Which memory of the city would you not want to lose?' },
        { q: 'How should a huge city balance being a home for its residents and a destination for visitors?', f: 'Where would you draw the line?' },
      ],
    },
    role: 'Two flatmates must choose between a cheap flat in a far district and an expensive one near the centre. One works from home, one commutes daily. You have five minutes to agree.',
  },
  {
    key: 'work', tr: 'İş ve kariyer', en: 'Work and careers',
    warmup: 'What was the first job you ever wanted as a child?',
    words: ['deadline', 'promotion', 'burnout', 'remote work', 'colleague'],
    levels: {
      b1: [
        { q: 'What does a normal working day look like for you?', f: 'Which part of the day do you enjoy most?' },
        { q: 'Do you prefer working alone or in a team?', f: 'Can you give an example of when it worked well?' },
        { q: 'What is the best piece of advice you got about work?', f: 'Who gave it to you?' },
        { q: 'Would you like to work from home every day?', f: 'What would you miss about the office?' },
      ],
      b2: [
        { q: 'Is it better to have one career for life or to change jobs often? Give arguments for both.', f: 'Which choice is easier in Turkey today?' },
        { q: 'What makes a good manager, in your opinion?', f: 'Is it possible to be liked and respected at the same time?' },
        { q: 'If a four-day working week became law, what would change for companies and for families?', f: 'Would people really rest more?' },
        { q: 'Should salaries be public inside a company?', f: 'What problems would it solve and what problems would it create?' },
      ],
      c1: [
        { q: 'Why do so many people describe themselves by their job? Is that healthy?', f: 'How would you introduce yourself without mentioning work?' },
        { q: 'Ambition is praised in some cultures and distrusted in others. Where does healthy ambition end?', f: 'Have you ever been suspicious of someone else’s ambition?' },
        { q: 'Is “do what you love” good advice, or a luxury for people who can afford it?', f: 'What would be a more honest version of that advice?' },
        { q: 'If automation removes much routine work, what should humans be proud of at work?', f: 'Which part of your own job would you defend most?' },
      ],
    },
    role: 'An employee asks the manager for permission to work fully remotely for three months. The manager has one serious concern. Negotiate.',
  },
  {
    key: 'food', tr: 'Yemek', en: 'Food and eating',
    warmup: 'Name a dish that tastes like your childhood.',
    words: ['recipe', 'leftovers', 'spicy', 'home-cooked', 'street food'],
    levels: {
      b1: [
        { q: 'What is your favourite meal of the day and why?', f: 'What did you have for it yesterday?' },
        { q: 'Can you cook? What can you make well?', f: 'Who taught you?' },
        { q: 'Which food from another country do you like most?', f: 'Where did you first try it?' },
        { q: 'Do you prefer eating at home or eating out?', f: 'How often do you eat out in a normal week?' },
      ],
      b2: [
        { q: 'Is eating together as a family still important, or has it become old-fashioned?', f: 'What replaces it when it disappears?' },
        { q: 'Should schools teach cooking as a basic skill? Argue for and against.', f: 'What three dishes should everyone be able to make?' },
        { q: 'What would happen to restaurants if everyone started cooking more at home?', f: 'Is that likely?' },
        { q: 'Delivery apps: convenience or a bad habit?', f: 'How have they changed your neighbourhood?' },
      ],
      c1: [
        { q: 'Food is often called the most honest part of a culture. Do you agree, or is it the most commercialised?', f: 'Which “traditional” dish do you suspect is not that traditional?' },
        { q: 'Where is the line between cultural exchange and cultural appropriation in cooking?', f: 'Would you be offended if someone changed a recipe from your region?' },
        { q: 'Why do people argue so passionately about the “correct” way to make a dish?', f: 'What is the argument really about?' },
        { q: 'Should the true environmental cost of food be included in its price, even if that makes some food a luxury?', f: 'Who would carry that burden?' },
      ],
    },
    role: 'A chef and a food critic meet after a bad review. The chef believes the critic misunderstood the dish. Talk it through.',
  },
  {
    key: 'travel', tr: 'Seyahat', en: 'Travel',
    warmup: 'Where would you go tomorrow if travel were free?',
    words: ['itinerary', 'jet lag', 'off the beaten track', 'souvenir', 'backpacking'],
    levels: {
      b1: [
        { q: 'What is the best trip you have ever taken?', f: 'What made it special?' },
        { q: 'Do you like planning a trip in detail or deciding day by day?', f: 'Has that ever gone wrong?' },
        { q: 'What do you always pack?', f: 'What do you always forget?' },
        { q: 'Would you prefer a beach holiday or a city holiday?', f: 'Why?' },
      ],
      b2: [
        { q: 'Is travelling alone better than travelling with friends? Weigh both sides.', f: 'What kind of person should never travel alone?' },
        { q: 'How has social media changed the way people travel?', f: 'Has it changed the way you travel?' },
        { q: 'If cheap flights disappeared, what would we lose and what would we gain?', f: 'Would you travel less?' },
        { q: 'Should popular cities limit the number of tourists?', f: 'How could that be done fairly?' },
      ],
      c1: [
        { q: 'Does travel really broaden the mind, or do most people travel to confirm what they already believe?', f: 'When did a trip actually change your mind about something?' },
        { q: 'Is there a moral difference between a tourist and a traveller, or is that just snobbery?', f: 'Which one are you, honestly?' },
        { q: 'Can you know a place from a one-week visit? What do you know, and what do you miss?', f: 'What would a visitor misunderstand about your home?' },
        { q: 'How should we weigh the joy of travel against its environmental cost?', f: 'Is individual choice the right level for this question?' },
      ],
    },
    role: 'A traveller arrives at a hotel; the reservation has disappeared and the hotel is full. The receptionist wants to help but has limited options.',
  },
  {
    key: 'tech', tr: 'Teknoloji ve yapay zekâ', en: 'Technology and AI',
    warmup: 'Which app would you delete if you had to delete one today?',
    words: ['screen time', 'notification', 'algorithm', 'privacy', 'automation'],
    levels: {
      b1: [
        { q: 'How many hours a day do you spend on your phone?', f: 'Is that more or less than you want?' },
        { q: 'Which piece of technology could you not live without?', f: 'What did people do before it existed?' },
        { q: 'Have you used an AI tool? What for?', f: 'Did it help?' },
        { q: 'Do you read books on paper or on a screen?', f: 'Why?' },
      ],
      b2: [
        { q: 'Should children have smartphones before the age of 14? Give arguments for both sides.', f: 'What rules would you set?' },
        { q: 'Is it acceptable to use AI to write emails at work?', f: 'Should you tell the person you are writing to?' },
        { q: 'If social media disappeared for a year, what would happen to friendships?', f: 'Which friendships would survive?' },
        { q: 'Do algorithms show us what we want or teach us what to want?', f: 'Can you think of an example from your own feed?' },
      ],
      c1: [
        { q: 'If a machine can produce a convincing poem, what, if anything, is lost?', f: 'Does it matter who made a work of art?' },
        { q: 'Is privacy a right we are slowly trading away, or an old idea that no longer fits?', f: 'What would you never share online?' },
        { q: 'Technology promises to save time. Where does the saved time actually go?', f: 'Has any device really given you more time?' },
        { q: 'Who should be responsible when an automated system makes a harmful decision?', f: 'Is “the system did it” ever an acceptable answer?' },
      ],
    },
    role: 'A parent and a 13-year-old negotiate the rules for the teenager’s first smartphone.',
  },
  {
    key: 'arts', tr: 'Sinema, tiyatro, müzik', en: 'Film, theatre and music',
    warmup: 'Name a song that you know every word of.',
    words: ['performance', 'plot', 'soundtrack', 'audience', 'spoiler'],
    levels: {
      b1: [
        { q: 'What kind of films do you enjoy?', f: 'Tell us about the last one you watched.' },
        { q: 'Have you ever been to the theatre? What did you see?', f: 'Would you go again?' },
        { q: 'Do you listen to music while you work or study?', f: 'What kind of music helps you concentrate?' },
        { q: 'Do you prefer watching films at home or in the cinema?', f: 'Why?' },
      ],
      b2: [
        { q: 'Why do people still go to live theatre when they can stream almost anything?', f: 'What can a live show do that a screen cannot?' },
        { q: 'Should films based on books stay close to the book?', f: 'Can you think of an adaptation that was better than the original?' },
        { q: 'If you could only listen to one decade of music for the rest of your life, which would you choose?', f: 'What would you miss most?' },
        { q: 'Is it fair to judge an artist’s work by the artist’s private life?', f: 'Where would you draw the line?' },
      ],
      c1: [
        { q: 'Is there such a thing as a “guilty pleasure”, or is that phrase just snobbery about taste?', f: 'What is yours, if you will admit it?' },
        { q: 'What makes a story universal even when it is deeply local?', f: 'Which very local story has moved you?' },
        { q: 'Should public money fund art that most of the public will never see?', f: 'Who decides what is worth funding?' },
        { q: 'Does art need an audience to exist?', f: 'Have you ever made something only for yourself?' },
      ],
    },
    role: 'Two friends have one evening and two tickets: a famous blockbuster or a small experimental play. Each must convince the other.',
  },
  {
    key: 'education', tr: 'Eğitim', en: 'Education',
    warmup: 'Who was the most memorable teacher you ever had?',
    words: ['exam', 'curriculum', 'tuition', 'lifelong learning', 'graduate'],
    levels: {
      b1: [
        { q: 'What was your favourite subject at school?', f: 'Why did you like it?' },
        { q: 'How did you learn English so far?', f: 'Which method worked best for you?' },
        { q: 'Would you like to study something new now? What?', f: 'What stops you?' },
        { q: 'Did you like exams at school?', f: 'How did you prepare?' },
      ],
      b2: [
        { q: 'Do exams measure intelligence, memory or something else?', f: 'What would a fairer system look like?' },
        { q: 'Is a university degree still necessary for a good career?', f: 'In which jobs is it essential and in which is it not?' },
        { q: 'If school started at 10 a.m., what would change?', f: 'Who would be against it?' },
        { q: 'Should adults be able to take paid leave to study?', f: 'Who should pay for it?' },
      ],
      c1: [
        { q: 'Is the purpose of education to prepare people for work or to prepare them for life? Can it do both?', f: 'Which purpose did your own education serve?' },
        { q: 'Why do some people stop being curious after school?', f: 'What brought your curiosity back, if anything?' },
        { q: 'Can you teach creativity, or only remove what blocks it?', f: 'What blocked yours?' },
        { q: 'How should education respond when information is everywhere and attention is scarce?', f: 'What would you remove from the curriculum first?' },
      ],
    },
    role: 'A student wants to leave university to start a business. A parent has paid for two years already. Have the conversation.',
  },
  {
    key: 'relationships', tr: 'İlişkiler ve arkadaşlık', en: 'Friendship and relationships',
    warmup: 'How did you meet your oldest friend?',
    words: ['trust', 'drift apart', 'get along', 'reliable', 'small talk'],
    levels: {
      b1: [
        { q: 'What do you usually do with your friends?', f: 'When did you last see them?' },
        { q: 'Is it easy for you to make new friends?', f: 'Where do you usually meet people?' },
        { q: 'What makes someone a good friend?', f: 'Can you give an example?' },
        { q: 'Do you keep in touch with friends from school?', f: 'How?' },
      ],
      b2: [
        { q: 'Is it harder to make friends as an adult? Why?', f: 'What could make it easier?' },
        { q: 'Can online friendships be as strong as face-to-face ones?', f: 'What is missing online, if anything?' },
        { q: 'Should you tell a friend an uncomfortable truth?', f: 'When would you stay silent?' },
        { q: 'If you moved to another country, how would you build a new social life?', f: 'What would be the first step?' },
      ],
      c1: [
        { q: 'Aristotle distinguished friendships of usefulness, pleasure and virtue. Are most modern friendships the first two?', f: 'Which kind is the rarest in your life?' },
        { q: 'Is it possible to stay friends with someone whose values have changed completely?', f: 'What would be the breaking point?' },
        { q: 'Why do we sometimes find it easier to be honest with strangers than with people close to us?', f: 'Have you experienced that?' },
        { q: 'Does a friendship need shared experiences to survive, or is shared history enough?', f: 'What keeps an old friendship alive?' },
      ],
    },
    role: 'One friend forgot another’s important event. They meet the next day. One wants an apology; the other has an explanation.',
  },
  {
    key: 'money', tr: 'Para ve tüketim', en: 'Money and shopping',
    warmup: 'What is the best thing you ever bought for very little money?',
    words: ['budget', 'save up', 'impulse buy', 'second-hand', 'subscription'],
    levels: {
      b1: [
        { q: 'Do you like shopping? Where do you usually go?', f: 'Online or in a shop?' },
        { q: 'What do you spend most money on each month?', f: 'Would you like to change that?' },
        { q: 'Do you buy second-hand things?', f: 'What kind of things?' },
        { q: 'Did you get pocket money as a child?', f: 'What did you buy with it?' },
      ],
      b2: [
        { q: 'Is it better to spend money on things or on experiences? Argue both sides.', f: 'Which purchase made you happiest?' },
        { q: 'Should schools teach children how to manage money?', f: 'What would be the first lesson?' },
        { q: 'What would happen if everyone stopped buying new clothes for a year?', f: 'Who would lose, who would win?' },
        { q: 'Are subscriptions convenient or a trap?', f: 'How many do you have, and which would you cancel?' },
      ],
      c1: [
        { q: 'Can money buy happiness, or only remove some reasons for unhappiness?', f: 'At what point does more money stop helping?' },
        { q: 'Why is it so hard to talk openly about money with friends?', f: 'Is that silence useful to anyone?' },
        { q: 'Is minimalism a genuine alternative or another lifestyle product?', f: 'Who can afford to own very little?' },
        { q: 'What do our spending habits reveal about our values that we would not admit?', f: 'What would your bank statement say about you?' },
      ],
    },
    role: 'A customer wants to return an item without a receipt. The shop assistant must follow the rules but wants to keep the customer.',
  },
  {
    key: 'health', tr: 'Sağlıklı yaşam ve spor', en: 'Health, sport and wellbeing',
    warmup: 'What is one small habit that makes your day better?',
    words: ['routine', 'work out', 'balance', 'stress', 'sleep schedule'],
    levels: {
      b1: [
        { q: 'Do you do any sport? How often?', f: 'How did you start?' },
        { q: 'What do you do when you want to relax?', f: 'Does it always work?' },
        { q: 'How many hours do you usually sleep?', f: 'Is it enough?' },
        { q: 'Do you prefer walking or taking public transport?', f: 'How far would you walk?' },
      ],
      b2: [
        { q: 'Should companies be responsible for their employees’ wellbeing?', f: 'Where does the company’s responsibility end?' },
        { q: 'Is it better to exercise alone or in a group?', f: 'Which is easier to keep doing?' },
        { q: 'If everyone had to walk 30 minutes a day by law, what would happen?', f: 'Could it ever work?' },
        { q: 'Do fitness apps help people or make them anxious?', f: 'What do you think of tracking everything?' },
      ],
      c1: [
        { q: '“Wellness” is now a huge industry. Has it made people healthier, or just more worried?', f: 'Which wellness trend do you find hardest to take seriously?' },
        { q: 'Is rest a personal responsibility or a social one?', f: 'What makes rest difficult in a big city?' },
        { q: 'Why do people find it so hard to change habits they know are bad for them?', f: 'What finally worked for you, if anything?' },
        { q: 'Should sport be about competition or participation?', f: 'Was school sport good for you?' },
      ],
    },
    role: 'A gym trainer and a new member who hates exercise must agree on a realistic plan for the next month.',
  },
  {
    key: 'environment', tr: 'Çevre ve iklim', en: 'Environment and climate',
    warmup: 'What is one thing you do for the environment, and one thing you know you should do?',
    words: ['recycle', 'carbon footprint', 'renewable', 'waste', 'sustainable'],
    levels: {
      b1: [
        { q: 'Do you recycle at home?', f: 'Is it easy where you live?' },
        { q: 'Has the weather in your city changed since you were a child?', f: 'How?' },
        { q: 'Do you prefer the countryside or the city?', f: 'Why?' },
        { q: 'What do you do to waste less?', f: 'Could you do more?' },
      ],
      b2: [
        { q: 'Who should do more about climate change: individuals, companies or governments?', f: 'What can individuals really change?' },
        { q: 'Should flying be more expensive to protect the environment?', f: 'Who would be affected most?' },
        { q: 'If cars were banned from the city centre, what would happen?', f: 'Would you support it?' },
        { q: 'Is “green” advertising helpful or misleading?', f: 'Can you give an example?' },
      ],
      c1: [
        { q: 'Is it fair to ask people in developing economies to give up what richer countries already had?', f: 'What would a fair arrangement look like?' },
        { q: 'Does climate anxiety motivate people or paralyse them?', f: 'How do you deal with bad news about the planet?' },
        { q: 'Can a consumer economy ever be truly sustainable, or is that a contradiction?', f: 'What would have to change first?' },
        { q: 'What do we owe to people who are not born yet?', f: 'How would you explain our choices to them?' },
      ],
    },
    role: 'A city council meeting: a resident, a shop owner and a council member discuss closing a busy street to cars.',
  },
  {
    key: 'childhood', tr: 'Çocukluk ve anılar', en: 'Childhood and memories',
    warmup: 'Describe a smell that takes you back to childhood.',
    words: ['grow up', 'remember', 'nostalgic', 'toy', 'summer holiday'],
    levels: {
      b1: [
        { q: 'What games did you play as a child?', f: 'Who did you play with?' },
        { q: 'Where did you spend summers when you were young?', f: 'What do you remember most?' },
        { q: 'What did you want to be when you grew up?', f: 'Is any part of that still true?' },
        { q: 'Did you have a favourite toy?', f: 'What happened to it?' },
      ],
      b2: [
        { q: 'Are children today freer or less free than you were?', f: 'Is that good or bad?' },
        { q: 'Should children be allowed to make more of their own decisions?', f: 'At what age, and which decisions?' },
        { q: 'If you could relive one day from your childhood, which would it be?', f: 'Would you change anything?' },
        { q: 'Is it better to grow up in a big city or a small town?', f: 'What did your place give you?' },
      ],
      c1: [
        { q: 'How reliable are our childhood memories? Do we remember events or the stories we have told about them?', f: 'Is there a memory you are no longer sure about?' },
        { q: 'Why does nostalgia feel good even when the past was not?', f: 'What are we really missing?' },
        { q: 'Which values did you inherit without choosing them, and which have you rejected?', f: 'When did you notice?' },
        { q: 'Is adulthood a loss of imagination or a different use of it?', f: 'Where does your imagination live now?' },
      ],
    },
    role: 'Two siblings remember the same family holiday completely differently. Each tries to convince the other which version is true.',
  },
  {
    key: 'media', tr: 'Medya ve haber', en: 'News and media',
    warmup: 'Where did you hear the last piece of news you remember?',
    words: ['headline', 'source', 'fake news', 'opinion', 'coverage'],
    levels: {
      b1: [
        { q: 'How do you usually follow the news?', f: 'Every day, or only sometimes?' },
        { q: 'Do you read news in English?', f: 'Which websites or channels?' },
        { q: 'What kind of news do you like to read?', f: 'What kind do you avoid?' },
        { q: 'Do you believe most of what you read online?', f: 'How do you check?' },
      ],
      b2: [
        { q: 'Should news be free, or should we pay for good journalism?', f: 'Would you pay?' },
        { q: 'How can ordinary people tell the difference between news and opinion?', f: 'Can you give a recent example?' },
        { q: 'If you stopped following the news for a month, what would you miss and what would improve?', f: 'Have you ever tried?' },
        { q: 'Is it good that anyone can now be a journalist with a phone?', f: 'What are the risks?' },
      ],
      c1: [
        { q: 'Is objectivity in journalism possible, or should journalists simply be transparent about their point of view?', f: 'Whose reporting do you trust, and why?' },
        { q: 'Does constant access to news make us better informed or simply more anxious?', f: 'How do you protect your attention?' },
        { q: 'Who benefits when people stop trusting all sources equally?', f: 'How is trust rebuilt?' },
        { q: 'What kind of story do you think gets too little attention, and why?', f: 'Who decides what is newsworthy?' },
      ],
    },
    role: 'An editor has space for one story on the front page. Two journalists each argue for their own story.',
  },
  {
    key: 'language', tr: 'Dil öğrenmek', en: 'Learning languages',
    warmup: 'What is your favourite word in English, and why?',
    words: ['fluent', 'accent', 'mistake', 'confidence', 'native speaker'],
    levels: {
      b1: [
        { q: 'Why are you learning English?', f: 'When do you use it in daily life?' },
        { q: 'What is the most difficult thing about English for you?', f: 'What helps?' },
        { q: 'Do you watch films or series in English?', f: 'With or without subtitles?' },
        { q: 'Which other languages would you like to learn?', f: 'Why that one?' },
      ],
      b2: [
        { q: 'Is it more important to be correct or to be understood?', f: 'Has a mistake ever caused a real misunderstanding?' },
        { q: 'Should we try to lose our accent, or is an accent part of who we are?', f: 'How do you feel about your accent?' },
        { q: 'If translation apps become perfect, will people still learn languages?', f: 'What would we lose?' },
        { q: 'Why do many people understand English well but find speaking difficult?', f: 'What is your own experience?' },
      ],
      c1: [
        { q: 'Do you have a different personality in another language?', f: 'What changes: humour, politeness, confidence?' },
        { q: 'Is a language a tool, an identity, or both?', f: 'What does Turkish give you that English does not, and the other way round?' },
        { q: 'Some ideas seem impossible to translate. Is that a problem or a richness?', f: 'Give an untranslatable word from your language and try anyway.' },
        { q: 'Does the dominance of English threaten smaller languages, or does it connect people who would otherwise never talk?', f: 'Can both be true?' },
      ],
    },
    role: 'A tourist and a local have no common language except a little English. The tourist has lost something important. Solve the problem together.',
  },
  {
    key: 'future', tr: 'Gelecek', en: 'The future',
    warmup: 'What will be normal in 20 years that seems strange today?',
    words: ['predict', 'likely', 'optimistic', 'trend', 'in the long run'],
    levels: {
      b1: [
        { q: 'Where do you see yourself in five years?', f: 'What do you need to get there?' },
        { q: 'Are you an optimistic person?', f: 'About what in particular?' },
        { q: 'What would you like to learn in the next year?', f: 'How will you start?' },
        { q: 'Will people still use cash in the future?', f: 'Do you use cash now?' },
      ],
      b2: [
        { q: 'Will cities be better or worse places to live in 30 years? Give reasons.', f: 'What could change the answer?' },
        { q: 'Would you live to 120 if you could? What are the consequences?', f: 'For you, for your family, for society?' },
        { q: 'If you could know one fact about your future, would you want to?', f: 'Which fact?' },
        { q: 'Which jobs will disappear and which new ones will appear?', f: 'Is your job safe?' },
      ],
      c1: [
        { q: 'Is it irresponsible to be optimistic about the future, or irresponsible not to be?', f: 'What does hope require of us?' },
        { q: 'We usually imagine the future as technology. What will remain the same in human life no matter what?', f: 'Why are we bad at seeing that?' },
        { q: 'Why do predictions about the future say more about the present than the future?', f: 'Which old prediction makes you smile?' },
        { q: 'How far ahead should a society plan, and who represents the long term in a democracy?', f: 'Can anyone really do that job?' },
      ],
    },
    role: 'You are a time traveller from 2060 explaining one surprising change to a sceptical person from today.',
  },
  {
    key: 'ethics', tr: 'Etik ikilemler', en: 'Ethical dilemmas',
    warmup: 'Is it ever acceptable to tell a white lie? Give a quick yes or no.',
    words: ['fair', 'honest', 'responsibility', 'consequence', 'principle'],
    levels: {
      b1: [
        { q: 'You find a wallet in the street with money inside. What do you do?', f: 'Would it change anything if no one could see you?' },
        { q: 'Your friend asks if you like their new haircut. You don’t. What do you say?', f: 'Is that a lie?' },
        { q: 'Is it OK to take a sick day when you are not really sick?', f: 'What about when you are very tired?' },
        { q: 'Would you tell a shop if they gave you too much change?', f: 'What if it was a big supermarket?' },
      ],
      b2: [
        { q: 'You discover a colleague is taking credit for your work. What are your options?', f: 'Which would you choose and why?' },
        { q: 'Is it fair to judge people by things they wrote online ten years ago?', f: 'Where is the limit?' },
        { q: 'Should rules always be followed, even when they seem wrong?', f: 'Can you think of a rule you broke for a good reason?' },
        { q: 'Is it ever right to break a promise?', f: 'What would make it acceptable?' },
      ],
      c1: [
        { q: 'Are good intentions enough, or do only consequences count?', f: 'Think of a case where they point in opposite directions.' },
        { q: 'Is it hypocritical to care about an issue but not change your lifestyle?', f: 'Is some hypocrisy unavoidable?' },
        { q: 'When does loyalty to a person become a betrayal of a principle?', f: 'Have you faced that choice?' },
        { q: 'Do we have a duty to forgive?', f: 'Is forgiveness for the other person or for ourselves?' },
      ],
    },
    role: 'Two co-founders disagree: one wants to tell customers about a mistake immediately, the other wants to fix it quietly first.',
  },
  {
    key: 'books', tr: 'Kitaplar ve okumak', en: 'Books and reading',
    warmup: 'Which book have you pretended to have read?',
    words: ['character', 'novel', 'page-turner', 'chapter', 'recommend'],
    levels: {
      b1: [
        { q: 'What are you reading at the moment?', f: 'Would you recommend it?' },
        { q: 'Where and when do you usually read?', f: 'How long can you read without stopping?' },
        { q: 'Did you read a lot as a child?', f: 'Which book do you remember?' },
        { q: 'Do you prefer novels or non-fiction?', f: 'Why?' },
      ],
      b2: [
        { q: 'Is it acceptable to stop reading a book you don’t enjoy?', f: 'Have you ever finished a bad book out of duty?' },
        { q: 'Do audiobooks count as reading?', f: 'What is different about the experience?' },
        { q: 'If schools let students choose all their own books, what would happen?', f: 'Would they read more or less?' },
        { q: 'Should famous books be rewritten to remove offensive language?', f: 'Who should decide?' },
      ],
      c1: [
        { q: 'Can fiction teach us something that facts cannot?', f: 'Which character changed how you see someone in real life?' },
        { q: 'Is reading in translation reading the same book?', f: 'What is lost and what is gained?' },
        { q: 'Why do we feel we must defend reading in a culture of screens? Is it worth defending?', f: 'What would you say to someone who never reads?' },
        { q: 'Does a book belong to the author or to the reader once it is published?', f: 'Can a reader be wrong about a book?' },
      ],
    },
    role: 'A book club meets. Half of you loved the book, half of you hated it. Find one thing you all agree on.',
  },
  {
    key: 'culture', tr: 'Kültür ve gelenek', en: 'Culture and traditions',
    warmup: 'Which tradition from your family would you keep forever?',
    words: ['custom', 'celebrate', 'generation', 'heritage', 'hospitality'],
    levels: {
      b1: [
        { q: 'What is your favourite holiday or celebration?', f: 'What do you do on that day?' },
        { q: 'Is there a tradition in your family that other families don’t have?', f: 'Where did it come from?' },
        { q: 'What would you tell a foreigner about Turkish hospitality?', f: 'Is there anything they might find surprising?' },
        { q: 'Do young people in Turkey keep traditions?', f: 'Which ones?' },
      ],
      b2: [
        { q: 'Should traditions change with time, or is changing them losing them?', f: 'Give an example of a tradition that changed for the better.' },
        { q: 'What do visitors often misunderstand about life in Turkey?', f: 'What do Turks misunderstand about other countries?' },
        { q: 'If a tradition hurts nobody but no longer means anything, should we keep it?', f: 'Who decides what it means?' },
        { q: 'Is it easier to keep your culture abroad or at home?', f: 'Why do some people become more traditional when they move away?' },
      ],
      c1: [
        { q: 'Is “national culture” a reality or a story a country tells about itself?', f: 'Which parts of that story do you recognise in your own life?' },
        { q: 'When a tradition is turned into a tourist attraction, is it preserved or emptied?', f: 'Can you think of an example?' },
        { q: 'How do people living between two cultures decide which rules to follow?', f: 'Have you ever had to choose?' },
        { q: 'Can politeness be universal, or is it always local?', f: 'What counts as rude in one place and normal in another?' },
      ],
    },
    role: 'A foreign guest is invited to a family dinner for the first time and keeps making small cultural mistakes. The host wants to help without embarrassing them.',
  },
]

export const TOPLAM_SORU = TOPICS.reduce((n, t) => n + t.levels.b1.length + t.levels.b2.length + t.levels.c1.length, 0)
