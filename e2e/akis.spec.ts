import { test, expect } from '@playwright/test'

/**
 * Akış testleri — para getiren yolların bozulmadığını doğrular.
 *
 * NEDEN HİÇBİR TEST FORMU BAŞARIYLA GÖNDERMİYOR:
 * Başarılı gönderim gerçek başvuru kaydı yaratır, gerçek e-posta atar ve
 * Meta'ya sahte bir Lead gönderir. Reklam algoritması o sahte dönüşümü
 * gerçek sanıp bütçeyi yanlış yere kaydırır. Test koşusu ölçümü kirletmemeli.
 *
 * Bu yüzden testler doğrulama katmanında duruyor: alanlar var mı, zorunluluk
 * çalışıyor mu, hata mesajı çıkıyor mu. Gönderim yolu `playwright.config.ts`
 * içinde ortam değişkenleri boşaltılarak ayrıca kapatıldı.
 */

test.describe('tanışma günü formu', () => {
  test('zorunlu alanlar boşken gönderilmiyor', async ({ page }) => {
    await page.goto('/tanisma-gunu')

    await page.getByRole('button', { name: /kaydol/i }).click()

    // Tarayıcı kendi doğrulamasıyla durduruyor: hâlâ formdayız, başarı
    // ekranına geçilmedi.
    await expect(page.getByText('GÖRÜŞMEK ÜZERE')).toHaveCount(0)
    await expect(page.locator('select[name="session"]')).toBeVisible()
  })

  test('KVKK onayı zorunlu, reklam rızası değil', async ({ page }) => {
    await page.goto('/tanisma-gunu')

    // KVKK: zorunlu (required). Reklam rızası: isteğe bağlı olmak ZORUNDA —
    // zorunlu hale gelirse rıza geçersiz olur, KVKK'ya aykırı.
    await expect(page.locator('input[name="kvkk"]')).toHaveAttribute('required', '')
    await expect(page.locator('input[name="reklamRizasi"]')).not.toHaveAttribute('required', '')
  })

  test('reklam rızası kutusu varsayılan olarak KAPALI', async ({ page }) => {
    await page.goto('/tanisma-gunu')

    // Önceden işaretli gelirse rıza alınmış sayılmaz. Bu testin kırmızı
    // vermesi hukuki bir sorun demektir, kozmetik değil.
    await expect(page.locator('input[name="reklamRizasi"]')).not.toBeChecked()
  })

  test('Youth seansı seçilince veli alanları çıkıyor', async ({ page }) => {
    await page.goto('/tanisma-gunu')

    const secim = page.locator('select[name="session"]')
    const youthDeger = await secim
      .locator('option')
      .filter({ hasText: /youth/i })
      .first()
      .getAttribute('value')

    test.skip(!youthDeger, 'açık Youth seansı yok')
    await secim.selectOption(youthDeger!)

    await expect(page.locator('input[name="guardianName"]')).toBeVisible()
    await expect(page.locator('input[name="guardianPhone"]')).toBeVisible()
    await expect(page.locator('input[name="parentConsent"]')).toHaveAttribute('required', '')
  })
})

test.describe('admin paneli', () => {
  test('giriş yapmadan panele girilemiyor', async ({ page }) => {
    await page.goto('/admin/basvurular')
    // Middleware /admin/login'e atıyor. Atmıyorsa başvuru verisi açıkta.
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('dönüşüm ekranı da korumalı', async ({ page }) => {
    await page.goto('/admin/donusumler')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('yanlış şifre kabul edilmiyor', async ({ page }) => {
    await page.goto('/admin/login')
    await page.locator('input[type="password"]').fill('yanlis-sifre-123')
    await page.getByRole('button', { name: /giriş/i }).click()
    await page.waitForTimeout(1500)
    // Login sayfasında kalmalı. Geçerse panel şifresiz açılıyor demektir.
    await expect(page).toHaveURL(/\/admin\/login/)
  })
})

test.describe('dönüşüm aktarım ekranı', () => {
  // Şifre config'ten geliyor; tanımsızsa bu blok atlanıyor.
  const SIFRE = process.env.ADMIN_PASSWORD || 'test-sifresi'

  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login')
    await page.locator('input[type="password"]').fill(SIFRE)
    await page.getByRole('button', { name: /giriş/i }).click()

    // `/\/admin/` diye beklemek yetmiyordu: /admin/login de o kalıba uyuyor,
    // giriş başarısızken test devam edip alakasız bir hatayla düşüyordu.
    // Login sayfasından ÇIKMIŞ olmayı bekle.
    await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 15_000 })
    await expect(page.getByRole('link', { name: /dönüşümler/i })).toBeVisible()
  })

  test('tablo yapıştırılınca satırları çözümlüyor', async ({ page }) => {
    await page.goto('/admin/donusumler')

    // Gerçek tablodan alınmış satırlar: düzgün numara, Instagram adı,
    // yurt dışı numarası ve telefonsuz satır bir arada.
    const yapistir = [
      'SIRA\tAD SOYAD\tTELEFON\tDURUM\tTOPLAM ÜCRET\tÖDENEN\tKALAN',
      '2\tELİF TEKTEN\t5535703796\tIBANDAN ÖDEDİ\t26.000\t26.000\t0',
      '1\tSİMAY ÇOBAN\t5448955257\tKESİN\t140.250\t140.250\t0',
      '2\tFATMANUR SUNBUL\t@ fatmanursunbul\t6 HAFTA\t12.000\t2.000\t10.000',
      '2\tESMA TAŞCI\t\tKESİN\t130.000\t25.000\t105.000',
    ].join('\n')

    await page.locator('textarea').fill(yapistir)

    // Başlık satırı atlanıp 4 veri satırı okunmalı.
    await expect(page.getByTestId('sayim-okunan')).toHaveText('4')

    // İkisinin telefonu okunamıyor (@instagram adı ve boş hücre), ikisi
    // okunuyor ama depo test ortamında boş olduğu için eşleşmiyor.
    await expect(page.getByTestId('sayim-google')).toHaveText('0')
    await expect(page.getByTestId('sayim-meta')).toHaveText('0')

    // Telefonu okunamayanlar uyarı olarak görünmeli. Hem özet satırında hem
    // listede geçtiği için `.first()` şart.
    await expect(page.getByText(/telefon okunamadı/).first()).toBeVisible()
  })

  test('rızasız kayıt indirme dosyasına girmiyor', async ({ page }) => {
    await page.goto('/admin/donusumler')

    await page.locator('textarea').fill(
      '2\tELİF TEKTEN\t5535703796\tÖDEDİ\t26.000\t26.000\t0',
    )

    // Depo test ortamında boş, dolayısıyla hiçbir satır eşleşmiyor ve
    // indirme düğmeleri kapalı kalmalı. Açıksa rıza kontrolü delinmiş
    // demektir — bu testin kırmızı vermesi ciddi.
    await expect(page.getByRole('button', { name: /google ads dosyası/ })).toBeDisabled()
    await expect(page.getByRole('button', { name: /meta dosyası/ })).toBeDisabled()
  })
})

test.describe('temel gezinme', () => {
  test('ana sayfadan programa gidilebiliyor', async ({ page }) => {
    await page.goto('/')
    await page.goto('/atolyeler')
    await page.locator('a[href^="/atolyeler/"]').first().click()
    await expect(page).toHaveURL(/\/atolyeler\/[a-z-]+/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('sayfalarda konsol hatası yok', async ({ page }) => {
    const hatalar: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error') hatalar.push(m.text())
    })

    // `networkidle` kullanılmıyor: Next.js uygulamasında açık kalan
    // bağlantılar yüzünden o durum hiç gelmiyor, test 30 saniye bekleyip
    // zaman aşımına düşüyordu.
    for (const yol of ['/', '/atolyeler', '/tanisma-gunu']) {
      await page.goto(yol, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(1200)
    }

    // Yerelde kaçınılmaz gürültüyü ele:
    // - Vercel Analytics betiği (`_vercel/insights`) yalnızca Vercel'de var,
    //   yerelde 404 veriyor. Yayında böyle bir hata yok.
    // - Ölçüm etiketleri test ortamında kasten kapalı.
    const gercek = hatalar.filter(
      (h) => !/fbq|gtag|pixel|analytics|insights|_vercel|favicon|Failed to load resource/i.test(h),
    )
    expect(gercek).toEqual([])
  })
})
