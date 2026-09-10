# PLAN A — İNGİLİZCE DRAMA HATTI · GOOGLE ADS ARAMA KAMPANYALARI

**Tarih:** 2 Eylül 2026 · **Hesap:** 669-492-3541 · **Kaynak:** `google-ads/BRIEF-2026-09.md`, `src/lib/data.ts`, `src/lib/disiplinler.ts`, `rakip-program-fiyat-analizi.md`
**Kapsam:** Üç ayrı kampanya — English Drama Lab · English Acting Praxis · English Drama Youth

---

## 0. ÖNCE OKU — YAPISAL KARARLAR VE DOSYA ÇELİŞKİLERİ

### 0.1 Neden üç ayrı kampanya
Brifingdeki teşhis net: sekiz program tek kampanyanın içinde reklam grubu olarak duruyor ve bütçe otomatik olarak en çok gösterim alabilen gruba (Broadway, %51) akıyor. English Drama Lab 14 günde 38 gösterim aldı, English Acting Praxis 5. Aynı kampanya içinde kalırlarsa bir daha da alamazlar — Google bütçeyi tıklama alabilen gruba verir, doğru gruba değil.

**Bütçe ancak kampanya düzeyinde korunabilir.** Üç programın üçü de farklı karar vericiye satılıyor (kendine karar veren yetişkin / kariyer yatırımı yapan oyuncu / çocuğuna karar veren veli) ve farklı sezon eğrisine sahip. Tek kampanyada birleştirmek, üçünü de görünmez yapar.

### 0.2 Değişmez kurallar — bu dosyadaki her metin bunlara uyuyor
1. Telefon numarası hiçbir metinde/uzantıda yok
2. Fiyat rakamı yok
3. Burs/indirim oranı yok — yalnızca "erken kayıt" ifadesi
4. "Genç / gençler / gençlik" kelimesi **hiçbir reklam metninde yok** ("lise çağı", "10–17 yaş", "15–17 yaş" kullanıldı)
5. Ödül/unvan öne çıkarılmadı
6. Ünlem yok, klişe yok, övgü yok

> **Not (D bölümlerine ait):** Harika Uygur'un unvanı "cast direktörü" olarak, bir **program bileşeni** olarak geçiyor — ödül listesi olarak değil. Kural 5'in ihlali değil; yine de kurucu isterse EAP-3 grubu tamamen kapatılabilir, kampanyanın geri kalanı bundan etkilenmez.

### 0.3 DOĞRULANMALI — dosyalar arasında çelişen bilgiler

| # | Konu | Çelişki | Etkisi |
|---|---|---|---|
| 1 | **EDL eğitmenleri** | `BRIEF`: "Yeşim Çelebi & Arya Akkutlu" · `data.ts` id 3: "Alara Lokum, Ece Ertez & Yeşim Çelebi" | Reklam metinlerinde eğitmen adı **kullanılmadı**. Netleşene kadar kullanılmasın. |
| 2 | **EDL fiyatı** | `rakip-program-fiyat-analizi.md`: 30.000₺ · `data.ts`: 24.000₺ | Reklamda fiyat geçmiyor, doğrudan etkisi yok — ama açılış sayfası/WhatsApp yanıtı tutarlı olmalı. |
| 3 | **EAP fiyatı** | Rapor: 69.000/59.000 · `data.ts`: 59.000/50.000 | Aynı. |
| 4 | **EDY fiyatı** | Güncel: `data.ts` → `price: 99000` + `scholarshipPercent: 25` | Aynı. |
| 5 | **EDY mekânı** | `data.ts`: "Pera & Kadıköy" · `disiplinler.ts` çocuk/genç sayfaları: yalnızca **Kadıköy** | **Kritik.** Reklamda "Kadıköy ve Pera" yazıp Pera arayan kullanıcıyı yalnızca Kadıköy yazan sayfaya düşürmek dönüşümü kırar. Sayfalar düzeltilmeden Pera semt hedeflemesi açılmasın. |
| 6 | **EDY dönem başlangıcı** | `duration`: "Eylül–Mayıs" · `desc` ve bloklar: "Ekim–Mayıs" | Metinlerde **"Ekim–Mayıs"** kullanıldı (blok başlıklarıyla uyumlu). Netleştir. |
| 7 | **Başvuru URL'i** | `BRIEF`: dönüşüm `/basvuru` · Kodda böyle bir rota **yok**; gerçek rota `/atolyeler/[slug]/kayit` | Uzantı ve açılış sayfası URL'leri `/kayit` üzerinden yazıldı. `/basvuru` linki verilirse 404 olur. |
| 8 | **EAP URL slug'ı** | Program adı "English Acting Praxis" ama slug `english-drama-final-project` | URL ile reklam başlığı örtüşmüyor; kalite puanına ve kullanıcı güvenine küçük ama gerçek bir zarar. Bkz. F bölümü. |
| 9 | **Google Ads dönüşüm etiketi** | `GoogleAnalytics.tsx` `NEXT_PUBLIC_GOOGLE_ADS_ID` varsa `AW-` yapılandırıyor; tanımlı olup olmadığı repoda görünmüyor | **Teklif stratejisi seçimi buna bağlı.** Bkz. G bölümü. |

### 0.4 EN KRİTİK BULGU — mevcut negatif kelime dosyası kampanyaları boğuyor

`google-ads/03-negatif-kelimeler.csv` içindeki negatifler **tek kelimeye bölünmüş** hâlde duruyor. "iş ilanı" → `iş` + `ilanı`, "ne kadar" → `ne` + `kadar`, "3 yaş" → `3` + `yaş`. Her satır ayrı bir **geniş eşleşmeli negatif** olarak yüklenirse şunlar olur:

| Negatif | Blokladığı gerçek sorgular |
|---|---|
| `yaş` | **"10 17 yaş ingilizce drama", "15 yaş tiyatro kursu", "18 yaş üstü ingilizce drama", "12 yaş drama"** — Youth kampanyasının tüm çekirdek kelimeleri |
| `fiyat` | "ingilizce drama kursu fiyat" — en yüksek niyetli sorgu bandı |
| `oyun` | "oyun yazarlığı atölyesi" (Auteur Lab'in kendi kelimesi) |
| `ne`, `en` | Türkçe'de sayısız sorguda geçen bağlaç/edat — geniş bir kesme |
| `oyuncu` | "oyuncu olmak için ne yapmalı" gibi meşru üst huni sorgular |
| `okul` | "dil okulu" (istenen bir kesme) ama "okul sonrası aktivite" gibi veli sorgularını da keser |

**Aksiyon (bu plandan önce yapılmalı):** Bu CSV yüklenmişse hesaptan bu tek kelimelik negatifler kaldırılmalı; yerine aşağıdaki C bölümlerindeki **öbek negatifler** girilmeli. Yüklenmemişse dosya bu hâliyle asla yüklenmemeli. Brifingdeki "günlük bütçe ₺550 ama harcama ₺90" bulmacasının bir bölümünün açıklaması büyük olasılıkla burada.

### 0.5 Üç kampanyanın ortak ayarları

- **Kampanya türü:** Yalnızca Arama Ağı. Görüntülü Reklam Ağı ortağı **kapalı**, arama ortakları **kapalı** (ilk 30 gün — israfın kaynağı olabiliyor)
- **Konum:** İstanbul. Hedefleme "Bu konumdaki kişiler" (varsayılan "ilgi gösteren" değil — brifingdeki alakasız aramaların bir kısmı şehir dışından)
- **Dil:** Türkçe + İngilizce (İngilizce arayan expat kitlesi EDL ve EAP için gerçek)
- **Reklam rotasyonu:** Optimize et
- **Nihai URL sonekleri:** `?utm_source=google&utm_medium=cpc&utm_campaign=<kampanya>&utm_content=<grup>`
- **Erken kayıt son tarihi 10 Eylül** — bu plan 8 gün içinde uygulanmazsa D bölümlerindeki "Erken Kayıt Dönemi" başlıkları çıkarılmalı

---
---

# 1 · ENGLISH DRAMA LAB

> `data.ts` id 3 · 12 hafta / 3 ay · Pera & Kadıköy · 12 kişi · yetişkin · B1+ · aktif
> Başlangıç: Pera 12 Eylül Cmt 15:00 · Kadıköy 14 Eylül Pzt 20:00
> Konumlandırma: *"İngilizce öğretmiyoruz — kullandırıyoruz."* Ders kitabı, sınav, not yok.

---

## A) KİTLE TEŞHİSİ

Bu programın satış sorunu bir arz sorunu değil, bir **kelime sorunu**. Rakip analizinin tespiti: talep var ama başka kelimede. Kimse "yetişkinler için İngilizce drama" diye aramıyor; aynı kişi "İngilizce konuşma pratiği" diye arıyor. Dolayısıyla kitle teşhisi, ürün adından değil **acıdan** başlamalı.

### Persona 1 — "Toplantıda Donan" (birincil, en yüksek dönüşüm potansiyeli)
28–40 yaş, beyaz yakalı, çok uluslu ya da ihracat yapan bir şirkette. İngilizce yazışması sorunsuz, maili akıcı. Ama toplantıda söz alacakken cümleyi kafasında kurup bitirmeden fırsat geçiyor. Yabancı yönetici geldiğinde konuşan hep başkası oluyor.

**Arama anı:** Genellikle kötü geçmiş bir toplantının akşamı. Saat 21:00–00:00 arası, telefondan. Ya da terfi/rol değişikliği konuşulduğu hafta.

**Gerçekten yazdığı:**
- `ingilizce konuşamıyorum ne yapmalıyım`
- `gramer biliyorum ama konuşamıyorum`
- `ingilizce konuşurken donuyorum`
- `ingilizce konuşma pratiği istanbul`
- `ingilizce akıcı konuşma nasıl olur`
- `iş ingilizcesi konuşma pratiği`

**Bizim cevabımız:** `disiplinler.ts` → `yetiskinler-icin-ingilizce-drama-istanbul`: *"Sorun kelime değil — cümleyi kurarken kendini izliyor olman."* Bu cümle bu personanın kendi iç sesi. Reklam metni bunu tekrar etmeli.

---

### Persona 2 — "Konuşma Kulübü Yorgunu" (en büyük hacim)
25–38 yaş. Bir ya da birkaç konuşma kulübüne gitmiş: masada oturmuş, "bugün hava nasıl" düzeyinde sohbet etmiş, iki hafta sonra bırakmış. Ücretsiz alternatifleri (belediye kulüpleri, English Spoken Cafe Kadıköy, The Clap) denemiş ya da biliyor. Şu an "daha yapılandırılmış ama sıkıcı olmayan" bir şey arıyor.

**Arama anı:** Dönem başı (Eylül) ya da yılbaşı. "Bu sefer düzenli bir şey yapayım" kararının hemen ardından.

**Gerçekten yazdığı:**
- `ingilizce konuşma kulübü istanbul`
- `ingilizce pratik yapma yerleri istanbul`
- `english speaking club istanbul`
- `ingilizce konuşma grubu kadıköy`
- `ingilizce konuşma kursu değil pratik`
- `ingilizce sohbet grubu istanbul`

**Kritik uyarı (rakip analizinden):** Bu personanın alternatiflerinin çoğu **ücretsiz**. Fiyat itirazı en sert burada. Reklam metni "neden para vereyim" sorusuna değil, "neden bu diğerlerinden farklı" sorusuna cevap vermeli: *masada değil sahnede, 12 kişi, her hafta herkes konuşuyor.*

---

### Persona 3 — "Yurtdışı Hazırlığı" (küçük hacim, en yüksek niyet)
26–40 yaş. Yurtdışı iş görüşmesi, yüksek lisans başvurusu, taşınma planı ya da uluslararası bir ekibe geçiş var. Takvimi belli, aciliyeti gerçek, bütçe itirazı en düşük olan grup.

**Arama anı:** Mülakat tarihi belli olduğunda. Genellikle 2–8 hafta önce.

**Gerçekten yazdığı:**
- `ingilizce mülakat hazırlığı konuşma`
- `yurtdışı iş görüşmesi ingilizce pratik`
- `ingilizce akıcılık kazanma yolları`
- `ingilizce konuşma güveni nasıl kazanılır`

**Dikkat:** Bu personanın bir bölümü IELTS/TOEFL speaking arıyor — biz sınav hazırlığı **vermiyoruz**. `ielts`, `toefl`, `yds`, `yökdil` negatiflenmeli (C bölümü).

---

### Persona 4 — "Sahneyi Merak Eden / Expat" (ikincil)
İki alt grup, aynı kelimeleri kullanıyor: (a) tiyatroya merakı olan ama Türkçe oyunculuk kursu ağır gelen kişi, (b) İstanbul'da yaşayan yabancı ya da çift dilli kullanıcı.

**Gerçekten yazdığı:**
- `english drama istanbul`
- `drama workshop istanbul english`
- `improv in english istanbul`
- `ingilizce tiyatro atölyesi istanbul`
- `ingilizce doğaçlama atölyesi`

---

## B) REKLAM GRUBU MİMARİSİ

**Bölme ekseni:** Marka → Kategori → İkame ürün (konuşma kulübü) → Problem → Semt × 2.
Semtin ayrı grup olmasının sebebi, iki lokasyonun **farklı gün ve saatte** çalışması: Pera cumartesi 15:00, Kadıköy pazartesi 20:00. Tek reklam metniyle ikisi birden söylenemiyor.

| Grup | Niyet | Maks. TBM önerisi | Açılış sayfası |
|---|---|---|---|
| EDL-1 Marka | Bizi arıyor | ₺12 | `/atolyeler/english-drama-lab` |
| EDL-2 Kategori | Ürünü arıyor | ₺28 | `/yetiskinler-icin-ingilizce-drama-istanbul` |
| EDL-3 Konuşma Kulübü | İkame arıyor | ₺25 | `/ingilizce-konusma-kulubu-istanbul` |
| EDL-4 Problem | Acıyı arıyor | ₺15 | `/ingilizce-konusma-kulubu-istanbul` |
| EDL-5 Semt · Kadıköy | Yakınlık arıyor | ₺26 | `/atolyeler/english-drama-lab` |
| EDL-6 Semt · Pera | Yakınlık arıyor | ₺26 | `/atolyeler/english-drama-lab` |

---

### EDL-1 · MARKA (8 kelime)
Marka koruması. Hacim düşük ama TBM'si çok ucuz, dönüşüm oranı en yüksek grup. Rakip bizim adımıza teklif verirse ilk burada görünür.

| Kelime | Eşleşme |
|---|---|
| `[english drama lab]` | tam eşleşme |
| `[techne lab]` | tam eşleşme |
| `[techne lab istanbul]` | tam eşleşme |
| `[technelab]` | tam eşleşme |
| `"english drama lab istanbul"` | sıralı eşleşme |
| `"techne lab ingilizce drama"` | sıralı eşleşme |
| `"techne lab atölye"` | sıralı eşleşme |
| `"technelabistanbul"` | sıralı eşleşme |

---

### EDL-2 · KATEGORİ — YETİŞKİN İNGİLİZCE DRAMA (13 kelime)
Ürünün kendi adı. Hacmi düşük ama niyeti tam. Rakip analizinin bulgusu: bu aramalarda çıkanların neredeyse tamamı 8–12 yaş çocuk programı — dolayısıyla burada **doğru olan tek biz** olabiliriz.

| Kelime | Eşleşme |
|---|---|
| `[ingilizce drama kursu]` | tam eşleşme |
| `[ingilizce drama istanbul]` | tam eşleşme |
| `[yetişkinler için ingilizce drama]` | tam eşleşme |
| `[ingilizce drama atölyesi]` | tam eşleşme |
| `"yetişkin ingilizce drama"` | sıralı eşleşme |
| `"18 yaş üstü ingilizce drama"` | sıralı eşleşme |
| `"ingilizce yaratıcı drama"` | sıralı eşleşme |
| `"ingilizce drama atölyesi istanbul"` | sıralı eşleşme |
| `"ingilizce tiyatro atölyesi"` | sıralı eşleşme |
| `"ingilizce tiyatro kursu istanbul"` | sıralı eşleşme |
| `"english drama istanbul"` | sıralı eşleşme |
| `"english drama course istanbul"` | sıralı eşleşme |
| `"adult english drama istanbul"` | sıralı eşleşme |

---

### EDL-3 · KONUŞMA KULÜBÜ (İKAME ÜRÜN) (12 kelime)
En büyük hacim burada. `disiplinler.ts` bu niyet için ayrı bir sayfa kurmuş (`ingilizce-konusma-kulubu-istanbul`) — kampanya bunu kullanmalı, program sayfasına düşürmemeli. Kullanıcı henüz "drama" kelimesini kabul etmedi.

| Kelime | Eşleşme |
|---|---|
| `[ingilizce konuşma kulübü istanbul]` | tam eşleşme |
| `[ingilizce konuşma pratiği]` | tam eşleşme |
| `[ingilizce konuşma kulübü]` | tam eşleşme |
| `"ingilizce konuşma pratiği istanbul"` | sıralı eşleşme |
| `"ingilizce pratik yapma yerleri"` | sıralı eşleşme |
| `"ingilizce konuşma grubu istanbul"` | sıralı eşleşme |
| `"ingilizce sohbet grubu istanbul"` | sıralı eşleşme |
| `"ingilizce konuşma atölyesi"` | sıralı eşleşme |
| `"ingilizce doğaçlama atölyesi"` | sıralı eşleşme |
| `"english speaking club istanbul"` | sıralı eşleşme |
| `"english conversation practice istanbul"` | sıralı eşleşme |
| `"improv in english istanbul"` | sıralı eşleşme |

---

### EDL-4 · PROBLEM ODAKLI (10 kelime)
Bilgi arayan kullanıcı — dönüşümü yavaş ama TBM'si düşük ve yeniden pazarlama listesini besleyen tek grup. Ayrı grup olmasının sebebi **ayrı teklif** verilebilmesi (₺15 tavan).

| Kelime | Eşleşme |
|---|---|
| `[ingilizce konuşamıyorum]` | tam eşleşme |
| `[ingilizce konuşma korkusu]` | tam eşleşme |
| `"ingilizce konuşamıyorum ne yapmalıyım"` | sıralı eşleşme |
| `"ingilizce konuşma korkusu nasıl yenilir"` | sıralı eşleşme |
| `"gramer biliyorum konuşamıyorum"` | sıralı eşleşme |
| `"ingilizce konuşurken donuyorum"` | sıralı eşleşme |
| `"ingilizce akıcı konuşma nasıl"` | sıralı eşleşme |
| `"ingilizce konuşma güveni"` | sıralı eşleşme |
| `"ingilizce konuşma çekingenliği"` | sıralı eşleşme |
| `"ingilizce mülakat konuşma pratiği"` | sıralı eşleşme |

---

### EDL-5 · SEMT · KADIKÖY (9 kelime)

| Kelime | Eşleşme |
|---|---|
| `[ingilizce drama kadıköy]` | tam eşleşme |
| `[ingilizce konuşma pratiği kadıköy]` | tam eşleşme |
| `"ingilizce drama kursu kadıköy"` | sıralı eşleşme |
| `"kadıköy ingilizce konuşma kulübü"` | sıralı eşleşme |
| `"kadıköy drama atölyesi yetişkin"` | sıralı eşleşme |
| `"anadolu yakası ingilizce drama"` | sıralı eşleşme |
| `"kadıköy ingilizce atölye"` | sıralı eşleşme |
| `"speaking club kadıköy"` | sıralı eşleşme |
| `"moda ingilizce konuşma pratiği"` | sıralı eşleşme |

---

### EDL-6 · SEMT · PERA / BEYOĞLU (9 kelime)

| Kelime | Eşleşme |
|---|---|
| `[ingilizce drama beyoğlu]` | tam eşleşme |
| `[ingilizce drama taksim]` | tam eşleşme |
| `"ingilizce drama kursu beyoğlu"` | sıralı eşleşme |
| `"pera ingilizce atölye"` | sıralı eşleşme |
| `"taksim ingilizce konuşma kulübü"` | sıralı eşleşme |
| `"beyoğlu drama atölyesi yetişkin"` | sıralı eşleşme |
| `"avrupa yakası ingilizce drama"` | sıralı eşleşme |
| `"şişli ingilizce konuşma pratiği"` | sıralı eşleşme |
| `"english speaking club taksim"` | sıralı eşleşme |

---

## C) NEGATİF KELİMELER — EDL

Hepsi **öbek (sıralı) negatif** olarak girilecek. Tek kelimelik geniş negatif kullanılmayacak (bkz. 0.4).

### Kampanya düzeyi — ücretsiz / bedava arayanlar
`"ücretsiz"` · `"bedava"` · `"ücretsiz ingilizce"` · `"ücretsiz kurs"` · `"belediye kursu"` · `"ismek"` · `"halk eğitim"` · `"halk eğitim merkezi"` · `"ibb enstitü"` · `"kültür merkezi kursları"` · `"burslu"` · `"ücretsiz konuşma kulübü"` · `"ücretsiz pratik"`

> Bu blok, brifingdeki en büyük tek israf kalemini (₺89'luk "kadıköy belediyesi dans kursu" tıklaması gibi) doğrudan kesiyor. Rakip analizindeki ücretsiz alternatifler (Beylikdüzü Belediyesi, The Clap) bu kelimeleri kullanan kitleyi çekiyor; bu kitle asla ödemez.

### Sertifika / diploma / MEB arayanlar
`"sertifika"` · `"sertifikalı"` · `"meb onaylı"` · `"e devlet"` · `"diploma"` · `"belge"` · `"sertifika programı"` · `"eğitmenlik sertifikası"` · `"drama liderliği"` · `"drama eğitmenliği"` · `"drama lideri sertifikası"`

> `disiplinler.ts` "yaratıcı drama" kelimesini kullanıyor; Türkiye'de bu kelimenin en büyük arama hacmi **drama liderliği/eğitmenliği sertifikası** arayanlardan geliyor. Bunlar bizim kitlemiz değil ve TBM'yi yukarı çekiyorlar.

### İş ilanı arayanlar
`"iş ilanı"` · `"iş ilanları"` · `"eleman aranıyor"` · `"öğretmen alımı"` · `"eğitmen alımı"` · `"kariyer net"` · `"maaş"` · `"ne kadar maaş"` · `"staj"` · `"iş başvurusu"` · `"part time iş"`

### Akademik / sınav / bölüm arayanlar
`"üniversite"` · `"bölümü"` · `"taban puanı"` · `"yks"` · `"tyt"` · `"ayt"` · `"konservatuvar sınavı"` · `"yüksek lisans"` · `"tez"` · `"ödev"` · `"ders notları"` · `"ielts"` · `"toefl"` · `"yds"` · `"yökdil"` · `"kpds"` · `"sınav hazırlık"` · `"speaking sınavı"`

> **IELTS/TOEFL ayrımı kritik.** Persona 3 buraya çok yakın duruyor ama biz sınav hazırlığı vermiyoruz; bu tıklar pahalı ve boş.

### Dil okulu / kurs arayanlar
`"dil okulu"` · `"ingilizce kursu fiyatları"` · `"sıfırdan ingilizce"` · `"a1 ingilizce"` · `"a2 seviye"` · `"başlangıç seviyesi ingilizce"` · `"ingilizce öğren"` · `"ingilizce öğrenme uygulaması"` · `"online ingilizce kursu"` · `"birebir ingilizce"` · `"özel ders"` · `"ingilizce gramer"` · `"kelime ezberleme"` · `"duolingo"` · `"cambly"` · `"wall street english"` · `"british council"` · `"american culture"`

> `ingilizcedrama.com` tabanı A1/A2. Biz B1+. Bu negatifler ikimizi ayırıyor ve yanlış seviyedeki başvuruyu formdan önce eliyor.

### Çocuk / veli karışması (EDL yalnızca yetişkin)
`"çocuklar için"` · `"çocuk"` · `"çocuğum için"` · `"anaokulu"` · `"kreş"` · `"ilkokul"` · `"ortaokul"` · `"lise"` · `"öğrenci indirimi"` · `"yaş grubu çocuk"` · `"4 yaş"` · `"5 yaş"` · `"6 yaş"` · `"7 yaş"` · `"8 yaş"` · `"9 yaş"` · `"10 yaş"` · `"11 yaş"` · `"12 yaş"` · `"13 yaş"` · `"14 yaş"` · `"15 yaş"` · `"16 yaş"` · `"17 yaş"`

> **Bunlar EDL kampanyasının negatifi, Youth kampanyasının anahtar kelimesi.** İki kampanya ayrı olduğu için çakışma yok — tek kampanyada olsalardı bu ayrım imkânsızdı. Üç kampanyaya bölmenin en somut faydası bu.

### Alakasız / kirlilik
`"tiyatro bileti"` · `"oyun bileti"` · `"tiyatro oyunu izle"` · `"film izle"` · `"dizi izle"` · `"pdf indir"` · `"kimdir"` · `"biyografi"` · `"nedir kısaca"` · `"drama dizi"` · `"kore dizisi"` · `"drama film"` · `"drama queen"` · `"psikodrama"` · `"drama terapi"` · `"aile dizilimi"`

> `"drama"` kelimesi Türkçe'de dizi/film türü olarak da kullanılıyor — bu blok olmadan "drama" içeren her kelime sızdırır.

---

## D) REKLAM METİNLERİ — EDL

Her grup için bir Responsive Search Ad. Parantez içindeki sayı karakter sayısıdır (başlık ≤30, açıklama ≤90 — hepsi doğrulandı).
**Sabitleme önerisi:** 1. başlığı Konum 1'e sabitle (grup alaka sinyali), gerisini serbest bırak.

---

### RSA · EDL-1 (Marka)
**Görünen yol:** `/ingilizce-drama` `/english-drama-lab`

**Başlıklar**
1. English Drama Lab (17)
2. Techne Lab İstanbul (19)
3. Yetişkinler İçin · 18+ (22)
4. 12 Hafta · 12 Kişi (18)
5. Kadıköy ve Pera Grupları (24)
6. Eylül Dönemi Açık (17)
7. Sahnede İngilizce (17)
8. Dil Okulu Değil, Tiyatro (24)
9. Doğaçlama ve Sahne (18)
10. Başvuru Formu Sitede (20)
11. Bağımsız Tiyatro Şirketi (24)
12. Erken Kayıt Dönemi (18)

**Açıklamalar**
1. Techne Lab'ın yetişkin İngilizce drama programı. On iki hafta, on iki kişi. (75)
2. Kadıköy ve Pera'da ayrı gruplar. Tarih ve içerik detayı program sayfasında. (75)
3. Ders kitabı, sınav ve not yok. İngilizce sahnede doğaçlamayla kullanılıyor. (75)
4. Başvuru formu sitede, birkaç dakika sürüyor. Kontenjan on iki kişiyle sınırlı. (78)

---

### RSA · EDL-2 (Kategori)
**Görünen yol:** `/ingilizce-drama` `/yetiskin`

**Başlıklar**
1. İngilizce Drama Atölyesi (24)
2. Yetişkinler İçin · 18+ (22)
3. Dil Okulu Değil, Tiyatro (24)
4. Sahnede İngilizce Konuş (23)
5. Doğaçlamayla Konuşma (20)
6. 12 Kişilik Kapalı Grup (22)
7. Ders Kitabı Yok (15)
8. Sınav ve Not Yok (16)
9. Kadıköy ve Pera (15)
10. 12 Hafta · Haftada 1 Gün (24)
11. B1 Seviye Yeterli (17)
12. Eylül Dönemi Başvurusu (22)

**Açıklamalar**
1. Gramer anlatmıyoruz. Doğaçlama ve sahne çalışmasıyla İngilizce kullandırıyoruz. (79)
2. On iki kişilik gruplar, on iki hafta. Kadıköy ve Pera'da ayrı gruplar açılıyor. (79)
3. Ders kitabı, sınav ve not yok. Seviye testi de yok; B1 ve üzeri yeterli. (72)
4. Profesyonel tiyatro oyuncularıyla çalışıyorsunuz. Başvuru formu sitede. (71)

---

### RSA · EDL-3 (Konuşma Kulübü)
**Görünen yol:** `/ingilizce` `/konusma-pratigi`

**Başlıklar**
1. Konuşma Kulübü Alternatifi (26)
2. Masada Değil, Sahnede (21)
3. İngilizce Konuşma Pratiği (25)
4. Her Hafta Herkes Konuşur (24)
5. 12 Kişilik Grup (15)
6. Doğaçlamayla Pratik (19)
7. Konu Bulmakla Uğraşma (21)
8. Kadıköy ve Pera (15)
9. Yetişkin Grupları · 18+ (23)
10. Seviye Testi Yok (16)
11. Drama Yoluyla İngilizce (23)
12. 12 Hafta Yapılandırılmış (24)

**Açıklamalar**
1. Konuşma kulübünde oturulur, burada ayaktasınız. Sahne size durumu veriyor. (74)
2. On iki kişilik grup: her hafta herkes konuşuyor. Kadıköy ve Pera'da gruplar. (76)
3. Gramer düzeltmiyoruz, akıcılık çalışıyoruz. B1 ve üzeri seviye yeterli. (71)
4. Yaratıcı drama araçlarıyla on iki haftalık yapılandırılmış bir program. (71)

---

### RSA · EDL-4 (Problem)
**Görünen yol:** `/ingilizce` `/konusma-korkusu`

**Başlıklar**
1. İngilizce Konuşamıyorum (23)
2. Biliyorsun, Konuşamıyorsun (26)
3. Konuşurken Donuyorsan (21)
4. Gramer Var, Akıcılık Yok (24)
5. Sahnede Düşünmeye Vakit Yok (27)
6. Konuşma Korkusu Çalışması (25)
7. Drama Yoluyla İngilizce (23)
8. 12 Kişilik Grup (15)
9. Yetişkinler İçin · 18+ (22)
10. Kadıköy ve Pera (15)
11. Ders Değil, Pratik (18)
12. Eylül Dönemi Başvurusu (22)

**Açıklamalar**
1. Sorun kelime değil: cümleyi kurarken kendini izliyorsun. Çalıştığımız şey bu. (77)
2. Doğaçlamada düşünüp çevirecek zaman yok; dil kendiliğinden öne çıkıyor. (71)
3. On iki hafta, on iki kişi. Kadıköy ve Pera'da yetişkin grupları açılıyor. (73)
4. Gramer düzeltmiyoruz. Konuşurkenki duraksamayı sahnede çalışıyoruz. (67)

---

### RSA · EDL-5 (Kadıköy)
**Görünen yol:** `/kadikoy` `/ingilizce-drama`

**Başlıklar**
1. Kadıköy İngilizce Drama (23)
2. Kadıköy'de Yetişkin Grubu (25)
3. Anadolu Yakası (14)
4. Pazartesi Akşamı Grubu (22)
5. İngilizce Konuşma Pratiği (25)
6. 12 Kişilik Kapalı Grup (22)
7. Dil Okulu Değil, Tiyatro (24)
8. Doğaçlamayla Konuşma (20)
9. 12 Hafta · Haftada 1 Gün (24)
10. Sınav ve Not Yok (16)
11. Eylül Dönemi Açık (17)
12. Başvuru Formu Sitede (20)

**Açıklamalar**
1. Kadıköy grubu pazartesi akşamı çalışıyor. On iki kişilik kapalı grup. (69)
2. Anadolu Yakası'ndan ulaşım kolay. Tarih ve içerik program sayfasında. (69)
3. Ders kitabı ve sınav yok. İngilizce doğaçlama ve sahne çalışmasıyla açılıyor. (77)
4. Yetişkin grubu, 18 yaş üstü. Başvuru formu birkaç dakika sürüyor. (65)

> **DOĞRULANMALI:** `data.ts` yalnızca **başlangıç** tarihini veriyor (14 Eylül Pazartesi 20:00). Haftalık günün de pazartesi olduğu varsayıldı. Değilse 4. başlık ve 1. açıklama düzeltilmeli.

---

### RSA · EDL-6 (Pera / Beyoğlu)
**Görünen yol:** `/pera` `/ingilizce-drama`

**Başlıklar**
1. Pera'da İngilizce Drama (23)
2. Beyoğlu Yetişkin Grubu (22)
3. Cumartesi Öğleden Sonra (23)
4. Avrupa Yakası (13)
5. İngilizce Konuşma Pratiği (25)
6. 12 Kişilik Kapalı Grup (22)
7. Dil Okulu Değil, Tiyatro (24)
8. Doğaçlamayla Konuşma (20)
9. 12 Hafta · Haftada 1 Gün (24)
10. Seviye Testi Yok (16)
11. Eylül Dönemi Açık (17)
12. Başvuru Formu Sitede (20)

**Açıklamalar**
1. Pera grubu cumartesi öğleden sonra çalışıyor. On iki kişilik kapalı grup. (73)
2. Beyoğlu ve Taksim çevresinden ulaşım kolay. Detaylar program sayfasında. (72)
3. Gramer anlatmıyoruz. Doğaçlama ve sahneyle İngilizce kullandırıyoruz. (69)
4. Yetişkin grubu, 18 yaş üstü. Başvuru formu birkaç dakika sürüyor. (65)

---

## E) UZANTILAR — EDL

### Site bağlantısı (4 adet)
| Başlık (≤25) | Açıklama 1 (≤35) | Açıklama 2 (≤35) | URL |
|---|---|---|---|
| Program İçeriği (15) | On iki haftanın üç evresi (25) | Ne çalışılıyor, nasıl ilerliyor (31) | `/atolyeler/english-drama-lab` |
| Kadıköy ve Pera Grupları (24) | İki yakada ayrı gruplar (23) | Sana yakın olanı seç (20) | `/atolyeler/english-drama-lab#tarihler` |
| Eğitmen Kadrosu (15) | Profesyonel tiyatro oyuncuları (30) | Kimlerle çalışacaksın (21) | `/ekip` |
| Başvuru Formu (13) | Birkaç dakika sürüyor (21) | Seviye ve uygun saatler (23) | `/atolyeler/english-drama-lab/kayit` |

### Öne çıkan site metni / açıklama metni (callout, ≤25)
`12 kişilik gruplar` (18) · `Ders kitabı yok` (15) · `Sınav ve not yok` (16) · `Kadıköy ve Pera` (15) · `Seviye testi yok` (16) · `Yetişkin grupları` (17)

### Yapılandırılmış snippet
**Başlık:** Kurslar
**Değerler:** İngilizce drama (15) · Yaratıcı drama (14) · Doğaçlama (9) · Konuşma pratiği (15) · Sahne çalışması (15)

**İkinci snippet — Başlık:** Türler
**Değerler:** Yetişkin grupları (17) · Kadıköy grubu (13) · Pera grubu (10) · 12 haftalık program (18)

### Diğer arama uzantıları
- **Görsel uzantısı:** `english-drama-16`, `english-drama-1`, `english-drama-2` (`data.ts` id 3). Grup fotoğrafı, sahnede ayakta insanlar — "masada oturma" ikamesine görsel cevap. 1200×1200 ve 1200×628 iki formatta.
- **Potansiyel müşteri formu uzantısı:** Mobil trafiğin form sayfasına gitmeden bırakması bu hesabın en olası kaybı. Yalnızca ad + e-posta + tercih edilen semt sorulmalı. **Karar kurucuya ait** — form uzantısı ile gelen veri Google üzerinden akar.
- **Çağrı uzantısı:** ❌ Kural 1 gereği kullanılamaz.
- **Fiyat uzantısı:** ❌ Kural 2 gereği kullanılamaz.
- **Promosyon uzantısı:** ❌ Kural 3 gereği kullanılamaz (indirim oranı yazmak zorunlu).
- **Konum uzantısı:** Kullanılmamalı — sabit bina yok, partner mekânlarda çalışılıyor. Yanlış beklenti üretir.

---

## F) AÇILIŞ SAYFASI — EDL

| Grup | URL |
|---|---|
| EDL-1, EDL-5, EDL-6 | `https://www.technelabistanbul.com/atolyeler/english-drama-lab` |
| EDL-2 | `https://www.technelabistanbul.com/yetiskinler-icin-ingilizce-drama-istanbul` |
| EDL-3, EDL-4 | `https://www.technelabistanbul.com/ingilizce-konusma-kulubu-istanbul` |

**Mevcut durum:** Üç sayfa da var ve içerik olarak güçlü. `/yetiskinler-icin-ingilizce-drama-istanbul` sayfasındaki *"İngilizceyi biliyorsun ama konuşurken duraksıyorsun"* girişi, Persona 1'in arama sorgusunun neredeyse birebir karşılığı — reklamdan gelen kullanıcı doğru cümleyle karşılaşıyor.

**Eksikler:**
1. **`/basvuru` yok.** Brifing bu adresi dönüşüm yolu olarak veriyor ama kodda böyle bir rota yok. Gerçek rota `/atolyeler/english-drama-lab/kayit`. Uzantılarda ve metinlerde bu kullanılmalı; `/basvuru` linki verilirse 404.
2. **Disiplin sayfalarında başvuru CTA'sı görünmüyor.** `/ingilizce-konusma-kulubu-istanbul` ve `/yetiskinler-icin-ingilizce-drama-istanbul` sayfaları SEO metni olarak kurulmuş; ekranın üst yarısında doğrudan `/kayit` sayfasına giden bir buton olmalı. Reklamla gelen kullanıcı gezinmez, tıklar ya da çıkar.
3. **Fiyat beklentisi karşılanmıyor.** Program sayfası fiyatı göstermiyor ve WhatsApp'a yönlendiriyor (`page.tsx` satır 313–324). Rakip analizinin bulgusu: sektörde kimse fiyat yayınlamıyor, dolayısıyla bu bir dezavantaj değil — **ama sayfa bunu açıkça söylemeli.** "Ücret başvuru sonrası birebir paylaşılıyor" cümlesi fiyat bloğunun bulunacağı yerde, görünür olmalı. Şu an bir kod yorumu olarak duruyor.
4. **Ücretsiz alternatif itirazı yanıtlanmıyor.** Rakip analizinin uyarısı: bu kitle Beylikdüzü Belediyesi ve The Clap gibi ücretsiz seçenekleri biliyor. `/ingilizce-konusma-kulubu-istanbul` sayfasına "Ücretsiz konuşma kulübünden farkı ne?" başlıklı bir SSS maddesi eklenmeli — dürüst, karşılaştırmalı, rakip adı vermeden.
5. **Semt sayfası yok.** `disiplinler.ts` `ingilizce drama kadıköy` ve `ingilizce drama beyoğlu` kelimelerini hedefliyor ama bunlara karşılık gelen sayfa yok (`kadikoy-dans-kursu`, `beyoglu-dans-kursu` var, İngilizce drama yok). EDL-5 ve EDL-6 grupları program sayfasına gidiyor. **Öneri:** `ingilizce-drama-kadikoy` ve `ingilizce-drama-beyoglu` disiplin sayfaları açılsın; kalite puanını ve semt sorgularındaki dönüşümü ikisini birden yükseltir.

---

## G) BÜTÇE VE TEKLİF — EDL

**Günlük bütçe: ₺120**

**Gerekçe:** Brifingdeki en önemli sayı ₺550 bütçe değil, **₺90 fiili harcama**. Hesap bütçesini harcayamıyor; yani sorun bütçe değil, uygun arama bulamama. Bütçeyi büyütmek boşa. Ama EDL şu an 14 günde 38 gösterim alıyor — yani hiç denenmemiş. ₺120, ₺25 TBM ile günde ~5 tık demek; bu, hangi grubun gerçekten hacim taşıdığını 10 günde öğrenmeye yeter. Üç programın en geniş kelime tabanı bunda (konuşma kulübü + problem aramaları), dolayısıyla üç kampanya içinde en yüksek payı hak eden bu.

**Teklif stratejisi:** **Manuel TBM (Gelişmiş TBM kapalı)** — ilk 14 gün.
Sebep: Hesapta içe aktarılmış Google Ads dönüşümü olduğu doğrulanamıyor (`NEXT_PUBLIC_GOOGLE_ADS_ID` kodda opsiyonel, tanımlı olup olmadığı repoda görünmüyor). **Dönüşüm verisi olmadan akıllı teklif çalışmaz** — "Tıklamaları Maksimuma Çıkar" bile TBM'yi ₺25–30'dan yukarı iter ve brifingin dediği gibi "bu fiyata yanlış tık lüks".

Grup bazlı tavanlar: Marka ₺12 · Kategori ₺28 · Konuşma Kulübü ₺25 · Problem ₺15 · Semtler ₺26.

**Geçiş koşulu:** 30 gün içinde 15+ form dönüşümü toplanırsa → "Dönüşümleri Maksimuma Çıkar", hedef EBM olmadan, 14 gün öğrenme. Öncesinde geçilmemeli.

**İlk 8 gün özel:** Erken kayıt son tarihi 10 Eylül, dönem başlangıcı 12/14 Eylül. 2–10 Eylül arası bütçe ₺150'ye çıkarılabilir; 15 Eylül'den sonra dönem başladığı için ₺80'e düşürülüp bir sonraki döneme hazırlık moduna geçilmeli.

---

## H) YARATICI ÇÖZÜMLER — EDL

**1. Ücretsiz-alternatif itirazını reklam düzeyinde karşıla (EDL-3 içinde ayrı RSA)**
Rakip analizi açıkça diyor: gerçek rakip "İngilizce drama" değil, ücretsiz konuşma kulüpleri. Bu kişi ücretsiz seçeneği zaten denemiş ve bırakmış. İkinci bir RSA yazılıp EDL-3'te A/B test edilmeli; tek farkı "Masada Değil, Sahnede" ve "Konu Bulmakla Uğraşma" başlıklarının Konum 1–2'ye sabitlenmesi. **Neden işe yarar:** Bu kişi fiyat değil, *sıkılma* itirazıyla geliyor. Fiyata cevap veremeyiz (kural 2), sıkılmaya verebiliriz.

**2. Problem aramalarını makaleye, makaleyi yeniden pazarlamaya bağla**
`/makaleler` rotası mevcut. Rakip analizinin önerdiği "İngilizce konuşma korkusu: neden gramer bilip konuşamıyoruz?" makalesi yazılıp EDL-4'ün açılış sayfası yapılmalı. Makaleyi okuyan ama form doldurmayan herkes bir **yeniden pazarlama listesine** düşer; bu liste Arama Ağı'nda RLSA olarak kullanılıp EDL-2 ve EDL-3'te teklif +%40 ile geri hedeflenir. **Neden işe yarar:** ₺15'lik ucuz bir tık, 2–6 hafta sonra ₺28'lik pahalı bir tıkta dönüşüme çevriliyor. Düşük hacimli hesapta liste biriktirmenin tek yolu bu.

**3. Rakip marka konquest — kontrollü ve küçük**
Ayrı bir reklam grubu (EDL-7, ₺10 tavan, yalnızca tam eşleşme): `[ingilizcedrama com]`, `[the clap improv istanbul]`, `[english spoken cafe kadıköy]`, `[kadıköy atölye yaratıcı drama]`. **Marka adı reklam metninde geçmez** (mevzuat ve Google politikası). Metin EDL-2'nin aynısı, tek farkı 1. başlığın "Yetişkinler İçin · 18+" olması. **Neden işe yarar:** Rakip analizi ingilizcedrama.com'un tabanının A1/A2 olduğunu doğruladı; B1+ arayan kişi orada yanlış yerde. Onu doğru yere almanın maliyeti ₺10.
**Uyarı:** Bu grup ayrı izlenmeli; 21 günde dönüşüm yoksa kapatılmalı. Marka aramalarında dönüşüm oranı düşükse marka sahibinin şikâyet riski maliyete değmez.

**4. Saat ve gün bazlı teklif ayarı**
Persona 1'in arama anı akşam; Persona 2'ninki hafta sonu. Öneri: Pazartesi–Cuma 20:00–00:00 **+%25**, Cumartesi–Pazar 10:00–18:00 **+%20**, hafta içi 09:00–17:00 **−%20**.
**DOĞRULANMALI:** Bu bir davranış varsayımı — hesapta saat kırılımlı rapor bulunmuyor. İlk 21 günde ayar yapılmadan veri toplanıp sonra uygulanmalı. Erken uygulanırsa zaten dar olan hacmi daha da daraltır.

**5. Konum yarıçapı hedeflemesi (semt gruplarında)**
EDL-5 ve EDL-6 kampanya değil grup düzeyinde konum ayarı alamaz — bu yüzden **iki ayrı kampanya değil**, kampanya içinde İstanbul geneli hedefleyip semt kelimeleriyle ayrıştırma tercih edildi. Hacim büyürse EDL-5/6 ayrı kampanyaya çıkarılıp Kadıköy merkez 6 km ve Beyoğlu merkez 5 km yarıçapına alınmalı. **Neden işe yarar:** Bu programda gerçek satın alma engeli fiyat değil ulaşım; Bakırköy'den Kadıköy'e her pazartesi 20:00'ye kimse gelmiyor.

**6. Dil ayrımı ile expat kolu (faz 2)**
`data.ts`'de `descEn` alanı ve `/en/english-drama-istanbul` rotası mevcut. Hacim doğrulandıktan sonra EDL-8 olarak İngilizce dilli bir grup açılabilir: `[english drama istanbul]`, `[drama classes in english istanbul]`, `[improv classes istanbul]`, metinler İngilizce, açılış sayfası `/en/english-drama-istanbul`. **Neden işe yarar:** Bu kitle Türkçe reklam görünce tıklamıyor; ayrıca rekabeti neredeyse sıfır ve TBM'si düşük.

---
---

# 2 · ENGLISH ACTING PRAXIS

> `data.ts` id 8 · slug `english-drama-final-project` · 12 hafta · Pera · 14 kişi · B1+ · aktif
> Başlangıç: Pera 26 Eylül Cumartesi 11:00 · Eğitmen Ece Ertez · Finalde Cast Direktörü Harika Uygur masterclass'ı, performanslar kaydedilip katılımcıya teslim ediliyor
> Rakip analizi hükmü: **gerçekten rakipsiz — çünkü kimse aramıyor.** Bu SEO değil, kategori yaratma işi.

---

## A) KİTLE TEŞHİSİ

Bu programın sorunu EDL'in tam tersi. EDL'de talep var ama başka kelimede; burada **kelime de yok, talep de dar**. Brifing bunu sayıyla doğruluyor: 14 günde 5 gösterim, 0 tık. Bu bir kampanya hatası değil, kategori gerçeği. Dolayısıyla strateji: ürünün adını arayan azınlığı ucuza topla, **çoğunluğu problemden yakala.**

### Persona 1 — "Ajanstan Dönüş Alamayan Oyuncu" (birincil)
24–38 yaş, oyunculuk eğitimi almış ya da almakta. Casting'lere giriyor, self-tape gönderiyor, dönüş gelmiyor. Uluslararası yapımların Türkiye'de arttığını görüyor ve İngilizce sahnede kendini denememiş olduğunu biliyor. Bu programın fiyatını kariyer yatırımı olarak okuyabilecek tek persona.

**Arama anı:** Reddedilen bir seçmenin ardından; ya da bir yabancı yapımın Türkiye'de çekileceği duyulduğunda.

**Gerçekten yazdığı:**
- `self tape nasıl çekilir`
- `ingilizce self tape`
- `casting hazırlık atölyesi istanbul`
- `showreel nasıl hazırlanır`
- `audition hazırlık kursu`
- `oyunculuk ajansı için portfolyo`

---

### Persona 2 — "Uluslararası Kariyer Düşünen" (ikincil, en yüksek niyet)
26–40 yaş. Yurtdışında yaşamayı ya da uluslararası projelerde çalışmayı düşünüyor. Sorunu oyunculuk değil, **İngilizce sahnede oyunculuk**. Rakip analizindeki tabloyla birebir örtüşen persona.

**Gerçekten yazdığı:**
- `yurtdışı casting başvurusu`
- `uluslararası oyunculuk ajansı türkiye`
- `avrupa yapımlarında oynamak`
- `ingilizce oyunculuk eğitimi`
- `ingilizce aksan çalışması oyuncu`

---

### Persona 3 — "Harika Uygur'u Arayan" (küçük hacim, çok yüksek niyet)
Casting dünyasını takip eden kişi. Cast direktörünün adını biliyor ve arıyor. Bu, elimizdeki **tek gerçek marka çekim gücü** — ve rakip analizi bunu ayrıca işaretlemiş.

**Gerçekten yazdığı:**
- `harika uygur casting`
- `harika uygur atölye`
- `cast direktörü masterclass`
- `casting direktörü eğitim istanbul`

---

### Persona 4 — "Taahhüt Yorgunu İleri Öğrenci"
Craft Atölye'nin 2,5 yılını, BKM'nin 3 yılını görmüş ve geri çekilmiş kişi. Ciddi bir program istiyor ama hayatını üç yıllığına bağlamak istemiyor. Rakip analizinin "girişi düşük engelli üst segment" dediği boşluk tam burada.

**Gerçekten yazdığı:**
- `kısa dönem oyunculuk atölyesi istanbul`
- `12 haftalık oyunculuk programı`
- `ileri seviye oyunculuk atölyesi`
- `profesyoneller için oyunculuk atölyesi`

---

## B) REKLAM GRUBU MİMARİSİ

**Bölme ekseni:** Kategori → Problem (audition/self-tape) → Kişi markası → Kariyer hedefi → Rakip (opsiyonel).
Bu programda semt bölmesi **yok**: tek lokasyon (Pera) ve kitle şehir geneli — bir oyuncu iyi bir program için karşı yakaya geçer.

| Grup | Niyet | Maks. TBM önerisi | Açılış sayfası |
|---|---|---|---|
| EAP-1 Kategori | Ürünü arıyor | ₺28 | `/ingilizce-oyunculuk-istanbul` |
| EAP-2 Audition & Self-Tape | Problemi arıyor | ₺30 | `/audition-hazirlik-atolyesi-istanbul` |
| EAP-3 Cast Direktörü | Kişiyi arıyor | ₺20 | `/atolyeler/english-drama-final-project` |
| EAP-4 Uluslararası Kariyer | Hedefi arıyor | ₺25 | `/ingilizce-oyunculuk-istanbul` |
| EAP-5 Rakip (opsiyonel) | Alternatif arıyor | ₺15 | `/atolyeler/english-drama-final-project` |

---

### EAP-1 · KATEGORİ — İNGİLİZCE OYUNCULUK (11 kelime)

| Kelime | Eşleşme |
|---|---|
| `[ingilizce oyunculuk kursu]` | tam eşleşme |
| `[ingilizce oyunculuk atölyesi]` | tam eşleşme |
| `[english acting istanbul]` | tam eşleşme |
| `[english acting praxis]` | tam eşleşme |
| `"ingilizce oyunculuk eğitimi istanbul"` | sıralı eşleşme |
| `"ingilizce sahne oyunculuğu"` | sıralı eşleşme |
| `"ingilizce tiyatro oyunculuk"` | sıralı eşleşme |
| `"yabancı dilde oyunculuk"` | sıralı eşleşme |
| `"english acting workshop istanbul"` | sıralı eşleşme |
| `"english scene study istanbul"` | sıralı eşleşme |
| `"acting classes in english istanbul"` | sıralı eşleşme |

---

### EAP-2 · AUDITION & SELF-TAPE (12 kelime)
Programın gerçek hacim kaynağı. `disiplinler.ts` bu niyet için ayrı bir sayfa kurmuş (`audition-hazirlik-atolyesi-istanbul`) — kullanılmalı.

| Kelime | Eşleşme |
|---|---|
| `[self tape nasıl çekilir]` | tam eşleşme |
| `[audition hazırlık atölyesi]` | tam eşleşme |
| `[casting hazırlık kursu]` | tam eşleşme |
| `[showreel nasıl hazırlanır]` | tam eşleşme |
| `"ingilizce self tape"` | sıralı eşleşme |
| `"self tape atölyesi istanbul"` | sıralı eşleşme |
| `"casting workshop istanbul"` | sıralı eşleşme |
| `"seçme hazırlık atölyesi"` | sıralı eşleşme |
| `"monolog hazırlama atölyesi"` | sıralı eşleşme |
| `"oyuncu portfolyo hazırlama"` | sıralı eşleşme |
| `"ajans için oyunculuk hazırlık"` | sıralı eşleşme |
| `"casting kaydı nasıl gönderilir"` | sıralı eşleşme |

---

### EAP-3 · CAST DİREKTÖRÜ / KİŞİ MARKASI (8 kelime)

| Kelime | Eşleşme |
|---|---|
| `[harika uygur]` | tam eşleşme |
| `[harika uygur casting]` | tam eşleşme |
| `[harika uygur atölye]` | tam eşleşme |
| `[cast direktörü masterclass]` | tam eşleşme |
| `"casting direktörü eğitimi istanbul"` | sıralı eşleşme |
| `"cast direktörü ile atölye"` | sıralı eşleşme |
| `"ece ertez oyunculuk"` | sıralı eşleşme |
| `"casting masterclass istanbul"` | sıralı eşleşme |

> **Uyarı:** `[harika uygur]` sorgusunun büyük bölümü "kimdir / filmleri / iletişim" niyetli olacak. `"kimdir"`, `"biyografi"`, `"filmleri"`, `"iletişim"`, `"ajans başvuru"` negatifleri bu grupta **zorunlu**. 14 günde dönüşüm yoksa grup kapatılmalı.

---

### EAP-4 · ULUSLARARASI KARİYER (10 kelime)

| Kelime | Eşleşme |
|---|---|
| `[yurtdışı casting başvurusu]` | tam eşleşme |
| `[uluslararası oyunculuk ajansı]` | tam eşleşme |
| `"yurtdışında oyunculuk yapmak"` | sıralı eşleşme |
| `"avrupa yapımlarında oynamak"` | sıralı eşleşme |
| `"uluslararası casting türkiye"` | sıralı eşleşme |
| `"ingilizce aksan çalışması oyuncu"` | sıralı eşleşme |
| `"ingilizce monolog çalışması"` | sıralı eşleşme |
| `"uluslararası oyunculuk eğitimi istanbul"` | sıralı eşleşme |
| `"ingilizce metin çalışması oyuncu"` | sıralı eşleşme |
| `"international acting workshop istanbul"` | sıralı eşleşme |

---

### EAP-5 · RAKİP KONQUEST (opsiyonel · 8 kelime)
Yalnızca tam eşleşme, düşük teklif, ayrı izleme. **Marka adı reklam metninde geçmez.**

| Kelime | Eşleşme |
|---|---|
| `[craft atölye]` | tam eşleşme |
| `[craft atölye oyunculuk]` | tam eşleşme |
| `[actedcity]` | tam eşleşme |
| `[istanbul film akademi oyunculuk]` | tam eşleşme |
| `[bkm mutfak atölye]` | tam eşleşme |
| `[galataperform atölye]` | tam eşleşme |
| `[istanbul drama sanat akademisi]` | tam eşleşme |
| `[tiyatrohane atölye]` | tam eşleşme |

---

## C) NEGATİF KELİMELER — EAP

### Kampanya düzeyi — ücretsiz
`"ücretsiz"` · `"bedava"` · `"ismek"` · `"halk eğitim"` · `"ibb enstitü"` · `"belediye kursu"` · `"akm atölye"` · `"burslu"` · `"ücretsiz atölye"`

### Sertifika / MEB
`"sertifika"` · `"meb onaylı"` · `"diploma"` · `"e devlet"` · `"belge veriliyor mu"` · `"sertifikalı oyunculuk"`

### İş ilanı / figüranlık / oyuncu arayanlar — **bu programın en büyük sızıntı riski**
`"oyuncu aranıyor"` · `"figüran aranıyor"` · `"figüranlık başvuru"` · `"cast başvurusu"` · `"casting başvurusu yap"` · `"dizi için oyuncu"` · `"reklam filmi oyuncu"` · `"çocuk oyuncu ajansı"` · `"manken ajansı"` · `"iş ilanı"` · `"maaş"` · `"oyuncu maaşları"` · `"figüran ücreti"`

> **Kritik ayrım.** "casting" ve "cast" kelimeleri iki taban zıt niyeti taşıyor: (a) seçmeye **hazırlanan** oyuncu — bizim kitlemiz; (b) seçme **arayan** kişi ya da oyuncu **arayan** yapımcı — bizim kitlemiz değil. Bu negatifler olmadan EAP-2 ve EAP-3 tamamen (b) trafiğini çeker ve ₺30 TBM ile bu çok pahalı bir hatadır.

### Akademik / sınav
`"konservatuvar"` · `"konservatuvar sınavı"` · `"konservatuvar hazırlık"` · `"üniversite"` · `"bölümü"` · `"taban puanı"` · `"yks"` · `"tyt"` · `"özel yetenek sınavı"` · `"tiyatro bölümü"` · `"sahne sanatları bölümü"`

### Kişi araştırması (EAP-3 için zorunlu)
`"kimdir"` · `"biyografi"` · `"kaç yaşında"` · `"filmleri"` · `"instagram"` · `"iletişim numarası"` · `"ajans iletişim"` · `"röportaj"` · `"nereli"` · `"eşi"`

### Dil okulu / seviye uyuşmazlığı
`"ingilizce kursu"` · `"sıfırdan ingilizce"` · `"a1"` · `"a2 seviye"` · `"ielts"` · `"toefl"` · `"aksan kursu"` · `"amerikan aksanı öğren"` · `"ingilizce öğren"`

### Çocuk / karışma
`"çocuklar için"` · `"çocuk oyunculuk"` · `"lise"` · `"ortaokul"` · `"10 yaş"` · `"12 yaş"` · `"14 yaş"` · `"16 yaş"` · `"çocuk tiyatrosu"`

### Alakasız
`"film izle"` · `"dizi izle"` · `"pdf"` · `"torrent"` · `"tiyatro bileti"` · `"oyun bileti"` · `"nedir kısaca"` · `"kamera fiyatları"` · `"self tape ışık ekipmanı"` · `"telefon tutucu"`

---

## D) REKLAM METİNLERİ — EAP

### RSA · EAP-1 (Kategori)
**Görünen yol:** `/ingilizce` `/oyunculuk`

**Başlıklar**
1. English Acting Praxis (21)
2. İngilizce Oyunculuk (19)
3. 12 Hafta · Pera (15)
4. Metin, Karakter, Prova (22)
5. Cast Direktörü Finali (21)
6. 14 Kişilik Grup (15)
7. Performans Kaydı Teslim (23)
8. B1 Seviye Yeterli (17)
9. Sahne Deneyimi Şart Değil (25)
10. Ece Ertez İle (13)
11. 26 Eylül'de Başlıyor (20)
12. Yetişkinler İçin · 18+ (22)

**Açıklamalar**
1. On iki hafta İngilizce metin, karakter ve prova disiplini. Pera'da, 14 kişi. (76)
2. Finalde cast direktörü masterclass'ı; performanslar kaydedilip teslim edilir. (77)
3. Dil ezberlenen replik olmaktan çıkıp oyuncunun aracı hâline geliyor. (68)
4. B1 seviyesinde İngilizce yeterli. Başvuru formu sitede, birkaç dakika sürüyor. (78)

---

### RSA · EAP-2 (Audition & Self-Tape)
**Görünen yol:** `/audition` `/self-tape`

**Başlıklar**
1. İngilizce Self-Tape (19)
2. Audition Hazırlığı (18)
3. Cast Direktörü Geri Bildirimi (29)
4. Performans Kaydı Teslim (23)
5. Casting Masasından Bakış (24)
6. 12 Hafta · Pera (15)
7. 14 Kişilik Grup (15)
8. İngilizce Sahne Çalışması (25)
9. Portföy İçin Kayıt (18)
10. Metin ve Karakter Analizi (25)
11. 26 Eylül'de Başlıyor (20)
12. Başvuru Formu Sitede (20)

**Açıklamalar**
1. Programın finalinde cast direktörü masterclass'ı ve bir çekim günü var. (71)
2. Canlı performanslar kayıt altına alınır ve katılımcılara teslim edilir. (71)
3. İngilizce metin seçimi, karakter kurma ve prova disiplini on iki hafta boyunca. (79)
4. Ajansa ve casting süreçlerine gönderebileceğiniz bir kayıtla çıkıyorsunuz. (74)

---

### RSA · EAP-3 (Cast Direktörü)
**Görünen yol:** `/masterclass` `/english-acting`

**Başlıklar**
1. Harika Uygur Masterclass (24)
2. Cast Direktörü İle Çalışma (26)
3. Program Finalinde Masterclass (29)
4. English Acting Praxis (21)
5. 12 Hafta · Pera (15)
6. Canlı Performans İzlenir (24)
7. Kayıt Katılımcıya Teslim (24)
8. 14 Kişilik Grup (15)
9. İngilizce Sahne Oyunculuğu (26)
10. Ece Ertez İle 12 Hafta (22)
11. 26 Eylül'de Başlıyor (20)
12. Başvuru Formu Sitede (20)

**Açıklamalar**
1. Cast direktörü Harika Uygur programın finalinde bir günlük masterclass veriyor. (79)
2. Performanslar izlenir, kayıt altına alınır ve katılımcılara teslim edilir. (74)
3. On iki hafta İngilizce metin, karakter ve prova; ardından masterclass günü. (75)
4. Pera'da, on dört kişilik grup. Başvuru formu sitede, birkaç dakika sürüyor. (75)

---

### RSA · EAP-4 (Uluslararası Kariyer)
**Görünen yol:** `/ingilizce` `/oyunculuk`

**Başlıklar**
1. İngilizce Oyunculuk Pratiği (27)
2. Uluslararası Projeler İçin (26)
3. İngilizce Self-Tape (19)
4. Yurt Dışı Hazırlığı (19)
5. 12 Hafta · Pera (15)
6. Cast Direktörü Finali (21)
7. Performans Kaydı Teslim (23)
8. B1 Seviye Yeterli (17)
9. 14 Kişilik Grup (15)
10. Metin, Karakter, Prova (22)
11. 26 Eylül'de Başlıyor (20)
12. Başvuru Formu Sitede (20)

**Açıklamalar**
1. Oyunculuğunu İngilizce bir zeminde denemek isteyenler için on iki hafta. (72)
2. Uluslararası yapımlara hazırlananlar için İngilizce metin ve sahne çalışması. (77)
3. Finalde cast direktörü masterclass'ı; performanslar kaydedilip teslim edilir. (77)
4. B1 seviyesinde İngilizce yeterli. Sahne deneyimi önkoşul değil. (63)

---

### RSA · EAP-5 (Rakip Konquest)
**Görünen yol:** `/12-hafta` `/english-acting`
Rakip markanın adı hiçbir alanda geçmiyor; ayrışma **format** üzerinden kuruluyor.

**Başlıklar**
1. İngilizce Oyunculuk Pratiği (27)
2. 12 Hafta · Pera (15)
3. 14 Kişilik Kapalı Grup (22)
4. Cast Direktörü Finali (21)
5. Performans Kaydı Teslim (23)
6. Metin, Karakter, Prova (22)
7. Uzun Taahhüt Yok (16)
8. Tek Dönem · 12 Hafta (20)
9. English Acting Praxis (21)
10. B1 Seviye Yeterli (17)
11. 26 Eylül'de Başlıyor (20)
12. Başvuru Formu Sitede (20)

**Açıklamalar**
1. Yıllara yayılan taahhüt yok. Tek dönem, on iki hafta, on dört kişilik grup. (75)
2. İngilizce yürüyen bir oyunculuk programı; finalde cast direktörü masterclass'ı. (79)
3. Metin analizi, karakter kurma ve prova disiplini. Pera'da, cumartesi. (69)
4. Performanslar kayıt altına alınıp katılımcılara teslim ediliyor. (64)

---

## E) UZANTILAR — EAP

### Site bağlantısı (4 adet)
| Başlık (≤25) | Açıklama 1 (≤35) | Açıklama 2 (≤35) | URL |
|---|---|---|---|
| Masterclass Finali (18) | Cast direktörü ile bir gün (26) | Performanslar kaydediliyor (26) | `/atolyeler/english-drama-final-project` |
| Program İçeriği (15) | Metin, karakter, prova (22) | On iki haftanın akışı (21) | `/ingilizce-oyunculuk-istanbul` |
| Kimler Katılabilir (18) | B1 seviye İngilizce yeterli (27) | Sahne deneyimi şart değil (25) | `/ingilizce-oyunculuk-istanbul` |
| Başvuru Formu (13) | Birkaç dakika sürüyor (21) | Pera, cumartesi grubu (21) | `/atolyeler/english-drama-final-project/kayit` |

### Öne çıkan site metni / açıklama metni (callout, ≤25)
`14 kişilik grup` (15) · `Cast direktörü finali` (21) · `Performans kaydı` (16) · `İngilizce yürüyor` (17) · `Pera · cumartesi` (16) · `B1 seviye yeterli` (17)

### Yapılandırılmış snippet
**Başlık:** Kurslar
**Değerler:** İngilizce oyunculuk (19) · Metin çalışması (15) · Karakter çalışması (18) · Prova disiplini (15) · Self-tape (9)

### Diğer arama uzantıları
- **Görsel uzantısı:** `english-acting-praxis-poster`, `english-drama-11`, `english-drama-13` (`data.ts` id 8).
- **Potansiyel müşteri formu uzantısı:** Bu programda **önerilmiyor** — yüksek fiyatlı, seçici bir program; başvurunun site formundan gelmesi hem niyet filtresi hem veri kalitesi sağlıyor.
- **Çağrı / fiyat / promosyon uzantısı:** ❌ Kurallar 1–3.

---

## F) AÇILIŞ SAYFASI — EAP

| Grup | URL |
|---|---|
| EAP-1, EAP-4 | `https://www.technelabistanbul.com/ingilizce-oyunculuk-istanbul` |
| EAP-2 | `https://www.technelabistanbul.com/audition-hazirlik-atolyesi-istanbul` |
| EAP-3, EAP-5 | `https://www.technelabistanbul.com/atolyeler/english-drama-final-project` |

**Mevcut durum:** İki disiplin sayfası da güçlü ve doğru yazılmış. `/ingilizce-oyunculuk-istanbul` sayfasındaki "İngilizce Drama Lab ile farkı ne?" SSS'i, iki programın birbirini yemesini engelleyen doğru bir refleks.

**Eksikler:**
1. **URL ile program adı örtüşmüyor.** Program "English Acting Praxis", slug `english-drama-final-project`. Reklamda "English Acting Praxis" yazıp adres çubuğunda `english-drama-final-project` görmek güven kırıyor ve kalite puanına yansıyor. **Öneri:** slug `english-acting-praxis` olarak değiştirilip eskisinden 301 yönlendirme kurulmalı. Reklamdaki görünen yol (`/masterclass`, `/english-acting`) bunu kısmen örtüyor ama gerçek URL'i değiştirmiyor.
2. **Harika Uygur için ayrı bir sayfa yok.** Rakip analizinin 5. sıradaki içerik önerisi buydu ve EAP-3 grubunun açılış sayfası olması gereken şey de bu. Program sayfasına düşen "Harika Uygur" arayıcısı, aradığı kişiyi bir program açıklamasının içine gömülü bulur. `/ekip` altında ya da makale olarak bir profil sayfası açılmalı.
3. **"Neden 12 hafta yeterli" anlatısı yok.** Rakip analizi diyor ki ayrıştırıcımız Craft'ın 2,5 yılına ve BKM'nin 3 yılına karşı **kısa format**. Bu, sayfada bir satış argümanı olarak durmuyor. EAP-5 grubunun reklam metni bunu vaat ediyor; sayfa karşılamıyor.
4. **Self-tape/showreel çıktısı yeterince öne çıkmıyor.** "Performanslar kayıt altına alınıp teslim edilir" cümlesi programın en somut çıktısı ve EAP-2'nin bütün vaadi. Sayfanın üst bölümünde, blok içeriğine gömülmeden görünmeli.
5. **`/basvuru` yok** — gerçek rota `/atolyeler/english-drama-final-project/kayit`.

---

## G) BÜTÇE VE TEKLİF — EAP

**Günlük bütçe: ₺50**

**Gerekçe:** Rakip analizinin hükmü net — bu program rakipsiz ama **kimse aramıyor**. Brifingdeki 5 gösterim bunu doğruluyor. Arama Ağı'nda var olmayan talebi bütçeyle yaratmak mümkün değil; ₺200 versek de harcayamayız. ₺50, mevcut dar hacmi tam yakalamaya yeter ve harcanamayan kısmı diğer iki kampanyaya bırakmaz (kampanya bütçeleri ayrı olduğu için sızıntı da olmaz).

Bu bütçenin asıl işi satış değil **keşif**: hangi problem sorgusunun (self-tape / audition / uluslararası casting) gerçekten hacmi olduğunu 30 günde öğrenmek. O bilgi, rakip analizinin önerdiği içerik takvimini önceliklendirir — ve bu programın gerçek satış kanalı orası.

**Teklif stratejisi:** **Manuel TBM**, tavan ₺30 (EAP-2), ₺28 (EAP-1), ₺25 (EAP-4), ₺20 (EAP-3), ₺15 (EAP-5).
Akıllı teklife **geçilmemeli** — bu hacimde dönüşüm verisi asla yeterli olmayacak; akıllı teklif burada tahmin yürütür ve TBM'yi ₺40+'a çıkarır.

**Beklenti yönetimi:** Bu kampanyanın ilk 30 günde 1 kayıt getirmesi bile başarıdır (program birim değeri en yüksek olan). Ama muhtemelen 0 getirecek ve satış Instagram'dan gelecek. Kampanya kapatılmamalı — **verisi içerik stratejisi için değerli.**

**26 Eylül başlangıç:** 20 Eylül'den sonra bütçe ₺30'a düşürülmeli; 12 haftalık program başladıktan sonra "bir sonraki dönem" mesajına geçilmeli.

---

## H) YARATICI ÇÖZÜMLER — EAP

**1. Kişi markasını trafik kapısına çevir (en yüksek getirili fikir)**
Rakip analizi "Harika Uygur casting" aramasını *"marka araması — bizde bu var"* diye işaretlemiş. Bu, bu programın sahip olduğu tek gerçek arama talebi. Yapılması gereken: bir profil/röportaj sayfası açılıp EAP-3'ün açılış sayfası yapılması. **Neden işe yarar:** Kişi adı aramaları çok ucuz (rekabet yok, alaka yüksek) ve bu kişinin adını arayan biri zaten casting dünyasının içinde — yani tam kitle. ₺20 tavanla bu, hesabın en ucuz nitelikli tıkı olabilir.

**2. "Kimse ürünü aramıyorsa problemi arayanı yakala"nın kampanya karşılığı**
EAP-2 aslında bir oyunculuk kampanyası değil, bir **self-tape kampanyası**. `self tape nasıl çekilir` sorgusu bilgi arıyor; bizim vaadimiz bilgi değil ama sonucu aynı: elinde kayıt olacak. Bu grubun açılış sayfası bir "nasıl çekilir" içeriği olmalı (rakip analizinin 2. içerik önerisi), sonunda programa bağlanmalı. **Neden işe yarar:** Türkiye'de bu sorguyu karşılayan kurumsal içerik yok; ilk yazanın sırtlanacağı ucuz ve sürekli bir trafik.

**3. Taahhüt yorgunluğu üzerinden konquest (EAP-5)**
Craft ve BKM fiyat açıklamıyor ama **süre açıklıyor**: 2,5 yıl ve 3 yıl. Bu bizim reklamda kullanabileceğimiz tek karşılaştırma ekseni, çünkü fiyat yasak (kural 2) ve süre bilgisi rakibin kendi sitesinde yayınlanmış. "Uzun Taahhüt Yok" başlığı bu yüzden yazıldı — rakip adı geçmeden, doğrulanabilir bir gerçeğe dayanarak. **Neden işe yarar:** Marka adını arayan kişi henüz kararsız; ona fiyat değil **ölçek** farkı sunuyoruz.

**4. Yeniden pazarlama: EDL mezunu ve EDL başvurusu**
`data.ts`'de `edlFamily` alanı üç programı birbirine bağlıyor — bu ilişki kampanyada da kurulmalı. `/atolyeler/english-drama-lab` ve `/ingilizce-konusma-kulubu-istanbul` sayfalarını gezenler bir listeye alınıp EAP-1 ve EAP-4'te RLSA olarak +%50 teklifle hedeflenmeli. **Neden işe yarar:** `/ingilizce-oyunculuk-istanbul` sayfasının kendi SSS'i şunu söylüyor: dil kaygısı ağır basıyorsa önce EDL. Tersi de doğru — EDL'i inceleyip "bu bana hafif gelir" diyen kişi EAP'nin en olgun adayı ve onu başka türlü bulmanın yolu yok.

**5. Cumartesi sabahı teklif ayarı**
Program cumartesi 11:00'de. Cumartesi–Pazar 09:00–14:00 arası **+%30** teklif. **Neden işe yarar:** Hafta sonu sabahı bu programı arayan kişi, hafta sonu sabahını buna ayırabileceğini zaten bilen kişidir — zamanlama itirazı elenmiş oluyor.
**DOĞRULANMALI:** Hesapta saat kırılımı verisi yok; 21 gün veri toplandıktan sonra uygulanmalı.

**6. Kampanya deneyi (Experiment) ile RSA testi**
Bu hacimde A/B testi anlamlı sonuç vermez. Onun yerine: 30 gün sonunda hangi grubun arama terimleri gerçekten geldiyse, o grup **ayrı kampanyaya** çıkarılıp bütçesinin tamamı ona verilmeli. **Neden işe yarar:** Kategori yaratma işinde doğru kelimeyi bulmak, çok kelimeyi denemekten daha değerli.

---
---

# 3 · ENGLISH DRAMA YOUTH

> `data.ts` id 9 · 8 ay · Ekim–Mayıs · haftada 1 gün · Pera & Kadıköy · 12 kişi · 10–17 yaş · B1+ · aktif
> Başlangıç: Pera 27 Eylül Pazar · Kadıköy 3 Ekim Cumartesi · Eğitmen Alara Lokum · Seyircili final gösterisi
> Rakip analizi bulgusu: İstanbul'daki tüm İngilizce drama arzı 12 yaşta kesiliyor. **13–17 bandı fiilen boş.**

---

## A) KİTLE TEŞHİSİ

Arayan çocuk değil, **veli**. Ödemeyi veli yapıyor, kararı veli veriyor, ama programa gelen çocuk — ve çocuk gitmek istemezse kayıt düşüyor. Dolayısıyla reklam iki kişiye birden konuşuyor: velinin kaygısına ve çocuğun onurunu incitmeden.

Ayrıca bu, hesabın **en savunması zor fiyatlı** programı (rakip analizi, bölüm 05). Reklamda fiyat geçmiyor ama bu, açılış sayfasının işini zorlaştırıyor: veli bu programı dil kursu ve özel okul ek dersiyle kıyaslayacak.

### Persona 1 — "Karne Velisi" (birincil, en büyük hacim)
38–50 yaş, çocuğu ortaokul ya da lisede. İngilizce notu iyi, hatta çok iyi. Ama yurtdışında tatilde ya da misafir bir yabancı karşısında çocuk tek kelime edemiyor. Veli bu farkı gördü ve rahatsız oldu.

**Arama anı:** Karne dönemi (Ocak, Haziran), okul açılışı (Eylül) ve tatil dönüşü. Eylül şu an — tam zamanı.

**Gerçekten yazdığı:**
- `çocuğum ingilizce konuşamıyor`
- `ingilizce konuşma pratiği çocuk`
- `çocuklar için ingilizce drama`
- `ingilizce drama kursu istanbul`
- `okul dışı ingilizce aktivite`

---

### Persona 2 — "Lise Velisi / Portfolyo" (en yüksek değerli, rakipsiz band)
42–52 yaş, çocuğu 15–17 yaşında. Yurtdışı üniversite başvurusu, IB/AP programı ya da yurt içinde iyi bir üniversite hedefi var. Sanat aktivitesi ve İngilizce özgüven aynı anda arıyor. Bu bandın İstanbul'da alternatifi yok.

**Arama anı:** 9.–11. sınıf yaz sonu; başvuru takvimi konuşulmaya başlandığında.

**Gerçekten yazdığı:**
- `lise öğrencisi ingilizce konuşma pratiği`
- `lise tiyatro kursu istanbul`
- `15 yaş tiyatro kursu`
- `yurtdışı üniversite başvurusu sanat aktivitesi`
- `16 yaş oyunculuk kursu istanbul`

> Bu personanın arama kalıplarının bir bölümü "genç/gençler" kelimesini içeriyor. Kelime tarafında bunlar **hedeflenebilir**; reklam metninde **kullanılamaz** (kural 4). Metinlerde "lise çağı" ve "15–17 yaş" kullanıldı.
> **DOĞRULANMALI:** "gençler için" içeren anahtar kelimelerin de politika uyarısı alıp almadığı hesapta test edilmeli. Alırsa yalnızca "lise" ve yaş sayısı içeren varyantlar kalır.

---

### Persona 3 — "Utangaç Çocuk Velisi"
35–48 yaş. Sorun İngilizce değil, çocuğun kendini ifade edememesi. İngilizce drama bu velinin gözünde iki sorunu birden çözüyor: özgüven ve dil. Duygusal olarak en hızlı ikna olan, ama en çok "çocuğum zorlanır mı" endişesi taşıyan grup.

**Gerçekten yazdığı:**
- `çocuk özgüven kursu istanbul`
- `utangaç çocuk için tiyatro`
- `çocuklar için drama kursu kadıköy`
- `çocuğum kalabalık önünde konuşamıyor`

---

### Persona 4 — "Sahneye Meraklı Çocuğun Velisi"
Çocuk zaten istiyor: okul kulübünde oynadı, dizi izliyor, sahneye çıkmak istiyor. Veli ciddi bir yer arıyor, "kurs" değil. Bu personanın kararı en hızlı çıkıyor.

**Gerçekten yazdığı:**
- `çocuklar için tiyatro kursu istanbul`
- `10 yaş drama kursu`
- `13 yaş tiyatro kursu`
- `çocuk oyunculuk kursu kadıköy`
- `yıl sonu gösterisi olan tiyatro kursu`

---

## B) REKLAM GRUBU MİMARİSİ

**Bölme ekseni:** Yaş bandı × 2 → Problem (veli kaygısı) → Semt → Kategori.
Yaş bandını bölmek bu programın en önemli yapısal kararı: `data.ts` "gruplar yaşa göre ayrılır: 10–14 ve 15–17" diyor ve rakip analizi *"10–17 yazınca veli çocuk programı diye okuyor"* diye uyarıyor. Tek reklam grubunda ikisi birden söylenirse ikisi de kaybedilir.

| Grup | Niyet | Maks. TBM önerisi | Açılış sayfası |
|---|---|---|---|
| EDY-1 Lise Çağı 15–17 | Yaş bandı | ₺26 | `/gencler-icin-ingilizce-drama-istanbul` |
| EDY-2 Çocuk 10–14 | Yaş bandı | ₺24 | `/cocuklar-icin-ingilizce-drama-istanbul` |
| EDY-3 Veli Problemi | Kaygı | ₺18 | `/cocuklar-icin-ingilizce-drama-istanbul` |
| EDY-4 Semt · Kadıköy | Yakınlık | ₺24 | `/atolyeler/english-drama-youth` |
| EDY-5 Kategori | Ürün | ₺24 | `/atolyeler/english-drama-youth` |

> **Pera semt grubu bilinçli olarak açılmadı.** Bkz. 0.3 madde 5: disiplin sayfaları yalnızca Kadıköy diyor, `data.ts` Pera & Kadıköy diyor. Sayfa düzeltilene kadar Pera için ayrı grup açmak, tıklanan vaadi karşılamayan bir sayfaya para ödemek olur. Düzeltildiğinde EDY-6 aynı şablonla açılır.

---

### EDY-1 · LİSE ÇAĞI 15–17 (12 kelime)
Rakipsiz band. Rakip analizi: *"İstanbul Tiyatrosu 12'de kesiyor. Lise çağı gencine İngilizce drama + seyircili final sunan başka kurum bulunamadı."*

| Kelime | Eşleşme |
|---|---|
| `[lise tiyatro kursu istanbul]` | tam eşleşme |
| `[15 yaş tiyatro kursu]` | tam eşleşme |
| `[16 yaş oyunculuk kursu]` | tam eşleşme |
| `[17 yaş drama kursu]` | tam eşleşme |
| `"lise öğrencisi ingilizce konuşma pratiği"` | sıralı eşleşme |
| `"lise çağı tiyatro kursu"` | sıralı eşleşme |
| `"15 17 yaş drama"` | sıralı eşleşme |
| `"lise ingilizce drama"` | sıralı eşleşme |
| `"gençler için ingilizce drama"` | sıralı eşleşme |
| `"gençler için tiyatro kursu istanbul"` | sıralı eşleşme |
| `"youth theatre istanbul"` | sıralı eşleşme |
| `"yurtdışı başvurusu sanat aktivitesi"` | sıralı eşleşme |

---

### EDY-2 · ÇOCUK 10–14 (12 kelime)

| Kelime | Eşleşme |
|---|---|
| `[çocuklar için ingilizce drama]` | tam eşleşme |
| `[ingilizce drama çocuk]` | tam eşleşme |
| `[10 yaş drama kursu]` | tam eşleşme |
| `[12 yaş tiyatro kursu]` | tam eşleşme |
| `[13 yaş drama kursu]` | tam eşleşme |
| `"çocuk ingilizce drama kursu istanbul"` | sıralı eşleşme |
| `"çocuklara ingilizce tiyatro"` | sıralı eşleşme |
| `"10 14 yaş drama kursu"` | sıralı eşleşme |
| `"11 yaş tiyatro kursu"` | sıralı eşleşme |
| `"14 yaş drama atölyesi"` | sıralı eşleşme |
| `"çocuk yaratıcı drama istanbul"` | sıralı eşleşme |
| `"english drama for kids istanbul"` | sıralı eşleşme |

---

### EDY-3 · VELİ PROBLEMİ (11 kelime)

| Kelime | Eşleşme |
|---|---|
| `[çocuğum ingilizce konuşamıyor]` | tam eşleşme |
| `[ingilizce konuşma pratiği çocuk]` | tam eşleşme |
| `"çocuklarda ingilizce konuşma pratiği"` | sıralı eşleşme |
| `"çocuğum ingilizce konuşmuyor"` | sıralı eşleşme |
| `"ingilizce konuşamayan çocuk ne yapmalı"` | sıralı eşleşme |
| `"çocuk ingilizce özgüven"` | sıralı eşleşme |
| `"utangaç çocuk için tiyatro"` | sıralı eşleşme |
| `"çocuk özgüven kursu istanbul"` | sıralı eşleşme |
| `"kalabalık önünde konuşamayan çocuk"` | sıralı eşleşme |
| `"okul dışı ingilizce aktivite"` | sıralı eşleşme |
| `"ingilizce pratik yaptırma yolları çocuk"` | sıralı eşleşme |

---

### EDY-4 · SEMT · KADIKÖY (9 kelime)

| Kelime | Eşleşme |
|---|---|
| `[çocuk drama kursu kadıköy]` | tam eşleşme |
| `[ingilizce drama kadıköy çocuk]` | tam eşleşme |
| `"kadıköy çocuk tiyatro kursu"` | sıralı eşleşme |
| `"kadıköy ingilizce drama çocuk"` | sıralı eşleşme |
| `"anadolu yakası çocuk drama"` | sıralı eşleşme |
| `"ataşehir çocuk tiyatro kursu"` | sıralı eşleşme |
| `"üsküdar çocuk drama kursu"` | sıralı eşleşme |
| `"maltepe çocuk tiyatro kursu"` | sıralı eşleşme |
| `"kadıköy lise tiyatro kursu"` | sıralı eşleşme |

> Ataşehir/Üsküdar/Maltepe eklendi çünkü `disiplinler.ts` bu semtlerden öğrenci geldiğini yazıyor.

---

### EDY-5 · KATEGORİ (10 kelime)

| Kelime | Eşleşme |
|---|---|
| `[ingilizce drama kursu]` | tam eşleşme |
| `[ingilizce tiyatro kursu]` | tam eşleşme |
| `[ingilizce drama atölyesi çocuk]` | tam eşleşme |
| `"ingilizce drama kursu istanbul"` | sıralı eşleşme |
| `"ingilizce tiyatro atölyesi çocuk"` | sıralı eşleşme |
| `"drama ile ingilizce öğrenme"` | sıralı eşleşme |
| `"yıl sonu gösterisi olan drama kursu"` | sıralı eşleşme |
| `"seyircili final gösterisi tiyatro kursu"` | sıralı eşleşme |
| `"ingilizce yaratıcı drama çocuk"` | sıralı eşleşme |
| `"english drama school istanbul"` | sıralı eşleşme |

---

## C) NEGATİF KELİMELER — EDY

### Kampanya düzeyi — ücretsiz / belediye
`"ücretsiz"` · `"bedava"` · `"belediye"` · `"belediye kursu"` · `"ismek"` · `"halk eğitim"` · `"ibb enstitü"` · `"ücretsiz çocuk kursu"` · `"okul kulübü"` · `"burslu"` · `"devlet destekli"`

### Sertifika / eğitmenlik
`"drama liderliği"` · `"drama eğitmenliği"` · `"drama lideri sertifikası"` · `"sertifika programı"` · `"meb onaylı"` · `"öğretmenler için drama"` · `"drama dersi planı"` · `"etkinlik örnekleri"` · `"drama etkinlikleri pdf"`

> **Bu blok Youth kampanyasının en büyük tek israf riski.** Türkiye'de "yaratıcı drama" araması ağırlıklı olarak **öğretmen ve drama lideri adaylarından** geliyor. Bunlar bizim kitlemiz değil ve TBM'yi yukarı iten esas grup onlar.

### Okul / kurum arayanlar
`"okulu"` · `"özel okul"` · `"kolej"` · `"anaokulu"` · `"kreş"` · `"okul öncesi"` · `"etüt merkezi"` · `"kayıt ücretleri okul"` · `"burs sınavı"` · `"bursluluk sınavı"` · `"lgs"` · `"lgs hazırlık"` · `"yks"` · `"tyt"` · `"ayt"` · `"özel ders"` · `"etüt"`

### Yaş uyuşmazlığı — 10 yaş altı
`"3 yaş"` · `"4 yaş"` · `"5 yaş"` · `"6 yaş"` · `"7 yaş"` · `"8 yaş"` · `"9 yaş"` · `"okul öncesi drama"` · `"anaokulu drama"` · `"bebek"` · `"minik"` · `"minikler için"`

> Rakip analizi: rakiplerin ezici çoğunluğu 8–12 yaş. Bu negatifler bizi onların hacminden ayırıyor. **Ama dikkat:** `"10 yaş"` ve `"12 yaş"` negatif **değil**, anahtar kelime — programın alt sınırı 10.

### Yetişkin karışması
`"yetişkinler için"` · `"18 yaş üstü"` · `"yetişkin drama"` · `"çalışanlar için"` · `"iş ingilizcesi"`

### Dil okulu / sınav
`"dil okulu"` · `"ingilizce kursu fiyatları"` · `"sıfırdan ingilizce"` · `"a1"` · `"a2 seviye"` · `"ingilizce öğren"` · `"online ingilizce çocuk"` · `"ingilizce uygulama çocuk"` · `"duolingo"` · `"ielts"` · `"toefl"` · `"cambridge sınavı"` · `"yds"` · `"kelime ezberleme"` · `"ingilizce ödev"`

### Ajans / oyuncu arayanlar
`"çocuk oyuncu ajansı"` · `"çocuk oyuncu aranıyor"` · `"figüran"` · `"dizi için çocuk oyuncu"` · `"reklam çocuk oyuncu"` · `"casting başvurusu"` · `"manken ajansı"`

> **Kritik ve pahalı bir sızıntı.** "çocuk oyunculuk" araması yapan velilerin önemli bir kısmı eğitim değil **ajans** arıyor. Bu tıklar hem pahalı hem dönüşmez.

### Alakasız
`"çizgi film"` · `"çocuk şarkıları"` · `"doğum günü organizasyonu"` · `"animatör"` · `"palyaço"` · `"kukla gösterisi"` · `"tiyatro bileti"` · `"çocuk oyunu bileti"` · `"pdf"` · `"boyama"` · `"etkinlik sayfası"` · `"drama dizi"` · `"kore dizisi"`

---

## D) REKLAM METİNLERİ — EDY

> Kural 4 gereği "genç/gençler/gençlik" hiçbir başlıkta ve açıklamada yok.

### RSA · EDY-1 (Lise Çağı 15–17)
**Görünen yol:** `/lise-cagi` `/ingilizce-drama`

**Başlıklar**
1. Lise Çağı İngilizce Drama (25)
2. 15–17 Yaş Ayrı Grup (19)
3. İngilizce Tiyatro Programı (26)
4. 8 Ay · Haftada 1 Gün (20)
5. Seyircili Final Gösterisi (25)
6. 12 Kişilik Grup (15)
7. Ders Kitabı ve Sınav Yok (24)
8. Kadıköy ve Pera (15)
9. B1 Seviye Yeterli (17)
10. Sahnede İngilizce (17)
11. Ekim–Mayıs Dönemi (17)
12. Veli Onaylı Başvuru (19)

**Açıklamalar**
1. On beş-on yedi yaş kendi grubunda çalışıyor. On iki kişilik kapalı sınıf. (73)
2. İngilizce öğretmiyoruz, sahnede kullandırıyoruz. Ders kitabı ve sınav yok. (74)
3. Sekiz ay, haftada bir gün. Yıl seyircili bir final gösterisiyle kapanıyor. (74)
4. Başvuru veli onayıyla alınıyor. Form sitede, birkaç dakika sürüyor. (67)

---

### RSA · EDY-2 (Çocuk 10–14)
**Görünen yol:** `/10-14-yas` `/ingilizce-drama`

**Başlıklar**
1. 10–14 Yaş İngilizce Drama (25)
2. Çocuklar İçin Sahne (19)
3. Yaşa Göre Ayrı Sınıflar (23)
4. 8 Ay · Haftada 1 Gün (20)
5. Seyircili Final Gösterisi (25)
6. 12 Kişilik Grup (15)
7. Ders Kitabı ve Sınav Yok (24)
8. Kadıköy ve Pera (15)
9. Oyunla İngilizce Pratiği (24)
10. B1 Seviye Yeterli (17)
11. Ekim–Mayıs Dönemi (17)
12. Veli Onaylı Başvuru (19)

**Açıklamalar**
1. On-on dört yaş kendi sınıfında çalışıyor; büyük grupla karışmıyor. (66)
2. Oyun, doğaçlama ve karakter çalışmasıyla İngilizce kullanılıyor. (64)
3. Sekiz ay, haftada bir gün. Mayıs'ta seyirci önünde bir final gösterisi. (71)
4. Ders kitabı, sınav ve not yok. Başvuru veli onayıyla alınıyor. (62)

---

### RSA · EDY-3 (Veli Problemi)
**Görünen yol:** `/ingilizce-drama` `/10-17-yas`

**Başlıklar**
1. Dersi İyi, Konuşamıyor (22)
2. İngilizce Konuşma Çekingenliği (30)
3. Konuşmaya Gelince Susuyor (25)
4. Sahnede Konuşmak Zorunda (24)
5. İngilizce Drama Programı (24)
6. 10–17 Yaş · Ayrı Sınıflar (25)
7. 8 Ay · Haftada 1 Gün (20)
8. 12 Kişilik Grup (15)
9. Seyircili Final Gösterisi (25)
10. Ders Kitabı ve Sınav Yok (24)
11. Kadıköy ve Pera (15)
12. Veli Onaylı Başvuru (19)

**Açıklamalar**
1. İngilizce notu iyi ama konuşmaya gelince susuyorsa, sorun bilgi değil kullanım. (79)
2. Sahnede bir karakteri taşırken dili kullanmak zorunda kalıyor ve korkusu geçiyor. (81)
3. Sekiz ay, haftada bir gün, on iki kişilik sınıf. Yaş gruplarına göre ayrı. (74)
4. Ders kitabı, sınav ve not yok. Yıl seyircili bir gösteriyle kapanıyor. (70)

---

### RSA · EDY-4 (Kadıköy)
**Görünen yol:** `/kadikoy` `/ingilizce-drama`

**Başlıklar**
1. Kadıköy İngilizce Drama (23)
2. Anadolu Yakası (14)
3. 10–17 Yaş · Ayrı Sınıflar (25)
4. Cumartesi Grubu (15)
5. 8 Ay · Haftada 1 Gün (20)
6. 12 Kişilik Grup (15)
7. Seyircili Final Gösterisi (25)
8. Ders Kitabı ve Sınav Yok (24)
9. Sahnede İngilizce (17)
10. B1 Seviye Yeterli (17)
11. Ekim–Mayıs Dönemi (17)
12. Veli Onaylı Başvuru (19)

**Açıklamalar**
1. Kadıköy grubu cumartesi çalışıyor. Anadolu Yakası'ndan ulaşım kolay. (68)
2. Yaş gruplarına göre ayrı sınıflar: 10-14 ve 15-17 birlikte çalışmıyor. (70)
3. Sekiz ay, haftada bir gün, on iki kişilik sınıf. Sınav ve not yok. (66)
4. Yıl, seyirci önünde bir final gösterisiyle kapanıyor. Form sitede. (66)

---

### RSA · EDY-5 (Kategori)
**Görünen yol:** `/ingilizce-drama` `/10-17-yas`

**Başlıklar**
1. İngilizce Drama Kursu (21)
2. 10–17 Yaş Programı (18)
3. Yaşa Göre Ayrı Sınıflar (23)
4. İngilizce Tiyatro (17)
5. 8 Ay · Haftada 1 Gün (20)
6. Seyircili Final Gösterisi (25)
7. 12 Kişilik Grup (15)
8. Ders Kitabı ve Sınav Yok (24)
9. Kadıköy ve Pera (15)
10. B1 Seviye Yeterli (17)
11. Ekim–Mayıs Dönemi (17)
12. Veli Onaylı Başvuru (19)

**Açıklamalar**
1. İngilizce öğretmiyoruz, sahnede kullandırıyoruz. Ders kitabı ve sınav yok. (74)
2. On-on yedi yaş için yaratıcı drama ve sahne çalışması. Ayrı yaş sınıfları. (74)
3. Sekiz ay, haftada bir gün, on iki kişilik grup. Kadıköy ve Pera. (64)
4. Yıl seyircili bir final gösterisiyle kapanıyor. Başvuru veli onayıyla. (70)

---

## E) UZANTILAR — EDY

### Site bağlantısı (4 adet)
| Başlık (≤25) | Açıklama 1 (≤35) | Açıklama 2 (≤35) | URL |
|---|---|---|---|
| 15–17 Yaş Grubu (15) | Lise çağı ayrı sınıfta (22) | Gerçek metin, gerçek sahne (26) | `/gencler-icin-ingilizce-drama-istanbul` |
| 10–14 Yaş Grubu (15) | Oyun temelli, kendi sınıfında (29) | Yaşa göre ayrılmış gruplar (26) | `/cocuklar-icin-ingilizce-drama-istanbul` |
| Final Gösterisi (15) | Mayıs'ta seyirci önünde (23) | Sekiz ayın vardığı yer (22) | `/atolyeler/english-drama-youth` |
| Veli Başvuru Formu (18) | Birkaç dakika sürüyor (21) | Yaş ve seviye soruluyor (23) | `/atolyeler/english-drama-youth/kayit` |

### Öne çıkan site metni / açıklama metni (callout, ≤25)
`Yaşa göre ayrı sınıf` (20) · `12 kişilik gruplar` (18) · `Seyircili final` (15) · `Sınav ve not yok` (16) · `Kadıköy ve Pera` (15) · `Haftada tek gün` (15)

### Yapılandırılmış snippet
**Başlık:** Kurslar
**Değerler:** İngilizce drama (15) · Yaratıcı drama (14) · Sahne çalışması (15) · Doğaçlama (9) · Final gösterisi (15)

### Diğer arama uzantıları
- **Görsel uzantısı:** `english-drama-youth-01`, `english-drama-4` (`data.ts` id 9). **Uyarı:** Reşit olmayan katılımcıların yüzünün göründüğü görseller için veli izni gerekiyor; izinsiz görsel kullanılmamalı.
- **Potansiyel müşteri formu uzantısı:** ❌ **Kullanılmamalı.** Form reşit olmayan biri hakkında bilgi topluyor; başvuru veli onayıyla, kendi sitemizdeki `YouthRegistrationForm` üzerinden alınmalı (kod bu formu ayrıca yazmış — doğru karar).
- **Çağrı / fiyat / promosyon uzantısı:** ❌ Kurallar 1–3.
- **Konum uzantısı:** Kullanılmamalı — sabit bina yok.

---

## F) AÇILIŞ SAYFASI — EDY

| Grup | URL |
|---|---|
| EDY-1 | `https://www.technelabistanbul.com/gencler-icin-ingilizce-drama-istanbul` |
| EDY-2, EDY-3 | `https://www.technelabistanbul.com/cocuklar-icin-ingilizce-drama-istanbul` |
| EDY-4, EDY-5 | `https://www.technelabistanbul.com/atolyeler/english-drama-youth` |

**Mevcut durum:** İki yaş bandı için ayrı sayfa kurulmuş olması, bu hesabın en iyi SEO kararlarından biri — ve kampanya yapısı doğrudan bunun üzerine oturuyor.

**Eksikler:**
1. **Mekân çelişkisi (en kritik).** İki disiplin sayfası da "Kadıköy'deki partner stüdyomuzda" diyor; `data.ts` "Pera & Kadıköy" diyor ve Pera için 27 Eylül başlangıcı veriyor. Reklamda "Kadıköy ve Pera" yazıp yalnızca Kadıköy diyen sayfaya düşürmek, Avrupa yakası velisini kaybettirir. **Sayfalar düzeltilmeden Pera vaadi hiçbir metinde kullanılmamalı** — bu yüzden EDY-1'de "Kadıköy ve Pera" başlığı var ama grup açılış sayfası olarak `/gencler-icin...` seçilmişse önce sayfa güncellenmeli.
2. **13–17 bandı sayfada ayrıştırılmamış.** Rakip analizinin doğrudan önerisi: *"'10–17' yazınca veli çocuk programı diye okuyor."* `/gencler-icin-ingilizce-drama-istanbul` sayfası 15–17 diyor ama 13–14 arası boşta kalıyor — oysa asıl rakipsiz band 13–17. Sayfa başlıklarında bu bandın açıkça görünmesi gerekiyor.
3. **Fiyat gerekçesi yok.** Rakip analizinin uyarısı: bu, en savunması zor fiyat. Sayfada toplam saat sayısı, eğitmen niteliği ve prodüksiyon maliyeti (kostüm, ışık, mekân) ayrıştırılmış olarak görünmeli. Fiyat rakamı gizli kalabilir; **gerekçe gizli kalmamalı.**
4. **Veli SSS'i eksik.** Şu sorular sayfada yok ve WhatsApp'ta tekrar tekrar soruluyor olmalı: "Sekiz ay taahhüt mü?", "Sınav döneminde devamsızlık?", "Çocuğum utangaç, zorlanır mı?", "Ödeme nasıl yapılıyor?". `/gencler-icin...` sayfasında okul yoğunluğu sorusu var — diğerleri yok.
5. **`/basvuru` yok** — gerçek rota `/atolyeler/english-drama-youth/kayit` ve bu rota özel bir `YouthRegistrationForm` kullanıyor. Uzantıdaki link bu olmalı.

---

## G) BÜTÇE VE TEKLİF — EDY

**Günlük bütçe: ₺110**

**Gerekçe:** Üç program içinde **arama hacmi en yüksek**, **rekabet boşluğu en net** ve **sezonu şu anda** olan program bu. Rakip analizi 13–17 bandını boş olarak işaretliyor; brifing ise Youth kampanyasının 14 günde yalnızca ₺47 harcadığını (2 tık, 65 gösterim) gösteriyor — yani bu boşluğa hiç girilmemiş.

Ayrıca birim değeri en yüksek programlardan biri: tek bir kayıt, üç kampanyanın bir aylık toplam bütçesinin çok üzerinde. Dönüşüm başına maliyet toleransı burada en yüksek.

₺110'un ₺120 (EDL) değil de altında olmasının sebebi: veli kitlesi karar süresi uzun (2–6 hafta) ve program 8 aylık bir taahhüt. Eylül–Ekim'de dönüşmeyen tıklar Kasım'da dönüşmüyor, kaybediliyor. Bu yüzden bütçe sezona sıkıştırılmalı, yıla yayılmamalı.

**Teklif stratejisi:** **Manuel TBM**, tavanlar: Lise Çağı ₺26 · Çocuk ₺24 · Veli Problemi ₺18 · Kadıköy ₺24 · Kategori ₺24.

**Sezon takvimi:**
- **2–26 Eylül:** ₺110/gün (tam güç — Pera 27 Eylül, Kadıköy 3 Ekim başlıyor)
- **27 Eylül–15 Ekim:** ₺70/gün (geç kalanlar; kontenjan 12 ve gruplar başlamış oluyor)
- **16 Ekim sonrası:** ₺25/gün ya da duraklat. Bir sonraki gerçek pencere **Ocak (karne)** ve **Haziran (yaz planı)**.

> **Not:** Bu, üç kampanyanın toplamını ₺280/gün yapıyor. Hesabın fiili harcama kapasitesi ₺90/gün olduğu için gerçek harcamanın **₺150–200/gün** bandında kalması bekleniyor. Bütçe bir tavan, bir hedef değil — mevcut ₺550'lik bütçenin ₺90 harcanmasının sebebi bütçe azlığı değil, yapı bozukluğuydu.

---

## H) YARATICI ÇÖZÜMLER — EDY

**1. Yaş bandını reklam grubu değil, kampanya vaadi hâline getir**
Rakip analizinin en somut bulgusu: 13–17 bandı boş, ama biz "10–17" diyerek kendimizi çocuk programı gibi gösteriyoruz. EDY-1'in tüm metni bu yüzden "15–17 Yaş Ayrı Grup" ve "Lise Çağı" üzerine kuruldu. **Neden işe yarar:** Lise velisi "10–17" ifadesini görünce elenir — çocuğunun küçüklerle aynı sınıfta olacağını varsayar. "Ayrı sınıf" vaadi, bu bandın tek satın alma engelini kaldırıyor ve rakibin hiç söylemediği şey.

**2. Karne ve dönem takvimine bağlı otomatik kampanya**
Bu programın arama hacmi yıl boyunca düz değil: Eylül (okul açılışı), Ocak (karne), Haziran (yaz planı) üç tepe yapıyor. Google Ads kampanya zamanlaması bu üç pencereye kurulmalı, aradaki aylarda ₺25'e düşürülmeli. **Neden işe yarar:** 8 aylık bir programı Şubat'ta satamayız; o aylardaki bütçe EDL'e aktarılırsa aynı para iki kat iş yapar.

**3. "Çocuğum ingilizce konuşamıyor" makalesi + veli yeniden pazarlama listesi**
EDY-3'ün gerçek açılış sayfası bir makale olmalı: *"İngilizce notu iyi ama konuşamıyor: neden?"* Bu, velinin sorusunun birebir karşılığı ve Türkiye'de kurumsal bir cevabı yok. Makaleyi okuyanlar listeye alınıp EDY-1 ve EDY-2'de RLSA ile +%50 teklifle geri hedeflenmeli. **Neden işe yarar:** Veli kararı 2–6 haftada veriyor; ilk temasta dönüşmüyor. Liste olmadan o kişiyi bir daha bulamıyoruz.

**4. Semt yarıçapı + ulaşım vaadi**
`disiplinler.ts` Üsküdar, Ataşehir ve Maltepe'den öğrenci geldiğini yazıyor. Bu semtler EDY-4'e kelime olarak eklendi. Hacim doğrulanırsa EDY-4 ayrı kampanyaya çıkarılıp Kadıköy merkez 8 km yarıçapına alınmalı. **Neden işe yarar:** Veli için asıl kısıt para değil **her hafta çocuğu getirip götürmek**. Semt adı geçen bir reklam bu itirazı başlıkta karşılıyor.

**5. Gün ve saat ayarı — velinin araştırma saati**
Öneri: Hafta içi 21:00–00:00 **+%25** (çocuk yattıktan sonra), Pazar 10:00–16:00 **+%20**, hafta içi mesai saatleri **−%15**.
**DOĞRULANMALI:** Varsayım; hesapta saat kırılımı yok. 21 gün veri toplanmadan uygulanmamalı.

**6. Politika riskini önden yönet**
Brifing kural 4'ün gerekçesini "politika ihlali veriyor" diye yazıyor — yani bu daha önce yaşanmış. Reşit olmayanlara yönelik programların reklamları ek politika denetimine giriyor. **Öneri:** Kampanya "Reklam Grubu 1" gibi yeni bir grupla değil, tek tek gruplarla yayına alınsın; ilk 48 saat her grup ayrı ayrı onay durumu için izlensin. Bir grup reddedilirse diğerleri yayında kalır. **Neden işe yarar:** Geçen sefer tüm kampanya durmuş olabilir; grup grup yayına almak riski böler.

**7. Kontenjanı zamanlama aracı olarak kullan (fiyat söylemeden)**
Kural 2 ve 3 fiyat ve indirim rakamını yasaklıyor — ama **kontenjan sayısı serbest** ve `data.ts` net: 12 kişi. "12 Kişilik Grup" başlığı bu yüzden her RSA'da var. **Neden işe yarar:** Aciliyet duygusunu indirimle değil kıtlıkla kuruyoruz; bu hem markanın tonuna uygun hem de doğru.

---
---

# 4 · ÖZET TABLO

| Kampanya | Günlük bütçe | Reklam grubu | Teklif | Sezon penceresi |
|---|---|---|---|---|
| TL - EDL Yetişkin İngilizce Drama | ₺120 | 6 (+1 opsiyonel konquest) | Manuel TBM ₺12–28 | 2–15 Eylül tepe |
| TL - EAP İngilizce Oyunculuk | ₺50 | 4 (+1 opsiyonel konquest) | Manuel TBM ₺15–30 | 2–26 Eylül |
| TL - EDY Veli 10–17 | ₺110 | 5 (+1 Pera, sayfa düzeltilince) | Manuel TBM ₺18–26 | 2 Eylül–15 Ekim tepe |
| **Toplam** | **₺280** | **15 çekirdek / 18 tam** | | |

## Uygulama sırası
1. `03-negatif-kelimeler.csv` içindeki tek kelimelik geniş negatifleri hesaptan kaldır (bkz. 0.4) — **her şeyden önce**
2. Google Ads dönüşüm etiketinin (`AW-`) canlıda çalıştığını doğrula; form gönderimi ve WhatsApp tıklaması dönüşüm olarak içe aktarılıyor mu
3. Mevcut "TL - Yetiskin Programlar" ve "TL - Youth Veli" kampanyalarını duraklat (silme — arama terimi geçmişi lazım)
4. Üç yeni kampanyayı grup grup yayına al, ilk 48 saat onay durumlarını izle
5. 3, 7, 14 ve 30. günlerde arama terimi raporu; her raporda yeni negatifleri öbek olarak ekle
6. 30. gün: hangi grup gerçekten hacim taşıyor — bütçeyi ona kaydır, taşımayanı kapat
