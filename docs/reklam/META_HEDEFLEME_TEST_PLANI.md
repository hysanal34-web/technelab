# Techne Lab — Meta Hedefleme Test Planı

**Amaç:** Hangi kitlenin gerçekten başvuru getirdiğini öğrenmek.
**Tarih:** 9 Ağustos 2026

---

## Önce bilinmesi gerekenler

**1. Meta'da arama kelimesi yoktur.** O Google Ads'te var. Meta ilgi alanı, davranış ve demografiye göre eşleştirir.

**2. Meta ilgi alanı kırılımı vermez.** Bir reklam setine 8 ilgi alanı koyarsan, hangisinin sonuç getirdiğini asla göremezsin. Tek havuz, tek rapor.

**3. Bu yüzden test etmek zorundasın.** Öğrenmenin tek yolu her kitleyi ayrı reklam setine koymak.

**4. Pixel olmadan bu testin anlamı yok.** Şu an sitede Meta Pixel yok. Pixel olmadan Meta "başvuru"yu göremez, dolayısıyla hangi kitlenin başvuru getirdiğini de ölçemezsin. **Bu test başlamadan önce Pixel kurulmalı.**

---

## Adım 0 — Pixel ve olaylar (zorunlu ön koşul)

Şu olaylar tanımlanmalı:

| Olay | Ne zaman tetiklenir | Neden |
|---|---|---|
| `PageView` | Her sayfa | Temel |
| `ViewContent` | Program sayfası açıldığında | İlgi sinyali |
| `InitiateCheckout` | Başvuru formu açıldığında | Niyet sinyali |
| `Lead` | Başvuru gönderildiğinde | **Ana hedef** |

`Lead` olayına program adı ve fiyat parametresi eklenmeli — böylece Meta 99.000₺'lik başvuruyla 18.000₺'liği ayırt eder ve bütçeyi değerli olana kaydırır.

> Bunu ben kurabilirim — Pixel ID'yi verirsen `layout.tsx` ve `kayit/actions.ts` tarafına ekleyip deploy ederim.

---

## Adım 1 — Kırılımları oku (hemen yapılabilir, ücretsiz)

Reklam Yöneticisi → tablo üstünde **Kırılım (Breakdowns)** menüsü.

Şu üçünü sırayla aç ve not al:

1. **Yaş ve Cinsiyet** — Youth kampanyasında sonuç 25-34'ten mi 45-54'ten mi geliyor? Eğer 45-54 baskınsa veliyi yakalıyorsun demektir, doğru yoldasın. 18-24 baskınsa bütçe boşa gidiyor.
2. **Platform ve Yerleşim** — Instagram Reels mi, Stories mı, Feed mi? Facebook'un payı ne? (Organik veride FB binde 3,5'ti; reklamda da öyleyse kapat.)
3. **Bölge** — İstanbul içinde hangi ilçeler. Kadıköy/Beyoğlu dışından çok sonuç geliyorsa mekân uzaklığı sorun olacak.

Bu üç kırılım tek başına bütçenin %20-30'unu kurtarır ve hiçbir şey kurmanı gerektirmez.

---

## Adım 2 — Kitle testi kurulumu

**Yapı:** Tek kampanya (hedef: Potansiyel Müşteri) → içinde 4 ayrı reklam seti → her sette **aynı görsel ve aynı metin**.

Görsel ve metin aynı olmalı; yoksa neyin fark yarattığını ayıramazsın.

### English Drama Youth (14–17) — velileri hedefle

| Set | Hedefleme | Tahmini havuz |
|---|---|---|
| **A — Ebeveyn** | Yaş 35–55 · Ergen çocuk sahibi ebeveynler (13–17) · İstanbul (Kadıköy + Beyoğlu 15 km) | 80–150 B |
| **B — Eğitim odaklı** | Yaş 35–55 · İlgi: özel okul, uluslararası okul, IB, SAT, yurt dışı eğitim | 60–120 B |
| **C — Sanat odaklı** | Yaş 35–55 · İlgi: tiyatro, müzikal tiyatro, konservatuvar, çocuk tiyatrosu | 50–100 B |
| **D — Geniş (kontrol)** | Yaş 35–55 · İstanbul · **ilgi alanı yok** · Advantage+ açık | 1,5 M+ |

**D setini mutlaka koy.** 2026'da Meta'nın algoritması elle seçilen ilgi alanlarını sık sık yeniyor. Geniş set kazanırsa ilgi alanı seçmekle uğraşmayı bırakırsın — bu da bir sonuçtur.

### English Drama Lab (yetişkin) — kendisi karar veriyor

| Set | Hedefleme |
|---|---|
| **A — Kariyer** | 25–40 · İlgi: yurt dışı iş, LinkedIn, MBA, Erasmus, IELTS/TOEFL |
| **B — Dil öğrenen** | 25–45 · İlgi: İngilizce öğrenme, Duolingo, dil okulu, konuşma kulübü |
| **C — Sanat** | 25–45 · İlgi: tiyatro, doğaçlama, oyunculuk, stand-up |
| **D — Geniş** | 25–45 · İstanbul · ilgi alanı yok |

### Musical Lab & Broadway — dar ve tutkulu kitle

| Set | Hedefleme |
|---|---|
| **A — Müzikal** | 18–40 · İlgi: Broadway, Hamilton, Les Misérables, müzikal tiyatro, Zorlu PSM |
| **B — Dans** | 18–40 · İlgi: jazz dans, modern dans, bale, dans stüdyosu |
| **C — Geniş** | 18–40 · İstanbul · ilgi alanı yok |

---

## Adım 3 — Bütçe ve süre

**Kural:** Her reklam seti kendi bütçesini almalı (kampanya bütçesi değil — CBO kullanırsan Meta parayı erken bir sete kaydırır ve test bozulur).

| Parametre | Değer |
|---|---|
| Set başına günlük bütçe | Minimum 150–200₺ |
| Test süresi | **En az 7 gün** (öğrenme aşaması) |
| Süre boyunca | **Hiçbir şeye dokunma** — her düzenleme öğrenmeyi sıfırlar |
| Karar eşiği | Set başına en az 15–20 sonuç |

4 set × 175₺ × 7 gün ≈ **4.900₺** bir tur test. Bu bir masraf değil, hangi kitlenin 99.000₺'lik program aldığını öğrenmenin bedeli. Bir kayıt bile gelse yedi katıyla çıkar.

Bütçe yetmiyorsa 4 yerine **2 set** kur: en güçlü tahminin + geniş kontrol.

---

## Adım 4 — Nasıl okunacak

7 gün sonunda her set için şu tabloyu doldur:

| Set | Harcama | Başvuru | Başvuru başına maliyet | TO | Frekans |
|---|---|---|---|---|---|
| A | | | | | |
| B | | | | | |
| C | | | | | |
| D | | | | | |

**Karar kuralları:**

- **Başvuru başına maliyet** tek gerçek karşılaştırma ölçüsü. Erişim ve tıklama yanıltır.
- **Frekans 2,5'i geçtiyse** kitle küçük ya da bütçe fazla — insanlar aynı reklamı çok gördü, yorulmadan önce genişlet.
- **TO %1'in altındaysa** sorun kitlede değil görselde. Kitleyi değiştirmeden önce görseli değiştir.
- En kötü seti kapat, bütçesini kazanan sete aktar. Sonraki turda kazananın içinde yaş/yerleşim kırılımıyla daralt.

---

## Adım 5 — Test sonrası: gerçek kazanç burada

Pixel bir ay veri topladıktan sonra ilgi alanı seçmeyi büyük ölçüde bırakabilirsin. Çünkü şunlar açılır:

- **Benzer kitle (Lookalike %1)** — başvuranlara benzeyen insanlar. Elle seçilen hiçbir ilgi alanı bunu yenemez.
- **Yeniden pazarlama** — program sayfasını gezip başvurmayanlar. Bu grup en ucuz dönüşen gruptur; erken kayıt indirimini tam onlara göster.
- **Video izleyicileri** — Reels'ini %50'den fazla izleyenler. Organik 547 bin görüntülemen var, bu devasa bir havuz ve şu an tamamen kullanılmıyor.

Son madde önemli: ayda yarım milyon görüntüleme alıyorsun ve bu insanların hiçbirini yeniden hedefleyemiyorsun, çünkü Pixel yok. En pahalı eksik bu.

---

## Sıralama

1. **Pixel + Lead olayı kur** — bu olmadan gerisi anlamsız
2. **Kırılımları oku** — ücretsiz, bugün yapılabilir, hemen kazanç
3. **4 setli kitle testi** — 7 gün, ~5.000₺
4. **Kazananı ölçekle, kaybedeni kapat**
5. **Bir ay sonra Lookalike ve yeniden pazarlamaya geç**
