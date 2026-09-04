export type Workshop = {
  id: number; slug: string; code: string
  title: string; sub: string; tagline: string
  instructor: string; instructorBio: string
  venue: string; duration: string; price: number
  priceEarlyBird?: number    // erken kayıt fiyatı
  priceCash?: number         // peşin / havale fiyatı
  priceShort?: number        // kısa varyant fiyatı (ör. Broadway 6 hafta)
  priceShortLabel?: string   // kısa varyant etiketi ('6 hafta')
  priceLabel?: string        // ana fiyatın etiketi ('12 hafta')
  monthlyPrice?: number      // aylık taksit
  installments?: number      // max faizsiz taksit sayısı
  earlyBirdSlots?: number    // erken kayıt kontenjanı (ilk N kişi)
  earlyBirdPercent?: number  // erken kayıt indirim yüzdesi
  earlyBirdDeadline?: string // erken kayıt son tarihi (gösterim metni)
  // Burs — erken kayıtla birlikte KULLANILMAZ, onun yerine geçer.
  // Başvuru değerlendirmesiyle veriliyor; tarih ya da kontenjan taahhüdü yok.
  // Sitede yalnızca oran görünür (rakam değil) — bkz. fiyat gizleme kararı.
  scholarshipPercent?: number
  schedule?: { place?: string; date: string; time?: string }[]  // başlangıç tarih(ler)i
  scheduleNote?: string      // tarih henüz netleşmediyse ("Tarih yakında açıklanacak")
  // price: 0 → fiyat henüz yayınlanmadı; fiyat bloğu gizlenir, CTA "ön kayıt" olur
  maxStudents: number | string; active: boolean; archived?: boolean; nextDate?: string
  ageRange?: string          // yaş aralığı olan programlar için ('12–55 yaş')
  tags: string[]; desc: string; descEn?: string
  // AI arama motorları (llms.txt) için tek satırlık özet. desc çok paragraflı
  // olduğunda ilk paragraf tek başına yeterli bağlamı vermeyebilir — bu alan
  // varsa llms.txt bunu kullanır, yoksa desc'in ilk paragrafına döner.
  aiSummary?: string
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
    title: 'THE AUTEUR LAB', sub: 'Yaratıcı Yazarlık · Dramaturji',
    tagline: 'Dürtüden Tasarıma — Tasarımdan Eyleme',
    instructor: 'Halil Yağız Şanal',
    instructorBio: "1995 İstanbul doğumlu oyun yazarı, tiyatro yönetmeni ve dramaturg. İstanbul Üniversitesi Felsefe bölümünden tiyatroya geçiş yaptı. GalataPerform çağdaş oyun yazarlığı atölyelerinde eğitim aldı; Medeniyet Üniversitesi Sahne Sanatları Dramatik Yazarlık ve Dramaturji Anasanat Dalı'nda öğrenimini sürdürdü. İKSV Senenin Oyunu ödüllü oyun yazarı.",
    venue: 'Kadıköy', duration: '8 hafta (modül başına)', price: 18000,
    scholarshipPercent: 25,
    schedule: [{ place: 'Kadıköy', date: '7 Ekim Çarşamba' }],
    maxStudents: 10, active: true,
    category: 'yazarlık',
    tags: ['Yaratıcı Yazarlık', 'Dramaturji', 'Roman & Senaryo'],
    desc: 'Sophokles\'ten Beckett\'e uzanan bir okuma hattı. Metinlerin nasıl kurulduğunu, anlatının yüzyıllar içinde neyi koruyup neyi bıraktığını izliyoruz. Bu bir başlangıç programı ama teknikle başlamıyor: önce bir metnin neden işlediğini görebilmek gerekiyor. O bakış yerleştiğinde hangi biçimde yazdığınız ikincil kalıyor — roman, senaryo ve oyun aynı zeminden besleniyor.\n\nProgram üç modülden oluşuyor, her biri sekiz hafta. Modüller ayrı ayrı alınabiliyor: birinciyle başlayıp devam kararını sonra verebilirsiniz.',
    blocks: [
      {
        title: '1. Modül: Antikten Moderne',
        span: '1—8. Hafta',
        body: 'Sophokles\'ten Ibsen\'e: dramatik yapının temelleri. Metin analizi, karakter arkı, çatışma ve alt metin. Batı tiyatrosunun kökleri — yazarlık gözüyle.',
      },
      {
        title: '2. Modül: Çağdaş Yazın',
        span: '9—16. Hafta',
        body: 'Beckett, Kane, Zeller, Williams. Parçalanmış yapılar, suskunluk ve çoğul anlatı. Çağdaş dramaturjiye analitik ve yaratıcı bir bakış.',
      },
      {
        title: '3. Modül: Kendi Sesin',
        span: '17—24. Hafta',
        body: 'Kişisel yazarlık sesinin keşfi. Kısa oyun taslakları ve dramaturgik geri bildirim. Antik Yunan\'dan günümüze izlediğimiz yolun ardından: kendi anlatı kimliğinin inşası.',
      },
    ],
    images: ['auteur-hero', 'auteur-01', 'auteur-02', 'auteur-03', 'auteur-04'],
    seoTitle: 'Yaratıcı Yazarlık Atölyesi İstanbul — Roman, Senaryo & Oyun',
    seoDesc: 'İstanbul yaratıcı yazarlık atölyesi: metin analizi, karakter, çatışma ve yapı. Sophokles\'ten Beckett\'e sekiz haftalık okuma ve yazma programı. Roman, senaryo ve oyun için. Halil Yağız Şanal ile Kadıköy.',
  },

  // ── 02 — MEVCUDİYET ────────────────────────────────────────────────
  {
    id: 4, slug: 'oyuncunun-mevcudiyeti', code: '07',
    title: 'OYUNCUNUN MEVCUDİYETİ', sub: 'Presence',
    tagline: 'Sahne Üzerinde Var Olmak',
    instructor: 'Burcu Halaçoğlu', instructorBio: 'Oyuncu ve beden çalışması eğitmeni. Sahne mevcudiyeti, ses-nefes ve fiziksel farkındalık üzerine uzmanlaşmış pratisyen.',
    venue: 'Pera & Kadıköy', duration: '4 hafta · yoğun', price: 19000,
    priceEarlyBird: 16000, earlyBirdPercent: 16, earlyBirdDeadline: '10 Eylül',
    scheduleNote: 'Tarih yakında açıklanacak',
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

  // ── 02 — ENGLISH DRAMA LAB (Yetişkin · aylık katılım) ─────────────
  {
    id: 3, slug: 'english-drama-lab', code: '02',
    title: 'ENGLISH DRAMA LAB', sub: 'Yetişkinlere İngilizce Drama',
    tagline: 'Dil Öğretmiyoruz. Dili Deneyimliyoruz.',
    instructor: 'Alara Lokum, Ece Ertez & Yeşim Çelebi',
    instructorBio: "Alara Lokum: Şehir Tiyatroları'nda başlayan sahne pratiğini Kadir Has Üniversitesi Tiyatro Bölümü'nde akademik temele oturttu; Amerika ve İtalya'daki eğitimleriyle anadil seviyesinde İngilizce hâkimiyeti kazandı. Ece Ertez: Oyunculuk pratiğini Şahika Tekand Studio Oyuncuları'nın fiziksel tiyatro ekolünde inşa etti; Şahmaran ve Erşan Kuneri gibi projelerde yer aldı, Chubbuck Metodu'nda uzmanlaştı. Yeşim Çelebi: Yale Üniversitesi Tiyatro ve Performans Sanatları mezunu; LAMDA disiplini ile Stella Adler ve Lee Strasberg metotlarını Bahar, Kızılcık Şerbeti ve Mezarlık gibi yapımlardaki set deneyimiyle birleştiriyor.",
    // 3 Eylül: 6/12 hafta paket modelinden aylık katılıma geçildi — "taksit" değil,
    // açık uçlu aylık katılım. price artık AYLIK ücret. priceEarlyBird sabit %10
    // erken kayıt fiyatı (mekanizma zaten böyle çalışıyor, bkz. erkenKayit.ts).
    // Öğrenci indirimi (%10) ayrıca uygulanır ama fiyat sitede zaten gizli olduğu
    // için otomatik hesaplayıcıya eklenmedi — DM/broşürde elle belirtiliyor,
    // erken kayıtla birleşince aylık 7.200₺'ye iniyor.
    venue: 'Pera & Kadıköy', duration: 'Açık kayıt · aylık katılım', price: 9000,
    priceEarlyBird: 8100, priceLabel: 'ay',
    earlyBirdDeadline: '10 Eylül',
    schedule: [
      { place: 'Pera', date: '3 Ekim Cumartesi', time: '15:00' },
      { place: 'Kadıköy', date: '14 Eylül Pazartesi', time: '20:00' },
    ],
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Yaratıcı Drama', 'Doğaçlama'],
    desc: 'İngilizce dili yaratıcı drama egzersizleri ve doğaçlamalar yoluyla bedene ve sese yerleşir. Metin ezberlemeden uzak, anlık tepki ve hayal gücüne dayalı bu program katılımcıları İngilizce ifadeyle doğrudan temas kurmaya davet eder. Bir konuşma kulübünün pratiğini yaratıcı dramanın araçlarıyla birleştiriyoruz: konuşma sahnede, bedenle ve oyunla açılıyor.',
    blocks: [
      // Aylık katılım modeli: haftalık paket yok, her buluşma üç eksenin karışımı.
      { title: 'Isınma & Keşif', span: 'Eksen 01', body: 'Oyun ve güven egzersizleri, dil oyunları, beden-ses-hayal gücü üçgeni. İngilizce sezginin açılması.' },
      { title: 'Doğaçlama & Karakter', span: 'Eksen 02', body: 'Anlık sahne çalışması, status oyunları, karakter doğaçlamaları. Dili düşünmeden konuşmak.' },
      { title: 'Sahne & Bütünleşme', span: 'Eksen 03', body: 'Grup doğaçlamaları, partner çalışması, anlık sahne kurma. Araçların sahnede birleşmesi. Her ay yeni bir tema; istediğiniz ay katılır, istediğiniz ay ara verirsiniz.' },
    ],
    images: ['english-drama-16', 'english-drama-1', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-final-project', 'english-drama-youth'],
    seoTitle: 'İngilizce Drama & Konuşma Kulübü İstanbul — English Drama Lab',
    seoDesc: 'İngilizce drama atölyesi İstanbul: yaratıcı drama ve doğaçlamayla konuşma kulübü pratiği. English drama course, İngilizce konuşma pratiği — Pera ve Kadıköy. 12 kişilik gruplar, açık kayıt · aylık katılım.',
  },

  // ── 04 — ENGLISH ACTING PRAXIS ─────────────────────────────────────
  {
    id: 8, slug: 'english-drama-final-project', code: '03',
    title: 'ENGLISH ACTING PRAXIS', sub: 'Ece Ertez · Harika Uygur Masterclass',
    tagline: 'Oyunculuğunu Uluslararası Arenaya Taşımak İsteyenler İçin',
    instructor: 'Ece Ertez',
    instructorBio: 'Eğitmen: Ece Ertez — Oyuncu ve İngilizce tiyatro eğitmeni. İngilizce sahne oyunculuğu ve metin çalışması üzerine uzmanlaşmış pratisyen.\n\nCast Direktörü / Süpervizör: Harika Uygur — Avrupa\'nın en iyi cast direktörü seçilen (ICDN, "Mustang"), Amerikan Film Akademisi (AMPAS), Casting Society of America (CSA) ve Avrupa Film Akademisi üyesi. Türkiye\'de casting direktörlüğünü uluslararası standartta kuran isim.',
    venue: 'Pera', duration: '12 hafta', price: 59000,
    priceEarlyBird: 50000, earlyBirdPercent: 15, earlyBirdDeadline: '10 Eylül',
    schedule: [{ place: 'Pera', date: '3 Ekim Cumartesi', time: '11:00' }],
    maxStudents: 14, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Performans', 'Sahne'],
    desc: 'Oyunculuğunu uluslararası bir zeminde denemek isteyenler için on iki haftalık bir uğrak. Profesyonel bir oyuncu da olabilirsiniz, eğitimine devam eden bir öğrenci de, sahneyi merak eden biri de — günlük hayatta kendini ifade edebilecek kadar, B1 seviyesinde İngilizceniz varsa yeterli.\n\nOn iki hafta boyunca iki şey birden çalışıyor: oyuncunun enstrümanı ve dilin pası. Metin seçimi, karakter kurma, prova disiplini — hepsi İngilizce yürüyor. Dil ezberlenen bir replik olmaktan çıkıp oyuncunun aracı hâline geliyor.\n\nProgramın finalinde cast direktörü Harika Uygur ile bir günlük masterclass ve çekim günü var; performanslar kayıt altına alınıp katılımcılara teslim ediliyor.',
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

  // ── 05 — ENGLISH DRAMA YOUTH: 10–17 YAŞ ────────────────────────────
  {
    id: 9, slug: 'english-drama-youth', code: '04',
    title: 'ENGLISH DRAMA YOUTH (10–17)', sub: 'Çocuk ve Gençlere İngilizce Drama',
    tagline: 'Dil Öğretmiyoruz. Dili Deneyimliyoruz.',
    instructor: 'Alara Lokum',
    instructorBio: "Alara Lokum: Şehir Tiyatroları'nda çocuk yaşta başlayan sahne serüvenini Kadir Has Üniversitesi Tiyatro Bölümü'nde akademik temele oturttu. Amerika ve İtalya'daki eğitimleriyle anadil seviyesinde İngilizce hâkimiyeti kazandı. Gençlerle çalışırken İngilizceyi ödev olmaktan çıkarıp sahnede özgür bir ifade aracına dönüştürüyor — gramerden önce cesaret geliyor.",
    venue: 'Pera & Kadıköy', duration: '8 ay · Haftada 1 gün (Eylül–Mayıs)', price: 128000,
    scholarshipPercent: 25,
    schedule: [
      { place: 'Kadıköy', date: '3 Ekim Cumartesi' },
      { place: 'Pera', date: '4 Ekim Pazar', time: '13:00' },
    ],
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Gençler', 'Drama', 'Final Gösterisi', '10–17 Yaş'],
    desc: 'Bu bir İngilizce kursu değil. Dil öğretmiyoruz. Dili deneyimliyoruz. Kitap, sınav ve not yok; sahnede bir durumun içinde olmak ve cevap vermek var. Dil orada, kullanıldığı yerde açılıyor.\n\n10–17 yaş arasındaki gençler için yaratıcı drama ve sahne çalışması. Katılımcının İngilizcesini sıfırdan kurmuyoruz, var olan bilgisini konuşmaya çeviriyoruz — bu yüzden B1 ve üzeri seviye öneriyoruz. Sohbet edebiliyorsa yeterli.\n\nGruplar yaşa göre ayrılır: 10–14 ve 15–17 ayrı sınıflarda çalışır. Ekim–Mayıs, haftada bir gün. Yıl, seyircili bir final gösterisiyle kapanır.',
    aiSummary: 'Dil öğretmiyoruz, dili sahnede deneyimliyoruz: kitap, sınav ve not yok. 10–17 yaş, B1 ve üzeri İngilizce seviyesi önerilir — akıcı olmak gerekmez, sohbet edebilmek yeterli. Ekim–Mayıs, haftada bir gün; yıl, seyircili bir final gösterisi/yıl sonu projesiyle kapanır.',
    blocks: [
      { title: 'Keşif & Oyun', span: 'Ekim–Aralık', body: 'Doğaçlama, beden-ses-hayal gücü egzersizleri. İngilizce dil güveni. Grup dinamiği ve sahne güvencesi.' },
      { title: 'Karakter & Metin', span: 'Ocak–Mart', body: 'Sahne metni çalışması, karakter inşası, partner çalışması. Sözlü ve bedensel anlatım. İngilizce dramatik metin.' },
      { title: 'Final Gösterisi', span: 'Nisan–Mayıs', body: 'Prova süreci ve seyircili final performansı. Gerçek bir sahne deneyimi, gerçek bir seyirciyle.' },
    ],
    images: ['english-drama-youth-01', 'english-drama-4', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-lab', 'english-drama-final-project'],
    seoTitle: 'Gençler İngilizce Tiyatro Kursu İstanbul — 10–17 Yaş Drama',
    seoDesc: 'İstanbul 10–17 yaş İngilizce tiyatro: dil öğretmiyoruz, dili sahnede deneyimliyoruz. Yaratıcı drama ile İngilizce konuşma pratiği — kitap ve sınav yok. B1 ve üzeri. Seyircili final gösterisi. Kadıköy & Pera, 8 ay.',
  },

  // ── 06 — TECHNE MUSICAL LAB ────────────────────────────────────────
  {
    id: 5, slug: 'techne-musical-lab', code: '05',
    title: 'TECHNE MUSICAL LAB', sub: 'Drama · Tiyatro · Müzikal',
    tagline: 'Sahne. Ses. Hareket. — Seyircinin Karşısında.',
    instructor: 'Köksal Ünal & Sitare Bilge',
    instructorBio: 'Köksal Ünal: Oyuncu, yönetmen ve Broadway dans eğitmeni. Sitare Bilge: Ses ve şan eğitmeni, tiyatro müziği uzmanı. İkisi birlikte sahne sanatlarının üç disiplinini tek programda buluşturuyor.',
    venue: 'Kadıköy', duration: '8 ay · Haftada 2 gün (Eylül–Mayıs)', price: 165000,
    scholarshipPercent: 25,
    schedule: [{ place: 'Kadıköy', date: '28 Eylül Pazartesi' }],
    maxStudents: 12, active: true, ageRange: '15–55 yaş',
    category: 'dans-muzikal',
    tags: ['Müzikal', 'Drama', 'Tiyatro', 'Uzun Dönem'],
    desc: 'Drama ve tiyatro temelinin üzerine müzikal sahneleme eklenen 8 aylık kapsamlı program. Oyunculuk egzersizleri ve dramaturgik çalışma ile başlayan program, şan ve dans disiplinleriyle sahne bütünlüğünü tamamlar. Dönem sonunda seyircili bitirme performansıyla kapanır. Program 15–55 yaş arası katılımcılara açıktır. Başvuru için bir müzikal ya da pop şarkının seslendirildiği kısa bir video beklenmektedir; kabul video incelemesiyle yapılır.',
    blocks: [
      { title: 'Drama & Oyunculuk', span: 'Ekim–Aralık', body: 'Sahne varlığı, karakter inşası ve dramaturgik çalışma. Tiyatronun temel araçları: beden, ses ve metin. Şan tekniğiyle buluşan oyuncu sesi.' },
      { title: 'Müzikal Sahneleme', span: 'Ocak–Mart', body: 'Müzikal ritim, Broadway dans temelleri ve sahne uzamı. Drama zeminine oturan koreografi ve müzikal metin çalışması.' },
      { title: 'Bitirme Performansı', span: 'Nisan–Mayıs', body: 'Şarkı kolajı değil, sahnelenmiş bir müzikal. Kostüm, ışık, dekor ve seyirci önünde tam prodüksiyon. Kişisel parça geliştirme ve toplu sahneleme birlikte yürür.' },
    ],
    images: ['musical-01', 'musical-02', 'musical-03', 'dslr-zl5a1045', 'dslr-zl5a1079'],
    seoTitle: 'Müzikal Tiyatro Kursu İstanbul — Oyunculuk, Şan & Dans',
    seoDesc: 'İstanbul müzikal tiyatro kursu: oyunculuk, şan ve dans tek programda. Musical theatre, Broadway repertuarı ve koreografi — Köksal Ünal & Sitare Bilge ile. 15–55 yaş. Seyircili bitirme performansı. Kadıköy.',
  },

  // ── 07 — BROADWAY MUSICAL DANCE ────────────────────────────────────
  {
    id: 6, slug: 'broadway-musical-dance', code: '06',
    title: 'BROADWAY MUSICAL DANCE', sub: 'Broadway Müzikal Dansı',
    tagline: 'Jazz · Theatre Dance · Koreografi',
    instructor: 'Köksal Ünal',
    instructorBio: 'Oyuncu, yönetmen ve Broadway dans eğitmeni. Sahne koreografisi ve tiyatro dansı üzerine kapsamlı deneyim.',
    venue: 'Kadıköy & Taksim', duration: '12 hafta ya da 6 hafta', price: 16500,
    priceShort: 9500, priceShortLabel: '6 hafta', priceLabel: '12 hafta',
    earlyBirdDeadline: '10 Eylül',
    schedule: [
      { place: 'Kadıköy', date: '26 Eylül Cumartesi' },
      { place: 'Taksim Pera', date: '3 Ekim Cumartesi', time: '19:00' },
    ],
    maxStudents: 15, active: true, ageRange: '12–55 yaş',
    category: 'dans-muzikal',
    tags: ['Dans', 'Broadway', 'Koreografi'],
    desc: 'Broadway müzikal tiyatrosunun dans dilini öğreten yoğun program. Jazz ve theatre dance teknikleriyle sahne koreografisi ve kombinasyon çalışması. İki seçenek var: 12 haftalık tam program ya da 6 haftalık kısa program. Program 12–55 yaş arası katılımcılara açıktır. Dans deneyimi şart değil — teknik temelden başlıyoruz.',
    blocks: [
      { title: 'Teknik Temel', span: '1—4. Hafta', body: 'Jazz ve theatre dance temelleri. Beden hizalaması, ritim, koordinasyon ve müzikle ilişki.' },
      { title: 'Koreografi & Stil', span: '5—8. Hafta', body: 'Broadway repertuarından sahneler. Stil çalışması, grup koreografisi ve sahne dinamiği.' },
      { title: 'İleri Koreografi', span: '9—12. Hafta', body: 'Uzun kombinasyonlar, tempo ve senkron çalışması. Repertuvardan seçilen bir koreografinin baştan sona kurulması.' },
    ],
    images: ['dslr-zl5a1044', 'dslr-zl5a1043', 'dslr-zl5a1064', 'dslr-zl5a1092'],
    seoTitle: 'Dans Kursu İstanbul — Broadway Müzikal Dansı & Jazz Dance',
    seoDesc: 'İstanbul dans kursu: Broadway müzikal dansı, jazz dance ve theatre dance. 12 haftalık tam ya da 6 haftalık kısa program. Köksal Ünal ile dans atölyesi — Kadıköy ve Taksim sınıfları. 12–55 yaş, dans deneyimi şart değil.',
  },

  // ── 08 — CAMERA PRAXIS (tarih & fiyat henüz açıklanmadı) ──────────
  {
    id: 2, slug: 'camera-praxis', code: '08',
    title: 'CAMERA PRAXIS', sub: 'Kamera Önü Oyunculuk',
    tagline: 'Karakter · Kamera · Audition',
    instructor: 'Selen Uçer',
    instructorBio: 'Oyuncu ve kamera önü oyunculuk eğitmeni. Sinema, dizi ve tiyatroda uzun yıllara dayanan oyunculuk pratiğini kamera önü tekniğiyle birleştiriyor.',
    venue: 'Pera', duration: '4 hafta', price: 23500,
    priceEarlyBird: 20000, earlyBirdPercent: 15, earlyBirdDeadline: '10 Eylül',
    scheduleNote: 'Tarih yakında açıklanacak',
    maxStudents: 10, active: false,
    category: 'oyunculuk',
    tags: ['Kamera', 'Audition', 'Türkçe & İngilizce'],
    desc: 'Sahne pratiğini kameranın diline çeviren yoğun atölye. Karakter inşası, çerçeve bilinci ve audition teknikleri. Sahnede işleyen oyunculuk kamerada aynı şekilde işlemiyor — bu atölye tam olarak o farkı çalışıyor. Çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor; iki dilde de kamera önü deneyimi kazanıyorsun.',
    blocks: [
      { title: 'Karakter', span: '1. Hafta', body: 'Karakter analizi, hedef ve engel çalışması. Metni kamera için okumak.' },
      { title: 'Kamera', span: '2—3. Hafta', body: 'Çerçeve bilinci, close-up tekniği, enerji yönetimi. Sahnenin büyüklüğünü kameraya göre ayarlamak.' },
      { title: 'Audition', span: '4. Hafta', body: 'Soğuk okuma, casting simülasyonu, self-tape çekimi ve showreel için kayıt.' },
    ],
    seoTitle: 'Kamera Önü Oyunculuk Atölyesi İstanbul — Türkçe & İngilizce',
    seoDesc: 'Selen Uçer ile 4 haftalık kamera önü oyunculuk atölyesi. Türkçe ve İngilizce metinlerle karakter, çerçeve bilinci, audition ve self-tape. Pera, İstanbul.',
  },
]

export const SITE_META = {
  name: 'Techne Lab İstanbul',
  url: 'https://www.technelabistanbul.com',
  description: 'İstanbul\'da bağımsız bir tiyatro. Oyunculuk, yazarlık, dramaturji, dans ve müzikal üzerine yoğun, küçük gruplu atölyeler. Pera ve Kadıköy\'deki üç partner mekânda.',
  instagram: '@technelabistanbul',
  email: 'info@technelabistanbul.com',
  address: 'İstanbul, Türkiye',
  /** Görüntülenen biçim — sayfalarda bu yazılır. */
  phone: '0552 242 59 71',
  /** tel: ve wa.me için E.164 — tek kaynak, WhatsApp butonu da bunu kullanır. */
  phoneE164: '+905522425971',
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
