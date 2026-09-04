# Site Denetimi — 3 Eylül 2026
Canlı site üzerinde tarama + kod incelemesi. Bulunan arızalar, yapılan düzeltmeler,
bekleyen öneriler.

---

## DÜZELTİLDİ

### 1. Atölye numaraları 01'den 03'e atlıyordu
**Neden:** `code` alanı sabit yazılıydı (01–08) ama kapalı programlar (Oyuncunun
Mevcudiyeti = 02, Camera Praxis = 08) listeden gizleniyordu. Görünen liste
01 · 03 · 04 · 05 · 06 · 07 oluyordu.

**Çözüm:** Aktif programlar sıralı 01–06 olacak şekilde yeniden numaralandı;
kapalı programlar sona alındı (07, 08). `code` hâlâ programın kalıcı etiketi —
detay sayfası, semt sayfaları ve atölye testi hepsi aynı numarayı gösteriyor.

| Program | Eski | Yeni |
|---|---|---|
| The Auteur Lab | 01 | 01 |
| English Drama Lab | 03 | **02** |
| English Acting Praxis | 04 | **03** |
| English Drama Youth | 05 | **04** |
| Techne Musical Lab | 06 | **05** |
| Broadway Musical Dance | 07 | **06** |
| Oyuncunun Mevcudiyeti (kapalı) | 02 | 07 |
| Camera Praxis (kapalı) | 08 | 08 |

---

### 2. Taksim ve Beyoğlu sayfaları "Taksim'de dans dersi vermiyoruz" diyordu
**En pahalı hata buydu.** Broadway'in Taksim sınıfı 17 Eylül'de başlıyor
(`data.ts` içinde tanımlı) ama `taksim-dans-kursu` ve `beyoglu-dans-kursu`
sayfaları hâlâ eski bilgiyle "hayır, dans yalnızca Kadıköy'de" yazıyordu.

Google Ads'te "taksim dans kursu" arayan biri reklama tıklayıp bu sayfaya
düşüyor ve ilk okuduğu cümle "burada dans dersi yok" oluyordu.

**Çözüm:** İki sayfanın da başlığı, intro'su, program tanımı, SEO açıklaması ve
SSS cevapları Taksim sınıfını öne çıkaracak şekilde yeniden yazıldı. Musical
Lab'ın neden yalnızca Kadıköy'de olduğu (zemin/ayna/piyano) açıkça korundu —
marka tonuna uygun, "her semtte şube" iddiası yok.

Broadway'in kendi `seoDesc` alanı da "Kadıköy ve Taksim sınıfları" olarak güncellendi.

---

### 3. Meta Pixel dönüşümleri CSP tarafından bloklanıyordu
Canlı sitede konsol hatası:

```
Sending form data to 'https://www.facebook.com/tr/' violates the following
Content-Security-Policy directive: "form-action 'self'". The request has been blocked.
```

**Anlamı:** Meta Pixel'in dönüşüm gönderimi tarayıcı tarafından engelleniyordu —
Meta reklamlarının dönüşüm verisi eksik geliyor olabilir.

**Çözüm:** `next.config.mjs` içindeki CSP'ye `form-action` için
`https://www.facebook.com` ve `https://www.paytr.com` eklendi.

---

### 4. Mobilde üç yüzen buton üst üste biniyor, içeriği kapatıyordu
Program sayfalarında mobilde aynı anda üç şey vardı: alttaki StickyApplyBar
(başvur), WhatsApp balonu ve Sahne Bot butonu. Broadway sayfasında bunlar ders
takvimi satırlarının — yani yeni eklenen **Taksim** satırının — üstünü kapatıyordu.

**Çözüm:** Program sayfalarında mobilde WhatsApp ve Sahne Bot gizlendi; tek net
CTA olarak StickyApplyBar kaldı. Masaüstünde ikisi de duruyor.

---

### 5. Sahne Bot davet balonu WhatsApp butonunun üstüne biniyordu
Balon `bottom-86px`, WhatsApp butonu `bottom-96px` — ikisi çakışıyordu ve balon
bir kez göründükten sonra hiç kapanmıyordu.

**Çözüm:** Balon WhatsApp'ın üstüne alındı (`bottom-164px`), 14 saniye sonra
kendiliğinden kapanıyor ve sağ üstüne kapatma (×) düğmesi eklendi.

---

### 6. "OYUNCULUK 0" filtresi
Atölyeler sayfasında Oyunculuk sekmesi "0" gösteriyordu — tıklamaya davet edip
boş sayfaya götüren bir sekme.

**Çözüm:** Sayı yerine "yakında" yazıyor. Sekme tıklanabilir kaldı, çünkü boş
durumda "haber ver" CTA'sı var — oradan lead geliyor.

---

## BEKLEYEN / ÖNERİ

### A. Canlı site güncel değil
Canlı sitede English Drama Lab'ın alt başlığı hâlâ "English Creative Drama"
görünüyor; `data.ts`'te bu "Yetişkinlere İngilizce Drama" olarak güncellenmişti.
Yani son içerik değişiklikleri deploy edilmemiş. Yukarıdaki düzeltmeler de
deploy sonrası canlıya çıkacak.

```bash
cd /Users/macbookpro/Downloads/technelab
npx vercel --prod --yes --scope techne-lan
```

### B. Dönüşüm ölçümü hâlâ yok (Google Ads)
Hesapta tanımlı dönüşüm eylemi yok. Bu yüzden Akıllı Teklif kullanılamıyor,
şu an Manuel TBM'deyiz. Form gönderimi ve WhatsApp tıklaması dönüşüm olarak
tanımlanırsa teklif stratejisi tekrar akıllıya çevrilebilir.

### C. English Acting Praxis fiilen görünmez
12 dar anahtar kelime, 30 günde 7 gösterim, 0 tık. Ya kendi kampanyasına
taşınıp yeni kelimelerle beslenmeli ya da bilinçli olarak beklemeye alınmalı.

### D. Youth'a organik talep sinyali yok
Arama terimlerinde yalnızca ücretsiz belediye/İSMEK aramaları çıkıyor. Bu program
arama reklamıyla değil, bilinirlik (Meta/Instagram) üzerinden büyür; Google Ads
tarafı şimdilik ağ atma işlevinde.
