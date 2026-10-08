// ══════════════════════════════════════════════════════════════════
// DİSİPLİN LANDING SAYFALARI — Ana SEO ağı
//
// Rakip analizi (Ağustos 2026): Sinema Akademi, İstanbul Drama Sanat
// Akademisi ve Drama Akademi'nin hepsi "disiplin × semt" sayfa matrisi
// kuruyor — /oyunculuk-kursu-kadikoy, /yaratici-drama-kursu-kagithane.
// Biz de aynı yapıyı kuruyoruz ama içeriği gerçek programlara bağlıyoruz;
// keyword yığını değil, gerçekten okunacak sayfalar.
//
// Her sayfa tek bir yüksek hacimli sorguya odaklanır ve ilgili
// atölyelere + semtlere iç bağlantı verir.
// ══════════════════════════════════════════════════════════════════

export type Discipline = {
  slug: string
  label: string           // menüde/kartta görünen kısa ad
  h1: string              // sayfanın H1'i
  eyebrow: string         // H1 üstü küçük etiket
  seoTitle: string
  seoDesc: string
  keywords: string[]
  /** Hero altı açılış paragrafı — keyword'ler doğal cümle içinde. */
  intro: string
  /** "Bu eğitimde ne yapılır" — H2 altı gövde. */
  what: string
  /** Kimler için uygun. */
  who: string
  /** Bu disiplinle ilişkili program slug'ları. */
  workshopSlugs: string[]
  /** Hangi semtlerde yürüyor (semtler.ts slug'ları). */
  districtSlugs: string[]
  /** Sayfaya özel SSS — FAQPage schema'ya da basılır. */
  faq: { q: string; a: string }[]
  /**
   * "Nasıl seçilir" karar kriterleri. Opsiyonel; yalnızca rekabetin sert
   * olduğu sayfalarda dolduruluyor. Karşılaştırma tablosunun altında çıkar
   * ve okuyucuya program seçerken bakacağı ölçütü verir.
   */
  criteria?: { q: string; a: string }[]
  /**
   * Kaynaklı veri bölümü (6 Ekim 2026). Her satırın kaynağı ve tarihi açık yazılır;
   * doğrulanamayan ya da kaynakları çelişen rakam buraya girmez. Yeni rakam
   * eklerken kaynağı açıp okumadan yazma.
   */
  /**
   * Sözlük ya da yöntem haritası (7 Ekim 2026). Kısa, kaynaksız da doğru olan
   * genel bilgi; her madde varsa kendi makalemize bağlanır. DefinedTermSet olarak basılır.
   */
  guide?: {
    heading: string
    lead: string
    items: { term: string; body: string; href?: string }[]
  }
  /** Sayfada gösterilecek katılımcı yorumları (yorumlar.ts id'leri). Program adıyla birlikte basılır. */
  yorumIds?: string[]
  /** "Bu konuda yazdıklarımız" listesini elle sabitler (anahtar kelime eşleşmesi yerine). */
  articleSlugs?: string[]
  /** İngilizce karşılık sayfası yolu (hreflang en-US), ör. '/en/drama-classes-for-kids-istanbul'. */
  enPath?: string
  facts?: {
    heading: string
    lead: string
    rows: { label: string; value: string; source: string; url: string }[]
    note?: string
  }
  /** İlgili diğer disiplinler (iç bağlantı). */
  related: string[]
  /** true → mega menüde listelenmez (semt × disiplin kombinasyon sayfaları). */
  navHidden?: boolean
}

export const DISCIPLINES: Discipline[] = [
  // ── OYUNCULUK ────────────────────────────────────────────────────
  {
    slug: 'oyunculuk-kursu-istanbul',
    label: 'Oyunculuk',
    h1: 'OYUNCULUK KURSU\nİSTANBUL',
    eyebrow: 'Sahne · Beden · Ses',
    seoTitle: 'Oyunculuk Kursu İstanbul — Tiyatro & Sahne Oyunculuğu Atölyesi',
    seoDesc:
      'İstanbul oyunculuk kursu: beden farkındalığı, ses-nefes, sahne mevcudiyeti ve karakter çalışması. Kadıköy ve Pera\'da küçük gruplu oyunculuk atölyeleri. Deneyim şartı yok.',
    keywords: [
      'oyunculuk kursu istanbul', 'oyunculuk atölyesi istanbul', 'oyunculuk eğitimi istanbul',
      'tiyatro kursu istanbul', 'sahne oyunculuğu kursu', 'oyunculuk dersi istanbul',
      'oyunculuk kursu kadıköy', 'oyunculuk kursu taksim', 'oyunculuk kursu beyoğlu',
      'anadolu yakası oyunculuk kursu', 'avrupa yakası oyunculuk kursu',
      'yetişkin oyunculuk kursu', 'başlangıç seviyesi oyunculuk',
      'acting workshop istanbul', 'profesyonel oyunculuk eğitimi',
    ],
    intro:
      'Oyunculuk bir yetenek meselesi değil, bir pratik meselesi. Techne Lab\'ın İstanbul\'daki oyunculuk atölyeleri bedenden başlıyor: nefesin nereye gittiği, ağırlığın nasıl dağıldığı, partnerin gerçekten görülüp görülmediği. Kadıköy ve Pera\'daki partner stüdyolarda küçük gruplarla çalışıyoruz. Türkçe sahne oyunculuğu programımız Oyuncunun Mevcudiyeti şu an yeni dönem için kayıt almıyor; bu dönem oyunculuk çalışmanın açık kapıları, İngilizce yürüyen English Acting Praxis ve oyunculuğu şan ve dansla birleştiren Techne Musical Lab.',
    what:
      'Çalışma üç eksende ilerliyor. Beden: fiziksel farkındalık, zemin çalışması, hareket kalitesi. Ses: nefes desteği, rezonans, metnin sesle taşınması. Mevcudiyet: anda kalmak, gerçek tepki vermek, sahnede var olmak. Bunların üzerine karakter inşası ve metin çalışması geliyor — ama sıra bu; teknik olmadan karakter kurulmaz. Her oturumda herkes sahneye çıkıyor, herkes bireysel geri bildirim alıyor.',
    who:
      'Hiç sahneye çıkmamış olanlar, konservatuvar hazırlığı yapanlar, uzun süre ara verip geri dönenler ve kamera önünde çalışıp sahne tekniği eksiği hisseden oyuncular. Yaş sınırı yok; gruplar yetişkin. Gençler için ayrı bir program yürüyor.',
    // Açık programlar önce: kapalı olanlar listede "kayıt kapalı" etiketiyle ve
    // bekleme listesi bağlantısıyla kalıyor (29 Eylül 2026 derinleştirme).
    workshopSlugs: ['english-drama-final-project', 'techne-musical-lab', 'oyuncunun-mevcudiyeti', 'camera-praxis'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Hiç oyunculuk deneyimim yok, katılabilir miyim?',
        a: 'Evet. Oyunculuk deneyimi şartı aramıyoruz. Programa özel koşullar sayfasında açıkça yazıyor: English Acting Praxis için B1 seviyesinde İngilizce, Techne Musical Lab için kısa bir şarkı videosu isteniyor. Grupların küçük tutulmasının sebebi de bu: herkesin kendi hızında ilerleyebilmesi.',
      },
      {
        q: 'Oyunculuk kursu ne kadar sürüyor?',
        a: 'Yoğun atölyeler 4 hafta, dönemlik programlar 12 hafta, kapsamlı programlar 8 ay sürüyor. Haftada bir ya da iki gün, akşam ya da hafta sonu saatlerinde; çalışanlar için planlanmış.',
      },
      {
        q: 'Şu an Türkçe oyunculuk kursu açık mı?',
        a: 'Türkçe sahne oyunculuğu programımız Oyuncunun Mevcudiyeti şu an yeni dönem için kayıt almıyor; açıldığında haber almak için bekleme listesine yazılabilirsin. Bu dönem kayıt alan programlar İngilizce yürüyen English Acting Praxis (Pera, cumartesi) ve oyunculuk, şan ve dansı birlikte çalışan Techne Musical Lab (Kadıköy, 12 Ekim\'de başlıyor).',
      },
      {
        q: 'Oyunculuk kursu İstanbul\'da nerede yapılıyor?',
        a: 'Kadıköy tarafında iki partner stüdyo (Rasimpaşa ve Kadıköy merkez), Avrupa yakasında Pera\'da bir mekân. Aynı program bazen iki yakada da açılıyor — kayıt sırasında sana yakın olanı seçiyorsun.',
      },
      {
        q: 'Oyunculuk öğrenilir mi, yoksa yetenek mi?',
        a: 'Yetenek bir başlangıç farkı yaratabilir, ama oyunculuğun araçları çalışılarak gelişiyor: dinlemek, metni çözmek, bedeni ve sesi yönetmek, aynı sahneyi tekrar tekrar canlı oynayabilmek. Atölyeye başlamak için kendini yetenekli hissetmen gerekmiyor. Neyin öğretilebildiğini, neyin öğretilemediğini ayrı bir yazıda ele aldık.',
      },
      {
        q: 'Oyunculuk kursunun ilk dersinde ne yapılır?',
        a: 'İlk ders genellikle bedenden başlıyor: ısınma, odada yürüme, dikkat ve dinleme oyunları. Kimse ilk gün tek başına uzun bir sahneye itilmiyor. Rahat, hareket etmeye uygun kıyafet yeterli. Kaygı duymak normal; ilk dersin akışını ayrıntılı yazdık.',
      },
      {
        q: 'Çalışırken oyunculuk eğitimi alınabilir mi?',
        a: 'Evet. Programlarımız akşam ya da hafta sonu saatlerinde, haftada bir ya da iki gün. Tempoyu ve devamlılığı nasıl kuracağını çalışırken oyunculuk eğitimi yazımızda anlattık.',
      },
      {
        q: 'Tiyatro kursu ile oyunculuk kursu aynı şey mi?',
        a: 'Tam olarak değil. "Tiyatro kursu" geniş bir şemsiye: oyunculuk, yaratıcı drama, tiyatro atölyesi ve konservatuvar hazırlık bu ismin altında satılabiliyor. Oyunculuk kursu oyuncunun araçlarına odaklanır; yaratıcı drama süreç ve grup deneyimine, konservatuvar hazırlık ise sınava. Hangisinin sana uyduğunu ayrı bir yazıda karşılaştırdık.',
      },
    ],
    criteria: [
      {
        q: 'Yoğun blok mu, dönemlik program mı?',
        a: 'Dört haftalık yoğun bloklar tekniği hızlı tanıtır ama oturmasına vakit bırakmaz; ne istediğini henüz bilmeyen biri için doğru giriş. On iki haftalık dönemlik programlar tekrarın işini görmesine izin verir ve seyircili bir kapanışa bağlanır. Sahnede kalıcı bir değişiklik arıyorsan ikincisi gerekiyor.',
      },
      {
        q: 'Grup kaç kişi olmalı?',
        a: 'Oyunculuk çalışmasında belirleyici sayı budur. On iki kişilik bir grupta herkes her hafta sahneye çıkar ve bireysel geri bildirim alır. Yirmi kişiyi geçen bir grupta çalışma sessizce izleme etkinliğine döner; sahneye ayda bir kez çıkarsın. Kontenjanı yazmayan bir yer bunu bilerek yazmıyordur.',
      },
      {
        q: 'Kim yürütüyor, hangi ekolden geliyor?',
        a: 'Oyunculuk tek bir yöntem değil. Mevcudiyet ve beden üzerinden çalışan biriyle kamera oyunculuğu çalıştıran biri farklı şeyler öğretir; ikisi de geçerli, ama aradığın şey belli olmalı. Eğitmenin adını ve nereden geldiğini söylemeyen bir programda bunu baştan bilemezsin.',
      },
      {
        q: 'Sonunda seyirci var mı?',
        a: 'Seyircili bir kapanış, çalışmayı bir noktaya bağlar. Baskı yaratır ama o baskı olmadan öğrenilen şeyin sınandığı bir an olmaz. Gösteri vaadi olmayan programlar da anlamlı; sadece neyi hedeflediklerini söyleyebilmeleri gerekir.',
      },
      {
        q: 'Deneyimim yoksa ne olacak?',
        a: 'Başlangıç seviyesine açık olduğunu söyleyen bir program, ilk haftalarda ne yaptığını da anlatabilmeli. "Herkese uygun" cümlesi tek başına bir bilgi değil. Deneyimli ve hiç sahneye çıkmamış kişilerin aynı grupta nasıl çalıştığı sorulmayı hak eden bir soru.',
      },
    ],
    guide: {
      heading: 'OYUNCULUK YÖNTEMLERİ: KISA BİR HARİTA',
      lead: 'Oyunculuk kurslarının çoğu bir yöntem adı anıyor. Hangisinin neye dayandığını bilmek, program seçerken ne soracağını belirliyor. Her başlığın ayrıntılı yazısı bağlantıda.',
      items: [
        { term: 'Stanislavski sistemi', body: 'Konstantin Stanislavski\'nin 20. yüzyıl başında Moskova Sanat Tiyatrosu\'nda geliştirdiği yaklaşım. Karakterin ne istediğini, önündeki engeli ve verili koşulları sorar. Bugünkü oyunculuk eğitiminin büyük kısmı bu sorulardan türedi.', href: '/makaleler/stanislavski-yontemi-nedir' },
        { term: 'Meisner tekniği', body: 'Sanford Meisner\'in geliştirdiği, dinlemeye ve partnere gerçek tepki vermeye dayanan çalışma. Tekrar egzersiziyle başlar, oyuncunun dikkatini kendinden alıp karşısındakine verir. Kamera önü çalışmasında da temel kabul edilir.', href: '/makaleler/meisner-teknigi-nedir' },
        { term: 'Michael Chekhov tekniği', body: 'Stanislavski\'nin öğrencisi Michael Chekhov\'un hayal gücü ve beden üzerinden çalışan yaklaşımı. En bilinen aracı psikolojik jest: karakterin iç isteğini tek bir beden hareketinde toplamak.', href: '/makaleler/michael-chekhov-teknigi-psikolojik-jest' },
        { term: 'Viewpoints', body: 'Mary Overlie\'nin dans için geliştirdiği, Anne Bogart ve Tina Landau\'nun tiyatroya uyarladığı yöntem. Tempo, süre, mekânsal ilişki ve jest gibi zaman ve mekân kavramlarını grubun ortak dili yapar.', href: '/makaleler/viewpoints-yontemi-nedir-anne-bogart' },
        { term: 'Grotowski ve yoksul tiyatro', body: 'Jerzy Grotowski\'nin oyuncu ile seyirci ilişkisini merkeze alıp sahnedeki her fazlalığı attığı yaklaşım. Yoğun fiziksel çalışmaya dayanır.', href: '/makaleler/grotowski-yoksul-tiyatro' },
        { term: 'Brecht ve yabancılaştırma', body: 'Bertolt Brecht\'in, seyircinin olaya kapılmak yerine onu sorgulamasını hedefleyen epik tiyatrosu. Oyuncu karakteri tümüyle "olmak" yerine onu seyirciye gösterir.', href: '/makaleler/brecht-yabancilastirma-efekti-nedir' },
        { term: 'Devising (ortak yaratım)', body: 'Oyunun hazır bir metinden değil, grubun doğaçlamaları ve araştırmasından birlikte kurulması. Oyuncu aynı zamanda yazar ve yaratıcıdır.', href: '/makaleler/devising-tiyatro-nedir' },
        { term: 'Doğaçlama', body: 'Önceden yazılmamış bir sahneyi anda kurmak. Temel ilkesi "evet, ve": partnerin önerisini kabul edip üzerine eklemek.', href: '/makaleler/dogaclama-tiyatro-evet-ve-kurali' },
        { term: 'Masabaşı metin analizi', body: 'Sahneye çıkmadan önce metnin masada satır satır okunması; karakterin ne istediğinin, sahnenin nerede döndüğünün çıkarılması.', href: '/makaleler/masabasi-provasi-metin-analizi' },
        { term: 'Ses ve nefes', body: 'Oyuncunun sesini taşıyan nefes desteği, rezonans ve diksiyon çalışması. Sahnede son sıraya ulaşmanın ve kamerada sesi küçültüp anlamı korumanın ortak temeli.', href: '/makaleler/oyunculukta-ses-ve-nefes' },
      ],
    },
    yorumIds: ['et', 'ek'],
    articleSlugs: [
      'oyunculuk-kursunda-ilk-ders',
      'oyunculuk-yetenek-mi-ogrenilir-mi',
      'istanbul-oyunculuk-kursu-nasil-secilir',
      'tiyatro-kursu-mu-oyunculuk-kursu-mu',
      'calisirken-oyunculuk-egitimi',
      'oyuncu-nasil-yetisir',
    ],
    facts: {
      heading: 'SAHNENİN ARKASINDAKİ SEKTÖR: RAKAMLAR',
      lead: 'Oyunculuk eğitimi alanlar sahneyle sınırlı kalmıyor; Türk dizisi bugün dünya pazarında ciddi bir ihracat kalemi. Aşağıdaki rakamların her biri kaynağıyla birlikte, tarihiyle yazıldı. Kaynaklar birbirini tam tutmuyor, bunu da açıkça belirttik.',
      rows: [
        {
          label: '2024 dizi ve film ihracatı',
          value: '602 milyon dolar; 150\'den fazla ülke',
          source: 'Memurlar.net, 31 Mart 2025 (haber, TÜİK verisine atıfla)',
          url: 'https://www.memurlar.net/haber/1131652/2024-te-dizi-film-sektorunde-602-milyon-dolarlik-ihracat.html',
        },
        {
          label: '2024 yalnızca dizi ihracatı',
          value: '500 milyon doları aşan hacim; yaklaşık 200 ülke, 300\'den fazla yapım',
          source: 'CNBC-e, 18 Ocak 2025',
          url: 'https://www.cnbce.com/veriler/turk-dizileri-rekor-kiriyor-2024-yilinda-200-ulkeye-ihrac-edildi-h8634',
        },
        {
          label: '2026 yetkili beyanı',
          value: 'Dizi ihracatı 1 milyar doları aştı; yaklaşık 170 ülke',
          source: 'Türkiye Gazetesi, 28 Ağustos 2026 (İletişim Başkanı\'nın sözlü beyanı)',
          url: 'https://www.turkiyegazetesi.com.tr/kultur-sanat/dizi-ihracatinda-1-milyar-dolari-asan-hacim-turk-yapimlarini-170e-yakin-ulkede-1-mily-1812197',
        },
        {
          label: 'Bölüm başı satış fiyatı',
          value: '200.000 ile 650.000 dolar arası',
          source: 'Karar, 26 Ekim 2025 (MIPCOM aktarımı)',
          url: 'https://www.karar.com/hayat-haberleri/turk-dizileri-ihracat-rekoru-2025-esref-ruya-bolum-basi-fiyati-ne-kadar-2001763',
        },
        {
          label: 'Netflix küresel listesi',
          value: '2021\'den bu yana 47 Türk yapımı Netflix\'in haftalık küresel ilk 10 listesine girdi',
          source: 'CNBC-e, 18 Ocak 2025 (Netflix verisine atıfla)',
          url: 'https://www.cnbce.com/veriler/turk-dizileri-rekor-kiriyor-2024-yilinda-200-ulkeye-ihrac-edildi-h8634',
        },
      ],
      note: 'Not: 602 milyon dolar dizi ve filmi birlikte, 500 milyon doları aşan rakam yalnızca diziyi, 1 milyar dolar ise 2026 tarihli sözlü bir beyanı gösteriyor. Kapsamları ve hesap yöntemleri aynı olmadığı için birbirine eklenemez ya da yıldan yıla büyüme diye okunamaz. Kaynaklara 7 Ekim 2026\'da yeniden bakıldı.',
    },
    related: ['kamera-onu-oyunculuk-istanbul', 'yaratici-drama-istanbul', 'muzikal-tiyatro-kursu-istanbul'],
  },

  // ── YARATICI DRAMA ───────────────────────────────────────────────
  {
    slug: 'yaratici-drama-istanbul',
    label: 'Yaratıcı Drama',
    h1: 'YARATICI DRAMA\nİSTANBUL',
    eyebrow: 'Oyun · Doğaçlama · Grup',
    seoTitle: 'Yaratıcı Drama Kursu İstanbul — Yetişkinler İçin Drama Atölyesi',
    seoDesc:
      'İstanbul yaratıcı drama atölyesi: doğaçlama, oyun ve grup çalışmasıyla ifade gücü. Yetişkinler için drama kursu — Kadıköy ve Pera. Türkçe ve İngilizce gruplar.',
    keywords: [
      'yaratıcı drama istanbul', 'yaratıcı drama kursu istanbul', 'drama atölyesi istanbul',
      'yetişkinler için drama', 'yetişkin drama kursu', 'drama kursu kadıköy',
      'yaratıcı drama kursu kadıköy', 'yaratıcı drama beyoğlu', 'doğaçlama atölyesi istanbul',
      'improvizasyon kursu istanbul', 'drama eğitimi istanbul',
      'anadolu yakası drama kursu', 'grup çalışması atölyesi',
    ],
    intro:
      'Yaratıcı drama, sonuç değil süreç odaklı bir çalışma biçimi. Sahneye oyun çıkarmak yerine oyunun kendisiyle uğraşıyoruz: doğaçlama, rol değiştirme, grup dinamiği. İstanbul\'daki yaratıcı drama atölyelerimiz Kadıköy ve Pera\'da yürüyor — hem Türkçe hem İngilizce gruplarla.',
    what:
      'Isınma ve güven oyunlarıyla başlıyoruz — grubun birbirini tanıması teknikten önce geliyor. Sonra duyular ve duygular, rol oynama, status çalışmaları, anlık sahne kurma. Metin ezberi yok; her şey o an üretiliyor. Bu yüzden yaratıcı drama, sahne korkusunu kırmak için oyunculuk atölyesinden daha doğrudan bir yol.',
    who:
      'İfade gücünü açmak isteyenler, topluluk önünde konuşmakta zorlananlar, ekip çalışması yapan profesyoneller ve tiyatroya adım atmadan önce suyu test etmek isteyenler. Deneyim aranmıyor; aksine deneyimsizlik burada avantaj.',
    workshopSlugs: ['english-drama-lab', 'oyuncunun-mevcudiyeti', 'english-drama-youth'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Yaratıcı drama ile oyunculuk kursu arasındaki fark ne?',
        a: 'Oyunculuk sahne çıktısına, yaratıcı drama sürece odaklanır. Oyunculukta bir karakteri seyirci önünde inandırıcı kılmayı çalışırsın; yaratıcı dramada grup içinde ifade, doğaçlama ve etkileşim üzerinden kendi araçlarını keşfedersin. İkisi birbirini besler — çoğu katılımcı dramayla başlayıp oyunculuğa geçiyor.',
      },
      {
        q: 'Yetişkinler için yaratıcı drama var mı?',
        a: 'Evet, gruplarımızın çoğu yetişkin. 10–17 yaş için ayrı bir gençlik programı yürüyor (English Drama Youth), o da seyircili final gösterisiyle kapanıyor.',
      },
      {
        q: 'Yaratıcı dramayı İngilizce yapıyor musunuz?',
        a: 'Evet. English Drama Lab tam olarak bu: yaratıcı drama araçlarını İngilizce dil pratiğiyle birleştiren, 12/6/4 haftalık paketlerle açık program. Konuşma kulübünün pratiğini sahnede, bedenle yapıyoruz.',
      },
    ],
    related: ['ingilizce-drama-istanbul', 'oyunculuk-kursu-istanbul'],
  },

  // ── İNGİLİZCE DRAMA ──────────────────────────────────────────────
  {
    slug: 'ingilizce-drama-istanbul',
    label: 'İngilizce Drama',
    h1: 'İNGİLİZCE DRAMA\nİSTANBUL',
    eyebrow: 'English Creative Drama',
    seoTitle: 'İngilizce Drama Kursu İstanbul — English Drama & Konuşma Pratiği',
    seoDesc:
      'İngilizce yaratıcı drama atölyesi İstanbul: doğaçlama ve sahne çalışmasıyla İngilizce konuşma pratiği. Yetişkin ve 10–17 yaş grupları — Kadıköy ve Pera.',
    keywords: [
      'ingilizce drama istanbul', 'ingilizce drama kursu', 'ingilizce yaratıcı drama',
      'english drama istanbul', 'english drama lab', 'ingilizce tiyatro istanbul',
      'ingilizce konuşma kulübü istanbul', 'ingilizce konuşma pratiği istanbul',
      'english acting workshop istanbul', 'ingilizce drama kadıköy',
      'ingilizce drama beyoğlu', 'gençler için ingilizce drama',
      '10 17 yaş ingilizce drama', 'ingilizce sahne sanatları',
    ],
    intro:
      'İngilizce konuşmayı ders kitabından değil, sahneden öğrenmek. Techne Lab\'ın İngilizce drama programları dili bedene ve sese yerleştiriyor: doğaçlama, oyun, anlık tepki. Gramer çalışmıyoruz — konuşuyoruz. İstanbul\'un iki yakasında da grup açılıyor.',
    what:
      'İlk dört hafta oyun ve güven egzersizleri: dil oyunları, beden-ses-hayal gücü. Sonrasında doğaçlama sahneler, status oyunları, karakter çalışmaları. Son bölümde araçlar sahnede bütünleşiyor. Metin ezberi yok, sınav yok, seviye testi yok — herkes kendi İngilizcesiyle başlıyor ve konuşarak açılıyor. İleri seviye için ayrıca İngilizce metinlerle çalışan bir oyunculuk programı (English Acting Praxis) var.',
    who:
      'Techne Lab İstanbul\'da İngilizce drama üç ayrı yaş grubunda yürüyor. Yetişkinler (18+): İngilizcesi var ama konuşurken donanlar, konuşma kulübü deneyip sıkılanlar, yurtdışı hazırlığı yapanlar. Gençler (15–17): lise çağı, sekiz ay, Mayıs\'ta seyircili final gösterisi. Çocuklar (10–14): oyun temelli, kendi grubunda. Üç grup ayrı günlerde, ayrı eğitmenlerle çalışıyor — hiçbiri diğeriyle karışmıyor.',
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project', 'english-drama-youth'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'İngilizce seviyem yeterli mi?',
        a: 'Orta seviye (B1 civarı) yeterli. Program dili konuşarak açmayı hedefliyor — mükemmel gramer beklentisi yok. Başvuru formunda seviyeni belirtiyorsun, grupları buna göre dengeliyoruz.',
      },
      {
        q: 'İngilizce drama ile konuşma kulübü aynı şey mi?',
        a: 'Amaç benzer, yöntem farklı. Konuşma kulübünde masada oturup konuşulur; burada ayaktasın, hareket ediyorsun, doğaçlama yapıyorsun. Dil bedene bağlandığında daha hızlı ve daha kalıcı yerleşiyor.',
      },
      {
        q: 'Çocuğum için İngilizce drama var mı?',
        a: '10–17 yaş için English Drama Youth programı var: Ekim–Mayıs arası haftada bir gün, Pera ve Kadıköy\'de, yıl sonunda seyircili bir final gösterisiyle kapanıyor. Veli onayıyla başvuru alınıyor.',
      },
    ],
    criteria: [
      {
        q: 'Dil kursu mu arıyorsun, sahne çalışması mı?',
        a: 'İkisi farklı şeyler ve ikisi de meşru. Gramerini düzeltmek, sınava hazırlanmak ya da sertifika almak istiyorsan bir dil okulu doğru adres. Drama atölyesinin çözdüğü sorun başka: İngilizceyi bildiği halde konuşurken donan, cümleyi kafasında kurup söylemeye sıra gelince vazgeçen kişinin problemi. Hangi sorunu taşıdığını baştan ayırt et, yoksa doğru programda yanlış beklentiyle oturursun.',
      },
      {
        q: 'Grup seviyesi nasıl dengeleniyor?',
        a: 'Karışık seviyeli bir grupta ileri seviye sıkılır, başlangıç seviyesi susar. Sorulacak soru şu: başvuru sırasında seviye soruluyor mu ve gruplar buna göre mi kuruluyor? Seviye sormadan herkesi aynı odaya alan bir program, sessiz kalanları fark etmez bile. Bizde başvuruda seviye belirtiliyor ve gruplar ona göre dengeleniyor; yine de bu, seviye testi anlamına gelmiyor.',
      },
      {
        q: 'Yaş grupları gerçekten ayrı mı?',
        a: 'Yetişkin, lise çağı ve çocuk grubunun aynı yöntemle çalışması mümkün değil. On dört yaşındaki biriyle otuz beş yaşındaki birini aynı doğaçlamaya sokmak ikisini de kilitler. Bir programın yaş aralığını geniş yazması (örneğin 10-40) çoğu zaman grubun henüz dolmadığı anlamına gelir. Ayrı gün, ayrı eğitmen, ayrı müfredat olup olmadığını sor.',
      },
      {
        q: 'Konuşurken hata yaptığımda ne oluyor?',
        a: 'Bu, atölyenin karakterini belirleyen soru. Her hatanın anında düzeltildiği bir odada kimse risk almaz ve akıcılık gelişmez. Hiç düzeltilmeyen bir odada da yanlış kalıplar yerleşir. Aradaki denge genellikle şu: sahne sırasında akış bölünmez, geri bildirim sonrasında toplu olarak verilir. Eğitmenin bu konudaki tercihini söyleyebilmesi gerekiyor.',
      },
      {
        q: 'Sonunda elimde ne kalıyor?',
        a: 'Sertifika bekliyorsan bunu baştan sor; sahne sanatları atölyelerinin çoğu belge vermez ve vermesi de anlamlı değildir. Kalıcı olan şey başka: yabancı bir dilde, hazırlıksız, kalabalık önünde konuşmuş olmak. Seyircili bir kapanışı olan programlar bu deneyimi garantiler. Kapanışı olmayan programlar da çalışır, ama o eşiği kendin aşmak zorunda kalırsın.',
      },
    ],
    related: [
      'yetiskinler-icin-ingilizce-drama-istanbul',
      'gencler-icin-ingilizce-drama-istanbul',
      'cocuklar-icin-ingilizce-drama-istanbul',
      'ingilizce-oyunculuk-istanbul',
    ],
  },

  // ── KAMERA ÖNÜ OYUNCULUK ─────────────────────────────────────────
  {
    slug: 'kamera-onu-oyunculuk-istanbul',
    label: 'Kamera Önü',
    h1: 'KAMERA ÖNÜ\nOYUNCULUK',
    eyebrow: 'Karakter · Çerçeve · Audition',
    seoTitle: 'Kamera Önü Oyunculuk Kursu İstanbul — Audition & Self-Tape',
    seoDesc:
      'İstanbul kamera önü oyunculuk kursu: 4 hafta, en çok 10 kişi. Karakter, çerçeve bilinci, göz hattı, soğuk okuma ve self-tape; Türkçe ve İngilizce metinlerle casting hazırlığı. Pera.',
    keywords: [
      'kamera önü oyunculuk', 'kamera önü oyunculuk kursu istanbul',
      'kamera oyunculuğu eğitimi', 'dizi oyunculuğu kursu istanbul',
      'sinema oyunculuğu kursu', 'audition hazırlık kursu', 'self tape eğitimi',
      'casting hazırlık istanbul', 'showreel çekimi istanbul',
      'kamera önü oyunculuk beyoğlu', 'kamera önü oyunculuk taksim',
      'ingilizce kamera önü oyunculuk', 'soğuk okuma tekniği',
    ],
    intro:
      'Sahnede işleyen oyunculuk kamerada aynı şekilde işlemiyor. Sahne için büyütülen her şey — jest, ses, enerji — objektifin önünde fazla geliyor. Camera Praxis tam olarak bu farkı çalışan dört haftalık yoğun atölyemiz (Selen Uçer, Pera); şu an yeni dönem için kayıt almıyor, bekleme listesi açık. Bu dönem kamerayla çalışmanın açık kapısı English Acting Praxis: finalinde cast direktörü Harika Uygur ile bir günlük masterclass ve çekim günü var, performanslar kayda alınıp katılımcılara teslim ediliyor.',
    what:
      'Karakter analiziyle başlıyoruz: hedef, engel, alt metin; ama metni kamera için okuyarak. Sonra teknik: çerçeve bilinci, yakın planda enerji yönetimi, göz hattı, aynı hareketi her çekimde aynı anda tekrarlayabilmek. Son hafta tamamen audition: soğuk okuma, casting simülasyonu, self-tape çekimi. Çıkışta showreel için kullanabileceğin kayıt elinde oluyor. Çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor. Grup en çok 10 kişi; kamera önünde çekim sırayla yapıldığı için kontenjan büyüdükçe kişi başına düşen kamera süresi azalıyor, sınırı bu yüzden düşük tutuyoruz.',
    who:
      'Sahne deneyimi olup kameraya geçmek isteyenler, casting\'lere girip geri dönüş alamayanlar, self-tape hazırlaması gerekenler ve iki dilde birden çalışmak isteyen oyuncular.',
    // Açık program önce (29 Eylül 2026): Camera Praxis kayıt almıyor.
    workshopSlugs: ['english-drama-final-project', 'camera-praxis', 'oyuncunun-mevcudiyeti'],
    districtSlugs: ['beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Kamera önü oyunculuk kursu için sahne deneyimi şart mı?',
        a: 'Şart değil ama faydalı. Program temel oyunculuk araçlarını da kapsıyor; yine de sahnede çalışmış olmak kameradaki ölçek farkını daha hızlı kavramanı sağlıyor.',
      },
      {
        q: 'Self-tape kaydı alıyor muyum?',
        a: 'Evet. Camera Praxis\'te son hafta çekilen self-tape ve casting simülasyonu kayıtları katılımcılara teslim ediliyor. Şu an açık olan English Acting Praxis\'te de final çekim gününde performanslar kayda alınıp teslim ediliyor; ikisi de showreel için kullanılabilir materyal.',
      },
      {
        q: 'İngilizce audition hazırlığı yapıyor musunuz?',
        a: 'Evet. Çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor. Uluslararası casting\'lere hazırlananlar için İngilizce sahne çalışan English Acting Praxis programı da var.',
      },
      {
        q: 'Sahne oyunculuğu ile kamera önü oyunculuğu arasındaki fark ne?',
        a: 'Ölçek ve zaman. Sahnede oyuncu son sıradaki seyirciye ulaşmak zorunda ve sahne baştan sona akıyor. Kamerada yakın plan en küçük değişikliği görüyor, sahne ise parça parça, farklı açılardan ve defalarca çekiliyor. Karakter çalışması aynı kalıyor; değişen, onu hangi ölçekte oynadığın ve kaç kez aynı tazelikte tekrar edebildiğin.',
      },
      {
        q: 'Self-tape çekmek için hangi ekipman gerekir?',
        a: 'Pahalı ekipman şart değil. SAG-AFTRA\'nın 2020 tarihli rehberine göre telefonların ses kalitesi artık self-tape için yeterli; dış mikrofon kaliteyi artırabilir ama zorunlu değil. Sabit bir telefon tutucu ya da tripod, düz renkli bir arka plan (mavi, gri ya da kırık beyaz; saf beyaz değil) ve yüzü önden aydınlatan bir ışık kaynağı, pencere de olur, iyi bir başlangıç. Ayrıntıları self-tape rehberimizde adım adım yazdık.',
      },
      {
        q: 'Camera Praxis ne zaman başlıyor?',
        a: 'Yeni dönemin tarihi yakında açıklanacak. Bekleme listesine yazılırsan tarih kesinleştiğinde ilk haber alanlardan olursun. Program 4 hafta sürüyor, Pera\'da yapılıyor ve grup en çok 10 kişi.',
      },
      {
        q: 'Dizi oyuncusu olmak için kamera önü kursu şart mı?',
        a: 'Resmî bir şart yok. Ama sette istenen teknik beceriler, yani göz hattı, süreklilik, markaya basmak, aynı sahneyi defalarca taze oynamak, sahnede kendiliğinden öğrenilmiyor. Kamera önü çalışması bu boşluğu kapatıyor; temeli ise sahne oyunculuğu kuruyor. Sıralamayı dizi oyuncusu olmak üzerine yazımızda ayrıntılı anlattık.',
      },
      {
        q: 'Kamera önü oyunculuk kursunda kaç kişi olmalı?',
        a: 'Kamera önünde çekim sırayla yapılır; grup büyüdükçe kişi başına kamera süresi azalır. Camera Praxis\'te kontenjan en çok 10 kişi. Başka bir program seçiyorsan bir oturumda kaç kez kameraya gireceğini ve kaydın sana verilip verilmeyeceğini baştan sor.',
      },
    ],
    criteria: [
      {
        q: 'Kamera gerçekten kullanılıyor mu, ne sıklıkta?',
        a: 'Kamera önü çalışmasının tamamı geri izlemeye dayanır: kendini izlemeden ölçeği ayarlayamazsın. Bazı programlarda kamera yalnızca son haftalarda çıkar. Her oturumda çekim yapılıp yapılmadığını ve kaydın sana verilip verilmediğini baştan sor.',
      },
      {
        q: 'Elinde kalan bir materyal oluyor mu?',
        a: 'Programın sonunda self-tape ya da sahne kaydı alıyorsan, o kayıt casting başvurularında doğrudan kullanılır. Hiçbir görüntü teslim edilmiyorsa, öğrendiğin şeyi kimseye gösteremezsin. Bu, kamera önü programlarında en sık atlanan ayrıntıdır.',
      },
      {
        q: 'Grup kaç kişi?',
        a: 'Kamera önünde kontenjan sahneden daha da belirleyicidir, çünkü çekim sırayla yapılır. On beş kişilik bir grupta kameraya birkaç dakika girersin. Kalan sürede başkalarını izlemek öğretici olabilir ama kendi tekrarının yerini tutmaz.',
      },
      {
        q: 'Casting tarafından biri sürece dahil oluyor mu?',
        a: 'Oyunculuk eğitmeni ile casting yönetmeni farklı şeylere bakar. İkisinin de sürece girdiği programlarda hem teknik hem de seçilme mantığı üzerine geri bildirim alırsın. Dahil oluyorsa kim olduğu açıkça yazılmalı.',
      },
      {
        q: 'Türkçe mi İngilizce mi, yoksa ikisi de mi?',
        a: 'Hedefin yerel dizi ve reklam ise Türkçe metin yeterlidir. Uluslararası casting ya da yurt dışı başvurusu düşünüyorsan İngilizce sahne çalışması ayrı bir hazırlık ister. Programın hangisini kapsadığını en baştan netleştir, çünkü ikisi aynı şey değildir.',
      },
    ],
    guide: {
      heading: 'KAMERA ÖNÜ SÖZLÜĞÜ',
      lead: 'Sete ilk kez giren oyuncunun en çok zorlandığı şey çoğu zaman oyunculuk değil, setin dili. Bir çekim gününde duyacağın on iki terim, ne anlama geldikleri ve oyuncudan ne istedikleri.',
      items: [
        { term: 'Plan boyu (çekim ölçeği)', body: 'Kameranın seni ne kadar geniş ya da yakın gördüğü. Genel planda beden ve yürüyüş, yakın planda yüz ve göz okunur. Oyuncu hangi planda çekildiğini bilip ölçeğini ona göre ayarlar.', href: '/makaleler/kamera-onunde-oyunculuk' },
        { term: 'Yakın plan (close-up)', body: 'Kadrajın büyük kısmını yüzün kapladığı çekim. Sahnede görünmeyen küçük değişiklikler, bir bakışın kayması ya da tutulan bir nefes, burada okunur; sahne için büyütülmüş ifade ise fazla gelir.' },
        { term: 'Göz hattı (eyeline)', body: 'Oyuncunun baktığı nokta. Kurguda sahnenin tutarlı görünmesi için her çekimde aynı yere bakmak gerekir. Self-tape\'te bu nokta genellikle kameranın hemen yanında duran okuyucudur.', href: '/makaleler/self-tape-nasil-cekilir' },
        { term: 'Süreklilik (devamlılık)', body: 'Aynı sahne birçok çekimde, farklı açılardan çekilir. Bardağı hangi cümlede kaldırdığın, başını ne zaman çevirdiğin her çekimde aynı olmalı ki kurguda parçalar birleşebilsin.' },
        { term: 'Master çekim ve coverage', body: 'Sahnenin önce tamamının geniş bir açıdan çekilmesi (master), sonra aynı sahnenin yakın planlardan ve karşı açılardan yeniden çekilmesi (coverage). Oyuncu aynı sahneyi bir çekim gününde defalarca, her seferinde canlı oynamak zorunda kalır.' },
        { term: 'Marka', body: 'Oyuncunun duracağı yerin yerde bantla işaretlenmesi. Odak ve ışık o noktaya göre ayarlandığı için markayı kaçırmak çekimi bozabilir.' },
        { term: 'Self-tape', body: 'Oyuncunun seçme sahnesini kendi imkânlarıyla kaydedip casting\'e göndermesi. Pek çok seçmede ilk eleme artık bu kayıtla yapılıyor.', href: '/makaleler/self-tape-nasil-cekilir' },
        { term: 'Slate', body: 'Oyuncunun adını ve istenen bilgileri söylediği kısa tanıtım. Kaydın başında mı, ayrı bir videoda mı olacağını, hatta hiç olup olmayacağını casting talimatı belirler.' },
        { term: 'Okuyucu (reader)', body: 'Seçmede karşı karakterin repliklerini okuyan kişi. Kamera dışında, kameranın hemen sağında ya da solunda durur; oyuncunun göz hattını o belirler.' },
        { term: 'Soğuk okuma', body: 'Önceden çalışılmamış ya da çok kısa sürede hazırlanmış bir metni oynamak. Casting koşullarında sık karşılaşılır ve ayrıca çalışılması gereken bir beceridir.', href: '/makaleler/casting-direktoru-neye-bakar' },
        { term: 'Callback', body: 'İlk seçmeden sonra yapılan ikinci görüşme. Oyuncudan çoğu zaman aynı sahneyi farklı notlarla yeniden oynaması istenir; not alıp anında uygulayabilmek burada sınanır.' },
        { term: 'Showreel', body: 'Oyuncunun ekranda nasıl göründüğünü gösteren kısa kurgu video. Casting\'e ve ajanslara gönderilir; en güçlü sahne başa konur.', href: '/makaleler/dizi-oyuncusu-olmak-icin-nereden-baslanir' },
      ],
    },
    articleSlugs: [
      'self-tape-nasil-cekilir',
      'kamera-onunde-oyunculuk',
      'casting-direktoru-neye-bakar',
      'dizi-oyuncusu-olmak-icin-nereden-baslanir',
      'turk-oyuncularin-uluslararasi-kariyeri-dil-ve-casting',
      'tiyatro-secmeleri-icin-monolog-nasil-calisilir',
    ],
    facts: {
      heading: 'SELF-TAPE ve KAMERA: YAZILI STANDARTLAR',
      lead: 'Kamera önü oyunculuğunda "güzel çekim" ölçülebilir kurallara dayanıyor. Aşağıdaki maddeler casting tarafının yayımladığı rehberlerden derlendi, kaynağı ve tarihi yanında. Kaynaklar bazı noktalarda ayrışıyor; bunu da işaretledik.',
      rows: [
        {
          label: 'Yatay kayıt, düz arka plan',
          value: 'Aksi istenmedikçe yatay (landscape) çekim; düz mavi ideal, gri, yeşil ya da kırık beyaz kabul edilebilir; saf beyaz ve desenden kaçın; seçme ilanından sonraki ilk 2-3 gün içinde gönder',
          source: 'SAG-AFTRA, "Self-Tape Anatomy", 15 Ağustos 2020',
          url: 'https://sagaftra.org/self-tape-anatomy',
        },
        {
          label: 'Çerçeve',
          value: 'Göğüs hizasından başın biraz üstüne; sabit kamera; okuyucu kameranın hemen dışında',
          source: 'Backstage, "10 Self-Tape Tips", 14 Şubat 2024',
          url: 'https://www.backstage.com/magazine/article/tips-winning-self-tape-audition-13472/',
        },
        {
          label: 'Slate (kendini tanıtma)',
          value: 'Kaynaklar ayrışıyor: SAG-AFTRA slate\'i seçme kaydından ayrı bir video olarak çekip ikisini birlikte göndermeyi öneriyor; Backstage casting açıkça istemedikçe slate yapılmamasını söylüyor. Doğrusu, casting ilanındaki talimat',
          source: 'SAG-AFTRA (2020) ve Backstage (2024), yukarıdaki iki bağlantı',
          url: 'https://www.backstage.com/magazine/article/tips-winning-self-tape-audition-13472/',
        },
        {
          label: 'Casting tarafının süre ve hacim standardı',
          value: 'İlk self-tape için en çok 6 sayfa ve en az 4 gün hazırlık; 3 sayfa ve altı için en az 3 gün; en çok 2 rol, rol başına en çok 2 sahne, sahne başına en çok 2 versiyon; oyuncudan okuyucu ücreti istenmez',
          source: 'Equity, CDG, PMA ve CPMA ortak en iyi uygulama, Backstage UK, 12 Ağustos 2021 (Birleşik Krallık)',
          url: 'https://www.backstage.com/uk/magazine/article/casting-directors-equity-best-practice-self-tapes-73820/',
        },
        {
          label: 'Göz hattı',
          value: 'Göz hattı kesin ve tutarlı olmalı; evde çalışırken bakış noktalarını bant ya da yapışkan notla işaretle, kendini kaydedip izle',
          source: 'Backstage, "Eyelines: A Film Guide", 8 Nisan 2022',
          url: 'https://www.backstage.com/magazine/article/eyelines-film-guide-74961/',
        },
        {
          label: 'Süreklilik (continuity)',
          value: 'Aynı fiziksel hareketleri her çekimde birebir tekrarla; süreklilik bozulursa kurgucu daha zayıf bir çekimi kullanmak zorunda kalabilir',
          source: 'Backstage, Jordan Goldman (Emmy ödüllü kurgucu), 16 Aralık 2015',
          url: 'https://www.backstage.com/magazine/article/technical-skill-film-actors-must-learn-7768/',
        },
        {
          label: 'Camera Praxis, bizim sayılarımız',
          value: '4 hafta; en çok 10 kişi; üç blok: karakter (1. hafta), kamera (2 ve 3. hafta), audition (4. hafta)',
          source: 'Techne Lab program sayfası',
          url: 'https://www.technelabistanbul.com/atolyeler/camera-praxis',
        },
      ],
      note: 'Not: Türkiye\'deki casting ajanslarının ve platformlarının yayımlanmış bir self-tape standardını bulamadık; yukarıdakiler ABD (SAG-AFTRA, Backstage) ve Birleşik Krallık (Equity, CDG) kaynaklı rehberler. Kaynaklara 7 Ekim 2026\'da yeniden bakıldı. Türkiye\'de her casting kendi talimatını yazar; ilanı kelimesi kelimesine okumak her zaman önce gelir.',
    },
    related: ['oyunculuk-kursu-istanbul', 'audition-hazirlik-atolyesi-istanbul', 'ingilizce-oyunculuk-istanbul', 'ingilizce-drama-istanbul'],
  },

  // ── DANS ─────────────────────────────────────────────────────────
  {
    slug: 'dans-kursu-istanbul',
    label: 'Dans',
    h1: 'DANS KURSU\nİSTANBUL',
    eyebrow: 'Jazz · Theatre Dance · Broadway',
    seoTitle: 'Dans Kursu İstanbul — Broadway Müzikal Dansı & Jazz Dance Atölyesi',
    seoDesc:
      'İstanbul dans kursu: Broadway müzikal dansı, jazz ve theatre dance. Sahne koreografisi ve showmanship — Kadıköy\'de 12 ya da 6 haftalık program. Dans deneyimi şart değil.',
    keywords: [
      'dans kursu istanbul', 'dans atölyesi istanbul', 'dans dersi istanbul',
      'broadway dans istanbul', 'broadway müzikal dansı', 'jazz dans istanbul',
      'jazz dance kursu', 'theatre dance istanbul', 'tiyatro dansı kursu',
      'modern dans kursu istanbul', 'çağdaş dans atölyesi', 'sahne dansı kursu',
      'koreografi atölyesi istanbul', 'koreografi dersi', 'tap dans istanbul',
      'müzikal dans kursu', 'showdance istanbul', 'dans kursu kadıköy',
      'anadolu yakası dans kursu', 'yetişkin dans kursu istanbul',
      'başlangıç dans kursu', 'dans deneyimi olmayanlar için kurs',
    ],
    intro:
      'Broadway dansı teknikten önce anlatıdır — her hareket bir niyet taşır. Techne Lab\'ın dans programı jazz ve theatre dance tekniklerini sahne diliyle birleştiriyor. Köksal Ünal ile Kadıköy\'de, on iki ya da altı hafta, perşembe akşamları.',
    what:
      'İlk dört hafta teknik temel: beden hizalaması, ritim, koordinasyon, müzikle ilişki. Sonra Broadway repertuarından sahneler — stil çalışması ve grup koreografisi. Son bölümde performans bütünlüğü: kostümle çalışma, showmanship ve final koreografisi. Amaç adım ezberletmek değil, sahnede taşıyabileceğin bir beden dili kurmak.',
    who:
      'Dans deneyimi olan ya da olmayan herkes. Müzikal tiyatroya ilgi duyanlar, sahne performansını güçlendirmek isteyen oyuncular ve düzenli fiziksel bir pratik arayanlar. Broadway Musical Dance için seçme yok — teknik temelden başlıyoruz.',
    workshopSlugs: ['broadway-musical-dance', 'techne-musical-lab'],
    districtSlugs: ['kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Hiç dans etmedim, Broadway dansına başlayabilir miyim?',
        a: 'Evet. Program teknik temelden başlıyor — beden hizalaması ve ritimle. Deneyimsizlik engel değil; düzenli katılım daha belirleyici.',
      },
      {
        q: 'Dans programına başvuruda seçme ya da video var mı?',
        a: 'Broadway Musical Dance için yok — seçme ve seviye sınavı olmadan, teknik temelden başlıyoruz. Şarkı videosu yalnızca 8 aylık Techne Musical Lab başvurusunda isteniyor; o da eleme değil, grubu dengelemek için.',
      },
      {
        q: 'Dans atölyeleri hangi gün ve saatte?',
        a: 'Perşembe 19:00–21:00, Kadıköy\'de. Yeni dönem 1 Ekim Perşembe başlıyor; 12 haftalık tam ya da 6 haftalık kısa program seçebilirsin.',
      },
    ],
    related: ['muzikal-tiyatro-kursu-istanbul', 'kadikoy-dans-kursu', 'oyunculuk-kursu-istanbul'],
  },

  // ── MÜZİKAL & ŞAN ────────────────────────────────────────────────
  {
    slug: 'muzikal-tiyatro-kursu-istanbul',
    label: 'Müzikal & Şan',
    h1: 'MÜZİKAL TİYATRO\nKURSU',
    eyebrow: 'Oyunculuk · Şan · Dans',
    seoTitle: 'Müzikal Tiyatro Kursu İstanbul — Şan, Dans & Oyunculuk Eğitimi',
    seoDesc:
      'İstanbul müzikal tiyatro kursu: oyunculuk, şan ve dans tek programda. 8 aylık kapsamlı eğitim, seyircili bitirme performansı — Kadıköy. Köksal Ünal & Bartu Ayaz.',
    keywords: [
      'müzikal tiyatro kursu istanbul', 'müzikal kursu istanbul', 'müzikal eğitimi istanbul',
      'şan kursu istanbul', 'şan eğitimi istanbul', 'şan ve dans atölyesi',
      'musical theatre istanbul', 'müzikal oyunculuk kursu',
      'müzikal tiyatro kadıköy', 'broadway müzikal eğitimi',
      'anadolu yakası müzikal kursu', 'sahne şarkıcılığı kursu',
      'vokal eğitimi istanbul', 'müzikal tiyatro atölyesi',
      'istanbul müzikal atölyesi', 'müzikal atölyesi istanbul', 'müzikal atölyesi',
    ],
    intro:
      'Müzikal tiyatro üç dili aynı anda konuşmayı gerektirir: oyunculuk, şan ve dans. Techne Lab\'ın müzikal programı bu üçünü ayrı başlıklar olarak değil, tek bir sahne pratiği olarak kuruyor. Köksal Ünal ve Bartu Ayaz ile Kadıköy\'de, sekiz ay, haftada iki gün.',
    what:
      'Program dramadan başlıyor, çünkü şarkı da bir sahnedir ve oynanmadan söylenmez. Sekiz ay üç bloğa ayrılıyor. Ekim-Aralık, Oyunculuk & Şan: sahne varlığı, karakter inşası ve vokal teknik; şan ve vokal koçluğuyla buluşan oyuncu sesi. Ocak-Mart, Müzikal Sahneleme: müzikal ritim, Broadway dans temelleri ve şarkıyla sahne hareketinin birleştiği koreografi. Nisan-Mayıs, Yıl Sonu Gösterisi: sahnelenmiş bir müzikal; kostüm, ışık ve dekorla, seyirci önünde tam bir prodüksiyon.\n\nİki eğitmen aynı programı birlikte yürütüyor. Bartu Ayaz, İstanbul Üniversitesi Devlet Konservatuvarı Müzikal Tiyatro bölümünden mezun; Grease, Alaaddin\'in Müzikali ve Damdaki Kemancı gibi prodüksiyonlarda sahne aldı. Programda şan, vokal koçluğu ve müzikal oyunculuk tarafını taşıyor. Köksal Ünal koreograf; 2017 Yılın Koreografisi ödülünün sahibi ve İstanbul Aydın Üniversitesi Güzel Sanatlar Fakültesi\'nde öğretim görevlisi. Hareket, dans ve sahneleme onun alanı. Şarkı ile koreografi ayrı odalarda değil, aynı sahne çalışmasının içinde buluşuyor: bir numarada nefesin, adımın ve karakterin niyetinin aynı anda nasıl taşınacağı birlikte çalışılıyor.\n\nGrup en fazla 12 kişi. Bu sınırın sebebi şan: ses, bireysel geri bildirim olmadan doğru kurulmuyor ve kalabalık bir sınıfta herkesin sesini tek tek duymak mümkün olmuyor. Çalışma haftada iki gün, Ekim\'den Mayıs\'a Kadıköy\'de sürüyor. 2026-27 dönemi 12 Ekim Pazartesi başlıyor. Sekiz ayın sonunda elinde bir katılım belgesinden fazlası oluyor: seyirci önünde baştan sona oynanmış bir müzikal ve o sahneye varana kadar biriktirilmiş bir repertuvar.',
    who:
      'Şarkı söyleyip bunu sahneye taşımak isteyenler; oyunculuk çalışmış ve müzikale geçmek isteyenler; dans geçmişi olup üzerine ses ve oyunculuk eklemek isteyenler. Ortak nokta, üç disiplini birden ve uzun soluklu çalışmaya hazır olmak. Program konserde şarkı söylemeyi değil, bir karakterin sesi olarak şarkı söylemeyi öğretiyor; yalnızca ses tekniği arıyorsan birebir şan dersi daha doğru bir başlangıç olabilir.\n\nProgram 15-55 yaş aralığına açık ve katılımcılar aynı grupta çalışıyor. Profesyonel şan ya da dans geçmişi beklenmiyor: ses çalışması temelden kuruluyor, dans tarafı da teknik temelden başlıyor. Beklenen şey temel bir ses kontrolü, öğrenme isteği ve sekiz ay boyunca haftada iki gün düzenli katılım. Müzikal bir ansambl işi; bir kişinin sürekli devamsızlığı bütün grubun provasını etkiliyor.\n\nBaşvuru için bir müzikal ya da pop şarkıyı seslendirdiğin 1-2 dakikalık kısa bir video isteniyor. Telefonla çekilmiş olması yeterli, sesinin net duyulması önemli. Kabul video incelemesiyle yapılıyor; video bir yetenek sınavından çok, sesinin bugün nerede durduğunu görüp grubu dengeli kurmak için. Kararsızsan önce bir tanışma günü seansına gelip programı ve eğitmenleri yakından görebilirsin.',
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
    districtSlugs: ['kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Şan eğitimi programa dahil mi?',
        a: 'Evet. Bartu Ayaz ile şan ve vokal çalışması programın omurgasında — ayrı bir başlık olarak değil, oyunculuk ve dansla birlikte yürüyor. "Şarkı yoluyla oynamak" programın merkezinde.',
      },
      {
        q: 'Nota bilmem gerekiyor mu?',
        a: 'Gerekmiyor. Şan çalışması kulaktan ve bedenden ilerliyor. Nota bilgisi avantaj ama önkoşul değil.',
      },
      {
        q: 'Müzikal programı ile Broadway dans programı arasındaki fark ne?',
        a: 'Broadway Musical Dance sadece dansa odaklı; 12 haftalık tam ya da 6 haftalık kısa seçenekle alınabiliyor. Techne Musical Lab 8 aylık ve üç disiplini birden kapsıyor — oyunculuk, şan, dans — ve seyircili bir bitirme performansıyla kapanıyor.',
      },
      {
        q: 'Program ne zaman ve nerede başlıyor?',
        a: 'Techne Musical Lab\'in 2026-27 dönemi 12 Ekim Pazartesi Kadıköy\'de başlıyor ve Mayıs\'a kadar haftada iki gün sürüyor. Tam adres kayıt sonrası paylaşılıyor.',
      },
      {
        q: 'Başvuru videosu için hangi şarkıyı seçmeliyim?',
        a: 'Bir müzikal ya da pop şarkı olabilir. En iyi seçim, sesine rahat oturan ve ne anlattığını bildiğin bir parça: en yüksek notayı zorlayan bir şarkı yerine, sözlerini gerçekten söyleyebildiğin bir şarkı daha çok şey gösterir. 1-2 dakika yeterli, telefon kaydı sorun değil.',
      },
      {
        q: 'Kayıt olmadan önce programı görebilir miyim?',
        a: 'Evet. Ücretsiz tanışma günü seanslarında programı ve eğitmenleri yakından görebilir, sorularını sorabilirsin. Güncel seanslar tanışma günü sayfasında listeleniyor; seans yeri programın yürüdüğü Kadıköy\'den farklı olabilir, sayfada ayrıca yazıyor.',
      },
    ],
    criteria: [
      {
        q: 'Üç disiplin gerçekten birlikte mi çalışılıyor?',
        a: 'Müzikal programlarının çoğu takvimi üçe böler: bir dönem şan, bir dönem dans, bir dönem oyunculuk. Bu, üç ayrı kursu arka arkaya almak demektir ve müzikalin asıl zorluğunu atlar. Asıl zorluk, şarkının ortasında karakterin hedefini kaybetmemek. Programın aynı sahne üzerinde üçünü birden çalıştırıp çalıştırmadığını sor.',
      },
      {
        q: 'Şanı kim veriyor, hangi teknikle?',
        a: 'Müzikal sesi klasik şan sesinden farklı çalışır; belting, mix ve konuşur gibi söyleme ayrı bir teknik gerektirir. Klasik eğitimli bir hocanın müzikal repertuvarı çalıştırması mümkün ama tekniği aktarması ayrı bir uzmanlık. Eğitmenin sahne geçmişini ve hangi repertuvarda çalıştığını öğrenmek, tanıtım metnindeki sıfatlardan daha çok şey söyler.',
      },
      {
        q: 'Dans için ön deneyim isteniyor mu?',
        a: 'Müzikal dansı bale değil; koreografiyi karakterle taşımak esas. Yine de gruptaki seviye farkı büyükse provalar ya çok yavaş ya çok hızlı ilerler. Başvuruda dans geçmişinin sorulup sorulmadığına bak. Hiç sorulmuyorsa grubun nasıl dengeleneceği belirsizdir.',
      },
      {
        q: 'Ses kaydı ya da ön eleme var mı?',
        a: 'Ön eleme kulağa caydırıcı geliyor ama koruyucudur: sesin henüz taşımadığı bir repertuvara sokulmak, sekiz ay boyunca geri kalmak demek. Kısa bir video ya da tanışma seansı isteyen programlar genellikle grubu ciddiye alıyor. Hiçbir ön değerlendirme yapmayan program, herkesi aynı anda memnun etmeye çalışır ve genellikle edemez.',
      },
      {
        q: 'Sahne, kostüm ve ışık var mı?',
        a: 'Müzikal, tekniğin seyirci önünde sınandığı yerde öğrenilir. Stüdyo içinde kalan bir kapanış da değerlidir, ama kostümlü ve ışıklı bir sahne bambaşka bir kas çalıştırır: mikrofonla söylemek, ışık altında yönünü bulmak, kalabalık önünde nefesini toparlamak. Programın kapanışının nerede ve nasıl olacağı baştan yazılı olmalı.',
      },
    ],
    related: ['dans-kursu-istanbul', 'kadikoy-muzikal-tiyatro-kursu', 'oyunculuk-kursu-istanbul'],
  },

  // ── OYUN YAZARLIĞI & DRAMATURJİ ──────────────────────────────────
  {
    slug: 'oyun-yazarligi-kursu-istanbul',
    label: 'Yazarlık',
    h1: 'OYUN YAZARLIĞI\nKURSU',
    eyebrow: 'Dramaturji · Metin · Yapı',
    seoTitle: 'Oyun Yazarlığı Kursu İstanbul — Dramaturji & Yaratıcı Yazarlık Atölyesi',
    seoDesc:
      'İstanbul oyun yazarlığı ve dramaturji atölyesi: 8 hafta metin analizi, karakter, çatışma ve yapı. Sophokles\'ten Beckett\'e — Halil Yağız Şanal ile Kadıköy.',
    keywords: [
      'oyun yazarlığı kursu istanbul', 'oyun yazarlığı atölyesi', 'dramaturji atölyesi istanbul',
      'dramaturji kursu', 'yaratıcı yazarlık atölyesi istanbul', 'yazarlık kursu istanbul',
      'senaryo yazarlığı atölyesi istanbul', 'senaryo kursu istanbul',
      'metin yazarlığı atölyesi', 'kurmaca yazarlık atölyesi',
      'oyun yazarlığı kadıköy', 'yaratıcı yazarlık kadıköy',
      'tiyatro metni yazma', 'dramatik yazarlık eğitimi',
      // Yaş sınırı olmayan yazarlık — rakip taraması (Ağustos 2026):
      // PSM Atölye ücretsiz ve güçlü ama 18–35 yaş alıyor. 35 üstü,
      // ödeme gücü en yüksek segment, İstanbul'da açıkta kalmış durumda.
      '35 yaş üstü oyun yazarlığı', 'yetişkinler için yazarlık atölyesi',
      'yaş sınırı olmayan yazarlık kursu', 'orta yaş yazarlık atölyesi',
      'geç başlayan yazarlar için atölye', 'ikinci kariyer yazarlık',
    ],
    intro:
      'Yazmak için ilham beklemek gerekmiyor — yapıyı öğrenmek gerekiyor. The Auteur Lab, kendi metnini kurmanın temel dinamiklerine odaklanan sekiz haftalık bir dramaturji ve oyun yazarlığı atölyesi. Halil Yağız Şanal ile Kadıköy\'de, çarşamba akşamları.',
    what:
      'Üç modül. Antikten moderne: Sophokles\'ten Ibsen\'e dramatik yapının temelleri — metin analizi, karakter arkı, çatışma, alt metin. Çağdaş yazın: Beckett, Kane, Zeller, Williams — parçalanmış yapılar, suskunluk, çoğul anlatı. Kendi sesin: kısa oyun taslakları ve dramaturgik geri bildirim. Program teoriyle başlayıp senin metninle bitiyor.',
    who:
      'Roman yazmak isteyenler, senaryoya çalışanlar, öykü yazanlar, hiç yazmamış olanlar ve yönetmenlik yapıp metinle ilişkisini derinleştirmek isteyenler. Bir başlangıç programı ama teknikle başlamıyor: önce bir metnin neden işlediğini görebilmek gerekiyor. O bakış yerleştiğinde hangi biçimde yazdığınız ikincil kalıyor. Tek beklenti düzenli katılım ve yazma isteği — portfolyo aranmıyor. Yaş sınırı yok: kırkında ilk oyununu yazmaya başlayan da, yıllardır yazıp sahne diline geçemeyen de aynı masada. Türkiye\'deki yazarlık programlarının çoğu genç yaş bandına kapalı bir kontenjan ayırıyor; burada öyle bir sınır yok.',
    workshopSlugs: ['auteur-lab'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Daha önce hiç yazmadım, oyun yazarlığı atölyesine katılabilir miyim?',
        a: 'Evet. Auteur Lab sahne dilini sıfırdan kuruyor. Roman, senaryo ya da hiç yazmamış olmak fark etmiyor; program yapıyı temelden öğretiyor.',
      },
      {
        q: 'Atölye sonunda elimde bir oyun oluyor mu?',
        a: 'Kısa oyun taslakları çıkıyor ve her taslak dramaturgik geri bildirim alıyor. Sekiz haftada tam bir oyun bitirmek hedef değil — kendi yazma yönteminizi kurmak hedef.',
      },
      {
        q: 'Dramaturji ile oyun yazarlığı aynı şey mi?',
        a: 'Değil ama iç içe. Dramaturji metnin nasıl işlediğini çözümlemek, oyun yazarlığı o bilgiyle yeni metin kurmak. Program ikisini birlikte yürütüyor — önce okuma, sonra yazma.',
      },
      {
        q: 'Yaş sınırı var mı? Kırkımdan sonra yazmaya başlamak geç mi?',
        a: 'Yaş sınırı yok ve geç değil. Türkiye\'deki ücretsiz yazarlık programlarının çoğu belirli bir yaş bandına kontenjan ayırıyor; Auteur Lab\'de böyle bir sınır bulunmuyor. Sahne yazarlığında biriktirilmiş yaşam malzemesi dezavantaj değil, ham madde — geç başlayan yazarın anlatacak daha çok şeyi oluyor.',
      },
      {
        q: 'Atölye kimin yürütücülüğünde?',
        a: 'Halil Yağız Şanal — oyun yazarı, yönetmen ve Techne Lab\'ın kurucusu. Atölye bir eğitim kurumunun içinde değil, üretim yapan bir tiyatro şirketinin içinde yürüyor; yazılan metin sahneyi bilen birinin gözünden geçiyor.',
      },
    ],
    criteria: [
      {
        q: 'Yazma mı çalışılıyor, okuma mı?',
        a: 'Yalnızca teknik anlatan bir program, sekiz hafta sonunda kafanda kavram bırakır ama sayfada satır bırakmaz. Yalnızca yazdıran bir program ise neyi neden yazdığını sormadan üretir. İkisi birlikte olmalı: bir metnin neden işlediğini görmek, sonra o bakışla kendi metnini kurmak. Programın haftalık akışında hem okuma hem yazma ödevi olup olmadığına bak.',
      },
      {
        q: 'Yazdığın metni kim okuyor?',
        a: 'Yazarlık atölyesinin asıl değeri geri bildirimde. Sorulacak soru şu: metni yalnızca yürütücü mü okuyor, grup da okuyor mu, ve geri bildirim nasıl veriliyor? Sırayla övgü toplanan bir masa kimseyi ilerletmez. Yapıya, karaktere ve çatışmaya bakan somut bir okuma gerekiyor. Bunun nasıl yapıldığını soran bir soruya net cevap gelmiyorsa, muhtemelen bir yöntem yoktur.',
      },
      {
        q: 'Yürütücü kendi yazıyor mu, sahneleniyor mu?',
        a: 'Metin analizini iyi bilen bir akademisyenle, yazdığı oyun sahnelenmiş biri farklı şeyler görür. İkincisi provada neyin düştüğünü, hangi repliğin oyuncunun ağzında durmadığını bilir. Yazarlık öğrenirken bu fark önemlidir. Yürütücünün sahnelenmiş işi olup olmadığı açıkça yazılı olmalı.',
      },
      {
        q: 'Sonunda tam bir oyun çıkacak mı?',
        a: 'Sekiz haftada bitmiş bir oyun vaat eden programa temkinli yaklaş. Gerçekçi olan şu: kısa taslaklar, bir yöntem ve metni tek başına ilerletebilecek bir bakış. Tam metin sonrasında, kendi takviminde yazılır. Bir program bu beklentiyi baştan doğru kuruyorsa, gerisinde de dürüst çalışıyordur.',
      },
      {
        q: 'Yaş ya da portfolyo şartı var mı?',
        a: 'Türkiye\'deki ücretsiz yazarlık programlarının önemli bölümü belirli bir yaş bandına kontenjan ayırıyor; kırkından sonra yazmaya başlayan biri çoğu kapıyı kapalı buluyor. Başvuru koşullarını baştan oku. Portfolyo istenmesi de kendi başına kötü değil, ama hiç yazmamış birine kapalıysa bunu açıkça yazmış olmaları gerekir.',
      },
    ],
    related: ['oyunculuk-kursu-istanbul', 'yaratici-drama-istanbul'],
  },

  // ── ÇOCUKLAR İÇİN İNGİLİZCE DRAMA (10–14) ────────────────────────
  // Rakip taraması: veliler "çocuklar için" + yaş aralığı ile arıyor.
  // Programımız 10'dan başladığı için bu sorgularda meşru olarak varız.
  {
    slug: 'cocuklar-icin-ingilizce-drama-istanbul',
    label: 'Çocuklar İçin İngilizce Drama',
    h1: 'ÇOCUKLAR İÇİN\nİNGİLİZCE DRAMA',
    eyebrow: '10–14 Yaş · Yıl Sonu Gösterisi',
    seoTitle: 'Çocuklar İçin İngilizce Drama İstanbul — 10-14 Yaş Yaratıcı Drama',
    seoDesc:
      'İstanbul 10-14 yaş İngilizce drama: dil öğretmiyoruz, dili sahnede deneyimliyoruz. Ders kitabı ve sınav yok — oyunla İngilizce konuşma pratiği. B1 ve üzeri. Sekiz ay, seyircili final gösterisi. Pera ve Kadıköy.',
    keywords: [
      'çocuklar için ingilizce drama', 'çocuk ingilizce drama kursu istanbul',
      'ingilizce drama çocuk', '10 yaş drama kursu', '11 yaş drama kursu',
      '12 yaş tiyatro kursu', '13 yaş drama kursu', '10 12 yaş yaratıcı drama',
      'çocuklara ingilizce tiyatro', 'çocuk drama kursu kadıköy',
      'ingilizce konuşma çocuk kursu', 'çocuk yaratıcı drama istanbul',
      'çocuklar için tiyatro kursu istanbul',
    ],
    intro:
      'Bu bir İngilizce kursu değil. Dil öğretmiyoruz. Dili deneyimliyoruz. Techne Lab İstanbul\'un 10–14 yaş grubu, İngilizce yaratıcı dramayı sekiz aya yayılan sürekli bir program olarak yürütüyor ve yıl, ailelerin izlediği gerçek bir sahne gösterisiyle kapanıyor. Pera ve Kadıköy\'deki partner stüdyolarda haftada bir gün, on iki kişiyi geçmeyen gruplarla. Program İngilizcesi zaten olan çocuk için kuruldu: B1 ve üzeri bir çocuk için İstanbul\'daki seçenekler çoğu zaman ya bildiğini tekrar eden bir dil kursu ya da Türkçe bir drama kursu oluyor. Burada İngilizce çalışma dili, asıl iş tiyatro.',
    what:
      'Ders kitabı yok, gramer anlatımı yok, sınav ve not yok. Çocuk bir karakteri canlandırırken, bir sahneyi kurarken, arkadaşıyla doğaçlama yaparken dili kullanmak zorunda kalıyor — ve kullandıkça korkusu geçiyor. Öğrendiği İngilizce burada işe yarayan bir şeye dönüşüyor. Her ay üç hafta drama, son hafta konuk atölye: yaratıcı yazarlık, tasarım ve jazz dance dönüşümlü geliyor. Yıl üç evrede ilerliyor: önce oyun ve güven, sonra karakter ve metin, son üç ayda çocukların kendi yazdığı ve tasarladığı malzemeyle gösteri provası. Mayıs\'ta seyirci önünde, tamamen İngilizce sahneye çıkıyorlar.',
    who:
      'İngilizce dersleri iyi giden ama konuşmaya gelince susan çocuklar. Kalabalık önünde utanan, kendini anlatmakta zorlanan çocuklar. Sahneye merakı olanlar. Uluslararası okullarda okuyan, yabancı ya da iki dilli ailelerden gelen ve İngilizcesini okul dışında kullanacak yaratıcı bir alan arayan çocuklar. Oyunculuk deneyimi gerekmiyor; İngilizcede B1 ve üzeri bekliyoruz — sohbet edebiliyorsa yeterli. Dili sıfırdan kurmuyoruz, var olanı konuşmaya çeviriyoruz. Gruplar yaşa göre ayrılıyor: 10–14 ve 15–17 ayrı sınıflarda çalışıyor.',
    workshopSlugs: ['english-drama-youth'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Çocuğumun İngilizce seviyesi yeterli mi?',
        a: 'B1 ve üzeri bekliyoruz — yani günlük bir sohbeti takip edip cevap verebiliyorsa yeterli. Akıcı olması gerekmiyor. Burası İngilizce öğretilen bir yer değil; öğrendiğinin kullanıldığı yer. Sıfırdan dil kurmuyoruz, var olan bilgiyi konuşmaya çeviriyoruz.',
      },
      {
        q: 'Çocuğum 10 yaşından küçük, bir programınız var mı?',
        a: 'Şu an yok. İngilizce drama programımız 10 yaşında başlıyor ve bunun bir sebebi var: sahnede doğaçlama yaparken dili kullanabilmek için önce o dilde bir sohbeti sürdürebilmek gerekiyor. Daha küçük yaşta bu eşik genellikle oluşmamış oluyor ve çocuk sahnede susmak zorunda kalıyor — kimseye faydası olmayan bir deneyim. Türkçe yaratıcı drama ise daha erken yaşta çalışılabiliyor; çocuğunuz için doğru zamanı birlikte konuşmak isterseniz arayın.',
      },
      {
        q: 'Küçük çocuklar büyüklerle aynı grupta mı olacak?',
        a: 'Hayır, gruplar ayrı. 10–14 yaş ve 15–17 yaş farklı sınıflarda çalışıyor. Kayıt sırasında çocuğunuzun yaşına uygun gruba yerleştiriyoruz.',
      },
      {
        q: 'Program ne kadar sürüyor?',
        a: 'Sekiz ay, Ekim\'den Mayıs\'a, haftada bir gün. Pera grubu 4 Ekim\'de başladı ve katılım açık; Kadıköy grubu 17 Ekim\'de başlıyor. Yıl sonunda seyircili, tamamen İngilizce bir final gösterisiyle kapanıyor.',
      },
      {
        q: 'Yıl sonu gösterisi zorunlu mu?',
        a: 'Gösteri programın bir parçası ve tüm grup birlikte hazırlanıyor. Sahnede ne kadar öne çıkacağı çocuğun kendi hızına göre belirleniyor — kimseyi istemediği bir yere itmiyoruz.',
      },
      {
        q: 'Atölyeler nerede yapılıyor?',
        a: 'İki yakada: Pera\'da (Beyoğlu) pazar 13:00, Kadıköy\'de cumartesi 15:00. Dersler partner stüdyolarda yapılıyor. Her iki yerde de haftalık ücretsiz tanışma seansı var.',
      },
      {
        q: 'Çocuğumun İngilizcesi zaten çok iyi, sıkılmaz mı?',
        a: 'Buradaki zorluk kelime ya da gramer değil. Partnerle doğaçlama yapmak, sahne yazmak, sekiz ay boyunca bir karakteri taşımak ve seyirci önüne çıkmak. Program zaten İngilizcesi olan çocuk için kuruldu: dil öğretmiyor, dili çalışma dili olarak kullanıyor. İngilizcesi rahat olan çocuğun oynayacak daha çok alanı oluyor.',
      },
      {
        q: 'Program sonunda İngilizcesi daha akıcı olur mu?',
        a: 'Sınav ve not vermediğimiz için belirli bir seviye vaat etmiyoruz. Çalışma, CEFR\'da B1 ile B2\'yi ayıran beceriye odaklanıyor: her cümleyi kafada kurmadan, dengeli bir tempoyla konuşabilmek. Gençlerle yapılan bir araştırmada drama temelli İngilizce eğitimi alan grubun konuşması, standart iletişimsel derslere giden gruba göre daha akıcı bulundu (Galante ve Thomson, 2017).',
      },
      {
        q: 'Yaratıcılık tarafında neler yapılıyor?',
        a: 'Her ayın son haftası konuk atölye: yaratıcı yazarlık, tasarım ve jazz dance dönüşümlü geliyor. Çocuklar karakterleri için kısa hikâyeler yazıyor, karakter ve maske tasarlıyor, ritim ve grup hareketi kuruyor. Ürettikleri her şey yıl sonu gösterisinin malzemesi oluyor; yani hazır bir oyunu ezberlemiyor, kendi yazıp tasarladıkları bir şeyi sahneliyorlar.',
      },
      {
        q: 'Uluslararası okulda okuyan ya da yabancı ailelerin çocukları katılabilir mi?',
        a: 'Evet. Program İngilizce yürüyor ve tam olarak İngilizcesi zaten olan çocuklar için kuruldu: uluslararası okul öğrencileri, yabancı ve karma ailelerin çocukları, iki dilli çocuklar ve okul İngilizcesi güçlü olup onu kullanacak yer bulamayanlar. Velilerle iletişim İngilizce de yürüyebiliyor.',
      },
    ],
    facts: {
      heading: 'AKICILIK, YARATICILIK VE ARAŞTIRMA',
      lead: 'İngilizcesi B1 ve üzeri olan bir çocuk için asıl soru "daha fazla İngilizce" değil, İngilizceyi kafasında çevirmeden kullanabilmek. Aşağıdaki satırlar bunun ne demek olduğunu ve araştırmaların ne söylediğini kaynağıyla birlikte veriyor. Bulguları abartmadan aktardık.',
      rows: [
        {
          label: 'CEFR B1: konuşma',
          value: 'Cümle kurmak ve düzeltmek için verilen duraklamalar belirgin olsa da anlaşılır biçimde konuşmayı sürdürebilir; tanıdık konularda basit bir sohbeti başlatıp bitirebilir',
          source: 'Avrupa Konseyi, CEFR Tablo 3',
          url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use',
        },
        {
          label: 'CEFR B2: konuşma',
          value: 'Ara sıra tereddüt etse de oldukça dengeli bir tempoyla konuşur; söz alır, sırasını bekler, sohbeti gerektiğinde bitirir. B1\'den B2\'ye geçişin büyük kısmı yeni kelime değil, her cümleyi kafada kurmadan konuşabilmek',
          source: 'Avrupa Konseyi, CEFR Tablo 3',
          url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use',
        },
        {
          label: 'Drama ve akıcılık',
          value: 'İngilizce öğrenen 24 Brezilyalı genç, dört ay boyunca ya drama temelli ya da standart iletişimsel derslerle çalıştı; 30 anadili İngilizce dinleyici drama grubunun konuşmasını daha akıcı ve daha kolay anlaşılır buldu. Aksanda fark yoktu',
          source: 'Galante ve Thomson, TESOL Quarterly 51(1), 2017 (özet: Brock University, 2016)',
          url: 'https://brocku.ca/brock-news/2016/04/brock-research-finds-drama-and-theatre-help-non-english-speaking-students-to-better-speak-english/',
        },
        {
          label: 'Drama ve konuşma kaygısı',
          value: 'Dört aylık programlar sonunda yabancı dil kaygısı hem drama hem drama dışı grupta düştü; drama grubunda biraz daha fazla',
          source: 'Galante, RELC Journal 49(3), 2018',
          url: 'https://journals.sagepub.com/doi/10.1177/0033688217746205',
        },
        {
          label: '47 çalışmalık meta-analiz',
          value: 'Drama temelli öğretimin başarı üzerinde ve psikolojik ve sosyal çıktılarda olumlu etkisi bulundu; yazarlar çalışmaların önemli kısmının neden-sonuç için zayıf tasarlandığını da belirtiyor',
          source: 'Lee, Patall, Cawthon ve Steingut, Review of Educational Research 85(1), 2015',
          url: 'https://journals.sagepub.com/doi/10.3102/0034654314540477',
        },
        {
          label: 'İstanbul\'daki yabancı nüfus',
          value: 'İkamet izinli 610.221 yabancı (3 Eylül 2026 verisi); uluslararası okul ve iki dilli aile çocukları için İngilizce yaratıcı alan ihtiyacının arka planı',
          source: 'Göç Vakfı, Temmuz–Ağustos 2026 göç trendleri (Göç İdaresi Başkanlığı verisi)',
          url: 'https://gocvakfi.org/temmuz-agustos-2026-goc-trendleri',
        },
        {
          label: 'English Drama Youth, bizim sayılarımız',
          value: '10–14 ve 15–17 ayrı gruplar, grup başına en çok 12 kişi; Ekim–Mayıs haftada bir gün; her ay üç hafta drama + bir hafta konuk atölye (yaratıcı yazarlık, tasarım, jazz dance); Mayıs\'ta tamamen İngilizce seyircili gösteri',
          source: 'Techne Lab program sayfası',
          url: 'https://www.technelabistanbul.com/atolyeler/english-drama-youth',
        },
      ],
      note: 'Not: Sınav ve not vermediğimiz için belirli bir CEFR seviye atlaması vaat etmiyoruz. Araştırmalar dramanın akıcılık ve konuşma rahatlığı için iyi desteklenmiş bir yol olduğunu gösteriyor; gramer öğretiminin yerine geçmiyor. Kaynaklara 8 Ekim 2026\'da bakıldı.',
    },
    enPath: '/en/drama-classes-for-kids-istanbul',
    articleSlugs: [
      'ingilizcesi-iyi-olan-cocuk-icin-ne-var',
      'cocugum-ingilizce-biliyor-ama-konusmuyor',
      'ingilizce-drama-cocuga-ne-kazandirir',
      'cocuklar-icin-ingilizce-drama-mi-ingilizce-kursu-mu',
      'cocugum-yabanci-dilde-utaniyor',
      'ingilizce-drama-youth-yas-gruplari-neden-ayri',
    ],
    related: ['gencler-icin-ingilizce-drama-istanbul', 'ingilizce-drama-istanbul', 'yaratici-drama-istanbul'],
  },

  // ── GENÇLER İÇİN İNGİLİZCE DRAMA (15–17) ─────────────────────────
  {
    slug: 'gencler-icin-ingilizce-drama-istanbul',
    label: 'Gençler İçin İngilizce Drama',
    h1: 'GENÇLER İÇİN\nİNGİLİZCE DRAMA',
    eyebrow: '15–17 Yaş · Yıl Sonu Gösterisi',
    seoTitle: 'Gençler İçin Tiyatro Kursu İstanbul — 15-17 Yaş İngilizce Drama',
    seoDesc:
      'İstanbul 15-17 yaş İngilizce drama: dil öğretmiyoruz, dili sahnede deneyimliyoruz. Lise çağı için sahne, doğaçlama ve İngilizce konuşma pratiği — sınav ve not yok. B1 ve üzeri. Sekiz ay, seyircili final gösterisi. Pera ve Kadıköy.',
    keywords: [
      'gençler için tiyatro kursu istanbul', 'genç drama kursu', 'lise tiyatro kursu',
      '15 yaş tiyatro kursu', '16 yaş drama kursu', '17 yaş oyunculuk kursu',
      'ergen drama atölyesi', 'gençlik tiyatrosu istanbul', 'youth theatre istanbul',
      'gençler ingilizce drama', 'lise çağı sahne sanatları',
      'gençler için oyunculuk kursu kadıköy',
    ],
    intro:
      'On beş yaşından sonra çocukluk oyunları işe yaramıyor — genç, ciddiye alınmak istiyor. Techne Lab İstanbul\'un 15–17 yaş grubu bu yüzden ayrı çalışıyor: gerçek metinler, gerçek sahne çalışması, yıl sonunda seyirci önünde gerçek bir gösteri. Sekiz ay, haftada bir gün, Pera ve Kadıköy. İngilizcesi B1 ve üzeri olan genç için bu, bildiğini tekrar eden bir kurs değil; İngilizcenin çalışma dili olduğu bir tiyatro atölyesi.',
    what:
      'Dil öğretmiyoruz. Dili deneyimliyoruz. Ders kitabı, gramer anlatımı ve sınav yok; doğaçlama, karakter kurma, metin analizi ve sahne çalışması var. Genç, kendi seçtiği bir karakterle yıl boyunca uğraşıyor ve Mayıs\'taki gösteride onu seyirciye taşıyor. İngilizcesi bunun sonucunda açılıyor: bir dili sahnede kullanmak zorunda kalan biri, o dille arasındaki mesafeyi hızla kapatıyor. Her ayın son haftası konuk atölye var: yaratıcı yazarlık, tasarım ve jazz dance; gençlerin yazdığı sahneler ve tasarımlar gösterinin malzemesi oluyor.',
    who:
      'Sahneye ilgisi olan, konservatuvar ya da yurtdışı düşünen, ya da sadece kendini ifade etmek için bir alan arayan liseliler. Uluslararası okul öğrencileri ve İngilizcesini okul dışında yaratıcı bir işte kullanmak isteyen gençler. Üniversite hazırlığı sürecinde nefes alacak bir yer arayanlar. Oyunculuk deneyimi gerekmiyor; İngilizcede B1 ve üzeri bekliyoruz — sohbet edebiliyorsa yeterli. Gruplar yaşa göre ayrı: 15–17 kendi sınıfında, 10–14 ayrı çalışıyor.',
    workshopSlugs: ['english-drama-youth'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Küçük çocuklarla aynı sınıfta mı olacak?',
        a: 'Hayır. 15–17 yaş kendi grubunda çalışıyor, 10–14 yaş ayrı. Bu ayrımı bilinçli yapıyoruz — iki yaş grubunun ihtiyacı ve çalışma temposu farklı.',
      },
      {
        q: 'Konservatuvar hazırlığı sayılır mı?',
        a: 'Doğrudan sınav hazırlığı değil ama temeli kuruyor: sahne mevcudiyeti, metin okuma, doğaçlama ve seyirci önünde durma alışkanlığı. Bu dördü olmadan hiçbir hazırlık işe yaramıyor.',
      },
      {
        q: 'Okul yoğunluğuyla nasıl yürüyor?',
        a: 'Haftada tek gün. Sınav dönemlerinde devamsızlık konusunda esneğiz — önemli olan yıl sonundaki gösteriye birlikte varmak.',
      },
      {
        q: 'İngilizce seviyesi ne olmalı?',
        a: 'B1 ve üzeri: günlük bir sohbeti takip edip cevap verebiliyorsa yeterli. Seviye sınavı yok. Program dil öğretmiyor, dili deneyimletiyor; konuşurken zorlanmak sorun değil, zaten çalışılan şey o.',
      },
      {
        q: 'Çocuğumun İngilizcesi zaten çok iyi, sıkılmaz mı?',
        a: 'Buradaki zorluk kelime ya da gramer değil. Partnerle doğaçlama yapmak, sahne yazmak, sekiz ay boyunca bir karakteri taşımak ve seyirci önüne çıkmak. Program zaten İngilizcesi olan çocuk için kuruldu: dil öğretmiyor, dili çalışma dili olarak kullanıyor. İngilizcesi rahat olan çocuğun oynayacak daha çok alanı oluyor.',
      },
      {
        q: 'Program sonunda İngilizcesi daha akıcı olur mu?',
        a: 'Sınav ve not vermediğimiz için belirli bir seviye vaat etmiyoruz. Çalışma, CEFR\'da B1 ile B2\'yi ayıran beceriye odaklanıyor: her cümleyi kafada kurmadan, dengeli bir tempoyla konuşabilmek. Gençlerle yapılan bir araştırmada drama temelli İngilizce eğitimi alan grubun konuşması, standart iletişimsel derslere giden gruba göre daha akıcı bulundu (Galante ve Thomson, 2017).',
      },
      {
        q: 'Yaratıcılık tarafında neler yapılıyor?',
        a: 'Her ayın son haftası konuk atölye: yaratıcı yazarlık, tasarım ve jazz dance dönüşümlü geliyor. Çocuklar karakterleri için kısa hikâyeler yazıyor, karakter ve maske tasarlıyor, ritim ve grup hareketi kuruyor. Ürettikleri her şey yıl sonu gösterisinin malzemesi oluyor; yani hazır bir oyunu ezberlemiyor, kendi yazıp tasarladıkları bir şeyi sahneliyorlar.',
      },
      {
        q: 'Uluslararası okulda okuyan ya da yabancı ailelerin çocukları katılabilir mi?',
        a: 'Evet. Program İngilizce yürüyor ve tam olarak İngilizcesi zaten olan çocuklar için kuruldu: uluslararası okul öğrencileri, yabancı ve karma ailelerin çocukları, iki dilli çocuklar ve okul İngilizcesi güçlü olup onu kullanacak yer bulamayanlar. Velilerle iletişim İngilizce de yürüyebiliyor.',
      },
    ],
    facts: {
      heading: 'AKICILIK, YARATICILIK VE ARAŞTIRMA',
      lead: 'İngilizcesi B1 ve üzeri olan bir çocuk için asıl soru "daha fazla İngilizce" değil, İngilizceyi kafasında çevirmeden kullanabilmek. Aşağıdaki satırlar bunun ne demek olduğunu ve araştırmaların ne söylediğini kaynağıyla birlikte veriyor. Bulguları abartmadan aktardık.',
      rows: [
        {
          label: 'CEFR B1: konuşma',
          value: 'Cümle kurmak ve düzeltmek için verilen duraklamalar belirgin olsa da anlaşılır biçimde konuşmayı sürdürebilir; tanıdık konularda basit bir sohbeti başlatıp bitirebilir',
          source: 'Avrupa Konseyi, CEFR Tablo 3',
          url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use',
        },
        {
          label: 'CEFR B2: konuşma',
          value: 'Ara sıra tereddüt etse de oldukça dengeli bir tempoyla konuşur; söz alır, sırasını bekler, sohbeti gerektiğinde bitirir. B1\'den B2\'ye geçişin büyük kısmı yeni kelime değil, her cümleyi kafada kurmadan konuşabilmek',
          source: 'Avrupa Konseyi, CEFR Tablo 3',
          url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use',
        },
        {
          label: 'Drama ve akıcılık',
          value: 'İngilizce öğrenen 24 Brezilyalı genç, dört ay boyunca ya drama temelli ya da standart iletişimsel derslerle çalıştı; 30 anadili İngilizce dinleyici drama grubunun konuşmasını daha akıcı ve daha kolay anlaşılır buldu. Aksanda fark yoktu',
          source: 'Galante ve Thomson, TESOL Quarterly 51(1), 2017 (özet: Brock University, 2016)',
          url: 'https://brocku.ca/brock-news/2016/04/brock-research-finds-drama-and-theatre-help-non-english-speaking-students-to-better-speak-english/',
        },
        {
          label: 'Drama ve konuşma kaygısı',
          value: 'Dört aylık programlar sonunda yabancı dil kaygısı hem drama hem drama dışı grupta düştü; drama grubunda biraz daha fazla',
          source: 'Galante, RELC Journal 49(3), 2018',
          url: 'https://journals.sagepub.com/doi/10.1177/0033688217746205',
        },
        {
          label: '47 çalışmalık meta-analiz',
          value: 'Drama temelli öğretimin başarı üzerinde ve psikolojik ve sosyal çıktılarda olumlu etkisi bulundu; yazarlar çalışmaların önemli kısmının neden-sonuç için zayıf tasarlandığını da belirtiyor',
          source: 'Lee, Patall, Cawthon ve Steingut, Review of Educational Research 85(1), 2015',
          url: 'https://journals.sagepub.com/doi/10.3102/0034654314540477',
        },
        {
          label: 'İstanbul\'daki yabancı nüfus',
          value: 'İkamet izinli 610.221 yabancı (3 Eylül 2026 verisi); uluslararası okul ve iki dilli aile çocukları için İngilizce yaratıcı alan ihtiyacının arka planı',
          source: 'Göç Vakfı, Temmuz–Ağustos 2026 göç trendleri (Göç İdaresi Başkanlığı verisi)',
          url: 'https://gocvakfi.org/temmuz-agustos-2026-goc-trendleri',
        },
        {
          label: 'English Drama Youth, bizim sayılarımız',
          value: '10–14 ve 15–17 ayrı gruplar, grup başına en çok 12 kişi; Ekim–Mayıs haftada bir gün; her ay üç hafta drama + bir hafta konuk atölye (yaratıcı yazarlık, tasarım, jazz dance); Mayıs\'ta tamamen İngilizce seyircili gösteri',
          source: 'Techne Lab program sayfası',
          url: 'https://www.technelabistanbul.com/atolyeler/english-drama-youth',
        },
      ],
      note: 'Not: Sınav ve not vermediğimiz için belirli bir CEFR seviye atlaması vaat etmiyoruz. Araştırmalar dramanın akıcılık ve konuşma rahatlığı için iyi desteklenmiş bir yol olduğunu gösteriyor; gramer öğretiminin yerine geçmiyor. Kaynaklara 8 Ekim 2026\'da bakıldı.',
    },
    articleSlugs: [
      'ingilizcesi-iyi-olan-cocuk-icin-ne-var',
      'cocugum-ingilizce-biliyor-ama-konusmuyor',
      'ingilizce-drama-cocuga-ne-kazandirir',
      'cocuklar-icin-ingilizce-drama-mi-ingilizce-kursu-mu',
      'genclerde-yaratici-drama-okul-basarisina-etkisi',
      'ingilizce-drama-youth-yas-gruplari-neden-ayri',
    ],
    related: ['cocuklar-icin-ingilizce-drama-istanbul', 'ingilizce-drama-istanbul', 'oyunculuk-kursu-istanbul'],
  },

  // ── YETİŞKİNLER İÇİN İNGİLİZCE DRAMA ─────────────────────────────
  // Yaş kırılımı bilinçli: "ingilizce drama" araması çoğunlukla veli
  // niyetli geliyor ve yetişkin arayan kişi çocuk sayfalarına düşüp
  // çıkıyordu. Üç ayrı sayfa (çocuk / genç / yetişkin) her niyeti
  // kendi hedefine götürüyor.
  {
    slug: 'yetiskinler-icin-ingilizce-drama-istanbul',
    label: 'Yetişkinler İçin İngilizce Drama',
    h1: 'YETİŞKİNLER İÇİN\nİNGİLİZCE DRAMA',
    eyebrow: '18+ · Konuşma Pratiği · Sahne',
    seoTitle: 'Yetişkinler İçin İngilizce Drama İstanbul — 18+ English Drama',
    seoDesc:
      'Yetişkinler için İngilizce drama atölyesi İstanbul: 18 yaş üstü, doğaçlama ve sahne çalışmasıyla İngilizce konuşma pratiği. Seviye testi yok. Kadıköy ve Pera.',
    keywords: [
      'yetişkinler için ingilizce drama', 'yetişkin ingilizce drama istanbul',
      'ingilizce drama yetişkin', '18 yaş üstü ingilizce drama',
      'yetişkinler için ingilizce tiyatro', 'adult english drama istanbul',
      'english drama for adults istanbul', 'yetişkin ingilizce konuşma atölyesi',
      'ingilizce doğaçlama atölyesi istanbul', 'ingilizce konuşma pratiği yetişkin',
      'yetişkinler için drama kursu istanbul', 'ingilizce drama kadıköy yetişkin',
      'ingilizce drama beyoğlu yetişkin', 'çalışanlar için ingilizce atölye',
    ],
    intro:
      'İngilizceyi biliyorsun ama konuşurken duraksıyorsun. Sorun kelime değil — cümleyi kurarken kendini izliyor olman. Techne Lab\'ın yetişkin İngilizce drama atölyesi tam bu duraksamayı çalışıyor: doğaçlama, oyun, anlık tepki. On sekiz yaş üstü, kendi grubunda, çocuk sınıfıyla karışmadan. İstanbul\'un iki yakasında da grup açılıyor.',
    what:
      'Ders yok, sunum yok, seviye testi yok. İlk haftalar oyun ve ısınma: dil oyunları, ses, beden, tepki hızı. Sonra doğaçlama sahneler — bir durum veriliyor, İngilizce içinde çözüyorsun. Düşünüp çevirecek zaman olmadığında dil kendiliğinden öne çıkıyor; çalışılan şey tam olarak bu refleks. Grup on iki kişiyi geçmiyor, yani herkes her hafta konuşuyor. İleri gitmek isteyenler için İngilizce metinlerle çalışan bir oyunculuk programı (English Acting Praxis) devamında duruyor.',
    who:
      'İş İngilizcesi yeterli ama sosyal ortamda tıkananlar. Toplantıda anlayıp cevap veremeyenler. Yurtdışı başvurusu, mülakat ya da taşınma hazırlığı yapanlar. Konuşma kulübü deneyip masada oturmaktan sıkılanlar. Ve sahne sanatlarını İngilizce çalışmak isteyenler. Oyunculuk deneyimi gerekmiyor — çoğu katılımcının hiç yok.',
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Yaş grubu gerçekten ayrı mı?',
        a: 'Evet. Yetişkin grupları 18 yaş üstü katılımcılardan oluşuyor. Çocuk (10–14) ve genç (15–17) programları tamamen ayrı günlerde, ayrı eğitmenlerle yürüyor.',
      },
      {
        q: 'İngilizce seviyem yeterli mi?',
        a: 'Orta seviye (B1 civarı) yeterli. Gramer düzeltmiyoruz, akıcılık çalışıyoruz. Başvuru formunda seviyeni yazıyorsun, grupları buna göre dengeliyoruz.',
      },
      {
        q: 'Sahneye çıkmak zorunda mıyım?',
        a: 'English Drama Lab grup içinde kalıyor — dışarıdan seyirci yok. Seyirci önünde bir final isteyen için ayrıca English Acting Praxis var.',
      },
      {
        q: 'İş çıkışına uygun saat var mı?',
        a: 'Gruplar akşam ve hafta sonu saatlerinde açılıyor. Kesin gün ve saat dönem başında netleşiyor; başvuru formunda uygun olduğun aralıkları işaretliyorsun.',
      },
      {
        q: 'Konuşma kulübünden farkı ne?',
        a: 'Konuşma kulübünde oturup konu üzerine konuşulur. Burada ayaktasın, hareket ediyorsun, bir durumun içindesin. Dil bedene bağlandığında hem daha hızlı çıkıyor hem daha kalıcı yerleşiyor.',
      },
    ],
    related: ['ingilizce-drama-istanbul', 'ingilizce-konusma-kulubu-istanbul', 'ingilizce-oyunculuk-istanbul'],
  },

  // ── YETİŞKİNLER İÇİN TİYATRO ─────────────────────────────────────
  {
    slug: 'yetiskinler-icin-tiyatro-kursu-istanbul',
    label: 'Yetişkinler İçin Tiyatro',
    h1: 'YETİŞKİNLER İÇİN\nTİYATRO KURSU',
    eyebrow: '18+ · Deneyim Şartı Yok',
    seoTitle: 'Yetişkinler İçin Tiyatro Kursu İstanbul — Yetişkin Drama Atölyesi',
    seoDesc:
      'İstanbul yetişkin tiyatro kursu ve drama atölyesi: 18 yaş üstü, deneyim şartı yok. Oyunculuk, doğaçlama, sahne çalışması. Kadıköy ve Pera, 12 kişilik gruplar.',
    keywords: [
      'yetişkin tiyatro kursu istanbul', 'yetişkinler için tiyatro kursu',
      'yetişkin drama kursu', 'yetişkinler için yaratıcı drama',
      'yetişkin oyunculuk kursu istanbul', 'hobi tiyatro kursu',
      'sıfırdan tiyatro kursu', 'çalışanlar için tiyatro atölyesi',
      'akşam tiyatro kursu istanbul', 'yetişkin drama atölyesi kadıköy',
      '30 yaş üstü tiyatro kursu', '40 yaş tiyatro kursu',
    ],
    intro:
      'Yetişkinlerin çoğu tiyatroya oyuncu olmak için gelmiyor. Sıkışmış hissettiği, yıllardır ertelediği bir merakı olduğu ya da kendini yeniden duymak istediği için geliyor. Techne Lab İstanbul\'un yetişkin gruplarında en genç katılımcı yirmili yaşlarında, en büyüğü ellili yaşlarında — ve ikisi de aynı egzersizi yapıyor.',
    what:
      'Beden, ses ve metin aynı anda çalışılıyor. Isınmayla başlıyoruz, doğaçlamayla devam ediyoruz, sahne çalışmasıyla bitiyoruz. Kimse izleyici koltuğunda oturmuyor — her oturumda herkes ayakta. Programlar seyircili bir final performansıyla kapanıyor; bu, çalışmanın bir noktaya varması için gerekli. Deneyim aranmıyor, yaş sınırı yok, "yeteneğim var mı" sorusunun cevabı burada aranmıyor.',
    who:
      'Ofisten çıkıp bambaşka bir şey yapmak isteyenler. Topluluk önünde konuşurken zorlananlar. Yıllar önce bırakmış, geri dönmek isteyenler. Kendini ifade etmek için bir alan arayanlar. On sekiz yaş üstü herkes — üst sınır yok.',
    workshopSlugs: ['oyuncunun-mevcudiyeti', 'english-drama-lab', 'techne-musical-lab', 'auteur-lab'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu', 'taksim-oyunculuk-kursu'],
    faq: [
      {
        q: 'Hiç deneyimim yok, olur mu?',
        a: 'Katılımcılarımızın çoğu deneyimsiz geliyor. Programlar sıfırdan kuruluyor — ilk haftalar zaten herkesin aynı noktada olduğu haftalar.',
      },
      {
        q: 'Yaşım büyük, geç mi kaldım?',
        a: 'Hayır. Gruplarımızda kırklı ve ellili yaşlarda katılımcılar var. Sahne yaş sormuyor; mevcudiyet soruyor.',
      },
      {
        q: 'Tam zamanlı çalışıyorum, yetişebilir miyim?',
        a: 'Programların çoğu akşam saatlerinde ya da hafta sonu. Haftada bir ya da iki gün — çalışan katılımcılara göre kurulmuş.',
      },
      {
        q: 'Sahneye çıkmak zorunda mıyım?',
        a: 'Final performansı programın parçası ama sahnedeki payın senin hızına göre belirleniyor. Kimseyi hazır olmadığı bir yere itmiyoruz.',
      },
    ],
    related: ['oyunculuk-kursu-istanbul', 'yaratici-drama-istanbul', 'ingilizce-drama-istanbul'],
  },

  // ── İNGİLİZCE KONUŞMA KULÜBÜ ─────────────────────────────────────
  {
    slug: 'ingilizce-konusma-kulubu-istanbul',
    label: 'İngilizce Konuşma Kulübü',
    h1: 'İNGİLİZCE\nKONUŞMA KULÜBÜ',
    eyebrow: 'Drama Yoluyla Konuşma Pratiği',
    seoTitle: 'İngilizce Konuşma Kulübü İstanbul — Drama ile Konuşma Pratiği',
    seoDesc:
      'İstanbul İngilizce konuşma kulübü alternatifi: masa başı sohbet değil, sahnede İngilizce. Doğaçlama ve drama yoluyla konuşma pratiği. Kadıköy ve Pera.',
    keywords: [
      'ingilizce konuşma kulübü istanbul', 'konuşma kulübü istanbul',
      'ingilizce konuşma pratiği istanbul', 'english speaking club istanbul',
      'ingilizce pratik yapma yerleri istanbul', 'ingilizce konuşma grubu',
      'ingilizce konuşma kursu kadıköy', 'speaking club kadıköy',
      'ingilizce akıcı konuşma', 'ingilizce konuşma korkusu',
      // Arayanın kendi cümlesi — Google Ads arama terimi raporunda
      // en çok tıklanan kalıplar bunlar (Eylül 2026).
      'ingilizce anlıyorum ama konuşamıyorum', 'ingilizce konuşamıyorum ne yapmalıyım',
      'ingilizce konuşma pratiği nasıl yapılır', 'ingilizce konuşma pratiği yapabileceğim yerler',
      'b1 ingilizce konuşma pratiği', 'ingilizce konuşurken donup kalmak',
      'ingilizce konuşma kulübü mü kurs mu', 'ingilizce konuşma pratiği kadıköy',
    ],
    intro:
      'Klasik konuşma kulüplerinin sorunu şu: bir masanın etrafında oturup "bugün hava nasıl" diye konuşuyorsun ve iki hafta sonra sıkılıyorsun. Techne Lab\'ın yaklaşımı farklı. İngilizceyi sahnede, bir eylemin içinde kullanıyorsun. Bir karakteri canlandırırken, doğaçlama yaparken, sahne kurarken dil bir amaç değil araç oluyor. Ve araç olduğu anda korku kayboluyor.',
    what:
      'Atölye tamamen İngilizce yürüyor. Gramer anlatılmıyor, kelime listesi ezberlenmiyor. Doğaçlama sahneleri kuruyorsun, karakterler yaratıyorsun, metinlerle çalışıyorsun. Hata yapmak sorun değil, sahnede hata zaten malzeme. Aradaki fark yöntemsel: masada konuşurken cümleyi önce kafanda kurup sonra çeviriyorsun, sahnede ise bir şey yapmak zorundasın ve cümle o eylemin içinden çıkıyor. Bellek araştırmalarında bu farka eylem üstünlüğü deniyor: kendi yaptığın bir eyleme bağlanan bilgi, yalnızca konuşularak kodlanan bilgiden daha iyi hatırlanıyor. Pratikte karşılığı şudur, katılımcıların çoğu ilk ay içinde düşünmeden konuşmaya başladığını söylüyor, çünkü sahnede düşünecek vakit yok.',
    who:
      'İngilizcesi kâğıt üzerinde iyi ama konuşurken donanlar. Konuşma kulüplerine gidip sıkılanlar. Yurtdışı iş görüşmesine ya da eğitimine hazırlananlar. Aksan kaygısı taşıyanlar. B1 ve üzeri yeterli, akıcılık aranmıyor, zaten çalışılan şey o.',
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu', 'taksim-oyunculuk-kursu'],
    faq: [
      {
        q: 'Bu bir İngilizce kursu mu?',
        a: 'Hayır. Dil öğretmiyoruz. Dili deneyimliyoruz. Gramer bilgin varsa ama konuşamıyorsan doğru yerdesin. Sıfırdan İngilizce öğrenmek istiyorsan önce bir dil kursu daha uygun.',
      },
      {
        q: 'Seviyem yeterli mi?',
        a: 'Orta seviye yeterli. Cümle kurabiliyorsan başlayabilirsin. İlk oturumda seviye ölçmüyoruz — sahnede kim ne yapabiliyorsa oradan başlıyoruz.',
      },
      {
        q: 'Oyunculuk bilmem gerekiyor mu?',
        a: 'Hayır. Katılımcıların çoğu hiç sahneye çıkmamış. Oyunculuk burada amaç değil, dili deneyimleten araç.',
      },
      {
        q: 'Konuşma kulübünden farkı ne?',
        a: 'Konuşma kulübünde konuyu bulmakla uğraşırsın ve konuşma zihinsel kalır: bir fikri savunursun, bir soruya cevap verirsin. Burada konu hazır, sahne sana bir durum veriyor ve sen o durumun içinde bir şey yapıyorsun. Fark küçük görünür ama sonucu değiştirir, çünkü dil bir eyleme bağlandığında hem daha kolay hatırlanır hem de daha hızlı geri çağrılır. Sıkılma ihtimali de çok daha düşük.',
      },
      {
        q: 'Neden masada sohbet etmek yetmiyor?',
        a: 'Yetmiyor değil, yavaş. Masadaki sohbette önce ne söyleyeceğine karar verir, sonra Türkçe düşünüp çevirir, sonra konuşursun. Bu üç adım her seferinde tekrarlanır ve çeviri alışkanlığı yerleşir. Sahnede o üç adıma vakit yoktur: karşındaki bir şey yapar, sen karşılık vermek zorundasın. Cümle mükemmel olmaz ama çeviri basamağı atlanır. Aylar içinde asıl değişen şey budur.',
      },
      {
        q: 'Doğaçlama yapmayı bilmiyorum, zorlanır mıyım?',
        a: 'Doğaçlamanın kuralı bilgi değil kabul etmektir: karşındakinin kurduğu duruma evet deyip üstüne bir şey eklersin. Bunun için ne oyunculuk geçmişi ne hazırlık gerekir. İlk haftalarda kısa ve çok yapılı oyunlarla başlıyoruz, serbest sahneler sonra geliyor. Zorlanma genelde İngilizceden değil, yanlış yapma korkusundan gelir ve grup bunu ilk ayda çözer.',
      },
      {
        q: 'Kaç kişilik gruplar, ne sıklıkta?',
        a: 'Gruplar küçük tutuluyor, çünkü konuşma süresi kişi sayısına bölünüyor. Kalabalık bir konuşma kulübünde iki saatte birkaç dakika konuşursun; sahne çalışmasında herkes her oturumda ayağa kalkar. Güncel kontenjan, gün ve mekân bilgisi için program sayfasına bak.',
      },
    ],
    criteria: [
      {
        q: 'Konuşma süresi kişi başına ne kadar düşüyor?',
        a: 'Bir konuşma kulübünü değerlendirirken sorulacak ilk soru bu. On kişilik bir masada iki saatin matematiği acımasızdır. Grup ne kadar kalabalıksa, sen o kadar dinleyici olursun. Kontenjanı sormaktan çekinme.',
      },
      {
        q: 'Konuşurken oturuyor musun, bir şey yapıyor musun?',
        a: 'Oturarak yapılan pratik zihinsel kalır ve çeviri alışkanlığını besler. Ayakta, bir eylemin içinde kurulan cümle daha iyi yerleşir. Tanışma oturumunda katılımcıların ayağa kalkıp kalkmadığına bak.',
      },
      {
        q: 'Hata düzeltiliyor mu, yoksa akış mı korunuyor?',
        a: 'İkisinin de yeri var ama karışırsa ikisi de çalışmaz. Her hatanın anında düzeltildiği ortamda konuşmayı bırakırsın. Hiç geri bildirim olmayan ortamda ise yanlışlar pekişir. İyi kurgu, akışı bölmeden sonradan verilen geri bildirimdir.',
      },
      {
        q: 'Seviye grupları ayrılıyor mu?',
        a: 'B1 ile C1 aynı gruptaysa biri susar, diğeri sıkılır. Başvuru sırasında seviyenin sorulup sorulmadığı, grubun gerçekten dengelenip dengelenmediğinin işaretidir.',
      },
      {
        q: 'Sonunda gösterilecek bir şey var mı?',
        a: 'Bir bitiş noktası, hazırlığın niteliğini değiştirir. Sunum, sahne ya da kayıt gibi bir kapanışı olan programlarda katılımcı daha çok çalışır. Açık uçlu sohbet gruplarında ilerleme ölçülemez, o yüzden de çoğu kişi birkaç ay sonra bırakır.',
      },
    ],
    related: ['ingilizce-drama-istanbul', 'yetiskinler-icin-ingilizce-drama-istanbul', 'yetiskinler-icin-tiyatro-kursu-istanbul', 'oyunculuk-kursu-istanbul'],
  },

  // ── AUDITION HAZIRLIK ────────────────────────────────────────────
  {
    slug: 'audition-hazirlik-atolyesi-istanbul',
    label: 'Audition Hazırlık',
    h1: 'AUDITION HAZIRLIK\nATÖLYESİ',
    eyebrow: 'Casting · Kamera · Seçmeler',
    seoTitle: 'Audition Hazırlık Atölyesi İstanbul — Casting & Seçme Hazırlığı',
    seoDesc:
      'İstanbul audition ve casting hazırlık atölyesi: self-tape, monolog seçimi, kamera önü teknik. Cast direktörü masterclass\'ıyla profesyonel geri bildirim.',
    keywords: [
      'audition atölyesi istanbul', 'casting hazırlık kursu',
      'seçme hazırlık atölyesi', 'self tape atölyesi',
      'oyuncu seçmeleri hazırlık', 'casting workshop istanbul',
      'monolog hazırlama atölyesi', 'kamera önü audition',
      'dizi seçmeleri hazırlık', 'ajans için hazırlık oyunculuk',
    ],
    intro:
      'Seçmeyi kaybettiren şey genelde yetenek değil — hazırlıksızlık. Yanlış monolog, kameranın önünde bozulan ritim, kendini ne zaman durduracağını bilmemek. Techne Lab İstanbul\'un audition hazırlık çalışması bu üçüne odaklanıyor ve profesyonel bir cast direktörünün gözünden geri bildirim almanı sağlıyor.',
    what:
      'Malzeme seçimiyle başlıyoruz: sana ne oturuyor, hangi metin seni gösteriyor. Ardından kamera önü teknik — çerçeve içinde kalmak, göz hattı, enerjinin kameraya nasıl geçtiği. Self-tape çekimi yapıyoruz, izliyoruz, tekrar çekiyoruz. Programın finalinde Cast Direktörü Harika Uygur\'un masterclass\'ı var: seçme masasının diğer tarafındaki kişiden doğrudan geri bildirim. Bu, bir atölyede alabileceğin en gerçekçi ayna.',
    who:
      'Seçmelere giren ama sonuç alamayanlar. Ajansa portföy hazırlayanlar. Kameraya ilk kez çıkacaklar. Sahne deneyimi olup kamerayla arası açık olanlar. Uluslararası projeler için İngilizce self-tape hazırlaması gerekenler.',
    workshopSlugs: ['english-drama-final-project', 'camera-praxis'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'taksim-oyunculuk-kursu', 'kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Self-tape çekmeyi öğretiyor musunuz?',
        a: 'Evet, atölyenin merkezinde bu var. Kadraj, ışık, ses ve oyunculuk birlikte çalışılıyor — çünkü teknik olarak kötü bir kayıt, iyi bir oyunculuğu da götürüyor.',
      },
      {
        q: 'Cast direktörü gerçekten geliyor mu?',
        a: 'Evet. English Acting Praxis programının finalinde Cast Direktörü Harika Uygur masterclass veriyor ve katılımcıların çalışmalarını izleyip geri bildirim veriyor.',
      },
      {
        q: 'İngilizce seçmelere de hazırlanabilir miyim?',
        a: 'Evet. Program İngilizce yürüyen bir kolu içeriyor; uluslararası yapımlar için İngilizce self-tape hazırlığı yapılabiliyor.',
      },
      {
        q: 'Hiç kamera deneyimim yok, erken mi?',
        a: 'Hayır. Kamera önünde durmak öğrenilen bir şey, sahne deneyiminden bağımsız. Sıfırdan başlayanlar için de uygun.',
      },
    ],
    related: ['kamera-onu-oyunculuk-istanbul', 'oyunculuk-kursu-istanbul', 'ingilizce-drama-istanbul'],
  },

  // ── İNGİLİZCE OYUNCULUK ──────────────────────────────────────────
  // "ingilizce oyunculuk", "english acting" arayanlar Acting Praxis'e gitmeli;
  // English Drama Lab dil odaklı, bu ise oyunculuk odaklı.
  {
    slug: 'ingilizce-oyunculuk-istanbul',
    label: 'İngilizce Oyunculuk',
    h1: 'İNGİLİZCE\nOYUNCULUK',
    eyebrow: 'English Acting Praxis · Cast Direktörü Masterclass',
    seoTitle: 'İngilizce Oyunculuk Atölyesi İstanbul — English Acting Praxis',
    seoDesc:
      'İstanbul İngilizce oyunculuk atölyesi: 12 hafta metin, karakter ve prova disiplini. Cast Direktörü Harika Uygur masterclass finali. Ece Ertez ile, Pera.',
    keywords: [
      'ingilizce oyunculuk atölyesi', 'ingilizce oyunculuk kursu istanbul',
      'english acting istanbul', 'english acting workshop istanbul',
      'ingilizce sahne oyunculuğu', 'ingilizce tiyatro oyunculuk',
      'uluslararası oyunculuk eğitimi istanbul', 'ingilizce metin çalışması',
      'yabancı dilde oyunculuk', 'ingilizce karakter çalışması',
      'english scene study istanbul',
    ],
    intro:
      'İngilizce sahne oyunculuğu, İngilizce konuşabilmekten farklı bir şey. Metni anlamak yetmiyor — o metni bir bedende taşımak, partnerle gerçek bir alışveriş kurmak ve dili düşünmeden kullanmak gerekiyor. English Acting Praxis tam olarak bunun üzerine kurulu: Ece Ertez ile on iki hafta, Pera\'da.',
    what:
      'Program birden fazla İngilizce metin üzerinde yoğun pratikle ilerliyor. Karakter kuruyorsun, sahne dilini içselleştiriyorsun, prova disiplinini öğreniyorsun. Finalde Cast Direktörü Harika Uygur bir günlük masterclass veriyor ve katılımcıların canlı performanslarını izliyor; bu performanslar kayıt altına alınıp katılımcılara teslim ediliyor. Yani elinde hem deneyim hem gösterilebilir materyal kalıyor.',
    who:
      'Uluslararası yapımlara hazırlanan oyuncular. Yurt dışında eğitim ya da kariyer düşünenler. İngilizce self-tape hazırlaması gerekenler. Sahne deneyimi olup İngilizce çalışmaya geçmek isteyenler. Yetişkin grubu — 18 yaş üstü.',
    workshopSlugs: ['english-drama-final-project', 'camera-praxis', 'english-drama-lab'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'taksim-oyunculuk-kursu'],
    faq: [
      {
        q: 'İngilizce Drama Lab ile farkı ne?',
        a: 'English Drama Lab dil odaklı — İngilizceyi sahnede deneyimleterek konuşma cesareti kazandırıyor. Acting Praxis ise oyunculuk odaklı: metin analizi, karakter inşası ve prova disiplini üzerine kurulu, dili zaten kullanabilen kişiler için.',
      },
      {
        q: 'Cast direktörü gerçekten geliyor mu?',
        a: 'Evet. Harika Uygur programın finalinde masterclass veriyor ve katılımcıların performanslarını izleyip geri bildirim veriyor. Seçme masasının diğer tarafından gelen geri bildirim, bir atölyede alabileceğin en gerçekçi ayna.',
      },
      {
        q: 'İngilizce seviyem yeterli mi?',
        a: 'Orta-üst seviye gerekiyor. Metin okuyup anlayabiliyor, sahnede duraksamadan konuşabiliyorsan uygunsun. Dil kaygın ağır basıyorsa önce English Drama Lab daha doğru bir başlangıç.',
      },
      {
        q: 'Kayıt materyali ne işe yarıyor?',
        a: 'Ajanslara ve casting süreçlerine gönderebileceğin, profesyonel bir ortamda çekilmiş performans kaydın oluyor. Portföyü olmayan oyuncu için bu, programın en somut çıktısı.',
      },
    ],
    related: ['audition-hazirlik-atolyesi-istanbul', 'kamera-onu-oyunculuk-istanbul', 'ingilizce-drama-istanbul'],
  },

  // ── YETİŞKİNLER İÇİN MÜZİKAL ─────────────────────────────────────
  {
    slug: 'yetiskinler-icin-muzikal-kursu-istanbul',
    label: 'Yetişkinler İçin Müzikal',
    h1: 'YETİŞKİNLER İÇİN\nMÜZİKAL TİYATRO',
    eyebrow: '18–55 Yaş · 8 Ay · Seyircili Final',
    seoTitle: 'Yetişkinler İçin Müzikal Tiyatro Kursu İstanbul — 8 Ay',
    seoDesc:
      'İstanbul yetişkin müzikal tiyatro kursu: oyunculuk, şan ve dans bir arada. Sekiz ay, haftada iki gün, seyircili final performansı. Kadıköy, 55 yaşa kadar.',
    keywords: [
      'yetişkin müzikal kursu istanbul', 'yetişkinler için müzikal tiyatro',
      'müzikal tiyatro kursu yetişkin', 'yetişkin şan ve dans kursu',
      'hobi müzikal kursu istanbul', '30 yaş müzikal kursu', '40 yaş dans kursu',
      'yetişkin sahne sanatları kursu', 'çalışanlar için müzikal atölyesi',
      'yetişkin şan dersi istanbul', 'müzikal oyunculuk yetişkin',
    ],
    intro:
      'Müzikal tiyatro yaş sormuyor. Techne Musical Lab\'in gruplarında yirmili yaşlarında katılımcı da var, ellili yaşlarında olan da — ve ikisi de aynı sahnede aynı işi yapıyor. Sekiz ay, haftada iki gün, Kadıköy.',
    what:
      'Program üç disiplini aynı anda yürütüyor: oyunculuk, şan ve dans. Köksal Ünal ve Bartu Ayaz yönetiminde beden, ses ve sahne birlikte çalışılıyor. Yıl seyircili bir final performansıyla kapanıyor — kurs bitirme belgesi değil, gerçek bir gösteri. Sekiz ay boyunca aynı grupla çalışmak, tek başına bir topluluk deneyimi.',
    who:
      'Şarkı söylemeyi seven ama hiç sahneye çıkmamış olanlar. Ofisten çıkıp bambaşka bir şey yapmak isteyenler. Çocukken müzikale merak salmış, hiç fırsat bulamamış olanlar. Deneyim aranmıyor, ses eğitimi programın parçası. On sekiz yaş üstü — üst sınır elli beş.',
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Şarkı söyleyemiyorum, olur mu?',
        a: 'Olur. Şan eğitimi programın içinde — Bartu Ayaz ile sesini kullanmayı öğreniyorsun. Kimse ses testinden geçmiyor.',
      },
      {
        q: 'Yaşım büyük, geç mi kaldım?',
        a: 'Program kırk ve elli yaşlarındaki katılımcılara açık, üst sınır elli beş. Gruplarımızda bu yaşlarda insanlar var ve sahnede en rahat olanlar çoğu zaman onlar.',
      },
      {
        q: 'Haftada iki gün ağır gelir mi?',
        a: 'Oturumlar akşam saatlerinde. Sekiz ayın sonunda seyirci önüne çıkacak bir gösteri hazırlanıyor — bu yoğunluk o hedefin gereği. Çalışan katılımcılarımızın çoğu bu tempoyu sürdürüyor.',
      },
      {
        q: 'Gençlerle aynı grupta mıyım?',
        a: 'Program 15–55 yaş aralığına açık, gruplar karma. Farklı yaşların bir arada çalışması müzikalin doğasına uygun — sahnede de öyle oluyor.',
      },
    ],
    related: ['muzikal-tiyatro-kursu-istanbul', 'dans-kursu-istanbul', 'yetiskinler-icin-tiyatro-kursu-istanbul'],
  },

  // ── GENÇLER İÇİN MÜZİKAL ─────────────────────────────────────────
  {
    slug: 'gencler-icin-muzikal-tiyatro-istanbul',
    label: 'Gençler İçin Müzikal',
    h1: 'GENÇLER İÇİN\nMÜZİKAL TİYATRO',
    eyebrow: '15+ · Şan · Dans · Oyunculuk',
    seoTitle: 'Gençler İçin Müzikal Tiyatro Kursu İstanbul — 15 Yaş ve Üzeri',
    seoDesc:
      'İstanbul gençler için müzikal tiyatro: şan, dans ve oyunculuk bir arada. Sekiz ay, seyircili final gösterisi. 15 yaş ve üzeri, Kadıköy.',
    keywords: [
      'gençler için müzikal kursu', 'genç müzikal tiyatro istanbul',
      'lise müzikal kursu', '15 yaş müzikal kursu', '16 yaş şan dans kursu',
      'gençlik müzikali istanbul', 'genç şan kursu istanbul',
      'gençler için dans ve şarkı kursu', 'ergen müzikal atölyesi',
      'konservatuvar hazırlık müzikal',
    ],
    intro:
      'Şarkı söylemek, dans etmek ve oyunculuk — üçünü ayrı ayrı öğrenmek yerine aynı anda çalışmak. Techne Musical Lab on beş yaşından itibaren katılıma açık ve yıl seyircili bir final gösterisiyle kapanıyor. Kadıköy, sekiz ay.',
    what:
      'Şan, dans ve sahne çalışması iç içe yürüyor. Genç bir yandan sesini kullanmayı öğreniyor, bir yandan koreografi çalışıyor, bir yandan karakter kuruyor. Mayıs\'taki gösteri sekiz aylık emeğin görünür olduğu an — aile ve arkadaşların izlediği gerçek bir performans. Konservatuvar ya da sahne sanatları düşünen bir genç için bu, portföyün ilk parçası.',
    who:
      'Müzikallere ilgisi olan, şarkı söylemeyi seven, sahneye merak duyan on beş yaş ve üzeri gençler. Konservatuvar hazırlığı düşünenler. Okul dışında ciddiye alınacağı bir alan arayanlar. Deneyim aranmıyor — şan da dans da programın içinde öğretiliyor.',
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance', 'english-drama-youth'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Kaç yaşından itibaren katılınabiliyor?',
        a: 'Müzikal programı on beş yaşından itibaren. Daha küçük yaştaki çocuklar için 10–17 yaş İngilizce drama programımız var, o da seyircili final gösterisiyle kapanıyor.',
      },
      {
        q: 'Yetişkinlerle aynı grupta mı olacak?',
        a: 'Program 15–55 yaş aralığına açık ve gruplar karma. Müzikal doğası gereği farklı yaşların bir arada çalıştığı bir tür — sahnedeki kadro da öyle kuruluyor.',
      },
      {
        q: 'Konservatuvar hazırlığına faydası olur mu?',
        a: 'Doğrudan sınav hazırlığı değil ama temeli kuruyor: ses kullanımı, sahne mevcudiyeti, koreografi takibi ve seyirci önünde durma alışkanlığı. Ayrıca elinde gösterilebilir bir performans kaydı oluyor.',
      },
      {
        q: 'Okul yoğunluğuyla nasıl yürüyor?',
        a: 'Haftada iki gün, akşam saatlerinde. Sınav dönemlerinde esneklik gösteriyoruz — önemli olan yıl sonundaki gösteriye grupla birlikte varmak.',
      },
    ],
    related: ['muzikal-tiyatro-kursu-istanbul', 'gencler-icin-ingilizce-drama-istanbul', 'dans-kursu-istanbul'],
  },
  // ══════════════════════════════════════════════════════════════
  // SEMT × DİSİPLİN KOMBİNASYONLARI — müzikal/dans satış hattı.
  // Mega menüde görünmezler (navHidden); sitemap + iç link ağıyla
  // beslenirler. Kural: her sayfa yalnızca DOĞRU olanı söyler —
  // dans stüdyoları Kadıköy'de; Beyoğlu/Taksim sayfaları bunu
  // saklamaz, ulaşımı anlatır.
  // ══════════════════════════════════════════════════════════════

  // ── KADIKÖY × MÜZİKAL ────────────────────────────────────────────
  {
    slug: 'kadikoy-muzikal-tiyatro-kursu',
    label: 'Müzikal · Kadıköy',
    navHidden: true,
    h1: 'KADIKÖY MÜZİKAL\nTİYATRO KURSU',
    eyebrow: 'Oyunculuk · Şan · Dans — Kadıköy',
    seoTitle: 'Kadıköy Müzikal Tiyatro Kursu — Müzikal Atölyesi, Şan & Dans',
    seoDesc:
      'Kadıköy müzikal tiyatro kursu: oyunculuk, şan ve dans tek çatıda. 8 aylık müzikal atölyesi ve 12 haftalık Broadway dans programı — Rasimpaşa ve Kadıköy merkez stüdyolarında, Marmaray\'a yürüme mesafesinde.',
    keywords: [
      'kadıköy müzikal tiyatro kursu', 'kadıköy müzikal kursu', 'kadıköy müzikal atölyesi',
      'müzikal atölyesi kadıköy', 'kadıköy şan ve dans kursu', 'kadıköy müzikal oyunculuk',
      'moda müzikal kursu', 'rasimpaşa müzikal', 'yeldeğirmeni müzikal atölyesi',
      'üsküdar müzikal kursu', 'ataşehir müzikal kursu', 'bostancı müzikal kursu',
      'anadolu yakası müzikal atölyesi', 'kadıköy musical theatre',
    ],
    intro:
      'Müzikal çalışmak için Kadıköy\'den daha doğru bir yer düşünmek zor: geniş stüdyolar, bağımsız sahne kültürü ve her akşam bir yerlerde açık bir perde. Techne Lab\'ın iki müzikal programı da burada yürüyor — Rasimpaşa\'daki Beden İşleri ve Kadıköy merkezdeki Soft Sanat stüdyolarında, Marmaray Ayrılık Çeşmesi durağına yürüme mesafesinde.',
    what:
      'Kadıköy\'de iki ayrı kapı var. Techne Musical Lab sekiz aylık tam program: oyunculuk temelinden başlıyor, şan ve dansı üzerine kuruyor, Mayıs\'ta seyircili bir bitirme performansıyla kapanıyor; 12 Ekim Pazartesi başlıyor, başvuru kısa bir şarkı videosuyla. Broadway Musical Dance ise yalnızca dansa odaklı 12 haftalık yoğun program: jazz ve theatre dance teknikleri, sahne koreografisi; Kadıköy grubunun tarihi yakında açıklanacak (Pera grubu 3 Ekim Cumartesi 19:00\'da başlıyor), dilersen 6 haftalık kısa programla deneyebilirsin.',
    who:
      'Şarkı söylüyor ama sahnede ne yapacağını bilmiyorsan; dans ediyorsun ama "oynamayı" hiç denemediysen; ya da üçünü aynı anda öğrenmek istiyorsan — program tam bunun için kurgulandı. Konservatuvar mezunu olman gerekmiyor. Anadolu yakasında oturuyorsan (Moda, Üsküdar, Ataşehir, Bostancı) stüdyolar zaten yanı başında; Avrupa yakasından gelenler için Marmaray tek aktarma.',
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Kadıköy\'de tam olarak neredesiniz?',
        a: 'İki partner stüdyoda çalışıyoruz: Beden İşleri (Rasimpaşa) ve Soft Sanat (Kadıköy merkez). İkisi de Marmaray Ayrılık Çeşmesi ve Söğütlüçeşme duraklarına yürüme mesafesinde. Kayıt sonrası adres ve kroki iletilir.',
      },
      {
        q: 'Müzikal programı ile dans programı arasında nasıl seçim yapmalıyım?',
        a: 'Amacın sahnede söyleyip oynamaksa Techne Musical Lab: 8 ay, oyunculuk + şan + dans, seyircili final. Önceliğin beden ve koreografiyse Broadway Musical Dance: 12 ya da 6 hafta, sadece dans. Kararsızsan telefonla ara — programın hangisi olduğunu beş dakikada netleştiririz.',
      },
      {
        q: 'Hiç şan ya da dans eğitimi almadım, katılabilir miyim?',
        a: 'Evet. Broadway Musical Dance teknik temelden başlıyor, dans deneyimi şart değil. Musical Lab başvurusunda istenen şarkı videosu bir eleme sınavı değil — seviyeni görüp grubu dengelemek için.',
      },
    ],
    related: ['muzikal-tiyatro-kursu-istanbul', 'kadikoy-dans-kursu', 'dans-kursu-istanbul'],
  },

  // ── KADIKÖY × DANS ───────────────────────────────────────────────
  {
    slug: 'kadikoy-dans-kursu',
    label: 'Dans · Kadıköy',
    navHidden: true,
    h1: 'KADIKÖY\nDANS KURSU',
    eyebrow: 'Jazz · Theatre Dance · Broadway — Kadıköy',
    seoTitle: 'Kadıköy Dans Kursu — Broadway Müzikal Dansı & Jazz Dance Atölyesi',
    seoDesc:
      'Kadıköy dans kursu: Broadway müzikal dansı, jazz ve theatre dance. 12 ya da 6 haftalık program, dans deneyimi şart değil. Rasimpaşa\'da stüdyo — Marmaray\'a yürüme mesafesi.',
    keywords: [
      'kadıköy dans kursu', 'kadıköy dans atölyesi', 'kadıköy dans dersi',
      'kadıköy broadway dans', 'kadıköy jazz dans', 'kadıköy theatre dance',
      'moda dans kursu', 'yeldeğirmeni dans atölyesi', 'rasimpaşa dans stüdyosu',
      'kadıköy yetişkin dans kursu', 'kadıköy başlangıç dans', 'sıfırdan dans kadıköy',
      'anadolu yakası broadway dans', 'kadıköy koreografi atölyesi', 'kadıköy sahne dansı',
    ],
    intro:
      'Kadıköy\'de dans kursu arayanın önünde iki tür kapı var: spor salonu mantığıyla çalışan stüdyolar ve sahneye bakan atölyeler. Techne Lab ikincisi — burada dans bir fitness rutini değil, bir anlatım biçimi. Broadway müzikal dansını jazz ve theatre dance teknikleriyle çalışıyoruz; amaç adım ezberlemek değil, sahnede bir hikâye taşıyabilen bir beden kurmak.',
    what:
      'Program 12 hafta: teknik temel (duruş, izolasyon, jazz vokabüleri), ardından kombinasyon ve koreografi, son bölümde sahne performansı kalitesinde çalışılan tam bir Broadway numarası. Perşembe akşamları 19:00–21:00, Rasimpaşa\'daki stüdyoda; yeni dönem 1 Ekim\'de başlıyor. 12 haftalık tam programa yazılabilir ya da 6 haftalık kısa programla başlayıp devam kararını sonra verebilirsin. Dansın müzikal sahnesiyle buluştuğu tam sürüm için sekiz aylık Techne Musical Lab da aynı stüdyoda.',
    who:
      '"Dansa kaç yaşında başlanır" diye arayıp duran yetişkinler: cevap, bu grupta. Katılımcıların çoğu sıfırdan ya da yıllar önce bırakmış olarak geliyor. Bale altyapısı, esneklik şartı, seçme yok — teknik temelden başlıyoruz. Moda\'dan, Yeldeğirmeni\'nden yürüyerek; Üsküdar, Ataşehir ve Bostancı\'dan Marmaray ya da M4 ile kolay ulaşım.',
    workshopSlugs: ['broadway-musical-dance', 'techne-musical-lab'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Hiç dans etmedim, gerçekten katılabilir miyim?',
        a: 'Evet — program bunun için tasarlandı. İlk haftalar teknik temel: duruş, ağırlık aktarımı, temel jazz adımları. Grup 12 kişiyi geçmiyor, herkes bireysel düzeltme alıyor. Seçme ya da seviye sınavı yok.',
      },
      {
        q: 'Atölyeler hangi gün ve saatte?',
        a: 'Perşembe akşamları 19:00–21:00, Kadıköy Rasimpaşa\'daki stüdyoda. Yeni dönem 1 Ekim Perşembe başlıyor. Mesai sonrası yetişilebilir bir saat — katılımcıların çoğu çalışan yetişkinler.',
      },
      {
        q: '12 haftaya taahhüt vermek istemiyorum, deneme şansı var mı?',
        a: 'Var: 6 haftalık kısa programla başlayabilirsin; sonunda 12 haftalık tam programa geçip geçmemek senin kararın. Detaylı koşullar için telefon ya da WhatsApp üzerinden ulaş — hızlı dönüyoruz.',
      },
    ],
    related: ['dans-kursu-istanbul', 'kadikoy-muzikal-tiyatro-kursu', 'muzikal-tiyatro-kursu-istanbul'],
  },

  // ── BEYOĞLU · PERA × DANS/MÜZİKAL ────────────────────────────────
  {
    slug: 'beyoglu-dans-kursu',
    label: 'Dans · Beyoğlu',
    navHidden: true,
    h1: 'BEYOĞLU · PERA\nDANS & MÜZİKAL',
    eyebrow: 'Broadway Dans · Müzikal — Avrupa Yakası',
    seoTitle: 'Beyoğlu & Pera Dans Kursu — Broadway Müzikal Dansı | Techne Lab',
    seoDesc:
      'Beyoğlu\'nda dans kursu: Broadway Musical Dance Taksim sınıfı 3 Ekim Cumartesi 19:00\'da başlıyor. Jazz ve theatre dance, sahne koreografisi. Pera\'da ayrıca İngilizce drama ve oyunculuk atölyeleri.',
    keywords: [
      'beyoğlu dans kursu', 'pera dans kursu', 'pera dans atölyesi', 'galata dans kursu',
      'cihangir dans kursu', 'beyoğlu müzikal kursu', 'pera müzikal atölyesi',
      'avrupa yakası dans kursu', 'avrupa yakası müzikal kursu', 'karaköy dans kursu',
      'beyoğlu broadway dans', 'şişhane dans atölyesi',
    ],
    intro:
      'Beyoğlu tarafında dans arıyorsan: Broadway Musical Dance\'in Taksim sınıfı 3 Ekim Cumartesi 19:00\'da başlıyor — Galata, Cihangir, Şişhane hattından yürüme ya da tek durak mesafesinde. Aynı program Kadıköy stüdyosunda Perşembe akşamları da açık; Karaköy\'den vapurla geçmeyi ritüel sayanlar oraya da gidebiliyor. İngilizce drama ve oyunculuk atölyelerimiz ise Pera\'daki partner stüdyoda yürüyor.',
    what:
      'Dans hattında Broadway Musical Dance var: jazz ve theatre dance teknikleriyle sahne koreografisi, 12 haftalık tam ya da 6 haftalık kısa seçenek — Taksim sınıfı 3 Ekim Cumartesi 19:00\'da, Kadıköy sınıfı 1 Ekim Perşembe 19:00\'da başlıyor. Müzikal hattında Techne Musical Lab: sekiz ay, oyunculuk + şan + dans, seyircili bitirme performansı; bu program stüdyo gereksinimleri nedeniyle yalnızca Kadıköy\'de.',
    who:
      'Galata, Cihangir, Şişhane, Karaköy hattında yaşayıp "dans kursu beyoğlu" diye arayan; iş çıkışı Karaköy\'den vapura atlayabilecek olan; ya da dansı değil de sahneyi Pera\'da isteyen (o zaman İngilizce drama programlarına bak) herkes. Vapur yolculuğunu dert değil ritüel sayanlar için ekstra puan.',
    workshopSlugs: ['broadway-musical-dance', 'techne-musical-lab'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Beyoğlu\'nda dans dersi veriyor musunuz?',
        a: 'Evet — Broadway Musical Dance\'in Taksim sınıfı Cumartesi 19:00\'da çalışıyor, 3 Ekim\'de başlıyor. Müzikal Lab ise zemin, ayna ve piyano gereksinimleri nedeniyle yalnızca Kadıköy stüdyosunda. Mekân bilgisini her sayfada açık yazarız.',
      },
      {
        q: 'Kadıköy sınıfını tercih edersem nasıl giderim?',
        a: 'En keyifli yol Karaköy–Kadıköy vapuru; iskeleden stüdyo yürüme mesafesinde. Alternatif: Marmaray ile Ayrılık Çeşmesi durağı. Kadıköy sınıfı Perşembe, Taksim sınıfı Cumartesi çalışıyor — içerik aynı, gün farklı.',
      },
      {
        q: 'Pera\'daki atölyelerde dans ya da müzikal içerik yok mu?',
        a: 'Pera hattında İngilizce drama ve oyunculuk çalışıyoruz; dans-müzikal stüdyo gereksinimleri (zemin, ayna, piyano) nedeniyle Kadıköy\'de. Müzikal sahnelemeye merakın varsa Musical Lab\'ın final döneminde sahne pratiği en yoğun haliyle var.',
      },
    ],
    related: ['dans-kursu-istanbul', 'taksim-dans-kursu', 'kadikoy-dans-kursu'],
  },

  // ── TAKSİM × DANS/MÜZİKAL ────────────────────────────────────────
  {
    slug: 'taksim-dans-kursu',
    label: 'Dans · Taksim',
    navHidden: true,
    h1: 'TAKSİM\nDANS & MÜZİKAL',
    eyebrow: 'Broadway Dans · Müzikal — Taksim Sınıfı Açıldı',
    seoTitle: 'Taksim Dans Kursu — Broadway Müzikal Dansı | Techne Lab',
    seoDesc:
      'Taksim\'de dans kursu: Broadway Musical Dance Taksim sınıfı 3 Ekim Cumartesi 19:00\'da başlıyor. Jazz ve theatre dance, sahne koreografisi. 12 ya da 6 haftalık program, dans deneyimi şart değil.',
    keywords: [
      'taksim dans kursu', 'taksim dans atölyesi', 'taksim müzikal kursu',
      'taksim jazz dans', 'istiklal dans kursu', 'taksim broadway dans',
      'harbiye dans kursu', 'cihangir dans atölyesi', 'taksim yakını dans kursu',
      'taksim müzikal tiyatro', 'elmadağ dans kursu',
    ],
    intro:
      'Taksim civarında dans kursu çok; sahneye bakanı az. Broadway Musical Dance\'in Taksim sınıfı 3 Ekim Cumartesi 19:00\'da başlıyor — İstiklal\'den çıkıp yürüyerek yetişebileceğin bir saatte. Aynı program Kadıköy stüdyosunda Perşembe akşamları da yürüyor; hangi yaka sana yakınsa oradan başlıyorsun. Taksim tarafında kalmak istersen Pera\'daki partner stüdyoda oyunculuk ve İngilizce drama atölyeleri de var.',
    what:
      'Dans: Broadway Musical Dance — jazz ve theatre dance teknikleriyle sahne koreografisi. 12 haftalık tam ya da 6 haftalık kısa program; Taksim sınıfı 3 Ekim Cumartesi 19:00\'da, Kadıköy sınıfı 1 Ekim Perşembe 19:00\'da başlıyor. Müzikal: Techne Musical Lab — sekiz ay, oyunculuk + şan + dans, Mayıs\'ta seyircili bitirme performansı; bu program yalnızca Kadıköy stüdyosunda, çünkü zemin, ayna ve piyano altyapısı orada.',
    who:
      'Harbiye, Elmadağ, Cihangir, Gümüşsuyu hattında yaşayanlar; Taksim\'de çalışıp iş çıkışı atölyeye yürüyerek gitmek isteyenler; müzikal tiyatroya merakı olup nereden başlayacağını bilmeyenler. Dans deneyimi şart değil — teknik temelden başlıyoruz, grup 15 kişiyi geçmiyor.',
    workshopSlugs: ['broadway-musical-dance', 'techne-musical-lab'],
    districtSlugs: ['taksim-oyunculuk-kursu', 'kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Taksim\'de dans dersi veriyor musunuz?',
        a: 'Evet. Broadway Musical Dance\'in Taksim sınıfı Cumartesi 19:00–21:00\'da, 3 Ekim\'de başlıyor. Aynı program Perşembe akşamları Kadıköy stüdyosunda da açık — ikisinden birini seçiyorsun. Müzikal Lab ise stüdyo gereksinimleri nedeniyle yalnızca Kadıköy\'de; bunu açıkça yazıyoruz, "her semtte her program" iddiasında değiliz.',
      },
      {
        q: 'Kadıköy sınıfına geçmek istersem ulaşım gerçekçi mi?',
        a: 'Evet. Füniküler + Kabataş–Kadıköy vapuru en rahat rota; metro + Marmaray (Ayrılık Çeşmesi) alternatif. Kadıköy sınıfı Perşembe, Taksim sınıfı Cumartesi 19:00–21:00 çalışıyor — içerik aynı, gün farklı.',
      },
      {
        q: 'Önce denemek istesem?',
        a: 'Broadway Musical Dance\'e 6 haftalık kısa programla başlayabilirsin; sonunda devam kararı senin. Sorularını telefon ya da WhatsApp\'tan sor — fiyat ve koşulları başvuru sonrası birebir paylaşıyoruz.',
      },
    ],
    related: ['dans-kursu-istanbul', 'beyoglu-dans-kursu', 'muzikal-tiyatro-kursu-istanbul'],
  },

  // ── KADIKÖY × İNGİLİZCE DRAMA ────────────────────────────────────
  {
    slug: 'kadikoy-ingilizce-drama-kursu',
    label: 'İngilizce Drama · Kadıköy',
    navHidden: true,
    h1: 'KADIKÖY\nİNGİLİZCE DRAMA',
    eyebrow: 'English Drama Lab · English Drama Youth — Kadıköy',
    seoTitle: 'Kadıköy İngilizce Drama Kursu — English Drama Lab & Youth',
    seoDesc:
      'Kadıköy\'de İngilizce drama: yetişkinler için English Drama Lab (Pazartesi 20:00) ve 10-17 yaş için English Drama Youth (Cumartesi). Doğaçlama temelli, gramer yok — Anadolu yakasında.',
    keywords: [
      'kadıköy ingilizce drama', 'kadıköy ingilizce drama kursu', 'kadıköy english drama',
      'anadolu yakası ingilizce drama', 'kadıköy ingilizce tiyatro', 'kadıköy ingilizce konuşma kulübü',
      'moda ingilizce drama', 'kadıköy gençler için ingilizce drama',
      'kadıköy çocuklar için ingilizce drama', 'üsküdar ingilizce drama',
      'ataşehir ingilizce drama', 'bostancı ingilizce drama', 'kadıköy english drama lab',
    ],
    intro:
      'Kadıköy\'de İngilizce sahnede konuşmak isteyenler için iki ayrı kapı var: yetişkinler için English Drama Lab, 10-17 yaş için English Drama Youth. İkisi de aynı yöntemle çalışıyor — gramer değil, doğaçlama ve oyun. Anadolu yakasından "ingilizce drama nerede" diye arayanların çoğu bu sayfaya düşüyor, çünkü Beyoğlu\'na geçmeden aynı kalitede bir program burada.',
    what:
      'Yetişkin tarafında English Drama Lab: 12, 6 ya da 4 haftalık paket seçenekleri, Kadıköy grubu Pazartesi akşamları 20:00\'de. Metin ezberi yok — doğaçlama, status oyunları, karakter çalışması. Gençlik tarafında English Drama Youth: 10-17 yaş, Cumartesi günleri, sekiz ay (Ekim-Mayıs); 10-14 ve 15-17 yaş grupları ayrı sınıflarda çalışıyor, yıl seyircili bir final gösterisiyle kapanıyor.',
    who:
      'İngilizcesi var ama konuşurken donan yetişkinler, yurtdışı hazırlığı yapanlar, konuşma kulübü deneyip sıkılmış olanlar — bunlar English Drama Lab\'a. Çocuğu ya da genci için oyun temelli, sınavsız bir İngilizce ortamı arayan veliler — English Drama Youth\'a. Üsküdar, Ataşehir, Bostancı\'dan gelenler için Kadıköy zaten en yakın nokta.',
    workshopSlugs: ['english-drama-lab', 'english-drama-youth'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Kadıköy\'de İngilizce drama hangi gün?',
        a: 'English Drama Lab yetişkin grubu Pazartesi 20:00\'de, English Drama Youth ise Cumartesi günleri çalışıyor. İkisi ayrı program, ayrı yaş grubu — kayıt sırasında hangisine katılacağını netleştiriyoruz.',
      },
      {
        q: '10-17 yaş için Kadıköy\'de İngilizce drama var mı?',
        a: 'Evet — English Drama Youth, Ekim-Mayıs arası Cumartesi günleri Kadıköy\'de yürüyor. 10-14 ve 15-17 yaş ayrı sınıflarda çalışıyor; yıl seyircili bir final gösterisiyle kapanıyor.',
      },
      {
        q: 'İngilizce seviyem düşük, yine de katılabilir miyim?',
        a: 'Yetişkin grubunda orta seviye (B1 civarı) yeterli — beklenen mükemmel gramer değil, konuşma cesareti. Gençlik grubunda da benzer: akıcı olmak değil, sohbet edebilmek yeterli.',
      },
    ],
    related: ['ingilizce-drama-istanbul', 'kadikoy-muzikal-tiyatro-kursu', 'kadikoy-dans-kursu'],
  },

  // ── BEYOĞLU · PERA × İNGİLİZCE DRAMA ──────────────────────────────
  {
    slug: 'beyoglu-ingilizce-drama-kursu',
    label: 'İngilizce Drama · Beyoğlu',
    navHidden: true,
    h1: 'BEYOĞLU · PERA\nİNGİLİZCE DRAMA',
    eyebrow: 'English Drama Lab · English Acting Praxis — Pera',
    seoTitle: 'Beyoğlu & Pera İngilizce Drama Kursu — English Drama Lab & Acting Praxis',
    seoDesc:
      'Beyoğlu Pera\'da İngilizce drama: English Drama Lab (Cumartesi 15:00, doğaçlama temelli) ve English Acting Praxis (Cumartesi 11:00, uluslararası casting hazırlığı, Harika Uygur masterclass finali).',
    keywords: [
      'beyoğlu ingilizce drama', 'pera ingilizce drama', 'taksim ingilizce drama',
      'beyoğlu english drama', 'pera english acting', 'galata ingilizce drama',
      'cihangir ingilizce drama', 'ingilizce oyunculuk beyoğlu', 'beyoğlu ingilizce tiyatro',
      'avrupa yakası ingilizce drama', 'ingilizce audition hazırlık istanbul',
      'pera english drama lab',
    ],
    intro:
      'Pera\'da İngilizce sahne çalışmasının iki farklı katmanı var: English Drama Lab konuşma cesaretini kuruyor, English Acting Praxis o cesareti uluslararası bir oyunculuk diline taşıyor. Beyoğlu ve Taksim çevresinden "ingilizce drama" ya da "ingilizce oyunculuk" arayanların çoğu ihtiyacını bu ikisinden birinde karşılıyor.',
    what:
      'English Drama Lab: 12, 6 ya da 4 haftalık paket, Pera grubu Cumartesi 15:00\'de — doğaçlama ve oyun temelli, metin ezberi yok. English Acting Praxis: 12 hafta, Cumartesi 11:00\'de, B1 üzeri İngilizce yeterli; metin çalışması, karakter kurma ve prova disipliniyle ilerliyor, finalde cast direktörü Harika Uygur\'un bir günlük masterclass ve çekim günü var.',
    who:
      'İngilizce konuşurken donan, yurtdışı hazırlığı yapan ya da bir konuşma kulübünden fazlasını arayan yetişkinler — English Drama Lab\'a. Sahne deneyimi olan, oyunculuğunu uluslararası castinglere hazırlamak isteyen oyuncular — English Acting Praxis\'e. İkisi de Pera\'daki aynı stüdyoda, İstiklal Caddesi\'ne yürüme mesafesinde.',
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'taksim-oyunculuk-kursu'],
    faq: [
      {
        q: 'Beyoğlu\'nda İngilizce drama nerede ve ne zaman?',
        a: 'Pod Pera stüdyosunda, İstiklal Caddesi\'ne yürüme mesafesinde. English Drama Lab Cumartesi 15:00\'de, English Acting Praxis Cumartesi 11:00\'de çalışıyor — aynı gün, farklı saat, farklı program.',
      },
      {
        q: 'English Drama Lab ile English Acting Praxis arasındaki fark ne?',
        a: 'English Drama Lab doğaçlama ve oyunla İngilizce konuşma cesareti kuruyor, seviye şartı yok. English Acting Praxis ise B1 üzeri İngilizce ve genelde bir miktar sahne deneyimi bekliyor — metin, karakter ve prova disipliniyle uluslararası casting hazırlığına odaklanıyor.',
      },
      {
        q: 'Harika Uygur masterclass\'ı herkese mi açık?',
        a: 'Yalnızca English Acting Praxis\'in 12 haftasını tamamlayan katılımcılara — finalde bir günlük masterclass ve çekim günü var, performanslar kayıt altına alınıp teslim ediliyor.',
      },
    ],
    related: ['ingilizce-drama-istanbul', 'kamera-onu-oyunculuk-istanbul', 'kadikoy-ingilizce-drama-kursu'],
  },
]

export function getDiscipline(slug: string) {
  return DISCIPLINES.find((d) => d.slug === slug)
}
