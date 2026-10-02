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
      q: 'Atölyelerde ne yapılıyor?',
      a: 'Beden ve nefes ısınması, doğaçlama, metin çalışması ve sahne kurma. Her oturum bir öncekinin üstüne biniyor — bu yüzden düzenli katılım önemli.',
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
      // Seyircili finalle biten programlar: Acting Praxis, Youth ve Musical Lab.
      // Önceden yalnızca Acting Praxis kontrol ediliyordu; Youth ve Musical Lab
      // için "kimse sahneye itilmiyor" cevabı veriliyordu — yanlış bilgiydi.
      a: `${['english-drama-final-project', 'english-drama-youth', 'techne-musical-lab'].includes(w.slug)
        ? 'Evet — bu program seyirci önünde bir final gösterisiyle kapanıyor. Sahnedeki payın kendi hızına göre belirleniyor, kimse hazır olmadığı bir yere itilmiyor.'
        : 'Hayır. Çalışma grup içinde kalıyor. Seyircili final gösterisiyle biten ayrı programlarımız var, ama bu programda sahneye çıkma zorunluluğu yok.'}`,
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
      // ageRange varsa onu yaz — sabit "18 yaş ve üzeri" metni sayfadaki
      // yaş satırıyla çelişiyordu (Broadway 12–55, Musical Lab 15–55).
      a: `${w.ageRange ? `Program ${w.ageRange} arası katılımcılara açık.` : 'Yetişkin programı — 18 yaş ve üzeri.'} Fiziksel bir çalışma olduğu için ciddi bir sakatlık ya da rahatsızlığın varsa kayıt öncesinde bize yazmanı öneriyoruz.`,
    },
    {
      q: 'Ne giymeliyim?',
      a: 'Hareket etmeyi engellemeyen rahat kıyafet ve zeminde kaymayan ayakkabı. Jazz ayakkabısı zorunlu değil — ilk haftalarda spor ayakkabı yeterli.',
    },
  ],
}

// ══════════════════════════════════════════════════════════════════
// PROGRAMA ÖZEL SSS — kategori sorularına ek, yalnızca o programda çıkar.
// Kategori ve ortak sorularla çakışmasın: şan geçmişi, yaş sınırı, yer,
// süre ve kayıt soruları yukarıda zaten var.
// Kaynaklar: data.ts (blocks, facts, maxStudents, schedule), basvuru.ts
// (video alanı), tanisma-gunu/sessions.ts. Fiyat ve burs tutarı yazılmaz.
// ══════════════════════════════════════════════════════════════════
const PROGRAM_FAQ: Record<string, (w: Workshop) => FaqItem[]> = {
  'techne-musical-lab': (w) => [
    {
      q: 'Başvuru videosu nasıl olmalı?',
      a: 'Bir müzikal ya da pop şarkıyı seslendirdiğin 1-2 dakikalık kısa bir video yeterli. Telefonla çekilmiş olması sorun değil; önemli olan sesinin net duyulması. Videoyu YouTube ya da Google Drive gibi bir yere yükleyip bağlantısını başvuru formuna ekliyorsun; bağlantının herkese açık olduğundan emin ol. Formda şan ve dans geçmişin de soruluyor.',
    },
    {
      q: 'Video incelemesinde neye bakılıyor, bir eleme sınavı mı?',
      a: 'Kabul video incelemesiyle yapılıyor, ama aranan şey kusursuz bir performans değil. Video, sesinin bugün nerede durduğunu görmemizi ve en fazla ' + String(w.maxStudents) + ' kişilik grubu dengeli kurmamızı sağlıyor. Şarkıyı ne anlattığını bilerek söylemen, teknik pürüzlerden daha çok şey söylüyor.',
    },
    {
      q: 'Sekiz ay nasıl ilerliyor, haftada kaç gün çalışılıyor?',
      a: 'Program Ekim\'den Mayıs\'a, haftada iki gün yürüyor ve üç bloktan oluşuyor. Ekim-Aralık: Oyunculuk & Şan; sahne varlığı, karakter inşası ve vokal teknik. Ocak-Mart: Müzikal Sahneleme; müzikal ritim, Broadway dans temelleri, şarkıyla sahne hareketinin birleştiği koreografi. Nisan-Mayıs: Yıl Sonu Gösterisi.',
    },
    {
      q: 'Yıl sonu gösterisi nedir?',
      a: 'Dönemin son bloğu (Nisan-Mayıs) sahnelenmiş bir müzikal üzerine kurulu: kostüm, ışık ve dekorla, seyirci önünde tam bir prodüksiyon. Stüdyo içi bir sunum değil; sekiz ay boyunca çalışılan oyunculuk, şan ve dansın gerçek sahne koşullarında bir araya geldiği yer.',
    },
    {
      q: '15 yaşındaki bir katılımcı ile 50 yaşındaki aynı grupta mı çalışıyor?',
      a: 'Evet. Program 15-55 yaş aralığına açık ve tek bir grup olarak, en fazla ' + String(w.maxStudents) + ' kişiyle yürüyor. Müzikal sahnesi zaten farklı yaşlardan karakterlerle kuruluyor; karma grup bu yüzden çalışmanın doğal bir parçası.',
    },
    {
      q: 'Kayıt öncesi tanışma günü var mı?',
      a: 'Evet. Programı ve eğitmenleri yakından görmek için ücretsiz tanışma günü seanslarına katılabilirsin; güncel seanslar tanışma günü sayfasında listeleniyor. Tanışma seansının yeri programın yürüdüğü yerden farklı olabilir: program Kadıköy\'de, seans yeri ve saati sayfada ayrıca yazıyor.',
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
    a: `${w.duration}. Atölye saatleri akşam üzeri planlanıyor — çalışanlar için ulaşılabilir olsun diye.`,
  },
  {
    q: 'Bir oturumu kaçırırsam ne olur?',
    a: 'Oturumlar birbirinin üstüne bindiği için düzenli katılım önemli. Bir iki hafta kaçırmak telafi edilebilir; sürekli devamsızlık hem seni hem grubu etkiler. Önceden haber vermeni rica ediyoruz.',
  },
  {
    q: 'Kayıt nasıl yapılıyor?',
    a: `${w.active ? 'Program sayfasındaki kayıt formunu doldurabilir ya da iletişim sayfasından bize yazabilirsin. Kontenjan sınırlı — grupların dolmadan başvurmanı öneriyoruz.' : 'Bu programın kaydı şu an kapalı. Yeni dönem açıldığında haberdar olmak için iletişim sayfasından bize yazabilirsin.'}`,
  },
]

export function getWorkshopFaq(w: Workshop): FaqItem[] {
  const cat = CATEGORY_FAQ[w.category]?.(w) ?? []
  const program = PROGRAM_FAQ[w.slug]?.(w) ?? []
  return [...cat, ...program, ...COMMON_FAQ(w)]
}
