import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { D_CATEGORIES, D_TOTAL, PHRASES, FORMATS } from '@/lib/tartismaKonulari'

const path = '/kaynaklar/ingilizce-tartisma-konulari'
const title = 'İngilizce Tartışma Konuları — B2 ve C1 İçin 60 Debate Konusu ve Kalıplar'
const description =
  'Konuşma kulüpleri ve speaking pratiği için 12 kategoride 60 İngilizce tartışma önergesi (debate motion). Her konuda lehte ve aleyhte açılış argümanı, B2/C1 seviye işareti, tartışma kalıpları ve 4 kulüp formatı. Ücretsiz.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_META.url}${path}` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}${path}`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'İngilizce Tartışma Konuları' }],
  },
  keywords: [
    'ingilizce tartışma konuları', 'ingilizce debate konuları', 'debate topics', 'debate topics for adults',
    'b2 tartışma konuları', 'c1 debate topics', 'ingilizce münazara konuları', 'speaking club debate',
    'ingilizce tartışma kalıpları', 'agree disagree phrases', 'konuşma kulübü konuları',
  ],
}

const FAQ = [
  {
    q: 'Tartışma konusu ile konuşma sorusu arasındaki fark ne?',
    a: 'Konuşma sorusu kişisel deneyimi ve görüşü açar; tartışma önergesi ise bir taraf seçmeyi ister. "This house would…" kalıbı bir öneri koyar, bir grup savunur, diğer grup karşı çıkar. Bu yüzden önergeler daha çok B2 ve C1 için uygun: gerekçe kurmak, karşı argümanı tartmak ve çürütmek gerekiyor. Daha sohbet odaklı bir oturum için konuşma kulübü soru bankasını kullanabilirsiniz.',
  },
  {
    q: '"This house believes" ve "This house would" ne demek?',
    a: 'Münazara geleneğinden gelen kalıplar. "This house believes…" bir görüşün doğru olup olmadığını tartıştırır; "This house would…" bir eylemin yapılıp yapılmaması gerektiğini; "This house regrets…" bir gelişmenin iyi mi kötü mü olduğunu. Kalıp, konuşmayı kişisel kavgadan çıkarıp önergeye bağlar.',
  },
  {
    q: 'B2 ve C1 işaretleri neye göre verildi?',
    a: 'B2 işaretli önergeler somut ve günlük hayata yakın; artı-eksi tartmak yeterli. C1 işaretli önergeler soyut kavramlar, değer çatışmaları ve ince ayrımlar içeriyor. Aynı önergeyi farklı seviyelerde de kullanabilirsiniz: B1 bir grup için önergeyi "Do you agree that…?" sorusuna çevirmek işe yarar.',
  },
  {
    q: 'Lehte ve aleyhte argümanlar neden tek cümle?',
    a: 'Bunlar cevap değil, kıvılcım. Takıma tek bir açılış cümlesi vermek hazırlığı hızlandırır ama argümanı geliştirme işini katılımcıya bırakır. Hazırlık süresinde her takımdan iki gerekçe ve bir örnek daha bulmasını isteyin.',
  },
  {
    q: 'Grupta kimse karşı tarafı savunmak istemezse?',
    a: 'Tarafı kura ile belirleyin. Kendi fikrine karşı konuşmak hem dil hem düşünce için en iyi çalışmalardan biridir, çünkü hazır cümlelere yaslanamazsınız. Rollü tartışma formatı da işe yarar: katılımcı kendi fikrini değil, bir karakterin çıkarını savunur.',
  },
  {
    q: 'Bu konuları kendi kulübümde ya da sınıfımda kullanabilir miyim?',
    a: 'Evet, sayfadaki tüm önergeler ve kalıplar ücretsiz. Kaynak olarak bu sayfaya bağlantı verirseniz seviniriz.',
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
  numberOfItems: D_CATEGORIES.length,
  itemListElement: D_CATEGORIES.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${c.tr} (${c.en})`,
    url: `${SITE_META.url}${path}#${c.key}`,
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: `${SITE_META.url}/kaynaklar` },
    { '@type': 'ListItem', position: 3, name: 'İngilizce Tartışma Konuları', item: `${SITE_META.url}${path}` },
  ],
}

const H2 = { fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 } as const

export default function TartismaKonulariPage() {
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
          İNGİLİZCE<br />TARTIŞMA KONULARI
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          Konuşma kulüpleri ve speaking pratiği için tartışma önergeleri (debate motions). Her önergede bir lehte,
          bir aleyhte açılış argümanı var; gerisini grup kuruyor. Altta tartışma kalıpları ve kulüpte kullanılabilecek dört format.
        </p>
        <p className="font-mono text-[12px] text-dim">
          {D_CATEGORIES.length} kategori · {D_TOTAL} önerge · B2 / C1 · {PHRASES.length} kalıp grubu · {FORMATS.length} format · ücretsiz
        </p>
      </section>

      <section className="px-4 md:px-10 py-8 border-b border-border sticky top-16 z-20 bg-bg">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {D_CATEGORIES.map((c) => (
            <a key={c.key} href={`#${c.key}`} data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors">
              {c.tr}
            </a>
          ))}
          <a href="#kaliplar" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-neon">kalıplar</a>
          <a href="#formatlar" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-neon">formatlar</a>
        </div>
      </section>

      {D_CATEGORIES.map((c) => (
        <section key={c.key} id={c.key} className="px-4 md:px-10 py-14 border-b border-border scroll-mt-32">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-2">{c.en}</p>
          <h2 className="font-display text-fg mb-8" style={H2}>{c.tr.toLocaleUpperCase('tr-TR')}</h2>
          <ol className="grid gap-px bg-border">
            {c.motions.map((x, i) => (
              <li key={i} className="bg-bg p-6 md:p-7">
                <p className="font-mono text-[14px] text-fg leading-relaxed">
                  <span className="text-neon mr-2">{String(i + 1).padStart(2, '0')}</span>{x.m}
                  <span className="ml-3 font-mono text-[10px] tracking-[0.16em] uppercase text-dim border border-border px-2 py-0.5">{x.level}</span>
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4 pl-7">
                  <p className="font-mono text-[12px] text-stone leading-relaxed"><span className="text-neon">for → </span>{x.pro}</p>
                  <p className="font-mono text-[12px] text-stone leading-relaxed"><span className="text-dim">against → </span>{x.con}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <section id="kaliplar" className="px-4 md:px-10 py-16 border-b border-border bg-bgAlt scroll-mt-32">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-2">useful phrases</p>
        <h2 className="font-display text-fg mb-10" style={H2}>TARTIŞMA KALIPLARI</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {PHRASES.map((p) => (
            <div key={p.key} className="bg-bgAlt p-6">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-4">{p.tr}</span>
              <ul className="space-y-2">
                {p.items.map((t) => <li key={t} className="font-mono text-[13px] text-fg leading-relaxed">{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="formatlar" className="px-4 md:px-10 py-16 border-b border-border scroll-mt-32">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-2">club formats</p>
        <h2 className="font-display text-fg mb-10" style={H2}>KULÜPTE DÖRT FORMAT</h2>
        <div className="grid md:grid-cols-2 gap-px bg-border max-w-5xl">
          {FORMATS.map((f) => (
            <div key={f.key} className="bg-bg p-6 md:p-7">
              <h3 className="font-display text-fg text-[20px] mb-1">{f.name}</h3>
              <span className="font-mono text-[11px] text-dim block mb-3">{f.time}</span>
              <p className="font-mono text-[13px] text-stone leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 py-16 border-b border-border">
        <h2 className="font-display text-fg mb-10" style={H2}>SIKÇA SORULANLAR</h2>
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
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">tartışmadan sahneye</p>
        <h2 className="font-display text-fg mb-6" style={H2}>FİKRİ SAVUNMAK<br />BİR ROLDÜR.</h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Rollü tartışma formatı hoşunuza gittiyse, English Drama Lab bunun haftalık hali: doğaçlama ve sahne
          çalışmasıyla İngilizce konuşmak, B1 ve üzeri yetişkinler için. Pera ve Kadıköy’de ücretsiz tanışma oturumları var.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/kaynaklar/konusma-kulubu-sorulari" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            216 konuşma sorusu →
          </Link>
          <Link href="/makaleler/konusma-kulubu-nasil-yonetilir" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            moderatör rehberi →
          </Link>
          <Link href="/ingilizce-konusma-kulubu-istanbul" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            konuşma kulübü yerine drama →
          </Link>
        </div>
      </section>
    </>
  )
}
