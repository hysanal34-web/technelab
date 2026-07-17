import Link from 'next/link'

const IG_IMAGES = [
  '/images/gallery/auteur-01.jpg',
  '/images/gallery/english-drama-3.jpg',
  '/images/gallery/musical-01.jpg',
  '/images/gallery/mevcudiyet-07.jpg',
  '/images/gallery/dslr-zl5a1044.jpg',
  '/images/gallery/english-drama-11.jpg',
]

const IG_URL = 'https://instagram.com/technelabistanbul'
const IG_HANDLE = '@technelabistanbul'

export function InstagramSection() {
  return (
    <section className="border-b border-border bg-bgAlt" aria-label="Instagram">
      {/* Header */}
      <div className="px-10 md:px-14 py-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border">
        <div>
          <p className="font-mono text-[10px] tracking-widest2 uppercase text-stone mb-3">
            — instagram
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-fg hover:text-neon transition-colors duration-200 leading-none"
            style={{ fontSize: 'clamp(24px, 4.5vw, 60px)', letterSpacing: '0.02em' }}
          >
            {IG_HANDLE}
          </a>
          <p className="font-mono text-[10px] text-stone mt-2">
            Atölyeler, gösteriler, sahne arkası &amp; duyurular.
          </p>
        </div>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase border border-neon text-neon px-6 py-3 hover:bg-neon hover:text-bg transition-all duration-200 self-start md:self-end whitespace-nowrap"
        >
          {/* Instagram icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          takip et →
        </a>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-border">
        {IG_IMAGES.map((src, i) => (
          <a
            key={i}
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group bg-bg"
            aria-label={`Instagram'da gör — ${IG_HANDLE}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/20 transition-colors duration-300" />
            {/* Instagram icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
              </svg>
            </div>
            {/* Neon corner accent */}
            <div className="absolute top-0 left-0 w-4 h-px bg-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 h-4 w-px bg-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-10 md:px-14 py-6 flex items-center justify-between">
        <span className="font-mono text-[11px] text-dim tracking-[0.1em] uppercase">
          güncel içerik için bizi takip edin
        </span>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.12em] text-stone hover:text-neon transition-colors duration-200"
        >
          instagram.com/technelabistanbul →
        </a>
      </div>
    </section>
  )
}
