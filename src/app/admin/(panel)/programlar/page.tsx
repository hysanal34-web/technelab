import Link from 'next/link'
import { WORKSHOPS } from '@/lib/data'
import { TANISMA_SESSIONS } from '@/app/tanisma-gunu/sessions'
import { metinTarihiCoz } from '@/lib/tarihDenetim'

export const dynamic = 'force-dynamic'

const TL = (n: number) => `${n.toLocaleString('tr-TR')} ₺`

export default function Programlar() {
  const bugun = new Date()
  const aktif = WORKSHOPS.filter((w) => w.active && !w.archived)
  const kapali = WORKSHOPS.filter((w) => !w.active || w.archived)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-[30px] leading-none text-fg">PROGRAMLAR</h1>
        <p className="mt-2 font-mono text-[12px] leading-relaxed text-stone">
          Tek kaynak <code className="text-fg">src/lib/data.ts</code>. Burası okuma ekranı;
          değişiklik kodda yapılıp deploy ediliyor, böylece site, broşür ve PDF aynı veriden
          besleniyor.
        </p>
      </div>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          aktif ({aktif.length})
        </h2>
        <div className="mt-3 space-y-3">
          {aktif.map((w) => {
            const fiyatlar = [
              w.price > 0 && `${w.priceLabel ?? 'tam'} ${TL(w.price)}`,
              w.priceTier2 && `${w.priceTier2Label ?? ''} ${TL(w.priceTier2)}`,
              w.priceTier3 && `${w.priceTier3Label ?? ''} ${TL(w.priceTier3)}`,
              w.priceShort && `${w.priceShortLabel ?? 'kısa'} ${TL(w.priceShort)}`,
            ].filter(Boolean) as string[]

            return (
              <div key={w.slug} className="border border-border bg-bgAlt p-4">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-[11px] text-dim">{w.code}</span>
                  <h3 className="font-display text-[19px] leading-none text-fg">{w.title}</h3>
                  <span className="font-mono text-[11px] text-stone">{w.venue}</span>
                  <span className="font-mono text-[11px] text-dim">{w.duration}</span>
                  <span className="font-mono text-[11px] text-dim">
                    maks. {String(w.maxStudents)} kişi
                  </span>
                  {w.ageRange && <span className="font-mono text-[11px] text-dim">{w.ageRange}</span>}
                  <Link
                    href={`/atolyeler/${w.slug}`}
                    target="_blank"
                    className="ml-auto font-mono text-[11px] text-stone hover:text-neon"
                  >
                    sayfa ↗
                  </Link>
                </div>

                <p className="mt-2 font-mono text-[12px] text-fg">
                  {fiyatlar.length ? fiyatlar.join('  ·  ') : 'fiyat yayınlanmadı'}
                  {w.scholarshipPercent ? (
                    <span className="text-neon">  ·  %{w.scholarshipPercent} burs</span>
                  ) : null}
                  {w.friendDiscountPercent ? (
                    <span className="text-stone">  ·  arkadaş %{w.friendDiscountPercent}</span>
                  ) : null}
                </p>

                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {(w.schedule ?? []).map((s, i) => {
                    const t = metinTarihiCoz(s.date, bugun)
                    const gun = t ? Math.round((t.getTime() - bugun.getTime()) / 86_400_000) : null
                    const gecmis = gun !== null && gun < 0
                    return (
                      <li
                        key={i}
                        className={`font-mono text-[12px] ${gecmis ? 'text-[#FF6B6B]' : 'text-stone'}`}
                      >
                        {s.place ? `${s.place} · ` : ''}
                        {s.date}
                        {s.time ? ` · ${s.time}` : ''}
                        {gecmis && ' (geçmiş)'}
                      </li>
                    )
                  })}
                  {w.scheduleNote && (
                    <li className="font-mono text-[12px] text-dim">{w.scheduleNote}</li>
                  )}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          tanışma günü seansları
        </h2>
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {TANISMA_SESSIONS.map((s) => {
            const t = metinTarihiCoz(s.label, bugun)
            const gun = t ? Math.round((t.getTime() - bugun.getTime()) / 86_400_000) : null
            const gecmis = gun !== null && gun < 0
            return (
              <li key={s.id} className="py-2.5">
                <p className={`font-mono text-[12px] ${gecmis ? 'text-[#FF6B6B]' : 'text-fg'}`}>
                  {s.label}
                  {gecmis && ' (geçmiş)'}
                </p>
                <p className="font-mono text-[11px] text-dim">
                  {s.minAge}
                  {s.maxAge ? `–${s.maxAge}` : '+'} yaş
                  {s.english && ' · İngilizce seviyesi soruluyor'}
                  {s.youth && ' · veli alanları açık'}
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      {kapali.length > 0 && (
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            satışa kapalı ({kapali.length})
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {kapali.map((w) => (
              <li key={w.slug} className="font-mono text-[12px] text-dim">
                {w.title}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
