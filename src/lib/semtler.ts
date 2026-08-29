// ══════════════════════════════════════════════════════════════════
// SEMT LANDING SAYFALARI — Lokal SEO
// "kadıköy oyunculuk kursu", "beyoğlu tiyatro atölyesi" sorguları
// ══════════════════════════════════════════════════════════════════

export type District = {
  slug: string
  name: string            // Kadıköy
  displayName: string     // KADIKÖY
  side: string            // Anadolu Yakası
  venueKeys: string[]     // ilgili VENUES key'leri
  workshopSlugs: string[] // burada yürüyen programlar
  /** Semt merkezi — LocalBusiness schema'sındaki GeoCoordinates için. */
  geo?: { lat: number; lng: number }
  seoTitle: string
  seoDesc: string
  keywords: string[]
  intro: string
  character: string       // semtin tiyatro karakteri
  transport: { label: string; detail: string }[]
  nearby: string[]        // yakın semtler (lokal sorgular)
  faq: { q: string; a: string }[]
}

export const DISTRICTS: District[] = [
  {
    slug: 'kadikoy-tiyatro-kursu',
    geo: { lat: 40.9903, lng: 29.027 },
    name: 'Kadıköy',
    displayName: 'KADIKÖY',
    side: 'Anadolu Yakası',
    venueKeys: ['beden-isleri', 'soft-sanat'],
    workshopSlugs: [
      'english-drama-lab',
      'techne-musical-lab',
      'broadway-musical-dance',
      'english-drama-youth',
      'oyuncunun-mevcudiyeti',
    ],
    seoTitle: 'Kadıköy Tiyatro Kursu & Oyunculuk Atölyesi — Techne Lab',
    seoDesc: 'Kadıköy\'de oyunculuk, müzikal, dans ve İngilizce drama atölyeleri. Küçük gruplar, profesyonel eğitmenler. Rasimpaşa ve Kadıköy merkezde iki stüdyo.',
    keywords: [
      'kadıköy tiyatro kursu', 'kadıköy oyunculuk kursu', 'kadıköy oyunculuk atölyesi',
      'kadıköy drama kursu', 'kadıköy dans kursu', 'kadıköy müzikal kursu',
      'anadolu yakası tiyatro kursu', 'anadolu yakası oyunculuk kursu',
      'kadıköy ingilizce drama', 'kadıköy sahne sanatları', 'moda tiyatro kursu',
      'rasimpaşa tiyatro', 'kadıköy broadway dans', 'kadıköy şan kursu',
      'kadıköy tiyatro atölyesi', 'kadıköy yetişkin tiyatro kursu',
    ],
    intro: 'Kadıköy, İstanbul\'un bağımsız sahne kültürünün en yoğun olduğu bölgelerinden biri. Techne Lab programlarının çoğu bu tarafta yürüyor — iki ayrı partner stüdyoda, biri Rasimpaşa\'da biri Kadıköy merkezde.',
    character: 'Anadolu yakasında sahne sanatları, Avrupa yakasına göre daha topluluk temelli ilerliyor. Küçük sahneler, bağımsız gruplar ve düzenli seyirci ilişkisi burada daha güçlü. Stüdyo alanları da genellikle daha geniş — bu yüzden dans, müzikal ve fiziksel çalışmalar için doğal bir merkez.',
    transport: [
      { label: 'Marmaray', detail: 'Ayrılık Çeşmesi ve Söğütlüçeşme durakları yürüme mesafesinde.' },
      { label: 'Metro (M4)', detail: 'Kadıköy–Tavşantepe hattı, Kadıköy durağı.' },
      { label: 'Vapur', detail: 'Eminönü, Karaköy ve Beşiktaş\'tan Kadıköy iskelesine düzenli sefer.' },
      { label: 'Metrobüs', detail: 'Söğütlüçeşme durağından yürüme ya da kısa bağlantı.' },
    ],
    nearby: ['Moda', 'Rasimpaşa', 'Yeldeğirmeni', 'Koşuyolu', 'Acıbadem', 'Üsküdar', 'Ataşehir', 'Bostancı'],
    faq: [
      {
        q: 'Kadıköy\'de hangi Techne Lab programları var?',
        a: 'Kadıköy tarafında müzikal tiyatro, Broadway müzikal dansı, İngilizce drama (yetişkin ve gençlik grupları) ve oyunculuk programları yürüyor. Programlar iki partner stüdyoda gerçekleşiyor: Beden İşleri (Rasimpaşa) ve Soft Sanat (Kadıköy merkez).',
      },
      {
        q: 'Kadıköy\'deki derslere Avrupa yakasından gelmek mantıklı mı?',
        a: 'Marmaray ile Sirkeci\'den Ayrılık Çeşmesi 8 dakika, vapurla Karaköy–Kadıköy 20 dakika. Bazı programlarımız hem Pera hem Kadıköy\'de açılıyor — kayıt sırasında sana yakın olanı seçebilirsin.',
      },
      {
        q: 'Kadıköy tiyatro kursu ücretleri ne kadar?',
        a: 'Program ve süreye göre değişiyor. 12 haftalık programlar ile 8 aylık kapsamlı müzikal programının fiyatları farklı. Güncel ücretleri ve erken kayıt indirimlerini ilgili program sayfasında ya da iletişim formundan öğrenebilirsin.',
      },
      {
        q: 'Hiç deneyimim yok, Kadıköy\'deki atölyelere katılabilir miyim?',
        a: 'Evet. Programların çoğu başlangıç seviyesine açık. Deneyim gerektirenler program sayfasında açıkça belirtiliyor. Gruplar 12–14 kişiyle sınırlı olduğu için herkes bireysel geri bildirim alıyor.',
      },
    ],
  },
  {
    slug: 'beyoglu-tiyatro-kursu',
    geo: { lat: 41.0335, lng: 28.977 },
    name: 'Beyoğlu',
    displayName: 'BEYOĞLU · PERA',
    side: 'Avrupa Yakası',
    venueKeys: ['pod-pera'],
    workshopSlugs: [
      'english-drama-lab',
      'auteur-lab',
      'english-drama-final-project',
    ],
    seoTitle: 'Beyoğlu Tiyatro Kursu & Oyunculuk Atölyesi — Pera · Techne Lab',
    seoDesc: 'Beyoğlu Pera\'da oyunculuk, oyun yazarlığı ve İngilizce drama atölyeleri. İstiklal Caddesi\'ne yürüme mesafesinde, küçük gruplar.',
    keywords: [
      'beyoğlu tiyatro kursu', 'beyoğlu oyunculuk kursu', 'pera tiyatro kursu',
      'beyoğlu drama atölyesi', 'taksim oyunculuk kursu', 'istiklal caddesi tiyatro',
      'avrupa yakası tiyatro kursu', 'avrupa yakası oyunculuk kursu',
      'beyoğlu ingilizce drama', 'beyoğlu oyun yazarlığı', 'beyoğlu yaratıcı yazarlık',
      'galata tiyatro kursu', 'cihangir oyunculuk', 'şişli tiyatro kursu',
      'beyoğlu sahne sanatları', 'pera oyunculuk atölyesi',
    ],
    intro: 'Beyoğlu, Türkiye tiyatrosunun tarihsel merkezi. Techne Lab\'ın Avrupa yakasındaki programları Pera\'da, tarihi dokunun içindeki bir çalışma alanında yürüyor — İstiklal Caddesi\'ne yürüme mesafesinde.',
    character: 'Beyoğlu\'nun tiyatro geçmişi bir asrı aşıyor. Bağımsız sahneler, uluslararası festivaller ve karma bir izleyici kitlesi burada yoğunlaşıyor. Metin merkezli çalışmalar — oyun yazarlığı, dramaturji, İngilizce drama — bu atmosferde doğal bir yer buluyor.',
    transport: [
      { label: 'Metro (M2)', detail: 'Şişhane ve Taksim durakları yürüme mesafesinde.' },
      { label: 'Tünel', detail: 'Karaköy–Beyoğlu füniküler hattı.' },
      { label: 'Otobüs', detail: 'Taksim ve Tepebaşı duraklarından yoğun hat bağlantısı.' },
      { label: 'Vapur', detail: 'Karaköy iskelesinden Tünel ya da yürüyerek 15 dakika.' },
    ],
    nearby: ['Pera', 'Galata', 'Taksim', 'Cihangir', 'Tepebaşı', 'Şişhane', 'Karaköy', 'Şişli', 'Nişantaşı'],
    faq: [
      {
        q: 'Beyoğlu\'nda hangi Techne Lab programları var?',
        a: 'Pera\'daki mekânımızda İngilizce drama programları ve oyun yazarlığı / dramaturji atölyesi (Auteur Lab) yürüyor. İngilizce drama\'nın oyunculuk odaklı ve performans odaklı grupları da burada açılıyor.',
      },
      {
        q: 'Mekân İstiklal Caddesi\'ne ne kadar uzak?',
        a: 'Pod Pera, İstiklal Caddesi ve Şişhane metro durağına yürüme mesafesinde. Tam adres ve yol tarifi kayıt sonrası paylaşılıyor; işbirlikleri sayfasından mekânı önceden görebilirsin.',
      },
      {
        q: 'Beyoğlu oyun yazarlığı kursu kimler için uygun?',
        a: 'Auteur Lab, yazma deneyimi olan ya da olmayan herkese açık. Roman, senaryo ya da hiç yazmamış olmak fark etmiyor — program sahne dilini sıfırdan kuruyor. Tek beklenti düzenli katılım ve yazma isteği.',
      },
      {
        q: 'Aynı program hem Pera hem Kadıköy\'de mi açılıyor?',
        a: 'Bazıları evet. Özellikle İngilizce Drama Lab her iki yakada da grup açıyor. Kayıt sırasında sana yakın olan lokasyonu seçebilirsin; kontenjan durumunu program sayfasından takip edebilirsin.',
      },
    ],
  },

  // ── TAKSİM ────────────────────────────────────────────────────────
  // Beyoğlu'ndan ayrı sayfa: "taksim oyunculuk kursu" bağımsız bir sorgu
  // ve arayan kişi çoğu zaman metroya göre düşünüyor, ilçeye göre değil.
  {
    slug: 'taksim-oyunculuk-kursu',
    geo: { lat: 41.037, lng: 28.9857 },
    name: 'Taksim',
    displayName: 'TAKSİM',
    side: 'Avrupa Yakası',
    venueKeys: ['pod-pera'],
    workshopSlugs: [
      'english-drama-lab',
      'camera-praxis',
      'auteur-lab',
      'english-drama-final-project',
    ],
    seoTitle: 'Taksim Oyunculuk Kursu & Tiyatro Atölyesi — Techne Lab İstanbul',
    seoDesc:
      'Taksim ve çevresinde oyunculuk, kamera önü, İngilizce drama ve oyun yazarlığı atölyeleri. M2 metro Taksim–Şişhane hattında, Pera\'da. Küçük gruplar, akşam saatleri.',
    keywords: [
      'taksim oyunculuk kursu', 'taksim tiyatro kursu', 'taksim drama kursu',
      'taksim oyunculuk atölyesi', 'taksim sahne sanatları',
      'gümüşsuyu oyunculuk kursu', 'cihangir tiyatro kursu', 'cihangir oyunculuk',
      'şişhane tiyatro kursu', 'galata oyunculuk kursu', 'karaköy tiyatro kursu',
      'istiklal caddesi tiyatro kursu', 'beyoğlu oyunculuk kursu',
      'avrupa yakası oyunculuk kursu', 'şişli oyunculuk kursu',
      'nişantaşı tiyatro kursu', 'taksim kamera önü oyunculuk',
    ],
    intro:
      'Taksim ve çevresi İstanbul tiyatrosunun kalbi — İstiklal boyunca sıralanan sahneler, festivaller ve bağımsız topluluklar. Techne Lab\'ın Avrupa yakasındaki programları buraya yürüme mesafesinde, Pera\'daki çalışma alanında yürüyor.',
    character:
      'Taksim çevresinde çalışmanın pratik bir avantajı var: her yerden ulaşılabilir. M2 metro hattı Yenikapı\'dan Hacıosman\'a, füniküler Kabataş\'tan, otobüsler şehrin her yerinden buraya bağlanıyor. Metin merkezli çalışmalar — oyun yazarlığı, dramaturji, kamera önü — bu bölgenin yoğun kültürel dokusunda doğal bir yer buluyor.',
    transport: [
      { label: 'Metro (M2)', detail: 'Taksim ve Şişhane durakları — ikisi de yürüme mesafesinde.' },
      { label: 'Füniküler (F1)', detail: 'Kabataş–Taksim hattı, iki dakika.' },
      { label: 'Tünel', detail: 'Karaköy–Beyoğlu tarihi füniküler.' },
      { label: 'Otobüs', detail: 'Taksim Meydanı ve Tepebaşı duraklarından yoğun hat bağlantısı.' },
    ],
    nearby: ['Cihangir', 'Gümüşsuyu', 'Galatasaray', 'Tepebaşı', 'Şişhane', 'Galata', 'Karaköy', 'Şişli', 'Nişantaşı', 'Harbiye'],
    faq: [
      {
        q: 'Taksim\'de hangi Techne Lab programları var?',
        a: 'Pera\'daki mekânımızda kamera önü oyunculuk (Camera Praxis), İngilizce drama programları ve oyun yazarlığı atölyesi (Auteur Lab) yürüyor. Mekân Taksim ve Şişhane metro duraklarına yürüme mesafesinde.',
      },
      {
        q: 'Taksim\'deki derslere hangi saatlerde geliniyor?',
        a: 'Programların çoğu akşam saatlerinde — çalışanlar için planlanmış. Hafta sonu grupları da var. Kesin gün ve saat her program sayfasında yazıyor.',
      },
      {
        q: 'Taksim oyunculuk kursu ücretleri ne kadar?',
        a: 'Program ve süreye göre değişiyor: dört haftalık yoğun atölyeler ile sekiz aylık kapsamlı programların fiyatları farklı. Güncel ücretler ve indirimler program sayfalarında açıkça yazılı — sormanıza gerek yok.',
      },
      {
        q: 'Anadolu yakasından Taksim\'e gelmek zor mu?',
        a: 'Kabataş\'a vapurla geçip füniküler ile iki dakikada Taksim\'desiniz. Yine de bazı programlarımız hem Pera hem Kadıköy\'de açılıyor — kayıt sırasında size yakın olanı seçebilirsiniz.',
      },
    ],
  },

  // ── ANADOLU YAKASI (hub) ─────────────────────────────────────────
  {
    slug: 'anadolu-yakasi-tiyatro-kursu',
    geo: { lat: 40.9903, lng: 29.027 },
    name: 'Anadolu Yakası',
    displayName: 'ANADOLU YAKASI',
    side: 'Anadolu Yakası',
    venueKeys: ['beden-isleri', 'soft-sanat'],
    workshopSlugs: [
      'english-drama-lab',
      'techne-musical-lab',
      'broadway-musical-dance',
      'english-drama-youth',
      'oyuncunun-mevcudiyeti',
    ],
    seoTitle: 'Anadolu Yakası Tiyatro & Oyunculuk Kursu — Kadıköy · Techne Lab',
    seoDesc:
      'Anadolu yakasında oyunculuk, müzikal, dans ve İngilizce drama atölyeleri. Kadıköy merkezli iki stüdyo — Üsküdar, Ataşehir, Bostancı ve Maltepe\'den kolay ulaşım.',
    keywords: [
      'anadolu yakası tiyatro kursu', 'anadolu yakası oyunculuk kursu',
      'anadolu yakası drama kursu', 'anadolu yakası dans kursu',
      'anadolu yakası müzikal kursu', 'anadolu yakası sahne sanatları',
      'üsküdar tiyatro kursu', 'ataşehir oyunculuk kursu', 'bostancı tiyatro kursu',
      'maltepe oyunculuk kursu', 'kartal tiyatro kursu', 'göztepe drama kursu',
      'acıbadem oyunculuk', 'koşuyolu tiyatro', 'kadıköy tiyatro kursu',
      'anadolu yakası ingilizce drama',
    ],
    intro:
      'Anadolu yakasında yaşıyorsan sanat eğitimi için köprü geçmen gerekmiyor. Techne Lab\'ın programlarının çoğu bu tarafta yürüyor ve katılımcılarımız Üsküdar\'dan Kartal\'a kadar geniş bir alandan geliyor. Bu sayfa, yakanın hangi semtinden hangi programa nasıl ulaşacağını tek yerde topluyor.',
    character:
      'Yakanın ulaşım omurgası tek noktada kesişiyor: Marmaray ve M4 metro hattı, Gebze\'den Üsküdar\'a kadar tüm ilçeleri aynı merkeze bağlıyor. Bu yüzden Ataşehir\'de oturan biriyle Maltepe\'de oturan biri aynı derse benzer sürede yetişiyor. Akşam saatlerinde raylı sistem trafikten etkilenmiyor — çalışan katılımcılar için belirleyici olan da bu.',
    transport: [
      { label: 'Marmaray', detail: 'Ayrılık Çeşmesi ve Söğütlüçeşme — Gebze\'den Halkalı\'ya tüm hat.' },
      { label: 'Metro (M4)', detail: 'Kadıköy–Tavşantepe hattı; Kartal, Maltepe, Bostancı doğrudan bağlantılı.' },
      { label: 'Vapur', detail: 'Eminönü, Karaköy, Beşiktaş ve Adalar\'dan Kadıköy iskelesine düzenli sefer.' },
      { label: 'Metrobüs', detail: 'Söğütlüçeşme durağı — Avrupa yakasıyla doğrudan bağlantı.' },
    ],
    nearby: ['Kadıköy', 'Moda', 'Üsküdar', 'Ataşehir', 'Bostancı', 'Maltepe', 'Kartal', 'Göztepe', 'Acıbadem', 'Koşuyolu', 'Erenköy', 'Suadiye'],
    faq: [
      {
        q: 'Hangi semtten ne kadar sürede geliniyor?',
        a: 'Üsküdar ve Acıbadem\'den 10–15 dakika, Göztepe ve Erenköy\'den 15 dakika, Ataşehir ve Bostancı\'dan 20–25 dakika, Maltepe ve Kartal\'dan 25–35 dakika. Süreler raylı sistemle; akşam saatlerinde trafik etkisi yok.',
      },
      {
        q: 'Üsküdar\'da ya da Ataşehir\'de şubeniz var mı?',
        a: 'Hayır. Kendi binamız yok, partner stüdyolarda çalışıyoruz ve Anadolu yakasındaki iki stüdyomuz da Kadıköy\'de. Üsküdar, Ataşehir ve çevresinden gelen katılımcılarımız çok — ulaşım bu yüzden bu sayfada ayrıntılı anlatılıyor.',
      },
      {
        q: 'Çocuğum için Anadolu yakasında program var mı?',
        a: 'Evet. 10–17 yaş İngilizce drama programı Kadıköy stüdyosunda yürüyor, haftada bir gün, Eylül–Mayıs. Gruplar yaşa göre ayrılıyor: 10–14 ve 15–17 ayrı sınıflarda.',
      },
      {
        q: 'Avrupa yakasında da programınız var mı?',
        a: 'Evet, Pera\'da bir mekânımız var; kamera önü oyunculuk, oyun yazarlığı ve İngilizce drama programları orada yürüyor. Bazı programlar iki yakada da açılıyor.',
      },
    ],
  },
]
