import Link from 'next/link'
import { WORKSHOPS } from '@/lib/data'
import { tarihleriDenetle } from '@/lib/tarihDenetim'
import { basvurulariGetir, depoBagliMi, DURUMLAR } from '@/lib/basvuruStore'

export const dynamic = 'force-dynamic'

function Kutu({ sayi, etiket, alt }: { sayi: string; etiket: string; alt?: string }) {
  return (
    <div className="border border-border bg-bgAlt p-4">
      <p className="font-display text-[34px] leading-none text-fg">{sayi}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-stone">{etiket}</p>
      {alt && <p className="mt-1 font-mono text-[11px] text-dim">{alt}</p>}
    </div>
  )
}

export default async function GenelBakis() {
  const basvurular = await basvurulariGetir(500)
  const bagli = depoBagliMi()
  const bulgular = tarihleriDenetle()
  const gecmisler = bulgular.filter((b) => b.gecmis)
  const yaklasanlar = bulgular
    .filter((b) => !b.gecmis && b.gunFarki !== null && b.gunFarki <= 21)
    .sort((a, b) => (a.gunFarki ?? 0) - (b.gunFarki ?? 0))

  const birHaftaOnce = Date.now() - 7 * 86_400_000
  const sonHafta = basvurular.filter((b) => new Date(b.olusturuldu).getTime() >= birHaftaOnce)
  const yeniler = basvurular.filter((b) => b.durum === 'yeni')
  const kayitlar = basvurular.filter((b) => b.durum === 'kayit-oldu')
  const aktifProgram = WORKSHOPS.filter((w) => w.active && !w.archived)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-[30px] leading-none text-fg">GENEL BAKIŞ</h1>
        <p className="mt-2 font-mono text-[12px] text-stone">
          {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Geçmiş tarih uyarısı en üstte: bu projede en pahalı hata bu. */}
      {gecmisler.length > 0 && (
        <section className="border-l-2 border-[#FF6B6B] bg-bgAlt p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF6B6B]">
            yayında geçmiş tarih var
          </p>
          <ul className="mt-3 space-y-1.5">
            {gecmisler.map((b, i) => (
              <li key={i} className="font-mono text-[12px] text-fg">
                <span className="text-stone">{b.kaynak}</span>
                {' · '}
                {b.program}
                {' — '}
                <span className="text-[#FF6B6B]">{b.metin}</span>
                {b.gunFarki !== null && (
                  <span className="text-dim"> ({Math.abs(b.gunFarki)} gün geçti)</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-stone">
            Reklam metinleri bu tarihleri duyuruyor olabilir. Tıklayan kişi geçmiş tarihi görünce
            kaybediliyor. Düzeltme yeri: <code className="text-fg">src/lib/data.ts</code> ve{' '}
            <code className="text-fg">src/app/tanisma-gunu/sessions.ts</code>.
          </p>
        </section>
      )}

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kutu sayi={String(sonHafta.length)} etiket="son 7 gün başvuru" />
        <Kutu sayi={String(yeniler.length)} etiket="dokunulmamış" alt="durumu hâlâ 'yeni'" />
        <Kutu sayi={String(kayitlar.length)} etiket="kayıt oldu" />
        <Kutu sayi={String(aktifProgram.length)} etiket="aktif program" />
      </section>

      {!bagli && (
        <section className="border border-dashed border-border p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon">
            başvuru deposu bağlı değil
          </p>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-stone">
            Formlar çalışıyor ve başvurular e-posta olarak geliyor, hiçbir şey kaybolmuyor. Ama
            listelenebilmeleri için blob deposu gerekiyor.
          </p>
          <p className="mt-2 font-mono text-[12px] text-stone">
            <code className="text-fg">BLOB_READ_WRITE_TOKEN</code> tanımlı değil. Vercel → Storage →
            technelab-basvuru → projeye bağla, sonra yeniden deploy.
          </p>
        </section>
      )}

      {yaklasanlar.length > 0 && (
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            önümüzdeki üç hafta
          </h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {yaklasanlar.map((b, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 py-2.5">
                <span className="w-[52px] font-display text-[18px] text-neon">
                  {b.gunFarki === 0 ? 'bugün' : `${b.gunFarki}g`}
                </span>
                <span className="font-mono text-[12px] text-fg">{b.program}</span>
                <span className="font-mono text-[12px] text-stone">{b.metin}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {bagli && basvurular.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
              son başvurular
            </h2>
            <Link href="/admin/basvurular" className="font-mono text-[11px] text-neon hover:underline">
              tümü →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {basvurular.slice(0, 8).map((b) => {
              const d = DURUMLAR.find((x) => x.deger === b.durum)
              return (
                <li key={b.id} className="flex flex-wrap items-baseline gap-x-3 py-2.5">
                  <span className="w-[74px] font-mono text-[11px] text-dim">
                    {new Date(b.olusturuldu).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                  </span>
                  <span className="font-mono text-[12px] text-fg">{b.ad}</span>
                  <span className="font-mono text-[12px] text-stone">{b.program}</span>
                  <span className="ml-auto font-mono text-[11px]" style={{ color: d?.renk }}>
                    {d?.etiket ?? b.durum}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
