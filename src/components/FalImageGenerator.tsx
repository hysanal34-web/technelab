'use client'
import { useState } from 'react'

/**
 * FalImageGenerator — Techne Lab için AI görsel üretimi
 * Fal.ai FLUX Schnell modeli kullanır.
 * /api/generate-image endpoint'ine istek atar.
 */

const PROMPT_PRESETS = [
  { label: 'Sahne Işığı', value: 'dramatic theatre stage lighting, single spotlight, actor silhouette, Istanbul' },
  { label: 'Kamera Önü', value: 'on-camera acting workshop, film set atmosphere, black and white, cinematic' },
  { label: 'Atölye', value: 'theatre workshop rehearsal, intimate studio space, creative energy, artistic' },
  { label: 'Performans', value: 'live theatre performance, emotional moment, dramatic pose, stage presence' },
  { label: 'Müzikal', value: 'musical theatre rehearsal, Broadway style, dynamic movement, expressive' },
]

export function FalImageGenerator() {
  const [prompt, setPrompt]           = useState('')
  const [imageUrl, setImageUrl]       = useState<string | null>(null)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)

  async function generate() {
    if (!prompt.trim()) return
    setLoading(true)
    setError(null)
    setImageUrl(null)
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, width: 1024, height: 768 }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || 'Görsel üretimi başarısız.')
      } else {
        setImageUrl(data.imageUrl)
      }
    } catch {
      setError('Bağlantı hatası.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="border-t border-border px-4 md:px-10 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3">ai görsel</p>
        <h2
          className="font-display text-fg leading-none mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '0.02em' }}
        >
          GÖRSEL ÜRET
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-md leading-relaxed">
          Fal.ai ile sahne atmosferi, atölye kareleri veya prova anları — metinden görsel.
        </p>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PROMPT_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setPrompt(p.value)}
            className="font-mono text-[11px] tracking-[0.12em] uppercase border border-fg/20 text-stone px-3 py-1.5 hover:border-neon hover:text-neon transition-all duration-200"
            data-hover
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
          placeholder="Sahne tasviri yaz... (Türkçe veya İngilizce)"
          className="flex-1 bg-transparent border border-fg/20 text-fg font-mono text-[13px] px-4 py-3 placeholder:text-dim focus:outline-none focus:border-neon transition-colors duration-200"
        />
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="font-mono text-[11px] tracking-[0.18em] uppercase bg-neon text-bg px-8 py-3 hover:bg-fg hover:text-bg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          data-hover
        >
          {loading ? 'üretiliyor…' : 'üret →'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="font-mono text-[12px] text-red-400 mb-6">{error}</p>
      )}

      {/* Loading state */}
      {loading && (
        <div className="border border-border aspect-video max-w-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-6 h-6 border border-neon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone">FLUX Schnell işliyor…</p>
          </div>
        </div>
      )}

      {/* Generated image */}
      {imageUrl && !loading && (
        <div className="max-w-2xl">
          <div className="relative overflow-hidden border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Fal.ai ile üretilen görsel"
              className="w-full block"
              style={{ aspectRatio: '4/3', objectFit: 'cover' }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="font-mono text-[11px] text-dim truncate max-w-xs">{prompt}</p>
            <a
              href={imageUrl}
              download="techne-lab-ai-gorsel.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon hover:text-fg transition-colors whitespace-nowrap ml-4"
              data-hover
            >
              indir →
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
