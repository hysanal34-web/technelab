/** @type {import('next').NextConfig} */
const securityHeaders = [
  // HTTPS zorunlu — tarayıcı 2 yıl boyunca http denemesin
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // MIME sniffing saldırılarını engelle
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Yönlendirme bilgisi sızıntısını sınırla
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Kullanılmayan tarayıcı API'lerini kapat
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Clickjacking koruması — sadece kendi sitemiz ve PayTR (ödeme dönüş sayfası) frame'leyebilir
  // form-action: Meta Pixel dönüşüm olaylarını facebook.com/tr/ adresine POST ediyor,
  // 'self' tek başınayken tarayıcı bunu blokluyordu ve Meta reklam dönüşümleri düşüyordu.
  // PayTR ödeme formu da kendi domainine post ediyor.
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://www.paytr.com; base-uri 'self'; form-action 'self' https://www.facebook.com https://www.paytr.com; object-src 'none'" },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
]

// Kısa broşür linkleri — Instagram/reklam mesajlarında kullanılıyor.
// technelabistanbul.com/p/auteur  →  PDF, kendi sitemizden.
//
// ÖNEMLİ: Google Drive TAMAMEN kaldırıldı (6 Eylül). Üç adresi de denedik:
// /view          → "anyone: reader" olsa BİLE önce hesap seçme ekranı gösteriyordu.
// uc?export=view → giriş ekranını atlıyor ama PDF'i "indir" olarak akıtıyordu —
//                   ziyaretçinin bilgisayarına dosya iniyordu, istenmiyor.
// /preview       → giriş ekranı yine çıkabiliyor (tarayıcının önceki Google
//                   oturumuna bağlı; garanti değil).
// Üçü de Drive'ın kontrolümüz dışındaki davranışına bağımlıydı. Çözüm: PDF'leri
// Drive'a hiç koymadan doğrudan kendi sitemizden (public/dosyalar/) servis etmek —
// giriş yok, indirme yok, hesap durumuna bağımlılık yok. Dosya güncellenince
// SADECE public/dosyalar/<slug>.pdf değişir, reklam metinlerine dokunulmaz.
// permanent:false bilinçli: tarayıcı önbelleğe almasın ki hedefi sonra değiştirebilelim.
const BROSUR = (slug) => `/dosyalar/${slug}.pdf`
const BROSUR_LINKLERI = {
  'auteur':      BROSUR('auteur'),
  'edl':         BROSUR('edl'),
  'praxis':      BROSUR('praxis'),
  'youth':       BROSUR('youth'),
  'musical':     BROSUR('musical'),
  'broadway':    BROSUR('broadway'),
  'all':         BROSUR('all'),
  'auteur-en':   BROSUR('auteur-en'),
  'edl-en':      BROSUR('edl-en'),
  'praxis-en':   BROSUR('praxis-en'),
  'youth-en':    BROSUR('youth-en'),
  'musical-en':  BROSUR('musical-en'),
  'broadway-en': BROSUR('broadway-en'),
  'all-en':      BROSUR('all-en'),
}

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  poweredByHeader: false, // X-Powered-By başlığını gizle
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  // www olmayan adresi www'ye 301 ile yönlendir.
  // Site iki adreste birden yayınlanırsa Google bunu yinelenen içerik
  // olarak görüyor ve sıralama gücü ikiye bölünüyor. Kanonik adres www.
  async redirects() {
    // /p/<slug> → ilgili programın broşürü (kendi sitemizden). Sadece linki elinde olan görür;
    // siteye normal gezinerek gelen hiçbir ziyaretçi bu adrese düşmez (nav'da yok,
    // sitemap'te yok, robots.ts /p/ öntekini disallow ediyor).
    const brosurYonlendirmeleri = Object.entries(BROSUR_LINKLERI).map(([slug, url]) => ({
      source: `/p/${slug}`,
      destination: url,
      permanent: false, // 307 — hedefi ileride değiştirebilmek için tarayıcı önbelleklemesin
    }))
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'technelabistanbul.com' }],
        destination: 'https://www.technelabistanbul.com/:path*',
        permanent: true,
      },
      ...brosurYonlendirmeleri,
    ]
  },
}
export default nextConfig
