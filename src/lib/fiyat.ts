import type { Workshop } from '@/lib/data'

/**
 * Fiyat özeti.
 *
 * 13 Eylül 2026: Erken kayıt indirimi tüm programlardan kaldırıldı.
 * Bu dosyada eskiden son tarih hesaplama, ağustos kampanyası
 * ve iki indirimin yarıştırılması vardı — hepsi silindi.
 *
 * Geriye kalan indirimler artık burada değil:
 *   · arkadaşınla gel %10 → data.ts friendDiscountPercent
 *   · burs %25            → data.ts scholarshipPercent
 * İkisi de görüşmede uygulanıyor, fiyat hesabına girmiyor.
 *
 * Fonksiyon, çağıran dosyalar (program sayfası, kayıt sayfası, kayıt
 * action'ı) bozulmasın diye duruyor; artık sadece liste fiyatını döndürüyor.
 */
export function priceSummary(w: Workshop) {
  if (!w.price) return null
  return {
    current: w.price,
    original: null as number | null,
    urgency: null as string | null,
    hot: false,
  }
}
