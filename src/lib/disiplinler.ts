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
      'Oyunculuk bir yetenek meselesi değil, bir pratik meselesi. Techne Lab\'ın İstanbul\'daki oyunculuk atölyeleri bedenden başlıyor: nefesin nereye gittiği, ağırlığın nasıl dağıldığı, partnerin gerçekten görülüp görülmediği. Kadıköy ve Pera\'daki stüdyolarımızda haftada bir gün, on iki kişiyi geçmeyen gruplarla çalışıyoruz.',
    what:
      'Çalışma üç eksende ilerliyor. Beden: fiziksel farkındalık, zemin çalışması, hareket kalitesi. Ses: nefes desteği, rezonans, metnin sesle taşınması. Mevcudiyet: anda kalmak, gerçek tepki vermek, sahnede var olmak. Bunların üzerine karakter inşası ve metin çalışması geliyor — ama sıra bu; teknik olmadan karakter kurulmaz. Her derste herkes sahneye çıkıyor, herkes bireysel geri bildirim alıyor.',
    who:
      'Hiç sahneye çıkmamış olanlar, konservatuvar hazırlığı yapanlar, uzun süre ara verip geri dönenler ve kamera önünde çalışıp sahne tekniği eksiği hisseden oyuncular. Yaş sınırı yok; gruplar yetişkin. Gençler için ayrı bir program yürüyor.',
    workshopSlugs: ['oyuncunun-mevcudiyeti', 'camera-praxis', 'english-drama-final-project'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Hiç oyunculuk deneyimim yok, katılabilir miyim?',
        a: 'Evet. Oyunculuk atölyelerimizin tamamı başlangıç seviyesine açık. Deneyim gerektiren programlar sayfasında açıkça belirtiliyor. Grupların 10–12 kişiyle sınırlı olmasının sebebi tam da bu: herkesin kendi hızında ilerleyebilmesi.',
      },
      {
        q: 'Oyunculuk kursu ne kadar sürüyor?',
        a: 'Yoğun atölyeler 4 hafta, dönemlik programlar 12 hafta, kapsamlı programlar 8 ay sürüyor. Haftada bir ya da iki gün, akşam saatlerinde — çalışanlar için planlanmış.',
      },
      {
        q: 'Oyunculuk kursu İstanbul\'da nerede yapılıyor?',
        a: 'Kadıköy tarafında iki partner stüdyo (Rasimpaşa ve Kadıköy merkez), Avrupa yakasında Pera\'da bir mekân. Aynı program bazen iki yakada da açılıyor — kayıt sırasında sana yakın olanı seçiyorsun.',
      },
    ],
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
        a: 'Evet. English Drama Lab tam olarak bu: yaratıcı drama araçlarını İngilizce dil pratiğiyle birleştiren, aylık katılımlı açık program. Konuşma kulübünün pratiğini sahnede, bedenle yapıyoruz.',
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
        a: '10–17 yaş için English Drama Youth programı var: Eylül–Mayıs arası haftada bir gün, yıl sonunda seyircili bir final gösterisiyle kapanıyor. Veli onayıyla başvuru alınıyor.',
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
      'İstanbul kamera önü oyunculuk atölyesi: karakter inşası, çerçeve bilinci, soğuk okuma ve self-tape. Türkçe ve İngilizce metinlerle casting hazırlığı — Pera.',
    keywords: [
      'kamera önü oyunculuk', 'kamera önü oyunculuk kursu istanbul',
      'kamera oyunculuğu eğitimi', 'dizi oyunculuğu kursu istanbul',
      'sinema oyunculuğu kursu', 'audition hazırlık kursu', 'self tape eğitimi',
      'casting hazırlık istanbul', 'showreel çekimi istanbul',
      'kamera önü oyunculuk beyoğlu', 'kamera önü oyunculuk taksim',
      'ingilizce kamera önü oyunculuk', 'soğuk okuma tekniği',
    ],
    intro:
      'Sahnede işleyen oyunculuk kamerada aynı şekilde işlemiyor. Sahne için büyütülen her şey — jest, ses, enerji — objektifin önünde fazla geliyor. Camera Praxis tam olarak bu farkı çalışan yoğun bir atölye. Selen Uçer ile Pera\'da, dört hafta.',
    what:
      'Karakter analiziyle başlıyoruz: hedef, engel, alt metin — ama metni kamera için okuyarak. Sonra teknik: çerçeve bilinci, close-up\'ta enerji yönetimi, göz hattı, tekrarlanabilirlik. Son hafta tamamen audition: soğuk okuma, casting simülasyonu, self-tape çekimi. Çıkışta showreel için kullanabileceğin kayıt elinde oluyor. Çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor.',
    who:
      'Sahne deneyimi olup kameraya geçmek isteyenler, casting\'lere girip geri dönüş alamayanlar, self-tape hazırlaması gerekenler ve iki dilde birden çalışmak isteyen oyuncular.',
    workshopSlugs: ['camera-praxis', 'english-drama-final-project', 'oyuncunun-mevcudiyeti'],
    districtSlugs: ['beyoglu-tiyatro-kursu'],
    faq: [
      {
        q: 'Kamera önü oyunculuk kursu için sahne deneyimi şart mı?',
        a: 'Şart değil ama faydalı. Program temel oyunculuk araçlarını da kapsıyor; yine de sahnede çalışmış olmak kameradaki ölçek farkını daha hızlı kavramanı sağlıyor.',
      },
      {
        q: 'Self-tape kaydı alıyor muyum?',
        a: 'Evet. Son hafta çekilen self-tape ve casting simülasyonu kayıtları katılımcılara teslim ediliyor — showreel için doğrudan kullanılabilir materyal.',
      },
      {
        q: 'İngilizce audition hazırlığı yapıyor musunuz?',
        a: 'Evet. Çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor. Uluslararası casting\'lere hazırlananlar için İngilizce sahne çalışan English Acting Praxis programı da var.',
      },
    ],
    related: ['oyunculuk-kursu-istanbul', 'ingilizce-drama-istanbul'],
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
        q: 'Dans dersleri hangi gün ve saatte?',
        a: 'Perşembe 19:00–21:00, Kadıköy\'de. Yeni dönem 17 Eylül Perşembe başlıyor; 12 haftalık tam ya da 6 haftalık kısa program seçebilirsin.',
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
      'İstanbul müzikal tiyatro kursu: oyunculuk, şan ve dans tek programda. 8 aylık kapsamlı eğitim, seyircili bitirme performansı — Kadıköy. Köksal Ünal & Sitare Bilge.',
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
      'Müzikal tiyatro üç dili aynı anda konuşmayı gerektirir: oyunculuk, şan ve dans. Techne Lab\'ın müzikal programı bu üçünü ayrı dersler olarak değil, tek bir sahne pratiği olarak kuruyor. Köksal Ünal ve Sitare Bilge ile Kadıköy\'de, sekiz ay, haftada iki gün.',
    what:
      'Program dramadan başlıyor — çünkü şarkı da bir sahnedir ve oynanmadan söylenmez. Ekim–Aralık: sahne varlığı, karakter inşası, şan tekniğiyle buluşan oyuncu sesi. Ocak–Mart: müzikal ritim, Broadway dans temelleri, müzikal metin çalışması. Nisan–Mayıs: tam sahne uygulaması — kostüm, ışık, seyirci. Dönem seyircili bir bitirme performansıyla kapanıyor.',
    who:
      'Şarkı söyleyip sahneye taşımak isteyenler, oyunculuk çalışıp müzikale geçmek isteyenler ve üç disiplini birden ciddiyetle çalışmak isteyenler. Başvuru için bir müzikal ya da pop şarkısını seslendirdiğin kısa bir video isteniyor; kabul video incelemesiyle yapılıyor.',
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
    districtSlugs: ['kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Şan eğitimi programa dahil mi?',
        a: 'Evet. Sitare Bilge ile şan ve vokal çalışması programın omurgasında — ayrı bir ders olarak değil, oyunculuk ve dansla birlikte yürüyor. "Şarkı yoluyla oynamak" programın merkezinde.',
      },
      {
        q: 'Nota bilmem gerekiyor mu?',
        a: 'Gerekmiyor. Şan çalışması kulaktan ve bedenden ilerliyor. Nota bilgisi avantaj ama önkoşul değil.',
      },
      {
        q: 'Müzikal programı ile Broadway dans programı arasındaki fark ne?',
        a: 'Broadway Musical Dance sadece dansa odaklı; 12 haftalık tam ya da 6 haftalık kısa seçenekle alınabiliyor. Techne Musical Lab 8 aylık ve üç disiplini birden kapsıyor — oyunculuk, şan, dans — ve seyircili bir bitirme performansıyla kapanıyor.',
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
      'İstanbul 10-14 yaş İngilizce drama: dil öğretmiyoruz, dili sahnede deneyimliyoruz. Ders kitabı ve sınav yok — oyunla İngilizce konuşma pratiği. B1 ve üzeri. Sekiz ay, seyircili final gösterisi. Kadıköy.',
    keywords: [
      'çocuklar için ingilizce drama', 'çocuk ingilizce drama kursu istanbul',
      'ingilizce drama çocuk', '10 yaş drama kursu', '11 yaş drama kursu',
      '12 yaş tiyatro kursu', '13 yaş drama kursu', '10 12 yaş yaratıcı drama',
      'çocuklara ingilizce tiyatro', 'çocuk drama kursu kadıköy',
      'ingilizce konuşma çocuk kursu', 'çocuk yaratıcı drama istanbul',
      'çocuklar için tiyatro kursu istanbul',
    ],
    intro:
      'Bu bir İngilizce kursu değil. Dil öğretmiyoruz. Dili deneyimliyoruz. Techne Lab İstanbul\'un 10–14 yaş grubu, İngilizce yaratıcı dramayı sekiz aya yayılan sürekli bir program olarak yürütüyor ve yıl, ailelerin izlediği gerçek bir sahne gösterisiyle kapanıyor. Kadıköy\'deki stüdyomuzda haftada bir gün, on iki kişiyi geçmeyen gruplarla.',
    what:
      'Ders kitabı yok, gramer anlatımı yok, sınav ve not yok. Çocuk bir karakteri canlandırırken, bir sahneyi kurarken, arkadaşıyla doğaçlama yaparken dili kullanmak zorunda kalıyor — ve kullandıkça korkusu geçiyor. Öğrendiği İngilizce burada işe yarayan bir şeye dönüşüyor. Yıl üç evrede ilerliyor: önce oyun ve güven, sonra karakter ve metin, son üç ayda gösteri provası. Mayıs\'ta seyirci önünde sahneye çıkıyorlar.',
    who:
      'İngilizce dersleri iyi giden ama konuşmaya gelince susan çocuklar. Kalabalık önünde utanan, kendini anlatmakta zorlanan çocuklar. Sahneye merakı olanlar. Oyunculuk deneyimi gerekmiyor; İngilizcede B1 ve üzeri bekliyoruz — sohbet edebiliyorsa yeterli. Dili sıfırdan kurmuyoruz, var olanı konuşmaya çeviriyoruz. Gruplar yaşa göre ayrılıyor: 10–14 ve 15–17 ayrı sınıflarda çalışıyor.',
    workshopSlugs: ['english-drama-youth'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Çocuğumun İngilizce seviyesi yeterli mi?',
        a: 'B1 ve üzeri bekliyoruz — yani günlük bir sohbeti takip edip cevap verebiliyorsa yeterli. Akıcı olması gerekmiyor. Burası İngilizce öğretilen bir yer değil; öğrendiğinin kullanıldığı yer. Sıfırdan dil kurmuyoruz, var olan bilgiyi konuşmaya çeviriyoruz.',
      },
      {
        q: 'Küçük çocuklar büyüklerle aynı grupta mı olacak?',
        a: 'Hayır, gruplar ayrı. 10–14 yaş ve 15–17 yaş farklı sınıflarda çalışıyor. Kayıt sırasında çocuğunuzun yaşına uygun gruba yerleştiriyoruz.',
      },
      {
        q: 'Program ne kadar sürüyor?',
        a: 'Sekiz ay — Eylül\'den Mayıs\'a, haftada bir gün. Yıl sonunda seyircili bir final gösterisiyle kapanıyor.',
      },
      {
        q: 'Yıl sonu gösterisi zorunlu mu?',
        a: 'Gösteri programın bir parçası ve tüm grup birlikte hazırlanıyor. Sahnede ne kadar öne çıkacağı çocuğun kendi hızına göre belirleniyor — kimseyi istemediği bir yere itmiyoruz.',
      },
      {
        q: 'Dersler nerede yapılıyor?',
        a: 'Kadıköy\'deki partner stüdyomuzda. Anadolu Yakası\'nın her yerinden ulaşım kolay; Üsküdar, Ataşehir ve Maltepe\'den gelen öğrencilerimiz var.',
      },
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
      'İstanbul 15-17 yaş İngilizce drama: dil öğretmiyoruz, dili sahnede deneyimliyoruz. Lise çağı için sahne, doğaçlama ve İngilizce konuşma pratiği — sınav ve not yok. B1 ve üzeri. Sekiz ay, seyircili final gösterisi. Kadıköy.',
    keywords: [
      'gençler için tiyatro kursu istanbul', 'genç drama kursu', 'lise tiyatro kursu',
      '15 yaş tiyatro kursu', '16 yaş drama kursu', '17 yaş oyunculuk kursu',
      'ergen drama atölyesi', 'gençlik tiyatrosu istanbul', 'youth theatre istanbul',
      'gençler ingilizce drama', 'lise çağı sahne sanatları',
      'gençler için oyunculuk kursu kadıköy',
    ],
    intro:
      'On beş yaşından sonra çocukluk oyunları işe yaramıyor — genç, ciddiye alınmak istiyor. Techne Lab İstanbul\'un 15–17 yaş grubu bu yüzden ayrı çalışıyor: gerçek metinler, gerçek sahne çalışması, yıl sonunda seyirci önünde gerçek bir gösteri. Sekiz ay, haftada bir gün, Kadıköy.',
    what:
      'Dil öğretmiyoruz. Dili deneyimliyoruz. Ders kitabı, gramer anlatımı ve sınav yok; doğaçlama, karakter kurma, metin analizi ve sahne çalışması var. Genç, kendi seçtiği bir karakterle yıl boyunca uğraşıyor ve Mayıs\'taki gösteride onu seyirciye taşıyor. İngilizcesi bunun sonucunda açılıyor: bir dili sahnede kullanmak zorunda kalan biri, o dille arasındaki mesafeyi hızla kapatıyor.',
    who:
      'Sahneye ilgisi olan, konservatuvar ya da yurtdışı düşünen, ya da sadece kendini ifade etmek için bir alan arayan liseliler. Üniversite hazırlığı sürecinde nefes alacak bir yer arayanlar. Oyunculuk deneyimi gerekmiyor; İngilizcede B1 ve üzeri bekliyoruz — sohbet edebiliyorsa yeterli. Gruplar yaşa göre ayrı: 15–17 kendi sınıfında, 10–14 ayrı çalışıyor.',
    workshopSlugs: ['english-drama-youth'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
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
        a: 'Orta seviye yeterli. Program dil öğretmiyor, dili deneyimletiyor. Konuşurken zorlanmak sorun değil — zaten çalışılan şey o.',
      },
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
      'Beden, ses ve metin aynı anda çalışılıyor. Isınmayla başlıyoruz, doğaçlamayla devam ediyoruz, sahne çalışmasıyla bitiyoruz. Kimse izleyici koltuğunda oturmuyor — her derste herkes ayakta. Programlar seyircili bir final performansıyla kapanıyor; bu, çalışmanın bir noktaya varması için gerekli. Deneyim aranmıyor, yaş sınırı yok, "yeteneğim var mı" sorusunun cevabı burada aranmıyor.',
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
    ],
    intro:
      'Klasik konuşma kulüplerinin sorunu şu: bir masanın etrafında oturup "bugün hava nasıl" diye konuşuyorsun ve iki hafta sonra sıkılıyorsun. Techne Lab\'ın yaklaşımı farklı — İngilizceyi sahnede kullanıyorsun. Bir karakteri canlandırırken, doğaçlama yaparken, sahne kurarken dil bir amaç değil araç oluyor. Ve araç olduğu anda korku kayboluyor.',
    what:
      'Ders tamamen İngilizce yürüyor. Ama gramer anlatılmıyor, kelime listesi ezberlenmiyor. Doğaçlama sahneleri kuruyorsun, karakterler yaratıyorsun, metinlerle çalışıyorsun. Hata yapmak sorun değil — sahnede hata zaten malzeme. Katılımcıların çoğu ilk ay içinde "düşünmeden konuşmaya" başladığını söylüyor; çünkü sahnede düşünecek vakit yok.',
    who:
      'İngilizcesi kâğıt üzerinde iyi ama konuşurken donanlar. Konuşma kulüplerine gidip sıkılanlar. Yurtdışı iş görüşmesine ya da eğitimine hazırlananlar. Aksan kaygısı taşıyanlar. Orta seviye ve üzeri yeterli — akıcılık aranmıyor, zaten çalışılan şey o.',
    workshopSlugs: ['english-drama-lab', 'english-drama-final-project'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'beyoglu-tiyatro-kursu', 'taksim-oyunculuk-kursu'],
    faq: [
      {
        q: 'Bu bir İngilizce kursu mu?',
        a: 'Hayır. Dil öğretmiyoruz. Dili deneyimliyoruz. Gramer bilgin varsa ama konuşamıyorsan doğru yerdesin. Sıfırdan İngilizce öğrenmek istiyorsan önce bir dil kursu daha uygun.',
      },
      {
        q: 'Seviyem yeterli mi?',
        a: 'Orta seviye yeterli. Cümle kurabiliyorsan başlayabilirsin. İlk derste seviye ölçmüyoruz — sahnede kim ne yapabiliyorsa oradan başlıyoruz.',
      },
      {
        q: 'Oyunculuk bilmem gerekiyor mu?',
        a: 'Hayır. Katılımcıların çoğu hiç sahneye çıkmamış. Oyunculuk burada amaç değil, dili deneyimleten araç.',
      },
      {
        q: 'Konuşma kulübünden farkı ne?',
        a: 'Konuşma kulübünde konuyu bulmakla uğraşırsın. Burada konu hazır — sahne sana bir durum veriyor, sen içinde konuşuyorsun. Sıkılma ihtimali çok daha düşük.',
      },
    ],
    related: ['ingilizce-drama-istanbul', 'yetiskinler-icin-tiyatro-kursu-istanbul', 'oyunculuk-kursu-istanbul'],
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
      'Program üç disiplini aynı anda yürütüyor: oyunculuk, şan ve dans. Köksal Ünal ve Sitare Bilge yönetiminde beden, ses ve sahne birlikte çalışılıyor. Yıl seyircili bir final performansıyla kapanıyor — kurs bitirme belgesi değil, gerçek bir gösteri. Sekiz ay boyunca aynı grupla çalışmak, tek başına bir topluluk deneyimi.',
    who:
      'Şarkı söylemeyi seven ama hiç sahneye çıkmamış olanlar. Ofisten çıkıp bambaşka bir şey yapmak isteyenler. Çocukken müzikale merak salmış, hiç fırsat bulamamış olanlar. Deneyim aranmıyor, ses eğitimi programın parçası. On sekiz yaş üstü — üst sınır elli beş.',
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
    districtSlugs: ['kadikoy-tiyatro-kursu', 'anadolu-yakasi-tiyatro-kursu'],
    faq: [
      {
        q: 'Şarkı söyleyemiyorum, olur mu?',
        a: 'Olur. Şan eğitimi programın içinde — Sitare Bilge ile sesini kullanmayı öğreniyorsun. Kimse ses testinden geçmiyor.',
      },
      {
        q: 'Yaşım büyük, geç mi kaldım?',
        a: 'Program kırk ve elli yaşlarındaki katılımcılara açık, üst sınır elli beş. Gruplarımızda bu yaşlarda insanlar var ve sahnede en rahat olanlar çoğu zaman onlar.',
      },
      {
        q: 'Haftada iki gün ağır gelir mi?',
        a: 'Dersler akşam saatlerinde. Sekiz ayın sonunda seyirci önüne çıkacak bir gösteri hazırlanıyor — bu yoğunluk o hedefin gereği. Çalışan katılımcılarımızın çoğu bu tempoyu sürdürüyor.',
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
      'Kadıköy\'de iki ayrı kapı var. Techne Musical Lab sekiz aylık tam program: oyunculuk temelinden başlıyor, şan ve dansı üzerine kuruyor, Mayıs\'ta seyircili bir bitirme performansıyla kapanıyor — 28 Eylül\'de başlıyor, başvuru kısa bir şarkı videosuyla. Broadway Musical Dance ise yalnızca dansa odaklı 12 haftalık yoğun program: jazz ve theatre dance teknikleri, sahne koreografisi — 17 Eylül Perşembe akşamı başlıyor, dilersen 6 haftalık kısa programla deneyebilirsin.',
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
      'Program 12 hafta: teknik temel (duruş, izolasyon, jazz vokabüleri), ardından kombinasyon ve koreografi, son bölümde sahne performansı kalitesinde çalışılan tam bir Broadway numarası. Perşembe akşamları 19:00–21:00, Rasimpaşa\'daki stüdyoda; yeni dönem 17 Eylül\'de başlıyor. 12 haftalık tam programa yazılabilir ya da 6 haftalık kısa programla başlayıp devam kararını sonra verebilirsin. Dansın müzikal sahnesiyle buluştuğu tam sürüm için sekiz aylık Techne Musical Lab da aynı stüdyoda.',
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
        q: 'Dersler hangi gün ve saatte?',
        a: 'Perşembe akşamları 19:00–21:00, Kadıköy Rasimpaşa\'daki stüdyoda. Yeni dönem 17 Eylül Perşembe başlıyor. Mesai sonrası yetişilebilir bir saat — katılımcıların çoğu çalışan yetişkinler.',
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
      'Beyoğlu\'nda dans kursu: Broadway Musical Dance Taksim sınıfı 17 Eylül Perşembe 19:00\'da başlıyor. Jazz ve theatre dance, sahne koreografisi. Pera\'da ayrıca İngilizce drama ve oyunculuk atölyeleri.',
    keywords: [
      'beyoğlu dans kursu', 'pera dans kursu', 'pera dans atölyesi', 'galata dans kursu',
      'cihangir dans kursu', 'beyoğlu müzikal kursu', 'pera müzikal atölyesi',
      'avrupa yakası dans kursu', 'avrupa yakası müzikal kursu', 'karaköy dans kursu',
      'beyoğlu broadway dans', 'şişhane dans atölyesi',
    ],
    intro:
      'Beyoğlu tarafında dans arıyorsan: Broadway Musical Dance\'in Taksim sınıfı 17 Eylül Perşembe 19:00\'da başlıyor — Galata, Cihangir, Şişhane hattından yürüme ya da tek durak mesafesinde. Aynı program aynı gün ve saatte Kadıköy stüdyosunda da açık; Karaköy\'den vapurla geçmeyi ritüel sayanlar oraya da gidebiliyor. İngilizce drama ve oyunculuk atölyelerimiz ise Pera\'daki partner stüdyoda yürüyor.',
    what:
      'Dans hattında Broadway Musical Dance var: jazz ve theatre dance teknikleriyle sahne koreografisi, Perşembe 19:00–21:00, 17 Eylül başlangıç, 12 haftalık tam ya da 6 haftalık kısa seçenek — Taksim ve Kadıköy sınıfları birlikte açılıyor. Müzikal hattında Techne Musical Lab: sekiz ay, oyunculuk + şan + dans, seyircili bitirme performansı; bu program stüdyo gereksinimleri nedeniyle yalnızca Kadıköy\'de.',
    who:
      'Galata, Cihangir, Şişhane, Karaköy hattında yaşayıp "dans kursu beyoğlu" diye arayan; iş çıkışı Karaköy\'den vapura atlayabilecek olan; ya da dansı değil de sahneyi Pera\'da isteyen (o zaman İngilizce drama programlarına bak) herkes. Vapur yolculuğunu dert değil ritüel sayanlar için ekstra puan.',
    workshopSlugs: ['broadway-musical-dance', 'techne-musical-lab'],
    districtSlugs: ['beyoglu-tiyatro-kursu', 'kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Beyoğlu\'nda dans dersi veriyor musunuz?',
        a: 'Evet — Broadway Musical Dance\'in Taksim sınıfı Perşembe 19:00–21:00\'da çalışıyor, 17 Eylül\'de başlıyor. Müzikal Lab ise zemin, ayna ve piyano gereksinimleri nedeniyle yalnızca Kadıköy stüdyosunda. Mekân bilgisini her sayfada açık yazarız.',
      },
      {
        q: 'Kadıköy sınıfını tercih edersem nasıl giderim?',
        a: 'En keyifli yol Karaköy–Kadıköy vapuru; iskeleden stüdyo yürüme mesafesinde. Alternatif: Marmaray ile Ayrılık Çeşmesi durağı. İki sınıfın günü ve saati aynı, içerik aynı.',
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
      'Taksim\'de dans kursu: Broadway Musical Dance Taksim sınıfı 17 Eylül Perşembe 19:00\'da başlıyor. Jazz ve theatre dance, sahne koreografisi. 12 ya da 6 haftalık program, dans deneyimi şart değil.',
    keywords: [
      'taksim dans kursu', 'taksim dans atölyesi', 'taksim müzikal kursu',
      'taksim jazz dans', 'istiklal dans kursu', 'taksim broadway dans',
      'harbiye dans kursu', 'cihangir dans atölyesi', 'taksim yakını dans kursu',
      'taksim müzikal tiyatro', 'elmadağ dans kursu',
    ],
    intro:
      'Taksim civarında dans kursu çok; sahneye bakanı az. Broadway Musical Dance\'in Taksim sınıfı 17 Eylül Perşembe 19:00\'da başlıyor — İstiklal\'den çıkıp yürüyerek yetişebileceğin bir saatte. Aynı program aynı gün ve saatte Kadıköy stüdyosunda da yürüyor; hangi yaka sana yakınsa oradan başlıyorsun. Taksim tarafında kalmak istersen Pera\'daki partner stüdyoda oyunculuk ve İngilizce drama atölyeleri de var.',
    what:
      'Dans: Broadway Musical Dance — jazz ve theatre dance teknikleriyle sahne koreografisi. 12 haftalık tam ya da 6 haftalık kısa program; Taksim ve Kadıköy sınıfları 17 Eylül Perşembe 19:00–21:00\'da başlıyor. Müzikal: Techne Musical Lab — sekiz ay, oyunculuk + şan + dans, Mayıs\'ta seyircili bitirme performansı; bu program yalnızca Kadıköy stüdyosunda, çünkü zemin, ayna ve piyano altyapısı orada.',
    who:
      'Harbiye, Elmadağ, Cihangir, Gümüşsuyu hattında yaşayanlar; Taksim\'de çalışıp iş çıkışı derse yürüyerek gitmek isteyenler; müzikal tiyatroya merakı olup nereden başlayacağını bilmeyenler. Dans deneyimi şart değil — teknik temelden başlıyoruz, grup 15 kişiyi geçmiyor.',
    workshopSlugs: ['broadway-musical-dance', 'techne-musical-lab'],
    districtSlugs: ['taksim-oyunculuk-kursu', 'kadikoy-tiyatro-kursu'],
    faq: [
      {
        q: 'Taksim\'de dans dersi veriyor musunuz?',
        a: 'Evet. Broadway Musical Dance\'in Taksim sınıfı 17 Eylül Perşembe 19:00–21:00\'da başlıyor. Aynı program aynı gün ve saatte Kadıköy stüdyosunda da açık — ikisinden birini seçiyorsun. Müzikal Lab ise stüdyo gereksinimleri nedeniyle yalnızca Kadıköy\'de; bunu açıkça yazıyoruz, "her semtte her program" iddiasında değiliz.',
      },
      {
        q: 'Kadıköy sınıfına geçmek istersem ulaşım gerçekçi mi?',
        a: 'Evet. Füniküler + Kabataş–Kadıköy vapuru en rahat rota; metro + Marmaray (Ayrılık Çeşmesi) alternatif. İki sınıf da Perşembe 19:00–21:00 çalışıyor, içerik aynı.',
      },
      {
        q: 'Önce denemek istesem?',
        a: 'Broadway Musical Dance\'e 6 haftalık kısa programla başlayabilirsin; sonunda devam kararı senin. Sorularını telefon ya da WhatsApp\'tan sor — fiyat ve koşulları başvuru sonrası birebir paylaşıyoruz.',
      },
    ],
    related: ['dans-kursu-istanbul', 'beyoglu-dans-kursu', 'muzikal-tiyatro-kursu-istanbul'],
  },
]

export function getDiscipline(slug: string) {
  return DISCIPLINES.find((d) => d.slug === slug)
}
