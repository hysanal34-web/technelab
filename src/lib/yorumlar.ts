/**
 * Katılımcı yorumları.
 *
 * GİZLİLİK: Katılımcılar yorumlarını baş harfleriyle paylaşılmak üzere verdi.
 * Tam isim EKLEME — açık rıza olmadan isim yayınlanmaz.
 *
 * Yapı bilinçli olarak iki soruya dayanıyor:
 *   çekince → gelmeden önce ne endişelendiriyordu
 *   sonuç   → bittiğinde beklemediği ne değişti
 * Bu ikili, karar aşamasındaki ziyaretçinin kendi tereddüdünü görmesini sağlıyor.
 */

export type Yorum = {
  id: string
  initials: string
  meslek: string
  yas?: number
  /** Ekranda gösterilen program adı — birden fazlaysa "A & B" */
  program: string
  /** Bağlanacak program slug'ları; katılımcı birden fazla programa katılmış olabilir */
  programSlugs?: string[]
  cekince: string
  sonuc: string
  /** Ana sayfada öne çıkan 3 yorumdan biri mi */
  one_cikan?: boolean
}

export const YORUMLAR: Yorum[] = [
  {
    id: 'et',
    initials: 'E.T.',
    meslek: 'Reklamcı',
    yas: 44,
    program: 'English Drama Lab & The Auteur Lab',
    programSlugs: ['english-drama-lab', 'auteur-lab'],
    cekince:
      'Technelab\'le hayatımda biraz sıkışmış hissettiğim bir dönemde tanıştım. Yeni bir şey denemeye çok ihtiyacım vardı ama alıştığım dünyanın oldukça dışında bir grubun içine girmek bende soru işaretleri yaratıyordu.',
    sonuc:
      'En büyük sürpriz, görünür olmakla ve sahneyle kurduğum ilişkinin değişmesi oldu. Bir noktada sadece bir atölyeye katılmıyordum; yeniden oyun oynuyor, deniyor, saçmalıyor, kendimi gösteriyor ve bundan keyif alıyordum. Bazen korkunun geçmesi için üzerine çok düşünmek değil, kendine güvenli bir yerde "hadi bir deneyeyim" deme izni vermek gerekiyormuş.',
    one_cikan: true,
  },
  {
    id: 'ca',
    initials: 'C.A.',
    meslek: 'Kaynak Geliştirme Uzmanı',
    yas: 24,
    program: 'The Auteur Lab',
    programSlugs: ['auteur-lab'],
    cekince:
      'Programa katılmadan önce yazı yazma konusunda iyi olup olamayacağıma dair çekincelerim vardı.',
    sonuc:
      'Artık tiyatro metinlerini farklı bir bakış açısıyla inceliyorum. Bir oyunu daha fazla irdeleyerek ve derinlemesine analiz ederek okuyabiliyorum.',
    one_cikan: true,
  },
  {
    id: 'ek',
    initials: 'E.K.',
    meslek: '',
    program: 'English Drama Lab',
    programSlugs: ['english-drama-lab'],
    cekince:
      'Gelmeden önce çekincem, İngilizce seviyesinin Türkiye genelindeki gibi olacağı yönündeydi — bir iki öğrenci hariç yanılmışım.',
    sonuc:
      'Bittiğinde İngilizce sahne oynama ve emprovizasyon yeteneğim gelişti.',
    one_cikan: true,
  },
  {
    id: 'sd',
    initials: 'S.D.',
    meslek: 'Öğrenci / Pazarlamacı',
    yas: 23,
    program: 'Broadway Musical Dance',
    programSlugs: ['broadway-musical-dance'],
    cekince: 'Bale temelli koreografilerde yetersiz kalacağımdan çekiniyordum.',
    sonuc:
      'Yalnızca bir koreografi üzerinden daha önce yapamadığım, hiç yapmadığım hareketleri öğrenebilmiş oldum. Spesifik olarak pirouettelerim kısa zamanda gelişti.',
  },
  {
    id: 'pd',
    initials: 'P.D.',
    meslek: 'Öğretim Görevlisi',
    yas: 42,
    program: 'Broadway Musical Dance',
    programSlugs: ['broadway-musical-dance'],
    cekince:
      'Sınıfların kontenjanının gereğinden fazla doldurulmuş olacağını, ders alanının yetersiz kalabileceğini düşünüyordum.',
    sonuc: 'Her görüşümüz dikkate alındı, Yağız\'la arkadaş olduk.',
  },
]

export function yorumlarFor(slug: string): Yorum[] {
  return YORUMLAR.filter((y) => y.programSlugs?.includes(slug))
}

export const oneCikanYorumlar = YORUMLAR.filter((y) => y.one_cikan)
