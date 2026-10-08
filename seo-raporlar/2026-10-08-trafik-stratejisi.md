# Trafik Stratejisi · 8 Ekim 2026

Hedef: hızlı organik trafik, özellikle üç kitleden: konuşma kulübü alışkanlığı olanlar, Türkiye'de yaşayan ve kısa süreli kalan yabancılar, müzikal ilgisi olanlar.
Çıkış noktası: Search Console'a göre 2 haftada ~213 tık, ortalama konum 7,3–8,0. Trafiğin çoğu bilgi amaçlı makalelerden geliyor ("dramaturg nedir", "stanislavski"); ticari sayfalar 9–12. konumda.

## Ana fikir

Makale tek başına yavaş büyür. Hızlı trafik üç kaldıraçtan gelir:
1. **Araç / kaynak sayfaları**: insanların tekrar tekrar açtığı, paylaştığı, link verdiği sayfalar (soru bankası, şarkı listesi, sözlük). Rekabet zayıf, niyet net, link çeker.
2. **Boş SERP'ler**: Türkçe arama sonuçlarında hiç iyi cevap olmayan sorgular ("konuşma kulübü nasıl yönetilir", "müzikal seçme şarkıları", "English theatre Istanbul"). İlk iyi sayfa hızlı yükselir.
3. **Yeni dil**: /en altında makale yoktu. İngilizce aramalarda Istanbul'a dair tiyatro/drama içeriği neredeyse yok; rakipler 2015–2019 tarihli expat blogları.

## Bu turda yapılanlar (8 Ekim)

### Altyapı
| İş | Dosya |
|---|---|
| İngilizce blog: /en/articles liste + makale sayfası, hreflang (trSlug ile TR karşılığı), Article + Breadcrumb + FAQPage şeması, sitemap | src/lib/enArticles.ts, src/app/en/articles/, src/content/articles-en/ |
| Makalelerde tablo desteği (remark-gfm) — eskiden tablolar düz metin görünüyordu | package.json, makaleler/[slug]/page.tsx |
| Makale gövdesindeki "## Sık sorulan sorular" bölümünden otomatik FAQPage şeması (TR + EN) | src/lib/articleFaq.ts |
| /en ana sayfasına "articles in english" bağlantısı | src/app/en/page.tsx |
| 301: yaratici-drama-oturumu-nasil-kurulur → yaratici-drama-asamalari (aynı konuda iki yazı vardı) | next.config.mjs |

Not: src/lib/faq.ts program SSS'leri için zaten vardı; kazara üzerine yazıldı, git'ten geri yüklendi, yeni dosya articleFaq.ts adıyla ayrıldı. tsc temiz.

### Kaynak sayfaları (yeni)
- **/kaynaklar/konusma-kulubu-sorulari**: 18 konu, 216 soru (B1/B2/C1), her soruya takip sorusu, 18 rol kartı. Türkçe rakiplerin en büyüğü 50 soru, seviye ayrımı zayıf, C1 yok.
- **/kaynaklar/muzikal-secme-sarkilari**: ses tipine göre 46 seçme şarkısı + 17 "çok söylenen" + 6 alternatif (Backstage ve BroadwayWorld listeleri, kaynaklı), 7 seçme ilkesi, SSS. Türkçe SERP'te bu konuda hiçbir sayfa yok.

### Yazılar (yeni, yayında)
| Slug | Dil | Kitle |
|---|---|---|
| konusma-kulubu-nasil-yonetilir | TR | kulüp organizatörleri, öğretmenler (link çeker) |
| istanbulda-muzikaller-ekim-kasim-2026 | TR | müzikal seyircisi → Musical Lab |
| en/articles/english-speaking-theatre-istanbul | EN | expat, ziyaretçi |
| en/articles/theatre-workshop-istanbul-short-stay | EN | kısa süreli kalanlar, dijital göçebeler |
| en/articles/make-friends-istanbul-expat-drama | EN | Türkiye'de yaşayan yabancılar |
| yaratici-drama-asamalari, cocuklarda-yaratici-drama, ingilizce-yaratici-drama-yontemi | TR | dün yazılmıştı, bugün yayına alındı |

## Kitle kitle plan

### 1. Konuşma kulübü kitlesi
Sitede kulüp seçimi zaten 6 yazıyla kapalı. Eksik olan, kulübe giden ya da kulüp yöneten kişinin her hafta aradığı şey: soru, konu, format.
- Yapıldı: soru bankası + moderatör rehberi.
- Sırada: "İngilizce tartışma konuları" (debate topics, B2–C1), "rol yapma kartları" (role-play cards) kaynak sayfası, aylık "bu ayın 5 konuşma konusu" (bülten ve Instagram için tekrar kullanılabilir).
- Dağıtım: İstanbul'daki Meetup gruplarına (Speak Easy, EnTalk, Smileys Community) soru bankasını ücretsiz kaynak olarak önermek. Bunlar organizatör; link ve yönlendirme getirir.
- Rakip notu: EnTalk her pazar "Act in English" (doğaçlama + oyunculuk oyunları) yapıyor. Konumlanmamız: haftalık sabit grup, eğitmen, 4/8/12 hafta.

### 2. Türkiye'de yaşayan ve ziyarete gelen yabancılar
İstanbul'da 610.221 ikamet izinli yabancı (GİB verisi, Göç Vakfı derlemesi, Eylül 2026). İngilizce rakip içerik eski ve tiyatroyu atlıyor.
- Yapıldı: 3 İngilizce makale + blog altyapısı.
- Sırada (EN): "English drama classes for kids and teens in Istanbul — a parent's guide" (uluslararası okul velileri; Speech Bubbles tek rakip), "Watching theatre in Istanbul without Turkish" (festival dönemi 22 Ekim–3 Aralık, zamanlı), "Acting classes in Istanbul in English: how to choose".
- **Kısa süreli workshop (Yağız'ın istediği çalışma):** Şu an gerçekte var olan iki şey ziyaretçiye uygun: haftalık ücretsiz tanışma (Pera Cmt 15:00, Kadıköy Pzt 20:00) ve EDL'nin 4 haftalık seçeneği. Makaleler bunlara bağlanıyor. Ürün önerisi (karar Yağız'da): ayda bir, 3 saatlik, İngilizce "Istanbul Drop-In Theatre Workshop" — ücretli, önceden kayıtlı, turist/dijital göçebe/yeni gelen expat için. Varsa Airbnb Experiences ve GetYourGuide'a da listelenebilir; bu, SEO dışı ama hızlı bir kanal.
- **Engel:** Tanışma günü formu Türkçe. İngilizce gelen ziyaretçi Türkçe forma düşüyor. /en/intro-session gibi İngilizce bir form ya da formun dil seçeneği ilk teknik öncelik olmalı.

### 3. Müzikal
Kayıtların zayıf olmasının bir kısmı SEO değil, ürün ve takvim:
- Musical Lab yalnız Kadıköy'de; tanışma yalnız 8 ve 12 Ekim'de (tek seferlik). EDL ve Youth'un haftalık yinelenen tanışması var, Musical'ın yok. **Haftalık yinelenen bir Musical tanışması** en hızlı dönüşüm kaldıracı.
- Broadway Musical Dance'in şu an tanışması yok.
- Rakipler: Sinema Akademi (16 hafta, Bakırköy), Dormen Akademi (Ataşehir, 18–55 ve çocuk/genç), DasDas Akademi (kendi sahnesinde mezuniyet müzikali), Ataşehir Belediyesi ücretsiz müzikal topluluğu (9–13, seçmeler 1 Kasım). DasDas modeli (eğitim + gerçek sahne) bizim için güçlü bir karşı-argüman: final gösterisini daha görünür anlatmak gerek.
- Yapıldı: seçme şarkıları kaynağı + İstanbul müzikal takvimi (aylık güncellenecek).
- Sırada: "Müzikal tiyatro eğitimi seçerken bakılacak 7 şey" (rakiplerin hiçbiri fiyat/takvim/eğitmen/seçme repertuvarını birlikte vermiyor), "Broadway jazz nedir" türü dans içerikleri (Türkçe rakip yok), aylık takvim güncellemesi (Kasım sürümü 1 Kasım'da).

## Hızlı kazanımlar (kod, düşük maliyet)
1. **SSS bölümleri:** 113 yayında makaleden yalnız ~5'inde "## Sık sorulan sorular" bölümü var. Artık bu bölüm otomatik FAQPage şeması üretiyor. Search Console'da 8–12. konumdaki makalelere (dramaturg nedir, ensemble, forum tiyatro, stanislavski) 4–6 soruluk SSS eklemek, zengin sonuç ve tık oranı için en ucuz iş.
2. **Kaynak sayfalarına iç link:** konuşma kulübü yazılarından /kaynaklar/konusma-kulubu-sorulari'ye, müzikal yazılarından /kaynaklar/muzikal-secme-sarkilari'ye birer bağlantı.
3. **İngilizce tanışma formu** (yukarıda).
4. **Musical haftalık tanışma** (yukarıda; data ve sessions.ts'te tek satır).

## 4 haftalık takvim
| Hafta | İçerik | Altyapı / dağıtım |
|---|---|---|
| 1 (8–14 Eki) | Bu turdakiler | Deploy, Search Console'a sitemap'i yeniden gönder, /en/articles'ı URL denetiminden dizine iste |
| 2 (15–21 Eki) | EN: Watching theatre in Istanbul without Turkish (festival öncesi) · TR: Müzikal eğitim seçme rehberi | İngilizce tanışma formu · Meetup organizatörlerine soru bankası |
| 3 (22–28 Eki) | EN: Kids & teens parent's guide · TR: İngilizce tartışma konuları (B2–C1) | 8–12. konumdaki 6 makaleye SSS |
| 4 (29 Eki–4 Kas) | TR: İstanbul müzikal takvimi Kasım güncellemesi · TR/EN: rol yapma kartları kaynağı | 14 Ekim sonrası Search Console karşılaştırması ile ilk ölçüm |

## Ölçüm
- Search Console: yeni sayfaların gösterimi 2–4 hafta içinde görünmeye başlar. Takip edilecek sorgular: "konuşma kulübü soruları", "ingilizce konuşma konuları", "konuşma kulübü nasıl yönetilir", "müzikal seçme şarkıları", "istanbul müzikal", "english theatre istanbul", "make friends istanbul".
- GA4: /kaynaklar/* sayfalarından /tanisma-gunu'ya geçiş.

## Deploy
Sandbox Vercel'e ulaşamıyor. Komut:
`cd /Users/macbookpro/Downloads/technelab && npx vercel --prod --yes --scope techne-lan`
