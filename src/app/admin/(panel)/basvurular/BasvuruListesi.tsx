'use client'

import { useMemo, useState, useTransition } from 'react'
import { DURUMLAR, type Basvuru, type BasvuruDurum } from '@/lib/basvuruStore'
import { basvuruDurumDegistir, basvuruNotKaydet } from '../../actions'

/**
 * Arama, filtre ve durum değiştirme tarayıcıda yapılıyor.
 *
 * NEDEN SUNUCU TARAFI FİLTRE DEĞİL: başvuru sayısı binlerle ölçülmüyor,
 * hepsi zaten tek istekte geliyor. Yazarken anında filtrelemek, her tuşta
 * sunucuya gitmekten hem hızlı hem ucuz.
 */

const KAYNAK_ETIKET: Record<Basvuru['kaynak'], string> = {
  tanisma: 'tanışma',
  program: 'program',
  bulten: 'bülten',
}

function telLink(t: string) {
  const temiz = t.replace(/[^\d+]/g, '')
  if (!temiz) return null
  return temiz.startsWith('+') ? temiz : `+9${temiz.replace(/^9/, '')}`
}

export function BasvuruListesi({ basvurular }: { basvurular: Basvuru[] }) {
  const [arama, setArama] = useState('')
  const [durumFiltre, setDurumFiltre] = useState<BasvuruDurum | 'hepsi'>('hepsi')
  const [programFiltre, setProgramFiltre] = useState('hepsi')
  const [acik, setAcik] = useState<string | null>(null)
  const [, basla] = useTransition()

  const programlar = useMemo(
    () => Array.from(new Set(basvurular.map((b) => b.program).filter(Boolean))).sort(),
    [basvurular],
  )

  const liste = useMemo(() => {
    const a = arama.trim().toLocaleLowerCase('tr-TR')
    return basvurular.filter((b) => {
      if (durumFiltre !== 'hepsi' && b.durum !== durumFiltre) return false
      if (programFiltre !== 'hepsi' && b.program !== programFiltre) return false
      if (!a) return true
      return [b.ad, b.email, b.telefon, b.program, b.notlar, b.ic_not]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
        .includes(a)
    })
  }, [basvurular, arama, durumFiltre, programFiltre])

  function csvIndir() {
    const basliklar = ['Tarih', 'Kaynak', 'Program', 'Ad', 'E-posta', 'Telefon', 'Durum', 'Not', 'İç not']
    const satirlar = liste.map((b) => [
      new Date(b.olusturuldu).toLocaleString('tr-TR'),
      KAYNAK_ETIKET[b.kaynak] ?? b.kaynak,
      b.program, b.ad, b.email, b.telefon,
      DURUMLAR.find((d) => d.deger === b.durum)?.etiket ?? b.durum,
      b.notlar, b.ic_not,
    ])
    const kacir = (h: string) => `"${String(h ?? '').replace(/"/g, '""')}"`
    // Başta BOM: Excel Türkçe karakterleri bu olmadan bozuk gösteriyor.
    const csv = '﻿' + [basliklar, ...satirlar].map((s) => s.map(kacir).join(';')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `basvurular-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const girdi =
    'border border-border bg-bgAlt px-3 py-2 font-mono text-[12px] text-fg outline-none focus:border-neon'

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="ad, telefon, e-posta ara"
          className={`${girdi} min-w-[220px] flex-1`}
        />
        <select
          value={durumFiltre}
          onChange={(e) => setDurumFiltre(e.target.value as BasvuruDurum | 'hepsi')}
          className={girdi}
        >
          <option value="hepsi">tüm durumlar</option>
          {DURUMLAR.map((d) => (
            <option key={d.deger} value={d.deger}>{d.etiket}</option>
          ))}
        </select>
        <select
          value={programFiltre}
          onChange={(e) => setProgramFiltre(e.target.value)}
          className={girdi}
        >
          <option value="hepsi">tüm programlar</option>
          {programlar.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={csvIndir}
          className="border border-border px-3 py-2 font-mono text-[12px] text-stone transition-colors hover:border-neon hover:text-neon"
        >
          csv indir
        </button>
      </div>

      <p className="mt-3 font-mono text-[11px] text-dim">
        {liste.length} kayıt{liste.length !== basvurular.length && ` (toplam ${basvurular.length})`}
      </p>

      <ul className="mt-3 divide-y divide-border border-y border-border">
        {liste.map((b) => {
          const d = DURUMLAR.find((x) => x.deger === b.durum)
          const tel = telLink(b.telefon)
          const acikMi = acik === b.id
          return (
            <li key={b.id} className="py-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="w-[74px] shrink-0 font-mono text-[11px] text-dim">
                  {new Date(b.olusturuldu).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                </span>
                <button
                  type="button"
                  onClick={() => setAcik(acikMi ? null : b.id)}
                  className="font-mono text-[13px] text-fg hover:text-neon"
                >
                  {b.ad || '(isimsiz)'}
                </button>
                <span className="font-mono text-[12px] text-stone">{b.program}</span>
                {tel && (
                  <a href={`tel:${tel}`} className="font-mono text-[12px] text-stone hover:text-neon">
                    {b.telefon}
                  </a>
                )}
                {tel && (
                  <a
                    href={`https://wa.me/${tel.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-stone hover:text-neon"
                  >
                    wa ↗
                  </a>
                )}

                <form
                  action={(fd) => basla(() => { void basvuruDurumDegistir(fd) })}
                  className="ml-auto"
                >
                  <input type="hidden" name="id" value={b.id} />
                  <select
                    name="durum"
                    defaultValue={b.durum}
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    className="border border-border bg-bgAlt px-2 py-1 font-mono text-[11px] outline-none focus:border-neon"
                    style={{ color: d?.renk }}
                  >
                    {DURUMLAR.map((x) => (
                      <option key={x.deger} value={x.deger} style={{ color: '#F5F5F0' }}>
                        {x.etiket}
                      </option>
                    ))}
                  </select>
                </form>
              </div>

              {acikMi && (
                <div className="mt-3 space-y-3 border-l-2 border-border pl-4">
                  <div className="font-mono text-[12px] leading-relaxed text-stone">
                    <p>
                      <span className="text-dim">kaynak:</span> {KAYNAK_ETIKET[b.kaynak] ?? b.kaynak}
                      {' · '}
                      <span className="text-dim">e-posta:</span>{' '}
                      {b.email ? <a href={`mailto:${b.email}`} className="hover:text-neon">{b.email}</a> : '—'}
                    </p>
                    <p className="text-dim">
                      {new Date(b.olusturuldu).toLocaleString('tr-TR')}
                    </p>
                    {b.notlar && <p className="mt-2 whitespace-pre-wrap text-fg">{b.notlar}</p>}
                  </div>

                  <form
                    action={(fd) => basla(() => { void basvuruNotKaydet(fd) })}
                    className="flex flex-wrap items-start gap-2"
                  >
                    <input type="hidden" name="id" value={b.id} />
                    <textarea
                      name="not"
                      defaultValue={b.ic_not}
                      rows={2}
                      placeholder="iç not — ne konuşuldu, ne zaman tekrar aranacak"
                      className={`${girdi} min-w-[260px] flex-1 resize-y`}
                    />
                    <button
                      type="submit"
                      className="border border-border px-3 py-2 font-mono text-[11px] text-stone transition-colors hover:border-neon hover:text-neon"
                    >
                      notu kaydet
                    </button>
                  </form>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {liste.length === 0 && (
        <p className="py-8 text-center font-mono text-[12px] text-dim">Eşleşen kayıt yok.</p>
      )}
    </div>
  )
}
