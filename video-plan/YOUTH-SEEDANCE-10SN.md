# ENGLISH DRAMA YOUTH — Seedance 2.5 · 10 saniye
## Velinin kalbine giden tek fikir

---

## 1 · MARKA ANALİZİ — neden bu reklam Techne Lab'e yakışır

**Techne Lab bir kurs değil, üreten bir tiyatro şirketi.** Bu cümle her şeyi belirliyor.
Kurs reklamı "öğretiriz" der. Techne Lab "deneyimleriz" der. Kurs reklamı gülen çocuk
yüzü gösterir. Techne Lab **sahne** gösterir — karanlık, tek ışık, hareket.

Görsel kimlik: siyah zemin, neon yeşil `#C8FF00`, Bauhaus × Berlin underground. Kanıtlanmış
video formülü (Kling/Higgsfield'da tutan): **siyah-beyaz + neon iz + mid-action hook.**
Ton: iddiasız, keskin, ünlem yok. Övmez, gösterir.

Bu reklam o formülü velinin duygusuna bağlıyor.

---

## 2 · KİTLE ANALİZİ — veli tam olarak neyi yaşıyor

35–55 yaş, beyaz yakalı, İstanbul. Çocuğu özel okulda ya da yıllardır kursta. Çocuğun
İngilizce sınav notu iyi. **Ama:**

- Turist adres sorduğunda çocuk susuyor, veli araya giriyor.
- Yurtdışı tatilinde restoranda sipariş vermiyor.
- Online İngilizce derslerinde kamerası kapalı.
- "Biliyor ama konuşmuyor" — veli bunu kaç kere söyledi.

Velinin acısı **bilgi eksikliği değil.** Yıllarca ödediği şeyin çıktısı sessizlik. Suçlu
arıyor ama bulamıyor — çocuk çalışkan, okul iyi, kurs pahalı. Sorun ne?

Sorun şu: **kullanacak yer yok.** Sınıf kullanma yeri değil, ölçme yeri. Konuşma kulübü
masa başı, zorlama. Çocuğun dili bir *durumun* içinde, cevap vermek *zorunda kalarak*
açılır. Bu yer sahne.

Veli bunu duyunca iki şey hisseder: **"Sonunda biri sorunu doğru koydu"** ve rahatlama.
Reklam korku satmıyor — tanınma ve rahatlama satıyor.

---

## 3 · FİKİR — üç vuruş, on saniye

**İngilizcesi var. / Kullanacak yeri yoktu. / Artık var.**

Bütün mesaj üç cümle. Görüntü üç vuruş:

| Vuruş | Süre | Ne görüyoruz | Veli ne hissediyor |
|---|---|---|---|
| **Sessizlik** | 0–3 sn | Boş sahnenin kenarında tek başına oturan ergen. Metin kucağında, dudakları sessiz kıpırdıyor. Omuzlar içe kapalı. Siyah-beyaz, tek soğuk çalışma ışığı. | *"Bu benim çocuğum."* |
| **Açılma** | 3–7,5 sn | Yukarıdan neon huzme iner. Ergen ayağa kalkıp ışığa girer, kollar açılır. Karanlığın kenarından beş arkadaş gülerek koşup gelir, halka kurulur. Hareket neon iz bırakır. | *"Böyle olabilir mi?"* |
| **Veli** | 7,5–10 sn | Odanın arkasından geniş plan. Ön planda kapı eşiğinde duran **veli silueti** — arkadan aydınlanmış, eli kapı pervazında, izliyor. Uzakta sahnede çocuk, ışığın içinde, canlı. | *"Bunu görmek istiyorum."* |

Üçüncü vuruş reklamın kalbi. Veli kendini kapıda görüyor. Çocuğunu değil — **kendini,
çocuğunu izlerken.** Her velinin istediği an bu.

---

## 4 · SEEDANCE 2.5 PROMPTU — kopyala-yapıştır

```
Black and white cinematic film, vertical 9:16, 35mm grain, deep blacks, high contrast.
The only color in the entire film is a single neon green light (#C8FF00).
No faces are ever clearly visible — silhouettes, backs, shoulders, hands only.

SHOT 1 (0–3s): An empty small theatre stage, seen from behind and slightly to the
side. A teenager, around 15, sits alone on the edge of the stage, back to camera,
shoulders curled inward, a few script pages resting in their lap. Their head is bowed;
we sense lips moving silently but see no face. One cold overhead work light, dust
drifting through it. Everything else is black. The camera is locked and still.
Silence, isolation, waiting.

SHOT 2 (3–7.5s): A hard vertical beam of neon green light suddenly cuts down from
above onto the stage. The teenager rises into it in one fluid motion, script pages
falling from their lap, arms opening wide as they turn — we see only their silhouette
against the green, never their face. From the darkness at both edges of the frame,
five other teenagers rush in laughing, bodies in motion, circling the first one, a
hand raised in a high-five, someone spinning. Their movement leaves faint neon light
trails in the air. The camera pushes in slowly toward the group. Energy, release,
the room coming alive.

SHOT 3 (7.5–10s): Cut to a wide shot from the very back of the room, looking toward
the stage. In the immediate foreground, the black silhouette of an adult standing in
a doorway, backlit by warm light from the corridor behind them, one hand resting on
the door frame — a parent, watching, completely still. Far beyond them, small in the
frame, the stage glows green and the teenagers move within the light, the first
teenager now standing tall mid-gesture at the center. The camera drifts forward very
slowly over the parent's shoulder toward the stage. Hold on this. Quiet, tender,
the moment a parent sees their child become themselves.

Documentary realism, natural handheld micro-movement only in shot 2, locked camera in
shots 1 and 3. No text, no subtitles, no captions, no logos, no watermarks.
```

### API parametreleri (kredi geldiğinde ben basarım)

```
model: seedance_2_5
duration: 10
aspect_ratio: 9:16
resolution: 1080p
generate_audio: false       ← ses susturulacak, IG trend müziği eklenecek (marka kuralı)
mode: t2v
```

---

## 5 · YAZI KATMANI — ffmpeg ile üstüne basılacak

Beyaz + neon, sıkıştırılmış grotesk, büyük harf, ekranın **üst üçte biri**
(Reels arayüzü altı kapatır).

```
0,4 – 2,8 sn    İNGİLİZCESİ VAR.                    beyaz
3,4 – 7,0 sn    KULLANACAK YERİ YOKTU.              beyaz, "YOKTU" neon
7,8 – 10,0 sn   ARTIK VAR.                          neon, büyük
8,6 – 10,0 sn   ENGLISH DRAMA YOUTH · 10–17 YAŞ     beyaz küçük, altında
                DM'den yaz                          neon küçük
```

Yazı ritmi görüntüyü takip ediyor: her cümle vuruşun ortasında girer, kesmeden önce çıkar.
"ARTIK VAR" veli silueti göründükten 0,3 sn sonra — önce görüntü, sonra söz.

---

## 6 · REELS AÇIKLAMASI

```
İngilizcesi var. Kullanacak yeri yoktu.

Sınav notu iyi ama turist adres sorunca susuyor mu? Sorun bilgi değil —
sorun, dili bir durumun içinde kullanmak zorunda kaldığı bir yerin olmaması.

Dil öğretmiyoruz. Dili sahnede deneyimliyoruz. Ders kitabı yok,
sınav yok, not yok. Doğaçlama, karakter, metin — hepsi İngilizce.

Alara Lokum yürütücülüğünde sekiz ay, haftada bir gün. Mayıs'ta seyirci
önünde bir final gösterisi var. Siz de oradasınız.

10–17 yaş · Hafta sonu · Pera ve Kadıköy · B1 ve üzeri
Erken kayıt 10 Eylül'e kadar

Detaylar ve takvim için yazın.
```

"Siz de oradasınız." — açıklamadaki tek yeni cümle. Videodaki kapı eşiği anını
metne bağlıyor.

---

## 7 · NOTLAR

- **Yüz yok** kuralı bilinçli: Meta politikası + veli AI yüzünü anlar + yüz olmayınca veli
  kendi çocuğunu koyar. Seedance'e "no faces clearly visible" üç kez söylendi; yine de
  çıktıda yüz netleşirse `image_apply_gaussian_blur` ile o kareler yumuşatılır.
- Fiyat, telefon, burs **yok**. "Genç" kelimesi yok — "10–17 yaş".
- Ses: Seedance sesi kapalı üretilir. IG'de trend müzik eklenir. Sessiz izlenebilir olmalı —
  yazılar mesajı tek başına taşıyor.
- Kredi: Seedance 10 sn / 1080p ≈ 90–100 kredi. Higgsfield bakiyesi şu an 0.
- 15 saniyelik Magnific versiyonuyla (YOUTH-REELS-MAGNIFIC-PROMPT.md) aynı kampanyada
  A/B yapılabilir: o "kurs değil" argümanını, bu veli duygusunu taşıyor.
