'use client'
import { useLang } from '@/contexts/LanguageContext'

const TR = ['YAZARLIK', 'OYUNCULUK', 'İNGİLİZCE DRAMA', 'MÜZİKAL', 'BROADWAY DANS', 'YAZARLIK']
const EN = ['PLAYWRITING', 'ACTING', 'ENGLISH DRAMA', 'MUSICAL', 'BROADWAY DANCE', 'PLAYWRITING']

export function CycleDisciplines() {
  const { lang } = useLang()
  const words = lang === 'en' ? EN : TR
  return (
    <span
      className="cycle-wrap font-display text-neon"
      style={{ fontSize: 'clamp(24px, 3vw, 42px)', letterSpacing: '0.03em' }}
    >
      <span className="cycle-list">
        {words.map((w, i) => <span key={i}>{w}</span>)}
      </span>
    </span>
  )
}
