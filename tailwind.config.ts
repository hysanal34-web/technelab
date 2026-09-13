import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:     'rgb(var(--bg-rgb) / <alpha-value>)',
        bgAlt:  'rgb(var(--bg-alt-rgb) / <alpha-value>)',
        bgHi:   'rgb(var(--bg-hi-rgb) / <alpha-value>)',
        fg:     'rgb(var(--fg-rgb) / <alpha-value>)',
        neon:   'rgb(var(--neon-rgb) / <alpha-value>)',
        stone:  'rgb(var(--stone-rgb) / <alpha-value>)',
        dim:    'rgb(var(--dim-rgb) / <alpha-value>)',
        border: 'var(--border)',
        mid:    'rgb(var(--mid-rgb) / <alpha-value>)',
        ink:    '#0A0A0C',
      },
      fontFamily: {
        // 13 Eylül 2026 — yeni tipografi. 'mono' sınıfı yüzlerce yerde
        // gövde metni için kullanılıyor; adı kalsın, fontu okunaklı olsun.
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        mono:    ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body:    ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        code:    ['var(--font-code)', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        grain:   'grain 0.4s steps(6) infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-25%)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%':     { transform: 'translate(-1%,-1%)' },
          '40%':     { transform: 'translate(1%,1%)' },
          '60%':     { transform: 'translate(-1%,1%)' },
          '80%':     { transform: 'translate(1%,-1%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
