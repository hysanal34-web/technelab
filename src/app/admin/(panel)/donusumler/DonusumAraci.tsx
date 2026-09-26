'use client'

import { useMemo, useState } from 'react'
import type { Basvuru } from '@/lib/basvuruStore'
import {
  tabloCozumle,
  eslestir,
  googleAdsCsv,
  metaCsv,
  type DegerKaynagi,
  type Eslesme,
} from '@/lib/donusumEslestir'

/**
 * NEDEN YAPIŞTIRMA KUTUSU: kayıt tablosu tek sayfada, her program için ayrı
 * blok ve birleştirilmiş başlıklarla duruyor. API ile okumak aynı ayrıştırmayı
 * gerektirir, üstüne servis hesabı kurulumu ekler. Kopyala-yapıştır bugün
 * çalışıyor ve hiçbir kimlik bilgisi istemiyor.
 *
 * NEDEN HER ŞEY TARAYICIDA: hash'lenmemiş e-posta ve telefon sunucuya ikinci
 * kez gitmesin, hiçbir yere loglanmasın. Dosya üretimi bu sayfada bitiyor.
 */

const girdi =
  'border border-border bg-bgAlt px-3 py-2 font-mono text-[12px] text-fg outline-none focus:border-neon'

const dugme =
  'border border-border px-3 py-2 font-mono text-[12px] text-stone transition-colors hover:border-neon hover:text-neon disabled:opacity-40 disabled:hover:border-border disabled:hover:text-stone'

function indir(ad: string, icerik: string) {
  const url = URL.createObjectURL(new Blob([icerik], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = ad
  a.click()
  URL.revokeObjectURL(url)
}

export function DonusumAraci({ basvurular }: { basvurular: Basvuru[] }) {
  const [yapistirilan, setYapistirilan] = useState('')
  const [degerKaynagi, setDegerKaynagi] = useState<DegerKaynagi>('odenen')
  // Google Ads'deki dönüşüm işleminin adı. Harfi harfine aynı olmazsa
  // yükleme hata vermiyor, sessizce boş geçiyor — en sinsi hata türü.
  const [donusumAdi, setDonusumAdi] = useState('Kayıt Oldu')
  const [uyari, setUyari] = useState<string | null>(null)

  const esler = useMemo(() => {
    const satirlar = tabloCozumle(yapistirilan)
    return eslestir(satirlar, basvurular, degerKaynagi)
  }, [yapistirilan, basvurular, degerKaynagi])

  const sayim = useMemo(() => {
    const google = esler.filter(
      (e) => !e.engel && (e.basvuru?.gclid || e.basvuru?.wbraid || e.basvuru?.gbraid),
    ).length
    const meta = esler.filter(
      (e) => e.satir.telefon && e.basvuru?.reklamRizasi && e.deger > 0,
    ).length
    const rizasiz = esler.filter((e) => e.engel === 'aktarım rızası yok').length
    const eslesmeyen = esler.filter((e) => e.engel === 'site başvurusu yok').length
    const telefonsuz = esler.filter((e) => e.engel === 'telefon okunamadı').length
    return { toplam: esler.length, google, meta, rizasiz, eslesmeyen, telefonsuz }
  }, [esler])

  function googleIndir() {
    const csv = googleAdsCsv(esler, donusumAdi.trim())
    const wb = esler.filter((e) => !e.engel && !e.basvuru?.gclid && (e.basvuru?.wbraid || e.basvuru?.gbraid))
    setUyari(
      wb.length
        ? `${wb.length} kayıt gclid yerine wbraid/gbraid taşıyor (iOS). Google bunları ayrı sütunda istiyor; yükleme reddederse bu satırları elle ayır.`
        : null,
    )
    indir(`google-ads-donusum-${new Date().toISOString().slice(0, 10)}.csv`, csv)
  }

  async function metaIndir() {
    const csv = await metaCsv(esler, 'Purchase')
    indir(`meta-offline-donusum-${new Date().toISOString().slice(0, 10)}.csv`, csv)
  }

  return (
    <div className="space-y-6">
      {/* ── 1. yapıştır ── */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon">
          1 · kayıt tablosundan yapıştır
        </p>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-dim">
          Drive&apos;daki &quot;TÜM PROGRAMLAR&quot; tablosunda satırları seç, kopyala, buraya yapıştır.
          Sütun sırası tablodaki gibi olmalı: sıra · ad soyad · telefon · durum · toplam ücret · ödenen.
          Başlık ve boş satırlar kendiliğinden atlanır.
        </p>
        <textarea
          value={yapistirilan}
          onChange={(e) => setYapistirilan(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder={'1\tELİF TEKTEN\t5535703796\tIBANDAN ÖDEDİ\t26.000\t26.000\t0'}
          className={`${girdi} mt-3 w-full resize-y`}
        />
      </div>

      {/* ── 2. ayarlar ── */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon">2 · ayarlar</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="font-mono text-[12px] text-stone">
            dönüşüm değeri
            <select
              value={degerKaynagi}
              onChange={(e) => setDegerKaynagi(e.target.value as DegerKaynagi)}
              className={`${girdi} ml-2`}
            >
              <option value="odenen">ödenen (tahsil edilen)</option>
              <option value="toplam">toplam ücret (taahhüt)</option>
            </select>
          </label>

          <label className="font-mono text-[12px] text-stone">
            google dönüşüm adı
            <input
              value={donusumAdi}
              onChange={(e) => setDonusumAdi(e.target.value)}
              className={`${girdi} ml-2 min-w-[180px]`}
            />
          </label>
        </div>
        <p className="mt-2 max-w-[70ch] font-mono text-[11px] leading-relaxed text-dim">
          Dönüşüm adı, Google Ads&apos;te önceden açtığın işlemin adıyla harfi harfine aynı olmalı.
          Farklıysa yükleme hata vermez, sessizce hiçbir şey yazmaz.
        </p>
      </div>

      {/* ── 3. özet ── */}
      {yapistirilan.trim() && (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon">3 · eşleşme</p>
          <div className="mt-3 grid gap-px border border-border bg-border sm:grid-cols-3">
            <Kutu kimlik="okunan" sayi={sayim.toplam} etiket="tabloda okunan satır" />
            <Kutu kimlik="google" sayi={sayim.google} etiket="google'a gidebilir" vurgu />
            <Kutu kimlik="meta" sayi={sayim.meta} etiket="meta'ya gidebilir" vurgu />
          </div>

          {(sayim.rizasiz > 0 || sayim.eslesmeyen > 0 || sayim.telefonsuz > 0) && (
            <ul className="mt-3 space-y-1 font-mono text-[11px] text-stone">
              {sayim.rizasiz > 0 && (
                <li>
                  <span className="text-fg">{sayim.rizasiz}</span> kayıt aktarım rızası vermemiş —
                  gönderilmiyor. Rıza kutusu 21 Eylül 2026&apos;da eklendi; ondan önceki başvurularda yok.
                </li>
              )}
              {sayim.eslesmeyen > 0 && (
                <li>
                  <span className="text-fg">{sayim.eslesmeyen}</span> kayıt siteden form doldurmamış
                  (DM, tavsiye, kapıdan). Tıklama kimliği yok, Google&apos;a gönderilemez.
                </li>
              )}
              {sayim.telefonsuz > 0 && (
                <li>
                  <span className="text-fg">{sayim.telefonsuz}</span> satırda telefon okunamadı
                  (boş, Instagram adı ya da yurt dışı numarası). Tabloda düzeltilmeli.
                </li>
              )}
            </ul>
          )}

          <Liste esler={esler} />
        </div>
      )}

      {/* ── 4. indir ── */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon">4 · indir ve yükle</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={googleIndir} disabled={!sayim.google} className={dugme}>
            google ads dosyası ({sayim.google})
          </button>
          <button type="button" onClick={metaIndir} disabled={!sayim.meta} className={dugme}>
            meta dosyası ({sayim.meta})
          </button>
        </div>

        {uyari && (
          <p className="mt-3 max-w-[70ch] border border-border bg-bgAlt px-4 py-3 font-mono text-[11px] leading-relaxed text-stone">
            {uyari}
          </p>
        )}

        <div className="mt-4 max-w-[70ch] space-y-2 font-mono text-[11px] leading-relaxed text-dim">
          <p>
            <span className="text-stone">Google Ads:</span> Araçlar → Dönüşümler → Yüklemeler → dosyayı yükle.
            Tıklama kimliği olmadan satır kabul edilmiyor, bu yüzden yalnızca reklamdan gelip form
            dolduranlar listede.
          </p>
          <p>
            <span className="text-stone">Meta:</span> Events Manager → Offline Event Set → yükle.
            Telefon ve e-posta SHA-256 ile şifrelenmiş halde çıkıyor, açık veri dosyaya hiç yazılmıyor.
            Meta tıklama kimliği istemediği için siteden hiç geçmemiş kayıtlar da gönderilebiliyor.
          </p>
        </div>
      </div>
    </div>
  )
}

function Kutu({
  kimlik, sayi, etiket, vurgu,
}: { kimlik: string; sayi: number; etiket: string; vurgu?: boolean }) {
  return (
    <div className="bg-bg px-4 py-3">
      {/* data-testid: sayıyı ekrandaki metinden yakalamak kırılgandı —
          "4" sayfada birden çok yerde geçebiliyor. */}
      <p
        data-testid={`sayim-${kimlik}`}
        className={`font-display text-[26px] leading-none ${vurgu ? 'text-neon' : 'text-fg'}`}
      >
        {sayi}
      </p>
      <p className="mt-1 font-mono text-[11px] text-stone">{etiket}</p>
    </div>
  )
}

/**
 * Satır satır döküm. Engelli olanlar da listede kalıyor: neyin neden
 * gönderilmediğini görmeden tabloyu düzeltmek mümkün değil.
 */
function Liste({ esler }: { esler: Eslesme[] }) {
  if (!esler.length) return null

  return (
    <ul className="mt-4 divide-y divide-border border-y border-border">
      {esler.map((e, i) => {
        const kimlik = e.basvuru?.gclid || e.basvuru?.wbraid || e.basvuru?.gbraid
        return (
          <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2">
            <span className="font-mono text-[12px] text-fg">{e.satir.ad}</span>
            <span className="font-mono text-[11px] text-dim">
              {e.satir.telefon ?? (e.satir.telefonHam || '—')}
            </span>
            <span className="font-mono text-[11px] text-stone">
              {e.deger > 0 ? `${e.deger.toLocaleString('tr-TR')} ₺` : '—'}
            </span>
            <span className="ml-auto flex gap-2 font-mono text-[11px]">
              {e.engel ? (
                <span className="text-dim">{e.engel}</span>
              ) : (
                <span className="text-neon">gönderilebilir</span>
              )}
              {kimlik && <span className="text-dim">gclid ✓</span>}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
