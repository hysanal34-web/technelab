import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { TeamGrid, type TeamMember } from '@/components/TeamGrid'

export const metadata: Metadata = {
  title: 'Ekip — Eğitmenler & Sanatçılar',
  description:
    'Techne Lab İstanbul ekibi: oyuncular, yönetmenler, koreograflar ve eğitmenler. Sekiz sanatçı, dört disiplin, tek sahne. Taksim & Kadıköy.',
  alternates: { canonical: `${SITE_META.url}/ekip` },
  openGraph: {
    title: 'Ekip — Techne Lab İstanbul',
    description: 'Sekiz sanatçı, dört disiplin, tek sahne.',
    url: `${SITE_META.url}/ekip`,
  },
}

// Türkçe alfabetik sıraya göre soyadı
const TEAM: TeamMember[] = [
  {
    name: 'Sitare Bilge',
    slug: 'sitare-bilge',
    role: 'Ses & Şan Eğitmeni',
    bio: 'Sesi bir araç olarak görür, şanı sadece teknikten değil dramaturjiden de okur. Müzikal sahnede kişisel sesin nasıl var olduğuyla ilgilenir.',
    programs: [{ label: 'Techne Musical Lab', slug: 'techne-musical-lab' }],
  },
  {
    name: 'Yeşim Çelebi',
    slug: 'yesim-celebi',
    role: 'Oyuncu · Yaratıcı Drama Eğitmeni',
    bio: 'Oyunculuk ve yaratıcı drama pratiğini gündelik dilin içinde arar. Sınıfı bir oyun alanı olarak görür; kurguyu ciddiye alırken oyunu da kaybetmez.',
    programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }],
  },
  {
    name: 'Ece Ertez',
    slug: 'ece-ertez',
    role: 'Oyuncu · İngilizce Tiyatro Eğitmeni',
    bio: 'İngilizce metni bir sahne dili olarak ele alır. Dili öğretmez — dili kullanır. Oyunculuğu İngilizce üzerinden çalışmak isteyenler için.',
    programs: [
      { label: 'English Acting Praxis', slug: 'english-drama-final-project' },
    ],
  },
  {
    name: 'Burcu Halaçoğlu',
    slug: 'burcu-halacoglu',
    role: 'Oyuncu · Beden Çalışması Eğitmeni',
    bio: 'Sahne mevcudiyetini beden üzerinden araştırır. Sessizlikle, nefesle ve zemin ile ilişkiyle çalışır. Fiziksel farkındalık onun için bir başlangıç noktası.',
    programs: [{ label: 'Oyuncunun Mevcudiyeti', slug: 'oyuncunun-mevcudiyeti' }],
  },
  {
    name: 'Alara Lokum',
    slug: 'alara-lokum',
    role: 'Oyuncu · Yaratıcı Drama Eğitmeni',
    bio: 'İngilizce yaratıcı anlatım ve doğaçlama üzerine çalışan oyuncu-eğitmen. Grubu bir sahne topluluğu gibi kurar.',
    programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }],
  },
  {
    name: 'Halil Yağız Şanal',
    slug: 'halil-yagiz-sanal',
    role: 'Genel Sanat Yönetmeni',
    bio: 'Techne Lab\'ın kurucusu. İstanbul Üniversitesi Felsefe\'den tiyatroya geçen, GalataPerform\'da iki yıl oyun yazarlığı çalışan dramaturg. "Bir Yaz Gecesi Çöküşü" ile YeniMetin Festivali\'nden İKSV Senenin Oyunu ödülü.',
    programs: [{ label: 'The Auteur Lab', slug: 'auteur-lab' }],
  },
  {
    name: 'Selen Uçer',
    slug: 'selen-ucer',
    role: 'Oyuncu · Kamera Önü Eğitmeni',
    bio: 'Lens önündeki oyuncuyu tanıyan biri — çerçeveyi, enerjiyi, zamanlamayı. Kamera ve sahne arasındaki geçişi öğretir.',
    programs: [{ label: 'Camera Praxis', slug: 'camera-praxis' }],
  },
  {
    name: 'Köksal Ünal',
    slug: 'koksal-unal',
    role: 'Oyuncu · Koreograf · Hareket Eğitmeni',
    bio: 'YTÜ Sahne Sanatları ve İÜ Konservatuvar müzikal tiyatro sertifikası. Bahçeşehir Üniversitesi Konservatuvarı\'nda öğretim görevlisi. İBB Şehir Tiyatroları, Trabzon Devlet Tiyatrosu koreografı. En İyi Koreografi ödüllü.',
    programs: [
      { label: 'Techne Musical Lab', slug: 'techne-musical-lab' },
      { label: 'Broadway Musical Dance', slug: 'broadway-musical-dance' },
    ],
  },
]

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
