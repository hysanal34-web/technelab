# Techne Lab — Kurulum ve Devir Listesi

Bu dosyayı olduğu gibi ilgili arkadaşa ilet (WhatsApp/e-posta). 5 bölüm, her biri
bağımsız — sırayla ya da paralel yapılabilir. Toplam ~1,5 saat.

---

## A · Operasyon Sheet'ini kur (~10 dk)

Techne Lab'in günlük iş takip tablosu. `Techne-Lab-Operasyon.xlsx` dosyası ekte/klasörde.

1. Dosyayı Google Drive'a sürükle-bırak.
2. Yüklenen dosyaya sağ tık → **Şununla Aç → Google E-Tablolar**. (Bu otomatik olarak native bir Google Sheet kopyası açar, xlsx'i düzenlemiyorsun.)
3. Sekmelerin hepsinin geçtiğini kontrol et: BAŞLA, ADAYLAR, KAYIT-TAHSİLAT, MELİS GÜNLÜK, YAĞIZ GÜNLÜK, HAFTALIK, AYLIK, 90 GÜN, SKOR, ARAMA SCRİPTİ, MESAJ ŞABLONLARI, REKLAM ARKADAŞI BRİFİ, ARŞİV, KOD.
4. Sheet'te üstten **Uzantılar → Apps Script**.
5. Açılan boş dosyadaki her şeyi sil, **KOD** sekmesindeki A sütununun tamamını kopyala, buraya yapıştır. **Kaydet** (disket ikonu ya da Cmd+S).
6. Sheet sekmesine geri dön, sayfayı **yenile** (F5). Üstte yeni bir **"Techne Lab"** menüsü çıkmalı.
7. **Techne Lab → İlk kurulum**'a tıkla. Google izin isteyecek — hesabı seç, "Gelişmiş" → "Techne Lab (güvenli değil)'e git" diyerek onayla (bu senin kendi scriptin, normal bir uyarı).
8. Kurulum bittiğinde bir onay kutusu çıkar. Bundan sonra: yeni form başvuruları 15 dakikada bir ADAYLAR'a otomatik düşüyor.
9. Sheet'i **Paylaş** → Yağız'ın ve Melis'in e-postasını **Düzenleyen** olarak ekle.

**MELIS_EMAIL ayarı (opsiyonel ama önerilir):** Apps Script'e dönüp dosyanın en başındaki
`MELIS_EMAIL: '',` satırına Melis'in e-postasını yaz, tekrar Kaydet. Bundan sonra Melis'e
hafta içi her sabah "bugün aranacaklar" listesi otomatik e-posta gidiyor.

---

## B · GA4 dönüşüm olaylarını işaretle (~10 dk) — EN KRİTİK MADDE

GA4'te `generate_lead`, `whatsapp_click`, `phone_call` olayları oluyor ama hiçbiri
"önemli etkinlik" (key event) işaretli değil. Bu yüzden hem raporlarda dönüşüm 0
görünüyor hem de Google Ads optimizasyon yapamıyor — gerçek veri yok.

1. [analytics.google.com](https://analytics.google.com) → Techne Lab mülkü (GA4 hesap ID: 548207464)
2. Yönetici (sol alt dişli) → Veri görünümü altında **Etkinlikler**
3. Listede `generate_lead`, `whatsapp_click`, `phone_call` satırlarını bul, her birinde
   sağdaki anahtar/toggle'ı **"Önemli etkinlik olarak işaretle"** konumuna getir.
4. **Google Ads → Araçlar ve Ayarlar → Ölçüm → Dönüşümler → + Yeni dönüşüm eylemi → İçe Aktar → Google Analytics 4 (GA4) mülkleri**
   → yukarıdaki 3 olayı seç → İçe Aktar.

Bundan sonra reklam harcaması gerçek kayıt sinyaliyle optimize olabiliyor.

---

## C · Search Console doğrulaması (~10 dk)

1. [search.google.com/search-console](https://search.google.com/search-console) → **Mülk ekle**
2. **URL ön eki** yöntemini seç: `https://www.technelabistanbul.com`
3. Doğrulama yöntemi olarak **HTML etiketi**'ni seç. Verilen `<meta name="google-site-verification" content="...">` kodunu kopyala.
4. Bu kodu **Yağız'a gönder** — siteye ekleyip deploy etmesi gerekiyor (kod değişikliği, sadece Yağız yapıyor).
5. Yağız deploy ettikten sonra Search Console'da **Doğrula**'ya bas.
6. Doğrulandıktan sonra **Site haritaları** → `sitemap.xml` gönder.

---

## D · Google Business Profile aç (~20 dk)

1. [business.google.com](https://business.google.com) → **Yönetmeye başla**
2. İşletme adı: `Techne Lab İstanbul`
3. "Müşterilerimi işletme adresim dışında ziyaret ediyorum" seç (fiziksel adresimiz yok, partner mekanlar var) → hizmet bölgesi: **Kadıköy, Beyoğlu, Üsküdar, Ataşehir**
4. Telefon: `0552 242 59 71` · Site: `technelabistanbul.com`
5. Kategori — Ana: **Tiyatro eğitimi** (yoksa: Sanat okulu). Ek: **Dans okulu, Drama okulu**
6. Açıklama (kopyala-yapıştır):
   > İstanbul'da bağımsız tiyatro ve performans atölyeleri. Oyunculuk, İngilizce yaratıcı drama, müzikal tiyatro, Broadway müzikal dansı, oyun yazarlığı ve dramaturji programları — Pera ve Kadıköy'deki partner stüdyolarda, en fazla 12 kişilik gruplarla. Her program seyircili bir final performansıyla tamamlanır. Eğitmen kadrosu sahnede ve sette aktif çalışan profesyonellerden oluşur; kurucusu oyun yazarı ve yönetmen Halil Yağız Şanal'dır. Yetişkinler ve 10–17 yaş gençler için ayrı gruplar açılır. Deneyim şartı yoktur.
7. Hizmetler: Oyunculuk atölyesi · Müzikal tiyatro kursu · Broadway müzikal dansı · İngilizce drama (yetişkin) · İngilizce drama (10–17 yaş) · Yaratıcı yazarlık & dramaturji
8. Doğrulama telefon/video ile yapılır — mülkü kimin doğruladığı Yağız'ın hesabı olacak şekilde ayarlanmalı (yönetici olarak eklenebilirsin).

---

## E · Reklam ve tasarım — devraldığın kapsam

**Kapsam:** Meta Ads, Google Ads, grafik tasarım, Instagram post/story/reels üretimi ve yayını.
Yağız ve Melis artık reklam paneline girmiyor, görsel üretmiyor — sana öncelik ve metin verir,
haftalık SKOR'u okur.

**Hesap erişimleri** (Yağız verecek):
- Meta reklam hesabı: `act_1943993929852674` (YenireklamHesabıTechneLAb)
- Meta işletme portföyü: `1605741837254289` · Piksel: `1542440530516639`
- Google Ads: `669-492-3541` · techne.lab.istanbul@gmail.com

**Tek doğru veri kaynağı — reklamdaki tarih bununla eşleşmek zorunda:**
`/Users/macbookpro/Downloads/technelab/src/lib/data.ts` (fiyat/paket) ve
`src/app/tanisma-gunu/sessions.ts` (tanışma günü tarihleri). Farklıysa reklam geçmiş
tarih duyurur, tıklayan kaybedilir. Kod erişimin yoksa güncel tabloyu Yağız'dan iste.

**Dil kuralları — reklam metninde de geçerli:**
- "Ders" kelimesi yasak → atölye / program / seans denir
- Postta ve reklam metninde telefon numarası yok, yönlendirme DM/siteye
- Eğitmen adı ve unvanı reklam metnine konmaz
- "Ücretsiz" cümle içinde geçer, başlıkta bağırmaz
- Em dash (—) kullanılmaz
- Fiyat sitede gizli, DM'den verilir

**Marka kimliği:** Bauhaus estetiği × Berlin underground × İstanbul tiyatro sahnesi.
Zemin siyahı `#0A0A0C`, vurgu neon yeşil `#C8FF00`. Fotoğraf dili: gerçek an, sahne
ışığı, kalabalık poz yok. Kurumsal kimlik kılavuzunun tam hali birkaç hafta içinde
Yağız'dan gelecek.

**Devraldığın noktadaki performans (1-14 Eylül):**
Meta: ₺110.088 harcama, 880 mesaj, 23 form. En iyi dönüşen: Techne Musical Lab
(%40,8 tıklama→mesaj, mesaj başı ₺71). En kötü: English Acting Praxis (%4,3, ₺283
mesaj başı) — ucuz CPM ama yanlış kitle. Google Ads 30 gündür bütçesinin sadece
%14'ünü harcıyordu ("Hedef gösterim payı" stratejisi sorunlu); Broadway kampanyası
0 gösterimdi. B maddesindeki GA4 kurulumu tamamlanmadan hiçbir optimizasyon kararı
gerçek veriye dayanmıyor — ilk iş bu.

**Her hafta Yağız'a bildirilecek:** Operasyon Sheet'indeki SKOR sekmesine program
bazında harcama, mesaj sayısı, form/kayıt sayısı, kayıt başı maliyet. Pazartesi kısa
bir görüşmede.

**Yağız'da kalan kararlar:** Aylık bütçe onayı, hangi haftada hangi programa ağırlık
verileceği, marka dili ve kurumsal kimlik onayı.
