import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'

// Manifesto (28 Ekim 2026). A1+ English Drama Lab ile birlikte yayımlandı ama
// Techne Lab'in İngilizce drama yaklaşımının tamamı için geçerli. Dış yayılım
// (basın, topluluk, liste editörleri) bu sayfaya bağlanır: docs/a1/YAYILIM-KITI.md.
// Dil kuralı: "akıcı İngilizce" / garanti vaadi yok.

const URL = `${SITE_META.url}/manifesto`

export const metadata: Metadata = {
  title: { absolute: 'Manifesto: Dil Okulu Değil, Tiyatro Topluluğu — Techne Lab' },
  description:
    'Techne Lab İngilizce drama manifestosu: dil okulu değil, tiyatro topluluğu. Burada kimse rezil olmaz; karakter bir maskedir; büyük vaat yok. TR ve EN.',
  alternates: { canonical: URL },
  keywords: ['ingilizce drama manifesto', 'drama ile ingilizce', 'english through drama manifesto', 'techne lab manifesto', 'a1 english drama'],
  openGraph: {
    title: 'Dil okulu değiliz, bir tiyatro topluluğuyuz',
    description: 'Önce beden ve durum, sonra kelime. Techne Lab İngilizce drama manifestosu.',
    url: URL,
  },
}

const TR: [string, string][] = [
  ['Biz dil okulu değiliz, bir tiyatro topluluğuyuz.', 'İngilizceyi bir sahnenin içinde, oyuncu arkadaşlarınla birlikte kullanırsın. Dili kurs öğretir; sahne kullandırır.'],
  ['Önce beden ve durum, sonra kelime.', 'Bir şeyi isterken, reddederken, ararken söylenen cümle daha kolay akılda kalır. Beden de hatırlar.'],
  ['Gramer önce gelmez, ama yok da değildir.', 'Yapıları sahnede görürsün; kuralı, ihtiyaç duyduğunda konuşuruz.'],
  ['Susmak da çalışmaya dahil.', 'İlk haftalarda dinlemek ve hareketle yanıt vermek yeterli; konuşmaya hazır olduğunda konuşursun.'],
  ['Burada kimse rezil olmaz.', 'Sahnede yanlış cümle yoktur, devam eden sahne vardır. Takıldığında durmayız; sen de durmazsın.'],
  ['Karakter bir maskedir.', 'İngilizcen birkaç kalıptan ibaret olabilir. Sahnede o kalıplar bir karakterin sesine dönüşür; utanç karaktere yapışmaz, sen de konuşursun.'],
  ['Geçiş, kalıbın bittiği anda olur.', "A2'den B1'e geçiş bir kitapta değil, hazır cümlen bittiğinde devam edebildiğin anda olur. Sahne o anı her hafta yeniden kurar."],
  ['Mükemmel İngilizce aramıyoruz.', 'Doğrusuyla yanlışıyla, gülerek, sahnenin tahmin edilemezliğinde kalan bir İngilizce arıyoruz.'],
  ['Büyük vaat vermiyoruz. En zor geçişte yanında oluyoruz.', '12 haftada mucize yok, akıcılık garantisi yok. Konuşmaya başlamak ve konuşmaktan korkmamak var. Yaşın, aksanın, geçmişin engel değil.'],
]

const EN: [string, string][] = [
  ['We are a theatre company, not a language school.', 'You use English inside a scene, with fellow players. Courses teach the language; the stage makes you use it.'],
  ['Body and situation first, words after.', 'A sentence you say while asking, refusing or looking for something is easier to keep. The body remembers too.'],
  ["Grammar doesn't come first, but it isn't missing.", 'You meet structures on stage; we talk about the rule when you need it.'],
  ['Silence counts as work.', "In the first weeks, listening and answering with movement is enough; you speak when you're ready."],
  ['Nobody gets humiliated here.', 'On stage there are no wrong sentences, only scenes that keep going. When you stumble, we do not stop, and neither do you.'],
  ['A character is a mask.', 'Your English may be a handful of phrases. On stage they become a character\'s voice; embarrassment sticks to the character, and you keep talking.'],
  ['The leap happens when the phrase runs out.', 'Moving from A2 to B1 happens not in a book but in the moment your ready-made sentence ends and you keep going. The stage recreates that moment every week.'],
  ["We're not after perfect English.", 'We want English that stays in the scene, right and wrong, laughing, in the unpredictability of the stage.'],
  ['No big promises. We stay with you through the hardest part.', 'No miracles in 12 weeks, no fluency guarantee. A real start to speaking, and not being afraid to. Your age, accent and past are not obstacles.'],
]

function Liste({ items }: { items: [string, string][] }) {
  return (
    <ol className="space-y-8">
      {items.map(([h, b], i) => (
        <li key={h} className="flex gap-5 items-baseline">
          <span className="font-mono text-[11px] text-neon shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <p className="font-display text-fg leading-tight mb-2" style={{ fontSize: 'clamp(22px,2.6vw,32px)' }}>{h}</p>
            <p className="font-mono text-[14px] text-stone leading-relaxed">{b}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function ManifestoPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': URL,
    url: URL,
    name: 'Techne Lab İngilizce Drama Manifestosu',
    inLanguage: ['tr', 'en'],
    isPartOf: { '@id': `${SITE_META.url}#website` },
    about: { '@id': `${SITE_META.url}#organization` },
    hasPart: [...TR, ...EN].map(([h, b]) => ({ '@type': 'Claim', text: `${h} ${b}` })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">manifesto</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          DİL OKULU DEĞİL,<br />
          <span className="text-neon">TİYATRO TOPLULUĞU.</span>
        </h1>
        <p className="font-mono text-[14px] text-stone leading-relaxed max-w-2xl mt-8">
          Techne Lab İstanbul İngilizceyi bir sınıfta değil, bir provada çalışıyor. Bu dokuz madde
          English Drama Lab, English Drama Youth ve yakında açılacak A1+ English Drama Lab gruplarının
          ortak zemini.
        </p>
      </section>

      <section className="px-4 md:px-10 py-20 border-b border-border max-w-4xl" aria-label="Manifesto Türkçe">
        <Liste items={TR} />
      </section>

      <section className="px-4 md:px-10 py-20 border-b border-border bg-bgAlt" aria-label="12 haftada dürüst vaat">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon mb-6">12 haftada dürüst vaat</p>
          <p className="font-mono text-[14px] text-fg leading-relaxed mb-5">
            A1+ English Drama Lab 12 haftada akıcı İngilizce vaat etmiyor. Cambridge&apos;e göre sıfırdan A2
            seviyesine ulaşmak yaklaşık 180–200 rehberli saat sürüyor; bu program 24 saat. Avrupa Ortak Dil
            Çerçevesi de başlangıç seviyesinde akıcılığı kısa, büyük ölçüde hazır kalıplarla idare edebilmek
            olarak tanımlıyor.
          </p>
          <p className="font-mono text-[14px] text-stone leading-relaxed mb-5">
            Vaadimiz bu ilk basamağı sağlam kurmak. Gündelik hayatın en çok kullanılan kalıplarını önce
            duyuyor, bedenle karşılıyor, sonra bir karakterin ağzından farklı durumlarda tekrar tekrar
            söylüyorsun. On iki haftanın sonunda beklediğimiz üç değişiklik: çalıştığımız kalıpları daha az
            duraksayarak söylemek, İngilizce konuşmaya daha istekli olmak ve kısa bir sahneyi İngilizce
            oynayabilmek. Bu bir seviye atlama değil, konuşmaya başlamak.
          </p>
          <p className="font-mono text-[11px] text-dim leading-relaxed">
            Kaynak:{' '}
            <a className="underline hover:text-neon" href="https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours" target="_blank" rel="noopener noreferrer">
              Cambridge English, Guided learning hours
            </a>
            . Yöntemin dayanağı ve sınırları:{' '}
            <Link className="underline hover:text-neon" href="/makaleler/sifirdan-ingilizce-kac-saatte-ogrenilir">sıfırdan İngilizce kaç saatte öğrenilir</Link>,{' '}
            <Link className="underline hover:text-neon" href="/makaleler/tpr-nedir-bedenle-ingilizce">TPR nedir</Link>.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-10 py-20 border-b border-border" aria-label="Beden ve hafıza">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon mb-6">beden hatırlar</p>
          <p className="font-mono text-[14px] text-fg leading-relaxed mb-5">
            Kelimeyi bedeniyle öğrenen, onu daha iyi hatırlıyor. Jestlerle öğretilen yabancı kelimeler üzerine
            yapılan beyin görüntüleme çalışmalarında, kelimeyi jestle öğrenenler daha iyi hatırladı ve kelimeyi
            çevirirken beyinlerinde hareketle ilgili alanlar devreye girdi (Mayer ve ark., 2015, Current Biology).
          </p>
          <p className="font-mono text-[13px] text-stone leading-relaxed mb-5">
            Sınırı da söyleyelim: bu çalışmalar kelime hatırlamayı ölçtü; konuşmayı, akıcılığı ya da dramayı değil.
            &quot;Önce beden, sonra kelime&quot; maddemizin bilimsel ayağı bu kadar; daha fazlasını iddia etmiyoruz.
          </p>
          <p className="font-mono text-[11px] text-dim leading-relaxed">
            Kaynak:{' '}
            <a className="underline hover:text-neon" href="https://www.eurekalert.org/news-releases/762210" target="_blank" rel="noopener noreferrer">
              Max Planck Enstitüsü duyurusu, Mayer ve ark. 2015
            </a>
            . Konuşma kaygısı üzerine:{' '}
            <Link className="underline hover:text-neon" href="/ingilizce-konusma-ozguveni-istanbul">İngilizce konuşma özgüveni</Link>,{' '}
            <Link className="underline hover:text-neon" href="/a2-ingilizce-konusma-pratigi-istanbul">A2&apos;den B1&apos;e geçiş</Link>.
          </p>
        </div>
      </section>

      <section lang="en" className="px-4 md:px-10 py-20 border-b border-border max-w-4xl" aria-label="Manifesto in English">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neon mb-8">in english</p>
        <Liste items={EN} />
        <p className="font-mono text-[13px] text-stone leading-relaxed mt-10">
          A1+ English Drama Lab does not promise fluent English in 12 weeks. Cambridge estimates around
          180–200 guided learning hours to reach A2 from zero; this programme is 24. We build the first step:
          everyday phrases said with fewer pauses, more willingness to speak, and a short scene performed in
          English. See{' '}
          <Link className="underline hover:text-neon" href="/en/beginner-english-drama-istanbul">beginner English through drama</Link> and{' '}
          <Link className="underline hover:text-neon" href="/en/beginner-english-drama-for-kids-istanbul">beginner English drama for kids</Link>.
        </p>
      </section>

      <section className="px-4 md:px-10 py-16 grid md:grid-cols-3 gap-4">
        {[
          ['/sifirdan-ingilizce-konusma-istanbul', 'Sıfırdan İngilizce · yetişkin', 'A1+ · yakında'],
          ['/cocuklar-icin-baslangic-ingilizce-drama', 'Başlangıç · 8–12 ve 13–17', 'A1+ · yakında'],
          ['/a2-ingilizce-konusma-pratigi-istanbul', "A2'den B1'e köprü", 'A1+ · yakında'],
          ['/ingilizce-konusma-ozguveni-istanbul', 'Konuşma özgüveni · B1+', 'katılım açık'],
          ['/ingilizce-sunum-atolyesi-istanbul', 'İngilizce sunum · B1+', 'katılım açık'],
        ].map(([href, t, s]) => (
          <Link key={href} href={href} className="border border-border hover:border-neon p-6 transition-colors" data-hover>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon mb-2">{s}</p>
            <p className="font-display text-fg" style={{ fontSize: 24 }}>{t} →</p>
          </Link>
        ))}
        <Link href="/bekleme-listesi?program=a1-english-drama-lab" className="md:col-span-3 font-mono text-[11px] tracking-[0.14em] uppercase text-bg bg-neon hover:bg-fg text-center py-4 transition-colors" data-hover>
          A1+ bekleme listesine yazıl →
        </Link>
      </section>
    </>
  )
}
