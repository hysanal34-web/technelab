import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { OYUNLAR, KATEGORILER, OYUN_SAYISI, type Seviye } from '@/lib/dogaclamaOyunlari'

// 29 Ekim 2026: "ingilizce doğaçlama oyunları" kaynak sayfası. Oyun metinleri özgün;
// geleneksel improv oyunları. Ticari karşılık: /ingilizce-dogaclama-atolyesi-istanbul.

const path = '/kaynaklar/ingilizce-dogaclama-oyunlari'
const title = `İngilizce Doğaçlama Oyunları — Seviyeye Göre ${OYUN_SAYISI} Oyun`
const description =
  'İngilizce konuşma kulüpleri, sınıflar ve drama grupları için seviyeye göre doğaçlama oyunları: yönerge, örnek replikler, A1–A2 ve B2 uyarlamaları. Ücretsiz.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_META.url}${path}` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}${path}`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'İngilizce Doğaçlama Oyunları' }],
  },
  keywords: [
    'ingilizce doğaçlama oyunları', 'ingilizce drama oyunları', 'improv games for esl', 'improv games english class',
    'ingilizce konuşma oyunları yetişkin', 'speaking club oyunları', 'doğaçlama oyunları', 'improv oyunları',
    'drama oyunları yetişkin', 'ingilizce konuşma kulübü etkinlikleri', 'esl drama games', 'yes and oyunu',
  ],
}

const SEVIYE_ETIKET: Record<Seviye, string> = { 'a1-a2': 'A1–A2', b1: 'B1', b2: 'B2+' }

const FAQ = [
  {
    q: 'Bu oyunlar hangi seviyeye uygun?',
    a: 'Her oyunun yanında oynanabileceği seviyeler yazıyor. A1–A2 etiketli oyunlar kısa kalıplar ve hareketle oynanır; B2 oyunları uzun sahne, karakter ve tartışma ister. Her oyunda seviyeye göre nasıl kolaylaştırılacağı ya da zorlaştırılacağı ayrıca not edildi.',
  },
  {
    q: 'Doğaçlama oyunu oynatmak için tiyatro deneyimi gerekir mi?',
    a: 'Hayır. Yönergeler kolaylaştırıcının yüksek sesle okuyabileceği şekilde yazıldı. Asıl iş, oyunu durdurmamak ve hatayı düzeltmek için akışı kesmemek. Dil üzerine konuşmayı oyunun sonuna bırakın.',
  },
  {
    q: 'Bir oturumda kaç oyun oynanır?',
    a: 'Doksan dakikalık bir oturum için genellikle bir iki ısınma, bir dinleme ya da hikâye oyunu ve bir sahne oyunu yeter. Oyunu çok sık değiştirmek, katılımcının oyuna yerleşmesine fırsat bırakmaz.',
  },
  {
    q: 'Bu oyunları kendi grubumda kullanabilir miyim?',
    a: 'Evet, ücretsiz. Sınıfınızda, konuşma kulübünüzde ya da arkadaş grubunuzda kullanabilirsiniz. Kaynak olarak bu sayfaya bağlantı verirseniz seviniriz.',
  },
  {
    q: 'Oyunlar bir doğaçlama atölyesinin yerini tutar mı?',
    a: 'Bir başlangıç noktası olur. Atölyede fark yaratan şey oyunun kendisinden çok, her hafta aynı grupla derinleşmek ve oyunların sahneye dönüşmesidir. İstanbul\'da bunu İngilizce yapmak isteyenler için English Drama Lab var.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const listLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: title,
  description,
  url: `${SITE_META.url}${path}`,
  numberOfItems: OYUN_SAYISI,
  itemListElement: OYUNLAR.map((o, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${o.ad} (${o.tr})`,
    url: `${SITE_META.url}${path}#${o.slug}`,
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: `${SITE_META.url}/kaynaklar` },
    { '@type': 'ListItem', position: 3, name: 'İngilizce Doğaçlama Oyunları', item: `${SITE_META.url}${path}` },
  ],
}

export default function DogaclamaOyunlariPage() {
  const a1Sayi = OYUNLAR.filter((o) => o.seviye.includes('a1-a2')).length
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <Link href="/kaynaklar" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors mb-4 inline-block">
          ← kaynaklar
        </Link>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(34px,5.6vw,84px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          İNGİLİZCE<br />DOĞAÇLAMA OYUNLARI
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          İngilizce konuşma kulüpleri, sınıflar ve drama grupları için seviyeye göre doğaçlama oyunları.
          Her oyunda Türkçe açıklama, yüksek sesle okunacak İngilizce yönerge, örnek replikler ve seviye notu var.
        </p>
        <p className="font-mono text-[12px] text-dim">
          {OYUN_SAYISI} oyun · {a1Sayi} tanesi A1–A2&apos;de oynanabilir · {KATEGORILER.length} kategori · ücretsiz
        </p>
      </section>

      <section className="px-4 md:px-10 py-8 border-b border-border sticky top-16 z-20 bg-bg">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {KATEGORILER.map((k) => (
            <a key={k.key} href={`#k-${k.key}`} data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors">
              {k.label}
            </a>
          ))}
        </div>
      </section>

      {KATEGORILER.map((k) => {
        const oyunlar = OYUNLAR.filter((o) => o.kategori === k.key)
        if (!oyunlar.length) return null
        return (
          <section key={k.key} id={`k-${k.key}`} className="px-4 md:px-10 py-14 border-b border-border scroll-mt-32">
            <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
              {k.label.toLocaleUpperCase('tr-TR')}
            </h2>
            <p className="font-mono text-[13px] text-stone max-w-3xl leading-relaxed mb-10">{k.desc}</p>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {oyunlar.map((o) => (
                <article key={o.slug} id={o.slug} className="bg-bg p-6 md:p-8 scroll-mt-32">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {o.seviye.map((s) => (
                      <span key={s} className="font-mono text-[10px] tracking-[0.14em] uppercase text-neon border border-neon/40 px-2 py-0.5">{SEVIYE_ETIKET[s]}</span>
                    ))}
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-dim px-1 py-0.5">{o.kisi} · {o.sure}</span>
                  </div>
                  <h3 className="font-display text-fg text-[24px] leading-tight">{o.ad}</h3>
                  <p className="font-mono text-[12px] text-stone mb-4">{o.tr}</p>
                  <p className="font-mono text-[12px] text-fg leading-relaxed mb-3"><span className="text-dim">odak: </span>{o.odak}</p>
                  <p className="font-mono text-[13px] text-stone leading-relaxed mb-4">{o.nasil}</p>
                  <div lang="en" className="border-l-2 border-neon pl-4 mb-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-1">read aloud</span>
                    <p className="font-mono text-[13px] text-fg leading-relaxed">{o.yonerge}</p>
                  </div>
                  <ul lang="en" className="space-y-1 mb-4">
                    {o.ornek.map((x) => (
                      <li key={x} className="font-mono text-[12px] text-stone leading-relaxed">“{x}”</li>
                    ))}
                  </ul>
                  <p className="font-mono text-[12px] text-stone leading-relaxed"><span className="text-dim">seviye: </span>{o.seviyeNotu}</p>
                  {o.ipucu && (
                    <p className="font-mono text-[12px] text-stone leading-relaxed mt-2"><span className="text-dim">ipucu: </span>{o.ipucu}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )
      })}

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
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">oyundan sahneye</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          OYUN BİTİNCE<br />SAHNE BAŞLAR.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Bu oyunları her hafta, aynı grupla ve sahneye dönüşerek oynamak istersen: English Drama Lab,
          İstanbul&apos;da İngilizce doğaçlama atölyesi. Pera ve Kadıköy, yetişkinler, esnek katılım.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/ingilizce-dogaclama-atolyesi-istanbul" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            ingilizce doğaçlama atölyesi →
          </Link>
          <Link href="/kaynaklar/konusma-kulubu-sorulari" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            konuşma kulübü soruları →
          </Link>
          <Link href="/makaleler/dogaclama-ile-ingilizce-nasil-calisilir" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            bir oturum nasıl kurulur →
          </Link>
          <Link href="/tanisma-gunu?program=english-drama-lab" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            ücretsiz tanışma →
          </Link>
        </div>
      </section>
    </>
  )
}
