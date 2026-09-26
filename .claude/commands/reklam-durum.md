---
description: Meta + Google reklam hesaplarının güncel durumunu çıkar, sorunları işaretle
---

İki reklam hesabını kontrol et, sorunları önem sırasına koy. Hiçbir ayarı kendiliğinden değiştirme.

## Veriyi NEREDEN çekeceksin — önce bunu oku

**Tarayıcıyla panele girme.** Windsor.ai MCP bağlı ve üç hesabı da görüyor.
Aynı veriyi yüzde birinden az token'la veriyor.

```
get_data(connector="facebook",        accounts=["1943993929852674"], fields=[...], date_from, date_to)
get_data(connector="google_ads",      accounts=["669-492-3541"],     fields=[...], date_from, date_to)
get_data(connector="googleanalytics4",accounts=["548207464"],        fields=[...], date_from, date_to)
```

`get_fields(connector)` ile alan adlarını al, tahmin etme. Kullanışlı alanlar:
`campaign · adset · ad · spend · clicks · impressions · date · actions`

**Tarayıcı yalnızca şunlar için:** bütçe/hedefleme değiştirme, reklam metni düzenleme,
ödeme hareketleri ve fatura PDF'leri (Windsor harcamayı verir, tahsilatı vermez),
yayınlanmamış taslaklar. Yani *okuma* Windsor'dan, *yazma* tarayıcıdan.

**Harcama ≠ tahsilat.** Windsor'un `spend`'i tahakkuk eden reklam harcaması (KDV hariç).
Muhasebeye giren rakam ise Meta'nın karttan çektiği tutar (KDV dahil, farklı günlerde).
Muhasebe için `/ay-kapat`, performans için Windsor.

## Hesaplar

- **Meta**: reklam hesabı `act_1943993929852674` (YenireklamHesabıTechneLAb) · işletme portföyü `1605741837254289` · piksel `1542440530516639`
- **Google Ads**: `669-492-3541` (techne.lab.istanbul@gmail.com)
- **GA4**: `548207464` (technelabistanbul.com)

## Meta'da bakılacaklar

1. Aktif kampanya / reklam seti / reklam sayısı ve günlük bütçeler
2. Son 14 günün huni rakamları: gösterim → tıklama → mesaj. Kampanya bazında **tıklama→mesaj oranı** çıkar — bu oran hesabın en teşhis edici metriği, %4 ile %50 arasında geziyor.
3. **Yayındaki metinlerde geçmiş tarih var mı** — en sık ve en pahalı hata bu
4. Ödenmemiş bakiye ve harcama sınırı
5. Yayınlanmamış taslak değişiklikler ("Gözden Geçir ve Yayınla")
6. Reklam seti adları varsayılan mı ("Yeni Etkileşim Reklam Seti" gibi) — hedeflemeyi isimden okuyamıyorsak sorun

## Google Ads'te bakılacaklar

1. Kampanya bazında harcama / gösterim / tıklama / dönüşüm
2. **Gerçek harcama ÷ günlük bütçe** — %14 gibi bir oran teslimat sorunu demektir, teklif stratejisine bak
3. Düşük Kalite Puanlı anahtar kelimeler ("Uygun (Sınırlı)")
4. Arama terimleri raporunda yeni negatif adayları
5. Reklamveren doğrulama uyarısı (son tarih 4 Ekim 2026)

## Değerlendirme çerçevesi

Bütçe önerisi yaparken üç şeyi birlikte tart:

1. **Kalan kontenjan değeri** = boş yer × dip fiyat
2. **Geçmiş verim** = CAC'ın bilet fiyatına oranı
3. **Ölçeklenebilirlik** = o programda daha fazla sınıf açma kapasitesi var mı

Üçüncüsü belirleyici: English Drama Lab ve Broadway sınıf açma kapasitesi en esnek olanlar,
bütçenin büyük kısmı orada olmalı. Musical Lab / Praxis / Youth / Auteur sabit kontenjanlı,
bütçe artışı satışı aynı oranda büyütmüyor.

## Hedef kitle

Genel çerçeve: beyaz yakalı, mali durumu iyi yetişkinler. 45-54 yaş grubu 18-24'ten
7-10 kat daha iyi dönüyor — yetişkin programlarında yaş alt sınırını düşük tutma.

## Çıktı

Öncelik sırasına dizilmiş bulgu listesi + önerilen aksiyonlar. Her bulguda:
ne bozuk, neye mal oluyor, ne yapılmalı.
