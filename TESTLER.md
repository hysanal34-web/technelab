# Testler

22 Eylül 2026'da eklendi. Playwright, Chromium, iki görünüm (masaüstü 1440 · mobil iPhone 13).

```bash
npm test              # hepsi
npm run test:gorsel   # sadece görsel regresyon
npm run test:akis     # sadece akış
npm run test:guncelle # referans kareleri yenile (bilerek değişiklik yaptıysan)
npm run test:rapor    # son koşunun HTML raporu
```

Testler kendi sunucusunu ayağa kaldırıyor (`next build && next start -p 3100`),
geliştirirken açık duran 3000'e dokunmuyor. İlk koşu derleme yüzünden birkaç dakika.

---

## Hiçbir test gerçek başvuru yaratmıyor

Bu kasıtlı ve önemli. Başarılı bir form gönderimi:

- blob deposuna gerçek başvuru kaydı yazar
- Resend üzerinden gerçek e-posta atar
- Meta'ya sahte bir `Lead` gönderir, algoritma onu gerçek sanıp bütçeyi kaydırır

Bu yüzden testler doğrulama katmanında duruyor: alan var mı, zorunluluk çalışıyor mu,
hata mesajı çıkıyor mu. Üstüne `playwright.config.ts` içinde `RESEND_API_KEY`,
`BLOB_READ_WRITE_TOKEN`, `META_CAPI_ACCESS_TOKEN` ve piksel kimlikleri boşaltılıyor.

**Bir test yazarken formu başarıyla göndermek isterseniz önce bu ikisini düşünün.**

---

## Üç dosya

### `e2e/akis.spec.ts` — para getiren yollar

- Tanışma formu: zorunlu alanlar, Youth seansında veli alanlarının çıkması
- **Reklam rızası kutusunun varsayılan KAPALI ve isteğe bağlı olması.**
  Bu test kırmızı verirse kozmetik değil hukuki bir sorun var: önceden işaretli
  ya da zorunlu bir kutu KVKK'da geçerli rıza sayılmıyor.
- Admin: giriş yapmadan panele girilememesi, yanlış şifrenin reddedilmesi
- Dönüşüm ekranı: tablo yapıştırma, satır çözümleme, rızasız kaydın dosyaya girmemesi
- Konsol hatası denetimi

### `e2e/gorsel.spec.ts` — görsel regresyon

Altı sayfa, iki görünüm, tam sayfa kare. Artı program satırı hover durumu.

Referanslar `e2e/gorsel.spec.ts-snapshots/` altında ve **depoya giriyor** — asıl
değeri karşılaştırma, referans olmadan test işe yaramıyor.

Bilerek tasarım değiştirdiysen `npm run test:guncelle` ile referansı yenile,
sonra `git diff` ile **değişen kareye gözle bak**. Bozuk bir kare referans olarak
kaydedilirse bozukluk kalıcı olarak doğru sayılır.

Tolerans `%2`: yazı tipi kenar yumuşatması makineden makineye 1-2 piksel oynuyor.
Sıfır tolerans her koşuda kırmızı verir.

Animasyonlar üç katmanda durduruluyor (Playwright ayarı, enjekte edilen CSS,
sayfayı sonuna kadar kaydırıp reveal'ları tetikleme). Olmadan her koşu farklı kare.

### `e2e/tarih.spec.ts` — geçmiş tarih denetimi

`data.ts` ve `sessions.ts` içindeki tarihleri bugüne göre kontrol eder.

> **Bu test şu anda KIRMIZI ve sebebi gerçek.** 22 Eylül itibarıyla sitede yayında
> olan beş tanışma seansından dördü 19 Eylül tarihli. Reklamdan gelen kişi geçmiş
> tarih görüyor. `sessions.ts` içinde güncelle ya da kaldır; test o zaman yeşile döner.

Kırmızı olması "kod bozuldu" demek değil, "yayındaki tarih geçti" demek.

---

## Bilinen tuzaklar

| Tuzak | Neden |
|---|---|
| `networkidle` kullanma | Bu uygulamada o durum hiç gelmiyor, test 30 sn bekleyip düşüyor |
| Kaydırma döngüsüne sınır koy | Ana sayfada indikçe içerik yükleniyor, `scrollHeight` büyüyor, döngü bitmiyor |
| Görsel beklemesine süre sınırı koy | `loading="lazy"` görseller görünür alana girmezse `complete` hiç true olmuyor |
| Mobil proje Chromium'a sabit | `devices['iPhone 13']` varsayılan WebKit istiyor, kurulu değil |
| Sayıyı metinden yakalama | `data-testid="sayim-*"` kullan; "4" sayfada birden çok yerde geçiyor |
| `/\/admin/` ile URL bekleme | `/admin/login` de bu kalıba uyuyor, giriş başarısızken test yanlış yerden düşüyor |

---

## Playwright MCP

`claude_desktop_config.json` içine eklendi (`mcpServers.playwright`).
Yedek aynı klasörde `claude_desktop_config.yedek-*.json` olarak duruyor.

**Claude Desktop yeniden başlatılmadan etkin olmuyor.**
