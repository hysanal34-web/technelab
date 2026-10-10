# Rakip analizi, SEO ve GEO · 10 Ekim 2026

Hedef sorgular: oyunculuk eğitimi, kamera önü oyunculuk eğitimi, audition atölyesi. Ölçüm: gerçek Google, tr, kişiselleştirme kapalı, ilk 20.

## 1. Bugünkü durum

| Sorgu | Bizim yer | 1. sıra | AI özeti (AI Bakışı) |
|---|---|---|---|
| oyunculuk eğitimi | ilk 20'de yok | atolyecraft.com | yok |
| oyunculuk eğitimi istanbul | ilk 20'de yok | sakm.net (belediye) | yok |
| oyunculuk kursu istanbul | ilk 20'de yok | atolyecraft.com | yok |
| kamera önü oyunculuk eğitimi | ilk 20'de yok | mujdatgezensanatmerkezi.com.tr | yok |
| kamera önü oyunculuk kursu istanbul | **15** (geçen hafta 16) | atolyecraft.com (blog) | yok |
| audition atölyesi | ilk 20'de yok | atolyecraft.com | **var** |
| audition hazırlık istanbul | **15** (kamera sayfamızla) | auditionhouseistanbul.com | **var** |
| seçmeye hazırlık oyunculuk | ilk 10'da yok | sinemaakademi.com.tr | yok |

## 2. Rakipler gerçekte ne yapıyor

**Asıl bulgu: audition SERP'i zayıf içerikle dolu.** 1. sıradaki Craft audition sayfası yaklaşık 200 kelime; süre, fiyat, tarih, kontenjan, yer yok, eğitmen adı sayfada iki farklı yazılmış. SAKM'nin sayfasında eğitmen, süre ve tarih yok. Müjdat Gezen'in kamera önü sayfası yaklaşık 250 kelime. Bu sorgularda derin ve olgu dolu bir sayfa hızlı yükselebilir.

**Google'ın AI özeti ("audition atölyesi") kimleri listeliyor:** Craft, SAKM, Dès Vu (Ayşe Direkoğlu), Workshop Time (İsmail Kavrakoğlu, "4 hafta, 16 saat"), Actingo. Kaynak olarak Instagram ve biletimgo gösteriliyor. Ortak nokta: **adı konmuş bir audition ürünü + eğitmen adı + süre + yer.** Bizde ayrı bir audition ürünü olmadığı için listeye girecek bir şey yok.

**Yerel güç:** "audition atölyesi" aramasında sağda Audition House Istanbul'un işletme profili çıkıyor: Cihangir, **5.053 Google yorumu**. Bizim Google İşletme Profilimiz yok (bilinmiyor). Yerel sorgularda ve AI özetlerinde bu, içerikten daha güçlü bir sinyal.

**Sinema Akademi** (kamera önü): yaklaşık 5-6 bin kelime, 24 haftalık hafta hafta müfredat, 144 saat, 12 kişi, "%98 memnuniyet", "1600+ mezun" gibi doğrulanmamış iddialar, eğitmen adı yok. Uzunluk ve müfredat tablosu onu taşıyor.

**Craft:** "oyunculuk eğitimi" ve "oyunculuk kursu" sorgularının sahibi; ana sayfası ~2.500 kelime, 3 eğitmen adı, 16 kişi, 256+ saat, mezun yorumları, 9 SSS, ayrıca uzun blog yazıları (oyunculuk eğitimi kapsamlı rehber). Alan adı gücü yıllara dayanıyor.

**Kamu kurumları** (SAKM, İBB Enstitü, AKM): ücretsiz/düşük ücretli; "oyunculuk eğitimi istanbul"da üstteler. Onlarla fiyat üzerinden yarışılmaz; yöntem, eğitmen ve küçük grup üzerinden ayrışılır.

## 3. Bu turda yapılanlar (kodda, commit edilmedi)

**Yeni: "Kısaca" bloğu (GEO).** Disiplin sayfalarının en üstünde, soruya doğrudan cevap veren bir paragraf: program adı, eğitmen, süre, yer, kontenjan, durum. Aynı metin sayfanın SSS şemasına (FAQPage) ve llms.txt'e "Kısa Cevaplar" olarak giriyor. AI özetlerinin alıntıladığı biçim tam olarak bu.

| Sayfa | Değişiklik |
|---|---|
| /audition-hazirlik-atolyesi-istanbul | Baştan yazıldı. Başlık "Audition Atölyesi İstanbul — Seçme ve Self-Tape Hazırlığı". Dürüst konumlandırma: audition çalışması Acting Praxis finali (Harika Uygur) ve Camera Praxis 4. hafta içinde; ayrı tek günlük atölye yok. "Kısaca" bloğu, 10 terimlik Audition Sözlüğü, kaynaklı "Seçmenin yazılı kuralları" (Equity/CDG, SAG-AFTRA, Backstage, Harika Uygur), 8 SSS, 6 sabit yazı. Eski metin "self-tape atölyenin merkezinde" diyordu ama hangi programda olduğunu söylemiyordu; düzeltildi. |
| /kamera-onu-oyunculuk-istanbul | Başlığa "eğitimi" eklendi, "Kısaca" bloğu, yeni audition yazısına bağlantı. |
| /oyunculuk-kursu-istanbul | Başlık "Oyunculuk Kursu ve Eğitimi İstanbul", "Kısaca" bloğu, "Oyunculuk eğitimi nasıl alınır?" SSS'si, yeni rehbere bağlantı. |
| Yeni yazı: /makaleler/audition-nedir-secmeye-nasil-hazirlanilir | 1.150 kelime: audition akışı, ilk 24 saat, soğuk okuma, self-tape kuralları (kaynaklı), callback, atölye seçimi, bizim programlar, 6 SSS (şemalı). "audition nedir" ve "audition hazırlık" sorgularına. |
| Yeni yazı: /makaleler/oyunculuk-egitimi-nasil-alinir | 970 kelime: beş yol karşılaştırma tablosu (konservatuvar, özel kurs, atölye, kamu, online), kamera önü farkı, seçim soruları, 5 SSS. "oyunculuk eğitimi" bilgi sorgusuna (Craft'ın rehberiyle yarışır). |
| llms.txt | "Kısa Cevaplar" bölümü: üç hub'ın doğrudan cevabı ve bağlantısı. |

tsc temiz (tam kontrol, artımsız); tüm sözlük ve yazı bağlantıları betikle doğrulandı.

## 4. Rakipleri gerçekten geçmek için (Yağız'ın kararları)

Kod tarafı yapılabileni yaptı. Bu sorgularda 1. sıra içerikten çok şu üçüne bağlı:

1. **Adı konmuş bir Audition Atölyesi ürünü (en büyük kaldıraç).** AI özetleri ve "audition atölyesi" SERP'i ürün listeliyor. Elimizde rakiplerin hiçbirinde olmayan bir isim var: AMPAS ve CSA üyesi Harika Uygur. Örnek format: "Harika Uygur ile Audition Atölyesi", 1 gün ya da 2 hafta sonu, Pera, en fazla 14 kişi, self-tape kaydı teslim. Kararı ve tarihi verirsen sayfasını, şemasını ve etkinlik listelerini aynı gün hazırlarım.
2. **Google İşletme Profili + yorum.** Audition House'un 5.053 yorumu var. Kendi binamız olmasa da hizmet bölgesi işletmesi olarak profil açılabilir. Mevcut ve eski katılımcılardan yorum istemek yerel sonuçlarda ve AI cevaplarında en hızlı sinyal.
3. **AI'nın okuduğu platformlarda görünmek.** AI özeti biletimgo ve Instagram'ı kaynak gösteriyor. Atölyeleri biletimgo, Workshop Time, Tiyatrolar.com.tr atölye sayfası ve Bubilet'e açık adla (program, eğitmen, süre, yer) listelemek hem AI kaynağı hem dış bağlantı.
4. **Camera Praxis tarihi.** "Kayıt alıyor" bir kamera önü programı olmadan kamera sorgularında 1. sıra zor.

## 5. Dürüst beklenti

- **Audition atölyesi / audition hazırlık:** SERP zayıf, ilk 10 haftalar içinde gerçekçi; AI özetine girmek için 1. ve 3. madde şart.
- **Kamera önü oyunculuk kursu/eğitimi:** 15. sıradan ilk 10 gerçekçi; 1. sıra Camera Praxis tarihi ve dış bağlantıyla.
- **Oyunculuk eğitimi / oyunculuk kursu istanbul:** En zor sorgu; Craft, Sinema Akademi ve kamu kurumları yıllardır üstte. Aylar ve dış bağlantı ister; rehber yazı bilgi sorgusunda daha erken yer bulabilir.

## Değişen dosyalar
- src/lib/disiplinler.ts · src/components/DisciplinePage.tsx · src/app/llms.txt/route.ts
- src/content/makaleler/audition-nedir-secmeye-nasil-hazirlanilir.mdx (yeni)
- src/content/makaleler/oyunculuk-egitimi-nasil-alinir.mdx (yeni)
