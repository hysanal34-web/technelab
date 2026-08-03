import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { TiyatroBot } from '@/components/TiyatroBot'
import { SITE_META } from '@/lib/data'
import { LanguageProvider } from '@/contexts/LanguageContext'

// Anti-flash: run before paint to apply saved theme class
const themeScript = `(function(){document.documentElement.classList.remove('no-js');try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})()`

// Perde arkasına bakanlar için — console easter egg
const curtainScript = `console.log("%c\\n  ┌─────────────────────────────────┐\\n  │   TECHNE LAB İSTANBUL           │\\n  │   τέχνη — zanaat, sanat, hüner  │\\n  │                                 │\\n  │   DISCIPLINE IS FREEDOM.        │\\n  │                                 │\\n  │   Perde arkasına hoş geldin.    │\\n  │   Sahne tozu yutanlar buraya:   │\\n  │   technelabistanbul.com/iletisim      │\\n  └─────────────────────────────────┘\\n","color:#B8F000;font-family:monospace;font-size:12px")`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.name,
    template: `%s | ${SITE_META.name}`,
  },
  description: SITE_META.description,
  keywords: [
    'tiyatro atölyesi istanbul',
    'oyunculuk kursu istanbul',
    'acting workshop istanbul',
    'oyunculuk atölyesi',
    'dramaturji atölyesi istanbul',
    'oyun yazarlığı kursu',
    'senaryo yazarlığı atölyesi',
    'yaratıcı drama atölyesi',
    'ingilizce drama atölyesi istanbul',
    'english drama lab istanbul',
    'english acting workshop istanbul',
    'müzikal tiyatro kursu istanbul',
    'musical theatre istanbul',
    'broadway müzikal dansı istanbul',
    'dans kursu istanbul',
    'jazz dans atölyesi',
    'theatre dance workshop istanbul',
    'tiyatro kursu kadıköy',
    'tiyatro kursu beyoğlu',
    'sahne sanatları kursu istanbul',
    'bağımsız tiyatro istanbul',
    'Techne Lab istanbul',
    'gençler tiyatro kursu istanbul',
    '14 17 yaş drama kursu',
    'sanat okulu istanbul',
    'art school istanbul',
  ],
  authors: [{ name: 'Techne Lab İstanbul' }],
  creator: 'Techne Lab İstanbul',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_META.url,
    siteName: SITE_META.name,
    title: SITE_META.name,
    description: SITE_META.description,
    images: [{
      url: `${SITE_META.url}/images/og-techne-lab.png`,
      width: 1200,
      height: 630,
      type: 'image/png',
      alt: 'Techne Lab İstanbul — Bağımsız Tiyatro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.name,
    description: SITE_META.description,
    images: [`${SITE_META.url}/images/og-techne-lab.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_META.url,
    languages: {
      'tr-TR': SITE_META.url,
      'en-US': `${SITE_META.url}/en`,
      'x-default': SITE_META.url,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['PerformingGroup', 'LocalBusiness'],
  '@id': `${SITE_META.url}#organization`,
  name: SITE_META.name,
  alternateName: 'Techne Lab',
  url: SITE_META.url,
  logo: `${SITE_META.url}/images/techne-logo.png`,
  image: `${SITE_META.url}/images/techne-logo.png`,
  description: SITE_META.description,
  email: SITE_META.email,

  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  areaServed: ['Beyoğlu', 'Pera', 'Kadıköy', 'İstanbul'],
  knowsLanguage: ['tr', 'en'],
  sameAs: [`https://instagram.com/${SITE_META.instagram.replace('@', '')}`],
  founder: {
    '@type': 'Person',
    name: 'Halil Yağız Şanal',
    jobTitle: 'Oyun Yazarı & Yönetmen',
  },
  knowsAbout: [
    'Oyunculuk eğitimi', 'Oyun yazarlığı', 'Dramaturji', 'Müzikal tiyatro',
    'İngilizce drama', 'Broadway dansı', 'Sahne sanatları', 'Bağımsız tiyatro',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Techne Lab Atölyeleri',
    url: `${SITE_META.url}/atolyeler`,
  },
}

// WebSite schema — Google sitelinks arama kutusu ve marka tanıma için
const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_META.url}#website`,
  url: SITE_META.url,
  name: SITE_META.name,
  description: SITE_META.description,
  inLanguage: ['tr-TR', 'en-US'],
  publisher: { '@id': `${SITE_META.url}#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="no-js">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/* Anti-flash theme script — must be synchronous, before any render */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: curtainScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-bg text-fg antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:bg-neon focus:text-bg focus:px-4 focus:py-3 focus:font-mono focus:text-[12px] focus:tracking-[0.16em] focus:uppercase"
        >
          İçeriğe atla
        </a>
        <LanguageProvider>
          <div className="stage-curtain" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
          <Cursor />
          <Nav />
          <main id="icerik" className="page-enter">{children}</main>
          <Footer />
          <TiyatroBot />
        </LanguageProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
