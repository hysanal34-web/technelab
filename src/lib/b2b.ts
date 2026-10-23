/**
 * Kurumsal ve okul/kolej SEO sayfaları.
 *
 * KAYNAK: docs/satis/Techne-Lab-Kurumsal-Programlar.pptx ve
 * Techne-Lab-Okul-ve-Kolej-Programlari.pptx (2026–27 katalogları). Modül adları,
 * format süreleri, grup büyüklükleri, ölçüm ve süreç adımları oradan; sitede
 * katalogla çelişen bilgi olmamalı. Katalog değişirse burası da değişir.
 *
 * GERÇEKLER (Yağız, 23 Ekim 2026): MEB onayı YOK (hiç anma). Sertifika programı
 * YOK (sitede "sertifika yok" diye de yazılmaz: göze batıyor). Eğitmenler
 * konservatuvar mezunu. Fiyat talebe göre iletilir, sitede yazılmaz. Şirket ya da
 * okulla henüz çalışılmadı; tek kurum deneyimi İstanbul Gelişim Üniversitesi'nde
 * yapılan atölye.
 * YASAK: başka referans/müşteri/okul adı, sertifika/MEB onayı iddiası, kaynaksız
 * rakam, "ders" kelimesi.
 */
export type B2BAudience = 'kurumsal' | 'okullar' | 'en/corporate' | 'en/schools'

type Img = { src: string; alt: string }
type Modul = { ad: string; dil: string; body: string; href?: string }
type Format = { sure: string; ad: string; kisi: string; body: string }
type Adim = { ad: string; body: string }
type Kaynakli = { text: string; kaynak: string; url?: string }

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
  hero?: Img
  sections: { h: string; body: string }[]
  moduller?: { grup: string; items: Modul[] }[]
  formatlar?: Format[]
  /** Bir oturumun akışı (dakika damgalı). */
  akis?: { t: string; ad: string; body: string }[]
  olcum?: { zaman: string; ad: string; body: string }[]
  ornekYillar?: { baslik: string; kademe: string; adimlar: { donem: string; body: string }[] }[]
  guvence?: Adim[]
  /** Görüşmeden teklife adımlar. */
  surec?: Adim[]
  surecNotu?: string
  /** Araştırma notları — yalnızca yayımlanmış çalışmalar. */
  arastirma?: Kaynakli[]
  arastirmaNotu?: string
  kunye: { k: string; v: string }[]
  gorusme: string[]
  /** ekip.ts slug'ları. */
  egitmenler: string[]
  gallery?: Img[]
  faq: { q: string; a: string }[]
  articleSlugs: string[]
  links: { href: string; label: string }[]
  enPath?: string
}

export const B2B_PAKET_NOTU: Record<B2BAudience, string> = {
  kurumsal:
    'İlk adım 30 dakikalık bir ihtiyaç analizi: hedef davranışta ve başarı ölçütünde anlaşalım. Teklif, kapsam netleştikten sonra tek sayfa olarak iki iş gününde iletilir. Tedarikçi evrakı, sözleşme ve e-fatura süreci hazır.',
  okullar:
    'İlk adım zümrenizle ya da bir sınıfla 60 dakikalık bir tanışma seansı: yöntemi öğretmenleriniz denesin, planı birlikte kuralım. Teklif, kapsam netleştikten sonra tek sayfa olarak okula iletilir.',
  'en/corporate':
    'The first step is a 30-minute needs call: we agree on the target behaviour and how success will be measured. A one-page proposal follows within two working days once the scope is clear. Supplier documents, contract and e-invoicing are ready.',
  'en/schools':
    'The first step is a 60-minute introductory session with your department or one class: your teachers try the method and we plan together. A one-page proposal follows once the scope is clear.',
}

// ─── Ortak bloklar (kataloglardan) ─────────────────────────────────────

const K_MODULLER: { grup: string; items: Modul[] }[] = [
  { grup: 'İletişim', items: [
    { ad: 'Etkili Konuşma ve Sunum', dil: 'TR · EN', body: 'Söz almak, notsuz sunum.', href: '/kurumsal/sunum-ve-sahne-varligi' },
    { ad: 'Diksiyon ve Hitabet', dil: 'TR · EN', body: 'Nefes, ses, artikülasyon.', href: '/kurumsal/diksiyon-ve-hitabet' },
    { ad: 'Oyunculukla Mevcudiyet', dil: 'TR · EN', body: 'Duruş, status, kamera önü.', href: '/kurumsal/sunum-ve-sahne-varligi' },
  ] },
  { grup: 'Ekip ve yaratıcılık', items: [
    { ad: 'Doğaçlama', dil: 'TR · EN', body: 'Plan değişince uyum.', href: '/kurumsal/dogaclama-atolyesi' },
    { ad: 'Yaratıcı Drama', dil: 'TR · EN', body: 'Rol değişimi, zor konuşma provası.', href: '/kurumsal/forum-tiyatro' },
    { ad: 'Yazarlık ve Hikâye', dil: 'TR · EN', body: 'Mesajı hikâyeye çevirmek.', href: '/kurumsal/hikaye-anlatimi-dramaturji' },
  ] },
  { grup: 'Enerji ve iyi oluş', items: [
    { ad: 'Jazz Dance', dil: 'Dil bağımsız', body: 'Ekip enerjisi, ritim.', href: '/kurumsal/ekip-etkinligi-muzikal-dans' },
    { ad: 'Hareket ve Beden', dil: 'Dil bağımsız', body: 'Duruş, nefes, stres.', href: '/kurumsal/ekip-etkinligi-muzikal-dans' },
    { ad: 'Müzikal', dil: 'TR · EN', body: 'Şarkı, dans ve sahne.', href: '/kurumsal/ekip-etkinligi-muzikal-dans' },
  ] },
  { grup: 'Sahne', items: [
    { ad: 'Yıl Sonu Şirket Oyunu', dil: 'TR · EN', body: 'Çalışanlarla bir oyun.', href: '/kurumsal/sirket-tiyatro-toplulugu' },
    { ad: 'Karma program', dil: 'TR · EN', body: 'Modüller birleşir. İngilizce grupta B1 ve üzeri.', href: '/kurumsal/ingilizce-drama-is-iletisimi' },
  ] },
]

const K_FORMATLAR: Format[] = [
  { sure: '90 dk', ad: 'Etkinlik oturumu', kisi: '20–60 kişi', body: 'Kick-off, offsite, kutlama. Jazz Dance, Doğaçlama, Hareket ve Beden.' },
  { sure: '3 saat', ad: 'Sahne Provası', kisi: '8–16 kişi', body: 'Her modülde deneme atölyesi. Ekip yöntemi kendi iş durumlarıyla dener; 60 gün içinde programa geçilirse programın ilk oturumu sayılır.' },
  { sure: '6 saat', ad: 'Tam gün yoğun', kisi: '8–16 kişi', body: 'Etkili Konuşma, Diksiyon ve Ses, Oyunculukla Mevcudiyet.' },
  { sure: '6 × 2 saat', ad: '6 oturumluk program', kisi: '8–14 kişi', body: 'Haftada bir, davranış değişimi için. 30. gün takip buluşması ve ölçüm raporu dahil.' },
  { sure: '10 × 2 saat', ad: 'Çalışan kulübü', kisi: 'Mesai sonrası', body: 'Jazz Dance, Müzikal, Doğaçlama, Yazarlık.' },
  { sure: 'Prova + gösteri', ad: 'Yıl sonu şirket oyunu', kisi: '10–20 kişi', body: 'Gönüllü katılım. Takvimi şirketle birlikte kuruyoruz.' },
]

const K_AKIS = [
  { t: '0:00', ad: 'Isınma', body: 'Beden, ses, grup ritmi.' },
  { t: '0:20', ad: 'Teknik', body: 'O günün tek becerisi.' },
  { t: '0:45', ad: 'Doğaçlama', body: 'Gerçek iş durumları.' },
  { t: '1:20', ad: 'Prova', body: 'Herkes kendi iş anını prova eder, geri bildirim alır.' },
  { t: '1:50', ad: 'Kapanış', body: 'Bu hafta deneyeceği tek davranış.' },
]

const K_OLCUM = [
  { zaman: '0. gün', ad: 'Anket', body: 'Üç madde, 1–7: "şimdi" ve "önce" aynı anda puanlanır.' },
  { zaman: '30. gün', ad: 'Tekrar', body: 'Aynı üç madde ve bir gerçek kullanım örneği.' },
  { zaman: '60. gün', ad: 'Yönetici gözlemi', body: 'Yönetici ya da ekip arkadaşı iki maddeyi puanlar.' },
  { zaman: 'İmzadan önce', ad: 'İş göstergesi', body: 'Birlikte seçilir: örneğin toplantıda sunum yapan kişi sayısı.' },
]

const K_SUREC: Adim[] = [
  { ad: 'İhtiyaç analizi', body: 'Otuz dakika. Hedef davranış ve başarı ölçütü.' },
  { ad: 'Kapsam', body: 'Format, grup büyüklüğü, dil ve takvim.' },
  { ad: 'Teklif', body: 'Kapsama göre hazırlanıp iki iş gününde iletilir.' },
  { ad: 'Deneme', body: 'Sahne Provası ile başlanır.' },
  { ad: 'Program', body: 'Ölçüm raporu ve takip buluşmasıyla kapanır.' },
]

const K_ARASTIRMA: Kaynakli[] = [
  { text: 'Kısa bir doğaçlama çalışması, belirsizlik toleransını kontrol gruplarına göre artırdı.', kaynak: 'Felsman, Gunawardena ve Seifert, Thinking Skills and Creativity, 2020' },
  { text: 'Bir Finlandiya kurumunda beş aya yayılan doğaçlama atölyeleri, on beş ay sonra da izlenen bir değişim üretti.', kaynak: 'Nisula ve Kianto, Industry and Innovation, 2018' },
]

const K_KUNYE = [
  { k: 'Dil', v: 'Türkçe ya da İngilizce (İngilizce grupta B1 ve üzeri, seviye sınavı yok)' },
  { k: 'Yer', v: 'Pera ve Kadıköy stüdyoları ya da kurum içi' },
  { k: 'Grup', v: 'Atölyelerde 8–16 kişi; etkinlik oturumunda 20–60 kişi' },
  { k: 'Eğitmenler', v: 'Konservatuvar mezunu oyuncu ve eğitmenler' },
  { k: 'Katılım', v: 'Gönüllü; sahneye çıkma zorunluluğu yok. Yöneticiler ve ekip ayrı gruplanabilir' },
  { k: 'Fiyat', v: 'Talebe göre; tek sayfa teklif iki iş gününde' },
]

const O_MODULLER: { grup: string; items: Modul[] }[] = [
  { grup: 'Sahne', items: [
    { ad: 'Tiyatro ve Drama', dil: 'TR · EN', body: 'Oyun, doğaçlama ve sahne; ifade ve özgüven.', href: '/okullar/tiyatro-kulubu' },
    { ad: 'İngilizce Drama', dil: 'EN', body: 'İngilizceyi sahnede, gerçek bir amaçla kullanmak.', href: '/okullar/ingilizce-drama' },
    { ad: 'Müzikal ve Jazz Dans', dil: 'TR · EN', body: 'Şarkı, jazz dans ve sahne bir arada.', href: '/okullar/okul-muzikali' },
    { ad: 'Beden ve Hareket', dil: 'Dil bağımsız', body: 'Fiziksel tiyatro, ritim, beden farkındalığı.', href: '/okullar/tiyatro-kulubu' },
    { ad: 'Yıl Sonu Oyun Çıkarma', dil: 'TR · EN', body: 'Metinden gösteriye bir oyunu sahneye taşımak.', href: '/okullar/yil-sonu-gosterisi' },
  ] },
  { grup: 'Konuşma ve öğretmen', items: [
    { ad: 'Diksiyon ve Hitabet', dil: 'TR', body: 'Nefes, ses, artikülasyon ve topluluk önünde konuşma.', href: '/okullar/diksiyon-ve-hitabet' },
    { ad: 'Öğretmenlere Yaratıcı Drama', dil: 'TR · EN', body: 'Sınıfta kullanılacak drama teknikleri, branşa göre.', href: '/okullar/ogretmenlere-yaratici-drama' },
    { ad: 'Karma', dil: 'TR · EN', body: 'Kendi yılınızı kurun: modüller dönem dönem birleşir.' },
  ] },
]

const O_FORMATLAR: Format[] = [
  { sure: '60 dk', ad: 'Tanışma seansı', kisi: 'Zümre ya da bir sınıf', body: 'Yöntemi görün, planı birlikte kuralım.' },
  { sure: 'Aynı gün 3 sınıf', ad: 'Atölye günü', kisi: '80 dakikalık seanslar', body: 'Bir modülü bütün kademeye tanıtmak için.' },
  { sure: '6 hafta × 80 dk', ad: 'Sınıf içi ünite', kisi: 'Öğretmenle birlikte', body: 'İngilizce ya da Türkçe saatlerinin içinde.' },
  { sure: '14 hafta', ad: 'Dönemlik program', kisi: 'Kulüp ya da okul sonrası', body: 'Dönem sonunda sınıf içi gösterim.' },
  { sure: '28 hafta + gösteri', ad: 'Yıllık program', kisi: 'Ekim–Mayıs', body: 'Yıl sonu gösterisiyle kapanır. 2027–28 için planlanır.' },
  { sure: '2 eğitmen + gösteri', ad: 'Yıl sonu prodüksiyonu', kisi: 'En fazla 25 öğrenci', body: 'Metin, prova, kostüm, genel prova ve gösteri.' },
]

const O_ORNEK_YILLAR = [
  { baslik: 'İngilizce drama yılı', kademe: 'Ortaokul · lise · EN', adimlar: [
    { donem: 'Ekim–Aralık', body: 'İngilizce drama: oyun, doğaçlama.' },
    { donem: 'Ocak–Mart', body: 'Karakter ve metin çalışması.' },
    { donem: 'Nisan–Mayıs', body: 'Prova ve İngilizce gösteri.' },
  ] },
  { baslik: 'Müzikal yılı', kademe: 'Ortaokul · lise · TR ya da EN', adimlar: [
    { donem: 'Ekim–Aralık', body: 'Şan ve jazz dans temelleri.' },
    { donem: 'Ocak–Mart', body: 'Sahneleme ve koreografi.' },
    { donem: 'Nisan–Mayıs', body: 'Müzikal gösteri.' },
  ] },
  { baslik: 'Sahne sanatları turu', kademe: 'İlkokul · ortaokul · TR', adimlar: [
    { donem: '1. dönem', body: 'Tiyatro ve drama.' },
    { donem: '2. dönem', body: 'Beden ve hareket.' },
    { donem: 'Mayıs', body: 'Sınıf içi gösterim.' },
  ] },
]

const O_GUVENCE: Adim[] = [
  { ad: 'Okul personeli her seansta', body: 'Eğitmen öğrencilerle hiçbir zaman yalnız kalmaz.' },
  { ad: 'Belgeler', body: 'Eğitmen diploması, özgeçmişi ve adli sicil kaydı görüşmede paylaşılır.' },
  { ad: 'Çocuk koruma ve KVKK', body: 'Fotoğraf ve video yalnız okulun ve velinin onayıyla.' },
  { ad: 'İçerik onayı', body: 'Metin ve gösteri içeriği okulla birlikte onaylanır.' },
  { ad: 'Rol paylaşımı', body: 'Programın sahibi zümre; biz uzman eğitmen ve ortak yönetmeniz.' },
  { ad: 'Sözleşme ve fatura', body: 'Hizmet alımı sözleşmesi, e-fatura, iptal ve telafi koşulları.' },
]

const O_SUREC: Adim[] = [
  { ad: 'Tanışma seansı', body: 'Altmış dakika, zümreyle ya da bir sınıfla.' },
  { ad: 'Kapsam', body: 'Kademe, modül, dil ve takvim birlikte seçilir.' },
  { ad: 'Teklif', body: 'Kapsama göre hazırlanıp okula iletilir.' },
  { ad: 'Pilot', body: 'Atölye günü ya da sınıf içi ünite.' },
  { ad: 'Yıllık plan', body: 'Yıl sonu gösterisiyle kapanan program.' },
]

const A_RELC: Kaynakli = { text: 'Altı haftalık yaratıcı drama çalışması, yabancı dil kaygısını anlamlı biçimde azalttı.', kaynak: 'Sağlamel ve Kayaoğlu, RELC Journal, 2013' }
const A_TESOL: Kaynakli = { text: 'Dört aylık drama programı, iletişimsel yönteme göre daha büyük akıcılık kazanımı sağladı.', kaynak: 'Galante ve Thomson, TESOL Quarterly, 2017' }
const A_EEF: Kaynakli = { text: 'Sanat katılımı programları ortalama üç ay ek ilerlemeyle ilişkili.', kaynak: 'Education Endowment Foundation, Teaching and Learning Toolkit', url: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/arts-participation' }
const A_LEE: Kaynakli = { text: 'Drama temelli öğretimin etkisi, uygulamayı sınıf öğretmeni yürüttüğünde daha güçlü bulundu.', kaynak: 'Lee, Patall, Cawthon ve Steingut, Review of Educational Research, 2015' }

const O_KUNYE = [
  { k: 'Dil', v: 'Türkçe ya da İngilizce' },
  { k: 'Kademe', v: 'İlkokuldan liseye ve öğretmenlere' },
  { k: 'Yer', v: 'Okulun kendi salonu ya da sınıfı' },
  { k: 'Eğitmenler', v: 'Konservatuvar mezunu oyuncu ve eğitmenler; özgeçmiş ve belgeler görüşmede' },
  { k: 'Takvim', v: 'Aralık başı karar: Şubat ünitesi. Mart: 2027–28 yıllık programı' },
  { k: 'Fiyat', v: 'Talebe göre; kapsama göre tek sayfa teklif' },
]

const set = (arr: { k: string; v: string }[], k: string, v: string) => arr.map((x) => (x.k === k ? { k, v } : x))
const pick = <T extends { ad: string }>(arr: T[], names: string[]) => arr.filter((x) => names.includes(x.ad))

const G = {
  kSahne: { src: '/images/b2b/kurumsal-atolye-sahne.jpg', alt: 'Yetişkin katılımcılar sahnede eğitmenle karşılıklı çalışıyor' },
  kGrup: { src: '/images/b2b/kurumsal-grup-calismasi.jpg', alt: 'Stüdyoda yarım daire olmuş bir grup, ortada bir katılımcı yürüyor' },
  kEnsemble: { src: '/images/b2b/kurumsal-ensemble.jpg', alt: 'Ahşap zeminli stüdyoda çember halinde ensemble çalışması' },
  kStudyo: { src: '/images/b2b/kurumsal-studyo.jpg', alt: 'Pera stüdyosunda yere oturmuş katılımcılarla grup çalışması' },
  oAtolye: { src: '/images/b2b/okul-drama-atolyesi.jpg', alt: 'Stüdyoda gençlerle drama atölyesi' },
  oIngilizce: { src: '/images/b2b/okul-ingilizce-drama.jpg', alt: 'Eğitmen ve öğrenci İngilizce drama oyununda top atıyor' },
  oEgitmen: { src: '/images/b2b/okul-egitmen.jpg', alt: 'Gülümseyen eğitmen atölye sırasında' },
  oSahne: { src: '/images/b2b/okul-sahne-oyunu.jpg', alt: 'Öğrenci stüdyoda bir sahne oyununda' },
  oGenc: { src: '/images/b2b/okul-genc-katilimci.jpg', alt: 'Genç katılımcı atölyede dinliyor' },
}

export const B2B_PAGES: B2BPage[] = [
  // ═══════════════════════ KURUMSAL HUB ═══════════════════════
  {
    audience: 'kurumsal', slug: '', label: 'Kurumsal',
    eyebrow: 'kurumsal programlar · 2026–27',
    h1: 'Ekibiniz Sahnede: Kurumsal Tiyatro, Doğaçlama ve Konuşma Atölyeleri',
    seoTitle: 'Kurumsal Eğitim İstanbul: Drama, Doğaçlama, Sunum, Diksiyon',
    seoDesc: 'İletişim, ekip ve iyi oluş için tiyatro, doğaçlama, diksiyon, dans ve yazarlık atölyeleri. On modül, altı format, Türkçe ve İngilizce. İstanbul.',
    keywords: ['kurumsal eğitim istanbul', 'kurumsal drama eğitimi', 'kurumsal doğaçlama', 'kurumsal diksiyon eğitimi', 'sunum eğitimi kurumsal', 'team building istanbul', 'ekip etkinliği istanbul', 'kurumsal tiyatro eğitimi'],
    quick: {
      q: 'İstanbul\'da kurumsal drama, doğaçlama ve konuşma eğitimi nereden alınır?',
      a: 'Techne Lab İstanbul, Pera ve Kadıköy\'de oyunculuk ve İngilizce drama programları yürüten profesyonel bir tiyatro ekibi. Şirketlere on modül (etkili konuşma ve sunum, diksiyon ve hitabet, oyunculukla mevcudiyet, doğaçlama, yaratıcı drama, yazarlık ve hikâye, jazz dance, hareket ve beden, müzikal, yıl sonu şirket oyunu) ve 90 dakikalık oturumdan altı oturumluk programa altı format sunuyor; Türkçe ya da İngilizce.',
    },
    intro: 'Global toplantıda sessiz kalan uzman. Plan değişince dağılan ekip. Ekrana bağlı, yorgun bir ofis. Üç ihtiyaç, tek yöntem: tiyatro. Slayt değil, prova.',
    hero: G.kSahne,
    sections: [
      { h: 'Üç ihtiyaç', body: 'İletişim: söz almayan uzmanlar; global toplantıda sessiz kalıyor, beklenmedik soruda kilitleniyor, sunumu okuyor. Ekip ve yaratıcılık: plan değişince dağılan ekip; fikirler reddediliyor, roller kapanıyor, belirsizlikte herkes geri çekiliyor. Enerji ve iyi oluş: beden yok, ritim yok; birlikte bir şey üretmenin keyfi unutuluyor.' },
      { h: 'Sahne araçları, iş davranışları', body: 'Beden ve mevcudiyet ile toplantıda söz almak: duruş, nefes, göz teması. Ses ve nefes ile baskı altında net konuşmak: sesi zorlamadan taşımak, hızlanmadan cevap vermek. Doğaçlama ile plan değişince hızlı uyum: fikri reddetmeden geliştirmek. Metin ve hikâye ile mesajı ikna edici kurmak: veriyi hikâyeye çevirmek, kısa sunumu notsuz anlatmak. Neden işe yarıyor: tekrar, beden ve anında geri bildirim.' },
      { h: 'Tiyatro ekibi, iş dili', body: 'Pera ve Kadıköy\'deki stüdyolarımızda oyunculuk ve İngilizce drama programları yürütüyoruz. Yetişkin katılımcılarımızın çoğu beyaz yakalı çalışanlar. Kurumsal programlar aynı yöntem ve aynı eğitmen kadrosuyla yürür.' },
    ],
    moduller: K_MODULLER,
    formatlar: K_FORMATLAR,
    akis: K_AKIS,
    olcum: K_OLCUM,
    surec: K_SUREC,
    surecNotu: 'Sahne Provası, 60 gün içinde programa geçilirse programın ilk oturumu sayılır.',
    arastirma: K_ARASTIRMA,
    arastirmaNotu: 'Kanıt tabanı genç; bu yüzden her programı ölçüyoruz.',
    kunye: K_KUNYE,
    gorusme: ['Hedef davranış ve başarı ölçütü', 'Format, grup büyüklüğü, dil ve takvim', 'Yöneticiler ve ekip aynı grupta mı', 'Stüdyo mu, kurum içi mi', 'İmzadan önce seçilecek iş göstergesi'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum', 'ece-ertez', 'yesim-celebi', 'burcu-halacoglu', 'koksal-unal', 'beril-korkmaz', 'selen-ucer'],
    gallery: [G.kGrup, G.kEnsemble, G.kStudyo],
    faq: [
      { q: 'Katılımcıların oyunculuk deneyimi olması gerekiyor mu?', a: 'Hayır. Katılım gönüllü, kimse utandırılmaz ve sahneye çıkma zorunluluğu yok. Yöneticiler ve ekip ayrı gruplanabilir.' },
      { q: 'Hangi formatlar var?', a: '90 dakikalık etkinlik oturumu (20–60 kişi), 3 saatlik Sahne Provası, 6 saatlik tam gün, 6 × 2 saatlik program, 10 × 2 saatlik çalışan kulübü ve yıl sonu şirket oyunu.' },
      { q: 'Etki nasıl ölçülüyor?', a: 'Programlarda 0. günde üç maddelik "şimdi ve önce" anketi, 30. günde tekrar ve gerçek kullanım örneği, 60. günde yönetici gözlemi yapılır; imzadan önce bir iş göstergesi birlikte seçilir.' },
      { q: 'Atölyeler İngilizce yapılabilir mi?', a: 'Evet, tüm modüller Türkçe ya da İngilizce. İngilizce grupta B1 ve üzeri öneriyoruz; seviye sınavı yok.' },
      { q: 'Fiyat nasıl belirleniyor?', a: 'Talebe göre. Kapsam netleştikten sonra tek sayfa teklif iki iş gününde iletilir.' },
    ],
    articleSlugs: ['kurumsal-drama-egitimi-nedir', 'dogaclama-is-hayatinda-ne-ise-yarar', 'ingilizce-konusmaktan-cekinen-ekipler', 'sahne-korkusu-nasil-yenilir', 'oyunculukta-ses-ve-nefes'],
    links: [{ href: '/okullar', label: 'Okullar ve kolejler için' }, { href: '/en/corporate', label: 'Corporate workshops in English' }, { href: '/ekip', label: 'Ekip' }],
    enPath: '/en/corporate',
  },
  // ─────────────────────── kurumsal alt sayfalar ───────────────────────
  {
    audience: 'kurumsal', slug: 'ingilizce-drama-is-iletisimi', label: 'İngilizce seçeneği',
    eyebrow: 'kurumsal · ingilizce',
    h1: 'Şirketler İçin İngilizce: Dil Kursunun Bittiği Yerde Başlar',
    seoTitle: 'Kurumsal İngilizce Konuşma Atölyesi — Drama ile, İstanbul',
    seoDesc: 'B2\'ye ulaşmış ama global toplantıda söz almayan çalışanlar için: dil eğitimi değil, kullanım pratiği. Drama ve doğaçlamayla, B1 ve üzeri, seviye sınavı yok.',
    keywords: ['kurumsal ingilizce konuşma', 'business english speaking istanbul', 'şirket içi ingilizce eğitimi', 'ingilizce toplantı özgüven', 'ingilizce sunum eğitimi', 'ingilizce drama kurumsal'],
    quick: {
      q: 'İngilizce bilen ama toplantıda konuşamayan çalışanlar için ne yapılabilir?',
      a: 'Dil eğitimi değil, kullanım pratiği gerekir: mevcut İngilizceyi toplantıda kullanılır hâle getirmek. Techne Lab\'ın İngilizce seçeneği global toplantıda söz almayı, müşteriyle sohbeti sürdürmeyi ve beklenmedik soruya cevap vermeyi drama ve doğaçlamayla çalışır. Dil kursunun rakibi değil, tamamlayıcısı; B1 ve üzeri, seviye sınavı yok.',
    },
    intro: 'B2\'ye ulaşmış ama HQ toplantısında söz almayan çalışan. Daha fazla kelime bu sorunu çözmüyor; konuşmanın maliyetini düşürmek çözüyor.',
    hero: G.kStudyo,
    sections: [
      { h: 'Mekanizma', body: 'Sınav doğruluğu ödüllendirir, toplantı akıcılığı. Drama sahnesinde kimse gramer denetlemez; görev, karşıdakine cevap vermektir. Yarım cümle ve bir jestle sahne yine de devam eder. Katılımcı bunu tekrar tekrar yaşayınca hatanın bir şeyi bitirmediğini öğrenir.' },
      { h: 'Ne çalışılır?', body: 'Global toplantıda söz almak, itiraz etmek, müşteriyle sohbeti sürdürmek, beklenmedik soruya cevap vermek, sunum sonrası soru-cevap. Tüm modüller İngilizce yürütülebilir; etkili konuşma, doğaçlama ve oyunculukla mevcudiyet en sık birleşen üçlü.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Sahne Provası', '6 oturumluk program', 'Tam gün yoğun']),
    akis: K_AKIS,
    kunye: set(K_KUNYE, 'Dil', 'İngilizce; B1 ve üzeri, seviye sınavı yok'),
    gorusme: ['Ekibin İngilizce kullandığı durumlar (toplantı, sunum, müşteri)', 'Seviye dağılımı', 'Uluslararası ekiple karma mı, yalnızca Türkiye ekibi mi', 'Hangi format'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez'],
    faq: [
      { q: 'Bu bir İngilizce kursu mu?', a: 'Hayır. Dil eğitimi değil, kullanım pratiği: mevcut İngilizceyi toplantıda kullanılır hâle getirir. Dil kursunun rakibi değil, tamamlayıcısı.' },
      { q: 'Hangi seviye gerekir?', a: 'B1 ve üzeri. Seviye sınavı yapmıyoruz.' },
      { q: 'Atölyeyi kim yürütür?', a: 'İngilizce drama programlarımızı yürüten, konservatuvar mezunu ve anadil seviyesinde İngilizceyle çalışan eğitmenlerimiz.' },
    ],
    articleSlugs: ['ingilizce-konusmaktan-cekinen-ekipler', 'toplantida-ingilizce-konusamiyorum', 'ingilizce-anliyorum-ama-konusamiyorum', 'ingilizce-aksan-kaygisi', 'dogaclama-ile-ingilizce-nasil-calisilir'],
    links: [{ href: '/atolyeler/english-drama-lab', label: 'English Drama Lab (yetişkin, haftalık)' }, { href: '/yetiskinler-icin-ingilizce-drama-istanbul', label: 'Yetişkinler için İngilizce drama' }, { href: '/kaynaklar/ingilizce-tartisma-konulari', label: 'İngilizce tartışma konuları' }],
    enPath: '/en/corporate',
  },
  {
    audience: 'kurumsal', slug: 'sunum-ve-sahne-varligi', label: 'Etkili konuşma ve sunum',
    eyebrow: 'kurumsal · konuşma',
    h1: 'Etkili Konuşma ve Sunum: Oyunculukla Mevcudiyet',
    seoTitle: 'Etkili Konuşma ve Sunum Eğitimi — Tiyatro Teknikleriyle',
    seoDesc: 'Söz almak, notsuz sunum, duruş ve status, kamera önü. Oyuncuların sahnede kullandığı tekniklerle kurumlar için etkili konuşma ve sunum atölyesi. İstanbul.',
    keywords: ['etkili konuşma eğitimi', 'sunum becerileri eğitimi', 'kurumsal sunum eğitimi', 'topluluk önünde konuşma eğitimi', 'beden dili eğitimi tiyatro', 'sahne varlığı'],
    quick: {
      q: 'Tiyatro teknikleri sunuma nasıl yardımcı olur?',
      a: 'Oyuncular duruşu, nefesi, göz temasını ve dikkati seyirciye vermeyi sistemli olarak çalışır. Etkili Konuşma ve Sunum modülü söz almayı ve notsuz sunumu, Oyunculukla Mevcudiyet modülü duruş, status ve kamera önünü çalışır. Hedef, ilk 10 dakikada söz alma alışkanlığı ve baskı altında net konuşmak.',
    },
    intro: 'Slaytlar hazır, içerik sağlam. Sonra salon sessizleşiyor ve ses titriyor. Bu bir içerik sorunu değil; bedenin sahneye nasıl çıktığıyla ilgili.',
    hero: G.kSahne,
    sections: [
      { h: 'Ne çalışılır?', body: 'Duruş, nefes ve göz teması. İlk 10 dakikada söz alma alışkanlığı. Sesi zorlamadan taşımak; hızlanmadan, kısılmadan cevap vermek. Veriyi hikâyeye çevirmek ve kısa sunumu notsuz anlatmak. Status ve kamera önü çalışması.' },
      { h: 'Nasıl çalışılır?', body: 'Her oturumda o günün tek becerisi çalışılır, sonra herkes kendi iş anını prova eder ve geri bildirim alır. Katılımcı oturumdan bu hafta deneyeceği tek davranışla çıkar.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Sahne Provası', 'Tam gün yoğun', '6 oturumluk program']),
    akis: K_AKIS,
    olcum: K_OLCUM,
    kunye: K_KUNYE,
    gorusme: ['Sunumların türü (iç toplantı, müşteri, konferans, kamera)', 'Katılımcıların kendi sunum materyali', 'Dil', 'Format'],
    egitmenler: ['burcu-halacoglu', 'selen-ucer', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Sahne korkusu tamamen geçer mi?', a: 'Amaç korkuyu yok etmek değil, onunla çalışabilmek. Nefes, beden ve dikkat çalışması heyecanı kullanılabilir bir enerjiye çevirmeye yardım eder.' },
      { q: 'Kamera önü sunumlar da çalışılır mı?', a: 'Evet; Oyunculukla Mevcudiyet modülü kamera önünü de kapsar.' },
      { q: 'Kendi sunumumuzla gelebilir miyiz?', a: 'Evet, prova bölümünde herkes kendi gerçek iş anını çalışır.' },
    ],
    articleSlugs: ['sahne-korkusu-nasil-yenilir', 'oyunculukta-ses-ve-nefes', 'kamera-onunde-oyunculuk', 'dogaclama-is-hayatinda-ne-ise-yarar'],
    links: [{ href: '/kurumsal/diksiyon-ve-hitabet', label: 'Diksiyon ve hitabet' }, { href: '/kaynaklar/ses-nefes', label: 'Ses ve nefes egzersizleri' }, { href: '/atolyeler/oyuncunun-mevcudiyeti', label: 'Oyuncunun Mevcudiyeti' }],
  },
  {
    audience: 'kurumsal', slug: 'diksiyon-ve-hitabet', label: 'Diksiyon ve hitabet',
    eyebrow: 'kurumsal · diksiyon',
    h1: 'Kurumsal Diksiyon ve Hitabet: Nefesten Topluluk Önünde Konuşmaya',
    seoTitle: 'Kurumsal Diksiyon ve Hitabet Eğitimi İstanbul',
    seoDesc: 'Nefes teknikleri, ses, diksiyon ve kastetme: doğru Türkçe, net telaffuz ve anlamı sesle taşımak. Şirketler için diksiyon ve hitabet atölyesi, İstanbul.',
    keywords: ['kurumsal diksiyon eğitimi', 'diksiyon eğitimi istanbul', 'hitabet eğitimi', 'diksiyon kursu şirket', 'ses ve nefes eğitimi', 'etkili konuşma diksiyon'],
    quick: {
      q: 'Kurumsal diksiyon eğitiminde ne çalışılır?',
      a: 'Dört başlık: nefes (diyafram ve nefes kullanımı), ses (sesin oluşumu ve kendi enstrümanını tanımak), diksiyon (artikülasyon ve fonetik, doğru Türkçe, net telaffuz) ve kastetme (duygu, anlam ve ses koordinasyonu). Amaç doğru telaffuzu beden hafızasına yerleştirmek; teknik çalışma sahnede pekişir.',
    },
    intro: 'Diksiyon kuralları bir kitapta yazar. Toplantı odasında işe yarayan ise beden hafızasına yerleşmiş olanıdır.',
    hero: G.kEnsemble,
    sections: [
      { h: 'Nefes teknikleri', body: 'Diyafram ve nefes kullanımı. Alexander tekniği, yoga ve şan çalışmalarından gelen nefes hattı.' },
      { h: 'Ses teknikleri', body: 'Kendi enstrümanını tanımak: sesin oluşumu ve kullanımı; Linklater ve Grotowski hattında çalışma.' },
      { h: 'Diksiyon', body: 'Anlaşılır konuşma: artikülasyon ve fonetik, doğru Türkçe, net telaffuz.' },
      { h: 'Kastetme', body: 'Anlamı sesle taşımak: duygu, anlam ve ses koordinasyonu. Sunum, dinleme ve dinlettirme.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Sahne Provası', 'Tam gün yoğun', '6 oturumluk program']),
    kunye: K_KUNYE,
    gorusme: ['Katılımcıların konuşma durumları (sunum, telefon, toplantı, sahne)', 'Grup büyüklüğü', 'Format'],
    egitmenler: ['burcu-halacoglu', 'beril-korkmaz', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Diksiyon atölyesi kaç oturum sürer?', a: 'Formata göre: 3 saatlik Sahne Provası, 6 saatlik tam gün ya da 6 × 2 saatlik program. Kalıcı değişim için 6 oturumluk programı öneriyoruz.' },
      { q: 'İngilizce yapılabilir mi?', a: 'Modül Türkçe ya da İngilizce yürütülebilir; Türkçede doğru telaffuz ve fonetik, İngilizcede anlaşılır ve akıcı konuşma odağı öne çıkar.' },
      { q: 'Hangi teknikler kullanılıyor?', a: 'Alexander tekniği, yoga ve şandan gelen nefes çalışması; Linklater ve Grotowski hattında ses çalışması; artikülasyon ve fonetik.' },
    ],
    articleSlugs: ['oyunculukta-ses-ve-nefes', 'sahne-korkusu-nasil-yenilir', 'grotowski-yoksul-tiyatro'],
    links: [{ href: '/kaynaklar/ses-nefes', label: 'Ses ve nefes egzersizleri' }, { href: '/kurumsal/sunum-ve-sahne-varligi', label: 'Etkili konuşma ve sunum' }, { href: '/okullar/diksiyon-ve-hitabet', label: 'Okullar için diksiyon' }],
  },
  {
    audience: 'kurumsal', slug: 'dogaclama-atolyesi', label: 'Doğaçlama',
    eyebrow: 'kurumsal · doğaçlama',
    h1: 'Şirketler İçin Doğaçlama: Plan Değişince Hızlı Uyum',
    seoTitle: 'Kurumsal Doğaçlama (Improv) Atölyesi İstanbul',
    seoDesc: 'Fikri reddetmeden geliştirmek, beklenmedik soruya net cevap, belirsizlikte karar. Şirketler için doğaçlama atölyesi; Türkçe ya da İngilizce, İstanbul.',
    keywords: ['kurumsal doğaçlama', 'şirketlere doğaçlama eğitimi', 'improv eğitimi şirket', 'doğaçlama atölyesi kurumsal', 'evet ve ilkesi iş hayatı', 'improv for business istanbul'],
    quick: {
      q: 'Kurumsal doğaçlama atölyesi ne işe yarar?',
      a: 'Doğaçlama, önceden yazılmamış bir durumda dinleyip cevap verme pratiğidir. Kurumsal atölyede hedef plan değişince hızlı uyum: fikri reddetmeden geliştirmek ve beklenmedik soruya net cevap vermek. Kısa bir doğaçlama çalışmasının belirsizlik toleransını kontrol gruplarına göre artırdığını gösteren bir çalışma var (Felsman ve ark., 2020).',
    },
    intro: 'Toplantılarda fikirler çoğu zaman ilk cümlede ölür: "Evet, ama…" Doğaçlama bu refleksi görünür kılıyor ve değiştirmeyi deneyerek öğretiyor.',
    hero: G.kGrup,
    sections: [
      { h: 'Ne çalışılır?', body: 'Dinleme ve kabul oyunları, "evet, ve" ile fikir geliştirme, status ve rol değişimi, hata karşısında toparlanma. Doğaçlama bölümünde gerçek iş durumları sahneye konur.' },
      { h: 'Komedi gösterisi değil', body: 'Amaç komik olmak değil. Doğaçlamanın iş hayatına taşınan değeri partnere dikkat etmek ve belirsizlikte kilitlenmemek. Sahneye çıkma zorunluluğu yok.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Etkinlik oturumu', 'Sahne Provası', '6 oturumluk program', 'Çalışan kulübü']),
    akis: K_AKIS,
    arastirma: K_ARASTIRMA,
    arastirmaNotu: 'Kanıt tabanı genç; bu yüzden her programı ölçüyoruz.',
    kunye: K_KUNYE,
    gorusme: ['Ekipte çözülmek istenen durum (fikir üretimi, toplantı dinamiği, liderlik)', 'Katılımcı sayısı ve kıdem karışımı', 'Dil', 'Etkinlik mi, program mı'],
    egitmenler: ['ece-ertez', 'alara-lokum', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Doğaçlama atölyesi team building ile aynı şey mi?', a: '90 dakikalık bir etkinlik oturumu olarak da kurulabilir (20–60 kişi), 6 oturumluk bir programın parçası olarak da. Fark hedefte: enerji mi, belirli bir davranış mı.' },
      { q: 'Çekingen çalışanlar zorlanır mı?', a: 'Katılım gönüllü, kimse utandırılmaz. Yöneticiler ve ekip ayrı gruplanabilir.' },
      { q: 'İngilizce yapılabilir mi?', a: 'Evet. İngilizce grupta B1 ve üzeri öneriyoruz.' },
    ],
    articleSlugs: ['dogaclama-is-hayatinda-ne-ise-yarar', 'dogaclama-tiyatro-evet-ve-kurali', 'kurumsal-drama-egitimi-nedir', 'konusma-kulubu-mu-dogaclama-mi'],
    links: [{ href: '/kurumsal/ingilizce-drama-is-iletisimi', label: 'İngilizce seçeneği' }, { href: '/kurumsal/forum-tiyatro', label: 'Yaratıcı drama ve zor konuşma provası' }],
  },
  {
    audience: 'kurumsal', slug: 'forum-tiyatro', label: 'Yaratıcı drama',
    eyebrow: 'kurumsal · yaratıcı drama',
    h1: 'Kurumsal Yaratıcı Drama: Rol Değişimi ve Zor Konuşma Provası',
    seoTitle: 'Kurumsal Yaratıcı Drama ve Forum Tiyatro: Zor Konuşmalar',
    seoDesc: 'Rol değişimi, forum tiyatro ve zor konuşma provası: geri bildirim, çatışma ve müşteri görüşmelerini sahnede denemek. Kurumlar için, Türkçe ya da İngilizce.',
    keywords: ['kurumsal yaratıcı drama', 'forum tiyatro kurumsal', 'zor konuşmalar eğitimi', 'geri bildirim eğitimi tiyatro', 'rol değişimi drama', 'çatışma yönetimi drama'],
    quick: {
      q: 'Kurumsal yaratıcı drama nasıl çalışır?',
      a: 'Ekibin tanıdığı bir iş durumu kısa bir sahneye dönüşür. Katılımcılar rol değiştirir; forum tiyatro yönteminde sahne durdurulur ve biri karakterin yerine geçip başka bir davranışı dener. Geri bildirim, çatışma ve zor konuşmalar güvenli bir ortamda prova edilir.',
    },
    intro: 'Zor bir konuşmayı kafada provaya almak kolay. Karşında biri cevap verirken denemek başka. Yaratıcı drama bu ikincisini mümkün kılıyor.',
    hero: G.kSahne,
    sections: [
      { h: 'Rol değişimi', body: 'Yönetici çalışanı, satışçı müşteriyi oynar. Karşı tarafın gözünden bakmak, cümlenin nasıl karşılandığını bedenle hissettirir.' },
      { h: 'Forum tiyatro', body: 'Augusto Boal\'in yöntemi: sahne sorunlu haliyle oynanır, sonra durdurulur; katılımcılar sahneye girip başka bir yolu dener. Doğru cevap sunmaz, birden fazla yolu görünür kılar.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Sahne Provası', '6 oturumluk program']),
    akis: K_AKIS,
    kunye: K_KUNYE,
    gorusme: ['Çalışılacak durumlar (geri bildirim, ekip içi çatışma, müşteri)', 'Hassas konular ve sınırlar', 'Kıdem karışımı'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum'],
    faq: [
      { q: 'Rol yapma (role play) ile farkı ne?', a: 'Sahneyi bütün grup izler ve herkes durdurup müdahale edebilir; tek bir doğru çözüm aranmaz. Rol değişimi de katılımcıya karşı tarafın deneyimini yaşatır.' },
      { q: 'Konular nasıl seçilir?', a: 'İhtiyaç analizinde kurumun çalışmak istediği durumlar dinlenir; sahneler gerçek kişiler hedef alınmadan kurgulanır.' },
      { q: 'Yöneticiler ve çalışanlar aynı grupta mı olur?', a: 'Tercih kurumun. Yöneticiler ve ekip ayrı gruplanabilir.' },
    ],
    articleSlugs: ['forum-tiyatro-nedir-augusto-boal', 'kurumsal-drama-egitimi-nedir', 'yaratici-drama-nedir'],
    links: [{ href: '/kurumsal/dogaclama-atolyesi', label: 'Doğaçlama' }],
  },
  {
    audience: 'kurumsal', slug: 'hikaye-anlatimi-dramaturji', label: 'Yazarlık ve hikâye',
    eyebrow: 'kurumsal · yazarlık',
    h1: 'Yazarlık ve Hikâye: Mesajı İkna Edici Kurmak',
    seoTitle: 'Kurumsal Hikâye Anlatımı Eğitimi — Dramaturji ile, İstanbul',
    seoDesc: 'Veriyi hikâyeye çevirmek, kısa sunumu notsuz anlatmak: oyun yazarlarının ve dramaturgların araçlarıyla kurumlar için yazarlık ve hikâye atölyesi.',
    keywords: ['kurumsal hikaye anlatımı eğitimi', 'storytelling eğitimi', 'dramaturji kurumsal', 'sunumda hikaye anlatımı', 'iş yazarlığı atölyesi'],
    quick: {
      q: 'Kurumsal hikâye anlatımında dramaturji ne işe yarar?',
      a: 'Dramaturji, bir hikâyenin neden işlediğini çözümleyen tiyatro disiplini. Kim ne istiyor, önünde ne var, hikâye nerede dönüyor gibi soruları bir sunuma, vizyon anlatısına ya da marka mesajına uygulamak veriyi hikâyeye çevirir ve kısa bir sunumu notsuz anlatılabilir kılar.',
    },
    intro: '"Hikâye anlat" tavsiyesi her sunum eğitiminde var. Nasıl anlatılacağı çoğu zaman yok. Oyun yazarlarının araçları tam bu boşluğu dolduruyor.',
    hero: G.kStudyo,
    sections: [
      { h: 'Ne çalışılır?', body: 'İstek ve engel, dönüm noktası, sahne ve ritim, karakter olarak müşteri ve çalışan. Katılımcılar kendi mesajlarını bu araçlarla yeniden kurar ve kısa okumalarla dener.' },
      { h: 'Çalışan kulübü olarak', body: 'Yazarlık, mesai sonrası 10 × 2 saatlik çalışan kulübü formatında da kurulabilir.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Sahne Provası', '6 oturumluk program', 'Çalışan kulübü']),
    kunye: K_KUNYE,
    gorusme: ['Anlatılacak mesajın türü (vizyon, ürün, değişim, marka)', 'Yazılı mı, sözlü mü', 'Katılımcıların hazır materyali'],
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
    audience: 'kurumsal', slug: 'ekip-etkinligi-muzikal-dans', label: 'Jazz dance, hareket, müzikal',
    eyebrow: 'kurumsal · enerji ve iyi oluş',
    h1: 'Ekip Etkinliği: Jazz Dance, Hareket ve Müzikal',
    seoTitle: 'Ekip Etkinliği İstanbul: Jazz Dance, Hareket ve Müzikal',
    seoDesc: 'Kick-off, offsite ya da kutlama için 90 dakikalık jazz dance, hareket ve müzikal oturumları; 20–60 kişi. Mesai sonrası çalışan kulübü seçeneğiyle. İstanbul.',
    keywords: ['ekip etkinliği istanbul', 'team building istanbul', 'şirket etkinliği atölye', 'kurumsal dans atölyesi', 'jazz dance şirket', 'müzikal atölyesi kurumsal', 'çalışan kulübü'],
    quick: {
      q: 'İstanbul\'da farklı bir ekip etkinliği ne olabilir?',
      a: 'Jazz dance, hareket ve beden ya da müzikal üzerine 90 dakikalık bir etkinlik oturumu: kick-off, offsite ya da kutlama için, 20–60 kişiyle, dil bağımsız. Ekip birlikte kısa bir koreografi ya da şarkı sahnesi kurar. Mesai sonrası 10 × 2 saatlik çalışan kulübü olarak da sürdürülebilir.',
    },
    intro: 'Ekrana bağlı, yorgun bir ofis. Beden yok, ritim yok. Birlikte aynı sayımda hareket etmek, bir ekibin birbirini fark etmesinin en doğrudan yollarından biri.',
    hero: G.kGrup,
    sections: [
      { h: 'Jazz Dance', body: 'Ekip enerjisi ve ritim. Dans geçmişi gerekmez; adımlar temelden kurulur.' },
      { h: 'Hareket ve Beden', body: 'Duruş, nefes, stres. Masa başında kaybolan bedenin yeniden fark edilmesi.' },
      { h: 'Müzikal', body: 'Şarkı, dans ve sahne bir arada. Solo zorunluluğu yok; şarkı ekip olarak söylenir.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Etkinlik oturumu', 'Çalışan kulübü']),
    kunye: set(K_KUNYE, 'Dil', 'Dil bağımsız (jazz dance, hareket); müzikal Türkçe ya da İngilizce'),
    gorusme: ['Kişi sayısı ve mekân (hareket alanı gerekir)', 'Etkinliğin günün hangi bölümüne yerleşeceği', 'Şarkılı mı, yalnızca dans mı', 'Fiziksel kısıtı olan katılımcılar için uyarlama'],
    egitmenler: ['koksal-unal', 'beril-korkmaz'],
    gallery: [G.kEnsemble, G.kStudyo],
    faq: [
      { q: 'Dans bilmeyenler katılabilir mi?', a: 'Evet. Adımlar temel seviyeden kurulur ve herkesin katılabileceği biçimde uyarlanır.' },
      { q: 'Kaç kişiyle yapılabilir?', a: 'Etkinlik oturumu 90 dakika ve 20–60 kişi. Çalışan kulübü mesai sonrası, 10 × 2 saat.' },
      { q: 'Şarkı söylemek zorunlu mu?', a: 'Hayır. Şarkılı bölüm ekip olarak yapılır; istenirse yalnızca dans formatı kurulur.' },
    ],
    articleSlugs: ['jazz-dance-nedir', 'broadway-musical-dans-nedir', 'muzikal-ensemble-oyuncusu-olmak-koronun-gorunmeyen-isi'],
    links: [{ href: '/atolyeler/broadway-musical-dance', label: 'Broadway Musical Dance' }, { href: '/muzikal-tiyatro-kursu-istanbul', label: 'Müzikal tiyatro kursu' }],
  },
  {
    audience: 'kurumsal', slug: 'sirket-tiyatro-toplulugu', label: 'Yıl sonu şirket oyunu',
    eyebrow: 'kurumsal · sahne',
    h1: 'Yıl Sonu Şirket Oyunu: Çalışanlarınızla Sahneye Bir Oyun',
    seoTitle: 'Şirket Tiyatro Kulübü ve Yıl Sonu Şirket Oyunu İstanbul',
    seoDesc: 'Gönüllü çalışanlardan 10–20 kişilik bir oyun ekibi: metin, prova ve seyircili gösteri. Takvimi şirketle birlikte kuruyoruz. Bağımsız bir tiyatro ekibiyle.',
    keywords: ['şirket tiyatro kulübü', 'yıl sonu şirket oyunu', 'kurumsal tiyatro topluluğu', 'çalışan tiyatro grubu', 'şirket içi tiyatro'],
    quick: {
      q: 'Bir şirket kendi oyununu nasıl sahneler?',
      a: 'Gönüllü 10–20 çalışanla bir oyun ekibi kurulur. Hazır bir metin seçilir ya da grubun doğaçlamalarından özgün bir metin yazılır; mesai sonrası provalarla seyircili bir gösteriye gidilir. Takvim şirketle birlikte kurulur; süreci bir yönetmen ve dramaturg yürütür.',
    },
    intro: 'Bazı ekipler bir atölyeden fazlasını ister: aylarca birlikte çalışıp sahneye çıkmak. Bu, bizim her yıl kendi gruplarımızla yaptığımız şeyin kuruma taşınmış hali.',
    hero: G.kSahne,
    sections: [
      { h: 'Süreç', body: 'Tanışma ve oyun dönemi; metin aşaması (hazır oyun ya da devising ile özgün metin); prova dönemi; teknik prova ve seyirci önünde temsil.' },
      { h: 'Neden bir tiyatro ekibiyle?', body: 'Programlarımızın çoğu seyircili bir gösteriyle kapanıyor; yazmak, dramaturji ve sahneleme kendi işimiz.' },
    ],
    formatlar: pick(K_FORMATLAR, ['Yıl sonu şirket oyunu', 'Çalışan kulübü']),
    kunye: set(K_KUNYE, 'Grup', '10–20 gönüllü çalışan'),
    gorusme: ['Gönüllü sayısı ve bağlılık', 'Hazır oyun mu, özgün metin mi', 'Gösteri tarihi ve mekânı', 'Prova saatleri'],
    egitmenler: ['halil-yagiz-sanal'],
    faq: [
      { q: 'Oyunculuk deneyimi olmayan çalışanlar katılabilir mi?', a: 'Evet. Grup sıfırdan kurulur; ilk dönem oyun ve temel sahne çalışmasıyla geçer.' },
      { q: 'Oyunu kim yazar?', a: 'Hazır bir oyun seçilebilir ya da grubun doğaçlamalarından özgün bir metin yazılabilir; yazarlık ve dramaturji kurucumuz Halil Yağız Şanal\'ın alanı.' },
      { q: 'Gösteri nerede yapılır?', a: 'Kurumun salonu ya da kiralanacak bir sahne; takvimle birlikte netleşir.' },
    ],
    articleSlugs: ['ensemble-tiyatro-nedir', 'devising-tiyatro-nedir', 'kurumsal-drama-egitimi-nedir'],
    links: [{ href: '/atolyeler/auteur-lab', label: 'The Auteur Lab' }, { href: '/oyunculuk-kursu-istanbul', label: 'Oyunculuk kursu İstanbul' }],
  },

  // ═══════════════════════ OKULLAR HUB ═══════════════════════
  {
    audience: 'okullar', slug: '', label: 'Okullar ve kolejler',
    eyebrow: 'okul ve kolej programları · 2026–27',
    h1: 'Okullar İçin Sahne Programları: Tiyatro, İngilizce Drama, Müzikal',
    seoTitle: 'Okullar İçin Drama, İngilizce Drama ve Okul Müzikali',
    seoDesc: 'Tiyatro, İngilizce drama, müzikal, jazz dans, diksiyon ve yıl sonu oyunu; ilkokuldan liseye ve öğretmenlere. Yedi modül, altı format, Türkçe ve İngilizce.',
    keywords: ['okullara drama eğitimi', 'okullar için tiyatro atölyesi', 'kolej tiyatro programı', 'okul müzikali', 'okul yıl sonu gösterisi', 'ingilizce drama okul', 'öğretmenlere yaratıcı drama', 'school drama workshop istanbul'],
    quick: {
      q: 'İstanbul\'da okullara tiyatro, İngilizce drama ve müzikal programı kim veriyor?',
      a: 'Techne Lab İstanbul, Pera ve Kadıköy\'de çocuk, genç ve yetişkinlere İngilizce drama, oyunculuk, müzikal ve dans programları yürütüyor; 8–17 yaş programı Ekim\'den Mayıs\'a sürüp tamamen İngilizce bir gösteriyle kapanıyor. Okullara yedi modül (tiyatro ve drama, İngilizce drama, müzikal ve jazz dans, beden ve hareket, yıl sonu oyun çıkarma, diksiyon ve hitabet, öğretmenlere yaratıcı drama) ve 60 dakikalık tanışma seansından yıllık programa altı format sunuyor.',
    },
    intro: 'Sınıfta öğrenileni sahnede kullanmak. Söz almaktan çekinen öğrenci, bilen ama akmayan konuşma: sınıfta öğrenilen yapılar sahnede gerçek bir amaçla konuşmaya dönüşür.',
    hero: G.oAtolye,
    sections: [
      { h: 'Yıl boyu süren sahne programları', body: 'Pera ve Kadıköy\'de 8–17 yaş programımız Ekim\'den Mayıs\'a sürüyor ve seyircili, tamamen İngilizce bir gösteriyle kapanıyor. Okul programlarımız bu deneyimin sınıfa ve öğretmen odasına uyarlanmış hâli. Eğitmenlerimiz konservatuvar mezunu; daha önce İstanbul Gelişim Üniversitesi\'nde bir atölye gerçekleştirdik.' },
      { h: 'Kampüse kim giriyor?', body: 'Okul personeli her seansta bulunur; eğitmen öğrencilerle hiçbir zaman yalnız kalmaz. Programın sahibi zümre; biz uzman eğitmen ve ortak yönetmeniz.' },
    ],
    moduller: O_MODULLER,
    formatlar: O_FORMATLAR,
    ornekYillar: O_ORNEK_YILLAR,
    guvence: O_GUVENCE,
    surec: O_SUREC,
    surecNotu: 'Aralık başı karar: Şubat ünitesi. Mart: 2027–28 yıllık programı.',
    arastirma: [A_RELC, A_TESOL, A_EEF, A_LEE],
    kunye: O_KUNYE,
    gorusme: ['Kademe ve öğrenci sayısı', 'Modül ve dil', 'Takvim: Şubat ünitesi mi, 2027–28 yıllık programı mı', 'Salon ve gösteri tarihi', 'Veli izinleri ve görüntü kullanımı'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez', 'koksal-unal', 'beril-korkmaz', 'halil-yagiz-sanal'],
    gallery: [G.oIngilizce, G.oEgitmen, G.oSahne],
    faq: [
      { q: 'Hangi kademelerle çalışıyorsunuz?', a: 'İlkokuldan liseye ve öğretmenlere. Modüller kademeye göre seçilir; örnek yıllar ilkokul, ortaokul ve lise için ayrı kurulur.' },
      { q: 'Okullara İngilizce drama yapıyor musunuz?', a: 'Evet. İngilizce drama modülü sınıf içi ünite (6 hafta × 80 dk), dönemlik program ya da yıllık program olarak kurulabilir.' },
      { q: 'Okul müzikali ve yıl sonu gösterisi hazırlıyor musunuz?', a: 'Evet. Yıl sonu prodüksiyonunda yönetmen ve hareket eğitmeni birlikte çalışır; en fazla 25 öğrenci, Türkçe ya da İngilizce.' },
      { q: 'Daha önce bir eğitim kurumunda çalıştınız mı?', a: 'İstanbul Gelişim Üniversitesi\'nde bir atölye gerçekleştirdik. Eğitmen özgeçmişleri ve belgeleri görüşmede paylaşılır.' },
      { q: 'Fiyat nasıl belirleniyor?', a: 'Talebe göre. Kapsam netleştikten sonra tek sayfa teklif okula iletilir.' },
    ],
    articleSlugs: ['okul-muzikali-nasil-hazirlanir', 'okul-tiyatro-kulubu-yillik-plan', 'okulda-ingilizce-drama-nasil-calisir', 'ingilizce-drama-youth-yas-gruplari-neden-ayri', 'genclerde-yaratici-drama-okul-basarisina-etkisi'],
    links: [{ href: '/atolyeler/english-drama-youth', label: 'English Drama Youth (8–17)' }, { href: '/kurumsal', label: 'Kurumsal programlar' }, { href: '/en/schools', label: 'For international schools (EN)' }],
    enPath: '/en/schools',
  },
  {
    audience: 'okullar', slug: 'ingilizce-drama', label: 'İngilizce drama',
    eyebrow: 'okullar · ingilizce drama',
    h1: 'Okullar İçin İngilizce Drama: İngilizceyi Sahnede Kullanmak',
    seoTitle: 'Okullarda İngilizce Drama — Kolej ve Uluslararası Okullar',
    seoDesc: 'İngilizceyi sahnede, gerçek bir amaçla kullanmak: sınıf içi ünite, dönemlik ya da yıllık program ve İngilizce gösteri. Zümreyle birlikte, CEFR B1 eşlemesiyle.',
    keywords: ['ingilizce drama okul', 'okullarda ingilizce drama', 'kolej ingilizce drama', 'english drama school istanbul', 'ingilizce tiyatro okul', 'ingilizce zümre drama', 'cefr drama'],
    quick: {
      q: 'Okulda İngilizce drama nasıl çalışır?',
      a: 'Öğrenciler İngilizceyi bir sahne görevi içinde kullanır: doğaçlama, rol değişimi, hikâye anlatımı ve monolog. Zümrenin seçtiği yapılar sahnede gerçek bir amaçla konuşmaya dönüşür. Altı haftalık yaratıcı drama çalışmasının yabancı dil kaygısını anlamlı biçimde azalttığını gösteren bir çalışma var (Sağlamel ve Kayaoğlu, 2013).',
    },
    intro: 'Sınıfta İngilizcesi iyi olan öğrenci, sahneye çağrıldığında susabiliyor. İngilizce drama bu boşluğa çalışıyor: bilinen dili canlı kullanıma çevirmek.',
    hero: G.oIngilizce,
    sections: [
      { h: 'Müfredatla nerede buluşur?', body: 'CEFR B1 sözlü etkileşim (hazırlıksız konuşmaya katılmak): doğaçlama ve rol değişimi. CEFR B1 sözlü üretim (olayı, fikri, gerekçeyi anlatmak): hikâye anlatımı ve monolog. IB MYP Kriter C (konuşma: etkileşim ve iletişim): sahne çalışması ve sunum. IB ATL becerileri (iletişim, sosyal, öz yönetim): ensemble ve akran geri bildirimi. Okulun İngilizce programı: zümrenin seçtiği yapılar zümreyle birlikte planlanır. Eşleme ilk görüşmede okulun yıllık planına göre netleşir.' },
      { h: 'Örnek yıl', body: 'Ekim–Aralık: oyun ve doğaçlama. Ocak–Mart: karakter ve metin çalışması. Nisan–Mayıs: prova ve İngilizce gösteri.' },
    ],
    formatlar: pick(O_FORMATLAR, ['Tanışma seansı', 'Atölye günü', 'Sınıf içi ünite', 'Dönemlik program', 'Yıllık program']),
    arastirma: [A_RELC, A_TESOL],
    kunye: set(O_KUNYE, 'Dil', 'İngilizce'),
    gorusme: ['Sınıf düzeyleri ve İngilizce seviye dağılımı', 'Zümrenin dönem hedefleri ve seçtiği yapılar', 'Ünite mi, kulüp mü, yıllık program mı', 'Gösteri isteniyor mu'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez'],
    gallery: [G.oSahne, G.oGenc],
    faq: [
      { q: 'İngilizce öğretmeninin yerine mi geçer?', a: 'Hayır. Programın sahibi zümre; biz uzman eğitmen ve ortak yönetmeniz. Sınıf içi ünite öğretmenle birlikte yürür.' },
      { q: 'Hangi seviyedeki öğrenciler için uygun?', a: 'Kendi 8–17 yaş programımızda B1 ve üzerini öneriyoruz. Okulda seviye dağılımına göre sahne görevleri uyarlanır.' },
      { q: 'IB okullarına uygun mu?', a: 'Atölye çalışması IB MYP Kriter C ve ATL becerileriyle eşlenebilir; eşleme okulun yıllık planına göre netleşir.' },
    ],
    articleSlugs: ['okulda-ingilizce-drama-nasil-calisir', 'ingilizce-yaratici-drama-yontemi', 'cocugum-ingilizce-biliyor-ama-konusmuyor', 'ingilizce-drama-youth-yas-gruplari-neden-ayri', 'genclerde-ingilizce-drama'],
    links: [{ href: '/atolyeler/english-drama-youth', label: 'English Drama Youth (8–17)' }, { href: '/okullar/ogretmenlere-yaratici-drama', label: 'Drama in the English Classroom' }, { href: '/gencler-icin-ingilizce-drama-istanbul', label: 'Gençler için İngilizce drama' }],
    enPath: '/en/schools',
  },
  {
    audience: 'okullar', slug: 'okul-muzikali', label: 'Müzikal ve jazz dans',
    eyebrow: 'okullar · müzikal',
    h1: 'Okul Müzikali: Şarkı, Jazz Dans ve Sahne',
    seoTitle: 'Okul Müzikali Hazırlama — Şan, Jazz Dans ve Sahneleme',
    seoDesc: 'Müzikal yılı: Ekim–Aralık şan ve jazz dans temelleri, Ocak–Mart sahneleme ve koreografi, Nisan–Mayıs müzikal gösteri. Ortaokul ve lise, TR ya da EN. İstanbul.',
    keywords: ['okul müzikali', 'okul müzikali hazırlama', 'school musical istanbul', 'okul müzikal koreografi', 'kolej müzikal', 'okul jazz dans'],
    quick: {
      q: 'Bir okul müzikali nasıl hazırlanır?',
      a: 'Bir yıla yayılarak: Ekim–Aralık şan ve jazz dans temelleri, Ocak–Mart sahneleme ve koreografi, Nisan–Mayıs müzikal gösteri. Repertuvar seçiminde hak kontrolü ilk adımdır. Yıl sonu prodüksiyonunda yönetmen ve hareket eğitmeni birlikte çalışır; en fazla 25 öğrenci, Türkçe ya da İngilizce.',
    },
    intro: 'Bir okul müzikali üç disiplini aynı anda ister ve çoğu zaman üç ayrı öğretmenin üç ayrı saatinde çalışılır. Biz şarkıyı, hareketi ve sahneyi aynı odada kuruyoruz.',
    hero: G.oSahne,
    sections: [
      { h: 'Müzikal yılı', body: 'Ekim–Aralık: şan ve jazz dans temelleri. Ocak–Mart: sahneleme ve koreografi. Nisan–Mayıs: müzikal gösteri. Ortaokul ve lise için, Türkçe ya da İngilizce.' },
      { h: 'Ensemble herkesindir', body: 'Okul müzikalinde öğrencilerin çoğu ensemble\'da yer alır. Ensemble\'ı figürasyon değil, sahnenin dünyasını kuran kadro olarak çalışıyoruz. Sahneye çıkmak istemeyenler kostüm ve teknik ekipte.' },
    ],
    formatlar: pick(O_FORMATLAR, ['Dönemlik program', 'Yıllık program', 'Yıl sonu prodüksiyonu']),
    kunye: O_KUNYE,
    gorusme: ['Hangi müzikal ya da özgün metin', 'Kadro büyüklüğü ve yaş aralığı', 'Gösteri tarihi ve salon', 'Müzik öğretmeni ve orkestra ya da playback durumu', 'Kostüm, ışık, ses'],
    egitmenler: ['koksal-unal', 'beril-korkmaz'],
    faq: [
      { q: 'Telif ve haklar nasıl çözülür?', a: 'Bilinen müzikallerin okul temsilleri için hak sahibinden lisans gerekebilir. Bu kontrol repertuvar seçiminin ilk adımıdır.' },
      { q: 'Kaç öğrenciyle çalışılır?', a: 'Yıl sonu prodüksiyonunda en fazla 25 öğrenci; yönetmen ve hareket eğitmeni birlikte.' },
      { q: 'Okulun müzik öğretmeniyle nasıl çalışılır?', a: 'Müzik öğretmeniyle birlikte; şan ve sahne çalışması onun müzikal hazırlığıyla eşleştirilir.' },
    ],
    articleSlugs: ['okul-muzikali-nasil-hazirlanir', 'muzikal-ensemble-oyuncusu-olmak-koronun-gorunmeyen-isi', 'belting-nedir-muzikal-sesi-belt-mix-legit', 'jazz-dance-nedir'],
    links: [{ href: '/muzikal-tiyatro-kursu-istanbul', label: 'Müzikal tiyatro kursu' }, { href: '/gencler-icin-muzikal-tiyatro-istanbul', label: 'Gençler için müzikal tiyatro' }, { href: '/kaynaklar/muzikal-secme-sarkilari', label: 'Müzikal seçme şarkıları' }],
    enPath: '/en/schools',
  },
  {
    audience: 'okullar', slug: 'yil-sonu-gosterisi', label: 'Yıl sonu oyun çıkarma',
    eyebrow: 'okullar · yıl sonu',
    h1: 'Yıl Sonu Oyun Çıkarma: Metinden Seyirciye',
    seoTitle: 'Okul Yıl Sonu Gösterisi Hazırlama — Metinden Seyirciye',
    seoDesc: 'Metin, prova, kostüm ve dekor, birleştirme, gösteri. Yönetmen ve hareket eğitmeniyle, en fazla 25 öğrenci, Türkçe ya da İngilizce. Okullar ve kolejler için.',
    keywords: ['okul yıl sonu gösterisi', 'yıl sonu tiyatro oyunu okul', 'okul gösterisi hazırlama', 'okul tiyatro gösterisi yönetmen', 'okul oyunu sahneleme', 'yıl sonu prodüksiyonu'],
    quick: {
      q: 'Okul yıl sonu gösterisi nasıl hazırlanır?',
      a: 'Beş aşamada: metin (öğrencilerin ürettiği ya da uyarlanan), prova (sahne, hareket, şarkılar), kostüm ve dekor (öğrencilerle birlikte), birleştirme (sahne geçişleri, müzik, teknik) ve genel prova ile seyircili gösteri. Ekipte yönetmen ve hareket eğitmeni var; en fazla 25 öğrenci. Takvim okulun gösteri tarihine göre kurulur.',
    },
    intro: 'Yıl sonu gösterisi genellikle Mayıs\'ın son haftalarına sıkışır ve stresle hatırlanır. Gösteri tarihinden geriye doğru kurulan bir takvim bunu değiştirir.',
    hero: G.oAtolye,
    sections: [
      { h: 'Beş aşama', body: '1. Metin: öğrencilerin ürettiği ya da uyarlanan metin. 2. Prova: sahne, hareket ve şarkılar. 3. Kostüm ve dekor: öğrencilerle birlikte hazırlanır. 4. Birleştirme: sahne geçişleri, müzik, teknik. 5. Gösteri: genel prova ve seyircili gösteri.' },
      { h: 'Herkese bir iş', body: 'Sahneye çıkmak istemeyen öğrenciler kostüm ve teknik ekipte yer alır. Metin ve gösteri içeriği okulla birlikte onaylanır.' },
    ],
    formatlar: pick(O_FORMATLAR, ['Yıl sonu prodüksiyonu', 'Yıllık program']),
    kunye: set(O_KUNYE, 'Kademe', 'İlkokuldan liseye; en fazla 25 öğrenci'),
    gorusme: ['Gösteri tarihi ve salon', 'Kadro büyüklüğü', 'Hazır oyun mu, özgün metin mi', 'Dil', 'Veli izinleri ve görüntü kullanımı'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum', 'koksal-unal'],
    faq: [
      { q: 'Ekipte kimler var?', a: 'Bir yönetmen ve bir hareket eğitmeni; okul personeli her seansta bulunur.' },
      { q: 'Metni kim yazar?', a: 'Öğrencilerin ürettiği malzemeden derlenebilir ya da hazır bir metin uyarlanabilir; içerik okulla birlikte onaylanır.' },
      { q: 'İngilizce gösteri yapılabilir mi?', a: 'Evet; kendi 8–17 yaş programımız tamamen İngilizce bir gösteriyle kapanıyor.' },
    ],
    articleSlugs: ['okul-tiyatro-kulubu-yillik-plan', 'okul-muzikali-nasil-hazirlanir', 'devising-tiyatro-nedir', 'ensemble-tiyatro-nedir'],
    links: [{ href: '/okullar/tiyatro-kulubu', label: 'Tiyatro ve drama' }, { href: '/okullar/okul-muzikali', label: 'Okul müzikali' }],
  },
  {
    audience: 'okullar', slug: 'tiyatro-kulubu', label: 'Tiyatro ve drama',
    eyebrow: 'okullar · tiyatro ve drama',
    h1: 'Okullar İçin Tiyatro ve Drama: Kulüp ve Dönemlik Program',
    seoTitle: 'Okul Tiyatro Kulübü ve Drama Programı — Kolejler İçin',
    seoDesc: 'Oyun, doğaçlama ve sahne; ifade ve özgüven. 14 haftalık dönemlik program ya da 28 haftalık yıllık program, sınıf içi gösterim ya da yıl sonu gösterisiyle.',
    keywords: ['okul tiyatro kulübü', 'tiyatro kulübü eğitmeni', 'kolej tiyatro kulübü', 'drama kulübü okul', 'okul drama programı', 'beden ve hareket okul'],
    quick: {
      q: 'Okul tiyatro kulübü nasıl yürütülür?',
      a: 'Kulüp ya da okul sonrası 14 haftalık dönemlik programla, dönem sonunda sınıf içi gösterimle; ya da Ekim\'den Mayıs\'a 28 haftalık yıllık programla ve yıl sonu gösterisiyle. İçerik oyun, doğaçlama ve sahne çalışması; ilkokulda beden ve hareketle birleşen bir sahne sanatları turu olarak da kurulabilir.',
    },
    intro: 'Kulüp saati çoğu zaman yılın en esnek saati. Bu esneklik iyi kurulmazsa dağılır, iyi kurulursa öğrencinin okuldaki en özgür alanı olur.',
    hero: G.oAtolye,
    sections: [
      { h: 'Tiyatro ve drama', body: 'Oyun, doğaçlama ve sahne; ifade ve özgüven. Türkçe ya da İngilizce.' },
      { h: 'Beden ve hareket', body: 'Fiziksel tiyatro, ritim, beden farkındalığı; dil bağımsız.' },
      { h: 'Sahne sanatları turu (ilkokul, ortaokul)', body: '1. dönem tiyatro ve drama, 2. dönem beden ve hareket, Mayıs\'ta sınıf içi gösterim.' },
    ],
    formatlar: pick(O_FORMATLAR, ['Atölye günü', 'Dönemlik program', 'Yıllık program']),
    kunye: O_KUNYE,
    gorusme: ['Kulüp saati ve sıklığı', 'Öğrenci sayısı ve kademe', 'Gösteri hedefi', 'Sorumlu öğretmenle iş bölümü'],
    egitmenler: ['halil-yagiz-sanal', 'alara-lokum', 'ece-ertez'],
    faq: [
      { q: 'Dönemlik program ne kadar sürer?', a: '14 hafta; kulüp ya da okul sonrası. Dönem sonunda sınıf içi gösterim yapılır.' },
      { q: 'Yıllık program ne zaman başlar?', a: 'Ekim\'den Mayıs\'a 28 hafta ve yıl sonu gösterisi; 2027–28 öğretim yılı için planlanıyor, karar Mart\'ta.' },
      { q: 'Okulun öğretmeni ne yapar?', a: 'Programın sahibi zümre; biz uzman eğitmen ve ortak yönetmeniz. Okul personeli her seansta bulunur.' },
    ],
    articleSlugs: ['okul-tiyatro-kulubu-yillik-plan', 'yaratici-drama-asamalari', 'yaratici-drama-teknikleri', 'fiziksel-tiyatro-nedir'],
    links: [{ href: '/yaratici-drama-istanbul', label: 'Yaratıcı drama İstanbul' }, { href: '/okullar/yil-sonu-gosterisi', label: 'Yıl sonu oyun çıkarma' }],
  },
  {
    audience: 'okullar', slug: 'diksiyon-ve-hitabet', label: 'Diksiyon ve hitabet',
    eyebrow: 'okullar · diksiyon',
    h1: 'Okullar İçin Diksiyon ve Hitabet',
    seoTitle: 'Okullar İçin Diksiyon ve Hitabet Atölyesi — İstanbul',
    seoDesc: 'Nefes, ses, artikülasyon ve topluluk önünde konuşma: öğrenciler için diksiyon ve hitabet. Atölye günü, sınıf içi ünite ya da dönemlik program. İstanbul.',
    keywords: ['okul diksiyon eğitimi', 'öğrenciler için diksiyon', 'hitabet okul', 'topluluk önünde konuşma öğrenci', 'diksiyon atölyesi okul'],
    quick: {
      q: 'Okulda diksiyon ve hitabet nasıl çalışılır?',
      a: 'Nefes, ses, artikülasyon ve topluluk önünde konuşma tek bir atölyede birleşir: önce teknik, sonra sahnede kullanım. Söz almaktan çekinen öğrenci için hedef, sesi zorlamadan taşımak ve bir fikri gerekçesiyle anlatabilmek. Türkçe yürür; atölye günü, sınıf içi ünite ya da dönemlik program olarak kurulur.',
    },
    intro: 'Diksiyon kuralları bir kitapta yazar. Sınıfın önünde işe yarayan ise bedene yerleşmiş olanıdır.',
    hero: G.oEgitmen,
    sections: [
      { h: 'Ne çalışılır?', body: 'Nefes ve ses; artikülasyon ve fonetik, doğru Türkçe ve net telaffuz; anlamı sesle taşımak; topluluk önünde konuşma, sunum, dinleme ve dinlettirme.' },
      { h: 'Okul hedefleriyle', body: 'Okulun Türkçe programındaki dinlediğini anlamak ve ifade etmek hedefleri, hikâye, rol ve canlandırma ile çalışılır.' },
    ],
    formatlar: pick(O_FORMATLAR, ['Atölye günü', 'Sınıf içi ünite', 'Dönemlik program']),
    kunye: set(O_KUNYE, 'Dil', 'Türkçe'),
    gorusme: ['Kademe ve sınıf sayısı', 'Hedef: sunum, münazara, gösteri, okuma', 'Format'],
    egitmenler: ['burcu-halacoglu', 'beril-korkmaz', 'halil-yagiz-sanal'],
    faq: [
      { q: 'Hangi yaşlar için uygun?', a: 'Ortaokul ve lise öncelikli; ilkokulda oyun ağırlıklı kısa oturumlarla uyarlanır.' },
      { q: 'İngilizce yapılabilir mi?', a: 'Okul kataloğunda diksiyon ve hitabet Türkçe; İngilizce konuşma için İngilizce drama modülünü öneriyoruz.' },
      { q: 'Kaç hafta sürer?', a: 'Atölye günü tek gün, sınıf içi ünite 6 hafta × 80 dk, dönemlik program 14 hafta.' },
    ],
    articleSlugs: ['oyunculukta-ses-ve-nefes', 'sahne-korkusu-nasil-yenilir', 'cocugum-yabanci-dilde-utaniyor'],
    links: [{ href: '/kaynaklar/ses-nefes', label: 'Ses ve nefes egzersizleri' }, { href: '/kurumsal/diksiyon-ve-hitabet', label: 'Kurumsal diksiyon' }],
  },
  {
    audience: 'okullar', slug: 'ogretmenlere-yaratici-drama', label: 'Öğretmenlere yaratıcı drama',
    eyebrow: 'okullar · öğretmenler',
    h1: 'Öğretmenler İçin Yaratıcı Drama Atölyesi',
    seoTitle: 'Öğretmenlere Yaratıcı Drama Atölyesi — Branşa Göre',
    seoDesc: 'Sınıfta yaratıcı drama, Drama in the English Classroom ve okul tiyatrosu yönetmek: yarım gün, bir ya da iki gün. Her öğretmene 20 etkinlikli uygulama dosyası.',
    keywords: ['öğretmenlere drama eğitimi', 'öğretmenler için yaratıcı drama', 'drama in the english classroom', 'sınıfta drama teknikleri', 'okul tiyatrosu yönetmek', 'zümre drama atölyesi'],
    quick: {
      q: 'Öğretmenler için yaratıcı drama atölyesinde ne yapılır?',
      a: 'Öğretmenler sınıfta kullanacakları drama tekniklerini kendileri deneyerek çalışır: ısınma, rol, doğaçlama ve canlandırma. Üç başlık var: tüm branşlar için sınıfta yaratıcı drama, İngilizce zümresi için Drama in the English Classroom ve kulüp öğretmenleri için okul tiyatrosu yönetmek. Yarım gün, bir ya da iki gün; her öğretmene yirmi etkinlikten oluşan bir uygulama dosyası verilir.',
    },
    intro: 'Drama temelli öğretimin etkisi, uygulamayı sınıf öğretmeni yürüttüğünde daha güçlü bulundu. Bu atölye o öğretmen için.',
    hero: G.oEgitmen,
    sections: [
      { h: 'Sınıfta yaratıcı drama (TR, tüm branşlar)', body: 'Isınma, rol, doğaçlama ve canlandırma; her branşta kullanılabilir.' },
      { h: 'Drama in the English Classroom (EN, İngilizce zümresi)', body: 'Hedef yapıyı sahnede kullandıran etkinlikler.' },
      { h: 'Okul tiyatrosu yönetmek (TR · EN, kulüp)', body: 'Oyun seçimi, rol dağıtımı, prova planı ve sahneleme.' },
      { h: 'Süre ve dosya', body: 'Yarım gün, bir gün ya da iki gün. Her öğretmene yirmi etkinlikten oluşan uygulama dosyası. Uygulama Eşliği isteğe bağlı: altı hafta, iki sınıf ziyareti ve toplu ölçüm raporu.' },
    ],
    arastirma: [A_LEE],
    kunye: set(set(O_KUNYE, 'Kademe', 'Tüm branş öğretmenleri, İngilizce zümresi, kulüp öğretmenleri'), 'Takvim', 'Yarım gün, bir gün ya da iki gün; Uygulama Eşliği 6 hafta'),
    gorusme: ['Hangi zümre ya da branşlar', 'Öğretmen sayısı', 'Süre: yarım gün, bir ya da iki gün', 'Uygulama Eşliği isteniyor mu'],
    egitmenler: ['alara-lokum', 'halil-yagiz-sanal', 'ece-ertez'],
    faq: [
      { q: 'Öğretmenlere ne verilir?', a: 'Her öğretmene yirmi etkinlikten oluşan bir uygulama dosyası.' },
      { q: 'Uygulama Eşliği nedir?', a: 'İsteğe bağlı altı haftalık destek: iki sınıf ziyareti ve toplu ölçüm raporu.' },
      { q: 'İngilizce öğretmenleri için ayrı bir içerik var mı?', a: 'Evet: Drama in the English Classroom, hedef yapıyı sahnede kullandıran etkinlikler üzerine.' },
    ],
    articleSlugs: ['yaratici-drama-teknikleri', 'yaratici-dramada-rolde-lider', 'okulda-ingilizce-drama-nasil-calisir', 'yaratici-drama-asamalari'],
    links: [{ href: '/okullar/ingilizce-drama', label: 'Okullar için İngilizce drama' }, { href: '/yaratici-drama-istanbul', label: 'Yaratıcı drama İstanbul' }],
  },

  // ═══════════════════════ EN HUBS ═══════════════════════
  {
    audience: 'en/corporate', slug: '', label: 'Corporate',
    eyebrow: 'corporate programmes · 2026–27',
    h1: 'Your Team on Stage: Corporate Theatre, Improv and Speaking Workshops',
    seoTitle: 'Corporate Drama & Improv Workshops in Istanbul (in English)',
    seoDesc: 'Speaking, diction, improv, drama, storytelling, jazz dance and musical workshops for companies in Istanbul. Ten modules, six formats, in English.',
    keywords: ['corporate drama training istanbul', 'improv workshop istanbul english', 'team building istanbul english', 'business english speaking workshop istanbul', 'presentation skills theatre istanbul'],
    quick: {
      q: 'Where can international teams in Istanbul do drama or improv workshops in English?',
      a: 'Techne Lab Istanbul is a professional theatre team running acting and English drama programmes in Pera and Kadıköy. For companies it offers ten modules (effective speaking and presentation, diction, presence through acting, improv, creative drama, writing and story, jazz dance, movement, musical, end-of-year company play) in six formats from a 90-minute session to a six-session programme, all in English or Turkish.',
    },
    intro: 'The expert who stays silent in the global meeting. The team that falls apart when the plan changes. A tired office glued to screens. Three needs, one method: theatre. Rehearsal, not slides.',
    hero: G.kSahne,
    sections: [
      { h: 'Stage tools, work behaviours', body: 'Body and presence for taking the floor in meetings. Voice and breath for speaking clearly under pressure. Improv for adapting fast when plans change. Text and story for building a persuasive message. Why it works: repetition, the body and instant feedback.' },
      { h: 'Where the language course ends', body: 'For the employee who has reached B2 but does not speak up in HQ meetings. Not language teaching but language use: speaking up in global meetings, keeping a client conversation going, answering the unexpected question. A complement to language courses, not a rival. B1 and above, no placement test.' },
      { h: 'Formats', body: '90-minute event session (20–60 people); 3-hour Stage Rehearsal trial (8–16); 6-hour full day (8–16); 6 × 2-hour programme with 30-day follow-up and measurement report (8–14); 10 × 2-hour after-work employee club; end-of-year company play (10–20 volunteers).' },
      { h: 'Measurement', body: 'Day 0: three items scored 1–7, "now" and "before". Day 30: the same items and one real use example. Day 60: manager or peer observation. Before signing: one business indicator chosen together.' },
    ],
    arastirma: [
      { text: 'A short improv intervention increased uncertainty tolerance compared with control groups.', kaynak: 'Felsman, Gunawardena and Seifert, Thinking Skills and Creativity, 2020' },
      { text: 'Improv workshops spread over five months in a Finnish organisation produced change still observed fifteen months later.', kaynak: 'Nisula and Kianto, Industry and Innovation, 2018' },
    ],
    arastirmaNotu: 'The evidence base is young, which is why we measure every programme.',
    kunye: [
      { k: 'Language', v: 'English or Turkish (English groups B1+, no placement test)' },
      { k: 'Location', v: 'Our studios in Pera and Kadıköy, or on site' },
      { k: 'Group', v: '8–16 in workshops; 20–60 in event sessions' },
      { k: 'Trainers', v: 'Conservatory-trained actors and trainers' },
      { k: 'Participation', v: 'Voluntary; nobody has to perform' },
      { k: 'Price', v: 'On request; one-page proposal within two working days' },
    ],
    gorusme: ['Target behaviour and success measure', 'Format, group size, language and calendar', 'Managers and team together or separate', 'Studio or on site'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'ece-ertez', 'koksal-unal', 'halil-yagiz-sanal'],
    gallery: [G.kGrup, G.kEnsemble, G.kStudyo],
    faq: [
      { q: 'Are the workshops fully in English?', a: 'Yes. All modules run in English or Turkish; for English groups we recommend B1 and above, with no placement test.' },
      { q: 'Do participants need acting experience?', a: 'No. Participation is voluntary, nobody is embarrassed and nobody has to perform. Managers and team members can be grouped separately.' },
      { q: 'How is impact measured?', a: 'A three-item now-and-before survey on day 0, a repeat with a real use example on day 30, manager observation on day 60, and one business indicator agreed before signing.' },
      { q: 'What does it cost?', a: 'Price is shared on request: a one-page proposal follows within two working days once the scope is clear.' },
    ],
    articleSlugs: ['team-building-istanbul-in-english-theatre-improv', 'english-speaking-theatre-istanbul', 'make-friends-istanbul-expat-drama'],
    links: [{ href: '/kurumsal', label: 'Kurumsal (Türkçe)' }, { href: '/en/schools', label: 'For schools' }, { href: '/en/english-drama-istanbul', label: 'English drama in Istanbul' }],
    enPath: '/kurumsal',
  },
  {
    audience: 'en/schools', slug: '', label: 'Schools',
    eyebrow: 'school programmes · 2026–27',
    h1: 'Stage Programmes for Schools in Istanbul: Theatre, English Drama, Musicals',
    seoTitle: 'School Drama & Musical Partner in Istanbul — In English',
    seoDesc: 'For international and private schools in Istanbul: English drama, school musicals, end-of-year plays and drama training for teachers. Seven modules, six formats.',
    keywords: ['school drama workshop istanbul', 'school musical istanbul', 'english drama for schools istanbul', 'international school drama istanbul', 'drama in the english classroom', 'teacher drama training istanbul'],
    quick: {
      q: 'Who works with schools in Istanbul on drama and musicals in English?',
      a: 'Techne Lab Istanbul runs English drama, acting, musical and dance programmes for children, teens and adults in Pera and Kadıköy; its ages 8–17 programme runs October to May and ends with a public, all-English performance. For schools it offers seven modules and six formats, from a 60-minute introductory session to a year-long programme with an end-of-year show.',
    },
    intro: 'Using on stage what was learned in class. The student who will not speak up, the speech that knows but does not flow: structures learned in class turn into speech with a real purpose on stage.',
    hero: G.oAtolye,
    sections: [
      { h: 'Seven modules', body: 'Theatre and drama; English drama; musical and jazz dance; body and movement; end-of-year play; diction and public speaking (Turkish); creative drama for teachers, including Drama in the English Classroom. Modules can be combined term by term.' },
      { h: 'Six formats', body: '60-minute introductory session; workshop day (three classes, 80-minute sessions); in-class unit (6 weeks × 80 min, with the teacher); 14-week term programme; 28-week year programme with end-of-year show (for 2027–28); end-of-year production (two trainers, up to 25 students).' },
      { h: 'Curriculum mapping', body: 'CEFR B1 spoken interaction and production through improv, role reversal, storytelling and monologue; IB MYP Criterion C and ATL skills through scene work, ensemble and peer feedback; your English and Turkish programmes planned with the department.' },
      { h: 'Who comes onto campus', body: 'School staff are present at every session; the trainer is never alone with students. Trainer CVs, diplomas and criminal record checks are shared. Photos and video only with school and parental consent. Scripts and show content are approved with the school. The department owns the programme; we are specialist trainers and co-directors. Service contract and e-invoicing.' },
    ],
    arastirma: [
      { text: 'A six-week creative drama intervention significantly reduced foreign language anxiety.', kaynak: 'Sağlamel and Kayaoğlu, RELC Journal, 2013' },
      { text: 'A four-month drama programme produced larger fluency gains than a communicative approach.', kaynak: 'Galante and Thomson, TESOL Quarterly, 2017' },
      { text: 'Arts participation is associated with around three months of additional progress.', kaynak: 'Education Endowment Foundation, Teaching and Learning Toolkit', url: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/arts-participation' },
      { text: 'Drama-based pedagogy showed stronger effects when the classroom teacher delivered it.', kaynak: 'Lee, Patall, Cawthon and Steingut, Review of Educational Research, 2015' },
    ],
    kunye: [
      { k: 'Language', v: 'English or Turkish' },
      { k: 'Levels', v: 'Primary to high school, and teachers' },
      { k: 'Location', v: 'Your school hall or classroom' },
      { k: 'Trainers', v: 'Conservatory-trained actors and trainers' },
      { k: 'Calendar', v: 'Decide in early December for a February unit; in March for the 2027–28 year' },
      { k: 'Price', v: 'On request; one-page proposal' },
    ],
    gorusme: ['Levels and student numbers', 'Module and language', 'February unit or 2027–28 year programme', 'Hall access and show date', 'Parental consent and image use'],
    egitmenler: ['alara-lokum', 'yesim-celebi', 'koksal-unal', 'beril-korkmaz', 'halil-yagiz-sanal'],
    gallery: [G.oIngilizce, G.oEgitmen, G.oSahne],
    faq: [
      { q: 'Do you run drama fully in English?', a: 'Yes. Our ages 8–17 programme runs entirely in English; we recommend B1 and above and do not use a placement test.' },
      { q: 'Can you produce our school musical or end-of-year play?', a: 'Yes. A director and a movement trainer work together with up to 25 students, in English or Turkish, planned back from your show date.' },
      { q: 'Have you worked with educational institutions before?', a: 'We have run a workshop at Istanbul Gelişim University. Trainer CVs and documents are shared in the first meeting.' },
      { q: 'What does it cost?', a: 'Price is shared on request, as a one-page proposal once the scope is clear.' },
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
