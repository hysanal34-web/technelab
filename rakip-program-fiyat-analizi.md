# Techne Lab İstanbul — Program Düzeyinde Rakip & Fiyat Analizi

**Tarih:** 24 Ağustos 2026
**Kapsam:** Kurum değil, **program** düzeyinde. Her programımızın İstanbul'daki muadili kim, ne fiyata, hangi formatta.
**Kaynak:** Web araması + rakip site içerikleri. Ahrefs/Similarweb kullanılmadı — **arama hacmi rakamı verilmemiştir.**

---

## ⚠️ Metodoloji Uyarısı — Önce Bunu Oku

Bu raporda üç tür bilgi var, karıştırma:

| İşaret | Anlamı |
|---|---|
| **✅ Doğrulandı** | Rakibin kendi sitesinde/ilanında açıkça yayınlanmış |
| **⚠️ Kısmi** | İkincil kaynakta (kurs.com, Fırsat Bu Fırsat, blog) geçiyor, rakibin kendi sitesinde teyit edilemedi |
| **❌ Bulunamadı** | Fiyat/format açıklanmamış. **Tahmin yazılmadı.** |

**Sektörün en net bulgusu:** İstanbul tiyatro/oyunculuk eğitimi pazarında **fiyat neredeyse hiçbir yerde yayınlanmıyor.** Craft Atölye, BKM Mutfak Atölye, GalataPerform, Sinema Akademi, İstanbul Drama Sanat Akademisi, İstanbul Tiyatrosu — hepsi "başvuru formu doldurun / bizi arayın" diyor. Fiyat yayınlayanlar yalnızca ikinci ligdeki MEB'li kurslar (kurs.com, Fırsat Bu Fırsat üzerinden) ve İstanbul Film Akademi.

Bu, Techne Lab için hem fırsat hem risk — aşağıda "Stratejik Sonuç"ta ele alınıyor.

---

## Kendi Programlarımız — Referans Tablo

`src/lib/data.ts` verisinden. Haftalık/aylık maliyet tarafımızca hesaplandı.

| # | Program | Süre | Kontenjan | Liste | Erken Kayıt | Hesaplanan birim |
|---|---|---|---|---|---|---|
| 01 | The Auteur Lab | 8 hafta (modül) | 10 | 18.000₺ | 15.300₺ | ~2.250₺/hafta |
| 02 | Oyuncunun Mevcudiyeti | 4 hafta yoğun | 12 | 19.000₺ | 16.000₺ | ~4.750₺/hafta |
| 03 | English Drama Lab | 12 hafta | 12 | 30.000₺ | 25.500₺ | ~2.500₺/hafta · 12.000₺/ay |
| 04 | English Acting Praxis | 12 hafta | 14 | 69.000₺ | 59.000₺ | ~5.750₺/hafta |
| 05 | English Drama Youth (10–17) | 8 ay · haftada 1 | 12 | 150.000₺ | 128.000₺ | ~18.750₺/ay |
| 06 | Techne Musical Lab | 8 ay · haftada 2 | 12 | 195.000₺ | 165.000₺ | ~24.375₺/ay |
| 07 | Broadway Musical Dance | 12 hafta | 15 | 22.500₺ | 19.000₺ | ~1.875₺/hafta · 8.000₺/ay |
| 08 | Camera Praxis | 4 hafta | 10 | 23.500₺ | 20.000₺ | ~5.875₺/hafta |

> **Not 1 — Eksik program:** Görev listesinde geçen **"Dans Tiyatrosu"** programı `data.ts` içinde **yok.** Bu rapor onu *planlanan/potansiyel* program olarak ele alıyor (Bölüm 3).
>
> **Not 2 — Veri tutarsızlığı:** Hafızadaki ticari karar *"fiyat sitede GİZLİ"* diyor, ancak `data.ts` tüm fiyatları içeriyor. Rakip analizi açısından bu kritik: aşağıda "Stratejik Sonuç"a bak.

---

## Pazar Fiyat Çıpaları (Doğrulanan Rakamlar)

Karşılaştırma yapabilmek için bulunabilen **tüm** açık fiyatlar:

| Kurum / Program | Format | Fiyat | Birim | Durum |
|---|---|---|---|---|
| İngilizce Drama Yaz Atölyesi (Jale Güney Sun) — **çocuk** | 10 hafta / 20 saat, 8–12 yaş | **20.000₺** | 1.000₺/saat | ⚠️ Kısmi (Fırsat Bu Fırsat) |
| İstanbul Film Akademi — Oyunculuk | 12 ay, haftada 2×3 saat | **110.200₺ + KDV** (öğrenci 99.200₺+KDV) | ~11.000₺/ay (KDV dahil) | ⚠️ Kısmi |
| Acar Sanat Akademi — Tiyatro | 4 hafta / 8 saat | 4.750₺ | 594₺/saat | ⚠️ Kısmi (kurs.com) |
| Özel Mavi Düşler — Tiyatro (MEB) | 1 ay / 8 saat | 5.400₺ | 675₺/saat | ⚠️ Kısmi |
| ERC Atölye Şişli — Tiyatro | 1 ay / 20 saat | 1.200₺ (ind.) | 60₺/saat | ⚠️ Kısmi — dampingli |
| Nefes Sanat Merkezi — Drama/Diksiyon/Kamera | paket, süre belirsiz | 1.999₺ | — | ⚠️ Kısmi |
| Craft Atölye, BKM Mutfak, GalataPerform, Sinema Akademi, İDSA, İstanbul Tiyatrosu | — | **fiyat gizli** | — | ❌ |
| İBB Enstitü (İSMEK) — Drama, Uygulamalı Tiyatro, Kamera Oyunculuğu | 120–256 saat | **ücretsiz** (sınav/mülakatla) | 0₺ | ✅ |

**Pazarın şekli:** Uçlar arasında 100 kata varan fark var. Altta ücretsiz belediye kursları ve 60₺/saat dampingli MEB kursları; ortada 600–1.000₺/saat MEB'li özel kurslar; üstte fiyat açıklamayan butik atölyeler (Craft, BKM, GalataPerform) ve 110.000₺'lik uzun dönem akademiler. Techne Lab **üst segmentte** konumlanıyor ve doğru yerde — ama bunu **anlatmak** zorunda, çünkü fiyatı görünür.

---

# BÖLÜM 1 — PROGRAM PROGRAM ANALİZ

---

## 01 · BROADWAY MUSICAL DANCE

**Bizim:** 12 hafta, Kadıköy, 15 kişi, 22.500₺ (erken 19.000₺), aylık 8.000₺ seçeneği, Köksal Ünal.

### Rakipler

| Kurum | Program | Fiyat | Format | Kitle | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [Dans Akademi](https://dansakademi.com.tr/street-jazz-kursu) | Street Jazz ("Broadway'in ruhu") | ❌ Gizli (fiyat sayfası var, rakam yok) | Belirtilmemiş | Yetişkin | Çok şubeli | Broadway'i **slogan** olarak kullanıyor, müfredat street jazz. Theatre dance / repertuar yok |
| [Danstüdyo](http://www.danstudyo.com/jazz-dans-kursu/) | Jazz / Street Jazz | ❌ | Belirtilmemiş | Yetişkin | İstanbul | Sayfa çok zayıf içerikli, blog yok, koreografi/repertuar anlatısı yok |
| [Mavidans](https://mavidans.com/dans-kurslari/) | Klasik bale + Street Jazz + Modern | ❌ | Belirtilmemiş | Yetişkin | Şişli | Genel dans okulu; müzikal/sahne bağlamı hiç yok |
| [Cadde Sanat](https://www.caddesanat.com/dans-kursu) | Modern, Bale, Hip Hop, High Heels, Jazz | ❌ | Belirtilmemiş | Yetişkin | İstanbul | Menü mantığı — hiçbir dalda derinlik iddiası yok |
| [Swing İstanbul](https://swingistanbul.com/) | Lindy Hop, Solo Jazz, Balboa | ❌ | Deneme dersi var | Yetişkin | Beyoğlu & Kadıköy | Farklı jazz kolu (otantik caz dansı) — **doğrudan rakip değil**, ama "jazz dans İstanbul" aramasını çalıyor |

### Değerlendirme
- **Gerçek muadil yok.** İstanbul'da "Broadway musical dance / theatre dance" başlığıyla ders veren bulunamadı. En yakını "street jazz" — ki bu **ticari/video klip jazz'ı**, sahne müzikali jazz'ı değil.
- **Fiyat konumu:** Aylık 8.000₺ seçeneğimiz, İstanbul dans okulu ortalamasının **üstünde** ama fiyat gizli olduğu için tam kıyas yapılamıyor. Butik/eğitmen odaklı konumlandırma bunu taşır.
- **Rakip zayıflığı (SEO):** Hiçbiri Broadway repertuarını, koreografi anatomisini veya "dans deneyimi olmayan yetişkin" endişesini içerikle karşılamıyor. Blog yok, program sayfaları 200 kelimenin altında.

---

## 02 · TECHNE MUSICAL LAB

**Bizim:** 8 ay, haftada 2 gün, Kadıköy, 12 kişi, 195.000₺ (erken 165.000₺), video ile kabul, seyircili tam prodüksiyon finali. Köksal Ünal & Sitare Bilge.

### Rakipler

| Kurum | Program | Fiyat | Format | Kitle | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [Sinema Akademi](https://sinemaakademi.com.tr/muzikal-oyunculuk-kursu) — Müzikal Oyunculuk | Şan + dans + oyunculuk | ❌ Gizli ("seviyenize göre plan") | **16 hafta / 64 saat**, haftada 4 saat ✅ | Yetişkin | 6 şube (Taksim, Şişli, Beyoğlu…) | Kurs mantığı — **sahnelenmiş prodüksiyon finali yok.** Kontenjan belirtilmiyor. Kurumsal/ölçekli, butik değil |
| [BKM Mutfak Atölye](https://atolye.bkmmutfak.com/yetiskin-atolyeleri/) — Yetişkin Tiyatro | Beden, ses, doğaçlama + **şan ve dans**, yıl sonu gösterisi ✅ | ❌ Gizli | 3 yıl kademeli | Yetişkin | Beyoğlu | Müzikal odaklı değil — şan/dans temel tiyatronun içinde. Marka güçlü ama program sayfası içerik olarak zayıf |
| [Dormen Akademi](https://dormenakademi.com/) | Yaratıcı drama → oyunculuk → müzikal → kamera | ❌ Gizli | Yaş gruplu | Ağırlıklı **çocuk/genç** | İstanbul | Yetişkin müzikal hattı belirsiz. Marka mirası büyük, dijital varlık zayıf |
| [Metot Sanat Akademi](https://www.metotsanatakademi.com/) | Tiyatro, müzik, dans, drama | ❌ | Belirtilmemiş | Çocuk/genç/yetişkin | İstanbul | Her şeyi yapan kurum profili — müzikal uzmanlığı iddiası yok |
| İstanbul Üniversitesi Devlet Konservatuvarı — Müzikal Tiyatro | Lisans programı | Devlet | 4 yıl, sınavla | 18+ öğrenci | Fatih | **Rakip değil, tedarikçi.** Kariyer hattı — bizim programımız ona alternatif değil, ön/yan basamak |

### Değerlendirme
- **En yakın rakip: Sinema Akademi.** Ama fark yapısal: onlar **16 hafta kurs**, biz **8 ay + tam prodüksiyon**. Farklı ürün.
- **Fiyat konumu:** 195.000₺ İstanbul'daki en pahalı yetişkin sahne sanatları programlarından biri. Doğrulanabilir tek uzun dönem çıpası İstanbul Film Akademi'nin 12 aylık ~132.000₺ (KDV dahil) oyunculuk programı. Biz 8 ayda 195.000₺ istiyoruz → **ay başına yaklaşık 2,2 kat pahalı.**
- **Bunu taşıyan tek şey:** haftada 2 gün, 12 kişi, üç disiplin (şan+dans+oyunculuk), kostüm/ışık/dekorlu prodüksiyon ve video ile seçme. **Bu dördü program sayfasında fiyatın hemen yanında olmalı.** Şu an fiyat gerekçelendirilmeden duruyor.

---

## 03 · DANS TİYATROSU (Çağdaş Dans / Physical Theatre)

> ⚠️ **Bu program şu an `data.ts` içinde yok.** Aşağısı, açılması hâlinde girilecek pazarın haritası.

### Rakipler

| Kurum | Program | Fiyat | Format | Kitle | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [İstanbul Drama Sanat Akademisi](https://www.istanbuldrama.com.tr/dans-tiyatrosu/) — **Dans Tiyatrosu** | Çağdaş dans + çağdaş tiyatro; beden, ses, söz, ritim, oyun ✅ | ❌ Gizli | Belirtilmemiş | **Genç ve yetişkin** ✅ | Yeşilköy, Suadiye, Bizimtepe | **En yakın doğrudan rakip.** Tamer Levent sanat yönetiminde, 2011'den beri. Ancak sayfa kısa, süre/kontenjan/fiyat hiçbiri yok |
| [Tiyatrohane](https://tiyatrohane.com/deneme-topluluklari/yetiskin-fiziksel-tiyatro-deneme-toplulugu) — Yetişkin Fiziksel Tiyatro | Kondisyon, esneklik, ritim, karakter analizi, koreografi ✅ | ❌ | **Ön koşullu**: önce oyunculuk atölyesi veya dans temeli ✅ | Yetişkin | İstanbul | Ön koşul filtresi talebi daraltıyor — bizim için giriş boşluğu |
| [tiyatrolar.com.tr](https://tiyatrolar.com.tr/atolye/cagdas-dans-ve-dogaclama-atolyesi) — Çağdaş Dans ve Doğaçlama | Doğaçlama, ağırlık aktarımı, floor work ✅ | ❌ | Belirtilmemiş | Yetişkin | İstanbul | Duyuru platformu — kurumsal derinlik yok, tek seferlik atölye mantığı |
| [Arter](https://mobilet.com/tr/event/yetiskin-atolyesi-tap-dans-ile-ritim-31949/) — Tap Dans ile Ritim | Yetişkin atölyesi | Mobilet üzerinden biletli | Tek seferlik | Yetişkin | Dolapdere | Süreklilik yok — müze programı |
| [İstanbul Martı Dans Tiyatrosu](https://istanbulmartidanstiyatrosu.com/tarihce/) | Dans tiyatrosu topluluğu | — | Topluluk | — | İstanbul | **Rakip değil, topluluk.** Ama "dans tiyatrosu" kelimesinin Google'daki sahibi — SEO'da karşımıza çıkar |

### Değerlendirme
- Bu **en dolu kategori.** İDSA ve Tiyatrohane yerleşik, kurumsal ve yıllardır burada.
- **Öneri: bu programı açmadan önce iki kez düşün.** Diğer 8 programın hiçbiriyle bu kadar kalabalık bir alanda karşılaşmıyoruz. Açılacaksa, ayrıştırıcı Techne Lab kancası (dramaturji temelli fiziksel tiyatro, metin+beden) çok net olmalı — yoksa İDSA'nın gölgesinde kalır.

---

## 04 · ENGLISH DRAMA LAB — YETİŞKİN (⭐ Kritik Program)

**Bizim:** 12 hafta, Pera & Kadıköy, 12 kişi, 30.000₺ (erken 25.500₺), 3 taksit / aylık 12.000₺. **Yetişkin.**

### Rakipler — Yaşa Göre Ayrıştırılmış

#### A) YETİŞKİNE İngilizce drama verenler

| Kurum | Program | Fiyat | Format | Seviye | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [ingilizcedrama.com](https://ingilizcedrama.com/) | Yaratıcı drama ile İngilizce | ❌ Gizli | Belirtilmemiş | **Çocuk VE yetişkin — A1/A2** ✅ **DOĞRULANDI** | İstanbul geneli, anlaşmalı kurs merkezleri | **Dil okulu mantığı**, tiyatro kurumu değil. Sabit mekân yok. Seviye tabanı A1/A2 — **başlangıç** |
| [The Clap Improv Istanbul](https://www.facebook.com/TheClapImprovIstanbul/) | İngilizce doğaçlama komedi | **Ücretsiz** ✅ | Düzenli buluşma + gösteri | İleri (akıcı İngilizce) | Kadıköy + Taksim | Topluluk, kurs değil. Pedagoji yok, eğitmen yok, sertifika yok. Ağırlıklı **expat** kitle |
| [Kadıköy Atölye](https://kadikoyatolye.com/atolyelerimiz/yetiskinlerle-yaratici-drama/) — Yetişkinlerle Yaratıcı Drama | Oyun, doğaçlama, canlandırma | ❌ | Belirtilmemiş | — | Kadıköy | **Türkçe.** İngilizce değil |
| [İstanbul Drama Sanat Akademisi](https://www.istanbuldrama.com.tr/yetiskinler-icin-drama-atolyesi/) | Yetişkinler için drama | ❌ | Salı 19:00–22:00, Suadiye | — | Suadiye | **Türkçe.** İngilizce değil |
| [Kadıköy Güzel Sanatlar](https://www.kadikoyguzelsanatlar.net/yetiskin-drama-kurslari) | Yetişkin tiyatro/drama | ❌ | Belirtilmemiş | — | Kadıköy | **Türkçe** |

#### B) İngilizce drama verenler — ama ÇOCUĞA

| Kurum | Yaş | Fiyat | Format |
|---|---|---|---|
| [İstanbul Tiyatrosu](https://istanbultiyatrosu.net/ingilizce-drama-atolyesi/) — İngilizce Drama Atölyesi | **8–10 ve 11–12 yaş** ✅ | ❌ Gizli (yıllık) / **20.000₺** (yaz atölyesi ⚠️) | Yıllık: 14 Eylül–14 Mayıs, haftada 2×2 saat, İngilizce oyun finali. Yaz: 10 hafta/20 saat, Cmt 12:00–14:00 |
| [ingilizcedramaatolyesi.com](https://www.ingilizcedramaatolyesi.com/en) | Çocuk | ❌ | "Çocuğunuz sahnede İngilizce konuşsun" |
| [Hisar Akademi](https://www.hisarakademi.com/ingilizce-drama/) | Çocuk | ❌ | — |
| [Çocuk Filozoflar Akademisi](https://www.cocukfilozoflar.com/tr/ingilizce-drama) | Çocuk | ❌ | — |
| [Dormen Akademi](https://dormenakademi.com/) | Çocuk/genç | ❌ | — |

### Değerlendirme
- Kurucunun temel sezgisi **doğru**: İstanbul'daki "İngilizce drama" arzının **ezici çoğunluğu çocuğa yönelik.** Yetişkin arayan biri Google'da çocuk sayfalarına düşüyor. Bu gerçek bir konumlandırma boşluğu.
- **Ama "ilk biziz" değil.** ingilizcedrama.com yetişkine A1/A2 seviyesinde açıkça hizmet veriyor. The Clap on yıldır Kadıköy ve Taksim'de yetişkinlere İngilizce doğaçlama yaptırıyor. (Detaylı hüküm → Bölüm 2.)
- **Fiyat konumu:** Doğrulanabilir tek İngilizce drama fiyatı, **çocuk** yaz atölyesinin 20.000₺ / 20 saati (1.000₺/saat). Bizim 30.000₺ / 12 hafta, 12 kişilik yetişkin grubumuz **yapısal olarak farklı bir ürün** — üç profesyonel oyuncu eğitmen, iki lokasyon, tiyatro pratiği. Fiyat savunulabilir; ama pazar bunu **dil kursu** fiyatıyla kıyaslama refleksinde. Karşılaştırma çerçevesini biz kurmalıyız.
- **Gerçek rakibimiz "İngilizce drama" değil:** İngilizce konuşma kulüpleri (Beylikdüzü Belediyesi — ücretsiz, English Spoken Cafe Kadıköy, English Speaking Club Beşiktaş). Kullanıcı "konuşma pratiği" arıyor; biz "drama" diyoruz. **Bu kelime köprüsü kurulmalı** — mevcut `seoTitle`'da "Konuşma Kulübü" ifadesinin olması doğru bir refleks.

---

## 05 · ENGLISH DRAMA YOUTH (10–17)

**Bizim:** 8 ay, haftada 1 gün, Pera & Kadıköy, 12 kişi, 150.000₺ (erken 128.000₺), seyircili final.

### Rakipler

| Kurum | Fiyat | Format | Yaş | Konum | Zayıflık |
|---|---|---|---|---|---|
| [İstanbul Tiyatrosu](https://istanbultiyatrosu.net/ingilizce-drama-atolyesi/) — İngilizce Drama | ❌ (yaz: 20.000₺/20 saat ⚠️) | **14 Eylül–14 Mayıs, haftada 2 gün × 2 saat = 4 saat/hafta**, İngilizce oyun finali ✅ | **8–12** | İstanbul | Bizim üst yaş bandımızla (13–17) **örtüşmüyor.** Site içerik olarak zayıf, eğitmen kadrosu tanıtılmıyor, kontenjan yok |
| [ingilizcedramaatolyesi.com](https://www.ingilizcedramaatolyesi.com/en) | ❌ | ❌ | Çocuk | İstanbul | Sitede program detayı yok, yalnızca vaat cümlesi |
| [Hisar Akademi](https://www.hisarakademi.com/ingilizce-drama/) | ❌ | ❌ | Çocuk | İstanbul | Okul bünyesi — dışa açık mı belirsiz |
| [Dormen Akademi](https://dormenakademi.com/) | ❌ | Yaş gruplu, drama→oyunculuk→müzikal | Çocuk/genç | İstanbul | İngilizce hattı belirsiz. Marka mirası güçlü |
| [Çocuk Filozoflar Akademisi](https://www.cocukfilozoflar.com/tr/ingilizce-drama) | ❌ | ❌ | Çocuk | İstanbul | Niş, felsefe odaklı |

### Değerlendirme
- **En kalabalık İngilizce drama kategorisi bu.** Ama kalabalığın tamamı **12 yaş altı.**
- **13–17 yaş bandı fiilen boş.** İstanbul Tiyatrosu 12'de kesiyor. Lise çağı gencine İngilizce drama + seyircili final sunan başka kurum bulunamadı.
- **Fiyat konumu — dikkat:** 150.000₺ / 8 ay = ~18.750₺/ay, haftada 1 gün için. Doğrulanabilir tek çıpa (İstanbul Tiyatrosu yaz, 20.000₺ / 20 saat) çocuk pazarının **çok altında** bir bant gösteriyor. Bu, **veli** karar veren bir pazar — veliler fiyatı özel okul ek dersi ve dil kursuyla kıyaslar. **En savunması zor fiyatımız bu.**
- Öneri: bu programın sayfasında toplam saat sayısı, eğitmen niteliği (Kadir Has Tiyatro + anadil seviyesi İngilizce) ve prodüksiyon maliyeti **ayrıştırılarak** gösterilmeli. Ayrıca "13–17 yaş" özellikle vurgulanmalı — asıl boşluk orada.

---

## 06 · AUTEUR LAB (Oyun Yazarlığı + Dramaturji)

**Bizim:** 8 hafta/modül × 3 modül, Kadıköy, 10 kişi, 18.000₺/modül (erken 15.300₺). Halil Yağız Şanal.

### Rakipler

| Kurum | Program | Fiyat | Format | Kitle | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [GalataPerform](https://galataperform.com/atolye/oyun-yazarligi-atolyesi/) — **Oyun Yazarlığı Atölyesi** | 2012'den beri, 13. dönem | ❌ Gizli | **7 ay, hibrit, haftada 2 online buluşma + İstanbul ara kampları + Ayvalık final kampı** ✅ | Yetişkin | Online + kamp | **En güçlü rakip.** Yeşim Özsoy, Ahmet Sami Özbudak, Okan Urun + Portekiz/İsveç/Norveç/Danimarka/Fransa/Romanya/Macaristan konuk yazarlar. **Zayıflığı: ağırlıklı online**, düzenli yüz yüze haftalık ritim yok |
| [GalataSanat](https://galatasanat.com/oyun-yazarligi-atolyesi/) | Oyun yazarlığı, senaryo, yaratıcı yazarlık, komedi senaryosu | ❌ | ❌ | Yetişkin | İstanbul | Kurs fabrikası — her yazarlık türünde ayrı sayfa, hiçbirinde derinlik. Ama **SEO'da agresif**, çok sayıda landing page |
| [İÜ Sürekli Eğitim](https://sfk.istanbul.edu.tr/yaratici-yazarlik-egitimi-sertifika-programi-e29.html) | Yaratıcı Yazarlık Sertifika | ❌ | Sertifika programı | Yetişkin | Beyazıt | Akademik/genel — tiyatro/dramaturji odağı yok. Ama **sertifika** cazibesi var |
| [TİDA](https://www.tida.com.tr/yaratici-yazarlik-atolyesi) | Öykü, roman, oyun, senaryo, şiir | ❌ | ❌ | Yetişkin | İstanbul | Çok geniş kapsam, uzmanlık iddiası zayıf |
| Udemy / IIENSTITU / Global Enstitü | Yaratıcı yazarlık online | **Ücretsiz–düşük** ✅ | Kayıtlı video | Herkes | Online | Kalite yok ama **arama sonuçlarında üstte** — "yaratıcı yazarlık kursu" kelimesini kirletiyorlar |
| [Superprof](https://www.superprof.com.tr/ders/senaryo-yazarligi/istanbul/) — özel ders | Senaryo yazarlığı | **227₺/saat'ten** ⚠️ | Birebir | Yetişkin | İstanbul | Bireysel öğretmen pazarı — kurumsal değil |

### Değerlendirme
- **Talep var, rekabet var.** Bu, rakipsiz olmadığımız programlardan biri. "Yaratıcı yazarlık kursu" yüksek rekabetli bir arama kümesi (ücretsiz online kurslar dahil).
- **GalataPerform'a karşı gerçek farkımız:** onlar 7 ay **hibrit/online + kamp**; biz 8 haftalık **modüler, yüz yüze, Kadıköy'de, 10 kişilik.** Modüler yapı (bir modül al, devamına sonra karar ver) **bizim en satılabilir özelliğimiz** ve şu an yeterince öne çıkarılmıyor.
- **Fiyat konumu:** 18.000₺ / 8 hafta = 2.250₺/hafta. GalataPerform fiyat açıklamadığı için doğrudan kıyas yok. Superprof'un 227₺/saat birebir fiyatı, grup atölyesi için üst sınırı hatırlatıyor. **Muhtemelen rekabetçi bandın içindeyiz** — ama doğrulanamıyor.
- **Rakip zayıflığı (SEO):** GalataPerform'un sayfası çok az içerik barındırıyor; başvuru/iletişim odaklı. "Oyun nasıl yazılır", "dramatik yapı", "karakter arkı" gibi bilgi aramalarının hiçbirini karşılamıyorlar. **Bu bizim en açık içerik boşluğumuz.**

---

## 07 · CAMERA PRAXIS (Kamera Önü Oyunculuk)

**Bizim:** 4 hafta, Pera, 10 kişi, 23.500₺ (erken 20.000₺), TR + EN metinler. Selen Uçer. *(şu an satışa kapalı)*

### Rakipler — En Kalabalık Kategori

| Kurum | Program | Fiyat | Format | Kitle | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [İstanbul Film Akademi](https://istanbulfilmakademi.com/oyunculuk-atolyesi/) | Oyunculuk | **110.200₺ + KDV** (öğr. 99.200₺+KDV) ✅ | **12 ay, haftada 2 gün × 3 saat** ✅ | Yetişkin | İstanbul | **Pazarın nadir şeffaf fiyatlısı.** Uzun/pahalı → kısa yoğun atölye arayanı kaçırıyor |
| [Craft Atölye](https://atolyecraft.com/kamera-onu-oyunculuk-atolyesi) — Bâlâ Atabek | Kamera Önü Oyunculuk | ❌ Gizli ("başvuru formu") | Craft Akademi: **2,5 yıl** | Yetişkin | Bomontiada | **En güçlü marka rakip.** Meisner + Eric Morris. Fiyat gizli, süre uzun |
| [ActedCity](https://actedcity.com/) | Method / Eric Morris / audition hazırlık | ❌ | ❌ | Yetişkin | Beyoğlu (2013'ten beri) | **New York bağlantısı** iddiası — bizim "uluslararası" kancamızla çakışıyor. Site eski görünümlü |
| [BAU Bahçeşehir Üniv.](https://bau.edu.tr/icerik/12908-kamera-onu-oyunculuk-atolyesi) | Kamera Önü Oyunculuk Atölyesi | ❌ | ❌ | Yetişkin | Beşiktaş | Üniversite markası güçlü; program sayfası ölü/statik |
| [AKM](https://akmistanbul.gov.tr/tr/etkinlik/kamera-onu-oyunculuk-atolyesi-bkyf) | Kamera Önü Oyunculuk | Muhtemelen sübvansiyonlu | Etkinlik bazlı | Yetişkin | Taksim | Süreklilik yok — kurumsal program değil |
| [İBB Enstitü (İSMEK)](https://enstitu.ibb.istanbul/portal/egitim_detay.aspx?BransCode=4661) — Kamera Oyunculuğu | Sistem ve Metot | **ÜCRETSİZ** ✅ | Film Oyunculuğuna Giriş: 120 saat | Yetişkin | İstanbul geneli | Sınav/mülakat filtresi, kontenjan dar, marka prestiji yok — ama **fiyat çıpasını sıfıra çekiyor** |
| ERC Atölye Kadıköy | Kamera önü | **1.200₺** (1 ay/16 saat) ⚠️ | 16 saat | Yetişkin | Kadıköy | Damping. Kalite iddiası yok |
| [Sadri Alışık KM](https://www.sakm.net/ankara-akademi/egitimler/223-uygulamali-kamera-oyunculugu-egitimi-meb.html) | Uygulamalı Kamera Oyunculuğu (MEB) | ❌ | ❌ | Yetişkin | — | MEB sertifikası ana satış argümanı |

### Değerlendirme
- **En kalabalık, en fiyat baskılı kategorimiz.** Ücretsiz İSMEK'ten 110.000₺ akademiye kadar uzanan bir spektrum.
- **Fiyat konumu:** 23.500₺ / 4 hafta = 5.875₺/hafta. Bu, İstanbul Film Akademi'nin haftalık maliyetinin (~2.750₺/hafta, KDV dahil) **iki katından fazla.** Kısa-yoğun atölye modeli bunu kısmen açıklıyor ama **anlatı olmadan pahalı görünür.**
- **Tek gerçek farkımız: Selen Uçer + TR/EN çift dil + self-tape/showreel çıktısı.** Çift dilli kamera önü atölyesi bulunamadı — bu ayrıştırıcı.
- **Öneri:** Program yeniden açılırken fiyat/anlatı dengesi Camera Praxis'te en dikkatli kurulmalı. "4 haftada showreel + iki dilde audition kaydı" somut çıktı vaadi öne çıkmalı.

---

## 08 · OYUNCUNUN MEVCUDİYETİ (Sahne Oyunculuğu / Presence)

**Bizim:** 4 hafta yoğun, Pera & Kadıköy, 12 kişi, 19.000₺ (erken 16.000₺). Burcu Halaçoğlu. *(şu an satışa kapalı)*

### Rakipler

| Kurum | Program | Fiyat | Format | Kitle | Konum | Zayıflık |
|---|---|---|---|---|---|---|
| [Craft Atölye](https://atolyecraft.com/) | Meisner + Eric Morris | ❌ | 2,5 yıl akademi + kısa atölyeler | Yetişkin | Bomontiada | Marka güçlü, fiyat gizli. Uzun taahhüt |
| [BKM Mutfak Atölye](https://atolye.bkmmutfak.com/yetiskin-atolyeleri/) | Beden farkındalığı, nefes, ses, doğaçlama, şan, dans + yıl sonu gösterisi ✅ | ❌ | **3 yıl kademeli** | Yetişkin | Beyoğlu | **İçerik olarak bize en yakın müfredat.** Ama 3 yıllık taahhüt — bizim 4 haftalık yoğun modelimizle taban tabana zıt |
| [İstanbul Tiyatrosu](https://istanbultiyatrosu.net/yetiskin-oyunculuk-atolyesi/) — Yetişkin Oyunculuk | Özgüven, iletişim, yaratıcı düşünme | ❌ | ❌ | Yetişkin | İstanbul | **Kişisel gelişim** çerçevesi — sanatsal değil. Farklı kitle |
| [İstanbul Drama Sanat Akademisi](https://www.istanbuldrama.com.tr/oyunculuk-atolyesi/) | Oyunculuk Atölyesi | ❌ | ❌ | Yetişkin | Yeşilköy/Suadiye/Bizimtepe | Tamer Levent sanat yönetimi — prestij var, program detayı yok |
| [Tiyatrohane](https://tiyatrohane.com/deneme-topluluklari/yetiskin-fiziksel-tiyatro-deneme-toplulugu) | Yetişkin Fiziksel Tiyatro | ❌ | Ön koşullu | Yetişkin | İstanbul | Ön koşul filtresi |
| [Leyli Sanat Derneği](https://leylisanat.org/en/basic-acting-workshop/) | Basic Acting Workshop | ❌ | Herkese açık | Yetişkin | İstanbul | Dernek — süreklilik/kalite belirsiz |
| [Kadıköy Güzel Sanatlar](https://www.kadikoyguzelsanatlar.net/yetiskin-drama-kurslari) | Yetişkin drama | ❌ | ❌ | Yetişkin | Kadıköy | Kurs mantığı |
| [İBB Enstitü](https://enstitu.ibb.istanbul/portal/egitim_detay.aspx?BransCode=1608) — Uygulamalı Tiyatro | Temel oyunculuk, tiyatro tarihi, diksiyon, doğaçlama | **ÜCRETSİZ** ✅ | 120 saat | Yetişkin | İstanbul geneli | Sınav/mülakat, dar kontenjan |
| kurs.com'daki MEB kursları | Tiyatro | **1.200₺–5.400₺** ⚠️ | 8–20 saat/ay | Yetişkin | Çekmeköy, Şişli, Kartal, Tuzla, Bahçelievler | Damping. Merkez semtlerde yok |

### Değerlendirme
- **En doymuş kategori.** Herkes "yetişkin oyunculuk" veriyor.
- **Fiyat konumu:** 19.000₺ / 4 hafta = 4.750₺/hafta. Doğrulanan MEB kursları 600–700₺/saat bandında; biz çok üstünde. Craft/BKM fiyat açıklamadığı için üst segmentte kıyas imkânsız.
- **Ayrıştırıcı:** 4 haftalık **yoğun** format. Craft 2,5 yıl, BKM 3 yıl istiyor — **taahhüt yorgunu** kitle bizim. Bu "girişi düşük engelli üst segment" konumu doğru ama **başlık düzeyinde söylenmiyor.**

---

# BÖLÜM 2 — "TÜRKİYE'DE İLK" İDDİASI: HÜKÜM

## Kısa cevap: **HAYIR. Kullanma.**

### Kanıt — İddiayı Çürütenler

**1. `ingilizcedrama.com` — YETİŞKİNE hizmet verdiği doğrulandı ✅**
> *"Hem çocuklar ve hem yetişkinler için farklı seviyelerde eğitimlerimiz mevcut. A1 ve A2 seviye yetişkinler için Yaratıcı Drama bir eğitim yöntemi olarak kullanılmaktadır."*

Kaynak: [ingilizcedrama.com](https://ingilizcedrama.com/). Eğitmenlerinin 5+ yıldır hem İngilizce hem drama alanında çalıştığını, İstanbul genelinde anlaşmalı kurs merkezlerinde ders verdiklerini belirtiyorlar. **Kurucunun tespiti doğruydu — bu kurum yetişkine İngilizce drama veriyor.**

**2. The Clap Improv Istanbul — on yıldır faal**
Kadıköy ve Taksim'de düzenli İngilizce doğaçlama tiyatro grubu. Kurucu Curtis Erhart on yıldır İstanbul'da İngilizce doğaçlama eğitmenliği ve performansı yapıyor. Ücretsiz, yetişkin, İngilizce, drama pratiği. Kurs değil ama **"yetişkinlere İngilizce drama"nın İstanbul'da yeni olmadığının** kanıtı. Kaynak: [Yabangee röportajı](https://yabangee.com/the-clap-improv/), [Daily Sabah](https://www.dailysabah.com/expat-corner/2018/01/19/spotlight-on-istanbuls-improv-and-comedy-scene) (2018).

**3. Türkiye genelinde de tekel değiliz**
Ankara ve İzmir'de yetişkin drama eğitimi veren kurumlar var ([Sanat Üretim Topluluğu](https://www.ankarasut.org/yetiskinler-icin-drama-egitimi), Drama Akademi). Bunların İngilizce hattı doğrulanamadı — ama **"Türkiye'de ilk"** demek, ülkedeki *tüm* kurumların geçmişini taramayı gerektirir. Bu kanıtlanamaz bir iddiadır.

### Hukuki Risk — Ciddi

Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği uyarınca **"ilk", "tek", "bir numara", "en" gibi üstünlük iddiaları belgelendirilmek zorundadır.** Reklam Kurulu bu iddiaları resen inceler; belgelenemeyen iddialar için durdurma cezası ve idari para cezası uygulanır. Bir rakibin (örn. ingilizcedrama.com) şikâyeti tek başına süreç başlatmaya yeter.

**Ek risk:** Web sitesinde yazılı bir "Türkiye'de ilk" iddiası, bir tek Instagram gönderisinden çok daha kalıcı bir delildir.

### Ne Diyebilirsin — Savunulabilir Alternatifler

| ❌ Kullanma | ✅ Kullan |
|---|---|
| "Türkiye'de yetişkinlerle İngilizce dramayı yapan ilk biziz" | "İstanbul'da İngilizce drama programlarının neredeyse tamamı çocuklara yönelik. Biz yetişkinlerle çalışıyoruz." |
| "Türkiye'nin tek yetişkin İngilizce drama programı" | "Yetişkinlere yönelik, profesyonel tiyatro oyuncuları tarafından yürütülen sayılı İngilizce drama programından biri." |
| "İlk ve tek" | "Dil okulu değil, tiyatro. Yaratıcı dramayı bir dil öğretim tekniği olarak değil, bir sahne pratiği olarak kullanıyoruz." |

**En güçlü ve %100 savunulabilir cümle:**
> *"İstanbul'da 'İngilizce drama' aradığınızda karşınıza çıkanların neredeyse tamamı 8–12 yaş çocuk programı. English Drama Lab yetişkinler için tasarlandı."*

Bu doğrudur, kanıtlanabilir (arama sonuçlarıyla gösterilebilir), rakip karalamaz ve mevzuat riski taşımaz. **Ayrıca "ilk" iddiasından daha ikna edicidir** — çünkü okuyucunun kendi Google deneyimiyle örtüşür.

### Nüans: Nerede gerçekten öndeyiz
Aşağıdaki kombinasyon için İstanbul'da **başka bir örnek bulunamadı** ve bu daha güvenli bir "benzersizlik" alanıdır:

- Yetişkin **+** B1+ seviye (A1/A2 başlangıç değil)
- **+** profesyonel tiyatro oyuncusu eğitmenler (dil öğretmeni değil)
- **+** 12 kişilik kapalı grup
- **+** cast direktörü masterclass finali (English Acting Praxis)

Bunu "ilk" demeden, **tarif ederek** söyle. Tarif, iddiadan daha güçlüdür.

---

# BÖLÜM 3 — RAKİPSİZ / AZ RAKİPLİ PROGRAMLAR VE ALTYAPI

## Rekabet Yoğunluğu Haritası

| Program | Rekabet | Talep (arama) | Strateji tipi |
|---|---|---|---|
| **English Acting Praxis** | 🟢 Rakipsiz | 🔴 Yok denecek kadar az | **Kategori yaratma** |
| **Broadway Musical Dance** | 🟢 Rakipsiz (gerçek muadil yok) | 🟡 Komşu talep var (jazz/modern dans) | **Talep kaçırma (hijack)** |
| **Techne Musical Lab** | 🟡 Az rakipli (Sinema Akademi tek) | 🟡 Orta | **Farklılaştırma** |
| **English Drama Lab (yetişkin)** | 🟡 Az rakipli | 🟢 Talep var — ama başka kelimede | **Kelime köprüsü** |
| **English Drama Youth 13–17** | 🟡 Üst yaş bandı boş | 🟢 Veli talebi güçlü | **Yaş bandı sahiplenme** |
| **Auteur Lab** | 🔴 Rekabetli (GalataPerform) | 🟢 Yüksek | **İçerik üstünlüğü** |
| **Camera Praxis** | 🔴 Çok rekabetli | 🟢 Yüksek | **Niş (çift dil)** |
| **Oyuncunun Mevcudiyeti** | 🔴 Çok rekabetli | 🟢 Yüksek | **Format (4 hafta yoğun)** |
| **Dans Tiyatrosu** *(yok)* | 🔴 Dolu (İDSA, Tiyatrohane) | 🟡 Orta | **Girmeden önce düşün** |

---

## 🥇 English Acting Praxis — GERÇEKTEN RAKİPSİZ

**Neden rakipsiz:** İstanbul'da "İngilizce sahne oyunculuğu + prova disiplini + cast direktörü masterclass + kayıtlı performans" birleşimini sunan başka kurum bulunamadı. ActedCity'nin New York bağlantısı en yakın komşu ama İngilizce yürüyen program değil.

**Acı gerçek:** Rakipsiz olmasının nedeni **kimsenin bunu aramaması.** "İngilizce oyunculuk atölyesi" gibi bir arama alışkanlığı Türkiye'de henüz oluşmamış. Bu **klasik SEO değil — kategori yaratma işi.**

### Kategori Yaratma Stratejisi

Kimse ürünü aramıyorsa, **problemi** arayanları yakala. Hedef kitle şunları arıyor:

| Aramadığı | Aradığı |
|---|---|
| "İngilizce oyunculuk atölyesi" | "yurtdışı casting başvurusu nasıl yapılır" |
| "English acting Istanbul" | "self tape İngilizce nasıl çekilir" |
| — | "uluslararası oyunculuk ajansı Türkiye" |
| — | "showreel nasıl hazırlanır" |
| — | "Harika Uygur casting" *(marka araması — bizde bu var!)* |
| — | "İngilizce aksan çalışması oyuncu" |
| — | "Avrupa dizilerinde oynamak için ne gerekir" |

**Yazılacak içerikler (öncelik sırasıyla):**
1. **"Türkiye'den uluslararası casting'e başvurmak: 2026 rehberi"** — en yüksek çekim gücü. Harika Uygur bağlantısıyla otoriter.
2. **"İngilizce self-tape: teknik ve dil hataları"** — pratik, paylaşılabilir, uzun kuyruk trafiği.
3. **"Showreel nasıl hazırlanır — Türkiye'deki oyuncular için"**
4. **"B1 İngilizceyle sahnede oynanır mı?"** — bariyer kaldırma içeriği. Programımızın giriş şartını doğrudan hedefliyor.
5. **Harika Uygur profil/röportaj sayfası** — kendi markası arama alıyor; o trafiği programa bağla.

**Beklenti yönetimi:** Bu içeriklerin sonuç vermesi 6–12 ay sürer. Kategori yaratma, kelime kapmadan yavaştır. Kısa vadede satış Instagram ve doğrudan iletişimden gelecek — SEO uzun vadeli altyapıdır.

---

## 🥈 Broadway Musical Dance — RAKİPSİZ AMA TALEBİ ÇALINABİLİR

**Neden rakipsiz:** "Broadway musical dance / theatre dance" başlığıyla İstanbul'da ders veren bulunamadı. En yakını Dans Akademi'nin Street Jazz kursu — ki o bile Broadway'i yalnızca **slogan** olarak kullanıyor ("Broadway'in Ruhunu Yansıt"), müfredat ticari jazz.

**Fark burada:** Rakipsiziz ama **komşu talep büyük.** İnsanlar "jazz dans kursu İstanbul", "modern dans kursu", "street jazz" arıyor. Bu talep bize yönlendirilebilir.

### Talep Kaçırma (Hijack) Stratejisi

**Hedef kelimeler:**
- `jazz dans kursu İstanbul` — mevcut talep, üzerine oturulur
- `theatre dance nedir`
- `Broadway dansı nasıl öğrenilir`
- `müzikal dansı İstanbul`
- `street jazz mı theatre jazz mı` ← **ayrıştırıcı sorgu, bize özel**
- `dans deneyimi olmadan dans kursuna başlamak`
- `Kadıköy dans kursu yetişkin`

**Yazılacak içerikler:**
1. **"Jazz dans, street jazz, theatre dance: farkı ne?"** — Bu makale rakiplerin kafa karışıklığını bizim lehimize çevirir. Dans Akademi'nin "Broadway" sloganını kullanan sayfasına doğrudan cevap.
2. **"Broadway dansının anatomisi: Fosse'den Chicago'ya"** — otorite içeriği, görsel/video ile.
3. **"30 yaşında dansa başlamak"** — en büyük satın alma engelini kaldırır ("dans deneyimi şart değil" vaadimizi içerikle destekler).
4. Repertuar sayfaları: her koreografi çalışması için kısa bir sahne notu.

---

## 🥉 English Drama Lab — TALEP VAR, AMA BAŞKA KELİMEDE

**Durum:** Az rakipli (yetişkin tarafında ciddi rakip yok) **ama** kimse "yetişkinler için İngilizce drama" diye aramıyor. Aynı kişi şunu arıyor: **"İngilizce konuşma pratiği"**, **"İngilizce konuşma kulübü İstanbul"**.

Bu talep büyük ve ücretsiz alternatiflerle dolu (Beylikdüzü Belediyesi ücretsiz kulüp, English Spoken Cafe Kadıköy, English Speaking Club Beşiktaş, The Clap ücretsiz doğaçlama).

### Kelime Köprüsü Stratejisi

Bizi arayan kişi ürünümüzün adını bilmiyor. Köprü kurulmalı:

**Hedef kelimeler:**
- `İngilizce konuşma kulübü İstanbul` — büyük talep, bizim landing sayfamız olmalı
- `İngilizce konuşma korkusu nasıl yenilir` ← **en değerli sorgu**
- `İngilizce konuşamıyorum ne yapmalıyım`
- `drama ile İngilizce öğrenmek`
- `yetişkinler için İngilizce drama` ← düşük hacim ama tam eşleşme, sahiplen
- `Kadıköy İngilizce konuşma pratiği`

**Yazılacak içerikler:**
1. **"İngilizce konuşma korkusu: neden gramer bilip konuşamıyoruz?"** — nöropsikolojik/pedagojik açıklama + drama çözümü. En yüksek potansiyelli içerik.
2. **"İngilizce konuşma kulübü mü, drama atölyesi mi?"** — ücretsiz alternatiflere karşı dürüst bir karşılaştırma. Dürüstlük dönüşüm getirir.
3. **"Yetişkinler için İngilizce drama neden çocuk programlarından farklıdır"** ← **bu makale "ilk biziz" iddiasının yerini alır.** Aynı işi yapar, risk taşımaz.
4. **"B1 seviye İngilizceyle drama atölyesine katılınır mı?"**

**Kritik uyarı:** Ücretsiz rakipler (belediye kulüpleri, The Clap) fiyat itirazını sertleştiriyor. Sayfada "neden 30.000₺?" sorusunun cevabı olmalı: üç profesyonel oyuncu eğitmen, 12 kişi kapalı grup, 12 hafta yapılandırılmış müfredat, iki lokasyon. **Ücretsiz kulüpten farkı yazılı olarak anlatılmalı.**

---

## 4️⃣ English Drama Youth — 13–17 YAŞ BANDI BOŞ

**Bulgu:** İstanbul'daki tüm İngilizce drama arzı 12 yaşta kesiliyor (İstanbul Tiyatrosu 8–10 ve 11–12; diğerleri "çocuk"). **13–17 yaş bandına İngilizce drama veren kurum bulunamadı.**

Bizim programımız 10–17 diyor — yani boş bandı zaten kapsıyor ama **iletişimde vurgulamıyoruz.** "10–17" yazınca veli "çocuk programı" diye okuyor.

**Öneri:** Sayfada iki alt bant görünür olsun — 10–12 (temel) ve 13–17 (lise/sınav çağı). Lise çağı velisinin motivasyonu farklı: **üniversite başvurusu, yurtdışı eğitim, IELTS/TOEFL öncesi konuşma güveni, portfolyo.**

**Hedef kelimeler:**
- `lise öğrencisi İngilizce konuşma pratiği`
- `13-17 yaş İngilizce drama` / `gençler için İngilizce tiyatro`
- `yurtdışı üniversite başvurusu için sanat aktivitesi`
- `ergen özgüven tiyatro`

**İçerikler:** "Lise çağında tiyatro: üniversite başvurusunda ne işe yarar?", "Ergenlerde İngilizce konuşma çekingenliği".

---

## 5️⃣ Techne Musical Lab — AZ RAKİPLİ, FARKLILAŞTIRMA GEREKİYOR

Sinema Akademi tek gerçek rakip ve **16 hafta / 64 saat** ile bizden yapısal olarak farklı. Konservatuvar programları rakip değil.

**Farkımız üç şeyde:** 8 ay süre, seyircili tam prodüksiyon (kostüm/ışık/dekor), video ile kabul (seçicilik). Bunlar **fiyatın gerekçesi** ve şu an sayfada fiyattan uzak duruyorlar.

**Hedef kelimeler:** `müzikal tiyatro kursu İstanbul`, `şan ve oyunculuk bir arada`, `yetişkin müzikal eğitimi`, `müzikal tiyatro nasıl çalışılır`, `Kadıköy müzikal kursu`.

**İçerikler:** "Müzikal tiyatroda üçlü disiplin: şan, dans, oyunculuk nasıl birleşir?", "Müzikal başvurusu için video nasıl çekilir?" (kendi kabul sürecimizi içeriğe çevirir — hem SEO hem başvuru kalitesi).

---

## 6️⃣ Auteur Lab — REKABETLİ, İÇERİKLE KAZANILIR

GalataPerform güçlü ve yerleşik (2012'den beri, 13. dönem, uluslararası konuk yazarlar). **Ama sitesinde bilgi içeriği yok** — sadece program duyurusu ve başvuru.

**Buradaki boşluk devasa.** "Oyun nasıl yazılır", "dramatik yapı nedir", "karakter arkı", "alt metin" gibi aramaları İstanbul'da hiçbir tiyatro kurumu karşılamıyor. Kurucunun İKSV Senenin Oyunu ödülü ve dramaturji formasyonu bu içeriğe otorite verir.

**Hedef kelimeler:** `oyun yazarlığı nasıl öğrenilir`, `dramatik yapı nedir`, `karakter arkı nasıl kurulur`, `alt metin nedir tiyatro`, `oyun yazarlığı atölyesi İstanbul`, `yaratıcı yazarlık kursu Kadıköy`.

**Ayrıca:** Modüler yapı (tek modül alıp devam kararını sonra verme) GalataPerform'un 7 aylık taahhüdüne karşı **en güçlü satış argümanımız.** Şu an yeterince görünür değil.

---

# BÖLÜM 4 — ÜÇ SORUYA NET CEVAP

## Soru 1: Hangi programlarımız pahalı / ucuz / rekabetçi?

**Önemli sınırlama:** Üst segment rakiplerin (Craft, BKM, GalataPerform, İDSA, Sinema Akademi) **hiçbiri fiyat yayınlamıyor.** Aşağıdaki hüküm, doğrulanabilen çıpalara (İstanbul Film Akademi, kurs.com, Fırsat Bu Fırsat, İSMEK) dayanıyor ve **üst segmentte kesin değil.**

| Program | Hüküm | Gerekçe |
|---|---|---|
| **English Drama Youth** 150.000₺ | 🔴 **En savunması zor** | ~18.750₺/ay, haftada 1 gün. Veli karar veriyor ve dil kursu/özel ders ile kıyaslıyor. Doğrulanan çocuk İngilizce drama çıpası çok altta (20.000₺/20 saat) |
| **Techne Musical Lab** 195.000₺ | 🟠 **Pahalı — ama gerekçelendirilebilir** | ~24.375₺/ay. İstanbul Film Akademi'nin aylık maliyetinin ~2,2 katı. Haftada 2 gün + tam prodüksiyon bunu taşır, **ama sayfada anlatılmalı** |
| **English Acting Praxis** 69.000₺ | 🟡 **Kıyaslanamaz** | Muadili yok. Fiyat itirazı "pahalı" değil, "bu ne işime yarayacak" olacak. Çıktı (masterclass + kayıt) satılmalı |
| **Camera Praxis** 23.500₺ | 🟠 **Pahalı görünüyor** | 5.875₺/hafta. İstanbul Film Akademi'nin haftalık maliyetinin 2 katından fazla. En fiyat baskılı kategori (İSMEK ücretsiz, ERC 1.200₺). Çift dil + showreel ayrıştırıcı ama öne çıkmıyor |
| **Oyuncunun Mevcudiyeti** 19.000₺ | 🟠 **Pahalı görünüyor** | 4.750₺/hafta. MEB kursları 600–700₺/saat. "4 hafta yoğun" formatı ayrıştırıcı ama fiyat itirazını tek başına karşılamıyor |
| **English Drama Lab** 30.000₺ | 🟢 **Rekabetçi** | Yetişkin tarafında ciddi rakip yok. Ücretsiz konuşma kulüpleriyle kıyas riski var ama farklı ürün. Aylık 12.000₺ seçeneği erişimi açıyor |
| **Auteur Lab** 18.000₺/modül | 🟢 **Rekabetçi** | 2.250₺/hafta, 10 kişilik grup. Superprof birebir 227₺/saat ile kıyaslandığında makul. GalataPerform fiyat açıklamıyor ama 7 aylık program muhtemelen daha ağır. **Modüler yapı fiyat itirazını zaten çözüyor** |
| **Broadway Musical Dance** 22.500₺ | 🟢 **En rekabetçi ürünümüz** | 1.875₺/hafta, aylık 8.000₺ girişli. Dans okulu ortalamasının üstünde ama muadili olmayan bir içerik için makul. **Aylık seçenek en güçlü satış aracımız** |

**Genel hüküm:** Techne Lab tutarlı biçimde **üst segmentte** ve konumlandırma açısından bu doğru. Sorun fiyat düzeyi değil, **fiyatın gerekçesinin sayfada görünmemesi.** Pazardaki hiçbir rakip fiyat yayınlamadığı için biz fiyatı gösteren tarafız — bu şeffaflık avantajı ancak **yanında "neden" varsa** işe yarar.

> ⚠️ **Karar gerektiren nokta:** Hafızadaki ticari karar "fiyat sitede gizli" diyor ama `data.ts` fiyatları içeriyor. Bu iki karardan biri seçilmeli. Analiz sonucu: **fiyatı göstermek doğru strateji** — çünkü tüm pazar gizliyor, şeffaflık ayrıştırıcı. Ama fiyat **her zaman gerekçesiyle birlikte** görünmeli.

---

## Soru 2: "Yetişkin İngilizce drama Türkiye'de ilk" iddiası kullanılabilir mi?

# ❌ HAYIR.

**Üç gerekçe:**

1. **Olgusal olarak yanlış.** `ingilizcedrama.com` yetişkinlere (A1/A2 seviye) yaratıcı drama ile İngilizce veriyor ve bunu kendi sitesinde açıkça yazıyor. The Clap Improv Istanbul on yıldır Kadıköy ve Taksim'de yetişkinlere İngilizce doğaçlama yaptırıyor.

2. **Hukuken riskli.** Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği "ilk/tek/en" iddialarının belgelenmesini zorunlu kılıyor. Reklam Kurulu resen inceleyebilir; bir rakip şikâyeti süreç başlatmaya yeter. Cezası durdurma + idari para cezası.

3. **Stratejik olarak gereksiz.** Daha güçlü, doğrulanabilir ve risksiz bir cümle var:

> **"İstanbul'da 'İngilizce drama' aradığınızda karşınıza çıkanların neredeyse tamamı 8–12 yaş çocuk programı. English Drama Lab yetişkinler için tasarlandı."**

Bu cümle doğru, kanıtlanabilir, okuyucunun kendi deneyimiyle örtüşür ve "ilk" iddiasından **daha ikna edicidir.**

**Ek olarak savunulabilir konumlar:**
- "Dil okulu değil, tiyatro." — ingilizcedrama.com'un dil-öğretim çerçevesinden ayrışır
- "A1/A2 başlangıç değil, B1+ üzeri sahne pratiği." — seviye ayrımı
- "Profesyonel oyuncular tarafından yürütülen sayılı İngilizce drama programından biri."

---

## Soru 3: Hangi programlar rakipsiz ve ne yapılmalı?

### Gerçekten rakipsiz (2)
**English Acting Praxis** ve **Broadway Musical Dance.** İkisi de İstanbul'da muadili bulunamayan programlar.

**Ama iki farklı SEO problemi var:**

| | English Acting Praxis | Broadway Musical Dance |
|---|---|---|
| Rekabet | Yok | Yok |
| Talep | **Yok** | Komşu talep **var** (jazz/modern dans) |
| Strateji | **Kategori yaratma** | **Talep kaçırma** |
| Süre | 6–12 ay | 2–4 ay |
| Yöntem | Ürünü değil, problemi arayanı yakala | Bitişik kelimeyi kap, farkı anlat |

### Az rakipli (3)
**Techne Musical Lab** (tek ciddi rakip Sinema Akademi, farklı format), **English Drama Lab yetişkin** (yetişkin tarafı boş, talep başka kelimede), **English Drama Youth 13–17** (üst yaş bandı tamamen boş).

### Rekabetli (3)
**Auteur Lab** (GalataPerform güçlü ama içerik boşluğu devasa), **Camera Praxis** ve **Oyuncunun Mevcudiyeti** (doymuş kategoriler — burada SEO'dan çok format ve isim gücü kazandırır).

### Girilmemesi önerilen (1)
**Dans Tiyatrosu** — İDSA ve Tiyatrohane yerleşik. Diğer 8 programın hiçbirinde bu kadar dolu bir alanla karşılaşmıyoruz. Programın kendisi zaten `data.ts`'te yok; açmadan önce ayrıştırıcı kanca netleşmeli.

---

## Aksiyon Sırası (Önerilen)

**Hemen (0–1 ay)**
1. "Türkiye'de ilk" ifadesini hiçbir yerde kullanma. Yerine Bölüm 2'deki savunulabilir cümleyi koy.
2. English Drama Lab sayfasına **"yetişkinler için"** ifadesini H1/H2 düzeyinde ekle. Şu an `seoTitle`'da yok.
3. English Drama Youth sayfasında **13–17 alt bandını** görünür kıl.
4. Her program sayfasında fiyatın hemen yanına 3 maddelik gerekçe koy (kontenjan, eğitmen, çıktı).

**Kısa vade (1–3 ay) — Talep kaçırma, hızlı getiri**
5. "Jazz dans, street jazz, theatre dance: farkı ne?" makalesi
6. "İngilizce konuşma korkusu: neden gramer bilip konuşamıyoruz?" makalesi
7. "İngilizce konuşma kulübü mü, drama atölyesi mi?" makalesi
8. "Yetişkinler için İngilizce drama neden çocuk programlarından farklıdır"

**Orta vade (3–12 ay) — Kategori yaratma ve otorite**
9. "Türkiye'den uluslararası casting'e başvurmak: 2026 rehberi"
10. "İngilizce self-tape: teknik ve dil hataları"
11. Harika Uygur profil/röportaj sayfası
12. Auteur Lab bilgi serisi: dramatik yapı, karakter arkı, alt metin
13. "Lise çağında tiyatro: üniversite başvurusunda ne işe yarar?"

---

## Kaynaklar

**Kendi programlarımızın rakipleri**
- [GalataPerform — Oyun Yazarlığı Atölyesi](https://galataperform.com/atolye/oyun-yazarligi-atolyesi/)
- [GalataSanat — Oyun/Senaryo/Yaratıcı Yazarlık](https://galatasanat.com/oyun-yazarligi-atolyesi/)
- [Craft Atölye — Kamera Önü Oyunculuk](https://atolyecraft.com/kamera-onu-oyunculuk-atolyesi) · [Craft Akademi](https://atolyecraft.com/craft-akademi)
- [BKM Mutfak Atölye — Yetişkin Atölyeleri](https://atolye.bkmmutfak.com/yetiskin-atolyeleri/)
- [Sinema Akademi — Müzikal Oyunculuk Kursu](https://sinemaakademi.com.tr/muzikal-oyunculuk-kursu)
- [İstanbul Film Akademi — Oyunculuk Eğitimleri](https://istanbulfilmakademi.com/oyunculuk-atolyesi/)
- [İstanbul Drama Sanat Akademisi](https://www.istanbuldrama.com.tr/) · [Yetişkin Drama](https://www.istanbuldrama.com.tr/yetiskinler-icin-drama-atolyesi/) · [Dans Tiyatrosu](https://www.istanbuldrama.com.tr/dans-tiyatrosu/) · [Oyunculuk Atölyesi](https://www.istanbuldrama.com.tr/oyunculuk-atolyesi/)
- [İstanbul Tiyatrosu — İngilizce Drama Atölyesi](https://istanbultiyatrosu.net/ingilizce-drama-atolyesi/) · [Yetişkin Oyunculuk](https://istanbultiyatrosu.net/yetiskin-oyunculuk-atolyesi/)
- [Tiyatrohane — Yetişkin Fiziksel Tiyatro](https://tiyatrohane.com/deneme-topluluklari/yetiskin-fiziksel-tiyatro-deneme-toplulugu)
- [Dormen Akademi](https://dormenakademi.com/) · [Metot Sanat Akademi](https://www.metotsanatakademi.com/)
- [ActedCity İstanbul](https://actedcity.com/) · [Leyli Sanat Derneği](https://leylisanat.org/en/basic-acting-workshop/)
- [Kadıköy Atölye — Yetişkinlerle Yaratıcı Drama](https://kadikoyatolye.com/atolyelerimiz/yetiskinlerle-yaratici-drama/)
- [Kadıköy Güzel Sanatlar — Yetişkin Drama](https://www.kadikoyguzelsanatlar.net/yetiskin-drama-kurslari)

**İngilizce drama — yaş ayrımı için kritik kaynaklar**
- [ingilizcedrama.com](https://ingilizcedrama.com/) — **yetişkin A1/A2 doğrulandı**
- [İngilizce Drama Atölyesi (çocuk)](https://www.ingilizcedramaatolyesi.com/en)
- [Hisar Akademi — İngilizce Drama](https://www.hisarakademi.com/ingilizce-drama/)
- [Çocuk Filozoflar Akademisi — İngilizce Drama](https://www.cocukfilozoflar.com/tr/ingilizce-drama)
- [Fırsat Bu Fırsat — Yaz Atölyesi İngilizce Drama (8–12 yaş, 20.000₺)](https://www.firsatbufirsat.com/firsat/ingilizce-drama)
- [The Clap Improv Istanbul](https://www.facebook.com/TheClapImprovIstanbul/) · [Yabangee röportajı](https://yabangee.com/the-clap-improv/) · [Daily Sabah — İstanbul doğaçlama sahnesi](https://www.dailysabah.com/expat-corner/2018/01/19/spotlight-on-istanbuls-improv-and-comedy-scene)

**Dans**
- [Dans Akademi — Street Jazz](https://dansakademi.com.tr/street-jazz-kursu) · [Dans Kursu Fiyatları 2026](https://dansakademi.com.tr/dans-kursu-fiyatlari)
- [Danstüdyo — Jazz Dans](http://www.danstudyo.com/jazz-dans-kursu/) · [Mavidans](https://mavidans.com/dans-kurslari/) · [Cadde Sanat](https://www.caddesanat.com/dans-kursu) · [Swing İstanbul](https://swingistanbul.com/)
- [Arter — Tap Dans ile Ritim](https://mobilet.com/tr/event/yetiskin-atolyesi-tap-dans-ile-ritim-31949/)
- [tiyatrolar.com.tr — Çağdaş Dans ve Doğaçlama](https://tiyatrolar.com.tr/atolye/cagdas-dans-ve-dogaclama-atolyesi)
- [İstanbul Martı Dans Tiyatrosu](https://istanbulmartidanstiyatrosu.com/tarihce/)

**Fiyat çıpaları**
- [kurs.com — İstanbul Tiyatro Kursları](https://www.kurs.com/tiyatro-kursu/istanbul) · [Kamera Önü Oyunculuk](https://www.kurs.com/kamera-onu-oyunculuk-egitimi/istanbul) · [Yaratıcı Drama](https://www.kurs.com/yaratici-drama-kursu/istanbul)
- [İBB Enstitü (İSMEK) — Uygulamalı Tiyatro](https://enstitu.ibb.istanbul/portal/egitim_detay.aspx?BransCode=1608) · [Kamera Oyunculuğu](https://enstitu.ibb.istanbul/portal/egitim_detay.aspx?BransCode=4661) · [Drama](https://enstitu.ibb.istanbul/portal/egitim_detay.aspx?BransCode=1607)
- [Superprof — Senaryo Yazarlığı İstanbul](https://www.superprof.com.tr/ders/senaryo-yazarligi/istanbul/)
- [İÜ Sürekli Eğitim — Yaratıcı Yazarlık Sertifika](https://sfk.istanbul.edu.tr/yaratici-yazarlik-egitimi-sertifika-programi-e29.html)
- [Sanat Üretim Topluluğu Ankara — Yetişkin Drama](https://www.ankarasut.org/yetiskinler-icin-drama-egitimi)
