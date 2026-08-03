import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { EXERCISES, EXERCISE_GROUPS } from '@/lib/kaynaklar'

const title = 'Ses & Nefes Egzersizleri — Oyuncular ve Şarkıcılar İçin'
const description = 'Oyunculuk ve şan için ses, nefes ve artikülasyon egzersizleri. Diyafram nefesi, rezonans, diksiyon ve sahne öncesi hazırlık rutini. Adım adım, ücretsiz.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_META.url}/kaynaklar/ses-nefes` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/kaynaklar/ses-nefes`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Ses ve Nefes Egzersizleri' }],
  },
  keywords: [
    'ses egzersizleri', 'nefes egzersizleri', 'diyafram nefesi',
    'diksiyon egzersizleri', 'artikülasyon egzersizi', 'tekerleme',
    'şan egzersizleri', 'ses ısınma', 'oyunculuk nefes çalışması',
    'sahne korkusu egzersiz', 'rezonans egzersizi', 'lip trill',
    'ses açma egzersizleri', 'konuşma sesi geliştirme',
  ],
}

const FAQ = [
  {
    q: 'Ses egzersizlerini günde ne kadar yapmalıyım?',
    a: 'Günde 10–15 dakika düzenli çalışmak, haftada bir kez 1 saat çalışmaktan çok daha etkilidir. Ses bir kas sistemi gibi çalışır — sıklık, süreden önemlidir. Sahne ya da provan varsa öncesinde mutlaka 5 dakikalık kısa bir ısınma yap.',
  },
  {
    q: 'Diyafram nefesi ile göğüs nefesi arasındaki fark nedir?',
    a: 'Göğüs nefesinde omuzlar yükselir, hava akciğerlerin üst kısmında kalır ve kontrol zayıftır. Diyafram nefesinde karın genişler, hava daha derine iner ve dışarı verilirken kontrol edilebilir. Sahne konuşmasının ve şarkının tamamı bu ikinci tip nefese dayanır.',
  },
  {
    q: 'Ses çalışırken boğazım ağrıyor, normal mi?',
    a: 'Hayır. Ses teknik çalışması ağrılı olmamalıdır. Boğazda yanma, kaşıntı ya da kısılma varsa yanlış bir şey yapıyorsun demektir — genellikle destek olmadan zorlamak. Hemen dur, dinlen. Ağrı tekrarlıyorsa bir ses eğitmenine ya da KBB uzmanına danış.',
  },
  {
    q: 'Bu egzersizler şarkı söylemek için de işe yarar mı?',
    a: 'Evet. Nefes desteği, rezonans ve gevşeme çalışmaları hem konuşma hem şarkı için ortak temeldir. Belting ve mix voice gibi müzikale özgü teknikler ise bu temelin üstüne, eğitmen eşliğinde kurulur — tek başına denenmemelidir.',
  },
  {
    q: 'Sahne korkusunu nefesle yenebilir miyim?',
    a: 'Nefes, sahne korkusunun fizyolojik tarafını yönetmenin en hızlı yoludur. Verişi alışından uzun tutmak (örneğin 4 sayıda al, 6 sayıda ver) parasempatik sistemi devreye sokar ve kalp atışını yavaşlatır. Ama korkuyu tamamen ortadan kaldırmak hedef değildir — enerjiyi kullanılabilir hale getirmek hedeftir.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: title,
  description,
  url: `${SITE_META.url}/kaynaklar/ses-nefes`,
  numberOfItems: EXERCISES.length,
  itemListElement: EXERCISES.map((e, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'HowTo',
      name: e.title,
      description: e.goal,
      totalTime: `PT${e.duration.replace(/\D/g, '')}M`,
      step: e.steps.map((s, si) => ({
        '@type': 'HowToStep',
        position: si + 1,
        text: s,
      })),
    },
  })),
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
    { '@type': 'ListItem', position: 3, name: 'Ses & Nefes Egzersizleri', item: `${SITE_META.url}/kaynaklar/ses-nefes` },
  ],
}

export default function SesNefesPage() {
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
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(34px,5.6vw,84px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          SES & NEFES<br />EGZERSİZLERİ
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          Sahne konuşması ve şarkının teknik temeli. Evde tek başına uygulanabilir egzersizler —
          adım adım, güvenlik notlarıyla.
        </p>
        <p className="font-mono text-[12px] text-dim">{EXERCISES.length} egzersiz · günde 10–15 dakika yeterli</p>
      </section>

      {/* Uyarı */}
      <section className="px-4 md:px-10 py-8 border-b border-border bg-bgAlt">
        <div className="border-l-2 border-neon pl-5 max-w-3xl">
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon mb-2">önce bunu oku</p>
          <p className="font-mono text-[12px] text-stone leading-relaxed">
            Ses çalışması hiçbir zaman ağrılı olmamalıdır. Boğazda yanma, kısılma ya da kaşıntı
            hissedersen dur. Bu sayfadaki egzersizler genel pratik içindir; ses ya da solunum
            rahatsızlığın varsa önce bir uzmana danış.
          </p>
        </div>
      </section>

      {/* Hızlı gezinme */}
      <section className="px-4 md:px-10 py-8 border-b border-border sticky top-16 z-20 bg-bg">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {EXERCISE_GROUPS.map((g) => (
            <a key={g.key} href={`#${g.key}`} data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors">
              {g.label}
            </a>
          ))}
        </div>
      </section>

      {EXERCISE_GROUPS.map((group) => {
        const items = EXERCISES.filter((e) => e.group === group.key)
        if (items.length === 0) return null
        return (
          <section key={group.key} id={group.key} className="px-4 md:px-10 py-14 border-b border-border scroll-mt-32">
            <div className="mb-10">
              <h2 className="font-display text-fg mb-2" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
                {group.label.toUpperCase()}
              </h2>
              <p className="font-mono text-[12px] text-dim">{group.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {items.map((e) => (
                <article key={e.slug} className="bg-bg p-7 md:p-8">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon">{e.level}</span>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">{e.duration}</span>
                  </div>

                  <h3 className="font-display text-fg leading-tight mb-3" style={{ fontSize: 'clamp(19px,1.8vw,26px)' }}>
                    {e.title}
                  </h3>

                  <p className="font-mono text-[12px] text-stone leading-relaxed mb-6">
                    <span className="text-dim">amaç: </span>{e.goal}
                  </p>

                  <ol className="space-y-3 mb-5">
                    {e.steps.map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-mono text-[11px] text-neon shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <span className="font-mono text-[12px] text-fg leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ol>

                  {e.warning && (
                    <div className="border-l-2 border-dim pl-4">
                      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-1">dikkat</span>
                      <p className="font-mono text-[11px] text-stone leading-relaxed">{e.warning}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )
      })}

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
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">eğitmenle çalışmak</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          KENDİ SESİNİ<br />DIŞARIDAN DUYAMAZSIN.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Bu egzersizler temeli kurar. Ama nerede gerildiğini, hangi sesin kaçtığını ve
          neyi düzeltmen gerektiğini ancak dışarıdan bir kulak söyleyebilir.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/atolyeler/techne-musical-lab" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            müzikal & şan programı →
          </Link>
          <Link href="/atolyeler" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            tüm atölyeler →
          </Link>
        </div>
      </section>
    </>
  )
}
