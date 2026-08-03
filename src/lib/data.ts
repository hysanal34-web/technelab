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
    instructorBio: "1995 İstanbul doğumlu oyun yazarı, tiyatro yönetmeni ve dramaturg. İstanbul Üniversitesi Felsefe bölümünden tiyatroya geçiş yaptı. GalataPerform çağdaş oyun yazarlığı atölyelerinde eğitim aldı; Medeniyet Üniversitesi Sahne Sanatları Dramatik Yazarlık ve Dramaturji Anasanat Dalı'nda öğrenimini sürdürdü. İKSV Senenin Oyunu ödüllü oyun yazarı.",
    venue: 'Kadıköy', duration: '8 hafta', price: 24000,
    installments: 3, monthlyPrice: 8000,
    maxStudents: 8, active: true,
    category: 'yazarlık',
    tags: ['Dramaturji', 'Yazarlık'],
    desc: 'Yazmak için yaratıcı bir alan. Kendi metnini kurmanın temel dinamiklerine odaklanıyoruz — karakter, çatışma, sahne. İlhamı beklemeden, üreterek.',
    blocks: [
      {
        title: '1. Modül: Antikten Moderne',
        span: '1—4. Hafta',
        body: 'Sophokles\'ten Ibsen\'e: dramatik yapının temelleri. Metin analizi, karakter arkı, çatışma ve alt metin. Batı tiyatrosunun kökleri — yazarlık gözüyle.',
      },
      {
        title: '2. Modül: Çağdaş Yazın',
        span: '5—6. Hafta',
        body: 'Beckett, Kane, Zeller, Williams. Parçalanmış yapılar, suskunluk ve çoğul anlatı. Çağdaş dramaturjiye analitik ve yaratıcı bir bakış.',
      },
      {
        title: '3. Modül: Kendi Sesin',
        span: '7—8. Hafta',
        body: 'Kişisel yazarlık sesinin keşfi. Kısa oyun taslakları ve dramaturgik geri bildirim. Antik Yunan\'dan günümüze izlediğimiz yolun ardından: kendi anlatı kimliğinin inşası.',
      },
    ],
    images: ['auteur-hero', 'auteur-01', 'auteur-02', 'auteur-03', 'auteur-04'],
    seoTitle: 'Oyun Yazarlığı & Dramaturji Atölyesi İstanbul — Auteur Lab',
    seoDesc: 'İstanbul\'da oyun yazarlığı ve dramaturji atölyesi: 8 hafta metin analizi, karakter, çatışma. Sophokles\'ten Beckett\'e. Halil Yağız Şanal ile yaratıcı yazarlık, senaryo ve kurmaca kursu. Kadıköy.',
  },

  // ── 02 — MEVCUDİYET ────────────────────────────────────────────────
  {
    id: 4, slug: 'oyuncunun-mevcudiyeti', code: '02',
    title: 'OYUNCUNUN MEVCUDİYETİ', sub: 'Presence',
    tagline: 'Sahne Üzerinde Var Olmak',
    instructor: 'Burcu Halaçoğlu', instructorBio: 'Oyuncu ve beden çalışması eğitmeni. Sahne mevcudiyeti, ses-nefes ve fiziksel farkındalık üzerine uzmanlaşmış pratisyen.',
    venue: 'Pera & Kadıköy', duration: '4 hafta · yoğun', price: 16000,
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
    seoTitle: 'Oyunculuk Atölyesi İstanbul — Beden, Ses & Mevcudiyet',
    seoDesc: 'İstanbul oyunculuk atölyesi: beden farkındalığı, ses-nefes ve anda kalma. Acting workshop ve tiyatro kursu — Burcu Halaçoğlu ile Pera ve Kadıköy\'de. Fiziksel tiyatro, presence çalışması.',
  },

  // ── 03 — ENGLISH DRAMA LAB (Yetişkin · 12 hafta) ──────────────────
  {
    id: 3, slug: 'english-drama-lab', code: '03',
    title: 'ENGLISH DRAMA LAB', sub: 'English Creative Drama',
    tagline: 'Yaratıcı Drama · Doğaçlama · İngilizce',
    instructor: 'Techne Lab', instructorBio: '',
    venue: 'Pera & Kadıköy', duration: '12 hafta', price: 36000,
    priceEarlyBird: 30000, priceCash: 27000, installments: 9, monthlyPrice: 4000,
    earlyBirdSlots: 5,
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Yaratıcı Drama', 'Doğaçlama'],
    desc: 'İngilizce dili yaratıcı drama egzersizleri ve doğaçlamalar yoluyla bedene ve sese yerleşir. Metin ezberlemeden uzak, anlık tepki ve hayal gücüne dayalı bu program katılımcıları İngilizce ifadeyle doğrudan temas kurmaya davet eder. Bir konuşma kulübünün pratiğini yaratıcı dramanın araçlarıyla birleştiriyoruz: konuşma sahnede, bedenle ve oyunla açılıyor.',
    blocks: [
      { title: 'Isınma & Keşif', span: '1—4. Hafta', body: 'Oyun ve güven egzersizleri, dil oyunları, beden-ses-hayal gücü üçgeni. İngilizce sezginin açılması.' },
      { title: 'Doğaçlama & Karakter', span: '5—8. Hafta', body: 'Anlık sahne çalışması, status oyunları, karakter doğaçlamaları. Dili düşünmeden konuşmak.' },
      { title: 'Bütünleşme & Uygulama', span: '9—12. Hafta', body: 'Edinilen araçların sahnede bütünleştirilmesi. Grup doğaçlamaları ve anlık sahne çalışmasının derinleşmesi.' },
    ],
    images: ['english-drama-16', 'english-drama-1', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-final-project', 'english-drama-youth'],
    seoTitle: 'İngilizce Drama & Konuşma Kulübü İstanbul — English Drama Lab',
    seoDesc: 'İngilizce drama atölyesi İstanbul: yaratıcı drama ve doğaçlamayla konuşma kulübü pratiği. English drama course, İngilizce konuşma pratiği — Pera ve Kadıköy. 12 kişilik gruplar, 12 hafta.',
  },

  // ── 04 — ENGLISH ACTING PRAXIS ─────────────────────────────────────
  {
    id: 8, slug: 'english-drama-final-project', code: '04',
    title: 'ENGLISH ACTING PRAXIS', sub: 'Ece Ertez · Harika Uygur Masterclass',
    tagline: 'Oyunculuğunu Uluslararası Arenaya Taşımak İsteyenler İçin',
    instructor: 'Ece Ertez',
    instructorBio: 'Eğitmen: Ece Ertez — Oyuncu ve İngilizce tiyatro eğitmeni. İngilizce sahne oyunculuğu ve metin çalışması üzerine uzmanlaşmış pratisyen. Cast Direktörü / Süpervizör: Harika Uygur.',
    venue: 'Pera', duration: '12 hafta', price: 18000,
    priceCash: 15000, installments: 2, monthlyPrice: 9000,
    maxStudents: 14, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Performans', 'Sahne'],
    desc: 'Ece Ertez ile on iki hafta boyunca birden fazla İngilizce metin üzerinde yoğun pratik. Karakter kurar, sahne dilini içselleştirir, prova disiplinini öğrenirsiniz. Programın sonunda Cast Direktörü Harika Uygur bir günlük masterclass vererek katılımcıların canlı performanslarını izler; bu performanslar kayıt altına alınarak katılımcılara teslim edilir.',
    blocks: [
      { title: 'Metin & Karakter', span: '1—4. Hafta', body: 'Metin seçimi, analiz, karakter motivasyonu. Alt metin ve sahne niyeti.' },
      { title: 'Prova Süreci', span: '5—8. Hafta', body: 'Partner çalışması, blocking, sahne dinamiği. Gerçek prova disiplini.' },
      { title: 'Bütünleşme & Harika Uygur Masterclass', span: '9—12. Hafta', body: 'Bütünleşme çalışması ve kişisel geri bildirim seansları. Program finalinde Cast Direktörü Harika Uygur\'un bir günlük masterclass\'ı: canlı performanslar izlenir, kayıt altına alınır ve katılımcılara teslim edilir.' },
    ],
    images: ['english-acting-praxis-poster', 'english-drama-11', 'english-drama-12', 'english-drama-13', 'english-drama-15'],
    edlFamily: ['english-drama-lab', 'english-drama-youth'],
    seoTitle: 'İngilizce Oyunculuk Atölyesi İstanbul — English Acting Praxis',
    seoDesc: 'İngilizce acting workshop İstanbul: 12 hafta metin analizi, karakter ve prova disiplini. English acting kursu, Ece Ertez ile — Harika Uygur masterclass finali. Pera, Beyoğlu.',
  },

  // ── 05 — ENGLISH DRAMA YOUTH: 14–17 YAŞ ────────────────────────────
  {
    id: 9, slug: 'english-drama-youth', code: '05',
    title: 'ENGLISH DRAMA YOUTH (14–17)', sub: 'Yıl Sonu Temsili · Final Performanslı',
    tagline: 'Yaratıcı Drama & Sahne — Gençler İçin',
    instructor: 'Techne Lab', instructorBio: '',
    venue: 'Kadıköy', duration: '8 ay · Haftada 1 gün (Ekim–Mayıs)', price: 60000,
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
    images: ['english-drama-youth-01', 'english-drama-4', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-lab', 'english-drama-final-project'],
    seoTitle: 'Gençler İngilizce Tiyatro Kursu İstanbul — 14–17 Yaş Drama',
    seoDesc: 'İstanbul 14–17 yaş tiyatro kursu: İngilizce yaratıcı drama, sahne çalışması ve konuşma pratiği. Gençler için drama atölyesi, youth theatre, seyircili final gösterisi. Kadıköy, 8 ay.',
  },

  // ── 06 — TECHNE MUSICAL LAB ────────────────────────────────────────
  {
    id: 5, slug: 'techne-musical-lab', code: '06',
    title: 'TECHNE MUSICAL LAB', sub: 'Drama · Tiyatro · Müzikal',
    tagline: 'Sahne. Ses. Hareket. — Seyircinin Karşısında.',
    instructor: 'Köksal Ünal & Sitare Bilge',
    instructorBio: 'Köksal Ünal: Oyuncu, yönetmen ve Broadway dans eğitmeni. Sitare Bilge: Ses ve şan eğitmeni, tiyatro müziği uzmanı. İkisi birlikte sahne sanatlarının üç disiplinini tek programda buluşturuyor.',
    venue: 'Kadıköy', duration: '8 ay · Haftada 2 gün (Ekim–Mayıs)', price: 96000,
    priceEarlyBird: 80000, priceCash: 72000, installments: 8, monthlyPrice: 12000,
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
    seoTitle: 'Müzikal Tiyatro Kursu İstanbul — Oyunculuk, Şan & Dans',
    seoDesc: 'İstanbul müzikal tiyatro kursu: oyunculuk, şan ve dans tek programda. Musical theatre, Broadway repertuarı ve koreografi — Köksal Ünal & Sitare Bilge ile. Seyircili bitirme performansı. Kadıköy.',
  },

  // ── 07 — BROADWAY MUSICAL DANCE ────────────────────────────────────
  {
    id: 6, slug: 'broadway-musical-dance', code: '07',
    title: 'BROADWAY MUSICAL DANCE', sub: 'Broadway Müzikal Dansı',
    tagline: 'Jazz · Theatre Dance · Showmanship',
    instructor: 'Köksal Ünal',
    instructorBio: 'Oyuncu, yönetmen ve Broadway dans eğitmeni. Sahne koreografisi ve tiyatro dansı üzerine kapsamlı deneyim.',
    venue: 'Kadıköy', duration: '12 hafta', price: 24000,
    installments: 3, monthlyPrice: 8000,
    maxStudents: 15, active: true,
    category: 'dans-muzikal',
    tags: ['Dans', 'Broadway', 'Koreografi'],
    desc: 'Broadway müzikal tiyatrosunun dans dilini öğreten 12 haftalık yoğun program. Jazz ve theatre dance teknikleriyle sahne koreografisi, showmanship ve performans bütünlüğü. Başvuru için bir müzikal ya da pop şarkının seslendirildiği kısa bir video beklenmektedir; kabul video incelemesiyle yapılır.',
    blocks: [
      { title: 'Teknik Temel', span: '1—4. Hafta', body: 'Jazz ve theatre dance temelleri. Beden hizalaması, ritim, koordinasyon ve müzikle ilişki.' },
      { title: 'Koreografi & Stil', span: '5—8. Hafta', body: 'Broadway repertuarından sahneler. Stil çalışması, grup koreografisi ve sahne dinamiği.' },
      { title: 'Sahne & Showmanship', span: '9—12. Hafta', body: 'Performans bütünlüğü, kostümle çalışma ve final koreografisi sunumu.' },
    ],
    images: ['dslr-zl5a1044', 'dslr-zl5a1043', 'dslr-zl5a1064', 'dslr-zl5a1092'],
    seoTitle: 'Dans Kursu İstanbul — Broadway Müzikal Dansı & Jazz Dance',
    seoDesc: 'İstanbul dans kursu: Broadway müzikal dansı, jazz dance ve theatre dance. 12 hafta sahne koreografisi ve showmanship. Köksal Ünal ile dans atölyesi — Kadıköy, dans deneyimi şart değil.',
  },
]

export const SITE_META = {
  name: 'Techne Lab İstanbul',
  url: 'https://www.technelabistanbul.com',
  description: 'İstanbul\'da bağımsız bir tiyatro. Oyunculuk, yazarlık, dramaturji, dans ve müzikal üzerine yoğun, küçük gruplu atölyeler. Pera ve Kadıköy\'deki üç partner mekânda.',
  instagram: '@technelabistanbul',
  email: 'technelabistanbul@gmail.com',
  address: 'İstanbul, Türkiye',
}

// ── İŞBİRLİĞİ YAPILAN MEKÂNLAR ──────────────────────────────────────
// Techne Lab mobil çalışan bir ekip — kendi mekânı yok.
// Programlar bu üç partner mekânda gerçekleşiyor.
export type Venue = {
  key: string
  name: string
  district: string
  side: 'Avrupa' | 'Anadolu'
  blurb: string
  instagram?: string
  mapsUrl?: string
  logo?: string    // partner mekânın kendi logosu
  photo?: string   // mekân fotoğrafı
}

export const VENUES: Venue[] = [
  {
    key: 'beden-isleri',
    name: 'Beden İşleri',
    district: 'Rasimpaşa · Kadıköy',
    side: 'Anadolu',
    blurb: 'Bedeni merkeze alan bir hareket stüdyosu. Dans, müzikal ve fiziksel tiyatro çalışmalarımız burada — geniş zemin, yüksek tavan, doğal ışık.',
    instagram: '@bedenisleri',
    logo: '/images/venues/beden-isleri.jpg',
    photo: '/images/venues/beden-isleri-photo.jpg',
  },
  {
    key: 'pod-pera',
    name: 'Pod Pera',
    district: 'Pera · Beyoğlu',
    side: 'Avrupa',
    blurb: 'Pera\'nın merkezinde, tarihi dokunun içinde bir çalışma alanı.',
    instagram: '@podpera',
    logo: '/images/venues/pod-pera.png',
    photo: '/images/venues/pod-pera-photo.jpg',
  },
  {
    key: 'soft-sanat',
    name: 'Soft Sanat',
    district: 'Kadıköy',
    side: 'Anadolu',
    blurb: 'Kadıköy\'de müzikal ve broadway programlarımızın evi. Geniş zemin, yüksek tavan — dans, şan ve sahne çalışması için tam donanımlı bir sanat alanı.',
    instagram: '@softsanat',
    logo: '/images/venues/soft-sanat.jpg',
    photo: '/images/venues/soft-sanat-photo.jpg',
  },
]

export const DISCOUNT_THRESHOLD = 2
export const DISCOUNT_RATE = 0.25

export const DNA_NODES = [
  { label: 'Oyunculuk',   sub: 'Acting',       href: '/atolyeler/auteur-lab' },
  { label: 'Yazarlık',    sub: 'Playwriting',   href: '/atolyeler/auteur-lab' },
  { label: 'Mevcudiyet',  sub: 'Presence',      href: '/atolyeler/oyuncunun-mevcudiyeti' },
  { label: 'Dramaturji',  sub: 'Dramaturgy',    href: '/hakkinda' },
  { label: 'İngilizce',   sub: 'English Drama', href: '/atolyeler/english-drama-lab' },
  { label: 'Müzikal',     sub: 'Musical Lab',   href: '/atolyeler/techne-musical-lab' },
  { label: 'Dans',        sub: 'Broadway',      href: '/atolyeler/broadway-musical-dance' },
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
