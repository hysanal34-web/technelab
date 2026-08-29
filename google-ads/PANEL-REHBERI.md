# Google Ads Paneli — Adım Adım Kılavuz

Hesap: **669-492-3541** · techne.lab.istanbul@gmail.com
Panele giriş: `ads.google.com` — **sağ üstteki hesap techne.lab.istanbul olmalı.**
hysanal34 ile girersen yarım kalmış BAŞKA bir hesaba düşersin, orada çalışma.

Panelin sol kenarında altı ikon var: **Oluştur · Kampanyalar · Hedefler ·
Araçlar · Faturalandırma · Yönetici.** Aşağıda hep bunlara göre tarif ediyorum.

---

# BÖLÜM A — Önce ölçüm. Bu olmadan reklam açma.

## Durum: Analytics ZATEN ÇALIŞIYOR ✅

Tarayıcıdan doğruladım — site canlıda Google Analytics 4 yüklüyor:

- **Ölçüm kimliği: `G-488Z1GNL27`**
- `gtag` fonksiyonu yüklü, dataLayer dolu, Meta pikseli de çalışıyor
- Vercel'de `NEXT_PUBLIC_GA_ID` tanımlı (Production + Preview)
- Telefon/WhatsApp tıklama takibi için sayfada `data-call-cta` işaretli
  üç öğe var: program sayfası telefon linki, footer telefon linki,
  WhatsApp yüzen buton

**Yani A1 ve A2 adımlarına gerek yok — atla, A3'ten devam et.**

> ⚠️ Daha önce "sitede hiç Google etiketi yok" demiştim, **yanlıştı.**
> Sayfanın ham HTML'ine bakmıştım; Next.js bu etiketi sayfa yüklendikten
> sonra tarayıcı tarafında ekliyor, o yüzden ham HTML'de görünmüyor.
> Gerçek tarayıcıda kontrol edince çalıştığı ortaya çıktı.

## A1 · (gerekmiyor) Google Analytics hesabı

Zaten var: `G-488Z1GNL27`. Yeni mülk oluşturma.

## A2 · (gerekmiyor) Numarayı siteye tanıt

Vercel'de tanımlı ve canlıda çalışıyor.

## A3–A5 · TAMAMLANDI ✅ (29 Ağustos)

Dönüşüm takibi kuruldu ve canlıda doğrulandı. GA4 içe aktarma yoluna hiç
gerek kalmadı — doğrudan Ads etiketi kuruldu, daha hızlı ve daha doğru.

**Oluşturulan dönüşüm işlemi**

| | |
|---|---|
| Ad | **Başvuru Formu (kayit)** |
| Dönüşüm türü kimliği | 7737834956 |
| Kategori | Potansiyel müşteri formu gönderimi |
| Optimizasyon | **Birincil** (teklif verme bunu takip eder) |
| Kaynak | Web sitesi · manuel etkinlik |
| Sayım | Tıklama başına bir dönüşüm |
| Değer | Program bedeli (dinamik) — yoksa ₺1 |
| Pencere | 90 gün tıklama · 3 gün görüntüleme |
| Gelişmiş dönüşümler | Açık (Yağız onayladı, 29 Ağustos) |

**Etiket:** `AW-18404939896` · dönüşüm etiketi `8jFPCMz71-kcEPiwlMhE`

**Sitedeki karşılığı** — Vercel'de üç ortama da girildi:
```
NEXT_PUBLIC_GOOGLE_ADS_ID     = AW-18404939896
NEXT_PUBLIC_ADS_LABEL_BASVURU = 8jFPCMz71-kcEPiwlMhE
```
`GoogleAnalytics.tsx` bu kimliği aynı gtag üzerinden yapılandırıyor,
`MetaPixel.tsx` içindeki `trackLead()` başvuru gönderildiğinde dönüşümü
program bedeliyle birlikte ateşliyor.

**Canlı doğrulama:** Ana sayfa ve program sayfasında `AW-18404939896`
config'i dataLayer'da görünüyor, `G-488Z1GNL27` de yanında çalışıyor.
Dönüşüm etiketi client paketinde mevcut.

### Hâlâ "Hatalı yapılandırılmış" yazıyorsa

Normal. Google, ilk gerçek dönüşüm gelene kadar bu uyarıyı gösteriyor.
Reklamlar yayına girip ilk başvuru düştüğünde kendiliğinden "Etkin" olur.
Panik yapma, bir şey bozuk değil.

### Zaten var olan ikinci dönüşüm

**"Telefon aramasıyla elde edilen potansiyel müşteri"** — hesap varsayılanı,
etkin. Reklamdan gelen telefon aramalarını sayıyor. Dokunmadım, kalsın.

### İleride eklenebilir (şart değil)

WhatsApp ve telefon tıklamalarını da Ads dönüşümü yapmak istersen aynı
yöntemle ikinci bir etiket alıp `CallTracker.tsx` içine bağlarız.
**Ama ikincil olarak işaretle** — birincil yaparsan Google bütçeyi
"tıklayıp arayan" kişiye kaydırır, gerçekten kaydolana değil.

---

# BÖLÜM B — Kampanyaları yükle

Dosyalar `google-ads/` klasöründe. **Kampanyalar duraklatılmış olarak
yüklenir — sen açana kadar tek kuruş harcanmaz.**

1. Google Ads → **Araçlar** → **Toplu işlemler** → **Yüklemeler**
2. **+ Yükle** → `01-kampanya-yukleme.csv` seç
3. **Önizle** → hata var mı bak → yoksa **Uygula**
4. Aynı yerden `02-reklamlar-rsa.csv` → önizle → uygula
5. Aynı yerden `03-negatif-kelimeler.csv` → önizle → uygula

**Sıra önemli.** Reklam, ait olduğu grup yoksa yüklenmez.

Yükleme sonrası Kampanyalar ekranında iki kampanya göreceksin:
**TL - Yetiskin Programlar** (5 grup) ve **TL - Youth Veli** (3 grup).

---

# BÖLÜM C — CSV'ye sığmayan ayarlar

Bunlar dosyayla aktarılamıyor, panelden girilecek. **Her biri önemli**,
hiçbirini atlama.

## C1 · Görüntülü Reklam Ağı'nı KAPAT ⚠ en kritik

Google bunu varsayılan açık getiriyor ve bütçeyi sessizce yiyor — reklamın
alakasız sitelerde banner olarak çıkıyor, tıklayan da yanlışlıkla tıklıyor.

Her iki kampanya için: kampanyaya tıkla → **Ayarlar** → **Ağlar** →
- Arama Ağı ✅ açık
- **Görüntülü Reklam Ağı ❌ kapalı**
- Arama ortakları: kapalı (başlangıçta)

## C2 · Teklif stratejisi

Kampanya → Ayarlar → **Teklif verme**:
- **"Tıklamaları En Üst Düzeye Çıkar"** seç
- **"Maksimum TBM teklif sınırı belirle"** kutusunu işaretle → **₺35**

⚠ **"Dönüşümleri En Üst Düzeye Çıkar" SEÇME.** Henüz dönüşüm verisi yok,
optimize edecek bir şeyi olmadığı için bütçeyi rastgele harcar. 15–20 dönüşüm
biriktikten sonra geçeriz.

## C3 · Konum

Kampanya → Ayarlar → **Konumlar** → **İstanbul**

Sonra **Konum seçenekleri**'ni aç ve şunu seç:
**"Hedef konumlarınızdaki veya düzenli olarak bulunan kişiler"**
(Diğer seçenek "ilgi duyanlar" — İstanbul'u merak eden Ankaralıya da reklam
gösterir, para kaybı.)

### Teklif artırımları — varlıklı semtler

Ayarlar → Konumlar → İstanbul'un yanındaki kalem → alt bölgeler ekle,
her birine teklif ayarı gir:

| Semtler | Teklif |
|---|---|
| Etiler, Bebek, Levent, Nişantaşı, Ulus | +%35 |
| Moda, Caddebostan, Suadiye, Bağdat Cd. | +%35 |
| Zekeriyaköy, Kemerburgaz, Göktürk | +%25 |
| Ataşehir, Acıbadem, Koşuyolu | +%25 |
| Yeşilköy, Florya, Bakırköy sahil | +%20 |

**Neden:** Google Ads'de Türkiye için hane geliri hedeflemesi yok. Gelir
coğrafyaya çok net oturduğu için konum teklifi bunun yerine geçiyor.

### Youth kampanyası — uluslararası okul yarıçapları

Bu, Youth kampanyasının en güçlü ayarı ve rakiplerin hiçbiri yapmıyor.
Konumlar → **Yarıçap** sekmesi → her okul için **3 km**, teklif **+%40**:

```
Robert Kolej (Arnavutköy)          ENKA Okulları (İstinye)
MEF International School (Ulus)    Istanbul International Community School
The British International School (Zekeriyaköy)
Deutsche Schule Istanbul (Beyoğlu) Üsküdar Amerikan Lisesi
Lycée Saint-Benoît (Karaköy)       Saint-Joseph (Kadıköy)
Eyüboğlu / Bilfen / Doğa (Ataşehir–Ümraniye)
```

## C4 · Dil

Ayarlar → **Diller** → **Türkçe** ve **İngilizce** (ikisi de).
Expat ve uluslararası okul velisi tarayıcısını İngilizce kullanıyor.

## C5 · Reklam uzantıları

Kampanya → **Öğeler** (Assets) → **+ ekle**:

**Site bağlantıları** (4 adet):
| Metin | Bağlantı |
|---|---|
| Tüm Atölyeler | /atolyeler |
| Hakkımızda | /hakkinda |
| Ekip | /ekip |
| İletişim | /iletisim |

**Arama uzantısı:** 0552 242 59 71
→ Bu, mobilde reklamın altına "Ara" düğmesi koyar. Yüksek dönüşümlü.

**Açıklama metinleri** (kısa ifadeler):
`12 kişilik gruplar` · `Kadıköy ve Pera` · `Eylül dönemi` · `Küçük gruplar`

**Yapılandırılmış snippet:** Başlık "Kurslar" →
`Oyunculuk` · `Müzikal` · `Dans` · `Yaratıcı Yazarlık` · `İngilizce Drama`

## C6 · Auteur Lab teklifini kıs

Kampanya 1 → **1D The Auteur Lab** grubu → Varsayılan maks. TBM → **₺20**

**Neden:** Yazarlık kelimeleri ucuz, serbest bırakırsan tıklamaların çoğunu
o alır — ama 18.000 ₺ ile en düşük getirili programın ve 7 Ekim'e kadar vaktin var.

---

# BÖLÜM D — Yayına alma

Sırayla:

1. ✅ Bölüm A bitti mi? (Analytics çalışıyor, dönüşümler içe aktarıldı)
2. ✅ Üç CSV yüklendi mi?
3. ✅ Bölüm C'nin altı maddesi girildi mi?
4. Kampanyalar ekranı → her iki kampanyayı seç → **Durum: Etkin**
5. **Bildirim zilini kontrol et** (sağ üst). Politika incelemesi çıkarsa
   orada görünür. Tiyatro/oyunculuk kelimeleri Google'ın Türkçe
   sınıflandırıcısını bazen yanlış tetikliyor — çıkarsa itiraz et,
   destek sohbeti Türkçe ve genelde aynı gün açıyor.

Reklamlar onaydan sonra genelde **birkaç saat** içinde yayına giriyor.

---

# BÖLÜM E — Günlük rutin (5 dakika)

Bu bütçede en yüksek getirili iş bu. Atlarsan para akar.

**Her sabah:**

1. Kampanyalar → **Öngörüler ve raporlar** → **Arama terimleri**
2. Listeye bak: insanlar ne arayıp reklamını görmüş?
3. Alakasız olanı işaretle → **Negatif anahtar kelime olarak ekle**

Örnek: `oyunculuk bölümü taban puanı` çıkarsa → negatife. Öğrenci üniversite
arıyor, kursa gelmez ama tıklaması sana para.

**Haftada bir:**
- Hangi grup lead getiriyor? Getirmeyeni duraklat, bütçeyi getirene aktar.
- Tıklama başı maliyet ₺35'i aştı mı? Geniş kelimeleri daralt.

**Bütçe artırma kararı sana ait.** Otomatik artış kurmadım.
Artırmadan önce üçünü birden gör: arama terimleri temiz · TBM ₺35 altı ·
en az 1 gerçek lead. Üçü yoksa artırma — sorunu büyütmüş olursun.

---

# Hızlı sorun giderme

| Belirti | Sebep |
|---|---|
| Reklamlar hiç gösterilmiyor | Onay bekliyor ya da teklif çok düşük. Anahtar kelime durumuna bak. |
| Çok tıklama, hiç başvuru | Açılış sayfası ile reklam metni uyuşmuyor. Ya da ölçüm kurulmamış. |
| Bütçe öğlene bitiyor | Görüntülü Reklam Ağı açık kalmış olabilir (C1) ya da kelimeler çok geniş. |
| Alakasız aramalar | Negatif liste eksik. Bölüm E'yi her gün uygula. |
| "Sınırlı" uyarısı | Bütçe yetersiz demek. Normal, panik yok. |
