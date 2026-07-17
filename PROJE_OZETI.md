# Techne Lab İstanbul — Proje Özeti

Bu dosya Claude Cowork için hazırlanmıştır. Projenin tüm bağlamını içerir.

---

## Site Durumu

- **Canlı URL:** https://technelab.vercel.app
- **Domain (bağlanıyor):** https://technelab.ist — DNS ayarı bekliyor
- **Vercel Hesabı:** hysanal34@gmail.com / techne-lan team
- **Platform:** Next.js 15, Tailwind CSS, Vercel

---

## Techne Lab İstanbul Kimliği

- **Kurucu / Yönetmen:** Halil Yağız Şanal (dramaturg, oyun yazarı)
- **Kuruluş:** 2019, İstanbul
- **Misyon:** Bağımsız tiyatro ve performans. "Bir atölye değil. Bir laboratuvar."
- **Mekânlar:** Pod Pera (Beyoğlu), Taksim & Kadıköy, Techne Lab Stüdyosu
- **Tasarım:** Cream (#F5F0E8) zemin, ink black tipografi, neon yeşil (#C8FF00) aksanlar. Bebas Neue + DM Mono.

---

## Aktif Atölyeler (src/lib/data.ts)

| Kod | Atölye | Eğitmen | Fiyat | Süre |
|-----|--------|---------|-------|------|
| 01 | The Auteur Lab — Yazan Oyuncu | Halil Yağız Şanal | 18.000 ₺ | 12 hafta |
| 02 | Camera Praxis | Selen Uçer | 12.000 ₺ | 4 hafta |
| 03 | English Drama Lab | Techne Lab | 11.000 ₺ | 6 hafta × 2 saat |
| 04 | Oyuncunun Mevcudiyeti | Techne Lab | 9.000 ₺ | Yoğun |

**Kampanya:** 2 atölye alana %15 otomatik indirim (sepette uygulanır).

---

## Proje Yapısı

```
src/
├── app/
│   ├── page.tsx              ← Ana sayfa
│   ├── atolyeler/            ← Atölye listesi + detay
│   ├── makaleler/            ← SEO makale sistemi (MDX)
│   ├── sepet/                ← Sepet + PayTR ödeme
│   ├── api/paytr/            ← PayTR API routes
│   ├── hakkinda/
│   └── iletisim/
├── components/               ← Nav, Footer, Cursor, MarqueeStrip...
├── content/makaleler/        ← .mdx makale dosyaları (SEO)
└── lib/
    ├── data.ts               ← Atölye verileri (buradan düzenle)
    ├── cart.ts               ← Zustand sepet store
    ├── paytr.ts              ← PayTR entegrasyonu
    └── mdx.ts                ← Makale sistemi
```

---

## PayTR Entegrasyonu (Henüz Aktif Değil)

Vercel → Settings → Environment Variables'a eklenecekler:
- `PAYTR_MERCHANT_ID`
- `PAYTR_MERCHANT_KEY`  
- `PAYTR_MERCHANT_SALT`
- `NEXT_PUBLIC_SITE_URL=https://technelab.ist`

---

## Domain Bağlantısı (Yapılacak)

technelab.ist DNS panelinde şu kaydı ekle:
- **Type:** A
- **Name:** @
- **Value:** 216.198.79.1

---

## SEO Makaleleri (src/content/makaleler/)

Mevcut makaleler:
1. `dramaturji-nedir.mdx` — "Dramaturji Nedir? Sahnenin Görünmez Mimarı"
2. `oyuncu-nasil-yetisir.mdx` — "Oyuncu Nasıl Yetişir?"
3. `istanbul-bagimsiz-tiyatro.mdx` — "İstanbul'da Bağımsız Tiyatro"

Yeni makale eklemek için: Bu klasöre `.mdx` dosyası ekle, frontmatter şablonu:
```
---
title: "Başlık"
excerpt: "Kısa özet"
author: "Halil Yağız Şanal"
date: "2026-MM-DD"
category: "Kategori"
readTime: "X dk"
tags: ["etiket1", "etiket2"]
---
```

---

## Deploy Komutu

```bash
cd ~/Downloads/technelab
npx vercel --prod
```

---

## Önemli Notlar

- Atölye içerikleri (The Auteur Lab, Camera Praxis vb.) `src/lib/data.ts` içinde
- Fiyat/tarih/mekân değişikliği için o dosyayı güncelle
- Prodüksiyon bilgileri henüz placeholder — gerçek yapıt bilgileri eklenecek
- Tasarım kimliği kesin: cream + ink + neon yeşil, Bebas Neue + DM Mono
