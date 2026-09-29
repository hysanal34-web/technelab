import type { SahneProgram } from './sahneVeri'

/**
 * Sahnenin durağan hâli — telefon, "hareketi azalt", WebGL yok ya da 3D henüz
 * yüklenmedi. Aynı kompozisyon: tabela, ışık konileri, numaralı beton bloklar,
 * neon sahne kenarı. Tamamen SVG; görsel dosyası yok, anında boyanır.
 */
export function SahneFallback({ programs }: { programs: SahneProgram[] }) {
  const N = Math.max(programs.length, 1)
  // Blok yerleşimi 3D ile aynı mantık: yay üzerinde, orta bloklar öne.
  const blocks = programs.map((p, i) => {
    const u = N === 1 ? 0.5 : i / (N - 1)
    const cx = 130 + u * 540
    const heights = [120, 78, 140, 100, 108, 62, 92, 126, 72]
    const widths = [46, 54, 36, 62, 44, 68, 50, 40, 58]
    const h = heights[i % heights.length], w = widths[i % widths.length]
    const baseY = 268 + Math.sin(u * Math.PI) * 10
    return { p, i, cx, w, h, baseY }
  })
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sf-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3dc" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff3dc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sf-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3dc" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff3dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1b1e" />
          <stop offset="1" stopColor="#0d0d10" />
        </linearGradient>
        <linearGradient id="sf-block" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d8c86" />
          <stop offset="1" stopColor="#5e5d58" />
        </linearGradient>
        <radialGradient id="sf-vignette" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#0A0A0C" stopOpacity="0" />
          <stop offset="1" stopColor="#0A0A0C" stopOpacity="0.85" />
        </radialGradient>
        <filter id="sf-glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="800" height="450" fill="#0A0A0C" />
      {/* arka duvar + tabela */}
      <rect x="120" y="40" width="560" height="240" fill="#070708" />
      <g filter="url(#sf-glow)" fontFamily="Anton, Impact, 'Arial Narrow', sans-serif" textAnchor="middle" fill="#C8FF00">
        <text x="400" y="112" fontSize="58" letterSpacing="2">TECHNE LAB</text>
        <text x="400" y="140" fontSize="22" letterSpacing="9">İSTANBUL</text>
      </g>
      {/* ışık konileri */}
      {blocks.map(({ cx, i }) => (
        <polygon key={`c${i}`} points={`${400 + (cx - 400) * 0.55},20 ${cx - 70},300 ${cx + 70},300`} fill="url(#sf-cone)" />
      ))}
      {/* sahne zemini */}
      <polygon points="60,300 740,300 700,190 100,190" fill="url(#sf-floor)" />
      {/* ışık havuzları */}
      {blocks.map(({ cx, baseY, i }) => (
        <ellipse key={`p${i}`} cx={cx} cy={baseY + 6} rx="60" ry="16" fill="url(#sf-pool)" />
      ))}
      {/* bloklar */}
      {blocks.map(({ p, i, cx, w, h, baseY }) => {
        const num = String(i + 1).padStart(2, '0')
        const words = p.title.toLocaleUpperCase('tr-TR').split(' ')
        return (
          <g key={p.slug}>
            <rect x={cx - w / 2} y={baseY - h} width={w} height={h} fill="url(#sf-block)" />
            <rect x={cx - w / 2} y={baseY - h} width={w} height={h} fill="none" stroke="#000" strokeOpacity="0.5" />
            <rect x={cx + w / 2} y={baseY - h + 4} width={Math.max(6, w * 0.18)} height={h} fill="#3a3936" />
            <text x={cx - w / 2 + 4} y={baseY - h + 14} fontFamily="Anton, Impact, sans-serif" fontSize="13" fill="#C8FF00">{num}</text>
            {words.slice(0, 3).map((wd, k) => (
              <text key={k} x={cx - w / 2 + 4} y={baseY - h + 26 + k * 8} fontFamily="Anton, Impact, sans-serif" fontSize="6.5" fill="#0a0a0c" fillOpacity="0.85">{wd}</text>
            ))}
            <rect x={cx - w / 2 + 4} y={baseY - 6} width={w * 0.25} height="1.5" fill="#C8FF00" />
          </g>
        )
      })}
      {/* neon sahne kenarı */}
      <line x1="60" y1="300" x2="740" y2="300" stroke="#C8FF00" strokeWidth="1.5" filter="url(#sf-glow)" />
      {/* seyirci silüeti */}
      {[0, 1, 2].map((r) => (
        <g key={r} fill="#151517">
          {Array.from({ length: 14 }).map((_, c) => (
            <rect key={c} x={70 + c * 48 + r * 8} y={320 + r * 26} width="30" height="12" />
          ))}
        </g>
      ))}
      <rect width="800" height="450" fill="url(#sf-vignette)" />
    </svg>
  )
}
