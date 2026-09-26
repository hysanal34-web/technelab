export const dynamic = 'force-dynamic'

/**
 * Araçlar — dışarıdaki panellere tek kapı, ve ortam değişkeni sağlık kontrolü.
 *
 * NEDEN DEĞER GÖSTERİLMİYOR: bu sayfa yalnız "tanımlı mı" diyor, değeri
 * basmıyor. Bir anahtarın ekranda görünmesi, ekran paylaşımında ya da
 * görüntüde sızması demek. Tanımlı olup olmadığını bilmek sorun çözmeye yeter.
 */

const BAGLANTILAR: { grup: string; ogeler: { ad: string; url: string; not?: string }[] }[] = [
  {
    grup: 'reklam ve ölçüm',
    ogeler: [
      { ad: 'Meta Events Manager', url: 'https://business.facebook.com/events_manager2', not: 'piksel 1542440530516639' },
      { ad: 'Meta Reklam Yöneticisi', url: 'https://adsmanager.facebook.com/adsmanager', not: 'act_1943993929852674' },
      { ad: 'Meta İşletme Ayarları', url: 'https://business.facebook.com/settings', not: 'portföy 1605741837254289' },
      { ad: 'Google Ads', url: 'https://ads.google.com', not: '669-492-3541' },
      { ad: 'Google Analytics', url: 'https://analytics.google.com', not: 'GA4 548207464' },
      { ad: 'Search Console', url: 'https://search.google.com/search-console', not: 'www.technelabistanbul.com' },
    ],
  },
  {
    grup: 'operasyon',
    ogeler: [
      { ad: 'Kayıt tablosu', url: 'https://docs.google.com/spreadsheets/d/1SMfBjHhc080Rjqft5jPbFjMIRGlQcEXtXf0P0Gwl8Ek', not: 'TECHNE LAB TÜM PROGRAMLAR' },
      { ad: 'Vercel', url: 'https://vercel.com', not: 'deploy ve ortam değişkenleri' },
      { ad: 'Resend', url: 'https://resend.com/emails', not: 'form e-postaları' },
      { ad: 'PayTR', url: 'https://www.paytr.com/magaza', not: 'tahsilat' },
    ],
  },
]

const DEGISKENLER: { ad: string; ne: string; kritik: boolean }[] = [
  { ad: 'ADMIN_PASSWORD',              ne: 'bu panelin şifresi',                 kritik: true },
  { ad: 'RESEND_API_KEY',              ne: 'form e-postaları',                   kritik: true },
  { ad: 'BLOB_READ_WRITE_TOKEN',       ne: 'başvuru deposu',                     kritik: true },
  { ad: 'NEXT_PUBLIC_META_PIXEL_ID',   ne: 'tarayıcı tarafı piksel',             kritik: true },
  { ad: 'META_CAPI_ACCESS_TOKEN',      ne: 'sunucu tarafı olaylar (CAPI)',       kritik: true },
  { ad: 'NEXT_PUBLIC_GOOGLE_ADS_ID',   ne: 'Google Ads dönüşüm etiketi',         kritik: false },
  { ad: 'NEXT_PUBLIC_ADS_LABEL_BASVURU', ne: 'başvuru dönüşüm etiketi',          kritik: false },
  { ad: 'NEXT_PUBLIC_ADS_LABEL_TANISMA', ne: 'tanışma dönüşüm etiketi',          kritik: false },
  { ad: 'PAYTR_MERCHANT_ID',           ne: 'ödeme',                              kritik: false },
]

export default function Araclar() {
  const durum = DEGISKENLER.map((d) => ({
    ...d,
    tanimli: Boolean(process.env[d.ad]),
  }))
  const eksikKritik = durum.filter((d) => d.kritik && !d.tanimli)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-[30px] leading-none text-fg">ARAÇLAR</h1>
        <p className="mt-2 font-mono text-[12px] text-stone">
          Dış paneller ve kurulum sağlık kontrolü.
        </p>
      </div>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          ortam değişkenleri
        </h2>
        {eksikKritik.length > 0 && (
          <p className="mt-3 border-l-2 border-[#FF6B6B] pl-3 font-mono text-[12px] leading-relaxed text-[#FF6B6B]">
            {eksikKritik.length} kritik değişken tanımsız. Vercel → Settings → Environment
            Variables&apos;a ekleyip yeniden deploy et.
          </p>
        )}
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {durum.map((d) => (
            <li key={d.ad} className="flex flex-wrap items-baseline gap-x-3 py-2">
              <span
                className="w-[52px] shrink-0 font-mono text-[11px]"
                style={{ color: d.tanimli ? '#68D391' : d.kritik ? '#FF6B6B' : '#6B6B6B' }}
              >
                {d.tanimli ? 'tanımlı' : 'yok'}
              </span>
              <code className="font-mono text-[12px] text-fg">{d.ad}</code>
              <span className="font-mono text-[11px] text-dim">{d.ne}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-[11px] text-dim">
          Değerler bilerek gösterilmiyor; yalnızca tanımlı olup olmadıkları.
        </p>
      </section>

      {BAGLANTILAR.map((g) => (
        <section key={g.grup}>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">{g.grup}</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {g.ogeler.map((o) => (
              <li key={o.ad} className="flex flex-wrap items-baseline gap-x-3 py-2.5">
                <a
                  href={o.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[13px] text-fg hover:text-neon"
                >
                  {o.ad} ↗
                </a>
                {o.not && <span className="font-mono text-[11px] text-dim">{o.not}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
