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

// Kısa broşür linkleri — Instagram/reklam mesajlarında Drive adresi yerine bunlar kullanılıyor.
// technelabistanbul.com/p/auteur  (30 karakter)  yerine
// https://drive.google.com/file/d/1oJ_.../view   (70 karakter)
//
// Dosya değişirse SADECE buradaki ID'yi güncelle — reklam metinlerine dokunmaya gerek yok.
// permanent:false bilinçli: tarayıcı önbelleğe almasın ki hedefi sonra değiştirebilelim.
const DRIVE = (id) => `https://drive.google.com/file/d/${id}/view`
const BROSUR_LINKLERI = {
  'auteur':   DRIVE('1oJ_vAJJTdnkraQJdKqJ4F2QI-E0IwA06'),
  'edl':      DRIVE('1zK7z9E46FMHE1_3PuafM_bDyONMih0pp'),
  'praxis':   DRIVE('1fyc4tgGjCsx8tM-z23Qu5Qb799wyCNCT'),
  'youth':    DRIVE('1kX22xIPxkE9TauJ83JhqAcJH8yDptJ6v'),
  'musical':  DRIVE('1FhNsPA1x3mswYq520u1TFLVN17DieiKs'),
  'broadway': DRIVE('1vFZIPouKxU2oSlYCImAbQW0Fr5M1vnI7'),
  'edl-en':   DRIVE('1oeigvDu_u0harQFxOBflsDUwkLCWGNXc'),
  // Drive'a yükledikçe alttaki satırların başındaki // işaretini kaldır ve ID'yi yapıştır:
  // 'all':         DRIVE('DOSYA_ID'),   // 00-Tum-Programlar.pdf
  // 'all-en':      DRIVE('DOSYA_ID'),   // EN/00-All-Programs-EN.pdf
  // 'auteur-en':   DRIVE('DOSYA_ID'),
  // 'praxis-en':   DRIVE('DOSYA_ID'),
  // 'youth-en':    DRIVE('DOSYA_ID'),
  // 'musical-en':  DRIVE('DOSYA_ID'),
  // 'broadway-en': DRIVE('DOSYA_ID'),
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
    // /p/<slug> → ilgili programın Drive broşürü. Sadece linki elinde olan görür;
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
