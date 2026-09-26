import { defineConfig, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * `.env.local`'den tek bir değeri okur.
 *
 * NEDEN GEREKLİ: admin testleri gerçek şifreye ihtiyaç duyuyor ve bu şifre
 * yalnızca `.env.local`'de duruyor. Kabuktan `export` etmeye bırakmak
 * kırılgandı: şifre taşınmadığında testler "giriş başarısız" yerine
 * "textarea bulunamadı" gibi alakasız hatalarla düşüyordu.
 */
function yerelOrtam(anahtar: string): string | undefined {
  try {
    // `import.meta.url` kullanılmıyor: Playwright bu dosyayı CommonJS olarak
    // yüklüyor ve orada `import.meta` sözdizimi hatası veriyor.
    const satir = readFileSync(join(process.cwd(), '.env.local'), 'utf8')
      .split('\n')
      .find((s) => s.startsWith(`${anahtar}=`))
    return satir?.slice(anahtar.length + 1).trim().replace(/^"|"$/g, '')
  } catch {
    return undefined
  }
}

const ADMIN_SIFRE = process.env.ADMIN_PASSWORD || yerelOrtam('ADMIN_PASSWORD') || 'test-sifresi'

/**
 * Playwright — görsel regresyon ve akış testleri.
 *
 * NEDEN PRODUCTION BUILD, DEV SUNUCU DEĞİL: `next dev` her istekte derliyor,
 * ilk açılış saniyeler sürüyor ve font yükleme sırası değişiyor. Görsel
 * karşılaştırma bunu "değişiklik" sanıp sürekli yanlış alarm veriyor.
 * `next build && next start` yayındakiyle aynı çıktıyı veriyor.
 *
 * NEDEN TEK TARAYICI: karşılaştırma referansları tarayıcıya göre piksel
 * piksel değişiyor. Üç tarayıcı = üç kat referans dosyası ve üç kat bakım.
 * Chromium yayındaki trafiğin çoğunu temsil ediyor; ihtiyaç olursa eklenir.
 */
export default defineConfig({
  testDir: './e2e',
  // Görsel testler paralel koşarken aynı porta yüklenince kare kayması
  // oluyordu. Tek işçi yavaş ama tekrarlanabilir; regresyon testinde
  // tekrarlanabilirlik hızdan önemli.
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'line' : [['html', { open: 'never' }]],

  use: {
    baseURL: process.env.TEST_URL || 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Site koyu zeminli; açık tema varsayımıyla çekilen kareler farklı çıkıyor.
    colorScheme: 'dark',
  },

  expect: {
    toHaveScreenshot: {
      // Yazı tipi kenar yumuşatması makineden makineye 1-2 piksel oynuyor.
      // Sıfır tolerans her koşuda kırmızı verir; 2% gerçek bozulmayı
      // yakalayacak kadar dar, gürültüyü elemeye yetecek kadar geniş.
      maxDiffPixelRatio: 0.02,
      // Animasyonu durdur: Emil Kowalski çıtasında geçişler var, her kare
      // farklı. Durdurmadan görsel regresyon kurulamaz.
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },

  projects: [
    { name: 'masaüstü', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    {
      name: 'mobil',
      use: {
        ...devices['iPhone 13'],
        // iPhone 13 tanımı varsayılan olarak WebKit istiyor; yalnızca
        // Chromium kurulu. Ayrıca referans kareleri tek motorda tutmak
        // bakım maliyetini yarıya indiriyor (bkz. yukarıdaki not).
        browserName: 'chromium',
      },
    },
  ],

  webServer: {
    // 3100: geliştirirken açık duran `next dev` (3000) ile çakışmasın.
    command: 'npm run build && npx next start -p 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: {
      // KRİTİK: test koşusu gerçek başvuru yaratmasın, gerçek e-posta
      // atmasın, Meta'ya sahte Lead göndermesin. Bu değişkenler boşken
      // ilgili kod yolları sessizce devre dışı kalıyor (bkz. actions.ts).
      RESEND_API_KEY: '',
      BLOB_READ_WRITE_TOKEN: '',
      META_CAPI_ACCESS_TOKEN: '',
      NEXT_PUBLIC_META_PIXEL_ID: '',
      NEXT_PUBLIC_GOOGLE_ADS_ID: '',
      NEXT_PUBLIC_GA_ID: '',
      ADMIN_PASSWORD: ADMIN_SIFRE,
      // Çerez imza anahtarı da sabitlensin: tanımsızken ADMIN_PASSWORD'e
      // düşüyor, o da testler arası değişirse oturum düşüyordu.
      ADMIN_SESSION_SECRET: ADMIN_SIFRE,
    },
  },
})

/** Testlerin şifreye ulaşması için — `process.env` üzerinden taşınıyor. */
process.env.ADMIN_PASSWORD = ADMIN_SIFRE
