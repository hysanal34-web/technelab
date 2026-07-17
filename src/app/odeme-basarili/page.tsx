'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { SITE_META } from '@/lib/data'
export default function PaymentSuccessPage() {
  const clear = useCart((s) => s.clear)
  useEffect(() => {
    clear()
    // PayTR iframe'i içinde açıldıysa üst pencereye çık
    if (window.top && window.top !== window.self) {
      try { window.top.location.href = window.location.href } catch { /* cross-origin */ }
    }
  }, [clear])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-10 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-neon flex items-center justify-center mb-8">
        <span className="text-neon text-xl">✓</span>
      </div>
      <h1 className="font-display text-neon mb-4" style={{ fontSize: 'clamp(36px,6vw,72px)', letterSpacing: '0.02em' }}>ÖDEME BAŞARILI</h1>
      <p className="font-mono text-[14px] text-stone mb-2 max-w-md">Kaydınız tamamlandı. Detaylar e-posta adresinize gönderilecek.</p>
      <p className="font-mono text-[11px] text-dim mb-10">Soru için: <a href={`mailto:${SITE_META.email}`} className="text-neon hover:underline">{SITE_META.email}</a></p>
      <Link href="/atolyeler" className="font-mono text-[10px] tracking-[0.14em] uppercase border border-neon text-neon px-6 py-3 hover:bg-neon hover:text-bg transition-all duration-200" data-hover>
        atölyelere dön
      </Link>
    </div>
  )
}
