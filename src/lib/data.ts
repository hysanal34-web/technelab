export type Workshop = {
  id: number; slug: string; code: string
  title: string; sub: string; tagline: string
  instructor: string; instructorBio: string
  venue: string; duration: string; price: number
  priceCash?: number         // peşin / havale fiyatı
  priceShort?: number        // kısa varyant fiyatı (ör. Broadway 6 hafta)
  priceShortLabel?: string   // kısa varyant etiketi ('6 hafta')
  priceLabel?: string        // ana fiyatın etiketi ('12 hafta')
  // Üç kademeli paket modeli (ör. English Drama Lab: 12 / 6 / 4 hafta).
  // price + priceLabel en üst kademe; priceTier2/3 alttaki kademeler.
  priceTier2?: number; priceTier2Label?: string
  priceTier3?: number; priceTier3Label?: string
  monthlyPrice?: number      // aylık taksit
  installments?: number      // max faizsiz taksit sayısı
  // 13 Eylül kararı: erken kayıt indirimi tüm programlarda kaldırıldı.
  // Geriye iki indirim kaldı: arkadaşınla gel %10 ve burs %25.
  friendDiscountPercent?: number
  // Burs (%25) — Techne Musical Lab ve English Drama Youth'ta.
  // Başvuru değerlendirmesiyle veriliyor; kontenjan ya da tarih taahhüdü yok.
  // Sitede yalnızca oran görünür, tutar değil (fiyat gizleme kararı).
  scholarshipPercent?: number
  schedule?: { place?: string; date: string; time?: string }[]  // başlangıç tarih(ler)i
  scheduleNote?: string      // tarih henüz netleşmediyse ("Tarih yakında açıklanacak")
  // price: 0 → fiyat henüz yayınlanmadı; fiyat bloğu gizlenir, CTA "ön kayıt" olur
  maxStudents: number | string; active: boolean; archived?: boolean; nextDate?: string
  /** Henüz açılmamış, duyurulmuş yeni program: "Kayıt Kapalı" yerine "Yakında" + bekleme listesi. */
  yakinda?: boolean
  ageRange?: string          // yaş aralığı olan programlar için ('12–55 yaş')
  // Sahne kartında ve telefon listesinde çip olarak basılan kısa, karar verdiren
  // bilgiler: yaş, dil seviyesi, süre, gün, yer. Grafikte değil, metinde durur.
  facts?: string[]
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
    friendDiscountPercent: 10,
    facts: ['Yetişkin', '3 modül × 8 hafta', 'Modüller ayrı alınır', 'Kadıköy', 'En fazla 10 kişi'],
    schedule: [{ place: 'Kadıköy', date: '7 Ekim’de başladı · katılım açık' }],
    maxStudents: 10, active: true,
    category: 'yazarlık',
    tags: ['Yaratıcı Yazarlık', 'Dramaturji', 'Roman & Senaryo'],
    desc: 'Sophokles\'ten Beckett\'e bir okuma hattı: metinlerin nasıl kurulduğunu, anlatının yüzyıllar içinde neyi bıraktığını izliyoruz. Teknikle değil, bir metnin neden işlediğini görmekle başlıyoruz — o bakış yerleştiğinde biçim ikincil kalıyor; roman, senaryo ve oyun aynı zeminden besleniyor.\n\nÜç modül, her biri sekiz hafta. Ayrı ayrı alınabilir.',
    blocks: [
      {
        title: '1. Modül: Antikten Moderne',
        span: '1—8. Hafta',
        body: 'Sophokles\'ten Ibsen\'e dramatik yapının temelleri: metin analizi, karakter arkı, çatışma ve alt metin.',
      },
      {
        title: '2. Modül: Çağdaş Yazın',
        span: '9—16. Hafta',
        body: 'Beckett, Kane, Zeller, Williams. Parçalanmış yapılar ve çoğul anlatı — çağdaş dramaturjiye bir bakış.',
      },
      {
        title: '3. Modül: Kendi Sesin',
        span: '17—24. Hafta',
        body: 'Kişisel yazarlık sesinin keşfi. Kısa oyun taslakları ve dramaturgik geri bildirim.',
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
    friendDiscountPercent: 10,
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

  // ── 02 — ENGLISH DRAMA LAB (Yetişkin · paket sistemi) ─────────────
  {
    id: 3, slug: 'english-drama-lab', code: '02',
    title: 'ENGLISH DRAMA LAB', sub: 'Yetişkinlere İngilizce Drama',
    tagline: 'Dil Öğretmiyoruz. Dili Deneyimliyoruz.',
    instructor: 'Alara Lokum, Ece Ertez & Yeşim Çelebi',
    instructorBio: "Alara Lokum: Şehir Tiyatroları'nda başlayan sahne pratiğini Kadir Has Üniversitesi Tiyatro Bölümü'nde akademik temele oturttu; Amerika ve İtalya'daki eğitimleriyle anadil seviyesinde İngilizce hâkimiyeti kazandı. Ece Ertez: Oyunculuk pratiğini Şahika Tekand Studio Oyuncuları'nın fiziksel tiyatro ekolünde inşa etti; Şahmaran ve Erşan Kuneri gibi projelerde yer aldı, Chubbuck Metodu'nda uzmanlaştı. Yeşim Çelebi: Yale Üniversitesi Tiyatro ve Performans Sanatları mezunu; LAMDA disiplini ile Stella Adler ve Lee Strasberg metotlarını Bahar, Kızılcık Şerbeti ve Mezarlık gibi yapımlardaki set deneyimiyle birleştiriyor.",
    // 7 Eylül: aylık katılım modelinden üç kademeli pakete geçildi.
    // 17 Eylül: kademeler 12/6/4 → 12/8/4 haftaya çekildi, fiyatlar güncellendi.
    // Aylık birim 8.500 (KDV dahil): 4 hafta 8.500 · 8 hafta 17.000 · 12 hafta 21.000 (%18 taahhüt indirimi).
    // price/priceLabel en üst kademe (12 hafta); priceTier2/3 alttaki kademeler.
    // 14 Ekim 2026: paket modelinden esnek katılıma geçildi. Her hafta oyuna dahil olunabiliyor.
    // 1 katılım 2.000 · 4 katılım 7.000 + KDV · 8 katılım 12.500 + KDV. İlk katılımdan sonra devam edilirse
    // ödenen ücret paket bakiyesinden düşülür. Aşağıdaki tutarlar KDV dahil (price en üst kademe).
    venue: 'Pera & Kadıköy', duration: 'Esnek · 1, 4 ya da 8 katılım', price: 15000,
    priceLabel: '8 katılım', priceTier2: 8400, priceTier2Label: '4 katılım',
    priceTier3: 2000, priceTier3Label: '1 katılım',
    friendDiscountPercent: 10,
    facts: ['Yetişkin', 'B1+ İngilizce', 'Esnek katılım', 'Pera & Kadıköy', 'En fazla 12 kişi'],
    schedule: [
      { place: 'Pera', date: '3 Ekim’de başladı · katılım açık', time: '15:00' },
      { place: 'Kadıköy', date: '14 Eylül’de başladı · katılım açık', time: '20:00' },
    ],
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Yaratıcı Drama', 'Doğaçlama'],
    desc: 'İngilizce, yaratıcı drama egzersizleri ve doğaçlamalar yoluyla bedene ve sese yerleşir. Metin ezberi yok — anlık tepki ve hayal gücü var. Bir konuşma kulübünün pratiğini sahnede, bedenle yapıyoruz.\n\n"Anlıyorum ama konuşamıyorum" diyorsan doğru yerdesin. Sıfırdan İngilizce öğretmiyoruz; var olan ama uyuyan birikimi sahnede çalıştırıyoruz. Sohbet edebiliyorsan seviyen yeterli.\n\nProgram esnek: her hafta yeni bir sahne kuruluyor, istediğin hafta oyuna dahil olabilirsin. Tek katılımla başlayıp 4 ya da 8 katılımlık paketle devam edebilirsin; ilk katılımın ücreti paket bakiyenden düşülür.',
    blocks: [
      { title: 'Isınma & Keşif', span: 'Eksen 01', body: 'Oyun ve güven egzersizleri, dil oyunları. İngilizce sezginin açılması.' },
      { title: 'Doğaçlama & Karakter', span: 'Eksen 02', body: 'Anlık sahne çalışması, status oyunları. Dili düşünmeden konuşmak.' },
      { title: 'Sahne & Bütünleşme', span: 'Eksen 03', body: 'Grup doğaçlamaları, partner çalışması. Araçların sahnede birleşmesi.' },
    ],
    images: ['english-drama-16', 'english-drama-1', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-final-project', 'english-drama-youth', 'a1-english-drama-lab'],
    seoTitle: 'İngilizce Drama & Konuşma Kulübü İstanbul — English Drama Lab',
    seoDesc: 'İngilizce drama atölyesi İstanbul: yaratıcı drama ve doğaçlamayla konuşma kulübü pratiği. English drama course, İngilizce konuşma pratiği — Pera ve Kadıköy. 12 kişilik gruplar, her hafta katılınabilen esnek program.',
  },

  // ── A1+ ENGLISH DRAMA LAB (28 Ekim 2026 · yakında) ───────────────
  // İngilizceye yeni başlayanlar. 12 hafta · haftada 2 saat. Günler, eğitmen kadrosu ve
  // kontenjan henüz netleşmedi: netleşince schedule eklenir, active: true yapılır.
  // Dil kuralı: "akıcı İngilizce" / "akıcılık" vaadi YOK (24 saat; Cambridge'e göre
  // sıfırdan A2 ~180–200 rehberli saat). Vaat: konuşmaya başlamak.
  {
    id: 10, slug: 'a1-english-drama-lab', code: '09',
    title: 'A1+ ENGLISH DRAMA LAB', sub: 'Yeni Başlayan Yetişkinlere İngilizce Drama',
    tagline: 'Önce Beden ve Durum, Sonra Kelime.',
    instructor: 'Techne Lab eğitmen ekibi',
    instructorBio: 'Konservatuvar mezunu eğitmenler. Bu grubun eğitmen kadrosu dönem açılırken duyurulacak.',
    venue: 'Pera & Kadıköy', duration: '12 hafta · haftada 2 saat', price: 0,
    facts: ['Yetişkin', 'A1+ · yeni başlayanlar', '12 hafta', 'Haftada 2 saat', 'Pera & Kadıköy', 'Yakında'],
    scheduleNote: 'Yakında · günler netleşiyor',
    maxStudents: 'Küçük grup', active: false, yakinda: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Başlangıç', 'A1', 'Drama', 'Yetişkin'],
    desc: "İngilizceye yeni başlayanlar için bir dil okulu sınıfı değil, bir tiyatro topluluğunun provası. Önce beden ve durum, sonra kelime: bir şey isterken, reddederken, ararken söylenen cümle bir sahneye ve bir bedene bağlanır.\n\nOn iki hafta, haftada iki saat. Gündelik hayatın en çok kullanılan kalıplarını (kendini tanıtmak, bir şey istemek, yön sormak, özür dilemek, teşekkür etmek) önce duyuyor, hareketle karşılıyor, sonra bir karakterin ağzından farklı durumlarda tekrar tekrar söylüyorsun. İlk haftalarda dinlemek ve hareketle cevap vermek yeterli; konuşmaya hazır olduğunda konuşursun.\n\nAkıcılık vaat etmiyoruz. Cambridge'e göre sıfırdan A2'ye yaklaşık 180–200 rehberli saat gerekiyor; bu program 24 saat. Vaadimiz ilk basamak: çalıştığımız kalıpları daha az duraksayarak söylemek, İngilizce konuşmaya daha istekli olmak ve kısa bir sahneyi İngilizce oynayabilmek. Günler netleşiyor; bekleme listesine yazılana ilk haber verilir.",
    aiSummary: "A1+ English Drama Lab: Techne Lab İstanbul'un İngilizceye yeni başlayan yetişkinler için açacağı İngilizce drama atölyesi. 12 hafta, haftada 2 saat (toplam 24 saat), Pera ve Kadıköy. Durum: yakında; günler netleşmedi, bekleme listesi açık. Yöntem: komutları duyup bedenle karşılamak (TPR'den gelen bir başlangıç), gündelik kalıpları durum ve karakter içinde tekrar etmek, kısa sahneler. Akıcılık ya da seviye atlama vaat etmez; hedef konuşmaya başlamak. Ayrıca 8–12 ve 13–17 yaş için A1+ English Drama Youth grupları açılacak. İngilizcesi sohbet düzeyinde (B1+) olanlar için English Drama Lab var.",
    blocks: [
      { title: 'Dinle & Karşıla', span: 'İlk haftalar', body: 'Ritim, isim ve ses oyunları. Komutları duyup bedenle karşılamak. Konuşma zorunluluğu yok; dinlemek ve hareketle cevap vermek de çalışmaya dahil.' },
      { title: 'Kalıp & Durum', span: 'Süreç', body: 'Kendini tanıtma, istek, ret, soru, teşekkür. Her kalıp bir durumun içinde, partnerle ve tekrar tekrar. Yapılar sahnede görünür; kuralı ihtiyaç duyulduğunda konuşuruz.' },
      { title: 'Karakter & Sahne', span: 'Son haftalar', body: 'Aynı kalıplar farklı karakterlerin ağzından. Kısa, yarı doğaçlama İngilizce sahneler; takıldığında sahne durmaz, sen de durmazsın.' },
      { title: 'Ne Beklenmez', span: 'Dürüst not', body: 'Akıcılık, seviye atlama, sınav hazırlığı ya da sistematik gramer anlatımı. 24 saat bir seviye değil, ilk basamak. Dil okulu, uygulama ya da kendi çalışmanla birlikte en iyi sonucu verir.' },
    ],
    images: ['english-drama-1', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['a1-english-drama-youth', 'english-drama-lab'],
    seoTitle: 'Sıfırdan İngilizce, Drama ile — A1+ English Drama Lab',
    seoDesc: 'İngilizceye yeni başlayan yetişkinler için İngilizce drama: 12 hafta, haftada 2 saat, Pera ve Kadıköy. Akıcılık vaadi yok; konuşmaya başlamak var. Yakında.',
  },

  // ── A1+ ENGLISH DRAMA YOUTH: 8–12 · 13–17 (28 Ekim 2026 · yakında) ──
  {
    id: 11, slug: 'a1-english-drama-youth', code: '10',
    title: 'A1+ ENGLISH DRAMA YOUTH', sub: 'İngilizceye Yeni Başlayan Çocuk ve Gençler',
    tagline: 'Önce Oyun, Sonra Kelime.',
    instructor: 'Techne Lab eğitmen ekibi',
    instructorBio: 'Konservatuvar mezunu eğitmenler. Bu grupların eğitmen kadrosu dönem açılırken duyurulacak.',
    venue: 'Pera & Kadıköy', duration: '12 hafta · haftada 2 saat', price: 0,
    ageRange: '8–12 ve 13–17 yaş (ayrı gruplar)',
    facts: ['8–12 yaş', '13–17 yaş', 'A1+ · yeni başlayanlar', '12 hafta', 'Haftada 2 saat', 'Pera & Kadıköy', 'Yakında'],
    scheduleNote: 'Yakında · günler netleşiyor',
    maxStudents: 'Küçük grup', active: false, yakinda: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Başlangıç', 'A1', 'Çocuk', 'Gençler', 'Drama'],
    desc: "İngilizceye yeni başlayan çocuk ve gençler için İngilizce drama. Kitap, sınav ve not yok; oyun, hareket ve küçük sahneler var. Gruplar yaşa göre ayrı: 8–12 ve 13–17.\n\nOn iki hafta, haftada iki saat. Çocuk önce duyar, bedeniyle karşılık verir, sonra kalıpları bir oyunun ve bir karakterin içinde tekrar tekrar söyler. Konuşmaya zorlanmaz; ilk haftalarda dinlemek ve hareketle katılmak yeterli.\n\nVelilere dürüst not: 12 haftada akıcılık ya da seviye atlama vaat etmiyoruz. Beklediğimiz değişiklik, çalışılan kalıpları daha rahat söylemek, İngilizce konuşmaya daha istekli olmak ve kısa bir sahneyi İngilizce oynayabilmek. Çocuğunuz İngilizce sohbet edebiliyorsa (B1+) English Drama Youth daha uygun. Günler netleşiyor; bekleme listesine yazılana ilk haber verilir.",
    aiSummary: "A1+ English Drama Youth: Techne Lab İstanbul'un İngilizceye yeni başlayan 8–12 ve 13–17 yaş için açacağı İngilizce drama grupları (yaş grupları ayrı). 12 hafta, haftada 2 saat, Pera ve Kadıköy. Durum: yakında; günler netleşmedi, bekleme listesi açık. Kitap, sınav ve not yok; oyun, hareket, kalıp ifadeler ve kısa sahneler. Akıcılık ya da seviye atlama vaat edilmez. İngilizcesi sohbet düzeyinde (B1+) olan 8–17 yaş için ayrı program: English Drama Youth.",
    blocks: [
      { title: 'Oyun & Dinleme', span: 'İlk haftalar', body: 'İsim, ritim ve hareket oyunları. Komutu duy, bedeninle cevap ver. Konuşmaya zorlamak yok; sessiz katılım da katılım.' },
      { title: 'Kalıp & Karakter', span: 'Süreç', body: 'Selamlaşma, istek, soru, duygu. Kalıplar bir oyunun ve bir karakterin içinde tekrar tekrar söylenir; dil ödev olmaktan çıkar.' },
      { title: 'Küçük Sahneler', span: 'Son haftalar', body: 'Grupla kurulan kısa İngilizce sahneler. Hata sahnenin parçası: takılan durmaz, oyun devam eder.' },
      { title: 'Velilere Not', span: 'Yaş & Seviye', body: '8–12 ve 13–17 ayrı çalışır. Seviye sınavı yok. İngilizcesi sohbet düzeyindeyse B1+ English Drama Youth programına yönlendiririz.' },
    ],
    images: ['english-drama-youth-01', 'english-drama-4', 'english-drama-2', 'english-drama-3'],
    edlFamily: ['a1-english-drama-lab', 'english-drama-youth'],
    seoTitle: 'Çocuklar İçin Başlangıç İngilizce Drama — 8–12 · 13–17',
    seoDesc: 'İngilizceye yeni başlayan 8–12 ve 13–17 yaş için İngilizce drama: oyun, hareket, kısa sahneler. 12 hafta, haftada 2 saat, Pera ve Kadıköy. Yakında.',
  },

  // ── 04 — ENGLISH ACTING PRAXIS ─────────────────────────────────────
  {
    id: 8, slug: 'english-drama-final-project', code: '03',
    title: 'ENGLISH ACTING PRAXIS', sub: 'Ece Ertez · Harika Uygur Masterclass',
    tagline: 'Oyunculuğunu Uluslararası Arenaya Taşımak İsteyenler İçin',
    instructor: 'Ece Ertez',
    instructorBio: 'Eğitmen: Ece Ertez — Oyuncu ve İngilizce tiyatro eğitmeni. İngilizce sahne oyunculuğu ve metin çalışması üzerine uzmanlaşmış pratisyen.\n\nCast Direktörü / Süpervizör: Harika Uygur — Avrupa\'nın en iyi cast direktörü seçilen (ICDN, "Mustang"), Amerikan Film Akademisi (AMPAS), Casting Society of America (CSA) ve Avrupa Film Akademisi üyesi. Türkiye\'de casting direktörlüğünü uluslararası standartta kuran isim.',
    venue: 'Pera', duration: '12 hafta', price: 59000,
    friendDiscountPercent: 10, scholarshipPercent: 25,
    facts: ['Yetişkin', 'B1+ İngilizce', '12 hafta', 'Pera', 'Masterclass + çekim günü', 'En fazla 14 kişi'],
    schedule: [{ place: 'Pera', date: '3 Ekim’de başladı · katılım açık', time: '11:00' }],
    maxStudents: 14, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Performans', 'Sahne'],
    desc: 'Oyunculuğunu uluslararası bir zeminde denemek isteyenler için on iki haftalık bir uğrak. Profesyonel bir oyuncu da olabilirsiniz, eğitimine devam eden bir öğrenci de, sahneyi merak eden biri de — B1 seviyesinde İngilizceniz yeterli.\n\nOn iki hafta boyunca iki şey birden çalışıyor: oyuncunun enstrümanı ve dilin pası. Metin seçimi, karakter kurma, prova disiplini — hepsi İngilizce yürüyor.\n\nFinalde cast direktörü Harika Uygur ile bir günlük masterclass ve çekim günü var; performanslar kayıt altına alınıp katılımcılara teslim ediliyor.',
    blocks: [
      { title: 'Metin & Karakter', span: '1—4. Hafta', body: 'Metin seçimi, analiz, karakter motivasyonu. Alt metin ve sahne niyeti.' },
      { title: 'Prova Süreci', span: '5—8. Hafta', body: 'Partner çalışması, blocking, sahne dinamiği.' },
      { title: 'Bütünleşme & Harika Uygur Masterclass', span: '9—12. Hafta', body: 'Kişisel geri bildirim. Finalde cast direktörü Harika Uygur\'un bir günlük masterclass ve çekim günü: canlı performanslar kayıt altına alınıp teslim edilir.' },
    ],
    images: ['english-acting-praxis-poster', 'english-drama-11', 'english-drama-12', 'english-drama-13', 'english-drama-15'],
    edlFamily: ['english-drama-lab', 'english-drama-youth'],
    seoTitle: 'İngilizce Oyunculuk Atölyesi İstanbul — English Acting Praxis',
    seoDesc: 'İngilizce acting workshop İstanbul: 12 hafta metin analizi, karakter ve prova disiplini. English acting kursu, Ece Ertez ile — Harika Uygur masterclass finali. Pera, Beyoğlu.',
  },

  // ── 05 — ENGLISH DRAMA YOUTH: 8–17 YAŞ ────────────────────────────
  {
    id: 9, slug: 'english-drama-youth', code: '04',
    title: 'ENGLISH DRAMA YOUTH (8–17)', sub: 'Çocuk ve Gençlere İngilizce Drama',
    tagline: 'Dil Öğretmiyoruz. Dili Deneyimliyoruz.',
    instructor: 'Alara Lokum',
    instructorBio: "Alara Lokum: Şehir Tiyatroları'nda çocuk yaşta başlayan sahne serüvenini Kadir Has Üniversitesi Tiyatro Bölümü'nde akademik temele oturttu. Amerika ve İtalya'daki eğitimleriyle anadil seviyesinde İngilizce hâkimiyeti kazandı. Gençlerle çalışırken İngilizceyi ödev olmaktan çıkarıp sahnede özgür bir ifade aracına dönüştürüyor — gramerden önce cesaret geliyor.",
    venue: 'Pera & Kadıköy', duration: '8 ay · Haftada 1 gün (Ekim–Mayıs)', price: 125000,
    friendDiscountPercent: 10, installments: 8,
    facts: ['8–17 yaş', 'B1+ İngilizce', '8 ay · Ekim–Mayıs', 'Haftada 1 gün', 'Pera & Kadıköy', 'Seyircili final gösterisi'],
    schedule: [
      // 22 Ekim 2026 (Yağız): Pera grubu başladı ama seansa misafir alınıp sonra kayıt
      // yapılıyor, bu yüzden "katılım açık" kalıyor. Tanışma: her Pazar 13:00 Pera.
      { place: 'Pera', date: '4 Ekim’de başladı · katılım açık', time: '13:00' },
      // 22 Ekim 2026 (Yağız): Kadıköy grubu 24 Ekim Cumartesi başladı.
      // 26 Ekim 2026: tarih geçti, Pera ile aynı ifadeye çekildi. Seansa misafir alınıp
      // sonra kayıt yapılıyor; tanışma her Cumartesi 15:00 (sessions.ts → youth-kadikoy-cmt).
      { place: 'Kadıköy', date: '24 Ekim’de başladı · katılım açık', time: '15:00' },
    ],
    maxStudents: 12, active: true,
    category: 'ingilizce-drama',
    tags: ['İngilizce', 'Gençler', 'Drama', 'Final Gösterisi', '8–17 Yaş'],
    desc: "8–17 yaş için Türkiye'nin ilk İngilizce drama ve yaratıcılık programı. Dil öğretmiyoruz, dili deneyimliyoruz: kitap, sınav ve not yok; sahnede bir durumun içinde olmak ve cevap vermek var.\n\nB1 ve üzeri seviye öneriyoruz. Seviye tespit sınavı yok; günlük hayatta kendini rahatça ifade edebiliyorsa uygundur. Gruplar yaşa göre ayrılır: 8–14 ve 15–17 ayrı sınıflarda. Ekim–Mayıs, haftada bir gün; yıl, seyircili ve tamamen İngilizce bir gösteriyle kapanır.\n\nHer ayın ilk üç haftası drama, son haftası konuk atölye: yaratıcı yazarlık, tasarım ve jazz dance dönüşümlü gelir. Çocukların ürettiği metinler, tasarımlar ve hareket parçaları yıl sonu gösterisinin malzemesi olur.",
    aiSummary: "8–17 yaş için Türkiye'nin ilk İngilizce drama ve yaratıcılık programı. Dil öğretmiyoruz, dili sahnede deneyimliyoruz: kitap, sınav ve not yok. B1 ve üzeri İngilizce seviyesi önerilir; seviye sınavı yok, sohbet edebilmek yeterli. Gruplar 8–14 ve 15–17 ayrı. Ekim–Mayıs, haftada bir gün: her ay üç hafta drama, son hafta konuk atölye (yaratıcı yazarlık, tasarım, jazz dance). Provalar 5. aydan itibaren; Mayıs'ta seyircili, tamamen İngilizce yıl sonu gösterisi.",
    blocks: [
      { title: 'Nasıl İşliyor', span: 'Her ay', body: 'İlk üç hafta drama: yaratıcı drama, doğaçlama, bireysel ve ensemble çalışma. Ayın son haftası konuk atölye: yaratıcı yazarlık, tasarım ve jazz dance dönüşümlü gelir. Her atölye küçük bir üretim ödeviyle kapanır.' },
      { title: 'Keşif & Oyun', span: '1–3. Ay · Ekim–Aralık', body: 'Grup dinamiği, güven, doğaçlama oyunları. Beden, ses ve hayal gücü egzersizleri; hikâye anlatımı; ensemble doğaçlamaları. Konuk atölyeler: karakterine kısa hikâye yazma, karakter ve maske tasarımı, ritim ve ensemble hareket.' },
      { title: 'Karakter & Metin', span: '4. Ay · Ocak', body: 'İngilizce sahne metni, karakter inşası, partner çalışması. Sahne yazımı atölyesi. Ay sonunda tüm üretimler sanatçılara gider: gösteri malzemesinin ilk derlemesi.' },
      { title: 'Prova & Sahneleme', span: '5–7. Ay · Şubat–Nisan', body: 'Çocukların üretimlerinden seçilen sahnelerle provalar başlar. Sahne geçişleri, ensemble sahneleri, gösteri koreografisi; dekor ve kostüm eskizleri. Nisan\'da tüm ekiple ortak prova atölyesi: metin, tasarım ve hareket tek gösteride birleşir.' },
      { title: 'Yıl Sonu Gösterisi', span: '8. Ay · Mayıs', body: 'Genel prova, teknik prova ve seyircili, tamamen İngilizce yıl sonu gösterisi. Aileler ve seyirci davetli; tarih ve mekân sezon içinde velilerle paylaşılır.' },
      { title: 'Velilere Not', span: 'Seviye & Grup', body: 'Seviye tespit sınavı yok; ailenin dil beyanı yeterli (B1 ve üzeri). Kitap, sınav ve not yok. Aradığımız mükemmel İngilizce değil, hata yapma özgürlüğü. Gruplar 8–14 ve 15–17 olarak ayrı çalışır.' },
    ],
    images: ['english-drama-youth-01', 'english-drama-4', 'english-drama-2', 'english-drama-3', 'english-drama-5'],
    edlFamily: ['english-drama-lab', 'english-drama-final-project', 'a1-english-drama-youth'],
    seoTitle: 'Gençler İngilizce Tiyatro Kursu İstanbul — 8–17 Yaş Drama',
    seoDesc: "İstanbul 8–17 yaş İngilizce tiyatro: Türkiye'nin ilk İngilizce drama ve yaratıcılık programı. Dil öğretmiyoruz, dili sahnede deneyimliyoruz; kitap ve sınav yok. B1 ve üzeri. Seyircili final gösterisi. Kadıköy & Pera, 8 ay.",
  },

  // ── 06 — TECHNE MUSICAL LAB ────────────────────────────────────────
  {
    id: 5, slug: 'techne-musical-lab', code: '05',
    title: 'TECHNE MUSICAL LAB', sub: 'Drama · Tiyatro · Müzikal',
    tagline: 'Sahne. Ses. Hareket. — Seyircinin Karşısında.',
    instructor: 'Köksal Ünal & Beril Korkmaz',
    instructorBio: 'Köksal Ünal: Oyuncu, yönetmen ve Broadway dans eğitmeni. Beril Korkmaz: İstanbul Üniversitesi Devlet Konservatuvarı Müzikal Tiyatro mezunu; Araf Müzikali, Jekyll ve Hyde ve Damdaki Kemancı gibi müzikallerde sahne aldı, şan ve müzikal oyunculuk çalışıyor. İkisi birlikte oyunculuk, şan ve dans disiplinlerini tek programda buluşturuyor.',
    venue: 'Kadıköy', duration: '8 ay · Haftada 2 gün (Ekim–Mayıs)', price: 135000,
    friendDiscountPercent: 10, installments: 6,
    facts: ['15–55 yaş', '8 ay · Ekim–Mayıs', 'Haftada 2 gün', 'Kadıköy', 'Video ile başvuru', 'Yıl sonu gösterisi'],
    schedule: [{ place: 'Kadıköy', date: '12 Ekim’de başladı · katılım açık' }],
    maxStudents: 12, active: true, ageRange: '15–55 yaş',
    category: 'dans-muzikal',
    tags: ['Müzikal', 'Drama', 'Tiyatro', 'Uzun Dönem'],
    desc: 'Oyunculuk, şan, vokal koçluğu ve dansı tek çatı altında birleştiren kapsamlı bir müzikal tiyatro eğitimi. Sekiz ay boyunca sahne varlığından şarkı söylemeye, vokal teknikten Broadway dansına kadar müzikal sahnelemenin bütün bileşenlerini çalışıyoruz. Dönem, seyircili bir yıl sonu gösterisiyle kapanıyor.\n\n15–55 yaş arası. Başvuru için bir müzikal ya da pop şarkının seslendirildiği kısa bir video beklenir; kabul video incelemesiyle yapılır.',
    blocks: [
      { title: 'Oyunculuk & Şan', span: 'Ekim–Aralık', body: 'Sahne varlığı, karakter inşası ve vokal teknik. Şan ve vokal koçluğuyla buluşan oyuncu sesi.' },
      { title: 'Müzikal Sahneleme', span: 'Ocak–Mart', body: 'Müzikal ritim, Broadway dans temelleri. Şarkı ve sahne hareketinin birleştiği koreografi.' },
      { title: 'Yıl Sonu Gösterisi', span: 'Nisan–Mayıs', body: 'Sahnelenmiş bir müzikal — kostüm, ışık, dekor, seyirci önünde tam prodüksiyon.' },
    ],
    images: ['musical-01', 'musical-02', 'musical-03', 'dslr-zl5a1045', 'dslr-zl5a1079'],
    seoTitle: 'Techne Musical Lab — 8 Aylık Müzikal Programı, Kadıköy',
    seoDesc: 'Techne Musical Lab: oyunculuk, şan ve dans tek programda, 8 ay, haftada 2 gün. Musical theatre, Broadway repertuarı ve koreografi — Köksal Ünal & Beril Korkmaz ile. 15–55 yaş. Seyircili yıl sonu gösterisi. Kadıköy.',
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
    friendDiscountPercent: 10,
    facts: ['12–55 yaş', '12 ya da 6 hafta', 'Kadıköy & Taksim', 'Deneyim şart değil', 'En fazla 15 kişi'],
    schedule: [
      { place: 'Taksim Pera', date: '3 Ekim’de başladı · katılım açık', time: '19:00' },
      { place: 'Kadıköy', date: 'Yakında · tarih için DM' },
    ],
    maxStudents: 15, active: true, ageRange: '12–55 yaş',
    category: 'dans-muzikal',
    tags: ['Dans', 'Broadway', 'Koreografi'],
    desc: 'Broadway müzikal tiyatrosunun dans dilini öğreten yoğun program. Jazz ve theatre dance teknikleriyle sahne koreografisi. İki seçenek var: 12 haftalık tam program ya da 6 haftalık kısa program.\n\n12–55 yaş. Dans deneyimi şart değil — teknik temelden başlıyoruz.',
    blocks: [
      { title: 'Teknik Temel', span: '1—4. Hafta', body: 'Jazz ve theatre dance temelleri. Beden hizalaması, ritim, koordinasyon.' },
      { title: 'Koreografi & Stil', span: '5—8. Hafta', body: 'Broadway repertuarından sahneler. Stil çalışması, grup koreografisi.' },
      { title: 'İleri Koreografi', span: '9—12. Hafta', body: 'Uzun kombinasyonlar, tempo ve senkron çalışması.' },
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
    friendDiscountPercent: 10,
    scheduleNote: 'Tarih yakında açıklanacak',
    maxStudents: 10, active: false,
    category: 'oyunculuk',
    tags: ['Kamera', 'Audition', 'Türkçe & İngilizce'],
    desc: 'Sahne pratiğini kameranın diline çeviren yoğun atölye. Karakter inşası, çerçeve bilinci ve audition teknikleri — hem Türkçe hem İngilizce metinlerle.',
    blocks: [
      { title: 'Karakter', span: '1. Hafta', body: 'Karakter analizi, hedef ve engel çalışması. Metni kamera için okumak.' },
      { title: 'Kamera', span: '2—3. Hafta', body: 'Çerçeve bilinci, close-up tekniği, enerji yönetimi. Sahnenin büyüklüğünü kameraya göre ayarlamak.' },
      { title: 'Audition', span: '4. Hafta', body: 'Soğuk okuma, casting simülasyonu, self-tape çekimi ve showreel için kayıt.' },
    ],
    // 7 Ekim 2026: başlık marka öne alındı. "kamera önü oyunculuk kursu istanbul" sorgusunu
    // /kamera-onu-oyunculuk-istanbul hub'ı hedefliyor; iki sayfa aynı başlıkla yarışmasın.
    seoTitle: 'Camera Praxis: Selen Uçer ile Kamera Önü Oyunculuk Atölyesi (Pera)',
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
  // 22 Ekim 2026: stüdyo arşivinden 12 yeni kare (atolye-01 … atolye-12).
  // Akışa serpiştirildi; Gallery.tsx oranı sıra numarasından türetiyor, bu yüzden
  // hepsini sona eklemek "eski blok + yeni blok" görüntüsü yaratırdı.
  { src: '/images/gallery/atolye-01.jpg', alt: 'Atölyede hareket çalışması', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-02.jpg', alt: 'Burcu Halaçoğlu ile Mevcudiyet', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1094.jpg', alt: 'Techne Lab atölye anı', category: 'atölye' },
  { src: '/images/gallery/english-drama-2.jpg', alt: 'English Drama Lab atölyesi', category: 'english' },
  { src: '/images/gallery/mevcudiyet-03.jpg', alt: 'Presence atölyesi', category: 'atölye' },
  { src: '/images/gallery/atolye-02.jpg', alt: 'İkili sahne çalışması', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1091.jpg', alt: 'Techne Lab performans', category: 'performans' },
  { src: '/images/gallery/mevcudiyet-04.jpg', alt: 'Beden farkındalığı çalışması', category: 'atölye', wide: true },
  { src: '/images/gallery/english-drama-3.jpg', alt: 'English Drama Lab sahne', category: 'english', wide: true },
  { src: '/images/gallery/atolye-03.jpg', alt: 'Stüdyoda pencere kenarı', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-05.jpg', alt: 'Mevcudiyet — sahne pratiği', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1092.jpg', alt: 'Sahne çalışması', category: 'performans' },
  { src: '/images/gallery/mevcudiyet-06.jpg', alt: 'Mevcudiyet atölyesi', category: 'atölye' },
  { src: '/images/gallery/atolye-04.jpg', alt: 'Perde önünde bekleyiş', category: 'atölye' },
  { src: '/images/gallery/auteur-01.jpg', alt: 'The Auteur Lab atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/mevcudiyet-07.jpg', alt: 'Presence çalışması', category: 'atölye' },
  { src: '/images/gallery/atolye-05.jpg', alt: 'Grup sahne çalışması', category: 'atölye' },
  { src: '/images/gallery/english-drama-4.jpg', alt: 'English Drama Lab grup', category: 'english' },
  { src: '/images/gallery/mevcudiyet-08.jpg', alt: 'Beden ve ses atölyesi', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1044.jpg', alt: 'Oyunculuk atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/atolye-06.jpg', alt: 'Stüdyoda oyuncu portresi', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-09.jpg', alt: 'Mevcudiyet pratik', category: 'atölye' },
  { src: '/images/gallery/auteur-02.jpg', alt: 'Halil Yağız Şanal ile Auteur Lab', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-010.jpg', alt: 'Presence sahne', category: 'atölye' },
  { src: '/images/gallery/atolye-07.jpg', alt: 'Beden ve ses ısınması', category: 'atölye' },
  { src: '/images/gallery/english-drama-5.jpg', alt: 'English Drama Lab pratik', category: 'english' },
  { src: '/images/gallery/dslr-zl5a1043.jpg', alt: 'Atölye pratiği', category: 'atölye' },
  { src: '/images/gallery/atolye-08.jpg', alt: 'Atölye arası', category: 'atölye' },
  { src: '/images/gallery/mevcudiyet-012.jpg', alt: 'Mevcudiyet grup çalışması', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1079.jpg', alt: 'Techne Lab performans anı', category: 'performans' },
  { src: '/images/gallery/mevcudiyet-013.jpg', alt: 'Sahne farkındalığı', category: 'atölye' },
  { src: '/images/gallery/atolye-09.jpg', alt: 'Sahne öncesi hazırlık', category: 'atölye' },
  { src: '/images/gallery/auteur-03.jpg', alt: 'Dramaturji laboratuvarı', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1077.jpg', alt: 'Atölye anı', category: 'atölye' },
  { src: '/images/gallery/atolye-10.jpg', alt: 'Atölyede mola', category: 'atölye' },
  { src: '/images/gallery/auteur-04.jpg', alt: 'Dramaturji & Oyunculuk atölyesi', category: 'atölye', wide: true },
  { src: '/images/gallery/dslr-zl5a1076.jpg', alt: 'The Auteur Lab', category: 'atölye' },
  { src: '/images/gallery/musical-01.jpg', alt: 'Techne Musical Lab', category: 'performans', wide: true },
  { src: '/images/gallery/atolye-11.jpg', alt: 'Metin üzerine konuşma', category: 'atölye' },
  { src: '/images/gallery/dslr-zl5a1075.jpg', alt: 'Techne Lab atölye mekânı', category: 'atölye' },
  { src: '/images/gallery/musical-02.jpg', alt: 'Musical Lab sahne', category: 'performans' },
  { src: '/images/gallery/dslr-zl5a1045.jpg', alt: 'Yazarlık laboratuvarı', category: 'atölye' },
  { src: '/images/gallery/atolye-12.jpg', alt: 'Stüdyoda oyuncu', category: 'atölye' },
  { src: '/images/gallery/musical-03.jpg', alt: 'Musical Lab performans', category: 'performans' },
  { src: '/images/gallery/english-drama-16.jpg', alt: 'English Drama Lab — stüdyoda çember çalışması', category: 'english', wide: true },
  { src: '/images/gallery/english-drama-17.jpg', alt: 'English Drama Lab — sahne üzerinde çalışma', category: 'english' },
]
