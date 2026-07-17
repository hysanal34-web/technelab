# Techne Lab İstanbul — Next.js Website

## Hızlı Başlangıç

```bash
npm install
cp .env.example .env.local
# .env.local içine PayTR bilgilerini ekle
npm run dev
```

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── page.tsx            # Ana sayfa
│   ├── atolyeler/          # Atölye listesi + detay
│   ├── makaleler/          # Makale listesi + detay (MDX)
│   ├── sepet/              # Sepet + PayTR ödeme
│   ├── api/paytr/          # PayTR API routes
│   ├── hakkinda/
│   └── iletisim/
├── components/             # Paylaşılan componentler
├── content/makaleler/      # MDX makale dosyaları (SEO)
└── lib/
    ├── data.ts             # Atölye verileri (buradan düzenle)
    ├── cart.ts             # Zustand sepet store
    ├── paytr.ts            # PayTR entegrasyonu
    └── mdx.ts              # Makale sistemi
```

## Atölye Ekle / Düzenle

`src/lib/data.ts` dosyasındaki `WORKSHOPS` dizisini düzenle.

## Makale Ekle

`src/content/makaleler/` altına yeni `.mdx` dosyası oluştur:

```mdx
---
title: "Makale Başlığı"
excerpt: "Kısa özet (SEO için önemli)"
author: "Yazar Adı"
date: "2026-06-01"
category: "Dramaturji"
readTime: "5 dk"
tags: ["tiyatro", "oyunculuk"]
---

İçerik buraya...
```

## PayTR Entegrasyonu

1. [paytr.com](https://paytr.com) üzerinde merchant hesabı aç
2. `.env.local` dosyasına Merchant ID, Key ve Salt ekle
3. PayTR panelinden callback URL'yi ayarla: `https://technelab.ist/api/paytr/callback`
4. Test modundan gerçek moda geçmek için `src/app/api/paytr/init/route.ts` içinde `testMode` değerini `'0'` yap

## Vercel Deploy

```bash
npm run build
# Vercel CLI ile:
vercel --prod
# Ya da GitHub'a push et, Vercel otomatik deploy eder
```

Vercel ortam değişkenlerine `.env.example` içindeki değerleri ekle.

## SEO

- Her sayfa kendi `metadata` export'unu içeriyor
- JSON-LD structured data otomatik ekleniyor
- `npm run build` sonrası `sitemap.xml` ve `robots.txt` otomatik üretiliyor
- Makale sayfaları `generateStaticParams` ile SSG oluyor
