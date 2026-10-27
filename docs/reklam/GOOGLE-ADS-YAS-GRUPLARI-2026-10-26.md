# Google Ads: yaş gruplarına göre genişletme — 26 Ekim 2026

17 Ekim planının üstüne ekleme. İki kampanyaya sekiz yeni reklam grubu, 131 yeni
anahtar kelime, 42 yeni negatif. Mevcut 132 kelime ve 68 negatif tekrar edilmedi.

**TL-Muzikal duraklatıldı, SEO ile yürüyor** (Yağız, 26 Ekim). Bu dosyada müzikal
kelimesi yok; müzikal sayfaları organik sıralamayla ilerliyor.

**Kurumsal / okul için reklam grubu şimdilik yok.** Kelime önerisi hazır,
`google-ads-kurumsal-beklemede.csv` içinde bekliyor (27 kelime). Yağız "aç" dediğinde
ayrı kampanya olarak eklenir; ilk kurumsal referans gelene kadar beklemede.

Dosyalar (hepsi bu klasörde):

| Dosya | Ne var |
|---|---|
| `google-ads-kelimeler-yas-gruplari.csv` | 131 kelime, 8 grup, mevcut CSV ile aynı sütunlar |
| `google-ads-metinler-yas-gruplari.csv` | Her grup için 15 başlık + 4 açıklama, karakter sayısı yanında |
| `google-ads-negatif-ek.csv` | 42 ek negatif, iki kampanyaya da |
| `google-ads-kurumsal-beklemede.csv` | Kurumsal + okul, 27 kelime, BEKLEMEDE |

---

## Gruplar ve açılış sayfaları

| Kampanya | Yeni grup | Kitle, dil | Kelime | Açılış sayfası |
|---|---|---|---|---|
| TL-Youth-8-17 | Youth-8-10-Veli | İlkokul velisi | 15 | /cocuklar-icin-ingilizce-drama-istanbul |
| | Youth-11-14-Veli | Ortaokul velisi | 16 | /cocuklar-icin-ingilizce-drama-istanbul |
| | Youth-15-17-Genc | Liseli ve velisi | 17 | /gencler-icin-ingilizce-drama-istanbul |
| | Youth-Veli-Sorun | Veli, sorun dili ("biliyor ama konuşmuyor") | 15 | /cocuklar-icin-ingilizce-drama-istanbul |
| TL-Yetiskin-Ingilizce-Drama | Yetiskin-18-25-Universite | Üniversiteli, Erasmus öncesi | 16 | /ingilizce-konusma-kulubu-istanbul |
| | Yetiskin-26-40-Calisan | Çalışan, toplantı ve sunum derdi | 18 | /ingilizce-konusma-kulubu-istanbul |
| | Yetiskin-40-plus | 40 üstü, emekli, ileri yaş | 16 | /yetiskinler-icin-ingilizce-drama-istanbul |
| | Konusma-Kulubu-Fetih | Konuşma kulübü, speaking club, language exchange arayan | 18 | /ingilizce-konusma-kulubu-istanbul; semt varyantları /kadikoy-ingilizce-konusma-kulubu ve /beyoglu-ingilizce-konusma-kulubu |

Yaş sınırları hedefleme değil, dil tercihi. Youth programında gerçek gruplar 8–14
ve 15–17 (`data.ts`); 8–10 ve 11–14 ayrımı yalnızca velinin arama diline göre
(ilkokul / ortaokul). İkisi de aynı sayfaya iniyor, aynı gruba kaydoluyor.

Yetişkin tarafında 18–25 ve 26–40 konuşma kulübü sayfasına iniyor, çünkü bu iki
kitle "drama" değil "konuşma pratiği" diye arıyor. 40 üstü drama sayfasına iniyor,
çünkü o kitle programın ne olduğunu okumak istiyor, aceleyle karar vermiyor.

Path alanları: ilkokul / ortaokul / lise / konusma / ogrenci / calisan /
yetiskin-40 / konusma-kulubu. Reklam metnindeki "Kadıköy Pzt 20:00" ve "Pera Cmt
15:00" `data.ts`'teki EDL saatleri; değişirse metin de değişir.

---

## Kararlar ve çelişkiler

**1. "ücretsiz" kelimesi kullanılmadı.** 17 Ekim planı "ücretsiz"i üç kampanyada
negatif ilan ediyor. Konusma-Kulubu-Fetih grubuna "ücretsiz ingilizce konuşma kulübü"
yazmak bu negatifle çelişirdi; kelime yazılmadı. Çelişkiyi çözmek Yağız'ın kararı:
ya negatif kalkar ve bu arama tanışma günü sayfasına yönlenir (düşük niyetli tıklama
riski), ya da bugünkü gibi kalır. Bu dosya ikinci durumu varsayıyor. "Ücretsiz"
yalnız açıklama metinlerinde ve yalnız "tanışma günü ücretsiz" bağlamında geçiyor.

**2. "üniversite" negatifi Yetiskin-18-25-Universite grubunu engelliyor.** Mevcut
68 negatifte `"üniversite"` ve `"lisans"` var (konservatuvar taban puanı arayanlar
için). Aynı negatif "üniversite öğrencisi ingilizce konuşma" gibi üç kelimeyi de
susturur. Öneri: TL-Yetiskin-Ingilizce-Drama kampanyasından `"üniversite"` negatifi
kaldır; yerine negatif-ek dosyasındaki `"üniversite taban puan"`, `"tiyatro bölümü"`,
`"konservatuvar hazırlık"` üçlüsü aynı işi daha dar yapıyor. Youth kampanyasında
negatif olduğu gibi kalıyor; 15–17 grubuna "üniversite" geçen kelime yazılmadı
("lise son sınıf ingilizce konuşma" kullanıldı).

**3. "LGS değil konuşma" kelime olarak yazılmadı.** Kimse arama kutusuna bunu
yazmıyor. Niyet iki yoldan karşılanıyor: `lgs`, `yks`, `tyt`, `ayt` negatife girdi;
11–14 metinlerinde "Sınav Değil, Konuşma" başlığı var.

**4. IELTS.** "ielts speaking pratiği lise" tek IELTS kelimesi, Phrase. Sınav hazırlığı
değiliz; `"ielts kursu"` ve `"ielts hazırlık"` negatife girdi, bu ikisi o kelimeyi
engellemiyor (farklı sözcük dizisi). Arama terimleri raporunda IELTS kurs arayan
gelirse kelime tamamen kaldırılır.

**5. Kadıköy konuşma kulübü kelimesi mükerrer olurdu.** Mevcut Kadikoy grubunda
`"kadıköy ingilizce konuşma kulübü"` (Phrase) ve Konusma-Pratigi grubunda
`"speaking club kadıköy"` zaten var; Exact eşleme sözcük sırasını da yakaladığı için
"ingilizce konuşma kulübü kadıköy" yazılmadı. Kadıköy için
`[kadıköy english conversation club]`, `[kadıköy ingilizce pratik grubu]`,
`"speaking club üsküdar"`, `"ingilizce sohbet grubu kadıköy"`,
`"ingilizce konuşma kulübü ataşehir"` eklendi, hepsi /kadikoy-ingilizce-konusma-kulubu.
Dikkat: o mevcut Kadikoy kelimesi drama sayfasına iniyor; konuşma kulübü sayfası
açıldığına göre onu /kadikoy-ingilizce-konusma-kulubu'ne taşımak mantıklı.

**6. "Kurs" ve "ders" kelimelerde var, metinde yok.** 17 Ekim planındaki kural aynı.
Metin dosyası betikle denetlendi: "ders" sıfır, em dash sıfır, fiyat ve telefon sıfır,
eğitmen adı sıfır.

---

## Ek negatifler (42, iki kampanyaya da)

Sınav: ielts kursu · ielts hazırlık · toefl · yds · yökdil · kpds · lgs · yks · tyt ·
ayt · bursluluk sınavı. Gramer ve kaynak: gramer · grammar · dilbilgisi · kitap ·
e-kitap · test · quiz · çeviri · sözlük · kelime ezber · ödev · çalışma kağıdı.
Birebir: özel ders · özel öğretmen · öğretmen arıyorum. Seviye: sıfırdan ingilizce ·
a1 seviye · a2 seviye · başlangıç seviyesi (B1 altı gelmesin). Uygulama ve rakip
tür: duolingo · cambly · preply · yurt dışı dil okulu · au pair. Küçük yaş: kreş ·
bebek · 1 yaş · 2 yaş. "Üniversite" yerine: üniversite taban puan · tiyatro bölümü ·
konservatuvar hazırlık.

Zaten listede olduğu için tekrarlanmayanlar: online, uzaktan, pdf, anaokulu, okul
öncesi, 3–7 yaş. Bilerek eklenmeyenler: "yaz okulu", "yaz kampı" (ileride ürün
olabilir), "sınav" (kendi "sınav değil" kelimelerimizi engellerdi).

---

## Kurulum sırası

1. Negatif-ek dosyasını iki kampanyaya ekle. TL-Yetiskin'den `"üniversite"` negatifini
   kaldır (yukarıdaki 2. karar).
2. Kelime dosyasını Editor ile içe aktar; gruplar kampanyaların içine kendiliğinden
   açılır.
3. Metin dosyasından her gruba kendi başlık ve açıklamalarını gir, Path alanını da.
4. Konusma-Kulubu-Fetih grubunda kelime bazlı Final URL var (semt varyantları);
   Editor bunu okur, panelde elle giriyorsan kelimenin URL'sine bak.
5. TL-Muzikal: duraklat, silme. Geçmiş veri kalsın.
6. Bütçe: yeni gruplar mevcut kampanya bütçesini paylaşır, ayrı bütçe gerekmiyor.
   Veli-Sorun ve Calisan grupları en düşük maliyetli tıklamayı getirmesi beklenen
   gruplar; ilk hafta gösterim almayan grup varsa sorun kelime değil, teklif.

## Yedi gün sonra bakılacaklar

| Soru | Nerede |
|---|---|
| Üniversite grubu gösterim alıyor mu | Alamıyorsa negatif kaldırılmamış demektir |
| IELTS kelimesi ne getirdi | Arama terimleri raporu; kurs arayan geliyorsa kelime kalkar |
| Sorun dili (Veli-Sorun) tıklanıyor mu | Tıklama var form yoksa açılış sayfasının ilk ekranı o dile cevap vermiyor demektir |
| Fetih grubu hangi semtten | Semt varyantı tıklanıyorsa o sayfaya metin eklenir |
