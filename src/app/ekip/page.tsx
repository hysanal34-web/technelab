import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { TeamGrid, type TeamMember } from '@/components/TeamGrid'

export const metadata: Metadata = {
  title: 'Ekip — Eğitmenler & Sanatçılar',
  description:
    'Techne Lab İstanbul ekibi: oyuncular, yönetmenler, koreograflar ve eğitmenler. Yedi sanatçı, dört disiplin, tek sahne. Taksim & Kadıköy.',
  alternates: { canonical: `${SITE_META.url}/ekip` },
  openGraph: {
    title: 'Ekip — Techne Lab İstanbul',
    description: 'Yedi sanatçı, dört disiplin, tek sahne.',
    url: `${SITE_META.url}/ekip`,
  },
}

const TEAM: TeamMember[] = [
  {
    name: 'Halil Yağız Şanal',
    slug: 'halil-yagiz-sanal',
    role: 'Kurucu · Genel Sanat Yönetmeni · Eğitmen',
    bio: 'Felsefe eğitimine paralel olarak tiyatroya yöneldi. GalataPerform\'da çağdaş oyun yazarlığı eğitimi aldı; Dramatik Yazarlık ve Dramaturji alanında lisans çalışmalarını sürdürdü. "Bir Yaz Gecesi Çöküşü" ile İKSV Senenin Oyunu ödüllü. 2026\'da Techne Lab İstanbul\'u kurdu.',
    programs: [{ label: 'The Auteur Lab', slug: 'auteur-lab' }],
  },
  {
    name: 'Sitare Bilge',
    slug: 'sitare-bilge',
    role: 'Eğitmen',
    bio: 'Sesi bir araç olarak görür, şanı sadece teknikten değil dramaturjiden de okur. Müzikal sahnede kişisel sesin nasıl var olduğuyla ilgilenir.',
    programs: [{ label: 'Techne Musical Lab', slug: 'techne-musical-lab' }],
  },
  {
    name: 'Yeşim Çelebi',
    slug: 'yesim-celebi',
    role: 'Eğitmen',
    bio: 'Yale Üniversitesi Tiyatro ve Performans Sanatları lisansının ardından LAMDA (Londra), Stella Adler ve Lee Strasberg (New York) programlarını tamamladı. Show TV ve Netflix yapımlarında oynadı. Sınıfı bir oyun alanı olarak görür; kurguyu ciddiye alırken oyunu da kaybetmez.',
    programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }],
  },
  {
    name: 'Ece Ertez',
    slug: 'ece-ertez',
    role: 'Eğitmen',
    bio: 'İngilizce metni bir sahne dili olarak ele alır. Dili öğretmez — dili kullanır.',
    programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }],
  },
  {
    name: 'Burcu Halaçoğlu',
    slug: 'burcu-halacoglu',
    role: 'Eğitmen',
    bio: 'Sahne mevcudiyetini beden üzerinden araştırır. Sessizlik, nefes ve zemin ile ilişki onun için bir başlangıç noktası.',
    programs: [{ label: 'Oyuncunun Mevcudiyeti', slug: 'oyuncunun-mevcudiyeti' }],
  },
  {
    name: 'Alara Lokum',
    slug: 'alara-lokum',
    role: 'Eğitmen',
    bio: 'Kadir Has Üniversitesi Tiyatro Bölümü mezunu. Şahika Tekand Stüdyo Oyuncuları\'nda çalıştı. Sahne ve ekran deneyimini eğitim pratiğine taşır. İngilizce yaratıcı anlatım ve doğaçlama üzerine çalışır.',
    programs: [
      { label: 'English Drama Lab', slug: 'english-drama-lab' },
      { label: 'English Drama Youth', slug: 'english-drama-youth' },
    ],
  },
  {
    name: 'Köksal Ünal',
    slug: 'koksal-unal',
    role: 'Eğitmen',
    bio: 'Yıldız Teknik Üniversitesi Sahne Sanatları mezunu; Haliç Üniversitesi\'nde Tiyatro alanında yüksek lisanslı. İÜ Devlet Konservatuvarı Müzikal Tiyatro sertifikalı. İBB Şehir Tiyatroları ve Trabzon Devlet Tiyatrosu\'nda oyuncu ve koreograf olarak çalıştı. Bahçeşehir Üniversitesi Konservatuvarı ve İÜ Devlet Konservatuvarı öğretim görevlisi. En İyi Koreografi ödüllü.',
    programs: [
      { label: 'Techne Musical Lab', slug: 'techne-musical-lab' },
      { label: 'Broadway Musical Dance', slug: 'broadway-musical-dance' },
    ],
  },
]

// Selen Uçer — arşivde, program kesinleşmedi
// {
//   name: 'Selen Uçer', slug: 'selen-ucer', role: 'Eğitmen',
//   bio: 'Roosevelt Üniversitesi (Chicago) Tiyatro yüksek lisanslı. Boğaziçi Üniversitesi\'nde Kimya lisansının ardından sahneye geçti. New York\'ta off-Broadway projelerde yer aldı. Çok sayıda ulusal ve uluslararası ödüllü film ve tiyatro çalışması var.',
//   programs: [{ label: 'Camera Praxis', slug: 'camera-praxis' }],
// }

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_META.name,
  url: SITE_META.url,
  member: TEAM.map((m) => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    worksFor: { '@type': 'Organization', name: SITE_META.name },
  })),
}

type Props = { searchParams: Promise<{ open?: string }> }

export default async function EkipPage({ searchParams }: Props) {
  const { open } = await searchParams

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Neon top rule */}
      <div className="h-[3px] w-full bg-neon" />

      {/* Header */}
      <section className="px-4 md:px-14 pt-24 pb-12 border-b border-border relative overflow-hidden">
        <div
          className="absolute -top-4 -right-4 font-display leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(80px,14vw,200px)', color: 'transparent', WebkitTextStroke: '1px rgba(200,255,0,0.07)' }}
          aria-hidden="true"
        >
          CAST
        </div>
        <div className="flex items-end justify-between relative z-10">
          <div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">techne lab — ekip</p>
            <h1
              className="font-display text-fg"
              style={{ fontSize: 'clamp(44px, 7.5vw, 108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}
            >
              EKİP
            </h1>
          </div>
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim pb-2">
            {TEAM.length}&nbsp;sanatçı
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="pb-24">
        <TeamGrid members={TEAM} initialOpen={open} />
      </section>
    </>
  )
}
