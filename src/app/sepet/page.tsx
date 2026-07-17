'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, remove, subtotal, discount, total, hasDiscount, count } = useCart()
  const [step, setStep] = useState<'cart' | 'form' | 'payment'>('cart')
  const [paytrToken, setPaytrToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [kvkk, setKvkk] = useState(false)
  const [sales, setSales] = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', experience: '', source: '',
  })

  // Başarısız ödeme dönüşü (?fail=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('fail') === '1') {
      setError('Ödeme tamamlanamadı. Kart bilgilerinizi kontrol edip tekrar deneyebilirsiniz.')
      setStep('form')
    }
  }, [])

  // PayTR iframe yükseklik dinleyicisi
  useEffect(() => {
    if (step !== 'payment') return
    const onMsg = (e: MessageEvent) => {
      const el = document.getElementById('paytriframe')
      if (!el) return
      if (e.data === 'loaded') el.style.height = '500px'
      if (typeof e.data === 'object' && e.data?.height) el.style.height = e.data.height + 'px'
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [step])

  const handleProceed = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError('Lütfen zorunlu alanları doldurun.'); return
    }
    if (!kvkk || !sales) {
      setError('Devam etmek için KVKK aydınlatma metnini ve mesafeli satış koşullarını onaylamanız gerekir.'); return
    }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/paytr/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id })),
          customer: { ...form, kvkkConsent: kvkk, salesConsent: sales },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ödeme başlatılamadı')
      setPaytrToken(data.token)
      setStep('payment')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (count() === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-10 text-center">
        <div className="font-display text-dim mb-6" style={{ fontSize: 'clamp(48px,8vw,96px)', letterSpacing: '0.02em' }}>SEPET BOŞ</div>
        <p className="font-mono text-[14px] text-stone mb-8">Henüz sepetinize atölye eklemediniz.</p>
        <Link href="/atolyeler" className="font-mono text-[10px] tracking-[0.14em] uppercase bg-neon text-bg px-8 py-4 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200" data-hover>
          atölyelere git
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="px-4 md:px-10 pt-16 pb-8 border-b border-border">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">sepet</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(36px,6vw,80px)', letterSpacing: '0.01em', lineHeight: 0.9 }}>
          KAYIT &amp;<br /><span className="text-neon">ÖDEME</span>
        </h1>
      </div>

      <div className="px-4 md:px-10 py-12 grid md:grid-cols-[1fr_380px] gap-12 items-start">

        {/* Sol: Ürünler / Form / PayTR */}
        <div>
          {step === 'cart' && (
            <>
              <h2 className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-6">seçilen atölyeler</h2>
              <div className="space-y-0 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between py-5 border-b border-border group">
                    <div>
                      <p className="font-display text-fg mb-0.5" style={{ fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '0.02em' }}>{item.title}</p>
                      <p className="font-mono text-[11px] italic text-stone mb-1">{item.sub}</p>
                      <p className="font-mono text-[11px] text-dim">{item.instructor}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-3">
                      <span className="font-display text-neon" style={{ fontSize: 'clamp(18px,2vw,24px)', letterSpacing: '0.02em' }}>
                        {item.price.toLocaleString('tr-TR')} ₺
                      </span>
                      <button
                        onClick={() => remove(item.id)}
                        className="font-mono text-[10px] tracking-[0.12em] uppercase text-dim hover:text-red-400 transition-colors duration-200"
                        data-hover
                      >
                        kaldır
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep('form')}
                className="w-full font-mono text-[10px] tracking-[0.16em] uppercase bg-neon text-bg py-4 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200"
                data-hover
              >
                bilgilere geç →
              </button>
            </>
          )}

          {step === 'form' && (
            <>
              <button
                onClick={() => setStep('cart')}
                className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone hover:text-neon transition-colors duration-200 mb-8 block"
                data-hover
              >
                ← geri
              </button>
              <h2 className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-6">kişisel bilgiler</h2>
              <div className="space-y-5 mb-8">
                {[
                  { key: 'name', label: 'ad soyad *', type: 'text', placeholder: 'Ad Soyad' },
                  { key: 'email', label: 'e-posta *', type: 'email', placeholder: 'ornek@mail.com' },
                  { key: 'phone', label: 'telefon *', type: 'tel', placeholder: '05XX XXX XX XX' },
                  { key: 'address', label: 'adres', type: 'text', placeholder: 'İstanbul' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-2">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-transparent border-b border-border focus:border-neon py-3 font-mono text-[13px] text-fg outline-none transition-colors duration-200"
                    />
                  </div>
                ))}

                {/* Başvuru soruları */}
                {[
                  { key: 'experience', label: 'sahne / tiyatro deneyimin', options: ['Hiç yok', 'Biraz var (amatör)', 'Deneyimliyim'] },
                  { key: 'source', label: 'bizi nereden duydun', options: ['Instagram', 'Google araması', 'Arkadaş tavsiyesi', 'Diğer'] },
                ].map(({ key, label, options }) => (
                  <div key={key}>
                    <label className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-2">{label}</label>
                    <select
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-bg border-b border-border focus:border-neon py-3 font-mono text-[13px] text-fg outline-none transition-colors duration-200"
                    >
                      <option value="">— seç (isteğe bağlı)</option>
                      {options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* KVKK & mesafeli satış onayları */}
              <div className="space-y-3 mb-8 border border-border p-5 bg-bgAlt">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={kvkk}
                    onChange={(e) => setKvkk(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#B8F000] shrink-0"
                  />
                  <span className="font-mono text-[13px] text-stone leading-relaxed group-hover:text-fg transition-colors">
                    <Link href="/kvkk" target="_blank" className="text-neon underline underline-offset-2">KVKK Aydınlatma Metni</Link>&apos;ni
                    okudum; kişisel verilerimin kayıt ve iletişim amacıyla işlenmesine açık rıza veriyorum. *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={sales}
                    onChange={(e) => setSales(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#B8F000] shrink-0"
                  />
                  <span className="font-mono text-[13px] text-stone leading-relaxed group-hover:text-fg transition-colors">
                    Mesafeli satış ve iptal/iade koşullarını kabul ediyorum. *
                  </span>
                </label>
              </div>

              {error && <p className="font-mono text-[12px] text-red-400 mb-4">{error}</p>}
              <button
                onClick={handleProceed}
                disabled={loading}
                className="w-full font-mono text-[10px] tracking-[0.16em] uppercase bg-neon text-bg py-4 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200 disabled:opacity-50"
                data-hover
              >
                {loading ? 'hazırlanıyor...' : 'ödemeye geç →'}
              </button>
            </>
          )}

          {step === 'payment' && paytrToken && (
            <>
              <h2 className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-6">güvenli ödeme</h2>
              <p className="font-mono text-[11px] text-stone mb-6">PayTR güvenli ödeme sayfası aşağıda yükleniyor. Kredi/banka kartı veya taksit seçeneği ile ödeyebilirsiniz.</p>
              <iframe
                src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
                id="paytriframe"
                className="w-full border-0"
                style={{ minHeight: 500 }}
                allow="payment"
                title="PayTR Güvenli Ödeme"
              />
            </>
          )}
        </div>

        {/* Sağ: Özet */}
        <aside className="sticky top-20 border border-border bg-bgHi p-8" aria-label="Sipariş özeti">
          <h2 className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-6">özet</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="font-mono text-[11px] text-stone">ara toplam</span>
              <span className="font-mono text-[11px] text-fg">{subtotal().toLocaleString('tr-TR')} ₺</span>
            </div>
            {hasDiscount() && (
              <div className="flex justify-between text-neon">
                <span className="font-mono text-[11px]">%25 indirim</span>
                <span className="font-mono text-[11px]">−{discount().toLocaleString('tr-TR')} ₺</span>
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 mb-6">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[11px] text-stone">toplam</span>
              <span className="font-display text-neon" style={{ fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '0.02em' }}>
                {total().toLocaleString('tr-TR')} ₺
              </span>
            </div>
          </div>

          {hasDiscount() && (
            <div className="bg-neon/10 border border-neon/30 p-4 mb-6">
              <p className="font-mono text-[11px] text-neon">
                2 atölye indirimi uygulandı — {discount().toLocaleString('tr-TR')} ₺ tasarruf ettiniz.
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-5 border border-neon/40 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="4.5" width="6" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="0.8" className="text-neon"/>
                <path d="M3 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="square" className="text-neon"/>
              </svg>
            </div>
            <span className="font-mono text-[11px] text-dim">PayTR güvenli ödeme</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-neon/40 flex items-center justify-center">
              <span className="text-neon text-[10px]">✓</span>
            </div>
            <span className="font-mono text-[11px] text-dim">256-bit SSL şifreleme</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
