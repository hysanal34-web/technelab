'use client'
import { SITE_META } from '@/lib/data'

export function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const ad     = fd.get('ad')     as string
    const eposta = fd.get('eposta') as string
    const konu   = fd.get('konu')   as string
    const mesaj  = fd.get('mesaj')  as string
    const body   = `Ad: ${ad}\nE-posta: ${eposta}\n\n${mesaj}`
    window.location.href = `mailto:${SITE_META.email}?subject=${encodeURIComponent(konu || 'İletişim')}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {[
        { name: 'ad',     label: 'ad soyad', placeholder: 'Ad Soyad', type: 'text' },
        { name: 'eposta', label: 'e-posta',  placeholder: 'E-posta',  type: 'email' },
        { name: 'konu',   label: 'konu',     placeholder: 'Konu',     type: 'text' },
      ].map(({ name, label, placeholder, type }) => (
        <div key={name}>
          <label htmlFor={name} className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-2">{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required
            className="w-full bg-transparent border-b border-border focus:border-neon py-3 font-mono text-[13px] text-fg outline-none transition-colors duration-200 placeholder:text-dim"
          />
        </div>
      ))}
      <div>
        <label htmlFor="mesaj" className="font-mono text-[11px] tracking-[0.16em] uppercase text-neon block mb-2">mesaj</label>
        <textarea
          id="mesaj"
          name="mesaj"
          rows={5}
          placeholder="Mesajınız..."
          required
          className="w-full bg-transparent border-b border-border focus:border-neon py-3 font-mono text-[13px] text-fg outline-none resize-none transition-colors duration-200 placeholder:text-dim"
        />
      </div>
      <button
        type="submit"
        className="self-start font-mono text-[11px] tracking-[0.16em] uppercase bg-neon text-bg px-8 py-4 hover:bg-transparent hover:text-neon border border-neon transition-all duration-200 mt-2"
        data-hover
      >
        gönder
      </button>
    </form>
  )
}
