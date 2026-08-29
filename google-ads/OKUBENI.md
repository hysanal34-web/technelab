# Google Ads — Toplu Yükleme Dosyaları

Hesap: **669-492-3541** (techne.lab.istanbul@gmail.com) · `authuser=1`

⚠ **Kampanyalar `Paused` (duraklatılmış) olarak yüklenir.** Sen "Etkin" yapana
kadar tek kuruş harcanmaz. Yükledikten sonra her şeyi gözden geçir, sonra başlat.

---

## Ne var içinde

| Dosya | İçerik |
|---|---|
| `01-kampanya-yukleme.csv` | 2 kampanya · 8 reklam grubu · 89 anahtar kelime |
| `02-reklamlar-rsa.csv` | 8 duyarlı arama reklamı (her grup için 10 başlık + 4 açıklama) |
| `03-negatif-kelimeler.csv` | 64 negatif kelime × 2 kampanya |

Tüm başlıklar ≤30, açıklamalar ≤90 karakter — script doğruladı, red yemez.

### Kampanyalar

- **TL - Yetiskin Programlar** · ₺330/gün
  1A English Drama Lab · 1B Techne Musical Lab · 1C Broadway Musical Dance
  1D The Auteur Lab (TBM ₺20) · 1E English Acting Praxis
- **TL - Youth Veli** · ₺220/gün
  2A Türk velisi (ürün adı) · 2B Türk velisi (boşluk) · 2C Uluslararası okul (EN)

---

## Yükleme adımları

1. `ads.google.com/aw/bulkactions/uploads?ocid=8490403847&authuser=1`
2. **Yükle** → `01-kampanya-yukleme.csv` → **Önizle** → sütun eşleşmesini kontrol et → **Uygula**
3. Aynı yerden `02-reklamlar-rsa.csv` → önizle → uygula
4. Aynı yerden `03-negatif-kelimeler.csv` → önizle → uygula

Sıra önemli: önce kampanya/kelime, sonra reklam, sonra negatif.

---

## Yüklemeden sonra — elle yapılacaklar

Bunlar CSV ile aktarılamıyor, arayüzden girilecek:

**1. Teklif stratejisi.** Her iki kampanya için **"Tıklamaları En Üst Düzeye Çıkar"**
seç, **maksimum TBM sınırı ₺35** koy. Dönüşüm takibi veri toplayana kadar
"Dönüşümleri En Üst Düzeye Çıkar" KULLANMA — optimize edecek verisi yok.

**2. Konum.** İki kampanya da: İstanbul. Ardından teklif artırımları —
`GOOGLE_ADS_REKLAM_GRUPLARI.md` içindeki semt tablosu.
Youth kampanyasına ayrıca uluslararası okul yarıçapları (3–5 km, +%40).

**3. Dil.** Yetişkin kampanyası: Türkçe + İngilizce. Youth: Türkçe + İngilizce.

**4. Ağ.** Arama Ağı **açık**, Görüntülü Reklam Ağı **KAPALI**.
(Varsayılan açık gelir ve bütçeyi sessizce yer.)

**5. Reklam uzantıları.** En az şunlar:
- Site bağlantısı: Atölyeler · Hakkında · İletişim · Galeri
- Arama uzantısı: 0552 242 59 71
- Açıklama metni: "12 kişilik gruplar" · "Kadıköy ve Pera" · "Eylül dönemi"

**6. Dönüşüm takibi.** ⚠ En kritik madde. Yayına almadan önce kurulmalı:
`/atolyeler/{slug}/kayit` başarı ekranı · `tel:` tıklaması · WhatsApp tıklaması.
Bu olmadan hangi kelimenin kayıt getirdiğini asla bilemezsin.

---

## Yayına alma sırası

1. Dönüşüm takibini kur
2. Üç CSV'yi yükle
3. Yukarıdaki 5 elle ayarı gir
4. Her şeyi gözden geçir
5. Kampanyaları **Etkin** yap
6. Bildirim zilini kontrol et — politika incelemesi çıkarsa oradan görünür

İlk 3 gün her sabah: **Arama terimleri raporu** → alakasızları negatife ekle.
