# SEO yoğunlaştırma · 17 Ekim 2026

Kapsam (Yağız'ın isteği): draft'ları yayına al, haftalık makale sayısını artır, teknik SEO denetimi, rakip ve anahtar kelime analizi; **müzikalde 1. sıra**, **konuşma kulüplerinden trafik**, **Youth ve EDL için reklamsız trafik**.

*Kodda commit, push ya da deploy yapılmadı. api.vercel.com bu ortamdan erişilemiyor.*

## 1. Müzikal: "müzikal tiyatro kursu istanbul" (12 Ekim: 3 → 11)

**Teşhis:** Üç sayfa aynı sorguyu hedefliyordu: hub (/muzikal-tiyatro-kursu-istanbul), program sayfası (/atolyeler/techne-musical-lab, başlığı "Müzikal Tiyatro Kursu İstanbul — …") ve makale (/makaleler/muzikali-tiyatro-kursu-istanbul, başlığı "Müzikal Tiyatro Kursu İstanbul: …"). Google program sayfasını seçmiş, hub geride kalmış. Ayrıca sayfalarda tarih çelişkisi vardı: aynı sayfada "12 Ekim'de başladı" ve "başlıyor".

Rakip (Sinema Akademi, Sanat Akademi aynı şablon): ~5.000 kelime, 16 hafta/64 saat, haftalık müfredat H2'leri, eğitmen adı ve yaş yok. Kimse eğitmen + yaş + gün + final gösterisi + seçme kriterini birlikte vermiyor (biz veriyoruz).

**Yapılanlar:**
- Program sayfası başlığı markaya döndü: "Techne Musical Lab — 8 Aylık Müzikal Programı, Kadıköy". Hub sorgunun tek sahibi.
- Makale yeniden konumlandı: "Müzikal Tiyatro Eğitimi Nedir, Nasıl Çalışılır?" (bilgi niyeti), etiketlerden "kurs istanbul" çıktı.
- Hub'a 5 yeni SSS (deneyim şart mı, dönem başladı katılabilir miyim, 15 yaş altı, yetişkin olarak geç mi, kurs sonrası sahne) + "Bu konuda yazdıklarımız" listesi sabitlendi (6 yazı).
- 9 müzikal/dans yazısından hub'a "müzikal tiyatro kursu" çapa metniyle link (önce 4'ünde vardı).
- Tarih çelişkileri düzeltildi (Musical Lab 12 Ekim, Broadway Taksim 3 Ekim: "başladı, katılım açık").
- Yeni yazı (yayında): /makaleler/belting-nedir-muzikal-sesi-belt-mix-legit (869 kelime, SSS'li). Türkçe SERP'te bu konuda derin içerik yok.

**Yağız'ın kararı gereken (asıl kaldıraç):**
1. Hub'a **toplam saat** ve **gün/saat**: rakiplerin en görünür verisi "64 saat". data.ts'te Musical Lab için gün ve saat yok, ben uyduramam. Hangi günler, kaçta, kaç saat?
2. **Kadıköy Broadway Musical Dance çelişkisi:** data.ts "Kadıköy: Yakında · tarih için DM" diyor; dans-kursu-istanbul, kadikoy-dans-kursu ve taksim sayfaları ise "Kadıköy sınıfı 1 Ekim Perşembe 19:00, Rasimpaşa" diyor. Hangisi doğru? Dokunmadım.
3. Geçen yılın gösterisinden izinli görsel ve gösteri tarihi/salonu (DasDas modeline karşı en güçlü argüman).
4. 12 yaş altı müzikal programı yok; rakipler (Dormen 9–11, BT 10–18) bu sorguyu yaşla alıyor. Ürün kararı.

## 2. Konuşma kulübü trafiği

**Bulgu:** "konuşma kulübü kadıköy / beyoğlu" SERP'i pratikte boş (gün/saat/yer veren tek sayfa yok). "İngilizce tartışma konuları" için özel bir sayfa yok. Soru bankamız (216 soru) bulunan en derin Türkçe kaynak.

**Yapılanlar:**
- Yeni kaynak: **/kaynaklar/ingilizce-tartisma-konulari**: 12 kategori, 60 önerge (B2/C1), her birinde lehte/aleyhte açılış argümanı, 7 kalıp grubu, 4 kulüp formatı, 6 SSS; ItemList + FAQPage + Breadcrumb şeması; sitemap ve /kaynaklar listesine eklendi.
- Yeni yerel sayfalar (navHidden, sitemap'te): **/kadikoy-ingilizce-konusma-kulubu** (EDL Pazartesi 20:00) ve **/beyoglu-ingilizce-konusma-kulubu** (EDL Pera Cumartesi 15:00). Dürüst konumlandırma: "kulüp değiliz, kulüp esnekliğinde drama (1/4/8 oturum)". Ana konuşma kulübü sayfasından iç link.
- 8 konuşma kulübü / İngilizce yazısına iki kaynak sayfasına link.

**Sırada (dağıtım, SEO dışı ama en hızlı):** Meetup/Kommunity organizatörlerine (Speak Easy, EnTalk, Istanbul English Club) iki kaynak sayfasını ücretsiz materyal olarak önermek. "İstanbul'da ücretsiz İngilizce konuşma kulüpleri" rehberi (yalnızca doğrulanmış seçeneklerle).

## 3. English Drama Youth ve Lab

**Kritik bulgu:** Canlı /en/drama-classes-for-kids-istanbul hâlâ eski metni gösteriyor ("no requirement", "September to May"). Kodda düzeltilmiş hali duruyor: **deploy edilmediği için** 8 Ekim düzeltmeleri canlıda yok. En yüksek etkili iş deploy.

**Yapılanlar:**
- Yeni EN yazı (yayında): /en/articles/drama-classes-for-teens-istanbul-english (15–17 yaş, "English theatre for teens istanbul" SERP'i boş).
- EN çocuk sayfasında Kadıköy 17 Ekim "starts" → "started, joining open".

**Sırada:** Yabangee'ye etkinlik/yazı (son kayıt 2017), expatexchange / funday / learn4good dizinleri, armut.com profili; İngilizce tanışma formu (expat veli Türkçe forma düşüyor).

## 4. Draft'lar

Yayına alınan (680+ kelime, kaynaksız rakam yok, linkler temiz): dramatik-yapi-nedir (Keşanlı Ali için doğrulanamayan "Muammer Karaca sahnesi" ibaresi çıkarıldı; yalnız 1964 doğrulandı), dramaturg-ile-yonetmen-nasil-calisir, dramaturg-nasil-olunur, roman-oyuna-nasil-uyarlanir, yaratici-dramada-rolde-lider.
Draft kalan: haber yazıları (tarihi geçmiş ya da doğrulanması gereken), 680 altı yazılar, yaratici-drama-oturumu-nasil-kurulur (301).

## 5. Teknik SEO denetimi

| Bulgu | Durum |
|---|---|
| FAQ şeması: 123 yayındaki yazının 115'inde SSS bölümü yoktu | En çok gösterim alan 6 yazıya 4'er SSS eklendi (dramaturg ne iş yapar, dramaturji, ensemble — "ansambl oyuncu kadrolu ne demek" dahil, stanislavski, forum tiyatro, ingilizce drama atölyesi) |
| articleFaq.ts, SSS'den sonra gelen "---  yazar notu"nu son cevaba yapıştırıyordu | Düzeltildi: yatay çizgi bölümü bitiriyor |
| 18 yetim yazı (hiç iç link almayan) | 19 yazıya "İlgili yazılar" satırı eklendi; hepsi bağlandı |
| Kanibalizasyon (müzikal) | Çözüldü (yukarıda) |
| 37 yazının başlığı 65 karakterden uzun | Not edildi; Google kırpıyor. Sonraki turlarda kısaltılabilir |
| 57 excerpt 165 karakterden uzun, 60 yazıda kapak görseli yok | Not edildi |
| Yanlış/draft'a giden link | 0 |
| tsc | temiz |

## 6. Haftalık makale sayısı

Planlı görev güncellendi: haftada **5 makale** (1 haber, 1 müzikal, 1 konuşma kulübü/İngilizce drama, 1 Youth/Lab TR-EN dönüşümlü, 1 serbest), en yüksek puanlı 3'ü yayına (≥18/25). SSS biçimi, yetim bırakmama ve data.ts doğrulama kuralları eklendi.

## Deploy

`cd /Users/macbookpro/Downloads/technelab && npx vercel --prod --yes --scope techne-lan`
Sonra Search Console'a sitemap'i yeniden gönder ve şu URL'ler için dizine ekleme iste: /muzikal-tiyatro-kursu-istanbul, /kaynaklar/ingilizce-tartisma-konulari, /kadikoy-ingilizce-konusma-kulubu, /beyoglu-ingilizce-konusma-kulubu, /en/drama-classes-for-kids-istanbul.
