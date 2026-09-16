# Reklam + Dönüşüm Hattı Stratejisi
**15 Eylül 2026 · Techne Lab İstanbul**

Veri kaynakları: Meta Ads Manager (1–14 Eylül), Google Ads (22 Ağu–14 Eyl),
Gmail tanışma formu bildirimleri (10–13 Eylül), `MASAÜSTÜ/MUHASEBE/`.

---

## 1. Şu an nerede duruyoruz

### Harcama

| | Dönem | Tutar | Günlük |
|---|---|---|---|
| Meta | 1–14 Eylül (14 gün) | **₺110.088** | ₺7.863 |
| Google Ads | 22 Ağu–14 Eyl (30 gün) | ₺4.161 | ₺139 |
| **Ağustos toplam gider** | (13 Meta faturası + stüdyo) | **₺258.065** | — |

Eylül bu hızla giderse **₺236.000**. İki aylık reklam ≈ **₺434.000**.

### Karşılığında ne aldık

```
₺110.088  →  880 mesaj  →  23 form başvurusu  →  ? kayıt
             (₺125/mesaj)   (₺1.367/başvuru)      (ÖLÇÜLMÜYOR)
```

- **880 mesajın %9'u forma dönüyor.** Onda dokuzu DM'de ölüyor.
- **23 başvuru yalnızca 10–13 Eylül penceresinden.** Öncesi görünmüyor (bkz. §2.3).
- **Kayıt ve tahsilat verisi hiçbir yerde yok.** `2026-Gelir-Gider-Ozet.csv`'de
  GELİR sütunu tamamen boş — Şubat'tan bugüne tek satır gelir kaydı girilmemiş.

---

## 2. Altı sızıntı — bütçeden önce bunlar

Bütçeyi kısmak semptomu tedavi eder. Asıl kayıp huninin içinde.

### 2.1 Gelir kaydı yok — en kritik
İki aydır ~₺434.000 reklam harcandı, karşılığında kaç kişinin kaydolduğu ve ne
ödediği hiçbir yerde yazmıyor. Bu düzelmeden **hiçbir bütçe kararı veri temelli
olamaz** — aşağıdaki senaryolar da varsayımla çalışıyor.

**Yapılacak:** Her ayın `GELIR/` klasörüne kayıt CSV'si (tarih · ad · program ·
tutar · ödeme tipi · nereden geldi). Geçmişe dönük Ağustos–Eylül doldurulacak.

### 2.2 Form otomasyonu çalışmıyor
`MASAÜSTÜ/TANIŞMA GÜNÜ/` altındaki **sekiz CSV'nin hepsi boş**. Oysa Gmail'de
23 başvuru duruyor. Saatlik aktarım görevi satır yazmıyor.

Sonuç: asistanlar listeyi göremiyor, kimse aranmıyor, kimin geldiği
işaretlenmiyor. 23 kişi ₺31.000'e satın alındı ve takipsiz duruyor.

### 2.3 1–9 Eylül karanlık
Form e-postası 10 Eylül'e kadar yalnızca `info@technelabistanbul.com`'a
gidiyordu; o kutu bağlı değil. **Dokuz günlük (~₺70.000) başvuru verisi kayıp.**
Bugün elimizdeki 23 rakamı, harcamanın sadece dörtte birinin karşılığı.

### 2.4 Mesaj → form adımında %91 kayıp
Meta'ya mesaj başına ₺125 ödüyoruz; forma dönen başına ₺1.367. Aradaki 11 kat
tamamen DM yanıtlama kalitesinden geliyor. Otomasyonlar kapalı, süreç manuel.

### 2.5 Youth: 107 mesaj → 1 form
İkinci en büyük bütçe (₺22.370), en kötü dönüşüm. Başvuru başına **₺6.391** —
ortalamanın 4,7 katı. Reklam ilgi çekiyor ama DM'den forma geçmiyor.

### 2.6 13 Eylül'den beri sıfır başvuru
Son form 13 Eylül 10:33'te geldi. İki gündür ~₺15.700 harcandı, **sıfır
başvuru**. Muhtemel sebep: reklam metinleri geçmiş tanışma tarihlerini
gösteriyor (12/13 Eylül seansları kaldırıldı, reklamlar güncellenmedi).

---

## 3. Program ekonomisi — paranın nereye gitmesi gerektiği

### Sezon potansiyeli (kontenjan dolu varsayımı)

| Program | Fiyat | Kontenjan | Potansiyel gelir | Payı |
|---|---:|---:|---:|---:|
| Techne Musical Lab | ₺140.000 | 12 | ₺1.680.000 | %35 |
| English Drama Youth | ₺99.000 | 12 | ₺1.188.000 | %25 |
| English Acting Praxis | ₺59.000 | 14 | ₺826.000 | %17 |
| Broadway Musical Dance | ₺16.500 | 15 ×2 | ₺495.000 | %10 |
| English Drama Lab | ₺19.500 | 12 ×2 | ₺468.000 | %10 |
| The Auteur Lab | ₺18.000 | 10 | ₺180.000 | %4 |
| **Toplam** | | | **₺4.837.000** | |

### Bütçe dağılımı potansiyele uymuyor

| Program | Bütçe payı | Gelir payı | Fark |
|---|---:|---:|---|
| Techne Musical Lab | %19 | %35 | **eksik yatırım** |
| English Drama Youth | %20 | %25 | dengeli (ama dönüşüm bozuk) |
| English Acting Praxis | %15 | %17 | dengeli |
| Broadway | %14 | %10 | hafif fazla |
| English Drama Lab | %20 | %10 | **iki kat fazla** |
| The Auteur Lab | %9 | %4 | **iki kat fazla** |

### CAC toleransı vs. gerçekleşen

Kural: müşteri edinme maliyeti ilk satışın **%15'ini** geçmemeli.
Gerçekleşen CAC = form başına maliyet ÷ %30 (form→kayıt varsayımı).

| Program | Form başına | Tahmini CAC | Tolerans (%15) | Durum |
|---|---:|---:|---:|---|
| Broadway | ₺563 | ₺1.877 | ₺2.475 | ✅ verimli |
| English Acting Praxis | ₺1.213 | ₺4.043 | ₺8.850 | ✅ 2× marj |
| Techne Musical Lab | ₺1.493 | ₺4.977 | ₺21.000 | ✅ **4× marj** |
| English Drama Lab | ₺1.583 | ₺5.277 | ₺2.925 | ❌ 1,8× aşıyor |
| English Drama Youth | ₺6.391 | ₺21.303 | ₺14.850 | ❌ 1,4× aşıyor |
| The Auteur Lab | ₺2.797 | ₺9.323 | ₺2.700 | ❌ **3,5× aşıyor** |

**Tek cümlelik sonuç:** Pahalı bilet satan uzun programlar (Musical Lab, Praxis)
Meta maliyetini rahat kaldırıyor; ucuz bilet satan kısa programlar (Auteur, EDL)
kaldıramıyor. Bütçe mesaj sayısına göre değil, **bilet büyüklüğü × dönüşüm**
kabiliyetine göre dağıtılmalı.

---

## 4. Bütçe senaryoları

Sezon 28 Eylül – 7 Ekim'de başlıyor. Kalan satış penceresi **~20 gün**.

### A · Sert kesinti — ₺2.500/gün (₺75.000/ay)

| Program | Günlük | 20 günde | Beklenen form |
|---|---:|---:|---:|
| Techne Musical Lab | ₺900 | ₺18.000 | 12 |
| English Acting Praxis | ₺600 | ₺12.000 | 10 |
| Broadway Musical Dance | ₺500 | ₺10.000 | 18 |
| English Drama Youth | ₺400 | ₺8.000 | 1–6 * |
| English Drama Lab | ₺100 | ₺2.000 | 1 |
| The Auteur Lab | ₺0 | — | organik + Google |
| **Toplam** | **₺2.500** | **₺50.000** | **42–47** |

\* Youth'un DM adımı düzeltilirse 6'ya çıkar, düzeltilmezse 1'de kalır.

20 günde ₺50.000 harcama · ~44 form · %30 dönüşümle ~13 kayıt
→ tahmini gelir **₺900.000–1.100.000** · ROAS ~20×

### B · Orta — ₺3.700/gün (₺110.000/ay)
A'nın oranları korunarak %48 büyütülür. Musical ₺1.300 · Praxis ₺900 ·
Broadway ₺750 · Youth ₺600 · EDL ₺150. 20 günde ₺74.000, ~65 form.
Kontenjanlar daha hızlı dolar; Musical Lab ve Praxis'in 12–14 kişilik
kontenjanı ~3 haftada kapanabilir.

### C · Mevcut devam — ₺7.863/gün (₺236.000/ay)
**Önerilmiyor.** Bu bütçe yalnızca §2'deki altı sızıntı kapandıktan ve gelir
ölçümü kurulduktan sonra savunulabilir. Şu haliyle harcamanın dörtte üçünün
nereye gittiği ölçülemiyor.

**Öneri: A ile başla.** Sızıntılar kapanıp gelir ölçümü kurulduktan sonra —
gerçek CAC görülünce — B'ye ya da C'ye çıkmak veri temelli bir karar olur.

---

## 5. Uygulama sırası

### Bu hafta — ölçüm (bunlar olmadan bütçe kararı kör)
1. Meta bütçelerini A senaryosuna indir; Auteur kampanyasını durdur.
2. Yayındaki tüm reklam metinlerinden geçmiş tanışma tarihlerini temizle
   (19 Eylül Pera · 27 Eylül Kadıköy).
3. Tanışma formu → CSV aktarımını onar; Gmail'deki 23 başvuruyu geriye dönük işle.
4. `GELIR/` kayıt tablosunu aç, Ağustos–Eylül kayıtlarını gir.
5. Form e-postasına kalıcı ikinci alıcı eklendiğini doğrula (1–9 Eylül tekrar etmesin).

### Gelecek hafta — dönüşüm
6. 23 başvurunun hepsini ara. 19 ve 27 Eylül seanslarına davet et.
7. DM → form köprüsünü kısalt: her yanıtın sonunda tek link, tek cümle.
8. Youth'ta DM akışını ayrı ele al — 107 mesaj 1 forma dönüyor, sorun mesajda.
9. Google Ads: "TL - Yetiskin Programlar" kampanyasını yayına al (duraklatılmış),
   Broadway'in sıfır gösterim sorununu çöz, 4 kampanyayı "Hedef gösterim payı"ndan çıkar.

### Sürekli
10. Haftalık tek tablo: harcama · mesaj · form · kayıt · gelir — program bazında.
    Bu tablo olmadan bir sonraki bütçe kararı da tahmin olur.

---

## 6. Bu belgedeki varsayımlar

Aşağıdakiler ölçülmedi, varsayıldı — gerçek veri geldiğinde güncellenecek:

- **Form → kayıt dönüşümü %30.** Hiç ölçülmedi. Gerçek oran %15 ise tüm CAC
  rakamları iki katına çıkar ve A senaryosu bile agresif kalır.
- **Form başına maliyet**, 10–13 Eylül'ün 4 günlük penceresinden hesaplandı;
  günlük harcama o dönemde de ₺7.863 kabul edildi.
- **Kontenjanların boş olduğu** varsayıldı; gelir kaydı olmadığı için kaç kişinin
  zaten kayıtlı olduğu bilinmiyor.
- **CAC toleransı %15**, hizmet işletmeleri için yaygın eşik — Techne Lab'in
  gerçek marjına göre ayarlanmalı (mekân kirası, eğitmen ücreti düşüldükten sonra).
