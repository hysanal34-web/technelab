import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { TOPICS, LEVELS, TOPLAM_SORU } from '@/lib/konusmaSorulari'

const path = '/kaynaklar/konusma-kulubu-sorulari'
const title = 'İngilizce Konuşma Kulübü Soruları — B1, B2, C1 Seviyeye Göre 216 Soru'
const description =
  'İngilizce konuşma kulübü ve speaking pratiği için seviyeye göre ayrılmış 18 konu, 216 soru, her soruya takip sorusu, ısınma ve rol kartları. Moderatörler ve kendi başına çalışanlar için ücretsiz.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_META.url}${path}` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}${path}`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'İngilizce Konuşma Kulübü Soruları' }],
  },
  keywords: [
    'ingilizce konuşma kulübü soruları', 'ingilizce konuşma konuları', 'speaking club topics',
    'speaking club questions', 'conversation questions for adults', 'ingilizce speaking soruları',
    'b1 ingilizce konuşma soruları', 'b2 speaking soruları', 'c1 discussion questions',
    'ingilizce tartışma konuları', 'konuşma kulübü konuları',
  ],
}

const FAQ = [
  {
    q: 'Bu sorular hangi seviyeye uygun?',
    a: 'Sorular Avrupa Dil Çerçevesi’nin (CEFR) B1, B2 ve C1 seviyeleri için ayrıldı. B1 soruları tanıdık konularda kişisel deneyim ve görüş ister; B2 soruları bir görüşü savunmayı, seçenekleri tartmayı ve “ya şöyle olsaydı” varsayımlarını; C1 soruları soyut ve etik ikilemleri, ima ve mizahı. Grubunuz karışıksa aynı konuda farklı seviyelerden sorular seçebilirsiniz.',
  },
  {
    q: 'Bir konuşma kulübü oturumunda kaç soru kullanmalıyım?',
    a: 'Çoğu zaman sandığınızdan az. İyi bir takip sorusu tek bir soruyu on dakikalık bir konuşmaya çevirebilir. Bir oturum için bir konu, bir ısınma sorusu, seviyeye uygun üç dört soru ve bir rol kartı genellikle yeterli.',
  },
  {
    q: 'Takip sorusu (follow-up) neden önemli?',
    a: 'Ana soru konuşmayı açar, takip sorusu derinleştirir. Konuşma kulüplerinde sık görülen sorun, herkesin sırayla bir cevap verip konuşmanın bitmesidir. Takip sorusu cevabı kişisel bir örneğe ya da gerekçeye bağlar ve gerçek bir sohbet başlatır.',
  },
  {
    q: 'Rol kartları ne işe yarar?',
    a: 'Tartışma, kendi fikrinizi söylemeyi çalıştırır. Rol kartı ise başka birinin yerinden konuşmayı: ikna etmek, pazarlık etmek, özür dilemek, bir sorunu çözmek. Bu, gerçek hayatta en çok ihtiyaç duyulan ama sınıfta en az çalışılan konuşma türlerinden biri. Rol bir koruma da sağlar; hatayı siz değil, karakter yapar.',
  },
  {
    q: 'Bu soruları kendi kulübümde kullanabilir miyim?',
    a: 'Evet. Sayfadaki sorular ücretsiz; kulübünüzde, sınıfınızda ya da arkadaşlarınızla kullanabilirsiniz. Kaynak olarak bu sayfaya bağlantı verirseniz seviniriz.',
  },
  {
    q: 'Hataları düzeltmeli miyim?',
    a: 'Konuşmanın ortasında nadiren. Mesaj anlaşılıyorsa akışı bozmamak genellikle daha iyidir. Oturum sonunda, kişiyi öne çıkarmadan, duyduğunuz birkaç yapıyı grupça konuşmak daha verimli bir yoldur.',
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
  numberOfItems: TOPICS.length,
  itemListElement: TOPICS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${t.tr} (${t.en})`,
    url: `${SITE_META.url}${path}#${t.key}`,
  })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: `${SITE_META.url}/kaynaklar` },
    { '@type': 'ListItem', position: 3, name: 'İngilizce Konuşma Kulübü Soruları', item: `${SITE_META.url}${path}` },
  ],
}

export default function KonusmaSorulariPage() {
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
          KONUŞMA KULÜBÜ<br />SORULARI
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          İngilizce konuşma kulüpleri, speaking pratiği ve sohbet grupları için seviyeye göre ayrılmış
          soru bankası. Her sorunun bir takip sorusu var; her konunun bir ısınma sorusu ve bir rol kartı.
        </p>
        <p className="font-mono text-[12px] text-dim">
          {TOPICS.length} konu · {TOPLAM_SORU} soru · {TOPLAM_SORU} takip sorusu · {TOPICS.length} rol kartı · ücretsiz
        </p>
      </section>

      <section className="px-4 md:px-10 py-10 border-b border-border bg-bgAlt">
        <div className="grid md:grid-cols-3 gap-px bg-border max-w-5xl">
          {LEVELS.map((l) => (
            <div key={l.key} className="bg-bgAlt p-6">
              <span className="font-display text-neon block mb-2" style={{ fontSize: 28 }}>{l.label}</span>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[11px] text-dim mt-6 max-w-3xl leading-relaxed">
          Seviyeler Avrupa Konseyi’nin dil çerçevesindeki (CEFR) sözlü etkileşim tanımlarına göre ayrıldı.
          Nasıl kullanılır: bir konu seçin, ısınma sorusuyla açın, grubunuzun seviyesinden üç dört soru sorun,
          her cevaptan sonra takip sorusunu kullanın, oturumu rol kartıyla kapatın.
        </p>
      </section>

      <section className="px-4 md:px-10 py-8 border-b border-border sticky top-16 z-20 bg-bg">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {TOPICS.map((t) => (
            <a key={t.key} href={`#${t.key}`} data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors">
              {t.tr}
            </a>
          ))}
        </div>
      </section>

      {TOPICS.map((t) => (
        <section key={t.key} id={t.key} className="px-4 md:px-10 py-14 border-b border-border scroll-mt-32">
          <div className="mb-8">
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-2">{t.en}</p>
            <h2 className="font-display text-fg mb-4" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
              {t.tr.toLocaleUpperCase('tr-TR')}
            </h2>
            <p className="font-mono text-[13px] text-fg leading-relaxed max-w-3xl">
              <span className="text-dim">ısınma: </span>{t.warmup}
            </p>
            <p className="font-mono text-[12px] text-stone mt-3">
              <span className="text-dim">anahtar kelimeler: </span>{t.words.join(' · ')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {LEVELS.map((l) => (
              <div key={l.key} id={`${t.key}-${l.key}`} className="bg-bg p-6 md:p-7">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-4">{l.label}</span>
                <ol className="space-y-5">
                  {t.levels[l.key].map((x, i) => (
                    <li key={i}>
                      <p className="font-mono text-[13px] text-fg leading-relaxed">
                        <span className="text-neon mr-2">{String(i + 1).padStart(2, '0')}</span>{x.q}
                      </p>
                      <p className="font-mono text-[12px] text-stone leading-relaxed mt-1 pl-7">
                        <span className="text-dim">→ </span>{x.f}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-neon pl-5 mt-8 max-w-3xl">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-2">rol kartı</span>
            <p className="font-mono text-[13px] text-fg leading-relaxed">{t.role}</p>
          </div>
        </section>
      ))}

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
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">kulüpten sahneye</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          SORU BİTİNCE<br />SAHNE BAŞLAR.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Rol kartları sevdiyseniz, English Drama Lab bunun haftalık ve derinleşen hali: doğaçlama,
          sahne çalışması, B1 ve üzeri yetişkinler için. Pera ve Kadıköy’de ücretsiz tanışma oturumları var.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/ingilizce-konusma-kulubu-istanbul" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            konuşma kulübü yerine drama →
          </Link>
          <Link href="/makaleler/konusma-kulubu-nasil-yonetilir" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            moderatör rehberi →
          </Link>
          <Link href="/tanisma-gunu?program=english-drama-lab" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            ücretsiz tanışma →
          </Link>
        </div>
      </section>
    </>
  )
}
