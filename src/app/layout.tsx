import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { TiyatroBot } from '@/components/TiyatroBot'
import { SITE_META } from '@/lib/data'
import { LanguageProvider } from '@/contexts/LanguageContext'

// Anti-flash: run before paint to apply saved theme class
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})()`

// Perde arkasına bakanlar için — console easter egg
const curtainScript = `console.log("%c\\n  ┌─────────────────────────────────┐\\n  │   TECHNE LAB İSTANBUL           │\\n  │   τέχνη — zanaat, sanat, hüner  │\\n  │                                 │\\n  │   DISCIPLINE IS FREEDOM.        │\\n  │                                 │\\n  │   Perde arkasına hoş geldin.    │\\n  │   Sahne tozu yutanlar buraya:   │\\n  │   technelab.ist/iletisim        │\\n  └─────────────────────────────────┘\\n","color:#B8F000;font-family:monospace;font-size:12px")`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.name,
    template: `%s | ${SITE_META.name}`,
  },
  description: SITE_META.description,
  keywords: ['tiyatro atölyesi', 'oyunculuk kursu', 'dramaturji', 'istanbul tiyatro', 'kamera önü oyunculuk', 'Techne Lab', 'bağımsız tiyatro', 'english drama lab'],
  authors: [{ name: 'Techne Lab İstanbul' }],
  creator: 'Techne Lab İstanbul',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_META.url,
    siteName: SITE_META.name,
    title: SITE_META.name,
    description: SITE_META.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.name,
    description: SITE_META.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_META.url },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_META.name,
  url: SITE_META.url,
  description: SITE_META.description,
  address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' },
  sameAs: [`https://instagram.com/technelabistanbul`],
  email: SITE_META.email,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Anti-flash theme script — must be synchronous, before any render */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: curtainScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-bg text-fg antialiased">
        <LanguageProvider>
          <div className="stage-curtain" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
          <Cursor />
          <Nav />
          <main className="page-enter">{children}</main>
          <Footer />
          <TiyatroBot />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
