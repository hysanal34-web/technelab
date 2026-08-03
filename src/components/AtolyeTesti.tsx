'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WORKSHOPS } from '@/lib/data'

// ── Puanlama: her cevap program slug'larına puan ekler ────────────
type Answer = { label: string; detail?: string; scores: Record<string, number> }
type Question = { id: string; q: string; sub?: string; answers: Answer[] }

const QUESTIONS: Question[] = [
  {
    id: 'amac',
    q: 'Seni buraya getiren şey ne?',
    sub: 'En yakın olanı seç — kesin olmasına gerek yok.',
    answers: [
      {
        label: 'Sahnede olmak istiyorum',
        detail: 'Oyunculuk, karakter, sahne varlığı',
        scores: { 'oyuncunun-mevcudiyeti': 3, 'camera-praxis': 2, 'english-drama-acting-focus': 1 },
      },
      {
        label: 'Yazmak istiyorum',
        detail: 'Metin, karakter, diyalog, yapı',
        scores: { 'auteur-lab': 4 },
      },
      {
        label: 'İngilizcemi açmak istiyorum',
        detail: 'Konuşma pratiği ama sıkıcı olmayan bir yolla',
        scores: { 'english-drama-lab': 4, 'english-drama-acting-focus': 2, 'english-drama-youth': 1 },
      },
      {
        label: 'Dans ve müzik istiyorum',
        detail: 'Hareket, şarkı, Broadway enerjisi',
        scores: { 'broadway-musical-dance': 3, 'techne-musical-lab': 3 },
      },
    ],
  },
  {
    id: 'sure',
    q: 'Ne kadar süre ayırabilirsin?',
    answers: [
      {
        label: 'Birkaç ay deneyeyim',
        detail: '8–12 hafta',
        scores: { 'english-drama-lab': 2, 'broadway-musical-dance': 2, 'auteur-lab': 2, 'oyuncunun-mevcudiyeti': 2, 'english-drama-acting-focus': 2 },
      },
      {
        label: 'Uzun soluklu bir şey arıyorum',
        detail: 'Bir sezon boyunca, düzenli',
        scores: { 'techne-musical-lab': 4, 'english-drama-final-performance': 2 },
      },
      {
        label: 'Yoğun ve kısa olsun',
        detail: 'Az haftada çok iş',
        scores: { 'auteur-lab': 2, 'camera-praxis': 3 },
      },
    ],
  },
  {
    id: 'dil',
    q: 'Hangi dilde çalışmak istersin?',
    answers: [
      {
        label: 'Türkçe',
        scores: { 'oyuncunun-mevcudiyeti': 2, 'auteur-lab': 2, 'techne-musical-lab': 2, 'broadway-musical-dance': 2 },
      },
      {
        label: 'İngilizce',
        detail: 'Dil pratiği de kazanmak istiyorum',
        scores: { 'english-drama-lab': 3, 'english-drama-acting-focus': 2, 'english-drama-final-performance': 2, 'english-drama-youth': 1 },
      },
      {
        label: 'Fark etmez',
        scores: { 'english-drama-lab': 1, 'oyuncunun-mevcudiyeti': 1, 'broadway-musical-dance': 1 },
      },
    ],
  },
  {
    id: 'deneyim',
    q: 'Bu alanda deneyimin var mı?',
    answers: [
      {
        label: 'Hiç yok, sıfırdan başlıyorum',
        scores: { 'english-drama-lab': 2, 'broadway-musical-dance': 2, 'auteur-lab': 1, 'oyuncunun-mevcudiyeti': 1 },
      },
      {
        label: 'Biraz — kurs, okul kulübü, amatör',
        scores: { 'english-drama-acting-focus': 2, 'oyuncunun-mevcudiyeti': 2, 'techne-musical-lab': 2, 'auteur-lab': 1 },
      },
      {
        label: 'Deneyimliyim, derinleşmek istiyorum',
        scores: { 'camera-praxis': 3, 'english-drama-final-performance': 3, 'techne-musical-lab': 2 },
      },
    ],
  },
  {
    id: 'hedef',
    q: 'Sonunda ne olmasını istersin?',
    answers: [
      {
        label: 'Seyirci önünde bir şey göstermek',
        detail: 'Bitirme performansı olsun',
        scores: { 'techne-musical-lab': 3, 'english-drama-final-performance': 3 },
      },
      {
        label: 'Kendimi geliştirmek yeterli',
        detail: 'Performans şart değil',
        scores: { 'english-drama-lab': 2, 'broadway-musical-dance': 2, 'oyuncunun-mevcudiyeti': 2 },
      },
      {
        label: 'Elimde somut bir iş olsun',
        detail: 'Yazılmış bir metin, çekilmiş bir sahne',
        scores: { 'auteur-lab': 3, 'camera-praxis': 3 },
      },
    ],
  },
  {
    id: 'lokasyon',
    q: 'Nereye gitmek senin için kolay?',
    answers: [
      {
        label: 'Anadolu Yakası',
        detail: 'Kadıköy ve çevresi',
        scores: { 'techne-musical-lab': 2, 'broadway-musical-dance': 2, 'english-drama-lab': 1, 'english-drama-youth': 1 },
      },
      {
        label: 'Avrupa Yakası',
        detail: 'Pera, Beyoğlu ve çevresi',
        scores: { 'auteur-lab': 2, 'english-drama-lab': 1, 'english-drama-acting-focus': 1, 'english-drama-final-performance': 1 },
      },
      {
        label: 'İkisi de olur',
        scores: { 'english-drama-lab': 1, 'broadway-musical-dance': 1, 'auteur-lab': 1, 'techne-musical-lab': 1 },
      },
    ],
  },
]

export function AtolyeTesti() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)

  const pick = (a: Answer) => {
    const next = { ...scores }
    for (const [slug, pts] of Object.entries(a.scores)) {
      next[slug] = (next[slug] ?? 0) + pts
    }
    setScores(next)
    if (step + 1 >= QUESTIONS.length) setDone(true)
    else setStep(step + 1)
  }

  const reset = () => { setStep(0); setScores({}); setDone(false) }

  if (done) {
    const ranked = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([slug, pts]) => ({ w: WORKSHOPS.find((x) => x.slug === slug), pts }))
      .filter((r) => r.w && !r.w.archived)
      .slice(0, 3)

    const top = ranked[0]
    const others = ranked.slice(1)

    return (
      <div>
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3">sonuç</p>
          <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(26px,3.4vw,50px)', lineHeight: 0.95 }}>
            SANA EN UYGUN PROGRAM
          </h2>
        </div>

        {top?.w && (
          <Link
            href={`/atolyeler/${top.w.slug}`}
            data-hover
            className="group block border border-neon p-8 md:p-10 mb-px hover:bg-bgAlt transition-colors"
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-neon">{top.w.code}</span>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">
                {top.w.active ? 'kayıt açık' : 'kayıt kapalı'}
              </span>
            </div>
            <h3 className="font-display text-neon leading-tight mb-3" style={{ fontSize: 'clamp(24px,3vw,42px)' }}>
              {top.w.title}
            </h3>
            <p className="font-mono text-[13px] text-fg leading-relaxed mb-5 max-w-2xl">{top.w.tagline}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-5">
              <span className="font-mono text-[11px] text-dim">{top.w.duration}</span>
              <span className="font-mono text-[11px] text-dim">{top.w.venue}</span>
              <span className="font-mono text-[11px] text-dim">{top.w.maxStudents} kişi</span>
            </div>
            <span className="font-mono text-[12px] tracking-widest2 uppercase text-neon group-hover:text-fg transition-colors">
              programı incele →
            </span>
          </Link>
        )}

        {others.length > 0 && (
          <div className="mt-12">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim mb-6">bunlar da sana uyabilir</p>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {others.map((r) => r.w && (
                <Link
                  key={r.w.slug}
                  href={`/atolyeler/${r.w.slug}`}
                  data-hover
                  className="group bg-bg hover:bg-bgAlt transition-colors p-7 block"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-neon block mb-2">{r.w.code}</span>
                  <h4 className="font-display text-fg group-hover:text-neon transition-colors leading-tight mb-2" style={{ fontSize: 'clamp(18px,1.7vw,25px)' }}>
                    {r.w.title}
                  </h4>
                  <p className="font-mono text-[12px] text-stone leading-relaxed">{r.w.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
          <button
            onClick={reset}
            data-hover
            className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors"
          >
            ↻ testi tekrarla
          </button>
          <Link href="/iletisim" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            hâlâ kararsızım, konuşalım →
          </Link>
        </div>

        <p className="font-mono text-[11px] text-dim mt-8 max-w-2xl leading-relaxed">
          Bu bir yönlendirme aracı — kesin bir yargı değil. Sonuçtan bağımsız olarak
          her programın sayfasında ne yapıldığı ayrıntılı yazıyor.
        </p>
      </div>
    )
  }

  const q = QUESTIONS[step]
  const pct = Math.round((step / QUESTIONS.length) * 100)

  return (
    <div>
      {/* İlerleme */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <span className="font-mono text-[11px] tracking-widest2 uppercase text-neon">
            soru {step + 1} / {QUESTIONS.length}
          </span>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              data-hover
              className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors"
            >
              ← geri
            </button>
          )}
        </div>
        <div className="h-0.5 w-full bg-border">
          <div className="h-full bg-neon transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <h2 className="font-display text-fg mb-2" style={{ fontSize: 'clamp(24px,3.2vw,46px)', lineHeight: 1 }}>
        {q.q}
      </h2>
      {q.sub && <p className="font-mono text-[12px] text-dim mb-10">{q.sub}</p>}
      {!q.sub && <div className="mb-10" />}

      <div className="grid md:grid-cols-2 gap-px bg-border">
        {q.answers.map((a) => (
          <button
            key={a.label}
            onClick={() => pick(a)}
            data-hover
            className="group bg-bg hover:bg-bgAlt transition-colors p-7 md:p-8 text-left block w-full"
          >
            <span className="font-display text-fg group-hover:text-neon transition-colors block leading-tight mb-2" style={{ fontSize: 'clamp(18px,1.8vw,26px)' }}>
              {a.label}
            </span>
            {a.detail && <span className="font-mono text-[12px] text-stone block leading-relaxed">{a.detail}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
