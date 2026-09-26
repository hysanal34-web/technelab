import { test, expect, type Page } from '@playwright/test'

/**
 * Görsel regresyon.
 *
 * Amaç: bir daha bir şey bozulursa deploy'dan ÖNCE yakalamak. Bugüne kadar
 * bozulmalar yayına çıktıktan sonra gözle fark ediliyordu.
 *
 * İLK KOŞUDA referans dosyası yok, testler kendiliğinden oluşturup geçiyor.
 * Oluşan kareleri `e2e/gorsel.spec.ts-snapshots/` altında GÖZLE KONTROL ET —
 * bozuk bir kare referans olarak kaydedilirse bozukluk kalıcı doğru sayılır.
 */

/**
 * Sayfayı karşılaştırmaya hazırla.
 *
 * Reveal animasyonları (RevealSection, Intersection Observer) görünür alana
 * girince tetikleniyor. Sayfayı sonuna kadar kaydırmadan alt bölümler yarı
 * saydam yakalanıyor ve her koşuda farklı çıkıyor.
 */
async function sabitle(page: Page) {
  // Tüm geçiş ve animasyonları anında bitir. Playwright'ın `animations:
  // disabled` ayarı CSS animasyonlarını donduruyor ama JS ile yazılan
  // inline stilleri değil.
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }`,
  })

  // Sonuna kadar kaydır ki bütün reveal'lar tetiklensin, sonra başa dön.
  //
  // ADIM SAYISI NEDEN SINIRLI: ana sayfada aşağı indikçe içerik yükleniyor
  // ve `document.body.scrollHeight` her karede büyüyordu. "Sona geldim mi"
  // kontrolü hiç doğru olmuyor, döngü sonsuza giriyordu. 40 ekran boyu
  // en uzun sayfayı fazlasıyla kapsıyor.
  await page.evaluate(async () => {
    const EN_FAZLA_ADIM = 40
    await new Promise<void>((cbz) => {
      let y = 0
      let adimSayisi = 0
      const adim = () => {
        y += window.innerHeight
        window.scrollTo(0, y)
        adimSayisi++
        const sondaMiyiz = y >= document.body.scrollHeight
        if (!sondaMiyiz && adimSayisi < EN_FAZLA_ADIM) requestAnimationFrame(adim)
        else { window.scrollTo(0, 0); cbz() }
      }
      adim()
    })
  })
  // Kaydırma sonrası düzen oturana kadar bekle.
  await page.waitForTimeout(250)

  // Görseller yüklenmeden çekilen kare boş kutular gösteriyor. `networkidle`
  // bu uygulamada hiç gelmiyor (açık bağlantılar), onun yerine görsellerin
  // tek tek tamamlanmasını bekliyoruz.
  //
  // SÜRE SINIRI NEDEN VAR: `loading="lazy"` görseller görünür alana
  // girmedikçe hiç yüklenmiyor, dolayısıyla `complete` hiç true olmuyor ve
  // beklemek sonsuza kadar sürüyordu. 5 saniye gerçek yüklemeye fazlasıyla
  // yetiyor; yetmeyen zaten karede görünmeyecek kadar aşağıda.
  await page.evaluate(() => {
    const yuklenenler = Promise.all(
      Array.from(document.images)
        .filter((g) => !g.complete)
        .map((g) => new Promise((c) => { g.onload = g.onerror = c })),
    )
    const sure = new Promise((c) => setTimeout(c, 5000))
    return Promise.race([yuklenenler, sure])
  })
  await page.waitForTimeout(400)
}

const SAYFALAR = [
  { yol: '/',                  ad: 'ana-sayfa' },
  { yol: '/atolyeler',         ad: 'atolyeler' },
  { yol: '/tanisma-gunu',      ad: 'tanisma-gunu' },
  { yol: '/hakkinda',          ad: 'hakkinda' },
  { yol: '/ekip',              ad: 'ekip' },
  { yol: '/atolyeler/english-drama-youth', ad: 'program-youth' },
]

for (const { yol, ad } of SAYFALAR) {
  test(`görsel: ${ad}`, async ({ page }) => {
    await page.goto(yol)
    await sabitle(page)
    await expect(page).toHaveScreenshot(`${ad}.png`, { fullPage: true })
  })
}

/**
 * Mikro etkileşim: hover durumu.
 *
 * Tasarım kaidesi "hover'lar ince ama belirgin" diyor. Bu ancak gözle
 * yakalanıyor; hover kaydı bozulursa test kırmızı verir.
 */
test('görsel: program satırı hover', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobil', 'dokunmatikte hover yok')

  await page.goto('/atolyeler')
  await sabitle(page)

  const ilkSatir = page.locator('a[href^="/atolyeler/"]').first()
  await ilkSatir.hover()
  await page.waitForTimeout(200)

  await expect(ilkSatir).toHaveScreenshot('program-satiri-hover.png')
})
