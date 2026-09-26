# Techne Lab — AI Geliştirici Kılavuzu

Bu dosya Claude Code ve diğer AI araçlarına siteyi nasıl geliştireceğini öğretir.
Yeni bir sohbet açtığında bu dosyayı oku — projenin tüm bağlamı burada.

---

## Proje

**technelabistanbul.com** — İstanbul'da bağımsız tiyatro şirketi.
Stack: Next.js 15 App Router · TypeScript · Tailwind CSS · Vercel

Kurucu: Halil Yağız Şanal (playwright & yönetmen)

---

## Tasarım Felsefesi

**Kimlik:** Bauhaus estetiği × Berlin underground × İstanbul tiyatro sahnesi
**Renk:** Siyah zemin (`#0A0A0C`) + Neon yeşil vurgu (`#C8FF00`)
**Tipografi:** Display (serif, geniş tracking) + Mono (teknik, küçük)
**Duygu:** Keskin, net, avangard — ama hiçbir zaman kalabalık

### Tasarım Kaideleri
- Her piksel bilinçli. Gereksiz süsleme yok.
- Küçük yazı tipleri okunabilir olmalı (min `text-[11px]`)
- Hover'lar ince ama belirgin: neon çizgi, opacity geçişi
- Animasyonlar amaçlı — dikkat çeken değil, yönlendiren
- Mobil masaüstüyle aynı kalitede

---

## Dosya Mimarisi

```
src/
├── lib/data.ts          ← TEK VERİ KAYNAĞI — önce buraya bak
├── components/
│   ├── Nav.tsx          ← Mega menü (hover, 4 kategori)
│   ├── WorkshopsFilter.tsx  ← Kategori filtresi (client)
│   ├── WorkshopRow.tsx  ← Liste satırı
│   ├── Gallery.tsx      ← 4-sütun grid + lightbox
│   └── AddToCartButton.tsx
├── app/
│   ├── page.tsx         ← Ana sayfa
│   ├── atolyeler/
│   │   ├── page.tsx     ← Server component (metadata burada)
│   │   └── [slug]/page.tsx ← Program detay
│   ├── hakkinda/page.tsx
│   ├── ekip/page.tsx
│   └── galeri/page.tsx
└── styles/globals.css
```

---

## Workshop Tipi

```typescript
type Workshop = {
  id: number
  slug: string
  code: string       // '01', '02', ...
  title: string
  sub: string
  tagline: string
  desc: string
  category: 'yazarlık' | 'oyunculuk' | 'ingilizce-drama' | 'dans-muzikal'
  active: boolean    // false = satışa kapalı
  instructor?: string
  venue: string
  duration: string
  maxStudents: number
  price: number
  priceCash?: number
  monthlyPrice?: number
  installments?: number
  blocks: { title: string; body: string; span?: string }[]
  tags: string[]
  images?: string[]
  edlFamily?: string[]
  seoTitle: string
  seoDesc: string
}
```

---

## 9 Program (Sırasıyla)

| # | slug | kategori | durum | fiyat |
|---|------|----------|-------|-------|
| 01 | auteur-lab | yazarlık | aktif | — |
| 02 | camera-praxis | oyunculuk | **KAPALI** | 16.000₺ · TR/EN |
| 03 | oyuncunun-mevcudiyeti | oyunculuk | **KAPALI** | 16.000₺ |
| 04 | english-drama-lab | ingilizce-drama | aktif | — |
| 05 | english-drama-acting-focus | ingilizce-drama | aktif | — |
| 06 | english-drama-final-performance | ingilizce-drama | aktif | — |
| 07 | english-drama-youth | ingilizce-drama | aktif | 60.000₺ · 10-17 yaş |
| 08 | techne-musical-lab | dans-muzikal | aktif | — |
| 09 | broadway-musical-dance | dans-muzikal | aktif | — |

---

## Renk Değişkenleri (globals.css)

```css
--bg: #0A0A0C;       /* Zemin siyahı */
--bgAlt: #111114;    /* Hafif açık zemin */
--fg: #F5F5F0;       /* Ana metin */
--stone: #6B6B6B;    /* İkincil metin */
--dim: #3A3A3A;      /* Soluk metin */
--mid: #2A2A2E;      /* Orta ton */
--border: #1E1E22;   /* Kenarlık */
--neon: #C8FF00;     /* Vurgu rengi */
```

---

## Yapılacaklar (Bekleyen)

- [x] Scroll-triggered animasyonlar (Intersection Observer) — `RevealSection.tsx` mevcut
- [x] Küçük yazı boyutları artırımı (text-[8px] → text-[11px]) — tüm dosyalarda güncellendi
- [x] SEO metin revizyonu (H1/H2 hiyerarşi) — başlık kısaltıldı, H2'ler eklendi
- [x] Ana sayfada Camera Praxis TR/EN revizesi — `data.ts` güncellendi, `descEn` eklendi
- [x] Fal.ai görsel üretimi entegrasyonu — `FalImageGenerator.tsx` + galeri sayfasına entegre edildi
- [x] Offline dönüşüm aktarımı — `/admin/donusumler`, bkz. `KURULUM-DONUSUM.md`
- [x] Geçmiş tarih filtresi — `aktifSessions()` + sunucu doğrulaması + test (22 Eylül 2026)
- [ ] **Yağız verecek:** EDL · Praxis · Broadway · Musical Lab için yeni tanışma günü tarihi.
      19 Eylül seansları kaldırıldı, bu dört programın hunisi şu an kapalı; programlar
      3 Ekim'de başlıyor. Tarih gelince `sessions.ts`'e eklenecek.
- [ ] **Panelden yapılacak (kodla yapılamaz):** Google Ads'de `Kayıt Oldu` + `Tanışma Günü Kaydı`
      dönüşümlerini aç, `NEXT_PUBLIC_ADS_LABEL_TANISMA` ve `META_CAPI_ACCESS_TOKEN` değişkenlerini
      Vercel'e ekle. İkisi de bugün tanımsız; tanımsızken ölçüm sessizce eksik çalışıyor.

---

## Testler

Playwright kurulu. Ayrıntı: `TESTLER.md`. Deploy öncesi `npm test`.

Üç dosya: `e2e/akis.spec.ts` (form doğrulama, admin koruması, dönüşüm ekranı) ·
`e2e/gorsel.spec.ts` (görsel regresyon, referanslar depoda) · `e2e/tarih.spec.ts`
(geçmiş tarih denetimi).

**Hiçbir test formu başarıyla göndermiyor** — gönderirse gerçek başvuru kaydı yaratır,
gerçek e-posta atar ve Meta'ya sahte Lead gönderir. Yeni test yazarken buna dikkat.

### Geçmiş tarih artık siteye basılmıyor

22 Eylül 2026'da şu bulundu: 19 Eylül tarihli dört tanışma seansı üç gündür formda
duruyordu ve kayıt almaya devam ediyordu. Denetim (`tarihDenetim.ts`) bunu panelde
kırmızı gösteriyordu ama panele bakılana kadar sayfa yanlış basmayı sürdürüyor.

Artık üç katman var:

| Katman | Dosya | Ne yapar |
|---|---|---|
| Filtre | `sessions.ts` → `aktifSessions()` | Label'daki tarihi okur, geçmiş seansı listeden eler |
| Sunucu doğrulaması | `tanisma-gunu/actions.ts` | Önbellekten gelen sayfa geçmiş seans göndermeye kalkarsa reddeder |
| Test | `e2e/tarih.spec.ts` | Filtre bozulursa deploy öncesi yakalar |

Tarih çözücü tek yerde: `src/lib/tarihMetin.ts`. Önce üç kopyası vardı (denetim, test,
form) — üçü ayrı ayrı doğru olup birbirini tutmayabiliyordu.

`tanisma-gunu/page.tsx` saatlik yenileniyor (`revalidate = 3600`). Filtre render anında
çalıştığı için sayfa build zamanında donarsa filtre de donar; asıl kaçınılan hata bu.

`sessions.ts`'ten geçmiş satırı silmek artık zorunlu değil, sadece arşiv temizliği.

---

## Deploy

```bash
cd /Users/macbookpro/Downloads/technelab
npm test                                    # önce testler
npx vercel --prod --yes --scope techne-lan
```

`--scope techne-lan` olmadan "Not authorized" hatası verir.

GitHub kurulduktan sonra: `git push origin main` → Vercel otomatik deploy eder.

---

## Bu repo sadece site değil

İşin çoğu artık site dışında yürüyor ve hepsi bu klasörden yönetiliyor:
reklam hesapları, muhasebe, içerik üretimi, tanışma günü kayıtları.

### Hesap kimlikleri

| | |
|---|---|
| Meta reklam hesabı | `act_1943993929852674` — YenireklamHesabıTechneLAb |
| Meta işletme portföyü | `1605741837254289` |
| Meta piksel | `1542440530516639` |
| Google Ads | `669-492-3541` · techne.lab.istanbul@gmail.com |
| Search Console | `https://www.technelabistanbul.com` (URL ön eki mülkü) — 17 Eylül 2026'da doğrulandı. Sıralama ve tıklama verisinin **asıl kaynağı budur**; elle Google araması yapmadan önce buraya bak. |
| Kayıt tablosu (Sheet) | `1SMfBjHhc080Rjqft5jPbFjMIRGlQcEXtXf0P0Gwl8Ek` — "TECHNE LAB TÜM PROGRAMLAR" |
| Muhasebe klasörü | `~/Desktop/MUHASEBE/` — ay ay, her ayda `GELIR/` + `GIDER/` |

### Token disiplini — pahalı yol / ucuz yol

| İş | Pahalı (yapma) | Ucuz (yap) |
|---|---|---|
| Reklam performansı | Meta/Google panelinde gezinmek, ekran görüntüsü | **Windsor.ai MCP** `get_data` |
| Site trafiği | Search Console / GA arayüzü | **Windsor.ai** `googleanalytics4` |
| Geniş dosya arama | `find` ile bütün ağacı dökmek | `Grep` ile hedefli arama, ya da alt ajan |
| Uzun rapor okuma | Dosyanın tamamını okumak | `Grep -n` ile satırı bul, `offset/limit` ile oku |
| Çok adımlı araştırma | Ana oturumda yapmak | **Alt ajana ver** — çıktı ana bağlama girmez |

Windsor hesapları: Meta `1943993929852674` · Google Ads `669-492-3541` · GA4 `548207464`.
`get_fields` ile alan adı al, tahmin etme.

Kural: **okuma API'den, yazma panelden.** Bütçe değiştirmek, metin düzenlemek, fatura
PDF'i indirmek için tarayıcı gerekiyor; rakam öğrenmek için gerekmiyor.

### Yönetim paneli — `/admin`

18 Eylül 2026'da eklendi. Site içinde, aynı depoda, aynı tasarım dilinde.

| | |
|---|---|
| Giriş | Tek ortak şifre → `ADMIN_PASSWORD` (Vercel ortam değişkeni) |
| Koruma | `src/middleware.ts` — `/admin/*` varsayılan olarak kapalı, açık tek yol `/admin/login` |
| Oturum | HMAC-SHA256 imzalı `tl_admin` çerezi, 7 gün, httpOnly + sameSite=lax |
| Ekranlar | genel bakış · başvurular · programlar · araçlar |
| Veri | `src/lib/basvuruStore.ts` — Vercel Blob, özel depo `technelab-basvuru` (`BLOB_READ_WRITE_TOKEN`) |

**Başvurular artık kalıcı.** Bu tarihe kadar form yalnız e-posta atıyordu, hiçbir yerde
kayıt yoktu. İki form action'ı (`tanisma-gunu/actions.ts` ve `atolyeler/[slug]/kayit/actions.ts`)
artık e-postadan **önce** blob deposuna yazıyor. Her başvuru ayrı bir nesne
(`basvurular/<zaman>__<rastgele>.json`); tek liste dosyası olsaydı eşzamanlı iki form
birbirinin üstüne yazardı. `basvuruKaydet` hiçbir koşulda hata
fırlatmaz — depo çökse bile form akışı ve e-posta bozulmaz. Kural: aday kaybetmektense
mükerrer satır yaz.

Panelde durum atanabiliyor (yeni · arandı · ulaşılamadı · tanışmaya kayıt · tanışmaya
geldi · kayıt oldu · kaybedildi), iç not yazılabiliyor, CSV indirilebiliyor.

Genel bakış ekranı her açılışta **geçmiş tarih denetimi** yapıyor (`src/lib/tarihDenetim.ts`):
`data.ts` ve `sessions.ts` içindeki tarihler bugüne göre kontrol ediliyor, geçmiş olan
kırmızı çıkıyor. "başladı / katılım açık" geçen satırlar kasıtlı sayılıp uyarı üretmiyor.

Panel **okuma ekranı**; fiyat ve tarih hâlâ `data.ts`'ten deploy ile değişiyor. Tek kaynak
kuralı bozulmasın diye bilerek böyle.

### Hazır komutlar

- `/tarih-kontrol` — program tarihleri beş kaynakta tutuyor mu, geçmiş tarih yayında mı
- `/ay-kapat [ay]` — ayın gelir-giderini belge bazında topla, muhasebeye tek dosya çıkar
- `/reklam-durum` — Meta + Google hesap denetimi, sorunları öncelik sırasıyla
- `muhasebe-denetci` alt ajanı — gelir-gider dosyasını teslimden önce denetler

---

## Dil ve içerik kuralları

Reklam metni, post, mesaj şablonu, broşür — hepsinde geçerli:

- **"ders" kelimesi yasak.** Atölye, program, seans denir.
- **Postta ve reklam metninde telefon numarası yok.** Yönlendirme DM ya da siteye.
- **Eğitmen adı reklam metnine konmaz.** Ödül, unvan, başarı listesi de öne çıkarılmaz.
- **"Ücretsiz" cümle içinde geçer**, başlıkta bağırmaz.
- **Em dash (—) kullanılmaz** kullanıcıya gidecek metinlerde.
- Fiyat sitede gizli; fiyat bilgisi DM'den veriliyor.

## Tek kaynak kuralı

Aynı veri birden fazla yerde yaşıyorsa hangisinin doğru olduğu belirsizleşiyor.
Bu projede bu defalarca acı verdi.

- **Fiyat ve program yapısı** → `src/lib/data.ts`. Broşür, site ve PDF buradan beslenir.
- **Tanışma günü seansları** → `src/app/tanisma-gunu/sessions.ts`
- **Kim kayıt oldu, ne ödedi** → Google Sheet (yukarıda)
- **Reklam metninde geçen tarih** → yukarıdaki iki dosyaya eşit olmak zorunda

Bir tarihi değiştiriyorsan hepsini birden değiştir, yoksa yayındaki reklam geçmiş
tarih duyurur ve tıklayan kişi kaybedilir. `/tarih-kontrol` bunun için var.

---

## Önemli Kurallar

1. `metadata` export'u sadece server component'larda olabilir
2. `'use client'` olan component'larda `metadata` export etme
3. Client-side filtre logic'i → ayrı component'a çıkar (bkz. WorkshopsFilter.tsx)
4. Görsel path'leri: `/images/gallery/[dosyaadı].jpg`
5. Fiyatlar Türk Lirası (TRY), `.toLocaleString('tr-TR')` ile formatla
