# Bağlanacak Araçlar & API'ler

İki ayrı ihtiyaç var ve karıştırılmamalı:
**(A)** Techne Lab'ın işletme olarak ihtiyacı — satış, reklam, öğrenci takibi
**(B)** Yağız'ın sanatçı olarak ihtiyacı — yazarlık, prova, arşiv

Aşağıdaki liste öncelik sırasına göre. "Şimdi" işaretli olanlar Eylül'e yetişmesi
gerekenler.

---

## A) İşletme tarafı

### 1. Supermetrics — ŞİMDİ · zaten bağlı ✅
Google Ads + Meta Ads + Google Analytics + Instagram + TikTok verisini tek yerden
çeker. Reklam yayına girdiği anda "hangi kelime kaç kayıt getirdi" sorusunu
sormaya başlayabiliriz. **Bağlı ama yetkilendirme bekliyor** — Claude ayarlarından
onaylaman gerekiyor.

### 2. Google Search Console API — ŞİMDİ
SEO'nun kalp atışı. Hangi aramada kaçıncı sıradayız, kaç tıklama geldi, hangi
sayfa düşüyor. Haftalık SEO ajanı şu an dışarıdan arama yapıyor; Search Console
bağlanınca **gerçek veriye** bakacak, tahmine değil.
→ Bağlanma: Google hesabı yetkisi. Ayrı bir MCP gerekmiyorsa API anahtarıyla da olur.

### 3. Meta Business / Instagram Graph API — ŞİMDİ
Reklam performansı + Instagram içerik istatistiği + DM'den gelen soruların takibi.
Şu an Instagram'dan gelen soruları elle takip ediyorsun; buraya bağlanınca
"bu hafta kaç kişi DM'den fiyat sordu" ölçülebilir hale gelir.
→ Not: Meta CAPI zaten kurulu (`metaCapi.ts`), Business API ayrı bir katman.

### 4. Motion Creative Analytics — sonra
Meta reklam görsellerini ve **rakiplerin reklam kütüphanesini** analiz ediyor.
Sinema Akademi ve Drama Akademi'nin hangi reklamı ne kadar süredir yayında
olduğunu görmek stratejik — uzun süre yayında kalan reklam, çalışan reklamdır.
→ Reklam bütçesi anlamlı hale geldiğinde bağla.

### 5. Canva — sonra
Reklam görselleri ve Instagram post şablonları. Adobe Express zaten bağlı
(yetkilendirme bekliyor) ve benzer işi görüyor — ikisini birden kurma, birini seç.

### 6. Ödeme / kayıt altyapısı — değerlendir
Şu an başvuru formu var, ödeme ayrı yürüyor. **iyzico** veya **PayTR** API'si
(Türkiye'de standart) siteye bağlanırsa erken kayıt tahsilatı otomatikleşir.
Bu bir geliştirme işi, bağlantı işi değil — Eylül sonrası.

### 7. Öğrenci/kontak takibi — değerlendir
Şu an kayıtlar e-posta ve Resend Audience'a düşüyor. Grup sayısı arttığında
hafif bir CRM lazım olacak. Zoho CRM listede var ama ağır; **Notion** veya
**Airtable** bu ölçekte daha uygun.

---

## B) Sanatçı tarafı — senin kendi işin için

### 8. Zotero / kaynak arşivi
Oyun yazarken okuduğun metinler, tez, makale, tarihsel kaynak. Bir oyunun
dramaturjik altyapısını topluyorsan bu ciddi zaman kazandırır.

### 9. Notion veya Obsidian — prova defteri
Prova notları, sahne kararları, oyuncu geri bildirimleri, versiyon takibi.
Obsidian için hazır bir beceri zaten kurulu. Bir oyunun taslak geçmişini
arşivlemek, sonraki prodüksiyonda paha biçilmez oluyor.

### 10. Fireflies / Granola — prova ve toplantı kaydı
Prova sonrası konuşmaların dökümü. "Şu sahnede ne konuşmuştuk" sorusunun
cevabı. Her ikisi de listede mevcut, yetkilendirme bekliyor.

### 11. YouTube Data API — arşiv ve ikinci arama motoru
Atölye kayıtları, gösteri fragmanları. YouTube Google'ın ikinci arama motoru;
"ingilizce drama atölyesi istanbul" diye video arayan kitle SEO'da rakipsiz.

### 12. Google Drive — zaten bağlı ✅
Metinler, afişler, fotoğraflar. Bağlı ve çalışıyor.

---

## Şu an bağlı olup **yetkilendirme bekleyenler**

Bunlar Claude ayarlarından onaylanmadığı için kullanılamıyor. Sana en çok
yarayacak dördü:

| Araç | Ne için |
|---|---|
| **Supermetrics** | Reklam + analitik verisi (en öncelikli) |
| **Adobe for Creativity** | Görsel/video üretimi, sosyal medya boyutlandırma |
| **Nimble** | Canlı web verisi — rakip takibi bunu kullanacak |
| **Canva** | Alternatif tasarım kanalı |

Yetkilendirme yolu: Claude ayarları → Bağlayıcılar (Connectors) → ilgili
aracın yanındaki "Bağlan" butonu. Bu ekranda oturum açman gerekiyor, ben
senin yerine yapamıyorum.

---

## Öncelik sırası

1. **Supermetrics'i yetkilendir** — reklam yayına girer girmez veri lazım
2. **Search Console bağlantısı** — SEO ajanının gerçek veriye geçmesi için
3. **Nimble'ı yetkilendir** — haftalık rakip takibi daha derin çalışır
4. **Meta Business API** — Instagram DM ve reklam performansı
5. Kalanlar Eylül sonrası
