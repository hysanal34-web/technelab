import Link from 'next/link'
import { kayitlariGetir, olcumDepoBagliMi, SAKLAMA_GUN, type OlcumDonusum, type OlcumTiklama, type WaKayit } from '@/lib/olcumStore'
import { capiYapilandirildiMi } from '@/lib/metaCapi'
import { raporHazirla, DONUSUM_ETIKET, type Sayim } from '@/lib/olcumRapor'
import { eskileriTemizle } from './actions'

export const dynamic = 'force-dynamic'

/**
 * Dönüşüm ölçüm paneli.
 *
 * Her satır veri kaynağını yazar. Kaynağı olmayan metrik sayı göstermez,
 * "Entegrasyon gerekli" der. Meta Ads Manager'daki sayılar buradan farklı
 * çıkabilir: Meta kendi atıf penceresiyle (ör. tıklamadan sonra 7 gün) ve
 * modellemeyle sayıyor; burası yalnızca sitenin kendi kaydı.
 */

const ARALIK = [7, 30, 90] as const

const ENTEGRASYON = 'Entegrasyon gerekli'

export default async function OlcumPaneli({ searchParams }: { searchParams: Promise<{ gun?: string }> }) {
  const { gun: gunParam } = await searchParams
  const gun = ARALIK.includes(Number(gunParam) as (typeof ARALIK)[number]) ? Number(gunParam) : 30
  const baslangic = new Date(Date.now() - (gun - 1) * 86400_000).toISOString().slice(0, 10)

  const depo = olcumDepoBagliMi()
  const waBagli = Boolean(process.env.WHATSAPP_APP_SECRET && process.env.WHATSAPP_VERIFY_TOKEN)
  const [d, t, wa] = depo
    ? await Promise.all([
        kayitlariGetir<OlcumDonusum>('donusum', baslangic),
        kayitlariGetir<OlcumTiklama>('tiklama', baslangic),
        waBagli ? kayitlariGetir<WaKayit>('whatsapp', baslangic) : Promise.resolve([] as WaKayit[]),
      ])
    : [[], [], []]
  const r = raporHazirla(d, t, wa, waBagli)

  const durum: [string, boolean, string][] = [
    ['Meta Pixel (tarayıcı)', Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID), 'NEXT_PUBLIC_META_PIXEL_ID'],
    ['Meta Conversions API (sunucu)', capiYapilandirildiMi(), 'META_PIXEL_ID + META_CAPI_ACCESS_TOKEN'],
    ['Ölçüm deposu', depo, 'BLOB_READ_WRITE_TOKEN'],
    ['Tekil sayım anahtarı', Boolean(process.env.OLCUM_ANAHTARI || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD), 'OLCUM_ANAHTARI'],
    ['WhatsApp Business webhook', waBagli, 'WHATSAPP_APP_SECRET + WHATSAPP_VERIFY_TOKEN'],
    ['Telefon / santral entegrasyonu', false, 'çağrı takip sağlayıcısı yok'],
  ]
  const uyari: string[] = []
  if (process.env.META_TEST_EVENT_CODE) uyari.push('META_TEST_EVENT_CODE dolu: sunucu olayları gerçek raporlara değil Test Events sekmesine gidiyor. Test bitince sil.')
  if (process.env.META_CAPI_KURU === '1') uyari.push('META_CAPI_KURU=1: sunucu olayları Meta\'ya hiç gönderilmiyor, yalnızca loglanıyor.')

  const s = (x: Sayim) => (
    <>
      <td className="py-2 pr-4 text-right text-fg">{x.toplam}</td>
      <td className="py-2 pr-4 text-right text-fg">
        {x.tekil}
        {x.kimliksiz > 0 && <span className="text-dim"> (+{x.kimliksiz} kimliksiz)</span>}
      </td>
    </>
  )
  const yok = (
    <>
      <td className="py-2 pr-4 text-right text-dim">—</td>
      <td className="py-2 pr-4 text-right text-dim">—</td>
    </>
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[30px] leading-none text-fg">ÖLÇÜM</h1>
          <p className="mt-2 max-w-[75ch] font-mono text-[12px] leading-relaxed text-stone">
            Sitenin kendi dönüşüm ve tıklama kayıtları. Meta Ads Manager kendi atıf penceresiyle ve
            modellemeyle saydığı için oradaki sayılar buradan farklı olabilir; ikisi birbirini tamamlar.
          </p>
        </div>
        <nav className="flex gap-3 font-mono text-[12px]">
          {ARALIK.map((g) => (
            <Link key={g} href={`/admin/olcum?gun=${g}`} className={g === gun ? 'text-neon' : 'text-stone hover:text-fg'}>
              son {g} gün
            </Link>
          ))}
        </nav>
      </div>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">bağlantılar</h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {durum.map(([ad, ok, not]) => (
            <li key={ad} className="flex items-baseline justify-between gap-4 border border-border px-4 py-2 font-mono text-[12px]">
              <span className="text-fg">{ad}</span>
              <span className={ok ? 'text-neon' : 'text-stone'}>{ok ? 'bağlı' : `yok · ${not}`}</span>
            </li>
          ))}
        </ul>
        {uyari.map((u) => (
          <p key={u} className="mt-2 border border-neon px-4 py-2 font-mono text-[12px] text-fg">{u}</p>
        ))}
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">metrikler · son {gun} gün</h2>
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-[12px]">
            <thead className="text-left text-dim">
              <tr>
                <th className="py-2 pr-4 font-normal">metrik</th>
                <th className="py-2 pr-4 text-right font-normal">toplam işlem</th>
                <th className="py-2 pr-4 text-right font-normal">tekil kişi</th>
                <th className="py-2 font-normal">veri kaynağı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-stone">
              <tr>
                <td className="py-2 pr-4 text-fg">Web sitesi ziyareti</td>
                {yok}
                <td className="py-2">{ENTEGRASYON} · GA4 Data API bağlı değil. Ziyaret sayısı şimdilik GA4 ve Vercel Analytics panellerinde.</td>
              </tr>
              {(Object.keys(DONUSUM_ETIKET) as (keyof typeof DONUSUM_ETIKET)[]).map((tur) => (
                <tr key={tur}>
                  <td className="py-2 pr-4 text-fg">{DONUSUM_ETIKET[tur]}</td>
                  {s(r.donusum[tur])}
                  <td className="py-2">Site sunucusu · form başarıyla işlendikten sonra (doğrulanmış)</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 pr-4 text-fg">WhatsApp butonu tıklaması</td>
                {s(r.tiklama.whatsapp)}
                <td className="py-2">Tarayıcı beyanı (doğrulanmamış) · tekil yalnızca analitik izni verenlerde · mesaj gönderildiği anlamına gelmez</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">Doğrulanmış WhatsApp görüşmesi</td>
                {r.whatsapp ? (<><td className="py-2 pr-4 text-right text-fg">—</td><td className="py-2 pr-4 text-right text-fg">{r.whatsapp.gorusme}</td></>) : yok}
                <td className="py-2">{r.whatsapp ? 'WhatsApp Business Platform webhook' : `${ENTEGRASYON} · WhatsApp Business Platform (Cloud API) webhook`}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">Gelen WhatsApp mesajı</td>
                {r.whatsapp ? (<><td className="py-2 pr-4 text-right text-fg">{r.whatsapp.gelenMesaj}</td><td className="py-2 pr-4 text-right text-fg">—</td></>) : yok}
                <td className="py-2">{r.whatsapp ? 'webhook' : ENTEGRASYON}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">Yanıtlanan / yanıtlanmayan görüşme</td>
                {r.whatsapp ? (<><td className="py-2 pr-4 text-right text-fg">—</td><td className="py-2 pr-4 text-right text-fg">{r.whatsapp.yanitlanan} / {r.whatsapp.yanitlanmayan}</td></>) : yok}
                <td className="py-2">{r.whatsapp ? 'webhook' : ENTEGRASYON}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">WhatsApp → nitelikli aday / randevu</td>
                {r.whatsapp ? (<><td className="py-2 pr-4 text-right text-fg">—</td><td className="py-2 pr-4 text-right text-fg">{r.whatsapp.nitelikli} / {r.whatsapp.randevuya}</td></>) : yok}
                <td className="py-2">{r.whatsapp ? 'webhook + form kaydı, telefon kimliği eşleşmesi' : ENTEGRASYON}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">Telefon butonu tıklaması</td>
                {s(r.tiklama.telefon)}
                <td className="py-2">Tarayıcı beyanı (doğrulanmamış) · arama yapıldığı anlamına gelmez</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">Doğrulanmış telefon görüşmesi</td>
                {yok}
                <td className="py-2">{ENTEGRASYON} · çağrı takip ya da santral API&apos;si yok (numara bir cep hattı)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-fg">İletişim formu gönderip randevu almayan</td>
                <td className="py-2 pr-4 text-right text-dim">—</td>
                <td className="py-2 pr-4 text-right text-fg">{r.iletisimRandevusuz}</td>
                <td className="py-2">Site sunucusu · kişi kimliği eşleşmesi</td>
              </tr>
            </tbody>
          </table>
        </div>
        {r.izinsizDonusum > 0 && (
          <p className="mt-3 font-mono text-[11px] text-dim">
            {r.izinsizDonusum} dönüşüm çerez izni olmadan geldi: kaynakları &quot;bilinmiyor&quot; görünür, Meta&apos;ya tarayıcı sinyali gitmedi.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">formu başlatıp tamamlamayan</h2>
        <Tablo
          basliklar={['form', 'başlatma', 'tamamlama', 'izinli başlayan', 'izinli terk']}
          satirlar={r.formlar.map((f) => [f.form, f.baslatma, f.tamamlama, f.izinliBaslayan, f.izinliTerk])}
          not="Başlatma tarayıcıdan, tamamlama sunucudan. Terk sayısı yalnızca analitik izni veren ziyaretçilerde eşleştirilebiliyor."
        />
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">trafik kaynağına göre dönüşüm (son dokunuş)</h2>
        <KirilimTablosu satirlar={r.kanal} />
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">kampanyaya göre dönüşüm (utm_campaign)</h2>
        {r.kampanya.length ? <KirilimTablosu satirlar={r.kampanya} /> : <Bos metin="UTM'li dönüşüm yok. Reklam bağlantılarına utm_campaign eklenmeli (bkz. docs/olcum)." />}
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">sayfaya göre dönüşüm</h2>
        <KirilimTablosu satirlar={r.sayfa} />
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">iletişim tıklamaları · buton / sayfa</h2>
        <Tablo basliklar={['buton', 'tıklama']} satirlar={r.tiklamaSayfa.map((x) => [x.ad, x.sayi])} />
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">Meta Conversions API gönderimleri</h2>
        <Tablo
          basliklar={['sonuç', 'dönüşüm']}
          satirlar={r.capi.map((x) => [x.ad, x.sayi])}
          not="gonderildi = Meta kabul etti · atlandi = rıza yok, hiçbir şey gönderilmedi · yapilandirilmadi = erişim belirteci yok · hata:… = Meta reddetti ya da ulaşılamadı (bir kez yeniden denendi)."
        />
      </section>

      <section className="border-t border-border pt-6">
        <h2 className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">saklama</h2>
        <p className="mb-3 max-w-[75ch] font-mono text-[12px] text-stone">
          Ölçüm kayıtları {SAKLAMA_GUN} gün saklanır. Kayıtlarda ad, e-posta, telefon ya da mesaj yok; kişi ve
          ziyaretçi kimlikleri geri döndürülemez özetler.
        </p>
        <form action={eskileriTemizle}>
          <button type="submit" className="border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-stone hover:border-neon hover:text-fg">
            {SAKLAMA_GUN} günden eski kayıtları sil
          </button>
        </form>
      </section>
    </div>
  )
}

function Bos({ metin }: { metin: string }) {
  return <p className="border border-border px-4 py-3 font-mono text-[12px] text-stone">{metin}</p>
}

function Tablo({ basliklar, satirlar, not }: { basliklar: string[]; satirlar: (string | number)[][]; not?: string }) {
  if (!satirlar.length) return <Bos metin="Bu aralıkta kayıt yok." />
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-mono text-[12px]">
        <thead className="text-left text-dim">
          <tr>{basliklar.map((b, i) => <th key={b} className={`py-2 pr-4 font-normal ${i ? 'text-right' : ''}`}>{b}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-border text-stone">
          {satirlar.map((s, i) => (
            <tr key={i}>{s.map((h, j) => <td key={j} className={`py-2 pr-4 ${j ? 'text-right text-fg' : ''}`}>{h}</td>)}</tr>
          ))}
        </tbody>
      </table>
      {not && <p className="mt-2 font-mono text-[11px] text-dim">{not}</p>}
    </div>
  )
}

function KirilimTablosu({ satirlar }: { satirlar: ({ ad: string } & Record<string, number | string>)[] }) {
  const turler = Object.keys(DONUSUM_ETIKET)
  return (
    <Tablo
      basliklar={['kaynak', 'toplam', ...turler]}
      satirlar={satirlar.map((s) => [s.ad, s.toplam, ...turler.map((t) => s[t] ?? 0)])}
    />
  )
}
