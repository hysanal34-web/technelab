# Techne Lab — Instagram Otomatik Mesaj Şablonları
**2026–27 sezonu · son güncelleme 6 Eylül 2026**

Broşürler: `brosurler-2026-v2/` — 14 PDF, sitenin kendi sunucusunda (`public/dosyalar/`).
- **Türkçe:** 6 tekil program (3 sayfa: program → SSS → diğer programlar & ücretler) + `00-Tum-Programlar.pdf` (8 sayfa: kapak → 6 program → takvim & iletişim)
- **İngilizce:** `EN/` klasöründe aynı yapıda 6 tekil + `00-All-Programs-EN.pdf`

---

## 0 · Kısa linkler — 14/14 canlı ✓

Google Drive'dan tamamen çıktık (6 Eylül) — Drive giriş ekranı gösterdiği ve bazı adresleri zorla indirdiği için güvenilmezdi. PDF'lerin hepsi artık **kendi sitemizde**; linkler dosyayı doğrudan tarayıcıda açıyor, giriş istemiyor, indirmiyor.

| # | Program | Kısa link |
|---|---------|-----------|
| 01 | The Auteur Lab | technelabistanbul.com/p/auteur |
| 02 | English Drama Lab | technelabistanbul.com/p/edl |
| 03 | English Acting Praxis | technelabistanbul.com/p/praxis |
| 04 | English Drama Youth | technelabistanbul.com/p/youth |
| 05 | Techne Musical Lab | technelabistanbul.com/p/musical |
| 06 | Broadway Musical Dance | technelabistanbul.com/p/broadway |
| — | Tüm Programlar (TR, 8 sayfa) | technelabistanbul.com/p/all |
| 01-EN | The Auteur Lab (EN) | technelabistanbul.com/p/auteur-en |
| 02-EN | English Drama Lab (EN) | technelabistanbul.com/p/edl-en |
| 03-EN | English Acting Praxis (EN) | technelabistanbul.com/p/praxis-en |
| 04-EN | English Drama Youth (EN) | technelabistanbul.com/p/youth-en |
| 05-EN | Techne Musical Lab (EN) | technelabistanbul.com/p/musical-en |
| 06-EN | Broadway Musical Dance (EN) | technelabistanbul.com/p/broadway-en |
| — | All Programs (EN, 8 sayfa) | technelabistanbul.com/p/all-en |

Fiyat sadece linkin sahibine görünür: site menüsünde, sitemap'te ya da Google'da bu adresler yok, `robots.ts` de ayrıca engelliyor.

Bir PDF içeriği değişirse: yeni dosyayı `public/dosyalar/<slug>.pdf` üzerine yaz, deploy et — reklam metnine dokunmana gerek yok. Yeni bir broşür eklersen `next.config.mjs`'teki `BROSUR_LINKLERI` listesine bir satır eklemen yeterli.

**Sabitler:** form `technelabistanbul.com/tanisma-gunu` · WhatsApp `0552 242 59 71`

> **Hangi bölümü kullanacaksın?**
> **B** ve **C** = elle yazdığın DM yanıtları (uzun, ayrıntılı).
> **D** = reklam otomatik yanıtı ve buz kırıcılar (500 / 80 karakter limitine sığar).

---

# A · GİRİŞ MESAJLARI

## A1 · Karşılama (ilk mesaj / genel otomatik yanıt)

```
Merhaba, Techne Lab'e hoş geldiniz.

2026–27 sezonunda altı program açıyoruz — yaratıcı yazarlıktan İngilizce dramaya, müzikalden Broadway dansına.

Hangisini merak ediyorsunuz? Yazın, o programın bütün ayrıntılarını (içerik, tarih, ücret) tek bir dosyada göndereyim.

Eylül'de hepsinin ücretsiz bir tanışma atölyesi var; kayıt olmadan gelip görebilirsiniz.
```

## A2 · Program menüsü (ne istediğini bilmeyenler için)

```
Programlar şöyle:

01 · The Auteur Lab — yaratıcı yazarlık & dramaturji (Kadıköy, Türkçe)
02 · English Drama Lab — yetişkinlere İngilizce drama (Pera & Kadıköy)
03 · English Acting Praxis — İngilizce oyunculuk + masterclass (Pera)
04 · English Drama Youth — 10–17 yaş İngilizce drama (Pera & Kadıköy)
05 · Techne Musical Lab — drama, şan ve dans bir arada (Kadıköy)
06 · Broadway Musical Dance — jazz & theatre dance (Kadıköy & Taksim)

Numarasını ya da adını yazmanız yeterli, dosyasını hemen ileteyim.
```

## A3 · İngilizce karşılama

```
Hello, and welcome to Techne Lab.

We run three programs entirely in English: English Drama Lab (adults), English Acting Praxis (acting + masterclass) and English Drama Youth (ages 10–17).

Tell me which one you're curious about and I'll send you the full details — content, dates and fees — in one file.

Each one has a free intro workshop in September; you can just come and see.
```

---

# B · PROGRAMA ÖZEL MESAJLAR

## B1 · The Auteur Lab

```
The Auteur Lab — yaratıcı yazarlık ve dramaturji.

Sophokles'ten Beckett'e uzanan bir okuma hattı: bir metnin neden işlediğini görüyor, sonra kendi metninizi kuruyorsunuz. Daha önce hiç yazmamış olmanız sorun değil. Roman, senaryo, oyun — üçü de aynı zeminden besleniyor.

Yürütücü: Halil Yağız Şanal — oyun yazarı, tiyatro yönetmeni ve dramaturg.

Kadıköy · Türkçe · 8 hafta / modül, 3 modül · en fazla 10 kişi
Başlangıç: 7 Ekim Çarşamba

Ücretsiz tanışma atölyesi: 12 Eylül Cumartesi 16:30, Kadıköy.

Ücret, ödeme ve bütün ayrıntılar dosyada: technelabistanbul.com/p/auteur
Yer ayırtmak için: technelabistanbul.com/tanisma-gunu
```

## B2 · English Drama Lab

```
English Drama Lab — yetişkinlere İngilizce drama.

Kitap yok, gramer anlatımı yok, sınav yok. Sahnede bir durumun içindesiniz ve düşünüp çevirecek zamanınız olmadan cevap vermeniz gerekiyor. Dil tam da orada açılıyor. B1 ve üzeri yeterli, seviye testi yok.

Eğitmenler: Alara Lokum, Ece Ertez ve Yeşim Çelebi.

Taksim Pera & Kadıköy · en fazla 12 kişi · 12/6/4 haftalık paketler
Başlangıç: Pera 3 Ekim Cumartesi 15:00 · Kadıköy 14 Eylül Pazartesi 20:00

Ücretsiz tanışma atölyesi: Kadıköy 12 Eylül Cumartesi 14:00 · Pera 19 Eylül Cumartesi 15:00.

Ücret, ödeme ve bütün ayrıntılar dosyada: technelabistanbul.com/p/edl
Yer ayırtmak için: technelabistanbul.com/tanisma-gunu
```

**İngilizce sürüm**

```
English Drama Lab — creative drama in English, for adults.

No textbook, no grammar drills, no exams. You're inside a situation on stage and you have to respond before you can translate — that's where the language opens up. B1 and above; no placement test.

Taught by Alara Lokum, Ece Ertez and Yeşim Çelebi.

Taksim Pera & Kadıköy · max 12 people · open enrolment, monthly
Starts: Pera Sat 3 October 15:00 · Kadıköy Mon 14 September 20:00

Free intro workshop: Kadıköy Sat 12 Sept 14:00 · Pera Sat 19 Sept 15:00.

Fees and full details: technelabistanbul.com/p/edl-en
To reserve a place: technelabistanbul.com/tanisma-gunu
```

## B3 · English Acting Praxis

```
English Acting Praxis — Ece Ertez ile 12 hafta, tamamen İngilizce oyunculuk.

Program, Harika Uygur ile bir günlük masterclass ve kamera önü audition günüyle bitiyor; o gün çekilen kayıtlar size teslim ediliyor — doğrudan showreel olarak kullanabiliyorsunuz. Profesyonel oyuncu olmanız gerekmiyor, B1 İngilizce yeterli.

Eğitmen: Ece Ertez. Masterclass ve audition gününü cast direktörü Harika Uygur yürütüyor.

Taksim Pera · 12 hafta · en fazla 14 kişi
Başlangıç: 3 Ekim Cumartesi 11:00

Ücretsiz tanışma atölyesi: 19 Eylül Cumartesi 17:00, Taksim Pera.

Ücret, ödeme ve bütün ayrıntılar dosyada: technelabistanbul.com/p/praxis
Yer ayırtmak için: technelabistanbul.com/tanisma-gunu
```

**İngilizce sürüm**

```
English Acting Praxis — 12 weeks of acting, entirely in English, with Ece Ertez.

The program closes with a one-day masterclass and a filmed audition day with casting director Harika Uygur; the recordings are delivered to you and can go straight into your showreel. You don't need to be a professional actor — B1 English is enough.

Taught by Ece Ertez; the masterclass and audition day are run by casting director Harika Uygur.

Taksim Pera · 12 weeks · max 14 people
Starts: Saturday 3 October, 11:00

Free intro workshop: Saturday 19 September, 17:00, Taksim Pera.

Fees and full details: technelabistanbul.com/p/praxis-en
To reserve a place: technelabistanbul.com/tanisma-gunu
```

## B4 · English Drama Youth (10–17)

```
English Drama Youth — 10–17 yaş, İngilizce yaratıcı drama.

Çocuğun okulda öğrendiği İngilizceyi konuşulan dile çeviriyoruz. Kitap, sınav ve not yok; sahnede bir durumun içinde konuşmak zorunda kalıyor ve dil orada açılıyor. 10–14 ve 15–17 ayrı gruplarda çalışıyor, sezon seyirci önünde bir gösteriyle bitiyor.

Eğitmen: Alara Lokum — oyuncu ve İngilizce drama eğitmeni.

Taksim Pera & Kadıköy · 8 ay, haftada 1 gün · en fazla 12 kişi
Başlangıç: Kadıköy 3 Ekim · Pera 4 Ekim Pazar 13:00

Ücretsiz tanışma atölyesi (veli katılımıyla): Kadıköy 12 Eylül Cumartesi 13:00 · Pera 13 Eylül Pazar 13:00.

Burs: bu programda %25'e varan burs imkânı var — kısa bir başvuru metninin değerlendirilmesiyle veriliyor.

Ücret, ödeme ve bütün ayrıntılar dosyada: technelabistanbul.com/p/youth
Yer ayırtmak için: technelabistanbul.com/tanisma-gunu
```

**İngilizce sürüm**

```
English Drama Youth — creative drama in English, ages 10–17.

We turn the English they already have into speech. No textbook, no exams, no grades — on stage they're inside a situation and have to speak, and that's where the language opens up. Separate groups for 10–14 and 15–17; the season ends with a performance for an audience.

Taught by Alara Lokum, actor and English drama teacher.

Taksim Pera & Kadıköy · 8 months, one day a week · max 12 per group
Starts: Kadıköy 3 October · Pera Sunday 4 October, 13:00

Free intro workshop (parents welcome): Kadıköy Sat 12 Sept 13:00 · Pera Sun 13 Sept 13:00.

Scholarship: up to 25% is available on this programme, awarded on a short written application.

Fees and full details: technelabistanbul.com/p/youth-en
To reserve a place: technelabistanbul.com/tanisma-gunu
```

## B5 · Techne Musical Lab

```
Techne Musical Lab — drama, şan ve dans bir arada.

Sekiz ay boyunca oyunculuk, ses ve hareket tek bir sahne dilinde buluşuyor; sezon sonunda seyircinin karşısına çıkıyorsunuz. Dans ya da şan geçmişi şart değil — temelden başlıyoruz.

Eğitmenler: Köksal Ünal (dans ve koreografi) ve Sitare Bilge (ses ve şan).

Kadıköy · 15–55 yaş · 8 ay, haftada 2 gün · en fazla 12 kişi
Başlangıç: 28 Eylül Pazartesi

Ücretsiz tanışma atölyesi: 12 Eylül Cumartesi 18:30, Kadıköy (Broadway Musical Dance ile aynı seans).

Burs: bu programda %25'e varan burs imkânı var — kısa bir başvuru metninin değerlendirilmesiyle veriliyor.

Ücret, ödeme ve bütün ayrıntılar dosyada: technelabistanbul.com/p/musical
Yer ayırtmak için: technelabistanbul.com/tanisma-gunu
```

## B6 · Broadway Musical Dance

```
Broadway Musical Dance — jazz, theatre dance ve koreografi.

Teknik temelden başlıyoruz: hizalama, ritim, koordinasyon. Sonra bir koreografiyi baştan sona kuruyoruz. Dans deneyimi şart değil.

Eğitmen: Köksal Ünal — koreograf; Broadway dansı ve sahne koreografisi.

Kadıköy & Taksim · 12–55 yaş · 12 hafta ya da 6 hafta · en fazla 15 kişi
Başlangıç: Kadıköy 1 Ekim Perşembe · Taksim Pera 3 Ekim Cumartesi 19:00

Ücretsiz tanışma atölyesi: Kadıköy 12 Eylül Cumartesi 18:30 (Techne Musical Lab ile aynı seans) · Pera 19 Eylül Cumartesi 19:00. Rahat kıyafetle gelin.

Ücret, ödeme ve bütün ayrıntılar dosyada: technelabistanbul.com/p/broadway
Yer ayırtmak için: technelabistanbul.com/tanisma-gunu
```

---

# C · SIK GELEN SORULARA HAZIR YANITLAR

## C1 · "Fiyat ne kadar?"

```
Ücretler programa göre değişiyor — süre, haftalık gün sayısı ve grup büyüklüğüne göre.

Hangi programı soruyorsanız dosyasını göndereyim: ücret, ödeme seçenekleri, taksit, burs ve erken kayıt indirimi hepsi içinde yazıyor.

Programlar: The Auteur Lab · English Drama Lab · English Acting Praxis · English Drama Youth · Techne Musical Lab · Broadway Musical Dance
```

## C2 · "Tanışma günü ne zaman?"

```
Eylül'de üç tanışma günümüz var, katılım ücretsiz:

12 Eylül Cumartesi · Kadıköy (tek gün, tüm Kadıköy programları)
  13:00 English Drama Youth · 14:00 English Drama Lab
  16:30 The Auteur Lab · 18:30 Broadway Musical Dance & Techne Musical Lab (aynı seans)

13 Eylül Pazar
  13:00 English Drama Youth (Taksim Pera)

19 Eylül Cumartesi · Taksim Pera
  15:00 English Drama Lab · 17:00 English Acting Praxis · 19:00 Broadway Musical Dance

Yerinizi ayırmak için: technelabistanbul.com/tanisma-gunu
Formu doldurduğunuzda mekân ve saat bilgisini iletiyoruz.
```

## C3 · "Hiç deneyimim yok, olur mu?"

```
Olur — programların hepsi başlangıç seviyesinden kurulu.

Yazarlıkta teknikle değil okumayla başlıyoruz. İngilizce programlarda seviye testi yok, sohbet edebiliyorsanız yeterli. Dans ve müzikalde temelden başlıyoruz; kabul için yetenek değil, çalışma isteğine bakıyoruz.

En doğrusu tanışma atölyesine gelip bir örnek çalışmayı görmeniz — ücretsiz ve taahhütsüz: technelabistanbul.com/tanisma-gunu
```

## C4 · "Burs / indirim var mı?"

```
Var, üç başlıkta:

Erken kayıt — 10 Eylül 2026'ya kadar kayıt olanlar için.
Öğrenci indirimi — English Drama Lab'de geçerli; erken kayıtla birleşebiliyor.
Burs — The Auteur Lab, Techne Musical Lab ve English Drama Youth'ta. Kısa bir başvuru metninin değerlendirilmesiyle veriliyor, erken kayıtla birleşmiyor.

Oranlar ve ödeme seçenekleri programın dosyasında yazıyor. Hangisi için bakalım, göndereyim.
```

## C5 · "Adres neresi?"

```
İki mekânımız var:

Kadıköy — Ayrılıkçeşme metro/Marmaray çıkışına 8 dakika yürüme.
Taksim Pera — Taksim ve Şişhane'den yürüme mesafesinde.

Tam adresi ve kapı tarifini, hangi güne geleceğiniz netleştiğinde yazıyoruz. Tanışma atölyesi için formu doldurmanız yeterli: technelabistanbul.com/tanisma-gunu
```

## C6 · Kapanış / takip mesajı

```
Aklınıza takılan olursa buradan yazabilirsiniz — ya da 0552 242 59 71.

Gruplar en fazla 10–15 kişi olduğu için tanışma günlerinde yer sınırlı; gelmeyi düşünüyorsanız formu doldurup yerinizi ayırtmanızı öneririm: technelabistanbul.com/tanisma-gunu
```

---

# D · REKLAM İÇİN KISA SÜRÜMLER

Meta reklam otomatik yanıtı **500 karakterle** sınırlı, Instagram "buz kırıcı" (icebreaker) ise **80 karakter**. Aşağıdakiler o limitlere göre yazıldı — B bölümündeki uzun sürümler elle yazdığın DM yanıtları için duruyor.

En aza indirildi: tek cümle tanıtım + başlangıç ve tanışma tarihi + iki link. Fiyat yok, dosyada. Not: iki link tek başına ~110 karakter, mesajların alt sınırı bu. Drama Lab ve Praxis burada yalnızca İngilizce — Türkçe soran olursa B bölümündeki uzun sürümleri kullan.

---

## D1 · Karşılama (reklam greeting)

```
Merhaba! Hangi programı merak ediyorsunuz? Ayrıntıları tek dosyada göndereyim.

Eylül'de her programın ücretsiz tanışma atölyesi var.
```

## D2 · The Auteur Lab

```
The Auteur Lab — yaratıcı yazarlık ve dramaturji.

7 Ekim başlıyor · Ücretsiz tanışma 12 Eylül 16:30

Detaylar: technelabistanbul.com/p/auteur
Kayıt: technelabistanbul.com/tanisma-gunu
```

## D3 · English Drama Lab

```
English Drama Lab — creative drama in English, for adults.

Starts 3 Oct Pera · 14 Sept Kadıköy
Free intro 12 & 19 Sept

Details: technelabistanbul.com/p/edl-en
Book: technelabistanbul.com/tanisma-gunu
```

## D4 · English Acting Praxis

```
English Acting Praxis — acting in English, 12 weeks. Ends with a filmed audition day.

Starts 3 Oct · Free intro 19 Sept 17:00

Details: technelabistanbul.com/p/praxis-en
Book: technelabistanbul.com/tanisma-gunu
```

## D5 · English Drama Youth (10–17)

```
English Drama Youth — 10–17 yaş İngilizce drama.

3–4 Ekim başlıyor · Ücretsiz tanışma 12 & 13 Eylül
%25'e varan burs imkânı

Detaylar: technelabistanbul.com/p/youth
Kayıt: technelabistanbul.com/tanisma-gunu
```

**İngilizce**

```
English Drama Youth — drama in English, ages 10–17.

Starts 3–4 Oct · Free intro 12 & 13 Sept
Up to 25% scholarship available

Details: technelabistanbul.com/p/youth-en
Book: technelabistanbul.com/tanisma-gunu
```

## D6 · Techne Musical Lab

```
Techne Musical Lab — oyunculuk, şan ve dans bir arada.

28 Eylül başlıyor · Ücretsiz tanışma 12 Eylül 18:30
%25'e varan burs imkânı

Detaylar: technelabistanbul.com/p/musical
Kayıt: technelabistanbul.com/tanisma-gunu
```

## D7 · Broadway Musical Dance

```
Broadway Musical Dance — jazz ve theatre dance.

1 Ekim Kadıköy · 3 Ekim Pera · Ücretsiz tanışma 12 & 19 Eylül

Detaylar: technelabistanbul.com/p/broadway
Kayıt: technelabistanbul.com/tanisma-gunu
```

---

## D8 · Buz kırıcılar (icebreaker · en fazla 80 karakter)

Instagram profilinde ya da reklamda hızlı yanıt butonu olarak:

```
Hangi programlar var?
```
```
Tanışma günleri ne zaman?
```
```
Ücretler ne kadar?
```
```
İngilizce programları anlatır mısınız?
```
```
Çocuğum için hangi program uygun?
```
```
Burs var mı?
```

---

## Notlar

- Hiçbir metinde "ders" kelimesi geçmiyor — her yerde "atölye" / "workshop" / "çalışma".
- "Ücretsiz" cümle içinde, rozet gibi bağırmadan yazıldı.
- Tarihler `src/lib/data.ts` ve `sessions.ts` ile birebir aynı.
- PDF'lerin 3. sayfasında diğer programların özeti ve ücretleri var; kişi tek dosyayla bütün sezonu görüyor.
- Fiyat yalnızca PDF'lerde. Mesaj şablonlarının hiçbirinde rakam yok.
- İngilizce broşürlerde Auteur Lab ve Musical Lab'in Türkçe yürüdüğü açıkça yazıyor.
