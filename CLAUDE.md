# Techne Lab — AI Geliştirici Kılavuzu

Bu dosya Claude Code ve diğer AI araçlarına siteyi nasıl geliştireceğini öğretir.
Yeni bir sohbet açtığında bu dosyayı oku — projenin tüm bağlamı burada.

---

## Proje

**technelab.ist** — İstanbul'da bağımsız tiyatro şirketi.
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
  priceEarlyBird?: number
  earlyBirdSlots?: number
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
| 04 | english-drama-lab | ingilizce-drama | aktif | earlyBird:5 |
| 05 | english-drama-acting-focus | ingilizce-drama | aktif | — |
| 06 | english-drama-final-performance | ingilizce-drama | aktif | earlyBird:5 |
| 07 | english-drama-youth | ingilizce-drama | aktif | 60.000₺ · 14-17 yaş |
| 08 | techne-musical-lab | dans-muzikal | aktif | earlyBird:5 |
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

---

## Deploy

```bash
cd /Users/macbookpro/Downloads/technelab
npx vercel --prod --yes
```

GitHub kurulduktan sonra: `git push origin main` → Vercel otomatik deploy eder.

---

## Önemli Kurallar

1. `metadata` export'u sadece server component'larda olabilir
2. `'use client'` olan component'larda `metadata` export etme
3. Client-side filtre logic'i → ayrı component'a çıkar (bkz. WorkshopsFilter.tsx)
4. Görsel path'leri: `/images/gallery/[dosyaadı].jpg`
5. Fiyatlar Türk Lirası (TRY), `.toLocaleString('tr-TR')` ile formatla
