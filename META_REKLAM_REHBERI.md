# Meta Reklam Paneli — Denetim, Rehber ve Takip Sistemi

23 Ağustos 2026 · Hesap: YenireklamHesabıTechneLab (1943993929852674)

Bu dosya üç iş yapıyor:
**A.** Mevcut kurulumun denetimi — ne eksik, ne yanlış
**B.** Panelin nasıl çalıştığı — sıfırdan öğrenme
**C.** Haftalık takip sistemi — neye, ne zaman bakılacak

Hiçbir ayar değiştirilmedi. Düzeltmeleri sen yapacaksın; her biri için
adım adım yol yazdım.

---
---

# A · DENETİM — Şu An Ne Eksik

## A1. Ölü kampanyalar hâlâ "Etkin" görünüyor ⚠️

Hesapta **bitiş tarihi geçmiş yedi kampanya** hâlâ ENABLED durumda:

| Kampanya | Tarih | Durum |
|---|---|---|
| Instagram gönderisi: Orijinal Broadway… | 20–27 Haziran | Etkin |
| Instagram gönderisi: Sizi Pera'daki stüdyomuzun… | 14–19 Nisan | Etkin |
| Broadway mesaj | 5 Nisan – 2 Mayıs | Etkin |
| Yeni Etkileşim Kampanyası**https://adsmanager…** | 7–22 Nisan | Etkin |
| Instagram gönderisi: Sahnede zihninizi… ×3 | Mart | Etkin |

**Zarar veriyor mu?** Hayır — bitiş tarihi geçtiği için harcamıyorlar.
**Sorun ne?** Panel okunamaz hale geliyor. 57 kampanya var, hangisi
gerçekten çalışıyor ayırt edilemiyor. Karar verirken yanlış tabloya
bakıyorsun.

**→ SEN YAP:** Kampanyalar sayfasında her birinin yanındaki mavi anahtarı
kapat. Silme — geçmiş veriyi kaybedersin, sadece kapat.

## A2. Bir kampanyanın adı yapıştırılmış bir URL 😬

`Yeni Etkileşim Kampanyasıhttps://adsmanager.facebook.com/adsmanager/...`

Kopyala-yapıştır kazası. Bu, isimlendirme disiplininin hiç olmadığını
gösteriyor — hesapta ayrıca **"Yeni Etkileşim Reklam Seti"** adında
en az yedi ayrı reklam seti var. Hangisinin hangi programa ait olduğunu
panelden anlamak imkânsız.

**→ SEN YAP:** Aşağıdaki isimlendirme kuralını uygula (bkz. B4).

## A3. Hiçbir kampanyada maliyet tavanı yok

Hepsinde teklif stratejisi **LOWEST_COST_WITHOUT_CAP** — yani "Meta,
bütçeyi harca, ne kadar sonuç alırsan al."

Bu başlangıç için doğru bir ayar; Meta'nın öğrenmesine izin veriyor.
**Ama artık veri var:** DM başına maliyetlerin 80 TL ile 500 TL arasında
gidip geliyor. Öğrenme bittikten sonra tavan koymak dalgalanmayı
kesecek.

**→ SEN YAP (henüz değil, 1–2 hafta sonra):** Reklam seti → Teklif
stratejisi → "Maliyet başına hedef" → DM başına kabul ettiğin üst
sınır. Örneğin Broadway için 150 TL, Youth için 400 TL.

## A4. Bütçe seviyesi kampanyadan kampanyaya değişiyor

İki farklı model karışık kullanılıyor:

- **CBO (kampanya bütçesi):** Yeniden Hedefleme — Meta bütçeyi setler
  arasında kendi dağıtıyor
- **ABO (reklam seti bütçesi):** diğer altı kampanya — her set kendi
  bütçesini harcıyor

Tek reklam seti olan kampanyada ikisi de aynı işi yapar, sorun değil.
Ama bir kampanyaya ikinci set eklediğinde fark ortaya çıkar. **Kural:**
programları test edeceksen ABO (kontrol sende), Meta'nın kazananı
bulmasını istiyorsan CBO.

## A5. Reklam planlaması (saat/gün) hiç kullanılmamış

Bütün kampanyalar 7/24 yayında. Ama kitlen belli saatlerde çevrimiçi:
çalışan yetişkin akşam 19:00–24:00, veli sabah ve akşam.

Gece 03:00'te gösterilen reklam para yakıyor.

**→ SEN YAP (test olarak bir kampanyada):** Reklam seti düzenle →
Bütçe ve Plan → "Toplam bütçe" seç (planlama sadece toplam bütçede
açılıyor) → Reklam planlaması → belirli saatler.
*Not: Günlük bütçede bu seçenek çıkmaz, o yüzden şimdilik ertelenebilir.*

## A6. Frekans sınırı yok

Şu an frekanslar düşük (1,16–1,93) yani acil değil. Ama yeniden
hedefleme kampanyası küçük bir havuza (83 bin) günde 800 TL harcıyor —
orada frekans hızla yükselir ve insanlar bıkar.

**→ TAKİP ET:** Frekans **3,0'ı geçerse** o kampanyada ya kreatifi
değiştir ya bütçeyi düşür.

## A7. Boost edilmiş gönderiler ile gerçek kampanyalar karışmış

"Instagram gönderisi: …" diye başlayan kampanyalar, Instagram'daki
**"Tanıt"** butonuyla yapılmış. Bunlar:

- Hedefleme seçeneği kısıtlı
- Yerleşim seçilemiyor
- A/B testi yapılamıyor
- Raporlaması sığ

**Kural: Bir daha "Tanıt" butonunu kullanma.** Her reklam Ads
Manager'dan kurulmalı. Tanıt butonu hızlı görünür ama kontrolü sana
bırakmaz ve hesabı kirletir.

## A8. Atıf penceresi varsayılanda

Hepsinde "7 günlük tıklama, tüm dönüşümler". Bu Meta'nın varsayılanı ve
mesajlaşma kampanyaları için makul. Değiştirme.

---
---

# B · META PANELİNİ ÖĞRENMEK

## B1. Üç katmanlı yapı — en temel şey

Meta'da her şey üç kata ayrılır. Karışıklığın çoğu bu katları
karıştırmaktan çıkar.

```
KAMPANYA          → NEDEN reklam veriyorsun (hedef)
   └─ REKLAM SETİ → KİME, NEREDE, NE KADAR (kitle, bütçe, yerleşim)
        └─ REKLAM → NE gösteriyorsun (görsel + metin)
```

**Nerede ne ayarlanır:**

| Ayar | Katman |
|---|---|
| Hedef (mesaj, trafik, satış) | Kampanya |
| Bütçe (CBO ise) | Kampanya |
| Hedef kitle, yaş, konum, ilgi | **Reklam seti** |
| Bütçe (ABO ise) | **Reklam seti** |
| Yerleşim (feed, story, reels) | **Reklam seti** |
| Optimizasyon hedefi | **Reklam seti** |
| Görsel, video, metin, buton | Reklam |

Bugün yaşadığımız sorunların çoğu buradan çıktı: hedef kitleyi
kampanyada değil **reklam setinde** aramak gerekiyor.

## B2. Öğrenme aşaması — en kritik kavram

Yeni bir reklam seti kurduğunda Meta kimin tıklayacağını bilmez.
Deneme yanılmayla öğrenir. Bu döneme **öğrenme aşaması** denir ve
yaklaşık **50 dönüşüm** sürer (bizde dönüşüm = yeni mesaj).

**Öğrenme aşamasında:**
- Maliyetler dalgalı ve genelde yüksek olur
- Sonuçlara bakıp karar vermek yanlıştır

**Öğrenmeyi sıfırlayan şeyler:**
- Hedef kitleyi değiştirmek
- Bütçeyi %20'den fazla değiştirmek
- Kreatifi değiştirmek
- Optimizasyon hedefini değiştirmek

Yani her müdahale seni başa döndürür. Bugün Auteur Lab'in
hedeflemesini değiştirdik — o set şu an sıfırdan öğreniyor.

**Kural: Bir sete dokunduktan sonra en az 3–4 gün elleme.**

## B3. Bütçeyi doğru artırmak

Bütçeyi bir anda ikiye katlamak öğrenmeyi sıfırlar. Doğru yöntem:

**Her 3–4 günde bir en fazla %20 artır.**

500 TL → 600 → 720 → 860 → 1.030
Yavaş görünür ama öğrenme bozulmadığı için sonuç daha ucuz gelir.

## B4. İsimlendirme kuralı

Şu an yedi tane "Yeni Etkileşim Reklam Seti" var. Bir hafta sonra
hangisinin ne olduğunu bilemezsin. Kural şu olsun:

```
KAMPANYA:     [PROGRAM] · [AMAÇ]
              Broadway · Yeni Kitle
              English Drama Lab · Yeniden Hedefleme

REKLAM SETİ:  [KİTLE] · [YAŞ] · [SEMT]
              İlgi Alanı · 25-45 · Kadıköy
              Etkileşim Havuzu · 18+ · İstanbul

REKLAM:       [KREATİF] · [TARİH]
              Katılımcı Yorumu Kadın · 22 Ağu
              Broadway Reels 1 · 22 Ağu
```

Yeni kurduğun her şeyde bunu uygula. Eskileri düzeltmek zorunda
değilsin ama karışıklık sürerse bir gün oturup yeniden adlandır.

## B5. Doğru optimizasyon hedefi

Reklam setinde "Performans hedefi" diye bir kutu var. Şu an hepsinde
**"Konuşma sayısını en üst seviyeye çıkarın"** yazıyor — bu doğru.

Yanlış olan seçenekler ve neden:
- *Erişim* → çok kişiye gösterir, kimse yazmaz
- *Bağlantı tıklaması* → tıklar ama mesaj atmaz
- *Gönderi etkileşimi* → beğeni toplar, kayıt getirmez

Meta neyi optimize etmesini söylersen onu getirir. Beğeni istersen
beğeni gelir, mesaj istersen mesaj.

## B6. Advantage+ ne demek

Reklam setinde "Advantage+ hedef kitle" diye bir anahtar var.

**Açıkken:** Meta senin ilgi alanı listeni bir *öneri* sayar, dışına
çıkıp yeni insan arar. Kitle genişler, kontrol azalır. **Hariç tutma
ekleyemezsin** — bugün API'nin üç kez reddettiği şey buydu.

**Kapalıyken:** Sadece senin tanımladığın kitleye gider. Kontrol sende.

**Ne zaman hangisi:** Yeni kitle bulmak istiyorsan açık. Belirli bir
grubu hedeflemek ya da birini hariç tutmak istiyorsan kapalı.

---
---

# C · HAFTALIK TAKİP SİSTEMİ

## C1. Her gün — 2 dakika

Ads Manager → Kampanyalar. Sadece iki şeye bak:

1. **Kırmızı uyarı var mı?** (reklam reddi, ödeme sorunu, hesap kısıtı)
2. **Harcama beklediğin gibi mi?** Toplam günlük ~4.400 TL olmalı

Başka hiçbir şeye bakma. Günlük dalgalanmaya bakıp karar vermek en sık
yapılan hata.

## C2. Her pazartesi — 20 dakika

Tarih aralığını **son 7 gün** yap ve şu sütunları aç
(Sütunlar → Performans ve tıklamalar):

| Sütun | Ne söyler | Alarm eşiği |
|---|---|---|
| Harcama | Para nereye gitti | — |
| Sonuçlar (mesaj) | Kaç DM geldi | — |
| Sonuç başına maliyet | **En önemli sayı** | Program bedelinin %5'ini aşarsa |
| Erişim | Kaç ayrı kişi gördü | — |
| Frekans | Kişi başı kaç gösterim | **3,0 üstü = sorun** |
| Link CTR | Metnin ilgi çekiyor mu | **%0,2 altı = kreatif zayıf** |

**Karar kuralları:**

- Sonuç başına maliyet **iki hafta üst üste** yükseliyorsa → kreatifi değiştir
- Frekans 3,0'ı geçtiyse → kitleyi genişlet ya da bütçeyi düşür
- CTR %0,2'nin altındaysa → görsel ve ilk cümle çalışmıyor
- Bir kampanya diğerlerinin iki katı pahalıysa → bütçesini yarıya indir,
  kapatma (kapatınca öğrenme kaybolur)

## C3. Program bedeline göre değerlendir

Bu en çok atlanan şey. DM başına maliyet tek başına anlamsız:

| Program | Bedel | Kabul edilebilir DM maliyeti |
|---|---|---|
| Techne Musical Lab | 165.000 | 600 TL'ye kadar makul |
| English Drama Youth | 128.000 | 500 TL'ye kadar makul |
| English Acting Praxis | 72.000 | 350 TL |
| English Drama Lab | 30.000 | 150 TL |
| Broadway | 25.000 | 120 TL |
| Auteur Lab | 18.000 | 90 TL |

*Hesap:* on DM'den biri kayda dönüyorsa, DM maliyeti × 10, program
bedelinin %35'ini geçmemeli.

**Bu tabloya göre bugünkü durum:** Broadway (80 TL) çok iyi,
Musical Lab (155 TL) çok iyi, Youth (500 TL) sınırda ama kabul
edilebilir, Auteur Lab (388 TL) **kabul edilemez** — bu yüzden bugün
hedeflemesi değiştirildi.

## C4. Ayda bir — 1 saat

- Kazanan kreatifleri belirle, kaybedenleri kapat
- Etkileşim havuzlarını yenile (yeni etkileşim gelenler otomatik ekleniyor)
- Bütçe dağılımını gözden geçir
- Ölü kampanyaları kapat

---
---

# D · SIRADAKİ ADIMLAR (senin yapacakların)

**Bu hafta:**
1. Yedi ölü kampanyayı kapat (A1)
2. URL adlı kampanyanın adını düzelt (A2)
3. Yeni kurduğun her şeyde isimlendirme kuralını uygula (B4)

**Gelecek hafta (öğrenme bittikten sonra):**
4. Auteur Lab'in yeni hedeflemesinin sonucuna bak
5. Maliyet tavanı koymayı test et (A3)
6. Bütçeleri %20 kuralıyla ayarla (B3)

**Sürekli:**
7. "Tanıt" butonunu bir daha kullanma — her reklam Ads Manager'dan
8. Bir sete dokunduktan sonra 3–4 gün bekle
9. Pazartesi kontrolünü takvime koy
