import { basvurulariGetir, depoBagliMi } from '@/lib/basvuruStore'
import { DonusumAraci } from './DonusumAraci'

export const dynamic = 'force-dynamic'

/**
 * Offline dönüşüm aktarımı.
 *
 * Kayıt tablosundaki gerçek ciroyu Google Ads ve Meta'ya geri bildiriyor.
 * Bu olmadan iki platform da "form dolduruldu"ya göre optimize ediyor,
 * yani para ödeyen kitleyi değil form dolduran kitleyi arıyor.
 *
 * Sayfa sunucuda yalnızca başvuru kayıtlarını okuyor; eşleştirme ve
 * hash'leme tarayıcıda yapılıyor (bkz. DonusumAraci).
 */
export default async function Donusumler() {
  const basvurular = depoBagliMi() ? await basvurulariGetir() : []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-[30px] leading-none text-fg">DÖNÜŞÜM AKTARIMI</h1>
        <p className="mt-2 max-w-[70ch] font-mono text-[12px] leading-relaxed text-stone">
          Kayıt tablosundaki gerçek ciroyu Google Ads ve Meta&apos;ya geri bildirir. Tablodan
          satırları kopyalayıp aşağıya yapıştır; site başvurularıyla telefon üzerinden
          eşleştirilir ve iki ayrı yükleme dosyası üretilir.
        </p>
      </div>

      {!depoBagliMi() && (
        <p className="border border-border bg-bgAlt px-4 py-3 font-mono text-[12px] text-stone">
          Başvuru deposu bağlı değil (<span className="text-fg">BLOB_READ_WRITE_TOKEN</span>).
          Eşleştirme yapılamaz.
        </p>
      )}

      <DonusumAraci basvurular={basvurular} />
    </div>
  )
}
