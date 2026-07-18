import Link from 'next/link'
import Image from 'next/image'
import type { Workshop } from '@/lib/data'

const ROW_IMAGES: Record<string, string> = {
  'auteur-lab':                      '/images/gallery/auteur-01.jpg',
  'english-drama-lab':               '/images/gallery/english-drama-3.jpg',
  'english-drama-youth':             '/images/gallery/english-drama-1.jpg',
  'broadway-musical-dance':          '/images/gallery/dslr-zl5a1044.jpg',
  'camera-praxis':                   '/images/instructor-2.jpg',
  'techne-musical-lab':              '/images/gallery/musical-01.jpg',
  'oyuncunun-mevcudiyeti':           '/images/gallery/mevcudiyet-03.jpg',
  'english-drama-final-project':     '/images/gallery/english-drama-11.jpg',
}

export function WorkshopRow({ workshop: w }: { workshop: Workshop }) {
  const imgSrc = ROW_IMAGES[w.slug]
  const isPassive = !w.active

  return (
    <article className={`border-b border-border last:border-b-0 first:border-t border-t-0 group ${isPassive ? 'opacity-60' : ''}`}>
      <Link
        href={`/atolyeler/${w.slug}`}
        className="grid grid-cols-[48px_56px_1fr] md:grid-cols-[64px_80px_1fr_2fr_auto] gap-x-4 md:gap-x-8 gap-y-0 items-center py-7 px-4 md:px-0 hover:bg-bgAlt transition-colors duration-200"
        data-hover
      >
        {/* ── Kod ── */}
        <div className="font-display text-[36px] md:text-[48px] text-mid leading-none group-hover:text-neon transition-colors duration-300">
          {w.code}
        </div>

        {/* ── Küçük Kapak Fotoğrafı ── */}
        <div className="relative w-14 h-14 md:w-[72px] md:h-[72px] flex-shrink-0 overflow-hidden bg-bgAlt border border-border/40">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={w.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500 scale-105 group-hover:scale-100"
            />
          ) : (
            <div className="absolute inset-0 bauhaus-grid" />
          )}
          {/* subtle neon corner on hover */}
          <div className="absolute top-0 left-0 w-4 h-px bg-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 h-4 w-px bg-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* ── Başlık + alt bilgi ── */}
        <div>
          <h3
            className="font-display leading-none mb-1"
            style={{ fontSize: 'clamp(16px,2.2vw,30px)', letterSpacing: '0.02em' }}
          >
            {w.title}
          </h3>
          <p className="font-mono text-[11px] italic text-stone">{w.sub}</p>
        </div>

        {/* ── Tagline + desc — sadece masaüstü ── */}
        <div className="hidden md:block">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim mb-2">{w.tagline}</p>
          <p className="font-mono text-[13px] text-stone leading-relaxed line-clamp-2">{w.desc}</p>
        </div>

        {/* ── Meta + CTA — sadece masaüstü ── */}
        <div className="text-right hidden md:block">
          <div className="font-mono text-[11px] text-dim mb-1">{w.venue}</div>
          <div className="font-mono text-[11px] text-dim mb-4">{w.duration}</div>
          {isPassive ? (
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone border border-stone/40 px-3 py-1.5">
              yakında
            </span>
          ) : (
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon border border-neon px-3 py-1.5 group-hover:bg-neon group-hover:text-bg transition-all duration-200">
              detay →
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
