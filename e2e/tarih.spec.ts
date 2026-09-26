import { test, expect } from '@playwright/test'
import { tarihleriDenetle } from '../src/lib/tarihDenetim'
import { TANISMA_SESSIONS, aktifSessions } from '../src/app/tanisma-gunu/sessions'
import { metinTarihiCoz, KASITLI_GECMIS } from '../src/lib/tarihMetin'

/**
 * Geçmiş tarih denetimi.
 *
 * NEDEN TEST OLARAK DA VAR: `/admin` genel bakış ekranı bu denetimi zaten
 * yapıyor, ama görmek için panele girmek gerekiyor. Panele her gün girilmiyor;
 * reklam ise her gün dönüyor. 22 Eylül 2026'da sitede beş tanışma seansından
 * dördü 19 Eylül tarihliydi: reklamdan gelen kişi geçmiş tarih görüyordu.
 *
 * Bu testin kırmızı vermesi "kod bozuldu" demek değil, "yayındaki tarih
 * geçti, ya güncelle ya kaldır" demek. Deploy öncesi çalıştığı için yayına
 * çıkmadan yakalanıyor.
 */

test.describe('tarih tutarlılığı', () => {
  test('yayında geçmiş tarihli tanışma seansı yok', () => {
    const bugun = new Date()
    bugun.setHours(0, 0, 0, 0)

    // Siteye basılan liste `aktifSessions()`. Dosyada geçmiş bir satır
    // kalması artık hata değil (filtre eliyor); yayına çıkması hata.
    const gecmis = aktifSessions(bugun).filter((s) => {
      const t = metinTarihiCoz(s.label, bugun)
      return t !== null && t < bugun
    })

    expect(
      gecmis.map((s) => s.label),
      'Bu seanslar siteye basılıyor ama tarihleri geçmiş. Filtre kaçırmış demektir.',
    ).toEqual([])
  })

  test('filtre geçmiş seansı gerçekten eliyor', () => {
    // Filtrenin kendisi sessizce bozulursa yukarıdaki test de yeşil kalır:
    // boş listede geçmiş tarih bulunmaz. Bu yüzden ayrıca kanıtlıyoruz.
    //
    // "Uzak gelecek" ile sınamak işe yaramaz: etiketlerde yıl yazmıyor ve
    // `metinTarihiCoz` 60 günden fazla geride kalan tarihi gelecek yıl sayıyor
    // (bkz. tarihMetin.ts). Hangi yılı verirsen ver, "27 Eylül" o yılın Eylül'üne
    // çözülür. Doğru sınama her seansın kendi ertesi gününe bakmak.
    for (const s of TANISMA_SESSIONS) {
      // "başladı / katılım açık" diyen satırlar bilerek geçmiş, filtre onları
      // elemiyor. Bunları sınamaya sokmak yanlış kırmızı üretir.
      if (KASITLI_GECMIS.test(s.label)) continue

      const t = metinTarihiCoz(s.label, new Date(2026, 0, 1))
      if (!t) continue
      const ertesiGun = new Date(t.getTime() + 86_400_000)

      expect(
        aktifSessions(ertesiGun).map((x) => x.id),
        `"${s.label}" tarihi geçtiği hâlde listede kalıyor. Filtre bozuk.`,
      ).not.toContain(s.id)
    }

    const gecmis = new Date(2000, 0, 1)
    expect(
      aktifSessions(gecmis).length,
      'Tüm seanslar gelecekteyken filtre hiçbirini elememeli',
    ).toBe(TANISMA_SESSIONS.length)
  })

  test('data.ts ve sessions.ts tarihleri geçmemiş', () => {
    const bulgular = tarihleriDenetle()
    const gecmisOlanlar = bulgular.filter((b) => b.gecmis)

    expect(
      gecmisOlanlar.map((b) => `${b.kaynak}: ${b.metin}`),
      'Geçmiş tarih yayında. Reklamdan gelen kişi bunu görüyor.',
    ).toEqual([])
  })
})

// Tarih çözücü `src/lib/tarihMetin.ts` içinde. Testin kendi kopyası vardı;
// kopya, denetimle testin ayrı ayrı doğru olup birbirini tutmaması demekti.
