import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { MONOLOGUES } from '@/lib/kaynaklar'

const title = 'Monolog Kütüphanesi — Oyunculuk Seçmeleri İçin Ücretsiz Monologlar'
const description = 'Oyunculuk seçmeleri ve atölye çalışması için monolog arşivi. Shakespeare, Çehov, Ibsen, Wilde. Her monolog için bağlam, ton ve çalışma notu. Ücretsiz.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_META.url}/kaynaklar/monologlar` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/kaynaklar/monologlar`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Monolog Kütüphanesi' }],
  },
  keywords: [
    'monolog', 'oyunculuk monologları', 'seçme monologu', 'audition monologu',
    'kadın monologları', 'erkek monologları', 'kısa monolog', 'shakespeare monolog',
    'çehov monolog', 'tiyatro monologları', 'ücretsiz monolog', 'konservatuvar sınavı monolog',
    'oyunculuk sınavı hazırlık', 'monolog önerileri',
  ],
}

const FAQ = [
  {
    q: 'Oyunculuk seçmesi için nasıl monolog seçilir?',
    a: 'Üç kritere bak: yaşına ve enerjine yakın olmalı, süresi istenen sınırı aşmamalı (genellikle 1–2 dakika), ve seni gerçekten ilgilendiren bir soru taşımalı. En çok yapılan hata "etkileyici" bir metin seçmektir — jüri metni değil, seni izler. Kendi doğal ritmine oturan bir metin her zaman daha güçlüdür.',
  },
  {
    q: 'Monolog ne kadar uzun olmalı?',
    a: 'Çoğu seçme 1–2 dakika ister. Bu yaklaşık 150–250 kelimedir. Sınır belirtilmemişse 90 saniye güvenli bir hedeftir. Uzun bir metnin en güçlü bölümünü kesip kullanmak tamamen kabul edilebilir — ama kesim, kendi başına anlamlı bir yay oluşturmalı.',
  },
  {
    q: 'Klasik mi çağdaş monolog mu seçmeliyim?',
    a: 'Seçmenin ne istediğine bakılır. İstenmemişse: klasik metinler dil ve nefes hâkimiyetini, çağdaş metinler doğallık ve kendine yakınlığı gösterir. İkisinden birer tane hazır bulundurmak en sağlıklısıdır. Çoğu kurum zaten bir klasik bir modern ister.',
  },
  {
    q: 'Bu monologları izinsiz kullanabilir miyim?',
    a: 'Bu sayfadaki tüm metinler telif hakkı süresi dolmuş (kamu malı) eserlerden seçilmiştir — Shakespeare, Çehov, Ibsen, Wilde, antik Yunan tragedyaları. Seçmelerde, sınıf çalışmalarında ve gösterilerde serbestçe kullanabilirsin. Çağdaş metinler için yazar ya da yayıncıdan izin gerekir.',
  },
  {
    q: 'Monolog çalışırken nereden başlanır?',
    a: 'Metni ezberlemeden önce üç soruyu yanıtla: Karakter kime konuşuyor? Ne istiyor? Bu konuşmanın sonunda ne değişiyor? Ezber, bu üç yanıt netleştikten sonra gelir. Tersini yaparsan metin ezberlenir ama sahne kurulmaz.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description,
  url: `${SITE_META.url}/kaynaklar/monologlar`,
  isPartOf: { '@type': 'WebSite', name: SITE_META.name, url: SITE_META.url },
  about: { '@type': 'Thing', name: 'Oyunculuk monologları' },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: `${SITE_META.url}/kaynaklar` },
    { '@type': 'ListItem', position: 3, name: 'Monolog Kütüphanesi', item: `${SITE_META.url}/kaynaklar/monologlar` },
  ],
}

export default function MonologlarPage() {
  const byLength = {
    'kısa': MONOLOGUES.filter((m) => m.length === 'kısa'),
    'orta': MONOLOGUES.filter((m) => m.length === 'orta'),
    'uzun': MONOLOGUES.filter((m) => m.length === 'uzun'),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <Link href="/kaynaklar" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors mb-4 inline-block">
          ← kaynaklar
        </Link>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(36px,6vw,88px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          MONOLOG<br />KÜTÜPHANESİ
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          Seçmeler, sınıf çalışması ve kendi pratiğin için. Her monolog için sahnenin bağlamını,
          taşıdığı tonu ve oyuncuya bir çalışma notunu yazdık.
        </p>
        <p className="font-mono text-[12px] text-dim max-w-2xl leading-relaxed">
          Tüm metinler kamu malıdır — telif izni gerekmez. {MONOLOGUES.length} monolog.
        </p>
      </section>

      {/* Nasıl seçilir */}
      <section className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt">
        <h2 className="font-display text-fg mb-8" style={{ fontSize: 'clamp(22px,2.6vw,38px)', lineHeight: 1 }}>
          MONOLOG NASIL SEÇİLİR?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          {[
            { n: '01', t: 'Sana yakın olsun', d: 'Yaşına, enerjine ve doğal ritmine oturan bir metin, teknik olarak "etkileyici" olandan her zaman daha güçlü izlenir.' },
            { n: '02', t: 'Bir soru taşısın', d: 'Karakterin gerçekten cevap aradığı bir soru varsa sahne canlı olur. Sonucu baştan belli metinler ölü doğar.' },
            { n: '03', t: 'Süreye uysun', d: 'Belirtilmemişse 90 saniye hedefle. Uzun metinden kesmek serbest — ama kesilen parça kendi başına bir yay çizmeli.' },
          ].map((x) => (
            <div key={x.n}>
              <span className="font-mono text-[11px] tracking-[0.18em] text-neon block mb-3">{x.n}</span>
              <h3 className="font-display text-fg text-[19px] mb-2">{x.t}</h3>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Monolog listesi */}
      {(['kısa', 'orta', 'uzun'] as const).map((len) => (
        <section key={len} className="px-4 md:px-10 py-14 border-b border-border">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="font-display text-fg" style={{ fontSize: 'clamp(22px,2.6vw,38px)', lineHeight: 1 }}>
              {len.toUpperCase()} MONOLOGLAR
            </h2>
            <span className="font-mono text-[11px] tracking-widest2 uppercase text-dim">
              {len === 'kısa' ? '~1 dakika' : len === 'orta' ? '1–2 dakika' : '2 dakika+'} · {byLength[len].length} adet
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {byLength[len].map((m) => (
              <article key={m.slug} className="bg-bg p-7 md:p-8">
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon">{m.gender}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">{m.age} yaş</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">{m.lang === 'en' ? 'İngilizce' : 'Türkçe'}</span>
                </div>

                <h3 className="font-display text-fg leading-tight mb-1" style={{ fontSize: 'clamp(19px,1.8vw,26px)' }}>
                  {m.character}
                </h3>
                <p className="font-mono text-[12px] text-stone mb-5">
                  <em>{m.play}</em>{m.playEn && m.playEn !== m.play ? ` (${m.playEn})` : ''} · {m.author} · {m.year}
                </p>

                <div className="border-l-2 border-neon pl-4 mb-5">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-1">ton</span>
                  <p className="font-mono text-[12px] text-fg leading-relaxed">{m.tone}</p>
                </div>

                <div className="mb-5">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-1">sahnenin bağlamı</span>
                  <p className="font-mono text-[12px] text-stone leading-relaxed">{m.context}</p>
                </div>

                <div>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-1">çalışma notu</span>
                  <p className="font-mono text-[12px] text-stone leading-relaxed">{m.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* SSS */}
      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          SIKÇA SORULANLAR
        </h2>
        <div className="max-w-3xl space-y-8">
          {FAQ.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[19px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-16">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">salonda çalışmak</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          MONOLOĞU TEK BAŞINA ÇALIŞMAK<br />BİR YERE KADAR GİDER.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Metnin nerede öldüğünü kendi kulağınla duyamazsın. Oyunculuk atölyelerimizde
          her katılımcı kendi metniyle, grup önünde ve yönlendirmeyle çalışıyor.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/atolyeler/oyuncunun-mevcudiyeti" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            oyunculuk atölyeleri →
          </Link>
          <Link href="/kaynaklar/ses-nefes" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            ses & nefes egzersizleri →
          </Link>
        </div>
      </section>
    </>
  )
}
