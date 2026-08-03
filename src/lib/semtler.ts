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
    name: 'Beyoğlu',
    displayName: 'BEYOĞLU · PERA',
    side: 'Avrupa Yakası',
    venueKeys: ['pod-pera'],
    workshopSlugs: [
      'english-drama-lab',
      'auteur-lab',
      'english-drama-acting-focus',
      'english-drama-final-performance',
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
]
