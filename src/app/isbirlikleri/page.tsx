import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META, VENUES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'İşbirliklerimiz — Çalıştığımız Mekânlar',
  description:
    'Techne Lab mobil çalışan bağımsız bir tiyatro ekibi. Programlarımız Pera ve Kadıköy\'deki üç partner mekânda gerçekleşiyor: Pod Pera, Beden İşleri ve Soft Sanat.',
  alternates: { canonical: `${SITE_META.url}/isbirlikleri` },
  openGraph: {
    title: 'İşbirliklerimiz — Techne Lab İstanbul',
    description:
      'Kendi duvarlarımız yok; birlikte çalıştığımız mekânlar var. Pera ve Kadıköy\'de üç partner alan.',
    url: `${SITE_META.url}/isbirlikleri`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Techne Lab İstanbul — İşbirliği Yapılan Mekânlar',
  itemListElement: VENUES.map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Place',
      name: v.name,
      description: v.blurb,
      address: {
        '@type': 'PostalAddress',
        addressLocality: v.district.split('·').pop()?.trim() ?? 'İstanbul',
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
    },
  })),
}

export default function CollaborationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" />
        <div
          className="absolute -top-4 -right-4 font-display leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(80px,14vw,200px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(200,255,0,0.07)',
          }}
          aria-hidden="true"
        >
          MEKÂN
        </div>
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4 relative z-10">
          işbirliklerimiz
        </p>
        <h1
          className="font-display text-fg relative z-10"
          style={{ fontSize: 'clamp(44px, 7.5vw, 108px)', letterSpacing: '0.01em', lineHeight: 0.9 }}
        >
          ÜÇ MEKÂN<br />
          <span className="text-neon">BİR EKİP</span>
        </h1>
      </section>

      {/* ── Manifesto ──────────────────────────────────────────── */}
      <section className="border-b border-border bg-bgAlt" aria-labelledby="manifesto-baslik">
        <div className="px-4 md:px-10 py-16 max-w-3xl">
          <h2
            id="manifesto-baslik"
            className="font-display text-fg mb-8"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '0.02em', lineHeight: 1.05 }}
          >
            KENDİ DUVARLARIMIZ YOK.
          </h2>
          <p className="font-mono text-[15px] leading-relaxed text-stone mb-5">
            Techne Lab mobil çalışan bağımsız bir tiyatro ekibi. Sabit bir binamız,
            kendi sahnemiz yok — ve bu bir eksiklik değil, bilinçli bir tercih.
          </p>
          <p className="font-mono text-[15px] leading-relaxed text-stone mb-5">
            Her program, ihtiyacı olan mekâna gider. Dans ve müzikal geniş bir zemin
            ister; yazarlık laboratuvarı sessiz ve küçük bir oda ister. Tek bir mekânın
            hepsini birden karşılaması mümkün değil.
          </p>
          <p className="font-mono text-[15px] leading-relaxed text-fg">
            Bu yüzden İstanbul&apos;un iki yakasında, işlerini ciddiye alan üç mekânla
            birlikte çalışıyoruz. Onlar alanlarını açıyor, biz işimizi getiriyoruz.
          </p>
        </div>
      </section>

      {/* ── Mekânlar ───────────────────────────────────────────── */}
      <section className="border-b border-border" aria-labelledby="mekanlar-baslik">
        <div className="px-4 md:px-10 pt-16 pb-6">
          <h2
            id="mekanlar-baslik"
            className="font-display text-fg"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '0.02em', lineHeight: 1.05 }}
          >
            MEKÂNLAR
          </h2>
        </div>

        <ul className="border-t border-border">
          {VENUES.map((v, i) => (
            <li key={v.key} className="border-b border-border group">
              <div className="px-4 md:px-10 py-10 md:py-12 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start hover:bg-bgAlt transition-colors duration-200">
                {/* Numara */}
                <span
                  className="font-display text-neon leading-none select-none"
                  style={{ fontSize: 'clamp(32px,4vw,56px)', letterSpacing: '0.02em' }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                {/* İçerik */}
                <div className="min-w-0">
                  <h3
                    className="font-display text-fg mb-2 group-hover:text-neon transition-colors duration-200"
                    style={{ fontSize: 'clamp(26px,3.2vw,44px)', letterSpacing: '0.02em', lineHeight: 1 }}
                  >
                    {v.name.toUpperCase()}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim mb-4">
                    {v.district} · {v.side} Yakası
                  </p>
                  <p className="font-mono text-[14px] leading-relaxed text-stone max-w-2xl">
                    {v.blurb}
                  </p>
                </div>

                {/* Instagram */}
                {v.instagram && (
                  <a
                    href={`https://instagram.com/${v.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim hover:text-neon transition-colors duration-200 whitespace-nowrap py-2 inline-block"
                    data-hover
                  >
                    {v.instagram} →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Nerede buluşuyoruz ─────────────────────────────────── */}
      <section className="border-b border-border bg-bgAlt" aria-labelledby="nerede-baslik">
        <div className="px-4 md:px-10 py-16 max-w-3xl">
          <h2
            id="nerede-baslik"
            className="font-display text-fg mb-6"
            style={{ fontSize: 'clamp(24px,3vw,38px)', letterSpacing: '0.02em', lineHeight: 1.1 }}
          >
            PROGRAMIM NEREDE?
          </h2>
          <p className="font-mono text-[15px] leading-relaxed text-stone mb-5">
            Her programın sayfasında hangi semtte gerçekleştiği yazıyor. Kesin
            adres, dönem başlamadan önce kayıt olan katılımcılara doğrudan iletilir —
            böylece mekân değişikliği olursa kimse yolda kalmaz.
          </p>
          <p className="font-mono text-[15px] leading-relaxed text-stone mb-8">
            Bir programın hangi mekânda olduğunu şimdiden merak ediyorsan yaz, söyleyelim.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/atolyeler"
              className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
              data-hover
            >
              programları gör →
            </Link>
            <Link
              href="/iletisim"
              className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase text-fg border border-fg/25 px-6 py-3.5 hover:border-neon hover:text-neon transition-colors duration-200"
              data-hover
            >
              bize sor →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mekân sahiplerine ──────────────────────────────────── */}
      <section aria-labelledby="partner-baslik">
        <div className="px-4 md:px-10 py-16 max-w-3xl">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">
            mekân sahiplerine
          </p>
          <h2
            id="partner-baslik"
            className="font-display text-fg mb-6"
            style={{ fontSize: 'clamp(24px,3vw,38px)', letterSpacing: '0.02em', lineHeight: 1.1 }}
          >
            BİRLİKTE ÇALIŞALIM MI?
          </h2>
          <p className="font-mono text-[15px] leading-relaxed text-stone mb-8">
            İstanbul&apos;da bir stüdyonuz, sahneniz ya da boş kalan bir alanınız varsa
            ve tiyatroyla uğraşan bir ekibe kapınızı açmak istiyorsanız — konuşalım.
            Düzenli program, temiz kullanım ve karşılıklı görünürlük.
          </p>
          <a
            href={`mailto:${SITE_META.email}?subject=${encodeURIComponent('Mekân işbirliği')}`}
            className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase text-fg border border-fg/25 px-6 py-3.5 hover:border-neon hover:text-neon transition-colors duration-200"
            data-hover
          >
            {SITE_META.email} →
          </a>
        </div>
      </section>
    </>
  )
}
