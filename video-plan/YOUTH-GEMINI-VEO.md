# ENGLISH DRAMA YOUTH — Gemini / Veo 3 · İki versiyon
## A: Enerjik · B: Veliye doğrudan konuşan

Veo 3 tek seferde **8 saniye** üretiyor (uzatma ile 16). İkisi de 8 saniyeye kurgulandı.
Veo'nun farkı: **kendi sesini üretiyor** — diyalog, ortam sesi, müzik. B versiyonu bunu kullanıyor.

Ton değişikliği: Seedance versiyonu "yalnız çocuk" üzerinden gidiyordu. Bunlar öyle değil.
Çocuk yetenekli, hazır, sadece arenası yoktu. **Arena burada.** Enerji argümanın kendisi.

---

## VERSİYON A — "CEVAP VER." · Enerjik

**Fikir:** Sahne zaten canlı. Hiç sessizlik yok. İlk kareden itibaren hareket, cevap, kahkaha.
Veli üzülmüyor — *"benim çocuğum da böyle olur"* diyor.

**Yazı:** `İNGİLİZCESİ VAR.` → `DİLİ DENEYİMLİYOR.` → `ENGLISH DRAMA YOUTH`

### Veo 3 promptu

```
Vertical 9:16, black and white cinematic film with 35mm grain and deep blacks. The only
color in the entire clip is one neon green stage light (#C8FF00). No faces are clearly
visible at any point — everything is silhouette, back view, side profile in shadow,
hands, movement.

0–2s: We open already in motion. A small theatre stage lit by a single neon green beam.
A teenager in silhouette stands center, arm extended, mid-sentence — throwing a line
across the stage with full energy. Handheld camera, slight shake, immediate.

2–5s: Another teenager bursts in from frame left and answers instantly, arms up, both
of them now moving around each other in the light like a fast improvised scene. Two
more rush in from the dark edges. Bodies in motion, a spin, a jump, a hand slapping
another hand. Their movement leaves faint neon light trails in the air. Someone laughs
loudly off-screen. The camera pushes in fast.

5–8s: The whole group — six teenagers in silhouette — freezes in a sharp tableau
inside the green light, arms out, mid-pose, like the final beat of a scene. Half a
second of stillness. Then they break and the room erupts. Camera pulls back wide.

Audio: real room sound — sneakers on a wooden stage floor, overlapping teenage voices
speaking energetic English (unintelligible, natural), one burst of group laughter,
a single rhythmic beat underneath that builds. No music melody, no narration.

Documentary energy, kinetic, alive. No text, no subtitles, no logos, no watermarks.
```

### Yazı katmanı (ffmpeg)

```
0,3 – 2,2 sn    İNGİLİZCESİ VAR.                  beyaz
2,6 – 5,2 sn    DİLİ DENEYİMLİYOR.                neon
5,8 – 8,0 sn    ENGLISH DRAMA YOUTH · 10–17 YAŞ   beyaz
                DM'den yaz                        neon
```

---

## VERSİYON B — "BURASI O YER." · Veliye doğrudan

**Fikir:** Biri kameraya bakıp veliyle konuşuyor. Yetişkin bir eğitmen figürü — sahnede, neon
ışıkta, siyah kıyafet, sakin ve kesin. Arkasında çocuklar çalışıyor (siluet, yüz yok).
Konuşan kişi velinin gözünün içine bakıyor. Övmüyor, açıklamıyor — **teşhis koyuyor.**

**Replik (Türkçe, ~4 saniye):**
> *"İngilizcesi var, biliyoruz. Kullanacak yeri yoktu. Burası o yer."*

Üç cümle. İlkinde veli "evet" der. İkincisinde "aynen" der. Üçüncüsünde DM atar.

### Veo 3 promptu

```
Vertical 9:16, black and white cinematic film, 35mm grain, deep blacks, high contrast.
The only color is one neon green stage light (#C8FF00) from above and slightly behind.

A woman in her late thirties, short dark hair, dressed entirely in black, stands on a
small theatre stage and looks directly into the camera. She has the calm, precise
presence of a theatre director — no smile, no sales energy, just certainty. Medium
close-up, her face lit from the side by the green light, half in shadow. She is the
only person whose face is visible.

Behind her, out of focus and in silhouette, six teenagers are working through a scene —
moving, gesturing, one of them laughing — their faces never readable.

She speaks directly to the camera in Turkish, unhurried, each sentence landing on its
own beat:

"İngilizcesi var, biliyoruz."
(a small pause; behind her, a teenager throws an arm out mid-line)
"Kullanacak yeri yoktu."
(pause; the group behind her shifts, someone spins)
"Burası o yer."

On the last line she holds the look for one full second, then turns her head slightly
toward the stage behind her. The camera slowly drifts past her shoulder toward the
teenagers in the green light.

Audio: her voice clean and close, natural Turkish, low and steady. Underneath, faint
room tone — sneakers on wood, distant overlapping English voices from the teenagers,
one short laugh. No music.

Camera locked on a tripod for the dialogue, then a slow drift at the end. No text,
no subtitles, no logos, no watermarks.
```

### Yazı katmanı (ffmpeg) — repliği taşıyan altyazı

Sessiz izleyen veli için replik yazıya da basılır, konuşmayla senkron:

```
0,6 – 2,2 sn    İNGİLİZCESİ VAR, BİLİYORUZ.       beyaz
2,8 – 4,4 sn    KULLANACAK YERİ YOKTU.            beyaz
5,0 – 6,6 sn    BURASI O YER.                     neon, büyük
6,8 – 8,0 sn    ENGLISH DRAMA YOUTH · 10–17 YAŞ   beyaz küçük
                DM'den yaz                        neon küçük
```

### B için yedek plan

Veo'nun Türkçe dudak senkronu tutmazsa: **sesi kapat, repliği sen oku.** Yönetmen sesi
yapay sesten her zaman daha inandırıcı. Kadın figür kameraya bakar, dudaklar hareket eder
ama ses senin — Instagram'da bu fark edilmez, altyazı zaten var.

Ya da daha iyisi: **Alara Lokum'u çek.** Eğitmen kendisi kameraya bakıp bu üç cümleyi söylesin.
Gerçek insan, gerçek program. AI bu ihtiyacı sadece çekim yapılana kadar karşılar.

---

## GEMINI'DE NASIL KULLANILIR

1. Gemini → **Video oluştur** (Veo 3) → dikey / 9:16 seç
2. Promptu olduğu gibi yapıştır — İngilizce kalsın, Veo İngilizce promptla daha iyi çalışıyor;
   B'deki Türkçe replikler tırnak içinde, onlar Türkçe kalacak
3. Çıktı 8 sn. Yeterli. Uzatma gerekmiyor.
4. İndir → ffmpeg ile yazı katmanı → A'da Veo sesi kapatılıp IG trend müziği,
   B'de Veo sesi ya kalır ya senin sesinle değişir

---

## HANGİSİ NE ZAMAN

| | A · Enerjik | B · Doğrudan |
|---|---|---|
| Ne satıyor | Atmosfer, "burası canlı" | Teşhis, "sorunu anladık" |
| Veli tepkisi | *"Çocuğum da böyle olsun"* | *"Evet, tam olarak bu"* |
| Risk | Düşük — yüz yok, ses önemsiz | Orta — Türkçe konuşma senkronu |
| Kullanım | Soğuk kitle, ilk temas | Sıcak kitle, yeniden hedefleme |

İkisini aynı reklam setinde döndür. A geniş kitlede durdurur, B yeniden hedeflemede kapatır.
Seedance versiyonu (YOUTH-SEEDANCE-10SN.md) üçüncü kol olarak duygusal açıyı test eder.

---

## KURALLAR — değişmedi

Fiyat yok · telefon yok · burs yok · "genç" yok (10–17 yaş) · çocuk yüzü yok · ünlem yok.
