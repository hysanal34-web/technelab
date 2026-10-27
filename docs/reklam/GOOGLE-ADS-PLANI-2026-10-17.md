# Google Ads kurulumu: yetişkin, youth, müzikal — 17 Ekim 2026

Üç cephe, 13 reklam grubu, 132 anahtar kelime, 68 negatif kelime.
Yanındaki iki CSV panele aktarılmak için hazır.

**Bütçeye dokunulmadı.** Rakamları sen giriyorsun.

> **Güncelleme 26 Ekim 2026:** TL-Muzikal duraklatıldı, SEO ile yürüyor. Yaş gruplarına göre
> yeni reklam grupları için bkz. `GOOGLE-ADS-YAS-GRUPLARI-2026-10-26.md`.

Bu plan hesabın kendi verisiyle değil, sitenin SEO araştırmasıyla kuruldu
(`src/lib/disiplinler.ts` içindeki kelime listeleri). Arama terimleri raporunu
verdiğinde kelimeler gerçek veriyle budanacak, o zamana kadar bu bir başlangıç
seti.

---

## Yapı

| Kampanya | Reklam grubu | Açılış sayfası |
|---|---|---|
| **TL-Yetiskin-Ingilizce-Drama** | EDL-Genel | /yetiskinler-icin-ingilizce-drama-istanbul |
| | Konusma-Pratigi | /ingilizce-konusma-kulubu-istanbul |
| | Kadikoy | /kadikoy-ingilizce-drama-kursu |
| | Beyoglu-Pera-Taksim | /beyoglu-ingilizce-drama-kursu |
| | Ingilizce-Oyunculuk | /ingilizce-oyunculuk-istanbul |
| **TL-Youth-8-17** | Youth-Genel | /cocuklar-icin-ingilizce-drama-istanbul |
| | Youth-Kadikoy | /kadikoy-ingilizce-drama-kursu |
| | Youth-Taksim-Pera | /beyoglu-ingilizce-drama-kursu |
| | Youth-Yas-Bazli | /gencler-icin-ingilizce-drama-istanbul |
| **TL-Muzikal** | Muzikal-Genel | /muzikal-tiyatro-kursu-istanbul |
| | Muzikal-Kadikoy | /kadikoy-muzikal-tiyatro-kursu |
| | San-Dans | /muzikal-tiyatro-kursu-istanbul |
| | Broadway-Dans | /atolyeler/broadway-musical-dance |

Her grubun açılış sayfası kendi konusuna ait. Bu önemli: hepsini ana sayfaya
yollarsan kalite puanı düşer, tıklama pahalanır.

---

## Üç karar ve gerekçesi

**1. Youth iki yakaya ayrı grup.** Kadıköy ve Taksim ayrı reklam grubu, ayrı
metin, ayrı açılış sayfası. Sebebi sadece hedefleme değil: Kadıköy'de şu ana
kadar sıfır kayıt var, ayrı grup olmazsa hangi yakanın çalıştığını yine
göremezsin. Metinlerde gün de farklı yazıyor, Kadıköy cumartesi, Pera pazar.

**2. Yetişkin tarafında "konuşma pratiği" ayrı grup.** Çünkü iki farklı insan
arıyor: biri "ingilizce drama kursu" diye arıyor (bizi zaten biliyor gibi),
diğeri "ingilizce anlıyorum ama konuşamıyorum" diye arıyor (derdi var, çözüm
adını bilmiyor). İkincisi daha büyük bir kitle ve daha ucuz. Metni de ona göre:
"Konuşma kulübünde sıra bekliyorsun. Sahnede cevap vermek zorundasın, fark bu."

**3. Müzikalde şan ayrı grup.** "Şan kursu istanbul" arayan kişi müzikal
aramıyor ama müzikale yazılabilecek kişi. Ayrı grupla o aramayı yakalıyoruz,
metin de onun diliyle konuşuyor.

---

## Negatif kelimeler (68 adet, 8 grup)

En kritikleri:

- **ücretsiz, bedava, ucuz, burslu.** 60 bin TL'lik programa bedava arayan
  gelmiyor. Tanışma günü ücretsiz ama onu arayan kişiyi reklamla almıyoruz.
- **bilet, oyun bileti, nerede izlenir.** "Tiyatro" arayanların büyük kısmı
  seyirci, öğrenci değil. Bu, tiyatro reklamlarında paranın en çok yandığı yer.
- **iş ilanı, oyuncu alımı, figüran, kadro.** İş arayan tıklıyor, kaydolmuyor.
- **online, uzaktan.** Bizim programlar stüdyoda.
- **anaokulu, 3 4 5 6 7 yaş.** Youth 8'den başlıyor, küçük yaş velisi tıklayıp
  geri dönüyor.
- **ankara, izmir, bursa.** Hedefleme İstanbul olsa bile arama metninde şehir
  geçince gösterim olabiliyor.

---

## Reklam metinleri

Her gruba 15 başlık ve 4 açıklama yazıldı, hepsi Google'ın karakter sınırına
sığıyor (başlık 30, açıklama 90). Betik sınırı aşan satırda hata veriyor, yani
panele yapıştırırken kesilme olmaz.

Dil kuralları uygulandı: **"ders" kelimesi yok, em dash yok, eğitmen adı yok,
telefon yok, fiyat yok.** "Ücretsiz" yalnız açıklama cümlesinin içinde geçiyor,
hiçbir başlıkta bağırmıyor.

Anahtar kelime listesinde "kurs" ve "ders" var, orası bilinçli: o bizim
sesimiz değil, kullanıcının arama kutusuna yazdığı şey. Kelimeyi kullanmazsak
reklam hiç çıkmıyor.

### Uzantılar (üç kampanyada da aynı)

Sitelink: Tanışma Günü · Tüm Programlar · Hangi Atölye Sana Uygun · Ekibimiz
Callout: Tanışma günü var · En fazla 12 kişi · Kadıköy ve Pera · Seviye sınavı
yok · Final gösterisi · Deneyim gerekmiyor · Haftada bir gün · Taksit seçenekleri

---

## Dosyalar nasıl kullanılır

`google-ads-kelimeler.csv` ve `google-ads-metinler.csv` aynı klasörde.

Google Ads Editor ile: Account → Import → From file. Sütun eşlemesini Editor
soruyor, başlıklar zaten İngilizce isimlendirildi (Campaign, Ad Group, Keyword,
Match Type, Final URL).

Editor kullanmıyorsan panelde elle: kelime CSV'si zaten kampanya ve grup bazlı
sıralı, kopyala yapıştır gidiyor.

---

## Kurulum sırası

1. Üç kampanyayı oluştur, ağ olarak **yalnız Arama** seç. Display Network'ü
   kapat, Türkiye dışını kapat. (Eylül'de yabancı bot trafiği sorunu buradan
   gelmiş olabilir.)
2. Reklam gruplarını ve kelimeleri aktar.
3. Negatif kelimeleri kampanya seviyesinde ekle, üçüne de.
4. Metinleri ekle, her gruba kendi açılış sayfasını ver.
5. Uzantıları hesap seviyesinde bir kez tanımla.
6. Bütçeleri sen gir.

**Yayına almadan önce:** Google Ads'de `Kayıt Oldu` ve `Tanışma Günü Kaydı`
dönüşümlerini aç, `NEXT_PUBLIC_ADS_LABEL_TANISMA` değişkenini Vercel'e ekle.
Bu yapılmadan tanışma kayıtları başvuru etiketine yazılıyor, iki kampanyayı
karşılaştıramıyorsun. Bu kurulumun tek gerçek ön şartı bu.

---

## Yedi gün sonra bakılacaklar

| Soru | Nereye bakılır | Ne yapılır |
|---|---|---|
| Hangi aramalar geldi | Arama terimleri raporu | Alakasızları negatife ekle |
| Youth Kadıköy gösterim alıyor mu | Reklam grubu, gösterim sütunu | Sıfırsa sorun kelime değil, teklif ya da hacim |
| Tıklanıp forma gelen var mı | /admin/olcum, FormStart | Tıklama var form yoksa açılış sayfası sorunu |
| Hangi grup pahalı | Dönüşüm başına maliyet | Müzikal pahalı olsa bile kârlı, Broadway öyle değil |

Arama terimleri raporunu indirip bana ver, kelimeleri gerçek veriyle budayayım.
