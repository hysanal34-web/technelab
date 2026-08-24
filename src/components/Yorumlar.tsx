import Link from 'next/link'
import { YORUMLAR, type Yorum } from '@/lib/yorumlar'

/**
 * Katılımcı yorumları.
 *
 * "Çekince → sonuç" yapısı bilinçli: karar aşamasındaki ziyaretçi kendi
 * tereddüdünü birinin ağzından okuyunca, o tereddüdün aşılabilir olduğunu görüyor.
 * Reklam metni değil, gerçek cümleler — bu yüzden düzeltilmeden, olduğu gibi duruyor.
 */

function YorumKart({ y }: { y: Yorum }) {
  const kimlik = [y.meslek, y.yas ? `${y.yas}` : null].filter(Boolean).join(' · ')

  return (
    <article className="bg-bg p-6 md:p-8 flex flex-col">
      {/* Çekince */}
      <div className="mb-5">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-dim block mb-2">
          gelmeden önce
        </span>
        <p className="font-mono text-[12px] leading-relaxed text-stone">
          {y.cekince}
        </p>
      </div>

      {/* Ayırıcı */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-px bg-neon" aria-hidden="true" />
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon">
          sonra
        </span>
      </div>

      {/* Sonuç */}
      <p className="font-mono text-[13px] leading-relaxed text-fg flex-1 mb-6">
        {y.sonuc}
      </p>

      {/* Kimlik */}
      <footer className="pt-4 border-t border-border flex items-baseline justify-between gap-3">
        <div>
          <span className="font-display text-fg block leading-none" style={{ fontSize: 18, letterSpacing: '0.06em' }}>
            {y.initials}
          </span>
          {kimlik && (
            <span className="font-mono text-[10px] tracking-[0.1em] text-dim block mt-1.5">
              {kimlik}
            </span>
          )}
        </div>
        {y.programSlugs && y.programSlugs.length === 1 ? (
          <Link
            href={`/atolyeler/${y.programSlugs[0]}`}
            className="font-mono text-[10px] tracking-[0.12em] uppercase text-stone hover:text-neon transition-colors text-right shrink-0"
          >
            {y.program} →
          </Link>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim text-right shrink-0">
            {y.program}
          </span>
        )}
      </footer>
    </article>
  )
}

/** Ana sayfa bölümü — tüm yorumlar */
export function Yorumlar() {
  return (
    <section className="px-4 md:px-14 py-24 border-b border-border bg-bgAlt" aria-labelledby="yorumlar-heading">
      <div className="relative mb-12">
        <div className="section-number absolute -top-10 -left-6" aria-hidden="true">04</div>
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3 relative z-10">
          katılımcılar ne diyor
        </p>
        <h2
          id="yorumlar-heading"
          className="font-display text-fg relative z-10"
          style={{ fontSize: 'clamp(28px, 5vw, 68px)', letterSpacing: '0.02em', lineHeight: 1 }}
        >
          ÖNCE &amp; SONRA
        </h2>
        <p className="font-mono text-[12px] text-stone max-w-lg mt-5 leading-relaxed">
          Atölyeye başlarken herkesin bir çekincesi var. Katılımcılara iki şey sorduk:
          gelmeden önce en çok neyden çekindiniz, bittiğinde beklemediğiniz ne değişti?
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {YORUMLAR.map((y) => <YorumKart key={y.id} y={y} />)}
      </div>
    </section>
  )
}

/** Program sayfasında o programa ait yorumlar */
export function ProgramYorumlari({ yorumlar }: { yorumlar: Yorum[] }) {
  if (yorumlar.length === 0) return null

  return (
    <section className="border-t border-border py-14" aria-labelledby="program-yorumlar">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon mb-3">
        katılımcılar
      </p>
      <h2
        id="program-yorumlar"
        className="font-display text-fg mb-8"
        style={{ fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '0.02em', lineHeight: 1 }}
      >
        ÖNCE &amp; SONRA
      </h2>
      <div className="grid md:grid-cols-2 gap-px bg-border">
        {yorumlar.map((y) => <YorumKart key={y.id} y={y} />)}
      </div>
    </section>
  )
}
