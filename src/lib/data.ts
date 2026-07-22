export type Workshop = {
  id: number; slug: string; code: string
  title: string; sub: string; tagline: string
  instructor: string; instructorBio: string
  venue: string; duration: string; price: number
  priceEarlyBird?: number    // erken kayıt fiyatı
  priceCash?: number         // peşin / havale fiyatı
  monthlyPrice?: number      // aylık taksit
  installments?: number      // max faizsiz taksit sayısı
  earlyBirdSlots?: number    // erken kayıt kontenjanı (ilk N kişi)
  maxStudents: number | string; active: boolean; archived?: boolean; nextDate?: string
  tags: string[]; desc: string; descEn?: string
  blocks: { title: string; span?: string; body: string }[]
  images?: string[]
  edlFamily?: string[]
  category: 'yazarlık' | 'oyunculuk' | 'ingilizce-drama' | 'dans-muzikal'
  seoTitle: string; seoDesc: string
}

export const WORKSHOPS: Workshop[] = [
  // ── 01 — AUTEUR LAB ────────────────────────────────────────────────
  {
    id: 1, slug: 'auteur-lab', code: '01',
    title: 'THE AUTEUR LAB', sub: 'Dramaturji · Yazarlık',
    tagline: 'Dürtüden Tasarıma — Tasarımdan Eyleme',
    instructor: 'Halil Yağız Şanal',
    instructorBio: "1995 İstanbul doğumlu oyun yazarı, tiyatro yönetmeni ve dramaturg. İstanbul Üniversitesi Felsefe bölümünden tiyatroya geçiş yaptı. GalataPerform çağdaş oyun yazarlığı atölyelerinde eğitim aldı; Medeniyet Üniversitesi Sahne Sanatları Dramatik Yazarlık ve Dramaturji ana sanat dalında öğrenimini sürdürdü. Yılın Oyunu ödüllü oyun yazarı.",
    venue: 'Taksim / Kadıköy', duration: '8 hafta', price: 24000,
    installments: 3, monthlyPrice: 8000,
    maxStudents: 8, active: true,
    category: 'yazarlık',
    tags: ['Dramaturji', 'Yazarlık'],
    desc: 'Yazmak için yaratıcı bir alan. Kendi metnini kurmanın temel dinamiklerine odaklanıyoruz — karakter, çatışma, sahne. İlhamı beklemeden, üreterek.',
    blocks: [
      {
        title: '1. Modül: Temel Dinamikler',
        span: '1—4. Hafta',
        body: 'Sophokles, Shakespeare, Çehov, Ibsen. Dramatik yapı, alt metin, karakter arkı. Beden, ses, nefes ve duyu çalışması. Dramaturgik düşüncenin temelleri.',
      },
      {
        title: '2. Modül: Çağdaş Yazın',
        span: '5—6. Hafta',
        body: 'Beckett, Kane, Zeller, Williams. Parçalanmış yapılar ve suskunluk. Meisner temelli dinleme, temas, anlık tepki. Çağdaş dramaturjiye analitik bakış.',
      },
      {
        title: 'Audition & Sektör',
        span: '7—8. Hafta',
        body: 'Sinema ve dizi sahneleri. Soğuk okuma, kamera önü. Showreel ve kariyer yönetimi.',
      },
    ],
    images: ['auteur-hero', 'auteur-01', 'auteur-02', 'auteur-03', 'auteur-04'],
    seoTitle: 'The Auteur Lab — Dramaturji & Oyunculuk Atölyesi',
    seoDesc: 'Metin çözümleme, dramaturji ve sahne pratiği. Halil Yağız Şanal ile 8 haftalık laboratuvar. İstanbul.',
  },

  // ── 02 — CAMERA PRAXIS ─────────────────────────────────────────────
  {
    id: 2, slug: 'camera-praxis', code: '02',
    title: 'CAMERA PRAXIS',
    sub: 'Kamera Önü Oyunculuk — On Camera Acting',
    tagline: 'Karakter · Kamera · Audition',
    instructor: 'Selen Uçer',
    instructorBio: 'Oyuncu ve kamera önü oyunculuk eğitmeni. Sinema, dizi ve sahne deneyimini atölye pratiğiyle buluşturuyor. / Actor and on-camera acting trainer, merging screen and stage experience in workshop practice.',
    venue: 'Taksim & Kadıköy', duration: '4 hafta', price: 16000,
    maxStudents: 10, active: false, archived: true,
    category: 'oyunculuk',
    tags: ['Kamera', 'Audition', 'Karakter', 'TR / EN'],
    desc: 'Sahne pratiğini kameranın diline çeviren yoğun bir atölye. Karakter inşası, çerçeve bilinci ve audition teknikleri üzerine dört haftalık program. Dersler Türkçe ve İngilizce yürütülür — her iki dilde de takip edebilecek katılımcılara açıktır (B1+).',
    descEn: 'An intensive workshop that translates stage craft into the language of camera. Four weeks covering character building, frame awareness and audition technique. Sessions run in both Turkish and English — open to participants who can follow in either language (B1+).',
    blocks: [
      {
        title: 'Karakter — Character',
        span: '1. Hafta',
        body: 'Karakter analizi, hedef ve engel çalışması. Sahne metninden kamera metnine geçiş.\n\nCharacter analysis, objective and obstacle work. Transition from stage text to screen text.',
      },
      {
        title: 'Kamera — Camera',
        span: '2—3. Hafta',
        body: 'Çerçeve bilinci, close-up teknikleri, enerji yönetimi ve çekim sürecinin anatomisi.\n\nFrame awareness, close-up technique, energy management and the anatomy of a shoot.',
      },
      {
        title: 'Audition',
        span: '4. Hafta',
        body: 'Soğuk okuma, casting simülasyonu, self-tape ve showreel çekimi.\n\nCold reading, casting simulation, self-tape and showreel recording.',
      },
    ],
    images: ['dslr-zl5a1093', 'dslr-zl5a1076', 'dslr-zl5a1091', 'dslr-zl5a1094'],
    seoTitle: 'Camera Praxis — Kamera Önü Oyunculuk & Audition İstanbul',
    seoDesc: 'Selen Uçer ile 4 haftalık kamera önü oyunculuk ve audition atölyesi. İstanbul, Taksim & Kadıköy. Türkçe ve İngilizce.',
  },

  // ── 03 — MEVCUDİYET ────────────────────────────────────────────────
  {
    id: 4, slug: 'oyuncunun-mevcudiyeti', code: '03',
    title: 'OYUNCUNUN MEVCUDİYETİ', sub: 'Presence',
    tagline: 'Sahne Üzerinde Var Olmak',
    instructor: 'Burcu Halaçoğlu', instructorBio: 'Oyuncu ve beden çalışması eğitmeni. Sahne mevcudiyeti, ses-nefes ve fiziksel farkındalık üzerine uzmanlaşmış pratisyen.',
    venue: 'Taksim / Kadıköy', duration: 'Yoğun program', price: 16000,
    maxStudents: 12, active: false,
    category: 'oyunculuk',
    tags: ['Beden', 'Ses', 'Mevcudiyet'],
    desc: 'Oyuncunun sahne üzerindeki fiziksel ve zihinsel varlığını inceleyen çalışma. Beden farkındalığı, ses-nefes ve anda kalma.',
    blocks: [
      { title: 'Beden & Farkındalık', span: '', body: 'Fiziksel farkındalık, hareket, zemin çalışması.' },
      { title: 'Ses & Nefes', span: '', body: 'Nefes kontrolü, ses tınısı, rezonans.' },
      { title: 'Anda Kalmak', span: '', body: 'Gerçek tepki, partneri görme, burada ve şimdi.' },
    ],
    images: ['mevcudiyet-01', 'mevcudiyet-02', 'mevcudiyet-03', 'mevcudiyet-04', 'mevcudiyet-05', 'mevcudiyet-06', 'mevcudiyet-07', 'mevcudiyet-08'],
    seoTitle: 'Oyuncunun Mevcudiyeti — Presence Atölyesi',
    seoDesc: 'Sahne mevcudiyeti, beden farkındalığı ve ses çalışması. Burcu Halaçoğlu ile Techne Lab İstanbul.',
  },

  // ── 04 — ENGLISH DRAMA LAB (Yetişkin · 12 hafta) ──────────────────
  {
    id: 3, slug: 'english-drama-lab', code: '04',
    title: 'ENGLISH DRAMA LAB', sub: 'English Creative Drama',
    tagline: 'Yaratıcı Drama · Doğaçlama · İngilizce',
    instructor: 'Techne Lab', instructorBio: '',
    venue: 'Taksim & Kadıköy', duration: '12 hafta', price: 36000,
    priceEarlyBird: 30000, priceCash: 27000, installments: 9, monthlyPrice: 4000,
    earlyBirdSlots: 5,
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Yaratıcı Drama', 'Doğaçlama'],
    desc: 'İngilizce dili yaratıcı drama egzersizleri ve doğaçlamalar yoluyla bedene ve sese yerleşir. Metin ezberlemeden uzak, anlık tepki ve hayal gücüne dayalı bu program katılımcıları İngilizce ifadeyle doğrudan temas kurmaya davet eder.',
    blocks: [
      { title: 'Isınma & Keşif', span: '1—4. Hafta', body: 'Oyun ve güven egzersizleri, dil oyunları, beden-ses-hayal gücü üçgeni. İngilizce sezginin açılması.' },
      { title: 'Doğaçlama & Karakter', span: '5—8. Hafta', body: 'Anlık sahne çalışması, status oyunları, karakter doğaçlamaları. Dili düşünmeden konuşmak.' },
      { title: 'Bütünleşme & Uygulama', span: '9—12. Hafta', body: 'Edinilen araçların sahnede bütünleştirilmesi. Grup doğaçlamaları ve anlık sahne çalışmasının derinleşmesi.' },
    ],
    images: ['english-drama-16', 'english-drama-1', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-final-project', 'english-drama-youth'],
    seoTitle: 'English Drama Lab — English Creative Drama',
    seoDesc: 'İngilizce yaratıcı drama ve doğaçlama atölyesi. 12 hafta, Taksim & Kadıköy. Techne Lab İstanbul.',
  },

  // ── 05 — ENGLISH ACTING PRAXIS ─────────────────────────────────────
  {
    id: 8, slug: 'english-drama-final-project', code: '05',
    title: 'ENGLISH ACTING PRAXIS', sub: 'Ece Ertez · Harika Uygur Masterclass',
    tagline: 'Yoğun Pratik · Sahne Dili · Karakter Çalışması',
    instructor: 'Ece Ertez',
    instructorBio: 'Eğitmen: Ece Ertez — Oyuncu ve İngilizce tiyatro eğitmeni. İngilizce sahne oyunculuğu ve metin çalışması üzerine uzmanlaşmış pratisyen. Cast Direktörü / Süpervizör: Harika Uygur.',
    venue: 'Taksim / Kadıköy', duration: '12 hafta', price: 18000,
    priceCash: 15000, installments: 2, monthlyPrice: 9000,
    maxStudents: '10–14', active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Performans', 'Sahne'],
    desc: 'Ece Ertez ile on iki hafta boyunca birden fazla İngilizce metin üzerinde yoğun pratik. Karakter kurar, sahne dilini içselleştirir, prova disiplinini öğrenirsiniz. Programın sonunda Cast Direktörü Harika Uygur bir günlük masterclass vererek katılımcıların canlı performanslarını izler; bu performanslar kayıt altına alınarak katılımcılara teslim edilir. Başvurular: techne.lab.istanbul@gmail.com',
    blocks: [
      { title: 'Metin & Karakter', span: '1—4. Hafta', body: 'Metin seçimi, analiz, karakter motivasyonu. Alt metin ve sahne niyeti.' },
      { title: 'Prova Süreci', span: '5—8. Hafta', body: 'Partner çalışması, blocking, sahne dinamiği. Gerçek prova disiplini.' },
      { title: 'Bütünleşme & Harika Uygur Masterclass', span: '9—12. Hafta', body: 'Bütünleşme çalışması ve kişisel geri bildirim seansları. Program finalinde Cast Direktörü Harika Uygur\'un bir günlük masterclass\'ı: canlı performanslar izlenir, kayıt altına alınır ve katılımcılara teslim edilir.' },
    ],
    images: ['english-drama-17', 'english-drama-11', 'english-drama-12', 'english-drama-13', 'english-drama-15'],
    edlFamily: ['english-drama-lab', 'english-drama-youth'],
    seoTitle: 'English Acting Praxis — Ece Ertez ile Sahne',
    seoDesc: 'Ece Ertez ile 12 haftalık İngilizce sahne çalışması. Metin analizi, karakter ve prova disiplini. Profesyonel oyuncular ve meraklılar için. Techne Lab İstanbul.',
  },

  // ── 06 — ENGLISH DRAMA LAB: 14–17 YAŞ ────────────────────────────
  {
    id: 9, slug: 'english-drama-youth', code: '06',
    title: 'ENGLISH DRAMA YOUTH (14-17)', sub: 'Yıl Sonu Temsili · Final Performanslı',
    tagline: 'Yaratıcı Drama & Sahne — Gençler İçin',
    instructor: 'Techne Lab', instructorBio: '',
    venue: 'Taksim & Kadıköy', duration: '8 ay · Haftada 1 gün (Ekim–Mayıs)', price: 60000,
    priceEarlyBird: 50000, priceCash: 45000, installments: 8, monthlyPrice: 7500,
    earlyBirdSlots: 5,
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Gençler', 'Drama', 'Final Gösterisi', '14–17 Yaş'],
    desc: 'Yaratıcı drama ve sahne çalışmasını İngilizce öğrenimiyle birleştiren gençlere yönelik program. 14–17 yaş arasındaki katılımcılar için tasarlanan bu program, yılın sonunda seyircili bir final gösterisiyle kapanır. Ekim–Mayıs, haftada bir gün.',
    blocks: [
      { title: 'Keşif & Oyun', span: 'Ekim–Aralık', body: 'Doğaçlama, beden-ses-hayal gücü egzersizleri. İngilizce dil güveni. Grup dinamiği ve sahne güvencesi.' },
      { title: 'Karakter & Metin', span: 'Ocak–Mart', body: 'Sahne metni çalışması, karakter inşası, partner çalışması. Sözlü ve bedensel anlatım. İngilizce dramatik metin.' },
      { title: 'Final Gösterisi', span: 'Nisan–Mayıs', body: 'Prova süreci ve seyircili final performansı. Gerçek bir sahne deneyimi, gerçek bir seyirciyle.' },
    ],
    images: ['english-drama-1', 'english-drama-2', 'english-drama-3', 'english-drama-4', 'english-drama-5'],
    edlFamily: ['english-drama-lab', 'english-drama-final-project'],
    seoTitle: 'English Drama Lab 14–17 Yaş — Gençlere Yönelik Tiyatro Programı',
    seoDesc: '14–17 yaş İngilizce yaratıcı drama programı. 8 ay, haftada 1 gün. Final gösterisi. Techne Lab İstanbul.',
  },

  // ── 08 — TECHNE MUSICAL LAB ────────────────────────────────────────
  {
    id: 5, slug: 'techne-musical-lab', code: '07',
    title: 'TECHNE MUSICAL LAB', sub: 'Drama · Tiyatro · Müzikal',
    tagline: 'Sahne. Ses. Hareket. — Seyircinin Karşısında.',
    instructor: 'Köksal Ünal & Sitare Bilge',
    instructorBio: 'Köksal Ünal: Oyuncu, yönetmen ve Broadway dans eğitmeni. Sitare Bilge: Ses ve şan eğitmeni, tiyatro müziği uzmanı. İkisi birlikte sahne sanatlarının üç disiplinini tek programda buluşturuyor.',
    venue: 'Kadıköy', duration: '8 ay · Haftada 2 gün (Ekim–Mayıs)', price: 96000,
    priceEarlyBird: 80000, priceCash: 72000, installments: 9, monthlyPrice: 10667,
    earlyBirdSlots: 5,
    maxStudents: 12, active: true,
    category: 'dans-muzikal',
    tags: ['Müzikal', 'Drama', 'Tiyatro', 'Uzun Dönem'],
    desc: 'Drama ve tiyatro temelinin üzerine müzikal sahneleme eklenen 8 aylık kapsamlı program. Oyunculuk egzersizleri ve dramaturgik çalışma ile başlayan program, şan ve dans disiplinleriyle sahne bütünlüğünü tamamlar. Dönem sonunda seyircili bitirme performansıyla kapanır. Başvuru için bir müzikal ya da pop şarkının seslendirildiği kısa bir video beklenmektedir; kabul video incelemesiyle yapılır.',
    blocks: [
      { title: 'Drama & Oyunculuk', span: 'Ekim–Aralık', body: 'Sahne varlığı, karakter inşası ve dramaturgik çalışma. Tiyatronun temel araçları: beden, ses ve metin. Şan tekniğiyle buluşan oyuncu sesi.' },
      { title: 'Müzikal Sahneleme', span: 'Ocak–Mart', body: 'Müzikal ritim, Broadway dans temelleri ve sahne uzamı. Drama zeminine oturan koreografi ve müzikal metin çalışması.' },
      { title: 'Bitirme Performansı', span: 'Nisan–Mayıs', body: 'Tam sahne uygulaması — kostüm, ışık, seyirci. Kişisel parça geliştirme ve toplu prodüksiyon sunumu.' },
    ],
    images: ['musical-01', 'musical-02', 'musical-03', 'dslr-zl5a1045', 'dslr-zl5a1079'],
    seoTitle: 'Techne Musical Lab — Drama, Tiyatro & Müzikal Programı',
    seoDesc: 'Drama ve tiyatro temelli 8 aylık müzikal program. Köksal Ünal & Sitare Bilge. Ekim–Mayıs. Seyircili bitirme performanslı.',
  },

  // ── 09 — BROADWAY MUSICAL DANCE ────────────────────────────────────
  {
    id: 6, slug: 'broadway-musical-dance', code: '08',
    title: 'BROADWAY MUSICAL DANCE', sub: 'Broadway Müzikal Dansı',
    tagline: 'Jazz · Theatre Dance · Showmanship',
    instructor: 'Köksal Ünal',
    instructorBio: 'Oyuncu, yönetmen ve Broadway dans eğitmeni. Sahne koreografisi ve tiyatro dansı üzerine kapsamlı deneyim.',
    venue: 'Taksim / Kadıköy', duration: '12 hafta', price: 24000,
    maxStudents: 15, active: true,
    category: 'dans-muzikal',
    tags: ['Dans', 'Broadway', 'Koreografi'],
    desc: 'Broadway müzikal tiyatrosunun dans dilini öğreten 12 haftalık yoğun program. Jazz, tap ve theatre dance teknikleriyle sahne koreografisi, showmanship ve performans bütünlüğü. Başvuru için bir müzikal ya da pop şarkının seslendirildiği kısa bir video beklenmektedir; kabul video incelemesiyle yapılır.',
    blocks: [
      { title: 'Teknik Temel', span: '1—4. Hafta', body: 'Jazz ve theatre dance temelleri. Beden hizalaması, ritim, koordinasyon ve müzikle ilişki.' },
      { title: 'Koreografi & Stil', span: '5—8. Hafta', body: 'Broadway repertuarından sahneler. Stil çalışması, grup koreografisi ve sahne dinamiği.' },
      { title: 'Sahne & Showmanship', span: '9—12. Hafta', body: 'Performans bütünlüğü, kostümle çalışma ve final koreografisi sunumu.' },
    ],
    images: ['dslr-zl5a1044', 'dslr-zl5a1043', 'dslr-zl5a1064', 'dslr-zl5a1092'],
    seoTitle: 'Broadway Musical Dance — Broadway Müzikal Dansı Atölyesi',
    seoDesc: 'Köksal Ünal ile 12 haftalık Broadway müzikal dans programı. Jazz, theatre dance, showmanship. Techne Lab İstanbul.',
  },
]

export const SITE_META = {
  name: 'Techne Lab İstanbul',
  url: 'https://technelab.ist',
  description: 'İstanbul\'da bağımsız bir tiyatro. Oyunculuk, yazarlık, kamera, dramaturji, dans ve müzikal üzerine yoğun, küçük gruplu atölyeler. Taksim ve Kadıköy.',
  instagram: '@technelabistanbul',
  email: 'techne.lab.istanbul@gmail.com',
  address: 'İstanbul, Türkiye',
  // Google Form kayıt linkleri — slug bazında (aktif programlar için)
  formUrls: {
    'auteur-lab':                  'https://forms.gle/technelab',
    'english-drama-lab':           'https://forms.gle/technelab',
    'english-drama-final-project': 'https://forms.gle/technelab',
    'english-drama-youth':         'https://forms.gle/technelab',
    'techne-musical-lab':          'https://forms.gle/technelab',
    'broadway-musical-dance':      'https://forms.gle/technelab',
  } as Record<string, string>,
}

export const DISCOUNT_THRESHOLD = 2
export const DISCOUNT_RATE = 0.25

export const DNA_NODES = [
  { label: 'Oyunculuk',   sub: 'Acting',       href: '/atolyeler/auteur-lab' },
  { label: 'Yazarlık',    sub: 'Playwriting',   href: '/atolyeler/auteur-lab' },
  { label: 'Kamera',      sub: 'Camera',        href: '/atolyeler/camera-praxis' },
  { label: 'Mevcudiyet',  sub: 'Presence',      href: '/atolyeler/oyuncunun-mevcudiyeti' },
  { label: 'Dramaturji',  sub: 'Dramaturgy',    href: '/hakkinda' },
  { label: 'İngilizce',   sub: 'English Drama', href: '/atolyeler/english-drama-lab' },
  { label: 'Müzikal',     sub: 'Musical Lab',   href: '/atolyeler/techne-musical-lab' },
]

export type GalleryImage = {
  src: string
  alt: string
  category: 'atölye' | 'performans' | 'ekip' | 'english'
  wide?: boolean
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/images/gallery/mevcudiyet-01.jpg', alt: 'Oyuncunun Mevcudiyeti atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/dslr-zl5a1093.jpg', alt: 'Techne Lab sahne performansı', category: 'performans', wide: true },
  { src: '/images/gallery/mevcudiyet-02.jpg', alt: 'Burcu Halaçoğlu ile Mevcudiyet', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1094.jpg', alt: 'Techne Lab atölye anı', category: 'atölye' },
  { src: '/images/gallery/english-drama-2.jpg', alt: 'English Drama Lab atölyesi', category: 'english' },
  { src: '/images/gallery/mevcudiyet-03.jpg', alt: 'Presence atölyesi', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1091.jpg', alt: 'Techne Lab performans', category: 'performans' },
  { src: '/images/gallery/mevcudiyet-04.jpg', alt: 'Beden farkındalığı çalışması', category: 'atölye', wide: true },
  { src: '/images/gallery/english-drama-3.jpg', alt: 'English Drama Lab sahne', category: 'english', wide: true },
  { src: '/images/gallery/mevcudiyet-05.jpg', alt: 'Mevcudiyet — sahne pratiği', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1092.jpg', alt: 'Sahne çalışması', category: 'performans' },
  { src: '/images/gallery/mevcudiyet-06.jpg', alt: 'Mevcudiyet atölyesi', category: 'atölye' },
  { src: '/images/gallery/auteur-01.jpg', alt: 'The Auteur Lab atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/mevcudiyet-07.jpg', alt: 'Presence çalışması', category: 'atölye' },
  { src: '/images/gallery/english-drama-4.jpg', alt: 'English Drama Lab grup', category: 'english' },
  { src: '/images/gallery/mevcudiyet-08.jpg', alt: 'Beden ve ses atölyesi', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1044.jpg', alt: 'Oyunculuk atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/mevcudiyet-09.jpg', alt: 'Mevcudiyet pratik', category: 'atölye' },
  { src: '/images/gallery/auteur-02.jpg', alt: 'Halil Yağız Şanal ile Auteur Lab', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-010.jpg', alt: 'Presence sahne', category: 'atölye' },
  { src: '/images/gallery/english-drama-5.jpg', alt: 'English Drama Lab pratik', category: 'english' },
  { src: '/images/gallery/dslr-zl5a1043.jpg', alt: 'Atölye pratiği', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-012.jpg', alt: 'Mevcudiyet grup çalışması', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1079.jpg', alt: 'Techne Lab performans anı', category: 'performans' },
  { src: '/images/gallery/mevcudiyet-013.jpg', alt: 'Sahne farkındalığı', category: 'atölye' },
  { src: '/images/gallery/auteur-03.jpg', alt: 'Dramaturji laboratuvarı', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1077.jpg', alt: 'Atölye anı', category: 'atölye' },
  { src: '/images/gallery/auteur-04.jpg', alt: 'Dramaturji & Oyunculuk atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/dslr-zl5a1076.jpg', alt: 'The Auteur Lab', category: 'atölye' },
  { src: '/images/gallery/musical-01.jpg', alt: 'Techne Musical Lab', category: 'performans', wide: true },
  { src: '/images/gallery/dslr-zl5a1075.jpg', alt: 'Techne Lab atölye mekânı', category: 'atölye' },
  { src: '/images/gallery/musical-02.jpg', alt: 'Musical Lab sahne', category: 'performans' },
  { src: '/images/gallery/dslr-zl5a1045.jpg', alt: 'Yazarlık laboratuvarı', category: 'atölye' },
  { src: '/images/gallery/musical-03.jpg', alt: 'Musical Lab performans', category: 'performans' },
  { src: '/images/gallery/english-drama-16.jpg', alt: 'English Drama Lab — stüdyoda çember çalışması', category: 'english', wide: true },
  { src: '/images/gallery/english-drama-17.jpg', alt: 'English Drama Lab — sahne üzerinde çalışma', category: 'english' },
]
