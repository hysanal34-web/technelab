import Image from 'next/image'
import Link from 'next/link'

/**
 * Ana sayfa eğitmen şeridi.
 * Eskiden burada "6 Atölye / 2026 Kuruluş / 3 Mekân / ∞ Pratik" rakamları vardı;
 * yeni bir markanın en zayıf kartı geçmişidir, en güçlü kartı kadrosudur.
 * Kısa ve kanıtlanabilir kimlikler — şişirme yok.
 */

const FACES = [
  { name: 'Sitare Bilge',      slug: 'sitare-bilge',      image: '/images/team/sitare-bilge.jpg' },
  { name: 'Köksal Ünal',       slug: 'koksal-unal',       image: '/images/team/koksal-unal.jpg' },
  { name: 'Burcu Halaçoğlu',   slug: 'burcu-halacoglu',   image: '/images/team/burcu-halacoglu.jpg' },
  { name: 'Yeşim Çelebi',      slug: 'yesim-celebi',      image: '/images/team/yesim-celebi.jpg' },
  { name: 'Ece Ertez',         slug: 'ece-ertez',         image: '/images/team/ece-ertez.jpg' },
  { name: 'Alara Lokum',       slug: 'alara-lokum',       image: '/images/team/alara-lokum.jpg' },
  { name: 'Selen Uçer',        slug: 'selen-ucer',        image: '/images/team/selen-ucer.jpg' },
  { name: 'Halil Yağız Şanal', slug: 'halil-yagiz-sanal', image: '/images/team/halil-yagiz.jpg' },
]

export function InstructorStrip() {
  return (
    <section className="border-b border-border bg-bgAlt" aria-labelledby="egitmenler-heading">
      <div className="px-4 md:px-14 pt-16 pb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">
            — kimlerle çalışıyorsun
          </p>
          <h2
            id="egitmenler-heading"
            className="font-display text-fg leading-none"
            style={{ fontSize: 'clamp(28px,4.5vw,60px)', letterSpacing: '0.02em' }}
          >
            SAHNEYİ BİLENLER
          </h2>
        </div>
        <Link
          href="/hakkinda#ekip"
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone hover:text-neon transition-colors duration-200 pb-2"
          data-hover
        >
          tüm ekip →
        </Link>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-border border-t border-border">
        {FACES.map((p) => (
          <li key={p.name} className="bg-bg">
            {/* Doğrudan o kişinin biyografisine — ekip sayfasında tekrar tıklatmıyoruz */}
            <Link
              href={`/hakkinda?open=${p.slug}#ekip`}
              className="group block"
              aria-label={`${p.name} — biyografi`}
              data-hover
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 15vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{ filter: 'brightness(0.82)' }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,12,0.92), transparent)' }}
                />
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
              <div className="px-4 py-4">
                <p
                  className="font-display text-fg group-hover:text-neon transition-colors duration-200 leading-tight"
                  style={{ fontSize: 17, letterSpacing: '0.02em' }}
                >
                  {p.name.toUpperCase()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
