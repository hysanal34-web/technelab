// ══════════════════════════════════════════════════════════════════
// PROGRAM SSS — Google "People Also Ask" kutularını hedefler
// Her programa hem ortak hem kategoriye özel sorular üretilir
// ══════════════════════════════════════════════════════════════════

import type { Workshop } from '@/lib/data'

export type FaqItem = { q: string; a: string }

const CATEGORY_FAQ: Record<Workshop['category'], (w: Workshop) => FaqItem[]> = {
  'oyunculuk': (w) => [
    {
      q: `${w.title} programına hiç deneyimi olmayanlar katılabilir mi?`,
      a: `Evet. Programın ilk haftaları bedeni ve dikkati hazırlamaya ayrılıyor — geçmiş sahne deneyimi gerekmiyor. Grup ${w.maxStudents} kişiyle sınırlı olduğu için herkes bireysel geri bildirim alıyor. Tek beklenti düzenli katılım ve denemeye açık olmak.`,
    },
    {
      q: 'Oyunculuk kursu ile atölye arasındaki fark nedir?',
      a: 'Kurs genellikle bir müfredatı aktarır; atölye ise katılımcının kendi malzemesiyle çalışır. Techne Lab programları atölye mantığıyla yürüyor: metin ve egzersizler ortak, ama çalışma her katılımcının kendi bedeni ve sesi üzerinden ilerliyor.',
    },
    {
      q: 'Sahne korkum var, bu program bana göre mi?',
      a: 'Sahne korkusu neredeyse herkeste var — deneyimli oyuncularda da. Program bunu yok etmeyi değil, yönetilebilir hale getirmeyi hedefliyor. Küçük grup ve kademeli ilerleme, ilk haftalarda kimseyi zorlamadan alanı güvenli kılıyor.',
    },
    {
      q: 'Derslerde ne yapılıyor?',
      a: 'Beden ve nefes ısınması, doğaçlama, metin çalışması ve sahne kurma. Her ders bir öncekinin üstüne biniyor — bu yüzden düzenli katılım önemli.',
    },
  ],

  'yazarlık': (w) => [
    {
      q: `${w.title} için yazma deneyimi gerekli mi?`,
      a: 'Hayır. Programa hiç yazmamış olarak da katılabilirsin. Roman ya da senaryo geçmişin varsa da işine yarar — sahne dili farklı bir form ve program bunu sıfırdan kuruyor.',
    },
    {
      q: 'Program sonunda elimde ne olacak?',
      a: 'Yazılmış metin. Program boyunca kendi malzemenle çalışıyorsun; sonunda üzerinde çalışılmış, geri bildirim almış bir metin parçası çıkıyor.',
    },
    {
      q: 'Oyun yazarlığı ile senaryo yazarlığı arasındaki fark nedir?',
      a: 'Senaryo görsel medya için yazılır — kamera, kurgu ve görüntü hesaba katılır. Oyun sahne için yazılır: tüm anlam oyuncunun bedeni ve sesiyle iletilir. Diyalog disiplini oyunda çok daha sıkıdır. Bu disiplin senaryo ve romanı da güçlendirir.',
    },
    {
      q: 'Yazdıklarım grup önünde okunacak mı?',
      a: 'Evet, bu programın merkezinde. Ama zorlama yok ve süreç kademeli ilerliyor. Metnin sesli duyulması, yazarın kendi kulağıyla fark edemediği şeyleri açığa çıkarıyor.',
    },
  ],

  'ingilizce-drama': (w) => [
    {
      q: 'İngilizce seviyem yeterli mi?',
      a: 'B1 ve üzeri rahat. Akıcı olmak gerekmiyor. Sohbet edebiliyorsan katılabilirsin — drama çalışması orta seviye için özellikle uygun, çünkü sahne konuşmak için bir sebep veriyor.',
    },
    {
      q: 'Bu bir dil kursu mu, oyunculuk kursu mu?',
      a: 'İkisi de. Gerçek drama çalışması yapılıyor — sahne, doğaçlama, ses, beden. Hepsi İngilizce olduğu için dil de değişiyor. İnsanlar iki sebepten biriyle geliyor ve ikisini birden alıyor.',
    },
    {
      q: 'Konuşma kulübünden farkı ne?',
      a: 'Konuşma kulübü seni bir masaya oturtur ve konuşmanı umar. Drama ise konuşmayı zorunlu kılar: sahnede sessiz kalmak bir seçenek değil. Ayrıca eğitmenden yapılandırılmış geri bildirim alıyorsun — konuşma kulüplerinde bu neredeyse hiç yok.',
    },
    {
      q: 'Grupta kimler oluyor?',
      a: 'Karma bir grup: yurt dışı iş görüşmesine hazırlananlar, Erasmus ya da yurt dışı okul hedefleyenler, İstanbul\'a yeni taşınmış yabancılar ve İngilizcesini gerçek bir yerde kullanmak isteyenler.',
    },
    {
      q: 'Sahne performansı yapmam gerekecek mi?',
      a: `${w.slug === 'english-drama-final-performance' ? 'Evet — bu programın yapısı seyirci önünde bir performansla bitiyor.' : 'Hayır. Çalışma grup içinde kalıyor. Seyircili performansla biten ayrı bir program var, ama bu programda kimse sahneye itilmiyor.'}`,
    },
  ],

  'dans-muzikal': (w) => [
    {
      q: 'Dans deneyimim yok, katılabilir miyim?',
      a: 'Evet. Program temelden başlıyor — izolasyon, ritim, temel jazz teknikleri. Önemli olan geçmiş teknik değil, düzenli gelmek ve bedenle çalışmaya açık olmak.',
    },
    {
      q: 'Şan bilgim olması gerekiyor mu?',
      a: `${w.slug === 'techne-musical-lab' ? 'Hayır. Ses çalışması programın içinde, temelden kuruluyor. Profesyonel şan geçmişi beklenmiyor — temel ses kontrolü ve öğrenme isteği yeterli.' : 'Bu program dans odaklı; şan çalışması içermiyor. Şan, dans ve oyunculuğu birlikte çalışmak istersen Techne Musical Lab\'e bakabilirsin.'}`,
    },
    {
      q: 'Yaş sınırı var mı?',
      a: 'Yetişkin programı — 18 yaş ve üzeri. Fiziksel bir çalışma olduğu için ciddi bir sakatlık ya da rahatsızlığın varsa kayıt öncesinde bize yazmanı öneriyoruz.',
    },
    {
      q: 'Ne giymeliyim?',
      a: 'Hareket etmeyi engellemeyen rahat kıyafet ve zeminde kaymayan ayakkabı. Jazz ayakkabısı zorunlu değil — ilk derslerde spor ayakkabı yeterli.',
    },
  ],
}

const COMMON_FAQ = (w: Workshop): FaqItem[] => [
  {
    q: `${w.title} nerede yapılıyor?`,
    a: `${w.venue}. Techne Lab mobil çalışan bir ekip — programlar Pera ve Kadıköy'deki partner mekânlarımızda gerçekleşiyor. Tam adres ve yol tarifi kayıt sonrası paylaşılıyor.`,
  },
  {
    q: 'Program ne kadar sürüyor?',
    a: `${w.duration}. Ders saatleri akşam üzeri planlanıyor — çalışanlar için ulaşılabilir olsun diye.`,
  },
  {
    q: 'Bir dersi kaçırırsam ne olur?',
    a: 'Dersler birbirinin üstüne bindiği için düzenli katılım önemli. Bir iki ders kaçırmak telafi edilebilir; sürekli devamsızlık hem seni hem grubu etkiler. Önceden haber vermeni rica ediyoruz.',
  },
  {
    q: 'Kayıt nasıl yapılıyor?',
    a: `${w.active ? 'Program sayfasındaki kayıt formunu doldurabilir ya da iletişim sayfasından bize yazabilirsin. Kontenjan sınırlı olduğu için erken kayıt öneriyoruz.' : 'Bu programın kaydı şu an kapalı. Yeni dönem açıldığında haberdar olmak için iletişim sayfasından bize yazabilirsin.'}`,
  },
]

export function getWorkshopFaq(w: Workshop): FaqItem[] {
  const cat = CATEGORY_FAQ[w.category]?.(w) ?? []
  return [...cat, ...COMMON_FAQ(w)]
}
