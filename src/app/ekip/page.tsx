import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'

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

// Türkçe alfabetik sıraya göre soyadı (B, Ç, E, H, L, Ş, U, Ü)
const TEAM: {
  name: string
  role: string
  programs: { label: string; slug: string }[]
}[] = [
  { name: 'Sitare Bilge',      role: 'Ses & Şan Eğitmeni',                     programs: [{ label: 'Techne Musical Lab', slug: 'techne-musical-lab' }] },
  { name: 'Yeşim Çelebi',      role: 'Oyuncu · Yaratıcı Drama Eğitmeni',       programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }] },
  { name: 'Ece Ertez',         role: 'Oyuncu · İngilizce Tiyatro Eğitmeni',    programs: [{ label: 'EDL Acting Focus', slug: 'english-drama-acting-focus' }] },
  { name: 'Burcu Halaçoğlu',   role: 'Oyuncu · Beden Çalışması Eğitmeni',      programs: [{ label: 'Oyuncunun Mevcudiyeti', slug: 'oyuncunun-mevcudiyeti' }] },
  { name: 'Alara Lokum',       role: 'Oyuncu · Yaratıcı Drama Eğitmeni',       programs: [{ label: 'English Drama Lab', slug: 'english-drama-lab' }] },
  { name: 'Halil Yağız Şanal', role: 'Genel Sanat Yönetmeni',                  programs: [{ label: 'The Auteur Lab', slug: 'auteur-lab' }] },
  { name: 'Selen Uçer',        role: 'Oyuncu · Kamera Önü Eğitmeni',           programs: [{ label: 'Camera Praxis', slug: 'camera-praxis' }] },
  { name: 'Köksal Ünal',       role: 'Oyuncu · Koreograf · Hareket Eğitmeni',  programs: [{ label: 'Techne Musical Lab', slug: 'techne-musical-lab' }, { label: 'Broadway Musical Dance', slug: 'broadway-musical-dance' }] },
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

export default function EkipPage() {
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

      {/* Credits list */}
      <section className="px-4 md:px-14 pb-24">
        {TEAM.map((member, i) => (
          <article key={member.name} className="group border-b border-border">
            <div
              className="py-8 md:py-10 flex flex-col md:grid md:items-baseline gap-2 md:gap-10 hover:bg-bgAlt transition-colors duration-200 -mx-4 md:-mx-14 px-4 md:px-14"
              style={{ gridTemplateColumns: '2.5rem 1fr auto' }}
            >
              {/* Index */}
              <span className="font-mono text-[11px] tracking-[0.12em] text-dim/40 hidden md:block pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Name */}
              <h2
                className="font-display text-fg leading-none"
                style={{ fontSize: 'clamp(22px, 3vw, 44px)', letterSpacing: '0.01em' }}
              >
                {member.name}
              </h2>

              {/* Role + program links */}
              <div className="md:text-right">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon mb-1.5">
                  {member.role}
                </p>
                <div className="flex md:justify-end flex-wrap gap-x-3 gap-y-1">
                  {member.programs.map((p) => (
                    <Link
                      key={p.slug + p.label}
                      href={`/atolyeler/${p.slug}`}
                      className="font-mono text-[11px] tracking-[0.10em] uppercase text-dim hover:text-fg border-b border-transparent hover:border-neon transition-colors duration-200"
                      data-hover
                    >
                      {p.label} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
