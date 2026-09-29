import type { SahneProgram } from './sahneVeri'

/**
 * Sahnenin durağan hâli: telefon, "hareketi azalt", WebGL yok ya da 3D henüz
 * yüklenmedi. Aynı kompozisyon: karanlık sahne, kafesli ghost light, zeminde
 * sıcak ışık havuzu, havada toz. Tamamen SVG; görsel dosyası yok, anında boyanır.
 * Program listesi HTML'de (SahneHero), burada tekrar edilmez.
 */
export function SahneFallback({ programs }: { programs: SahneProgram[] }) {
  void programs
  // Toz: tohumlu, her render'da aynı (hidrasyon farkı olmasın).
  let r = 7
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280
  const dust = Array.from({ length: 70 }, () => {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 70
    return { x: 400 + Math.cos(a) * d * 1.1, y: 70 + rnd() * 170, o: 0.15 + rnd() * 0.45, s: 0.5 + rnd() * 0.8 }
  })
  return (
    <svg viewBox="40 20 720 320" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="gl-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.32" />
          <stop offset="0.45" stopColor="#ffd9a0" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gl-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff1d8" stopOpacity="0.95" />
          <stop offset="0.22" stopColor="#ffdcaa" stopOpacity="0.3" />
          <stop offset="1" stopColor="#ffdcaa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gl-vignette" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0.5" stopColor="#0A0A0C" stopOpacity="0" />
          <stop offset="1" stopColor="#0A0A0C" stopOpacity="0.9" />
        </radialGradient>
        <filter id="gl-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="800" height="400" fill="#0A0A0C" />
      {/* zemin ve ışık havuzu */}
      <rect x="0" y="252" width="800" height="150" fill="#0f0e0d" />
      {[268, 288, 314, 346].map((y) => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#000" strokeOpacity="0.55" strokeWidth="1" />
      ))}
      <ellipse cx="400" cy="300" rx="260" ry="70" fill="url(#gl-pool)" />
      {/* kaide gölgesi, kaide, direk */}
      <ellipse cx="400" cy="286" rx="30" ry="6" fill="#000" fillOpacity="0.7" />
      <rect x="378" y="280" width="44" height="6" rx="2" fill="#2b2b2e" />
      <rect x="398.6" y="112" width="2.8" height="170" fill="#232326" />
      <rect x="396" y="104" width="8" height="10" fill="#2b2b2e" />
      {/* hale, ampul, kafes */}
      <circle cx="400" cy="92" r="70" fill="url(#gl-halo)" />
      <circle cx="400" cy="92" r="8" fill="#fff6e6" filter="url(#gl-glow)" />
      <circle cx="400" cy="92" r="2.4" fill="none" stroke="#C8FF00" strokeWidth="0.9" />
      <g fill="none" stroke="#1d1d20" strokeWidth="0.9">
        <circle cx="400" cy="92" r="14" />
        <ellipse cx="400" cy="92" rx="6" ry="14" />
        <ellipse cx="400" cy="92" rx="11" ry="14" />
        <line x1="386" y1="92" x2="414" y2="92" />
      </g>
      {/* toz */}
      {dust.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#ffe6c4" fillOpacity={d.o} />
      ))}
      <rect x="0" y="0" width="800" height="400" fill="url(#gl-vignette)" />
    </svg>
  )
}
