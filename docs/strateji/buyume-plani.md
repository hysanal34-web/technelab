# Techne Lab — Reklamsız Büyüme Kiti
*27 Ağustos 2026 · Reklam onayı gelene kadar (ve geldikten sonra da) organik hat*

Sıralama: etki ÷ efor. 1 ve 2 bu hafta bitmeli — ikisi de senin hesabınla oluyor, kod tarafı hazır.

---

## 0. AI görünürlüğü (bugün eklendi — kod tarafı tamam)

Gemini'den ilk yönlendirme geldiğine göre ("Techne Lab AI Referral" — bkz. hafıza notu) bu kanalı
büyütmeye değer. Bugün eklenenler:

- **`/llms.txt`** — ChatGPT, Gemini, Claude, Perplexity gibi asistanların siteyi tek bakışta
  özetleyebileceği yapılandırılmış bir sayfa. Tüm programlar, mekânlar, iletişim bilgisi otomatik
  olarak `data.ts`'ten üretiliyor — elle güncelleme gerekmiyor, `technelabistanbul.com/llms.txt`
  adresinden görülebilir.
- **`robots.txt`'e AI tarayıcıları açıkça izinlendi** — GPTBot (ChatGPT), Google-Extended (Gemini),
  PerplexityBot, ClaudeBot, Applebot-Extended. Önceden zaten engellenmiyorlardı ama artık niyet açık.
- **Semt sayfaları artık müzikal/dans sayfalarına geri link veriyor** — Kadıköy, Beyoğlu, Taksim
  sayfaları (nav'da linkli, en çok ziyaret edilen sayfalar) yeni müzikal/dans sayfalarına bağlandı.

Bunların hiçbiri anlık sonuç vermez — AI modelleri siteyi zamanla yeniden tarar. Ama temel artık
doğru: hem Google hem AI asistanları için aynı dürüst, yapılandırılmış veri kaynağı.

---

## 1. Google Business Profile — "telefonum çalsın"ın en kısa yolu (≈20 dk)

Harita kaydı olmadan "oyunculuk kursu kadıköy" tipi sorgularda harita paketine giremeyiz;
rakiplerin çoğu orada. Adres şartı yok — "hizmet bölgesi işletmesi" olarak açılıyor.

**Adımlar:** business.google.com → Yönetmeye başla → İşletme adı: `Techne Lab İstanbul`
→ "Müşterilerimi işletme adresim dışında ziyaret ediyorum" seç → hizmet bölgesi: Kadıköy, Beyoğlu, Üsküdar, Ataşehir
→ telefon: 0552 242 59 71 → site: technelabistanbul.com → doğrulama (telefon/video).

**Kategori:** Ana: *Tiyatro eğitimi* (yoksa: *Sanat okulu*). Ek: *Dans okulu*, *Drama okulu*.

**Açıklama (kopyala-yapıştır, 750 karakter sınırına uygun):**
> İstanbul'da bağımsız tiyatro ve performans atölyeleri. Oyunculuk, İngilizce yaratıcı drama, müzikal tiyatro, Broadway müzikal dansı, oyun yazarlığı ve dramaturji programları — Pera ve Kadıköy'deki partner stüdyolarda, en fazla 12 kişilik gruplarla. Her program seyircili bir final performansıyla tamamlanır. Eğitmen kadrosu sahnede ve sette aktif çalışan profesyonellerden oluşur; kurucusu oyun yazarı ve yönetmen Halil Yağız Şanal'dır. Yetişkinler ve 10–17 yaş gençler için ayrı gruplar açılır. Deneyim şartı yoktur.

**Hizmetler bölümüne eklenecekler:** Oyunculuk atölyesi · Müzikal tiyatro kursu · Broadway müzikal dansı · İngilizce drama (yetişkin) · İngilizce drama (10–17 yaş) · Yaratıcı yazarlık & dramaturji

**İlk Google post'u (kayıt açıldı duyurusu):**
> 2026–27 sezonu Eylül kayıtları açık. Müzikal tiyatro (8 ay, oyunculuk+şan+dans) 28 Eylül'de, Broadway müzikal dansı (12 ya da 6 hafta) 17 Eylül Perşembe akşamı Kadıköy'de başlıyor. Erken kayıt 10 Eylül'e kadar. Bilgi: 0552 242 59 71

Kurulduktan sonra: her atölye başlangıcında 1 post + galeri fotoğraflarından 8-10 tanesini yükle.
İlk katılımcı yorumlarını iste — "önce & sonra" yorumu yazan mezunlara WhatsApp'tan Google yorum linkini at.

## 2. Search Console (≈10 dk) — iki haftadır 1 numara

search.google.com/search-console → "Alan adı" mülkü: `technelabistanbul.com` → DNS TXT kaydıyla doğrula
(Vercel'de Domains → DNS'e TXT ekle) → Sitemaps: `sitemap.xml` gönder → URL denetimi ile şu 6 URL'ye
tek tek "indeksleme iste":

```
/  ·  /atolyeler  ·  /kadikoy-muzikal-tiyatro-kursu  ·  /kadikoy-dans-kursu
/muzikal-tiyatro-kursu-istanbul  ·  /dans-kursu-istanbul
```

Bu yapılınca haftalık SEO raporu tahminden gerçek veriye geçer.

## 3. Dış bağlantılar — 6 aylık domain'in tek eksiği

Sıfır dış link = mükemmel içerik bile görünmez. Hedef ilk ay 5-8 gerçek link, şu sırayla:

**a) Partner stüdyolar (en kolay, bu hafta):** Beden İşleri ve Soft Sanat'ın sitesi/Instagram'ı
bize link versin. Hazır mesaj:
> Merhaba! Eylül dönemi programlarımız stüdyonuzda başlıyor. Sitenizde/biyografinizde "partner topluluklar" ya da benzeri bir alanda technelabistanbul.com'a bağlantı verebilir misiniz? Biz de işbirlikleri sayfamızda size link veriyoruz: technelabistanbul.com/isbirlikleri — karşılıklı görünürlük ikimize de iyi gelir.

**b) GalataPerform:** Mezunu olduğun atölyenin "mezunlarımız/katılımcılarımız ne yapıyor" tarzı bir
alanı ya da sosyal paylaşımı varsa, Techne Lab'ın kuruluşu doğal bir haber konusu. Kısa mesajla sor.

**c) Eğitmen biyografileri:** Alara, Ece, Yeşim, Köksal, Sitare, Burcu — kişisel site/Instagram/menajans
sayfalarında "Techne Lab İstanbul'da eğitmen" + link. 6 eğitmen = 6 potansiyel link. Tek toplu mesajla iste.

**d) Harita/dizin kayıtları (NAP tutarlılığı — marka sorgusunu da güçlendirir):** Google (GBP ile),
Yandex Haritalar, Apple Business Connect, Foursquare. Hepsinde aynı ad-telefon-site.

**e) Basın açısı:** "İstanbul'da fiyat pazarlığı yerine telefonla konuşan, seyircili finalle biten
bağımsız bir atölye modeli" — kültür-sanat muhabirlerine 5 cümlelik tanıtım maili. Tek haber
çıkarsa en değerli linkimiz olur.

**Yapma:** Link satın alma, forum spam'i, kendi açtığın sözlük başlığı. 6 aylık domain'de
Google bunlara karşı acımasız; organik büyüyen az link > toplu gelen çok link.

## 4. Reklam onayı meselesi

Durumu buradan göremiyorum (hangi platform, ne zaman başvuruldu, hangi gerekçe) — ama kontrol yeri net:

- **Google Ads:** ads.google.com → Araçlar → *Politika yöneticisi* — askı gerekçesi ve itiraz butonu orada.
  Yeni hesaplarda en sık sebep: "Reklamveren doğrulaması" beklemesi (kimlik/işletme belgesi) ya da
  "ödeme sorunları". İtiraz sonrası tipik dönüş 1-3 iş günü.
- **Meta:** business.facebook.com → *Hesap kalitesi* — reklam hesabı kısıtlıysa gerekçe + "İncelemeyi iste".
  Pixel zaten sitede kurulu; onay gelince yeniden pazarlama havuzu (program sayfası ziyaretçileri) hazır.

İstersen tarayıcıda birlikte bakalım — hangi platformdaysa aç, durumu birlikte okuyup itiraz metnini yazarım.

## 5. Takvimde kalanlar (otomatik takipte)

- 31 Ağu: `dramaturg-ne-is-yapar` yayına (rakipsiz alan) · 10 Eyl: `ingilizce-konusma-pratigi-yontemleri`
- Her Pazar: haftalık SEO raporu — artık bu planın maddelerini de denetliyor (GBP kuruldu mu,
  SC verisi geldi mi, yeni sayfalar indekslendi mi, partner linkleri çıktı mı).

---
*Kod tarafında bugün eklendi: RSS beslemesi (/feed.xml — Google yeni makaleleri daha hızlı keşfeder).
Schema, sitemap, robots zaten tam. Sıra sende olan maddeler: 1, 2, 3a-c, 4.*
