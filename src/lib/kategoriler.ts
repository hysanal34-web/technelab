/**
 * Makale kategorileri → /makaleler/kategori/[slug] hub sayfaları (19 Ekim 2026, SEO/GEO).
 *
 * NEDEN VAR: 125 yayın makalesi tek bir /makaleler listesinde duruyordu. Google
 * ve yapay zekâ asistanları kümeyi tek sayfadan okuyamıyor; "müzikal" ya da
 * "İngilizce drama" kümesinin bir çatı adresi yoktu. Her kategori artık
 * kendi sayfasında: H1, kısa giriş, kümenin öncü yazıları, ilgili program/kaynak
 * sayfaları ve CollectionPage + ItemList şeması. Makale breadcrumb'ı da buraya
 * bağlanıyor; böylece her makale kendi hub'ına link veriyor.
 *
 * Program bilgisi (gün, saat, yer) burada YOK; o yalnızca data.ts'ten gelir.
 */
export type Kategori = {
  slug: string
  label: string
  seoTitle: string
  seoDesc: string
  intro: string
  /** Kümenin ticari/kaynak çatı sayfaları — her hub'tan en az bir tane. */
  hubs: { href: string; label: string }[]
  /** Öne çıkarılacak yazılar (sırayla); listede ilk sırada çıkar. */
  pillars?: string[]
}

export const KATEGORILER: Kategori[] = [
  {
    slug: 'dans-muzikal', label: 'Dans & Müzikal',
    seoTitle: 'Müzikal Tiyatro ve Dans Yazıları — Techne Lab İstanbul',
    seoDesc: 'Müzikal oyunculuk, belting, Broadway dansı, seçme videosu ve yetişkin olarak müzikale başlamak üzerine rehber yazılar. İstanbul müzikal tiyatro kümesi.',
    intro: 'Müzikal sahnesi üç disiplini aynı anda ister: şarkı, hareket ve oyunculuk. Bu kümedeki yazılar o üçlünün nasıl çalışıldığını, seçmelere nasıl hazırlanıldığını ve bir müzikal programının neye göre seçileceğini anlatıyor.',
    hubs: [
      { href: '/muzikal-tiyatro-kursu-istanbul', label: 'Müzikal tiyatro kursu İstanbul' },
      { href: '/kaynaklar/muzikal-secme-sarkilari', label: 'Müzikal seçme şarkıları' },
    ],
    pillars: ['muzikal-oyunculuk-nedir', 'belting-nedir-muzikal-sesi-belt-mix-legit', 'muzikal-tiyatro-atolyesi-secerken-nelere-bakilir', 'yetiskin-olarak-muzikale-baslamak'],
  },
  {
    slug: 'ingilizce-drama', label: 'İngilizce Drama',
    seoTitle: 'İngilizce Drama ve Konuşma Kulübü Yazıları — Techne Lab',
    seoDesc: '"Anlıyorum ama konuşamıyorum" sorunundan konuşma kulübü seçimine, çocuk ve gençlerde İngilizce dramaya kadar: İstanbul\'da İngilizce konuşma pratiği üzerine yazılar.',
    intro: 'İngilizceyi bilmek ile canlı kullanmak iki ayrı beceri. Bu küme, konuşma kulüplerinin neden bazen işe yaramadığını, doğaçlamanın dili nasıl çalıştırdığını ve çocuklarla gençlerde İngilizce dramanın nasıl işlediğini ele alıyor.',
    hubs: [
      { href: '/kaynaklar/konusma-kulubu-sorulari', label: 'Konuşma kulübü soruları' },
      { href: '/kaynaklar/ingilizce-tartisma-konulari', label: 'İngilizce tartışma konuları' },
      { href: '/kadikoy-ingilizce-konusma-kulubu', label: 'Kadıköy İngilizce konuşma kulübü' },
      { href: '/beyoglu-ingilizce-konusma-kulubu', label: 'Beyoğlu İngilizce konuşma kulübü' },
      { href: '/atolyeler/english-drama-youth', label: 'English Drama Youth (8–17)' },
    ],
    pillars: ['ingilizce-anliyorum-ama-konusamiyorum', 'ingilizce-konusma-kulubu-nasil-secilir', 'ingilizce-drama-youth-yas-gruplari-neden-ayri', 'konusma-kulubu-nasil-yonetilir'],
  },
  {
    slug: 'yaratici-drama', label: 'Yaratıcı Drama',
    seoTitle: 'Yaratıcı Drama Yazıları: Yöntem, Aşamalar, Teknikler',
    seoDesc: 'Yaratıcı drama nedir, hangi yaşta başlanır, oturum nasıl kurulur, lider ne yapar? Çocuk, genç ve yetişkinler için yaratıcı drama üzerine rehber yazılar.',
    intro: 'Yaratıcı drama bir oyun değil, bir çalışma biçimi. Bu kümede yöntemin aşamalarını, tekniklerini, liderin rolünü ve evde ya da okulda nasıl uygulanacağını yazdık.',
    hubs: [{ href: '/yaratici-drama-istanbul', label: 'Yaratıcı drama İstanbul' }],
    pillars: ['yaratici-drama-nedir', 'yaratici-drama-asamalari', 'yaratici-drama-teknikleri', 'yaratici-dramada-rolde-lider'],
  },
  {
    slug: 'oyunculuk', label: 'Oyunculuk',
    seoTitle: 'Oyunculuk Eğitimi Yazıları — Nereden Başlanır, Nasıl Seçilir',
    seoDesc: 'Oyunculuğa kaç yaşında başlanır, kurs nasıl seçilir, yetenek mi öğrenilir mi? İstanbul\'da oyunculuk eğitimi üzerine sorgulayan yazılar.',
    intro: 'Oyunculuk eğitimiyle ilgili en sık sorulan sorular burada: yaş, seçim ölçütleri, çalışırken eğitim, ilk gün ne olur. Yöntemlerin ayrıntısı Teknik kümesinde.',
    hubs: [{ href: '/oyunculuk-kursu-istanbul', label: 'Oyunculuk kursu İstanbul' }],
    pillars: ['istanbul-oyunculuk-kursu-nasil-secilir', 'oyunculuk-egitimi-nasil-alinir', 'oyunculuga-kac-yasinda-baslanir'],
  },
  {
    slug: 'teknik', label: 'Teknik',
    seoTitle: 'Oyunculuk Yöntemleri ve Sahne Teknikleri — Techne Lab',
    seoDesc: 'Stanislavski, Meisner, Chekhov, Viewpoints, Lecoq, Grotowski, Brecht; devising, doğaçlama, fiziksel tiyatro, self-tape ve seçme hazırlığı. Yöntem yazıları.',
    intro: 'Bir yöntemin adını duymak ile ne yaptığını bilmek arasında fark var. Bu küme oyunculuk ve sahneleme yöntemlerini tek tek açıyor: nereden çıktı, neyi sorar, provada nasıl kullanılır.',
    hubs: [
      { href: '/oyunculuk-kursu-istanbul', label: 'Oyunculuk kursu İstanbul' },
      { href: '/kaynaklar/sozluk', label: 'Tiyatro sözlüğü' },
      { href: '/kaynaklar/monologlar', label: 'Monologlar' },
      { href: '/kaynaklar/ses-nefes', label: 'Ses ve nefes' },
    ],
    pillars: ['stanislavski-yontemi-nedir', 'meisner-teknigi-nedir', 'devising-tiyatro-nedir', 'audition-nedir-secmeye-nasil-hazirlanilir'],
  },
  {
    slug: 'yazarlik', label: 'Yazarlık',
    seoTitle: 'Oyun Yazarlığı Yazıları — Diyalog, Sahne, Yapı',
    seoDesc: 'Tiyatro oyunu nasıl yazılır, diyalog nasıl kurulur, kısa oyun nasıl biter? Oyun yazarlığı atölyesi seçiminden metin formatına kadar yazarlık rehberi.',
    intro: 'Oyun yazmak roman ya da senaryo yazmaya benzemez; sahne, zamanı ve bedeni hesaba katmayı ister. Bu kümede yazarlığın tekniğini ve İstanbul\'da yazarlık çalışmasının nasıl seçileceğini ele aldık.',
    hubs: [{ href: '/oyun-yazarligi-kursu-istanbul', label: 'Oyun yazarlığı kursu İstanbul' }],
    pillars: ['tiyatro-oyunu-nasil-yazilir', 'diyalog-nasil-yazilir', 'sahne-nasil-yazilir-bir-sahnenin-anatomisi'],
  },
  {
    slug: 'dramaturji', label: 'Dramaturji',
    seoTitle: 'Dramaturji Yazıları — Dramaturg Ne Yapar, Nasıl Olunur',
    seoDesc: 'Dramaturji nedir, dramaturg ne iş yapar, yönetmenle nasıl çalışır, roman oyuna nasıl uyarlanır? Dramaturji üzerine rehber yazılar.',
    intro: 'Dramaturji, metin ile sahne arasındaki düşünme işi. Bu küme kavramı, mesleği ve pratiğini açıyor.',
    hubs: [{ href: '/oyun-yazarligi-kursu-istanbul', label: 'Oyun yazarlığı ve dramaturji İstanbul' }],
    pillars: ['dramaturji-nedir', 'dramaturg-ne-is-yapar', 'dramatik-yapi-nedir'],
  },
  {
    slug: 'sektor', label: 'Sektör',
    seoTitle: 'Bağımsız Tiyatro ve Sektör Yazıları — Techne Lab İstanbul',
    seoDesc: 'İstanbul bağımsız tiyatro ekonomisi, güvencesiz emek, genç seyirci sorunu, uluslararası kariyer ve beyin göçü. Sektöre içeriden bakan yazılar.',
    intro: 'Sahnenin arkasındaki ekonomi ve emek. Bu kümede bağımsız tiyatronun nasıl ayakta kaldığını, kimin ne kazandığını ve sektörün nereye gittiğini soruyoruz.',
    hubs: [{ href: '/hakkinda', label: 'Techne Lab hakkında' }],
    pillars: ['istanbul-bagimsiz-tiyatro', 'bagimsiz-tiyatro-neden-hala-ayakta-2026'],
  },
  {
    slug: 'kultur', label: 'Kültür',
    seoTitle: 'İstanbul Tiyatro Gündemi — Festival, Sezon, Sahne Haberleri',
    seoDesc: 'İstanbul Tiyatro Festivali, Harbiye yaz oyunları, Kadıköy sahneleri ve sezon haberleri. İstanbul tiyatro gündemini içeriden izleyen yazılar.',
    intro: 'Şehrin tiyatro takvimi ve o takvimin ardındaki sorular. Festivaller, sezon açılışları, kapanan ve açılan sahneler.',
    hubs: [{ href: '/makaleler', label: 'Tüm makaleler' }],
  },
  {
    slug: 'pedagoji', label: 'Pedagoji',
    seoTitle: 'Tiyatro Pedagojisi Yazıları — Oyuncu Nasıl Yetişir',
    seoDesc: 'Oyuncu nasıl yetişir, tiyatro eğitimi nasıl kurulur? Tiyatro pedagojisi üzerine yazılar.',
    intro: 'Eğitimin kendisi üzerine düşünen yazılar: oyuncu nasıl yetişir, bir atölye neyi öğretebilir, neyi öğretemez.',
    hubs: [{ href: '/oyunculuk-kursu-istanbul', label: 'Oyunculuk kursu İstanbul' }],
  },
  {
    slug: 'tiyatro', label: 'Tiyatro',
    seoTitle: 'Tiyatro Kursu İstanbul — Nereden Başlamalı',
    seoDesc: 'İstanbul\'da tiyatro kursu ararken nereden başlanır, neye bakılır? Genel tiyatro yazıları.',
    intro: 'Tiyatroya giriş niteliğindeki yazılar.',
    hubs: [{ href: '/atolyeler', label: 'Tüm programlar' }],
  },
]

export function kategoriSlug(label: string): string {
  const k = KATEGORILER.find((x) => x.label === label)
  if (k) return k.slug
  return label.toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function kategoriBySlug(slug: string): Kategori | undefined {
  return KATEGORILER.find((k) => k.slug === slug)
}
