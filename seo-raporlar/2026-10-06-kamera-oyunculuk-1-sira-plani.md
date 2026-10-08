# "Kamera önü oyunculuk" ve "oyunculuk kursu" için 1. sıra planı · 6 Ekim 2026

Hedef sorgular: `kamera önü oyunculuk kursu istanbul` (şu an 16. sıra, 1. atolyecraft.com blog yazısı), `oyunculuk kursu istanbul` (ilk 20'de yok, 1. atolyecraft.com ana sayfa).

## Bugün yapılan (kodda, commit edilmedi)

- `src/lib/disiplinler.ts`: `Discipline` tipine `facts` alanı eklendi; `oyunculuk-kursu-istanbul` ve `kamera-onu-oyunculuk-istanbul` sayfalarına kaynaklı veri bölümü yazıldı.
- `src/components/DisciplinePage.tsx`: "Kaynaklı veri" bölümü eklendi (etiket, değer, kaynak bağlantısı; her satırda kaynak adı ve tarihi).
- Oyunculuk sayfası: 2024 dizi-film ihracatı (602 milyon dolar), dizi ihracatı (500 milyon dolar üzeri), Ağustos 2026 yetkili beyanı (1 milyar dolar), bölüm başı fiyat aralığı, MEB izin yazısı. Kaynaklar birbirini tutmadığı için notta açıkça belirtildi.
- Kamera sayfası: SAG-AFTRA, Backstage ve Equity/CDG self-tape standartları, göz hattı, süreklilik, Camera Praxis'in kendi sayısal bilgisi. Kaynakların ayrıştığı slate konusu işaretlendi.
- Tip kontrolü (`tsc --noEmit`) temiz. Tarayıcıda görsel kontrol yapılmadı.
- Doğrulanamayan her şey dışarıda bırakıldı: Türkiye casting platformlarının self-tape standardı, RTÜK dizi sayısı, YÖK kontenjanı bulunamadı.

## Rakip fotoğrafı (kendi sitelerinde yazan, 6 Ekim 2026)

| Site | Süre | Kontenjan | Güven işaretleri | Not |
|---|---|---|---|---|
| atolyecraft.com | 4 aylık kur, 256+ saat | en çok 16 | 3 eğitmen adı, 4 mezun yorumu, 9 soruluk SSS | ~2.500 kelime, fiyat yok |
| sinemaakademi.com.tr | 96 saat (16 hafta) | 12 | "12.800+ mezun", "%98 memnuniyet" iddiaları, 5 yorum, MEB sertifika | ~8.000 kelime, eğitmen adı yok |
| oyunculuk.com.tr | 96 saat | yazmıyor | MEB sertifika | |

Bizim avantajımız: eğitmen adı açık, kontenjan 10, kaynaklı içerik. Eksiğimiz: yorum, mezun/çıktı kanıtı, tarih (Camera Praxis kayıt kapalı), sayfa içi video.

## 1. sıraya giden yol

1. **Camera Praxis tarihi (en önemlisi).** Kayıt kapalı olduğu için sayfa "bekleme listesi" sayfası görünümünde. Tarih verdiğin an: `src/lib/data.ts` içinde `active: true` ve `scheduleNote`; `/kamera-onu-oyunculuk-istanbul` giriş paragrafını "kayıt alıyor" olarak güncelle. Google güncel tarihli, kayıt alan program sayfasını daha çok ödüllendirir. Fiyat gizli politikası aynen kalır.
2. **Ders programı derinliği.** 4 hafta için seans seans plan (her seans ne çekilecek, kaç dakika kamera, hangi metin). Selen Uçer'den gerçek planı al; ben yazarsam uydurma olur. Rakipler 96 ve 256 saat yazıyor; biz toplam saat ve kamera başı süreyi açıkça yazalım.
3. **Gerçek kanıt:** (a) Selen Uçer'in ekran/set deneyimini doğrulanabilir bir listeyle (proje adı, yıl) ekip sayfasına koy; (b) English Acting Praxis'ten izinli katılımcı yorumu ve çekim günü kareleri; (c) 30 saniyelik örnek self-tape (izinle) ve sayfaya `VideoObject`.
4. **Blog yazısı rakibi geç.** atolyecraft'ın 1. sırada tuttuğu yazı kaynaksız ve yazarsız (~1.800 kelime). Bizim `kamera-onunde-oyunculuk.mdx` (877 kelime) ve `self-tape-nasil-cekilir.mdx` (1.133 kelime) var. İkisi birleştirilip ~2.000+ kelimeye çıkarılabilir; yeni bölümler: çekim ölçekleri tablosu, Türkiye'de casting ilanı okuma, "ilk self-tape kontrol listesi". Yeni veri eklemeden önce kaynaklar açılıp okunmalı.
5. **İç link:** makalelerdeki `ArticleCTA` zaten kamera yazılarını `/kamera-onu-oyunculuk-istanbul` sayfasına yönlendiriyor. Ana sayfadaki "KAMERA ÖNÜ" bağlantısı var. Eksik: ekip sayfasından (Selen Uçer) ve `/atolyeler/camera-praxis` sayfasından disiplin sayfasına karşılıklı bağlantı kontrolü.
6. **Panel işleri (Yağız):** Search Console'da `/kamera-onu-oyunculuk-istanbul` ve `/oyunculuk-kursu-istanbul` için "dizine eklenmesini iste"; Google İşletme Profili; partner mekânlardan (Pod Pera) sayfaya bağlantı.

## Gerçekçi beklenti

"oyunculuk kursu istanbul" yüksek rekabetli, 1. sıra atolyecraft ve sinemaakademi gibi eski, çok sayfalı sitelerde. Bu sorguda 1. sıra için aylar gerekir; asıl kısa vadeli fırsat "kamera önü oyunculuk kursu istanbul" (16. sıradan ilk 10'a). Sıralama sözü veremem; haftalık takipte ölçeceğiz.

## Açık sorular (Yağız)

- Camera Praxis tarihi ve Selen Uçer'in paylaşmak istediği referanslar.
- Rakip adlarını sitede kullanmadım (karşılaştırma tablosu yalnızca bu raporda).
