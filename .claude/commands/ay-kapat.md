---
description: Bir ayın gelir-giderini belge bazında topla, muhasebeye tek dosya çıkar
argument-hint: [ay adı, örn. Ekim]
---

$1 ayının gelir ve giderini topla, muhasebeye gidecek tek dosyayı üret.

## Klasör düzeni

Her ay `~/Desktop/MUHASEBE/2026-NN-AyAdi/` altında, içinde `GELIR/` ve `GIDER/`.
Yoksa aç, şablonu bir önceki aydan kopyala.

## GELİR — nereden toplanır

Üç kaynak, üçü de "müşteriden çekim anı" görseli (hakediş/valör kaydı DEĞİL):

- **PayTR ödeme linki ekranları** → `GELIR/Odeme-Linki-Ekran-Goruntuleri/`
- **Garanti sanal POS işlem detayları** → `GELIR/Garanti-POS-Islem-Detaylari/`
- **Banka dekontları** (FAST / EFT / havale) → `GELIR/Garanti-Hesap-Dekontlari/`

Kurallar:
- Tutar **BRÜT** yazılır (müşteriden çekilen). POS komisyonu gelirden düşülmez, ayrı gider satırı olur.
- Tarih **onay tarihi**dir, paranın hesaba geçtiği tarih değil.
- Ödeme linki ekranında `Kalan Tutar`, tahsil edilmemiş parayı değil **henüz hesaba aktarılmamış** parayı gösterir. `Başarılı` + onay tarihi varsa para çekilmiştir.
- Katılımcı adı POS ekranında görünmüyorsa "Kart ···NNNN (isim yok)" yaz, uydurma.

## GİDER — nereden toplanır

- **Meta**: Business Suite → Faturalar ve ödemeler → Ödeme hareketleri. Tarih aralığını aya kur, her satırın tutarını ve KDV fatura kodunu al. Matrah = toplam / 1,20.
- **Google Ads**: `ads.google.com/aw/billing/summary` → ilgili ayın "Net maliyet"i. KDV yok (yurt dışı).
- **Anthropic / Higgsfield / diğer AI**: Gmail'de `invoice+statements@mail.anthropic.com` ve ilgili göndericiler. USD kalır, TL'ye çevirme — kart ekstresindeki fiili tutar esastır.
- **Stüdyo / mekân kirası**: faturası varsa `GIDER/Studyo-Kiralama/`
- **POS komisyonları**: POS ekranındaki brüt − net farkı

## Dosya yapısı

`Techne-Lab-{Ay}-2026-Gelir-Gider.xlsx`, üç sayfa:

1. **GELİR** — Tarih · Katılımcı/Kaynak · Program · Tutar (brüt) · Para br. · Tahsilat yöntemi · Belge · Not
2. **GİDER** — Tarih · Tedarikçi · Açıklama · Matrah · KDV · Toplam · Para br. · Ödeme · Belge durumu · Not
3. **Fiş-Slipler** — fiş fotoğrafları, gruplanmış, **gider toplamına dahil değil**

Toplam hücrelerini **sabit değer** olarak yaz, formül bırakma — formüller Excel açılana kadar boş görünüyor.

## Bitişte raporla

- Gelir toplamı (TRY) + kalem sayısı
- Gider toplamı (TRY) + varsa USD ayrı
- Net
- İndirilecek KDV
- **Muhasebeciye sorulacaklar** listesi: ay sınırına denk gelen faturalar, yurt dışı KDV-2, fatura kesilmemiş gelirler, program eşleşmesi yapılamamış kalemler
