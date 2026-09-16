// ══════════════════════════════════════════════════════════════════
// EKİP — TEK VERİ KAYNAĞI
// /ekip (liste) ve /ekip/[slug] (bireysel eğitmen sayfası) buradan besleniyor.
// ══════════════════════════════════════════════════════════════════
import type { TeamMember } from '@/components/TeamGrid'

export type { TeamMember }

export const TEAM: TeamMember[] = [
  {
    name: 'Halil Yağız Şanal',
    slug: 'halil-yagiz-sanal',
    role: 'Kurucu · Genel Sanat Yönetmeni · Eğitmen',
    bio: 'Felsefe eğitimine paralel olarak tiyatroya yöneldi. GalataPerform\'da çağdaş oyun yazarlığı eğitimi aldı; Dramatik Yazarlık ve Dramaturji alanında lisans çalışmalarını sürdürdü. "Bir Yaz Gecesi Çöküşü" ile İKSV Senenin Oyunu ödüllü. 2026\'da Techne Lab İstanbul\'u kurdu.',
    image: '/images/team/halil-yagiz.jpg',
    programs: [{ label: 'The Auteur Lab', slug: 'auteur-lab' }],
  },
  {
    name: 'Sitare Bilge',
    slug: 'sitare-bilge',
    role: 'Dr. · Öğretim Üyesi · Eğitmen',
    bio: 'İÜDK Müzikal Tiyatro alanında doktorasını tamamlayan ve 2008\'den beri aynı kurumda öğretim üyesi olan ödüllü sanatçı Dr. Sitare Bilge; Jekyll & Hyde ve Gulyabani gibi büyük prodüksiyonlardaki başrol tecrübesini yönetmenlik vizyonuyla birleştiriyor. Grease ve Cabaret başta olmak üzere sayısız müzikali sahneye koyan, ulusal ve uluslararası prestijli ödüllere sahip Bilge; Müzikal programımızda katılımcıların vokal tekniklerini, şan ve müzikal oyunculuk performanslarını profesyonel sahne seviyesine taşıyor.',
    image: '/images/team/sitare-bilge.jpg',
    programs: [{ label: 'Techne Musical Lab', slug: 'techne-musical-lab' }],
  },
  {
    name: 'Yeşim Çelebi',
    slug: 'yesim-celebi',
    role: 'Eğitmen',
    bio: 'Yale Üniversitesi Tiyatro ve Performans Sanatları bölümünde başlayan sahne yolculuğunu, Londra\'da LAMDA disiplini ve New York\'ta Stella Adler & Lee Strasberg metotlarıyla global bir yetkinliğe dönüştürdü. Bu uluslararası vizyonu; Türkiye\'de Bahar, Kızılcık Şerbeti ve Netflix imzalı Mezarlık gibi prestijli projelerle ekrana taşıyan Yeşim Çelebi; İngilizce, İspanyolca ve Almanca dillerindeki hakimiyetini dans ve müzik disipliniyle harmanlayan çok yönlü bir performer. Şimdi ise akademik birikimini ve set tecrübesini Techne Lab çatısı altında paylaşıyor.',
    image: '/images/team/yesim-celebi.jpg',
    programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }],
  },
  {
    name: 'Ece Ertez',
    slug: 'ece-ertez',
    role: 'Eğitmen',
    bio: 'Oyunculuk pratiğini Şahika Tekand Studio Oyuncuları\'nın disiplinli fiziksel tiyatro ekolünde inşa eden Ece Ertez; Şahmaran ve Erşan Kuneri (Netflix) gibi uluslararası projelerin yanı sıra SİYAD ödüllü bağımsız sinema eserlerinde iz bırakan performanslara imza atmıştır. Chubbuck Metodu\'nda ustalaşan sanatçı, English Drama Lab\'de İngilizceyi ezberlenmiş bir metin olmaktan çıkarıyor; katılımcılara dili bedenin organik bir uzantısı olarak sahnede yaşatmanın şifrelerini sunuyor.',
    image: '/images/team/ece-ertez.jpg',
    programs: [
      { label: 'English Drama Lab', slug: 'english-drama-lab' },
      { label: 'English Acting Praxis', slug: 'english-drama-final-project' },
    ],
  },
  {
    name: 'Burcu Halaçoğlu',
    slug: 'burcu-halacoglu',
    role: 'Dr. · Öğretim Görevlisi · Eğitmen',
    bio: 'Doktora çalışmalarını "Çağdaş Oyunculuk Eğitiminde Mevcudiyet" kavramı üzerine tamamlayan Dr. Burcu Halaçoğlu, uluslararası Michael Chekhov Europe eğitmeni ve Michael Chekhov İstanbul\'un kurucu ortağıdır. İstanbul Bilgi Üniversitesi\'nde oyunculuk dersleri vermekte; kurucusu olduğu TiyatroPol\'deki yönetmenlik çalışmalarının yanı sıra Balat Monologlar Müzesi bünyesinde aktif oyunculuk kariyerini sürdürmektedir.',
    image: '/images/team/burcu-halacoglu.jpg',
    programs: [{ label: 'Oyuncunun Mevcudiyeti', slug: 'oyuncunun-mevcudiyeti' }],
  },
  {
    name: 'Alara Lokum',
    slug: 'alara-lokum',
    role: 'Eğitmen',
    bio: 'Tiyatro serüvenine çocuk yaşta Şehir Tiyatroları\'nda adım atan ve akademik temelini Kadir Has Üniversitesi Tiyatro Bölümü\'nde kurgulayan Alara Lokum, Amerika ve İtalya\'daki eğitimleriyle oyunculuk pratiğine global bir vizyon kazandırmıştır. Uluslararası deneyimleriyle şekillenen anadil seviyesindeki İngilizce hakimiyetini English Drama Lab\'e taşıyan sanatçı; İngilizceyi bir "ders" olmaktan çıkarıyor, katılımcılara dili sahnede özgür bir ifade aracı olarak kullanmanın yollarını açıyor.',
    image: '/images/team/alara-lokum.jpg',
    programs: [
      { label: 'English Drama Lab', slug: 'english-drama-lab' },
      { label: 'English Drama Youth', slug: 'english-drama-youth' },
    ],
  },
  {
    name: 'Köksal Ünal',
    slug: 'koksal-unal',
    role: 'Ödüllü Koreograf · Öğretim Görevlisi · Eğitmen',
    bio: 'YTÜ Dans Bölümü ve Haliç Üniversitesi Tiyatro Yüksek Lisansı mezunu ödüllü koreograf Köksal Ünal; Devlet ve Şehir Tiyatroları\'ndaki köklü sahne tecrübesini müzikal dinamikleriyle birleştiriyor. 2017 Yılın Koreografisi ödülü sahibi olan Ünal, İstanbul Üniversitesi ve Bahçeşehir Üniversitesi konservatuvarlarındaki eğitimlerin ardından günümüzde İstanbul Aydın Üniversitesi GSF Tiyatro Bölümü\'nde hareket, çağdaş dans ve fiziksel tiyatro üzerine öğretim görevlisi olarak çalışmalarını sürdürüyor.',
    image: '/images/team/koksal-unal.jpg',
    programs: [
      { label: 'Techne Musical Lab', slug: 'techne-musical-lab' },
      { label: 'Broadway Musical Dance', slug: 'broadway-musical-dance' },
    ],
  },
]

export function getTeamMember(slug: string) {
  return TEAM.find((m) => m.slug === slug)
}

/** Makale yazarı adını (frontmatter `author`) ekip üyesiyle eşleştir. */
export function findTeamMemberByName(name?: string) {
  if (!name) return undefined
  const n = name.trim()
  return TEAM.find((m) => m.name === n || n.includes(m.name))
}

/**
 * Bir atölyenin `instructor` metnini ("Alara Lokum, Ece Ertez & Yeşim Çelebi" gibi)
 * TEAM üyeleriyle eşleştirir. Program detay sayfasında eğitmen adını
 * /ekip/[slug] profiline bağlamak için kullanılır.
 */
export function findTeamMembersForInstructor(instructor?: string): TeamMember[] {
  if (!instructor || instructor === 'Techne Lab') return []
  const names = instructor.split(/,|&| ve /).map((s) => s.trim()).filter(Boolean)
  return names
    .map((n) => TEAM.find((m) => m.name === n || n.includes(m.name)))
    .filter((m): m is TeamMember => Boolean(m))
}

/** Kartlarda gösterilen unvan satırı — bkz. lib/roleLabel.ts */
export { displayRole } from './roleLabel'
