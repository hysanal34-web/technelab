/**
 * Sahnenin durağan hâli: 3D henüz yüklenmedi, "hareketi azalt", WebGL yok.
 * Aynı kompozisyon: karanlık sahne, kafesli ghost light, zeminde sıcak ışık
 * havuzu, havada toz. Tamamen SVG; görsel dosyası yok, anında boyanır.
 *
 * İki durum:
 * - `lit=false` (3D bekleniyor): salon karanlık, lamba çizilmez. 3D'nin ilk karesi
 *   de karanlık; geçişte göze çarpan hiçbir şey olmaz. Işık 3D'nin içinde yanar.
 * - `lit=true` (3D açılmayacak ya da gecikti): ampul burada yanar (CSS geçişi),
 *   sahne bu hâliyle kalır.
 *
 * İki kadraj: geniş ekranda yatay (meet, tamamı sığar), telefonda dikey kırpım
 * (slice, kutuyu doldurur; kenarlarda boşluk ve kesik zemin kalmaz).
 */
export function SahneFallback({ lit }: { lit: boolean }) {
  // Toz: tohumlu, her render'da aynı (hidrasyon farkı olmasın).
  let r = 7
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280
  const dust = Array.from({ length: 70 }, () => {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 70
    return { x: 400 + Math.cos(a) * d * 1.1, y: 70 + rnd() * 170, o: 0.15 + rnd() * 0.45, s: 0.5 + rnd() * 0.8 }
  })
  const light = { opacity: lit ? 1 : 0, transition: 'opacity 700ms ease' }
  const scene = (
    <>
      <rect x="-200" y="-200" width="1200" height="800" fill="#0A0A0C" />
      {/* zemin: ufuk yumuşak, sert çizgi yok */}
      <rect x="-200" y="240" width="1200" height="360" fill="url(#gl-floor)" />
      {[268, 288, 314, 346].map((y) => (
        <line key={y} x1="-200" y1={y} x2="1000" y2={y} stroke="#000" strokeOpacity="0.45" strokeWidth="1" />
      ))}
      {/* 3D beklenirken salon karanlık: lamba YOK. SVG'nin lambası 3D'ninkiyle aynı yerde
          durmuyor (kutu ve kadraj farklı); sönük bir silüet bile "başka bir kare" gibi
          okunuyordu. Yalnız geniş, çok soluk bir nefes var ki kare ölü durmasın. */}
      {!lit && <ellipse className="sahne-nefes" cx="400" cy="200" rx="260" ry="160" fill="url(#gl-halo)" />}
      {/* ışık: kaide, direk, kafes, havuz, hale, ampul, filaman, toz — yalnız lit */}
      <g style={light}>
        <ellipse cx="400" cy="300" rx="260" ry="70" fill="url(#gl-pool)" />
        <ellipse cx="400" cy="286" rx="30" ry="6" fill="#000" fillOpacity="0.7" />
        <rect x="396" y="104" width="8" height="10" fill="#2b2b2e" />
        <rect x="378" y="280" width="44" height="6" rx="2" fill="#2b2b2e" />
        <rect x="398.6" y="112" width="2.8" height="170" fill="#232326" />
        <circle cx="400" cy="92" r="70" fill="url(#gl-halo)" />
        <circle cx="400" cy="92" r="8" fill="#fff6e6" filter="url(#gl-glow)" />
        <circle cx="400" cy="92" r="2.4" fill="none" stroke="#C8FF00" strokeWidth="0.9" />
        <g fill="none" stroke="#1d1d20" strokeWidth="0.9">
          <circle cx="400" cy="92" r="14" />
          <ellipse cx="400" cy="92" rx="6" ry="14" />
          <ellipse cx="400" cy="92" rx="11" ry="14" />
          <line x1="386" y1="92" x2="414" y2="92" />
        </g>
        {dust.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#ffe6c4" fillOpacity={d.o} />
        ))}
      </g>
      <rect x="-200" y="-200" width="1200" height="800" fill="url(#gl-vignette)" />
    </>
  )
  const defs = (
    <defs>
      <linearGradient id="gl-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0A0A0C" />
        <stop offset="0.12" stopColor="#0f0e0d" />
        <stop offset="1" stopColor="#0c0b0b" />
      </linearGradient>
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
  )
  return (
    <>
      {/* telefon: dikey kırpım, kutuyu doldurur */}
      <svg viewBox="230 30 340 320" preserveAspectRatio="xMidYMid slice" overflow="visible" className="absolute inset-0 h-full w-full md:hidden" aria-hidden="true">
        {defs}{scene}
      </svg>
      {/* geniş ekran: yatay, tamamı sığar */}
      <svg viewBox="40 20 720 320" preserveAspectRatio="xMidYMid meet" overflow="visible" className="absolute inset-0 hidden h-full w-full md:block" aria-hidden="true">
        {scene}
      </svg>
    </>
  )
}
