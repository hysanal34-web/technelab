import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Hakkında — Bağımsız Tiyatro Laboratuvarı',
  description:
    "Adını Antik Yunanca 'techne' (zanaat) sözcüğünden alan bağımsız tiyatro. Taksim ve Kadıköy'de oyunculuk, yazarlık, İngilizce drama, dans ve müzikal atölyeleri.",
  alternates: { canonical: `${SITE_META.url}/hakkinda` },
  openGraph: {
    title: 'Hakkında — Bağımsız Tiyatro Laboratuvarı',
    description: "Techne: zanaat. Sahnenin öğrenilebilir olduğuna dair inat. İstanbul'da bağımsız bir tiyatro laboratuvarı.",
    url: `${SITE_META.url}/hakkinda`,
  },
}

export default function AboutPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" />
        {/* Ghost text */}
        <div
          className="absolute -top-4 -right-4 font-display leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(80px,14vw,200px)', color: 'transparent', WebkitTextStroke: '1px rgba(200,255,0,0.07)' }}
          aria-hidden="true"
        >
          ΤΈΧΝΗ
        </div>
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4 relative z-10">hakkında</p>
        <h1
          className="font-display text-fg relative z-10"
          style={{ fontSize: 'clamp(44px, 7.5vw, 108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}
        >
          TECHNE LAB<br />
          <span className="text-neon">NEDİR?</span>
        </h1>
      </section>

      {/* ── Sözlük maddesi — ismin kendisi cevap ───────────────── */}
      <section className="border-b border-border bg-bgAlt" aria-label="Techne sözcüğünün anlamı">
        <div className="px-4 md:px-10 py-16 max-w-3xl">
          <div className="flex items-baseline gap-4 mb-6 flex-wrap">
            <span className="font-display text-fg" style={{ fontSize: 'clamp(40px,6vw,80px)', letterSpacing: '0.02em', lineHeight: 1 }}>
              τέχνη
            </span>
            <span className="font-mono text-[13px] text-stone">/tékʰ.nɛː/</span>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim">isim · Antik Yunanca</span>
          </div>
          <ol className="space-y-4">
            {[
              ['1.', 'Zanaat; bir işi ustalıkla yapma bilgisi.'],
              ['2.', 'Sanat — ilhamla değil, tekrarla ve disiplinle edinilen.'],
              ['3.', 'mec. Sahnenin öğrenilebilir olduğuna dair inat.'],
            ].map(([n, t]) => (
              <li key={n} className="flex gap-4 items-baseline">
                <span className="font-mono text-[11px] text-neon shrink-0">{n}</span>
                <span className={`font-mono text-[14px] leading-relaxed ${n === '3.' ? 'text-fg' : 'text-stone'}`}>{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────────── */}
      <section className="px-4 md:px-10 py-20 grid md:grid-cols-2 gap-16 border-b border-border">
        <div>
          <div className="w-7 h-px bg-neon mb-6" />
          <p className="font-mono text-[14px] text-fg leading-relaxed mb-6">
            Adımızı buradan aldık. Yeteneğin övgüsüne değil, emeğin tekrarına inanıyoruz.
            Sahne bir mucize değildir; nefes, beden, metin ve provayla kurulan bir yapıdır.
          </p>
          <p className="font-mono text-[14px] text-stone leading-relaxed mb-8">
            2026&apos;da İstanbul&apos;da kurulduk. Taksim ve Kadıköy&apos;de, en fazla 12–14 kişilik
            gruplarla çalışıyoruz — çünkü kalabalıkta kimse görünmez.
            Yazarlıktan müzikale dokuz program, hepsi aynı omurgaya bağlı:{' '}
            <span className="text-neon">disiplin özgürlüktür.</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-neon rounded-full" />
            <span className="font-mono text-[13px] text-stone tracking-[0.08em]">Taksim &amp; Kadıköy — İstanbul</span>
          </div>
        </div>
        <div>
          <div className="w-7 h-px bg-neon mb-6" />
          {[['ÜRETİM', 'Özgün oyunlar, sahneleme projeleri, seyircili bitirme performansları. Atölye burada biter: sahnede.'],
            ['ARAŞTIRMA', "Dramaturjik düşünce ve çağdaş sahne pratiği. Sophokles'ten Kane'e — metnin altında ne yattığını sormak."],
            ['ATÖLYE', 'Oyuncular, yazarlar, dansçılar ve sahneye ilk kez adım atanlar için yoğun, küçük gruplu programlar.']].map(([l, t]) => (
            <div key={l} className="py-5 border-b border-border last:border-0">
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-2">{l}</p>
              <p className="font-mono text-[14px] text-stone leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── İç linkler — keşfe devam ───────────────────────────── */}
      <section className="grid md:grid-cols-3 border-b border-border" aria-label="Keşfet">
        {[
          { href: '/atolyeler', label: 'ATÖLYELER', sub: '9 program · 4 disiplin' },
          { href: '/ekip', label: 'EKİP', sub: '8 eğitmen · tek sahne' },
          { href: '/galeri', label: 'GALERİ', sub: 'Provadan sahneye kareler' },
        ].map((x, i) => (
          <Link
            key={x.href}
            href={x.href}
            className={`group px-4 md:px-10 py-12 hover:bg-bgAlt transition-colors duration-200 ${i < 2 ? 'md:border-r border-b md:border-b-0 border-border' : ''}`}
            data-hover
          >
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim mb-3 group-hover:text-neon transition-colors duration-200">{x.sub}</p>
            <span className="font-display text-fg group-hover:text-neon transition-colors duration-200" style={{ fontSize: 'clamp(24px,3vw,40px)', letterSpacing: '0.02em' }}>
              {x.label} <span className="text-neon">→</span>
            </span>
          </Link>
        ))}
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="px-4 md:px-10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3">başla</p>
          <div className="font-display text-fg" style={{ fontSize: 'clamp(22px, 3.5vw, 52px)', letterSpacing: '0.02em', lineHeight: 1 }}>
            SAHNE SENİ<br />BEKLEMEZ.
          </div>
        </div>
        <Link
          href="/atolyeler"
          className="font-mono text-[11px] tracking-[0.18em] uppercase bg-neon text-bg px-8 py-4 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200 whitespace-nowrap"
          data-hover
        >
          programı seç →
        </Link>
      </section>
    </>
  )
}
