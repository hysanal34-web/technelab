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
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://www.paytr.com; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
]

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
}
export default nextConfig
