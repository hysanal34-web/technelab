import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Techne Lab İstanbul — Sahne Sanatları Atölyeleri'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#141414',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Neon top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#B8F000' }} />

        {/* Grid lines decoration */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(232,229,223,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,229,223,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
          background: 'linear-gradient(to bottom, transparent, rgba(10,10,12,0.8))',
        }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', flex: 1, position: 'relative' }}>
          {/* Logo / brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{ width: '36px', height: '2px', background: '#B8F000' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B8F000' }}>
              TECHNE LAB İSTANBUL
            </span>
          </div>

          {/* Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '96px',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              color: '#E8E5DF',
              marginBottom: '8px',
            }}>
              SAHNE
            </div>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '96px',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              color: '#B8F000',
            }}>
              SANATLARI
            </div>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '96px',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              color: '#E8E5DF',
              opacity: 0.4,
            }}>
              ATÖLYELERİ
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '40px' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Oyunculuk', 'Dramaturji', 'Dans', 'Müzikal Tiyatro'].map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'monospace', fontSize: '10px',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(138,135,128,0.8)',
                  border: '1px solid rgba(232,229,223,0.15)',
                  padding: '6px 12px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <span style={{
              fontFamily: 'monospace', fontSize: '11px',
              letterSpacing: '0.1em', color: 'rgba(232,229,223,0.4)',
            }}>
              technelab.ist
            </span>
          </div>
        </div>

        {/* Neon bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#B8F000', opacity: 0.3 }} />
      </div>
    ),
    { ...size }
  )
}
