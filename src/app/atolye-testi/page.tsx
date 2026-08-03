import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { AtolyeTesti } from '@/components/AtolyeTesti'

const title = 'Hangi Tiyatro Atölyesi Sana Uygun? — 2 Dakikalık Test'
const description = 'Oyunculuk mu, yazarlık mı, müzikal mi, İngilizce drama mı? 6 soruda sana en uygun atölyeyi bul. Ücretsiz, kayıt gerektirmez.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_META.url}/atolye-testi` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}/atolye-testi`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Hangi atölye sana uygun?' }],
  },
  keywords: [
    'hangi tiyatro kursu', 'hangi oyunculuk kursu', 'tiyatro kursu testi',
    'oyunculuk mu yazarlık mı', 'hangi atölye bana uygun',
    'tiyatro kursu seçimi', 'oyunculuk kursu seçimi', 'atölye önerisi',
    'sahne sanatları testi', 'istanbul tiyatro kursu hangisi',
  ],
}

const FAQ = [
  {
    q: 'Bu test nasıl çalışıyor?',
    a: 'Altı soruda ne aradığını, ne kadar zaman ayırabildiğini, hangi dilde çalışmak istediğini ve nereye gitmenin kolay olduğunu soruyoruz. Cevaplarına göre dokuz programımız arasından sana en uygun olanı öneriyoruz.',
  },
  {
    q: 'Sonuç kesin mi?',
    a: 'Hayır — bir yönlendirme aracı. Programların hepsi farklı ihtiyaçlara yanıt veriyor ve birden fazlası sana uygun olabilir. Sonuçta üç öneri gösteriyoruz; her birinin sayfasında ne yapıldığı ayrıntılı yazıyor.',
  },
  {
    q: 'Kayıt olmam gerekiyor mu?',
    a: 'Hayır. Test tamamen ücretsiz, e-posta ya da telefon istemiyoruz. Sonucu görmek için hiçbir şey bırakmana gerek yok.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Atölye Eşleştirme Testi',
  description,
  url: `${SITE_META.url}/atolye-testi`,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
  provider: { '@type': 'Organization', name: SITE_META.name, '@id': `${SITE_META.url}#organization` },
}

export default function AtolyeTestiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-12 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">2 dakika · 6 soru · ücretsiz</p>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(32px,5.4vw,80px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          HANGİ ATÖLYE<br />SANA UYGUN?
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed">
          Dokuz programımız var ve hepsi farklı bir soruya yanıt veriyor. Birkaç soruyla
          hangisinin sana en yakın olduğunu bulalım. Kayıt yok, e-posta istemiyoruz.
        </p>
      </section>

      <section className="px-4 md:px-10 py-14 md:py-20">
        <div className="max-w-4xl">
          <AtolyeTesti />
        </div>
      </section>

      <section className="px-4 md:px-10 py-14 border-t border-border">
        <h2 className="font-display text-fg mb-10" style={{ fontSize: 'clamp(22px,2.8vw,40px)', lineHeight: 1 }}>
          TEST HAKKINDA
        </h2>
        <div className="max-w-3xl space-y-8">
          {FAQ.map((f) => (
            <div key={f.q} className="border-t border-border pt-6">
              <h3 className="font-display text-fg text-[19px] mb-3 leading-snug">{f.q}</h3>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/atolyeler" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            tüm programları gör →
          </Link>
          <Link href="/kaynaklar" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            ücretsiz kaynaklar →
          </Link>
        </div>
      </section>
    </>
  )
}
