import { basvurulariGetir, depoBagliMi } from '@/lib/basvuruStore'
import { BasvuruListesi } from './BasvuruListesi'

export const dynamic = 'force-dynamic'

export default async function Basvurular() {
  const bagli = depoBagliMi()
  const basvurular = bagli ? await basvurulariGetir(1000) : []

  return (
    <div>
      <h1 className="font-display text-[30px] leading-none text-fg">BAŞVURULAR</h1>
      <p className="mt-2 font-mono text-[12px] leading-relaxed text-stone">
        Tanışma günü kayıtları ve program başvuruları. Durum değişikliği anında kaydediliyor.
      </p>

      {!bagli ? (
        <div className="mt-8 border border-dashed border-border p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neon">
            depo bağlı değil
          </p>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-stone">
            Başvurular e-posta olarak gelmeye devam ediyor, hiçbiri kaybolmuyor. Burada
            listelenebilmeleri için blob deposunun bağlı olması gerekiyor:
            Vercel → Storage → technelab-basvuru → projeye bağla, sonra yeniden deploy.
          </p>
          <p className="mt-3 font-mono text-[11px] text-dim">
            Kurulumdan önce gelen başvurular burada görünmez; onlar Gmail&apos;de duruyor.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <BasvuruListesi basvurular={basvurular} />
        </div>
      )}
    </div>
  )
}
