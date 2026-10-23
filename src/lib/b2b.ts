/**
 * Kurumsal ve okul/kolej SEO sayfaları (23 Ekim 2026).
 *
 * Fiyat ve süre talebe göre iletilir (Yağız, 23 Ekim). Bu sayfalar bilinçli olarak
 * SÜRE ve FİYAT yazmaz; "çalışma biçimi" ve "görüşmede netleşenler" anlatır.
 * Paketler açıklanınca künyedeki "Fiyat ve süre" satırı güncellenir.
 *
 * GERÇEKLER (Yağız, 23 Ekim): MEB onayı YOK (hiç anma), sertifika programı YOK,
 * eğitmenler konservatuvar mezunu, şirket/okulla henüz çalışılmadı; tek kurum
 * deneyimi İstanbul Gelişim Üniversitesi'nde yapılan atölye.
 * YASAK: başka referans/müşteri/okul adı, sertifika/MEB onayı iddiası, kaynaksız rakam, "ders" kelimesi.
 * Pazar analizi: proje notu claude/2026-10-23-kurumsal-okul-pazar-analizi.md
 */
export type B2BAudience = 'kurumsal' | 'okullar' | 'en/corporate' | 'en/schools'

export type B2BPage = {
  audience: B2BAudience
  /** Hub için boş string. URL: /kurumsal veya /kurumsal/<slug> */
  slug: string
  label: string
  eyebrow: string
  h1: string
  seoTitle: string
  seoDesc: string
  keywords: string[]
  /** İlk ekrandaki doğrudan cevap — GEO. */
  quick: { q: string; a: string }
  intro: string
  sections: { h: string; body: string }[]
  kunye: { k: string; v: string }[]
  /** Görüşmede netleştirilen başlıklar. */
  gorusme: string[]
  /** ekip.ts slug'ları — bu alanda çalışan eğitmenler. */
  egitmenler: string[]
  faq: { q: string; a: string }[]
  articleSlugs: string[]
  links: { href: string; label: string }[]
  enPath?: string
}

export const B2B_PAKET_NOTU: Record<B2BAudience, string> = {
  'en/corporate':
    'We listen to your team\'s goal and propose a format around it. Price and length are shared on request, after the call.',
  'en/schools':
    'We listen to your school\'s calendar and goals and propose a format around it. Price and length are shared on request, after the call.',
  kurumsal:
    'Ekibinizin hedefini dinleyip çalışma biçimini ona göre öneriyoruz. Fiyat ve süreyi talebe göre, görüşmeden sonra iletiyoruz.',
  okullar:
    'Okulunuzun takvimini ve hedefini dinleyip çalışma biçimini ona göre öneriyoruz. Fiyat ve süreyi talebe göre, görüşmeden sonra iletiyoruz.',
}

const KUNYE_K = [
  { k: 'Dil', v: 'Türkçe ya da İngilizce' },
  { k: 'Yer', v: 'Pera ve Kadıköy stüdyoları ya da kurum içi; görüşmede netleşir' },
  { k: 'Grup', v: 'Küçük gruplarla çalışıyoruz; büyük ekipler için gruplara bölme görüşmede planlanır' },
  { k: 'Deneyim şartı', v: 'Yok. Katılımcılardan oyunculuk beklenmez' },
  { k: 'Eğitmenler', v: 'Konservatuvar mezunu oyuncu ve eğitmenler' },
  { k: 'Fiyat ve süre', v: 'Talebe göre; görüşmeden sonra iletilir' },
  { k: 'Sertifika', v: 'Yok; uygulamalı atölye' },
]
const KUNYE_O = [
  { k: 'Dil', v: 'Türkçe ya da İngilizce' },
  { k: 'Yer', v: 'Okulun kendi salonu ya da Pera ve Kadıköy stüdyoları; görüşmede netleşir' },
  { k: 'Yaş', v: 'İlkokuldan liseye; gruplar yaşa göre ayrılır' },
  { k: 'Takvim', v: 'Okulun akademik takvimine göre planlanır' },
  { k: 'Eğitmenler', v: 'Konservatuvar mezunu oyuncu ve eğitmenler' },
  { k: 'Fiyat ve süre', v: 'Talebe göre; görüşmeden sonra iletilir' },
  { k: 'Sertifika', v: 'Yok; uygulamalı atölye' },
]
const set = (arr: { k: string; v: string }[], k: string, v: string) => arr.map((x) => (x.k === k ? { k, v } : x))

export const B2B_PAGES: B2BPage[] = [
  // ═══════════════════════ KURUMSAL HUB ═══════════════════════
  {
    audience: 'kurumsal', slug: '', label: 'Kurumsal',
    eyebrow: 'kurumsal · istanbul',
    h1: 'Kurumsal Tiyatro, Drama ve Doğaçlama Atölyeleri',
    seoTitle: 'Kurumsal Drama ve Doğaçlama Eğitimi İstanbul — Techne Lab',
    seoDesc: 'Şirketler için tiyatro, drama ve doğaçlama atölyeleri: İngilizce iletişim, sunum ve sahne varlığı, ekip etkinliği, şirket tiyatro topluluğu. İstanbul.',
    keywords: ['kurumsal drama eğitimi', 'kurumsal tiyatro eğitimi', 'kurumsal doğaçlama', 'şirketlere doğaçlama eğitimi', 'team building istanbul', 'ekip etkinliği istanbul', 'kurumsal eğitim istanbul'],
    quick: {
      q: 'İstanbul\'da kurumsal drama ve doğaçlama eğitimi nereden alınır?',
      a: 'Techne Lab İstanbul, Pera ve Kadıköy\'de çalışan bağımsız bir tiyatro topluluğu. Şirketlere Türkçe ya da İngilizce drama, doğaçlama, sunum ve sahne varlığı, hikâye anlatımı ve müzikal-dans temelli ekip atölyeleri tasarlıyor. Çalışmayı oyuncular ve tiyatro eğitmenleri yürütüyor; katılımcılardan oyunculuk deneyimi beklenmiyor.',
    },
    intro: 'Kurumsal eğitimin çoğu anlatır. Tiyatro yaptırır. Toplantıdaki gerginlik, İngilizce konuşurken donma, sahneye çıkınca sesin kısılması: bunlar bilgi eksikliği değil, prova eksikliği. Biz bu provayı stüdyoda, güvenli ve oyunlu bir çerçevede kuruyoruz.',
    sections: [
      { h: 'Neden tiyatro?', body: 'Tiyatro, insanın başkasıyla aynı anda düşünüp konuştuğu bir laboratuvar. Dinlemek, tepki vermek, belirsizlikte karar almak, sesi ve bedeni kullanmak oyuncunun gündelik işi. Bu becerileri slayttan değil, deneyerek çalışıyoruz: önce oyun, sonra küçük sahneler, sonra kurumun kendi durumlarının provası.' },
      { h: 'Kimler için?', body: 'İK ve öğrenme-gelişim ekipleri, ekip liderleri, satış ve müşteri ekipleri, uluslararası çalışan ve İngilizce toplantı yapan ekipler, iç iletişim ve marka ekipleri. Katılımcıların tiyatro geçmişi olması gerekmiyor; çekingen katılımcı için giriş kapısını küçük tutuyoruz.' },
      { h: 'Farkımız', body: 'Gerçek bir tiyatro topluluğuyuz: oyun yazıyor, sahneliyor, yıl sonunda seyirci önüne çıkıyoruz. Kurumsal atölyeye taşıdığımız şey bu pratik. İngilizce drama, dramaturji, müzikal ve Broadway dansını aynı çatı altında çalışıyoruz; bu yüzden aynı ekibe dil, hikâye ya da hareket üzerinden farklı kapılar açabiliyoruz.' },
    ],
    kunye: KUNYE_K,
    gorusme: ['Ekibin hedefi ve çözmek istediği somut durum', 'Katılımcı sayısı, rolleri ve dil tercihi', 'Tek seferlik mi, birkaç oturuma yayılan mı', 'Mekân: stüdyo ya da kurum içi', 'Etkinin nasıl izleneceği'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum', 'ece-ertez', 'burcu-halacoglu', 'koksal-unal'],
    faq: [
      { q: 'Katılımcıların oyunculuk deneyimi olması gerekiyor mu?', a: 'Hayır. Atölyeler oyunla başlar ve kimseyi seyirci önüne zorla çıkarmaz. Çekingen katılımcılar için katılımın en küçük biçimi de geçerli sayılır.' },
      { q: 'Atölyeler İngilizce yapılabiliyor mu?', a: 'Evet. İngilizce drama programlarımızı yürüten eğitmenlerle İngilizce atölye tasarlayabiliyoruz; özellikle İngilizce toplantılarda konuşmaktan çekinen ekipler için.' },
      { q: 'Fiyat ve süre nedir?', a: 'Fiyatı ve süreyi talebe göre iletiyoruz. Önce ekibinizin ihtiyacını dinliyor, çalışma biçimini ona göre öneriyoruz.' },
      { q: 'Sertifika veriyor musunuz?', a: 'Hayır. Bu bir sertifika programı değil; konservatuvar mezunu oyuncu ve eğitmenlerin yürüttüğü uygulamalı bir atölye.' },
          ],
    articleSlugs: ['kurumsal-drama-egitimi-nedir', 'dogaclama-is-hayatinda-ne-ise-yarar', 'ingilizce-konusmaktan-cekinen-ekipler', 'forum-tiyatro-nedir-augusto-boal', 'sahne-korkusu-nasil-yenilir'],
    links: [{ href: '/okullar', label: 'Okullar ve kolejler için' }, { href: '/en/corporate', label: 'Corporate workshops in English' }, { href: '/ekip', label: 'Ekip' }],
    enPath: '/en/corporate',
  },
  {
    audience: 'kurumsal', slug: 'ingilizce-drama-is-iletisimi', label: 'İngilizce iletişim',
    eyebrow: 'kurumsal · ingilizce',
    h1: 'Şirketler İçin İngilizce Drama: Konuşma Özgüveni Atölyesi',
    seoTitle: 'Kurumsal İngilizce Konuşma Atölyesi — Drama ile, İstanbul',
    seoDesc: 'İngilizce anlıyor ama toplantıda konuşamıyor musunuz? Ekipler için drama ve doğaçlamayla İngilizce konuşma özgüveni atölyesi. Gramer değil, canlı kullanım.',
    keywords: ['kurumsal ingilizce konuşma', 'business english speaking istanbul', 'şirket içi ingilizce eğitimi', 'ingilizce toplantı özgüven', 'ingilizce sunum eğitimi', 'ingilizce drama kurumsal'],
    quick: {
      q: 'İngilizce bilen ama toplantıda konuşamayan ekipler için ne yapılabilir?',
      a: 'Sorun çoğu zaman bilgi değil, canlı kullanım ve hata yapma kaygısı. Drama ve doğaçlama, dili bir görev içinde ve düşük riskli bir ortamda kullandırır; dikkat gramerden partnere kayar. Techne Lab bu yöntemi yetişkinler için English Drama Lab\'da uyguluyor ve şirket ekiplerine uyarlanmış atölyeler tasarlıyor.',
    },
    intro: 'Dil kursundan geçmiş, okuyan, yazan, anlayan ama toplantıda susan ekip. Bu tabloyu çoğu İK ekibi tanıyor. Daha fazla kelime bu sorunu çözmüyor; konuşmanın maliyetini düşürmek çözüyor.',
    sections: [
      { h: 'Mekanizma', body: 'Sınav doğruluğu ödüllendirir, toplantı akıcılığı. Drama sahnesinde kimse gramer denetlemez; görev, karşıdakine cevap vermektir. Yarım cümle ve bir jestle sahne yine de devam eder. Katılımcı bunu tekrar tekrar yaşayınca hatanın bir şeyi bitirmediğini öğrenir.' },
      { h: 'Atölyede neler çalışılır?', body: 'Isınma ve dil oyunları, status ve doğaçlama, kurumun kendi durumlarına uyarlanmış kısa sahneler: toplantıda söz almak, itiraz etmek, belirsiz bir soruya cevap vermek, sunum sonrası soru-cevap. Metin ezberi yok.' },
      { h: 'Kimler için?', body: 'Gündelik İngilizcesi yeten (yaklaşık B1 ve üzeri) ama canlı konuşmada çekinen çalışanlar. Seviye tespit sınavı yapmıyoruz; görüşmede ekibin durumunu dinliyoruz.' },
    ],
    kunye: set(KUNYE_K, 'Dil', 'İngilizce'),
    gorusme: ['Ekibin İngilizce kullandığı durumlar (toplantı, sunum, müşteri)', 'Seviye dağılımı', 'Uluslararası ekiple karma mı, yalnızca Türkiye ekibi mi', 'Oturum sayısı ve sıklık'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez'],
    faq: [
      { q: 'Bu bir İngilizce kursu mu?', a: 'Hayır. Sıfırdan dil öğretmiyoruz; var olan ama kullanılmayan İngilizceyi sahnede, canlı durumlarda çalıştırıyoruz.' },
      { q: 'Hangi seviye gerekir?', a: 'Gündelik konularda kendini ifade edebilen (yaklaşık B1 ve üzeri) katılımcılar için tasarlanıyor. Seviye sınavı yapmıyoruz.' },
      { q: 'Atölyeyi kim yürütür?', a: 'İngilizce drama programlarımızı yürüten, sahne ve set deneyimi olan eğitmenlerimiz. Eğitmen eşleştirmesi görüşmede netleşir.' },
    ],
    articleSlugs: ['ingilizce-konusmaktan-cekinen-ekipler', 'toplantida-ingilizce-konusamiyorum', 'ingilizce-anliyorum-ama-konusamiyorum', 'ingilizce-aksan-kaygisi', 'dogaclama-ile-ingilizce-nasil-calisilir'],
    links: [{ href: '/atolyeler/english-drama-lab', label: 'English Drama Lab (yetişkin, haftalık)' }, { href: '/yetiskinler-icin-ingilizce-drama-istanbul', label: 'Yetişkinler için İngilizce drama' }, { href: '/kaynaklar/ingilizce-tartisma-konulari', label: 'İngilizce tartışma konuları' }],
    enPath: '/en/corporate',
  },
  {
    audience: 'kurumsal', slug: 'dogaclama-atolyesi', label: 'Doğaçlama (improv)',
    eyebrow: 'kurumsal · doğaçlama',
    h1: 'Şirketler İçin Doğaçlama (Improv) Atölyesi',
    seoTitle: 'Kurumsal Doğaçlama (Improv) Atölyesi İstanbul',
    seoDesc: 'Şirketlere doğaçlama eğitimi: dinleme, "evet, ve" ilkesi, belirsizlikte karar ve ekip içi güven. Tiyatro eğitmenleriyle, Türkçe ya da İngilizce.',
    keywords: ['kurumsal doğaçlama', 'şirketlere doğaçlama eğitimi', 'improv eğitimi şirket', 'doğaçlama atölyesi kurumsal', 'evet ve ilkesi iş hayatı', 'improv for business istanbul'],
    quick: {
      q: 'Kurumsal doğaçlama atölyesi ne işe yarar?',
      a: 'Doğaçlama, önceden yazılmamış bir durumda dinleyip cevap verme pratiğidir. Temel ilkesi "evet, ve": partnerin önerisini kabul edip üzerine eklemek. Ekiplerde dinlemeyi, fikir geliştirmeyi ve belirsizlikte hızlı karar vermeyi çalıştırır.',
    },
    intro: 'Toplantılarda fikirler çoğu zaman ilk cümlede ölür: "Evet, ama…" Doğaçlama bu refleksi görünür kılıyor ve değiştirmeyi deneyerek öğretiyor.',
    sections: [
      { h: 'Ne çalışılır?', body: 'Dinleme ve kabul oyunları, "evet, ve" ile fikir geliştirme, status ve rol değişimi, hata karşısında toparlanma, ekip halinde hikâye kurma. Her oyunun sonunda kısa bir değerlendirme: bu, bizim toplantılarımızda neye denk geliyor?' },
      { h: 'Komedi gösterisi değil', body: 'Amaç komik olmak değil. Doğaçlamanın iş hayatına taşınan değeri, partnere dikkat etmek ve belirsizlikte kilitlenmemek. Seyirci önüne çıkma zorunluluğu yok.' },
    ],
    kunye: KUNYE_K,
    gorusme: ['Ekipte çözülmek istenen durum (fikir üretimi, toplantı dinamiği, liderlik)', 'Katılımcı sayısı ve kıdem karışımı', 'Dil tercihi', 'Atölyenin bir etkinlik mi, gelişim programının parçası mı olduğu'],
    egitmenler: ['ece-ertez', 'alara-lokum', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Doğaçlama atölyesi team building ile aynı şey mi?', a: 'Tek seferlik bir ekip etkinliği olarak da kurulabilir, bir gelişim programının parçası olarak da. Fark hedefte: eğlence mi, yoksa belirli bir beceri üzerinde çalışma mı.' },
      { q: 'Çekingen çalışanlar zorlanır mı?', a: 'Oyunlar küçük adımlarla başlar ve katılımın en küçük biçimi de geçerli sayılır. Kimseyi istemediği bir sahneye çıkarmıyoruz.' },
      { q: 'İngilizce yapılabilir mi?', a: 'Evet. Uluslararası ekipler ya da İngilizce pratiği isteyen ekipler için atölye İngilizce kurulabilir.' },
    ],
    articleSlugs: ['dogaclama-is-hayatinda-ne-ise-yarar', 'dogaclama-tiyatro-evet-ve-kurali', 'kurumsal-drama-egitimi-nedir', 'konusma-kulubu-mu-dogaclama-mi'],
    links: [{ href: '/kurumsal/ingilizce-drama-is-iletisimi', label: 'İngilizce iletişim atölyesi' }, { href: '/kaynaklar/sozluk', label: 'Tiyatro sözlüğü' }],
  },
  {
    audience: 'kurumsal', slug: 'sunum-ve-sahne-varligi', label: 'Sunum ve sahne varlığı',
    eyebrow: 'kurumsal · sunum',
    h1: 'Tiyatro Teknikleriyle Sunum ve Sahne Varlığı',
    seoTitle: 'Sunum Becerileri Eğitimi: Tiyatro Teknikleriyle Sahne Varlığı',
    seoDesc: 'Ses, nefes, beden ve dikkat: oyuncuların sahnede kullandığı tekniklerle sunum kaygısı ve sahne varlığı çalışması. Kurumlar için, İstanbul.',
    keywords: ['sunum becerileri eğitimi', 'sahne varlığı', 'sunum kaygısı', 'beden dili eğitimi tiyatro', 'topluluk önünde konuşma eğitimi', 'sahne korkusu kurumsal'],
    quick: {
      q: 'Tiyatro teknikleri sunuma nasıl yardımcı olur?',
      a: 'Oyuncular sesi nefesle desteklemeyi, bedeni yerleştirmeyi ve dikkati seyirciye vermeyi sistemli olarak çalışır. Sunum kaygısının önemli bir kısmı nefes, gerginlik ve dikkatin kişinin kendine dönmesiyle ilgilidir; bunlar çalışılabilir becerilerdir.',
    },
    intro: 'Slaytlar hazır, içerik sağlam. Sonra salon sessizleşiyor ve ses titriyor. Bu bir içerik sorunu değil; bedenin sahneye nasıl çıktığıyla ilgili.',
    sections: [
      { h: 'Ne çalışılır?', body: 'Nefes ve ses desteği, duruş ve ağırlık, mekânı kullanma, göz teması ve dinleyiciyle bağ, soru-cevapta anda kalma. Katılımcılar kendi sunumlarından kısa parçaları sahnede deneyip anında geri bildirim alır.' },
      { h: 'Neden oyuncu eğitmenler?', body: 'Bu teknikler oyunculuk eğitiminin temel taşları. Mevcudiyet ve beden farkındalığı üzerine çalışan, kamera önü deneyimi olan eğitmenlerimiz bu çalışmayı sahne pratiğinden getiriyor.' },
    ],
    kunye: KUNYE_K,
    gorusme: ['Sunumların türü (iç toplantı, müşteri, konferans, kamera)', 'Katılımcıların kendi sunum materyaliyle gelip gelmeyeceği', 'Dil', 'Grup büyüklüğü (bu çalışma küçük grupta daha verimli)'],
    egitmenler: ['burcu-halacoglu', 'selen-ucer', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Sahne korkusu tamamen geçer mi?', a: 'Amaç korkuyu yok etmek değil, onunla çalışabilmek. Nefes, beden ve dikkat çalışması heyecanı kullanılabilir bir enerjiye çevirmeye yardım eder.' },
      { q: 'Kamera önü sunumlar da çalışılır mı?', a: 'Online toplantı ve kayıtlı video sunumlar da görüşmede kapsama alınabilir; kamera önü deneyimi olan eğitmenlerimiz var.' },
      { q: 'Kendi sunumumuzla gelebilir miyiz?', a: 'Evet, en verimli çalışma katılımcının gerçek materyaliyle yapılır.' },
    ],
    articleSlugs: ['sahne-korkusu-nasil-yenilir', 'oyunculukta-ses-ve-nefes', 'kamera-onunde-oyunculuk', 'dogaclama-is-hayatinda-ne-ise-yarar'],
    links: [{ href: '/kaynaklar/ses-nefes', label: 'Ses ve nefes egzersizleri' }, { href: '/atolyeler/oyuncunun-mevcudiyeti', label: 'Oyuncunun Mevcudiyeti' }],
  },
  {
    audience: 'kurumsal', slug: 'sirket-tiyatro-toplulugu', label: 'Şirket tiyatro topluluğu',
    eyebrow: 'kurumsal · topluluk',
    h1: 'Şirket Tiyatro Topluluğu: Çalışanlarınızla Sahneye Bir Oyun Çıkarın',
    seoTitle: 'Şirket Tiyatro Kulübü Kurmak — Çalışanlarla Oyun Sahneleme',
    seoDesc: 'Çalışanlardan bir tiyatro topluluğu kurup seyirci önüne bir oyun çıkarmak: seçme, metin, prova ve gösteri. Bağımsız bir tiyatro topluluğuyla, İstanbul.',
    keywords: ['şirket tiyatro kulübü', 'kurumsal tiyatro topluluğu', 'çalışan tiyatro grubu', 'şirket içi tiyatro', 'kurumsal tiyatro oyunu'],
    quick: {
      q: 'Bir şirket kendi tiyatro topluluğunu nasıl kurar?',
      a: 'Gönüllü çalışanlarla bir grup oluşturulur, ortak bir metin seçilir ya da grubun kendi malzemesinden yazılır, düzenli provalarla bir gösteriye gidilir. Süreci bir yönetmen ve dramaturg yürütür; final, çalışanların aileleri ve iş arkadaşları önünde bir temsildir.',
    },
    intro: 'Bazı ekipler bir atölyeden fazlasını ister: aylarca birlikte çalışıp sahneye çıkmak. Bu, bizim her yıl kendi gruplarımızla yaptığımız şeyin kuruma taşınmış hali.',
    sections: [
      { h: 'Süreç nasıl işler?', body: 'Tanışma ve oyun dönemi; grubun sesini bulması. Metin aşaması: hazır bir oyun ya da grubun doğaçlamalarından yazılan özgün bir metin (devising). Prova dönemi: sahneleme, ritim, ensemble. Gösteri: teknik prova ve seyirci önünde temsil.' },
      { h: 'Neden bir tiyatro topluluğuyla?', body: 'Programlarımızın çoğu seyircili bir gösteriyle kapanıyor; yazmak, dramaturji ve sahneleme kendi işimiz. Kurumsal topluluk, bu üretim pratiğinin çalışanlar için yeniden kurulması.' },
    ],
    kunye: set(KUNYE_K, 'Deneyim şartı', 'Yok; gönüllülük esas'),
    gorusme: ['Gönüllü sayısı ve beklenen bağlılık', 'Metin: hazır oyun mu, özgün yazım mı', 'Gösteri tarihi ve mekânı', 'Prova saatlerinin mesaiyle ilişkisi'],
    egitmenler: ['halil-yagiz-sanal'],
    faq: [
      { q: 'Oyunculuk deneyimi olmayan çalışanlar katılabilir mi?', a: 'Evet. Grup sıfırdan kurulur; ilk dönem oyun ve temel sahne çalışmasıyla geçer.' },
      { q: 'Oyunu kim yazar?', a: 'Hazır bir oyun seçilebilir ya da grubun doğaçlamalarından özgün bir metin yazılabilir. Yazarlık ve dramaturji, kurucumuz Halil Yağız Şanal\'ın çalışma alanı.' },
      { q: 'Gösteri nerede yapılır?', a: 'Kurumun kendi salonu ya da kiralanacak bir sahne; görüşmede netleşir.' },
    ],
    articleSlugs: ['ensemble-tiyatro-nedir', 'devising-tiyatro-nedir', 'kurumsal-drama-egitimi-nedir'],
    links: [{ href: '/atolyeler/auteur-lab', label: 'The Auteur Lab (yazarlık ve dramaturji)' }, { href: '/oyunculuk-kursu-istanbul', label: 'Oyunculuk kursu İstanbul' }],
  },
  {
    audience: 'kurumsal', slug: 'ekip-etkinligi-muzikal-dans', label: 'Müzikal ve dans ekip etkinliği',
    eyebrow: 'kurumsal · ekip etkinliği',
    h1: 'Ekip Etkinliği: Müzikal ve Broadway Dans Atölyesi',
    seoTitle: 'Ekip Etkinliği İstanbul: Müzikal ve Broadway Dans Atölyesi',
    seoDesc: 'Paintball ve hazine avı yerine sahne: ekipler için müzikal ve Broadway dans atölyesi. Birlikte bir koreografi ve şarkı sahnesi kurmak. İstanbul.',
    keywords: ['ekip etkinliği istanbul', 'team building istanbul', 'şirket etkinliği atölye', 'dans atölyesi şirket', 'müzikal atölyesi kurumsal', 'takım etkinliği'],
    quick: {
      q: 'İstanbul\'da farklı bir ekip etkinliği ne olabilir?',
      a: 'Müzikal ve Broadway dans atölyesi, ekibin birlikte kısa bir koreografi ve şarkı sahnesi kurduğu bir etkinliktir. Dans geçmişi gerektirmez; hedef ortak ritim, birbirini izleme ve günün sonunda ekibin kendi küçük gösterisi.',
    },
    intro: 'Ekip etkinliği seçenekleri çoğunlukla açık hava ve oyun üzerine kurulu. Sahne bu listede yok. Oysa birlikte aynı sayımda hareket etmek, bir ekibin birbirini fark etmesinin en doğrudan yollarından biri.',
    sections: [
      { h: 'Nasıl geçer?', body: 'Isınma ve ritim, temel Broadway dans adımları, kısa bir koreografinin parça parça kurulması, bir müzikal şarkısıyla sahneye bağlanması ve son bölümde ekibin kendi küçük gösterisi.' },
      { h: 'Kimler yürütür?', body: 'Müzikal ve Broadway dans programlarımızı yürüten koreograf ve müzikal oyunculuk eğitmenlerimiz.' },
    ],
    kunye: set(KUNYE_K, 'Deneyim şartı', 'Yok; dans geçmişi gerekmez'),
    gorusme: ['Ekip büyüklüğü ve mekân (hareket alanı gerekir)', 'Şarkılı mı, yalnızca dans mı', 'Etkinliğin günün hangi bölümüne yerleşeceği', 'Fiziksel kısıtı olan katılımcılar için uyarlama'],
    egitmenler: ['koksal-unal', 'beril-korkmaz'],
    faq: [
      { q: 'Dans bilmeyenler katılabilir mi?', a: 'Evet. Adımlar temel seviyeden kurulur ve herkesin katılabileceği biçimde uyarlanır.' },
      { q: 'Şarkı söylemek zorunlu mu?', a: 'Hayır. Şarkılı bölüm ekip olarak yapılır; solo zorunluluğu yoktur. İstenirse yalnızca dans formatı kurulabilir.' },
      { q: 'Nerede yapılır?', a: 'Hareket alanı olan bir stüdyo ya da kurum içi uygun bir salon; görüşmede netleşir.' },
    ],
    articleSlugs: ['broadway-musical-dans-nedir', 'jazz-dance-nedir', 'muzikal-ensemble-oyuncusu-olmak-koronun-gorunmeyen-isi'],
    links: [{ href: '/atolyeler/broadway-musical-dance', label: 'Broadway Musical Dance' }, { href: '/muzikal-tiyatro-kursu-istanbul', label: 'Müzikal tiyatro kursu' }],
  },
  {
    audience: 'kurumsal', slug: 'hikaye-anlatimi-dramaturji', label: 'Hikâye anlatımı',
    eyebrow: 'kurumsal · hikâye',
    h1: 'Kurumsal Hikâye Anlatımı: Dramaturji ile Mesaj Kurmak',
    seoTitle: 'Kurumsal Hikâye Anlatımı Eğitimi — Dramaturji ile, İstanbul',
    seoDesc: 'Bir sunumu, bir vizyonu ya da bir marka mesajını oyun yazarlarının kullandığı dramaturji araçlarıyla kurmak: çatışma, karakter, yapı. Kurumlar için.',
    keywords: ['kurumsal hikaye anlatımı eğitimi', 'storytelling eğitimi', 'dramaturji kurumsal', 'sunumda hikaye anlatımı', 'iç iletişim hikaye'],
    quick: {
      q: 'Kurumsal hikâye anlatımında dramaturji ne işe yarar?',
      a: 'Dramaturji, bir hikâyenin neden işlediğini çözümleyen tiyatro disiplini. Kim ne istiyor, önünde ne var, hikâye nerede dönüyor gibi soruları kurumsal bir sunuma, vizyon anlatısına ya da marka mesajına uygulamak mesajı daha anlaşılır ve akılda kalır kılar.',
    },
    intro: '"Hikâye anlat" tavsiyesi her sunum eğitiminde var. Nasıl anlatılacağı çoğu zaman yok. Oyun yazarlarının ve dramaturgların araçları tam bu boşluğu dolduruyor.',
    sections: [
      { h: 'Ne çalışılır?', body: 'İstek ve engel, dönüm noktası, sahne ve ritim, karakter olarak müşteri ve çalışan. Katılımcılar kendi mesajlarını bu araçlarla yeniden kurar ve kısa okumalarla dener.' },
      { h: 'Kimler için?', body: 'İç iletişim ve marka ekipleri, ürün ve satış ekipleri, ekibine bir değişimi anlatması gereken yöneticiler.' },
    ],
    kunye: KUNYE_K,
    gorusme: ['Anlatılacak mesajın türü (vizyon, ürün, değişim, marka)', 'Yazılı mı, sözlü mü, ikisi birden mi', 'Katılımcıların hazır materyali'],
    egitmenler: ['halil-yagiz-sanal'],
    faq: [
      { q: 'Bu bir yazarlık atölyesi mi?', a: 'Kısmen. Yazma ve anlatma birlikte çalışılır; amaç edebi metin değil, kurumun mesajının işleyen bir yapıya kavuşması.' },
      { q: 'Dramaturji nedir?', a: 'Bir metnin ya da gösterinin yapısını, anlamını ve sahneyle ilişkisini çözümleyen tiyatro disiplini.' },
      { q: 'Kim yürütür?', a: 'Oyun yazarı ve yönetmen olan kurucumuz Halil Yağız Şanal\'ın yazarlık ve dramaturji çalışması temel alınır.' },
    ],
    articleSlugs: ['dramaturji-nedir', 'dramatik-yapi-nedir', 'sahne-nasil-yazilir-bir-sahnenin-anatomisi'],
    links: [{ href: '/oyun-yazarligi-kursu-istanbul', label: 'Oyun yazarlığı ve dramaturji' }, { href: '/atolyeler/auteur-lab', label: 'The Auteur Lab' }],
  },
  {
    audience: 'kurumsal', slug: 'forum-tiyatro', label: 'Forum tiyatro',
    eyebrow: 'kurumsal · forum tiyatro',
    h1: 'Kurumlar İçin Forum Tiyatro: Zor Konuşmaları Sahnede Prova Edin',
    seoTitle: 'Kurumsal Forum Tiyatro: Zor Konuşmaların Provası',
    seoDesc: 'Augusto Boal\'in forum tiyatrosuyla geri bildirim, çatışma ve zor konuşmaları sahnede prova etmek. Seyircinin sahneye girip sonucu değiştirdiği yöntem.',
    keywords: ['forum tiyatro kurumsal', 'forum tiyatro nedir', 'zor konuşmalar eğitimi', 'geri bildirim eğitimi tiyatro', 'çatışma yönetimi drama'],
    quick: {
      q: 'Forum tiyatro kurumlarda nasıl kullanılır?',
      a: 'Augusto Boal\'in geliştirdiği yöntemde bir çatışma sahnesi oynanır, sonra seyirci sahneye girip bir karakterin yerine geçerek farklı bir davranışı dener. Kurumlarda geri bildirim, çatışma ve zor konuşmaları güvenli bir ortamda prova etmek için kullanılır.',
    },
    intro: 'Zor bir konuşmayı kafada provaya almak kolay. Karşında biri cevap verirken denemek başka. Forum tiyatro bu ikincisini mümkün kılıyor.',
    sections: [
      { h: 'Nasıl işler?', body: 'Ekibin tanıdığı bir durum kısa bir sahneye dönüşür ve sorunlu haliyle oynanır. Sonra sahne yeniden başlar; katılımcılar durdurup sahneye girer ve başka bir yolu dener. Her deneme grubun önünde tartışılır.' },
      { h: 'Neden işe yarar?', body: 'Davranışı anlatmak yerine denemeye çağırır. Doğru cevap sunmaz; birden fazla yolu görünür kılar.' },
    ],
    kunye: KUNYE_K,
    gorusme: ['Çalışılacak durumlar (geri bildirim, ekip içi çatışma, müşteri)', 'Hassas konular ve sınırlar', 'Katılımcıların kıdem karışımı'],
    egitmenler: ['halil-yagiz-sanal'],
    faq: [
      { q: 'Forum tiyatro rol yapma (role play) ile aynı mı?', a: 'Benzer ama farklı. Forum tiyatroda sahneyi bütün grup izler ve herkes durdurup müdahale edebilir; tek bir doğru çözüm aranmaz.' },
      { q: 'Konular nasıl seçilir?', a: 'Görüşmede kurumun çalışmak istediği durumlar dinlenir; sahneler gerçek kişiler hedef alınmadan kurgulanır.' },
      { q: 'Yöntemin kaynağı nedir?', a: 'Brezilyalı tiyatro insanı Augusto Boal\'in Ezilenlerin Tiyatrosu çalışmaları.' },
    ],
    articleSlugs: ['forum-tiyatro-nedir-augusto-boal', 'kurumsal-drama-egitimi-nedir', 'intimacy-direction-nedir-sahnede-riza'],
    links: [{ href: '/kurumsal/dogaclama-atolyesi', label: 'Doğaçlama atölyesi' }],
  },

  // ═══════════════════════ OKULLAR HUB ═══════════════════════
  {
    audience: 'okullar', slug: '', label: 'Okullar ve kolejler',
    eyebrow: 'okullar · kolejler · istanbul',
    h1: 'Okullar ve Kolejler İçin Tiyatro, İngilizce Drama ve Müzikal',
    seoTitle: 'Okullar İçin Drama, İngilizce Drama ve Okul Müzikali İstanbul',
    seoDesc: 'Özel okullar, kolejler ve uluslararası okullar için İngilizce drama, okul müzikali, yıl sonu gösterisi ve tiyatro kulübü çalışmaları. İstanbul.',
    keywords: ['okullara drama eğitimi', 'okullar için tiyatro atölyesi', 'kolej tiyatro kulübü', 'okul müzikali', 'okul yıl sonu gösterisi', 'ingilizce drama okul', 'school drama workshop istanbul'],
    quick: {
      q: 'İstanbul\'da okullara drama ve müzikal çalışması kim yapıyor?',
      a: 'Techne Lab İstanbul, Pera ve Kadıköy\'de 8–17 yaş için İngilizce drama programı (English Drama Youth) ve 15 yaş üstü için müzikal programı yürüten bağımsız bir tiyatro topluluğu. Okul ve kolejlere İngilizce drama, okul müzikali, yıl sonu gösterisi ve tiyatro kulübü çalışmaları tasarlıyor.',
    },
    intro: 'Okulda tiyatro iki şeyi aynı anda ister: pedagojik sabır ve sahne disiplini. Biri olmadan gösteri çıkmıyor, diğeri olmadan çocuk sahneden soğuyor. Bizim işimiz ikisini birlikte kurmak.',
    sections: [
      { h: 'Ne yapıyoruz?', body: 'İngilizce drama çalışmaları (İngilizce zümresiyle birlikte), okul müzikali prodüksiyonu, yıl sonu gösterisi ve tiyatro kulübü eğitmenliği. Her biri okulun takvimine ve yaş grubuna göre kuruluyor.' },
      { h: 'Neden bir tiyatro topluluğu?', body: 'Kendi gençlik programımız seyircili, tamamen İngilizce bir yıl sonu gösterisiyle kapanıyor; metin, tasarım ve hareket çocukların üretiminden derleniyor. Okullara taşıdığımız şey bu üretim pratiği: çocuğun sesini kaybetmeden gerçek bir gösteriye ulaşmak. Eğitmenlerimiz konservatuvar mezunu; daha önce İstanbul Gelişim Üniversitesi\'nde bir atölye gerçekleştirdik.' },
      { h: 'Okulun kurallarına göre', body: 'Okula dışarıdan yapılan her çalışma okulun kendi prosedürüne, veli izinlerine ve görüntü kullanım kurallarına bağlı. Bu başlıkları ilk görüşmede birlikte netleştiriyoruz.' },
    ],
    kunye: KUNYE_O,
    gorusme: ['Yaş grubu ve öğrenci sayısı', 'Dil: Türkçe, İngilizce ya da iki dilli', 'Hedef: kulüp, gösteri, müzikal, zümre çalışması', 'Okulun akademik takvimi ve salon erişimi', 'Veli izinleri ve görüntü kullanımı'],
    egitmenler: ['alara-lokum', 'koksal-unal', 'beril-korkmaz', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Okullara İngilizce drama yapıyor musunuz?', a: 'Evet. 8–17 yaş için yürüttüğümüz English Drama Youth programının yöntemini okulun İngilizce zümresiyle birlikte okul ortamına uyarlıyoruz.' },
      { q: 'Okul müzikali hazırlıyor musunuz?', a: 'Müzikal ve Broadway dans programlarımızı yürüten eğitmenlerle okul müzikali prodüksiyonu tasarlıyoruz; kapsam görüşmede netleşir.' },
      { q: 'Fiyat nedir?', a: 'Fiyatı talebe göre iletiyoruz. Önce okulunuzun takvimini ve hedefini dinleyip öneri sunuyoruz.' },
      { q: 'Daha önce bir eğitim kurumunda çalıştınız mı?', a: 'İstanbul Gelişim Üniversitesi\'nde bir atölye gerçekleştirdik. Eğitmenlerimiz konservatuvar mezunu oyuncu ve eğitmenler.' },
      { q: 'Uluslararası okullarla İngilizce çalışıyor musunuz?', a: 'Evet; İngilizce drama programlarımız tamamen İngilizce yürüyor.' },
    ],
    articleSlugs: ['okul-muzikali-nasil-hazirlanir', 'okul-tiyatro-kulubu-yillik-plan', 'okulda-ingilizce-drama-nasil-calisir', 'ingilizce-drama-youth-yas-gruplari-neden-ayri', 'genclerde-yaratici-drama-okul-basarisina-etkisi'],
    links: [{ href: '/atolyeler/english-drama-youth', label: 'English Drama Youth (8–17)' }, { href: '/kurumsal', label: 'Kurumsal atölyeler' }, { href: '/en/schools', label: 'For international schools (EN)' }],
    enPath: '/en/schools',
  },
  {
    audience: 'okullar', slug: 'ingilizce-drama', label: 'İngilizce drama',
    eyebrow: 'okullar · ingilizce drama',
    h1: 'Okullar İçin İngilizce Drama Çalışmaları',
    seoTitle: 'Okullarda İngilizce Drama — Kolej ve Uluslararası Okullar',
    seoDesc: 'İngilizceyi bilen ama konuşmayan öğrenciler için okulda İngilizce drama: doğaçlama, sahne ve yıl sonu gösterisi. İngilizce zümresiyle birlikte, İstanbul.',
    keywords: ['ingilizce drama okul', 'okullarda ingilizce drama', 'kolej ingilizce drama', 'english drama school istanbul', 'ingilizce tiyatro okul', 'ingilizce zümre drama'],
    quick: {
      q: 'Okulda İngilizce drama nasıl çalışır?',
      a: 'Öğrenciler İngilizceyi bir sahne görevi içinde kullanır: doğaçlama, rol ve grup sahneleri. Dikkat gramerden partnere kayar, hata yapma maliyeti düşer. Techne Lab bu yöntemi 8–17 yaş için English Drama Youth programında uyguluyor; gruplar 8–14 ve 15–17 olarak ayrılıyor.',
    },
    intro: 'Sınıfta İngilizcesi iyi olan öğrenci, sahneye çağrıldığında susabiliyor. İngilizce drama bu boşluğa çalışıyor: bilinen dili canlı kullanıma çevirmek.',
    sections: [
      { h: 'Zümreyle birlikte', body: 'İngilizce öğretmenlerinin dönem hedefleri ve kelime alanlarıyla eşleşen sahneler kuruyoruz. Drama çalışması müfredatın yerine geçmiyor; dilin konuşulduğu alanı genişletiyor.' },
      { h: 'Yaş grupları neden ayrı?', body: 'Kendi programımızda 8–14 ve 15–17 yaşları ayrı çalışıyor; ergenliğin sosyal maliyeti küçük yaşlarla aynı odada farklı işliyor. Okulda da sınıf düzeyine göre ayrı tasarlıyoruz.' },
    ],
    kunye: set(KUNYE_O, 'Dil', 'İngilizce'),
    gorusme: ['Sınıf düzeyleri ve İngilizce seviye dağılımı', 'Zümrenin dönem hedefleri', 'Çalışmanın kulüp mü, okul saati içi mi, etkinlik mi olacağı', 'Gösteri isteniyor mu'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez'],
    faq: [
      { q: 'Hangi seviyedeki öğrenciler için uygun?', a: 'Kendi programımızda B1 ve üzerini öneriyoruz. Okulda seviye dağılımına göre sahne görevleri uyarlanır.' },
      { q: 'İngilizce öğretmeninin yerine mi geçer?', a: 'Hayır. Zümreyle birlikte, dilin konuşulduğu alanı genişleten tamamlayıcı bir çalışmadır.' },
      { q: 'Sonunda bir gösteri olur mu?', a: 'İstenirse. Kendi programımız Mayıs\'ta tamamen İngilizce bir gösteriyle kapanıyor; okulda da benzer bir final planlanabilir.' },
    ],
    articleSlugs: ['okulda-ingilizce-drama-nasil-calisir', 'ingilizce-yaratici-drama-yontemi', 'cocugum-ingilizce-biliyor-ama-konusmuyor', 'ingilizce-drama-youth-yas-gruplari-neden-ayri', 'genclerde-ingilizce-drama'],
    links: [{ href: '/atolyeler/english-drama-youth', label: 'English Drama Youth (8–17)' }, { href: '/cocuklar-icin-ingilizce-drama-istanbul', label: 'Çocuklar için İngilizce drama' }, { href: '/gencler-icin-ingilizce-drama-istanbul', label: 'Gençler için İngilizce drama' }],
    enPath: '/en/schools',
  },
  {
    audience: 'okullar', slug: 'okul-muzikali', label: 'Okul müzikali',
    eyebrow: 'okullar · müzikal',
    h1: 'Okul Müzikali Prodüksiyonu',
    seoTitle: 'Okul Müzikali Hazırlama — Koreografi, Şan ve Sahneleme',
    seoDesc: 'Okulunuzun müzikalini seçmeden gösteriye kurmak: repertuvar, seçmeler, koreografi, şan çalışması ve sahneleme. Kolejler ve uluslararası okullar için, İstanbul.',
    keywords: ['okul müzikali', 'okul müzikali hazırlama', 'school musical istanbul', 'okul müzikal koreografi', 'kolej müzikal', 'okul müzikal yönetmen'],
    quick: {
      q: 'Bir okul müzikali nasıl hazırlanır?',
      a: 'Repertuvar ve hak meselesi netleşir, seçmeler yapılır, solo ve ensemble rolleri dağıtılır, şan, koreografi ve sahne provaları paralel yürür, teknik prova ve gösteriyle kapanır. Müzikal oyunculuk, şan ve dansı birlikte çalışan bir ekip süreci tek elden yürütür.',
    },
    intro: 'Bir okul müzikali üç disiplini aynı anda ister ve çoğu zaman üç ayrı öğretmenin üç ayrı saatinde çalışılır. Sonuç sahnede dağınık görünür. Biz şarkıyı, hareketi ve sahneyi aynı odada kuruyoruz.',
    sections: [
      { h: 'Süreç', body: 'Repertuvar seçimi ve hakların kontrolü; seçmeler; rol dağılımı; şan ve ensemble çalışması; koreografi; sahneleme; teknik ve genel prova; gösteri. Takvim okulun dönemine göre geriye doğru planlanır.' },
      { h: 'Ensemble herkesindir', body: 'Okul müzikalinde öğrencilerin çoğu ensemble\'da yer alır. Ensemble\'ı figürasyon değil, sahnenin dünyasını kuran kadro olarak çalışıyoruz; her öğrencinin sahnede bir işi olur.' },
    ],
    kunye: KUNYE_O,
    gorusme: ['Hangi müzikal ya da özgün bir metin mi', 'Kadro büyüklüğü ve yaş aralığı', 'Gösteri tarihi ve salon', 'Okulun müzik öğretmeni ve orkestra/playback durumu', 'Kostüm, ışık, ses gibi teknik destek'],
    egitmenler: ['koksal-unal', 'beril-korkmaz'],
    faq: [
      { q: 'Hangi yaşlar için uygun?', a: 'İlkokuldan liseye kadar uyarlanabilir; repertuvar ve sahne talepleri yaşa göre seçilir.' },
      { q: 'Telif ve haklar nasıl çözülür?', a: 'Bilinen müzikallerin okul temsilleri için hak sahibinden lisans gerekebilir. Bu kontrol repertuvar seçiminin ilk adımıdır; görüşmede birlikte değerlendiriyoruz.' },
      { q: 'Okulun müzik öğretmeniyle nasıl çalışılır?', a: 'Müzik öğretmeniyle birlikte; şan ve sahne çalışması onun müzikal hazırlığıyla eşleştirilir.' },
    ],
    articleSlugs: ['okul-muzikali-nasil-hazirlanir', 'muzikal-ensemble-oyuncusu-olmak-koronun-gorunmeyen-isi', 'belting-nedir-muzikal-sesi-belt-mix-legit', 'muzikal-oyunculuk-nedir'],
    links: [{ href: '/muzikal-tiyatro-kursu-istanbul', label: 'Müzikal tiyatro kursu' }, { href: '/gencler-icin-muzikal-tiyatro-istanbul', label: 'Gençler için müzikal tiyatro' }, { href: '/kaynaklar/muzikal-secme-sarkilari', label: 'Müzikal seçme şarkıları' }],
    enPath: '/en/schools',
  },
  {
    audience: 'okullar', slug: 'yil-sonu-gosterisi', label: 'Yıl sonu gösterisi',
    eyebrow: 'okullar · gösteri',
    h1: 'Okul Yıl Sonu Gösterisi: Hazırlık ve Sahneleme',
    seoTitle: 'Okul Yıl Sonu Gösterisi Hazırlama — Tiyatro ve Sahneleme',
    seoDesc: 'Yıl sonu gösterisini son iki haftaya sıkıştırmadan kurmak: oyun seçimi, rol dağılımı, prova takvimi, sahneleme. Okullar ve kolejler için, İstanbul.',
    keywords: ['okul yıl sonu gösterisi', 'yıl sonu tiyatro oyunu okul', 'okul gösterisi hazırlama', 'okul tiyatro gösterisi yönetmen', 'okul oyunu sahneleme'],
    quick: {
      q: 'Okul yıl sonu gösterisi nasıl planlanır?',
      a: 'Gösteri tarihinden geriye doğru planlanır: oyun ya da metin seçimi, rol dağılımı, sahne sahne prova, birleştirme, teknik prova ve genel prova. Her öğrencinin sahnede anlamlı bir işi olması ve metnin yaş grubuna uygunluğu temel ölçüttür.',
    },
    intro: 'Yıl sonu gösterisi genellikle Mayıs\'ın son haftalarına sıkışır ve stresle hatırlanır. Erken başlayan, yaşa uygun kurulan bir gösteri ise öğrencinin yılın en güçlü deneyimi olabilir.',
    sections: [
      { h: 'Metin', body: 'Hazır bir oyun ya da öğrencilerin doğaçlamalarından derlenen özgün bir metin. Kendi gençlik programımızda gösteri malzemesi çocukların yıl boyunca ürettiği metin, tasarım ve hareketten derleniyor.' },
      { h: 'Takvim', body: 'Rol dağılımından sonra sahne sahne çalışma, sonra birleştirme. Teknik ve genel prova okul salonunun erişimine göre önceden takvime yazılır.' },
    ],
    kunye: KUNYE_O,
    gorusme: ['Gösteri tarihi ve salon', 'Sınıf ya da kadro büyüklüğü', 'Hazır oyun mu, özgün metin mi', 'Dil', 'Veli izinleri ve görüntü kullanımı'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum'],
    faq: [
      { q: 'Ne zaman başlamak gerekir?', a: 'Gösterinin büyüklüğüne göre değişir; erken başlamak provaları sıkıştırmamayı sağlar. Takvimi gösteri tarihinden geriye doğru birlikte kuruyoruz.' },
      { q: 'Kalabalık sınıflarda herkes sahneye çıkabilir mi?', a: 'Ensemble sahneleri ve grup koreografileriyle her öğrenciye bir sahne işi verilebilir.' },
      { q: 'İngilizce gösteri yapılabilir mi?', a: 'Evet; kendi English Drama Youth programımız tamamen İngilizce bir gösteriyle kapanıyor.' },
    ],
    articleSlugs: ['okul-tiyatro-kulubu-yillik-plan', 'okul-muzikali-nasil-hazirlanir', 'devising-tiyatro-nedir', 'ensemble-tiyatro-nedir'],
    links: [{ href: '/okullar/tiyatro-kulubu', label: 'Tiyatro kulübü' }, { href: '/okullar/okul-muzikali', label: 'Okul müzikali' }],
  },
  {
    audience: 'okullar', slug: 'tiyatro-kulubu', label: 'Tiyatro kulübü',
    eyebrow: 'okullar · kulüp',
    h1: 'Okul Tiyatro Kulübü Eğitmenliği',
    seoTitle: 'Okul Tiyatro Kulübü Eğitmeni — Kolejler İçin, İstanbul',
    seoDesc: 'Okul tiyatro ve drama kulübü için yıllık çalışma: oyun, doğaçlama, metin, sahneleme ve gösteri. Kulübü bir tiyatro topluluğu gibi çalıştırmak. İstanbul.',
    keywords: ['okul tiyatro kulübü', 'tiyatro kulübü eğitmeni', 'kolej tiyatro kulübü', 'drama kulübü okul', 'okul drama kulübü etkinlikleri'],
    quick: {
      q: 'Okul tiyatro kulübü nasıl yürütülür?',
      a: 'Yıl üç evrede kurulabilir: grup ve güven (oyun, doğaçlama), metin ve karakter (okuma, yazma, sahne çalışması) ve prova-gösteri. Kulübü bir tiyatro topluluğu gibi çalıştırmak, öğrencinin hem yaratıcı hem kolektif bir sorumluluk almasını sağlar.',
    },
    intro: 'Kulüp saati çoğu zaman yılın en esnek saati. Bu esneklik iyi kurulmazsa dağılır, iyi kurulursa öğrencinin okuldaki en özgür alanı olur.',
    sections: [
      { h: 'Yıllık akış', body: 'İlk evrede grup dinamiği ve oyun; ikinci evrede metin, karakter ve küçük sahneler; üçüncü evrede prova ve gösteri. Kendi gençlik programımızda kullandığımız evrelemenin okul takvimine uyarlanmış hali.' },
      { h: 'Konuk atölyeler', body: 'Kendi gençlik programımızda her ayın son haftası yaratıcı yazarlık, tasarım ya da dans gibi konuk atölyelere ayrılıyor. Okul kulübünde de benzer bir ritim planlanabilir.' },
    ],
    kunye: KUNYE_O,
    gorusme: ['Kulüp saati ve sıklığı', 'Öğrenci sayısı ve yaş aralığı', 'Yıl sonunda gösteri hedefi', 'Okulun sorumlu öğretmeniyle iş bölümü'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum'],
    faq: [
      { q: 'Kulüp için yıllık plan hazırlıyor musunuz?', a: 'Evet; okulun takvimine ve hedefine göre evrelenen bir yıllık akış öneriyoruz.' },
      { q: 'Kulüp İngilizce olabilir mi?', a: 'Evet; İngilizce tiyatro kulübü olarak da kurulabilir.' },
      { q: 'Okulun öğretmeni ne yapar?', a: 'Sorumlu öğretmenle iş bölümü görüşmede netleşir; okulun kendi prosedürleri esas alınır.' },
    ],
    articleSlugs: ['okul-tiyatro-kulubu-yillik-plan', 'yaratici-drama-asamalari', 'yaratici-drama-teknikleri', 'yaratici-dramada-rolde-lider'],
    links: [{ href: '/yaratici-drama-istanbul', label: 'Yaratıcı drama İstanbul' }, { href: '/okullar/yil-sonu-gosterisi', label: 'Yıl sonu gösterisi' }],
  },
  // ═══════════════════════ EN HUBS ═══════════════════════
  {
    audience: 'en/corporate', slug: '', label: 'Corporate',
    eyebrow: 'corporate · istanbul · in english',
    h1: 'Corporate Drama and Improv Workshops in Istanbul, in English',
    seoTitle: 'Corporate Drama & Improv Workshops in Istanbul (in English)',
    seoDesc: 'Drama, improv, presentation presence and musical team workshops for companies in Istanbul, run in English or Turkish by a working theatre company.',
    keywords: ['corporate drama training istanbul', 'improv workshop istanbul english', 'team building istanbul english', 'business english speaking workshop istanbul', 'presentation skills theatre istanbul'],
    quick: {
      q: 'Where can international teams in Istanbul do drama or improv workshops in English?',
      a: 'Techne Lab Istanbul is an independent theatre company working in Pera and Kadıköy. It designs corporate workshops in English or Turkish: improv, speaking confidence in English, presentation and stage presence, storytelling through dramaturgy, and musical or Broadway dance sessions for teams. No acting experience is needed.',
    },
    intro: 'Most training explains. Theatre makes you do it. Freezing in an English-language meeting, losing your voice in front of a room, ideas dying at "yes, but": these are not knowledge gaps, they are rehearsal gaps. We run that rehearsal in the studio, in a safe and playful frame.',
    sections: [
      { h: 'What we work on', body: 'Listening and "yes, and" improv; speaking English live, without the grammar police; voice, breath and presence for presentations; storytelling with the tools of playwrights and dramaturgs; and team sessions built on musical theatre and Broadway dance.' },
      { h: 'Who it is for', body: 'International and mixed-language teams, Turkish teams who work in English, L&D and HR teams, team leads, sales and client-facing teams. Participants do not need any theatre background.' },
      { h: 'Why a theatre company', body: 'We write, stage and perform. Our own programmes end with public performances. That practice is what we bring into the room: not a trainer pretending to be a director, but theatre makers adapting their work to your team.' },
    ],
    kunye: [
      { k: 'Language', v: 'English or Turkish' },
      { k: 'Location', v: 'Our studios in Pera and Kadıköy, or on site; agreed in the call' },
      { k: 'Group', v: 'We work in small groups; larger teams are split' },
      { k: 'Experience', v: 'None needed' },
      { k: 'Trainers', v: 'Conservatory-trained actors and trainers' },
      { k: 'Price and length', v: 'Shared on request, after the call' },
    ],
    gorusme: ['Your team\'s goal and the situations you want to work on', 'Group size, roles and language', 'One-off session or a series', 'Studio or on site', 'How you want to follow up the impact'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez', 'koksal-unal', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Are the workshops fully in English?', a: 'Yes, they can be. Our English drama programmes are run entirely in English by trainers who work in English at native level.' },
      { q: 'Do participants need acting experience?', a: 'No. Sessions start with games and nobody is pushed onto a stage. The smallest form of participation counts.' },
      { q: 'What does it cost and how long is it?', a: 'Price and length are shared on request. We first listen to your needs and propose a format.' },
    ],
    articleSlugs: ['team-building-istanbul-in-english-theatre-improv', 'english-speaking-theatre-istanbul', 'make-friends-istanbul-expat-drama'],
    links: [{ href: '/kurumsal', label: 'Kurumsal (Türkçe)' }, { href: '/en/schools', label: 'For schools' }, { href: '/en/english-drama-istanbul', label: 'English drama in Istanbul' }],
    enPath: '/kurumsal',
  },
  {
    audience: 'en/schools', slug: '', label: 'Schools',
    eyebrow: 'schools · istanbul · in english',
    h1: 'Drama, English Drama and School Musicals for Schools in Istanbul',
    seoTitle: 'School Drama & Musical Partner in Istanbul — In English',
    seoDesc: 'For international and private schools in Istanbul: English drama, school musical production, end-of-year shows and theatre club sessions, run by a theatre company.',
    keywords: ['school drama workshop istanbul', 'school musical istanbul', 'english drama for schools istanbul', 'international school drama istanbul', 'theatre club istanbul school'],
    quick: {
      q: 'Who works with schools in Istanbul on drama and musicals in English?',
      a: 'Techne Lab Istanbul is an independent theatre company in Pera and Kadıköy that runs English Drama Youth, an all-English drama programme for ages 8 to 17 with separate 8–14 and 15–17 groups and an end-of-year performance. It designs English drama, school musical, end-of-year show and theatre club work for schools.',
    },
    intro: 'Theatre at school needs two things at once: pedagogical patience and stage discipline. Without one, there is no show; without the other, children go off the stage. Our work is holding both.',
    sections: [
      { h: 'What we offer', body: 'English drama alongside your English department, school musical production (casting, vocal and ensemble work, choreography, staging), end-of-year shows and theatre club facilitation. Each is planned around your calendar and age groups.' },
      { h: 'Your school\'s rules first', body: 'Any external work at a school depends on the school\'s own procedures, parental consent and image-use rules. We settle these in the first call. Performance rights for known musicals are checked at the repertoire stage.' },
    ],
    kunye: [
      { k: 'Language', v: 'English, Turkish or bilingual' },
      { k: 'Location', v: 'Your school hall or our studios in Pera and Kadıköy' },
      { k: 'Ages', v: 'Primary to high school; groups split by age' },
      { k: 'Calendar', v: 'Planned around your academic year' },
      { k: 'Trainers', v: 'Conservatory-trained actors and trainers' },
      { k: 'Price and length', v: 'Shared on request, after the call' },
    ],
    gorusme: ['Ages and student numbers', 'Language', 'Goal: club, show, musical or department work', 'Academic calendar and hall access', 'Parental consent and image use'],
    egitmenler: ['alara-lokum', 'koksal-unal', 'beril-korkmaz', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Do you run drama fully in English?', a: 'Yes. English Drama Youth runs entirely in English; we recommend B1 and above and do not use a placement test.' },
      { q: 'Can you produce our school musical?', a: 'We design school musical productions with the trainers who run our musical theatre and Broadway dance programmes; scope is agreed in the call.' },
      { q: 'What does it cost?', a: 'Price is shared on request, after we understand your calendar and goals.' },
      { q: 'Have you worked with educational institutions before?', a: 'We have run a workshop at Istanbul Gelişim University. Our trainers are conservatory-trained actors and trainers.' },
    ],
    articleSlugs: ['choosing-a-drama-partner-for-your-school-istanbul', 'english-drama-for-kids-teens-istanbul-parents-guide', 'drama-classes-for-teens-istanbul-english', 'why-teenagers-freeze-speaking-english-istanbul'],
    links: [{ href: '/okullar', label: 'Okullar (Türkçe)' }, { href: '/en/drama-classes-for-kids-istanbul', label: 'English drama for kids and teens' }, { href: '/en/corporate', label: 'Corporate workshops' }],
    enPath: '/okullar',
  },
]

export function isEn(p: B2BPage) {
  return p.audience.startsWith('en/')
}
export function b2bHub(a: B2BAudience) {
  return B2B_PAGES.find((p) => p.audience === a && p.slug === '')!
}
export function b2bChildren(a: B2BAudience) {
  return B2B_PAGES.filter((p) => p.audience === a && p.slug !== '')
}
export function b2bPage(a: B2BAudience, slug: string) {
  return B2B_PAGES.find((p) => p.audience === a && p.slug === slug)
}
export function b2bPath(p: B2BPage) {
  return p.slug ? `/${p.audience}/${p.slug}` : `/${p.audience}`
}
