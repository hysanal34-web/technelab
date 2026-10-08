import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { VOICE_LISTS, OVERDONE, ALTERNATIVES, TOPLAM_SARKI, type SongList } from '@/lib/secmeSarkilari'

const path = '/kaynaklar/muzikal-secme-sarkilari'
const title = 'Müzikal Seçme Şarkıları: Ses Tipine Göre Şarkı Önerileri ve Kaçınılacaklar'
const description =
  'Soprano, mezzo/belter, tenor ve bariton için müzikal seçme (audition) şarkıları; çok söylenen şarkılar ve yerine söylenebilecekler. Kaynaklı liste ve şarkı seçme rehberi, ücretsiz.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_META.url}${path}` },
  openGraph: {
    title, description,
    url: `${SITE_META.url}${path}`,
    images: [{ url: `${SITE_META.url}/images/og-techne-lab.png`, width: 1200, height: 630, alt: 'Müzikal Seçme Şarkıları' }],
  },
  keywords: [
    'müzikal seçme şarkıları', 'müzikal seçmeleri şarkı önerileri', 'audition şarkısı',
    'ses tipine göre müzikal şarkıları', 'soprano seçme şarkısı', 'mezzo seçme şarkısı',
    'tenor seçme şarkısı', 'bariton seçme şarkısı', 'müzikal tiyatro seçmeleri',
    'konservatuvar müzikal tiyatro seçme şarkısı', 'overdone audition songs',
  ],
}

const ILKELER = [
  {
    t: 'Sesinizi değil, sizi gösteren şarkı',
    d: 'Seçme paneli yalnızca en yüksek notanızı duymak istemez; nasıl bir oyuncu olduğunuzu görmek ister. En rahat söylediğiniz ve bir karakter olarak inandığınız şarkı, en zor söylediğinizden genellikle daha iyi sonuç verir.',
  },
  {
    t: 'Bir şarkı, bir hikâye',
    d: 'Müzikal şarkısı bir monologdur: karakter bir şey ister, bir şey değişir. Şarkının başında ve sonunda karakter aynı yerde değilse, kesiti o yolculuğu gösterecek şekilde seçin.',
  },
  {
    t: '16 ve 32 ölçü kesitleri',
    d: 'Pek çok seçmede tam şarkı yerine kısa bir kesit istenir. İlanda ne istendiğini okuyun; kesitinizi önceden belirleyin, notada açıkça işaretleyin ve piyaniste net bir başlangıç verin.',
  },
  {
    t: 'İki zıt şarkı hazırlayın',
    d: 'Biri yavaş ve duygusal (ballad), biri hızlı ya da komik (up-tempo). Panel “başka bir şey var mı?” diye sorduğunda ikinci şarkı, sizin başka bir renginizi gösterir.',
  },
  {
    t: 'Rolüne yakın bir dönem ve tarz',
    d: 'Klasik bir yapım için klasik dönem (legit) bir şarkı, çağdaş bir pop-rock müzikal için çağdaş bir şarkı. Rolün yazıldığı dünyaya yakın durmak, panelin sizi o rolde hayal etmesini kolaylaştırır.',
  },
  {
    t: 'Çok söylenen şarkılardan uzak durun',
    d: 'Aşağıdaki “çok söylenenler” listesi kötü şarkılar değil. Ama panel o şarkının en iyi versiyonunu kafasında taşıyor ve sizi onunla karşılaştırıyor. Az duyulan güçlü bir şarkı, dikkati sizde tutar.',
  },
  {
    t: 'Türkçe seçmelerde ilanı okuyun',
    d: 'Türkiye’deki müzikal seçmelerinde Türkçe bir şarkı, belirli bir yapımdan bir şarkı ya da serbest seçim istenebilir. Önce ilanın tam olarak ne istediğini okuyun; bu sayfadaki listeler İngilizce repertuvar içindir.',
  },
]

const FAQ = [
  {
    q: 'Müzikal seçmesinde hangi şarkıyı söylemeliyim?',
    a: 'Ses tipinize uyan, rahat söylediğiniz, bir karakter olarak oynayabildiğiniz ve seçme yapılan rolün dönemine ve tarzına yakın bir şarkı. Çok söylenen şarkılardan kaçınmak ve biri yavaş biri hızlı iki şarkı hazırlamak en sık verilen öğütlerdir.',
  },
  {
    q: 'Ses tipimi nasıl bilebilirim?',
    a: 'En güvenilir yol bir şan eğitmeniyle çalışmaktır. Ses tipi yalnızca ulaşabildiğiniz en yüksek ya da en alçak notayla değil, sesinizin en rahat ve en güçlü olduğu aralıkla ve tınısıyla belirlenir. Kendi kendine yapılan sınıflandırmalar yanıltıcı olabilir.',
  },
  {
    q: '16 ölçü ve 32 ölçü ne demek?',
    a: 'Seçmelerde zamanı verimli kullanmak için şarkının tamamı yerine kısa bir bölümü istenir. 16 ölçü yaklaşık otuz saniye, 32 ölçü yaklaşık bir dakikalık bir kesit demektir; süre şarkının temposuna göre değişir. Kesit, şarkının dramatik olarak en güçlü ve sesinizi en iyi gösteren bölümü olmalıdır.',
  },
  {
    q: 'Popüler bir şarkı söylemek neden risk?',
    a: 'Çünkü panel o şarkıyı çok sık duyuyor ve kafasında ünlü bir versiyonu var. İyi söyleseniz bile karşılaştırılırsınız; dikkat sizin yorumunuzdan çok şarkının kendisine gider.',
  },
  {
    q: 'Bu listedeki şarkıları Türkiye’deki seçmelerde kullanabilir miyim?',
    a: 'İngilizce repertuvar kabul eden seçmelerde ve yurt dışı başvurularında evet. Türkçe şarkı istenen seçmelerde ilanın koşullarına uyun.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_META.url },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: `${SITE_META.url}/kaynaklar` },
    { '@type': 'ListItem', position: 3, name: 'Müzikal Seçme Şarkıları', item: `${SITE_META.url}${path}` },
  ],
}

function ListBlock({ l }: { l: SongList }) {
  return (
    <section id={l.key} className="px-4 md:px-10 py-14 border-b border-border scroll-mt-32">
      <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-2">{l.voice}</p>
      <h2 className="font-display text-fg mb-4" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
        {l.label.toLocaleUpperCase('tr-TR')}
      </h2>
      <p className="font-mono text-[13px] text-stone leading-relaxed max-w-3xl mb-8">{l.note}</p>
      <ol className="grid md:grid-cols-2 gap-px bg-border max-w-5xl">
        {l.songs.map((s, i) => (
          <li key={s.song + s.show} className="bg-bg p-5 flex gap-4">
            <span className="font-mono text-[11px] text-neon shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="font-display text-fg block leading-snug" style={{ fontSize: 'clamp(16px,1.6vw,20px)' }}>{s.song}</span>
              <span className="font-mono text-[12px] text-stone">{s.show}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="font-mono text-[11px] text-dim mt-5">
        kaynak: <a href={l.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-neon underline underline-offset-4">{l.source.name}</a>
      </p>
    </section>
  )
}

export default function SecmeSarkilariPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="px-4 md:px-10 pt-24 pb-16 border-b border-border">
        <div className="h-0.5 w-full bg-neon mb-8" />
        <Link href="/kaynaklar" data-hover className="font-mono text-[11px] tracking-widest2 uppercase text-dim hover:text-neon transition-colors mb-4 inline-block">
          ← kaynaklar
        </Link>
        <h1 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(34px,5.6vw,84px)', letterSpacing: '0.01em', lineHeight: 0.92 }}>
          MÜZİKAL SEÇME<br />ŞARKILARI
        </h1>
        <p className="font-mono text-[14px] text-stone max-w-2xl leading-relaxed mb-4">
          Ses tipine göre seçme (audition) şarkıları, seçme panellerinin çok sık duyduğu şarkılar ve
          yerlerine söylenebilecekler. Listeler, belirtilen kaynaklarda yayımlandığı haliyle derlendi.
        </p>
        <p className="font-mono text-[12px] text-dim">{TOPLAM_SARKI} şarkı · 4 ses tipi · kaynaklı · ücretsiz</p>
      </section>

      <section className="px-4 md:px-10 py-8 border-b border-border sticky top-16 z-20 bg-bg">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#nasil-secilir" className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors">nasıl seçilir</a>
          {[...VOICE_LISTS, ...OVERDONE, ALTERNATIVES].map((l) => (
            <a key={l.key} href={`#${l.key}`} className="font-mono text-[11px] tracking-widest2 uppercase text-stone hover:text-neon transition-colors">{l.label}</a>
          ))}
        </div>
      </section>

      <section id="nasil-secilir" className="px-4 md:px-10 py-14 border-b border-border bg-bgAlt scroll-mt-32">
        <h2 className="font-display text-fg mb-8" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          ŞARKI NASIL SEÇİLİR?
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-border max-w-5xl">
          {ILKELER.map((x, i) => (
            <div key={x.t} className="bg-bgAlt p-6">
              <span className="font-mono text-[11px] text-neon block mb-2">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-fg mb-2 leading-snug" style={{ fontSize: 'clamp(17px,1.7vw,22px)' }}>{x.t}</h3>
              <p className="font-mono text-[12px] text-stone leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[12px] text-stone mt-8 max-w-3xl leading-relaxed">
          Başvuru videosu hazırlıyorsanız <Link href="/makaleler/muzikal-basvuru-videosu-nasil-hazirlanir" className="text-neon hover:underline">müzikal başvuru videosu rehberimize</Link>,
          İngilizce şarkılarda telaffuz için <Link href="/makaleler/muzikalde-ingilizce-sarki-soylemek" className="text-neon hover:underline">müzikalde İngilizce şarkı söylemek</Link> yazımıza bakabilirsiniz.
        </p>
      </section>

      {VOICE_LISTS.map((l) => <ListBlock key={l.key} l={l} />)}
      {OVERDONE.map((l) => <ListBlock key={l.key} l={l} />)}
      <ListBlock l={ALTERNATIVES} />

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
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">şarkıyı seçmek yetmez</p>
        <h2 className="font-display text-fg mb-6" style={{ fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1 }}>
          ŞARKIYI OYNAMAK<br />BAŞKA BİR İŞ.
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-xl leading-relaxed mb-8">
          Techne Musical Lab’de şarkı, oyunculuk ve dans aynı çalışmanın içinde: repertuvar seçimi,
          kesit hazırlığı ve şarkıyı bir sahne gibi oynamak. Kadıköy’de, ücretsiz tanışma oturumuyla başlıyor.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/muzikal-tiyatro-kursu-istanbul" data-hover className="font-mono text-[12px] tracking-widest2 uppercase bg-neon text-bg px-8 py-4 hover:bg-fg transition-colors">
            müzikal tiyatro programı →
          </Link>
          <Link href="/tanisma-gunu?program=techne-musical-lab" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            ücretsiz tanışma →
          </Link>
          <Link href="/kaynaklar/ses-nefes" data-hover className="font-mono text-[12px] tracking-widest2 uppercase border border-border text-fg px-8 py-4 hover:border-neon hover:text-neon transition-colors">
            ses & nefes egzersizleri →
          </Link>
        </div>
      </section>
    </>
  )
}
