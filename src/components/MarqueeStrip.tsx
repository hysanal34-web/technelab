export function MarqueeStrip() {
  const items = ['YARATIM','ARAŞTIRMA','ÜRETİM','BAĞIMSIZ TİYATRO','PERFORMANS','İSTANBUL','LABORATORY']
  const rep = [...items,...items,...items,...items]
  return (
    <div className="overflow-hidden border-t border-b border-border bg-bgAlt py-3 select-none" aria-hidden="true">
      <div className="marquee-inner items-baseline">
        {rep.map((item,i) => (
          <span
            key={i}
            className="font-display pr-4 shrink-0 leading-none"
            style={
              i % 2 === 0
                ? { fontSize: 'clamp(20px, 2.4vw, 34px)', letterSpacing: '0.04em', color: 'var(--fg)' }
                : { fontSize: 'clamp(20px, 2.4vw, 34px)', letterSpacing: '0.04em', color: 'transparent', WebkitTextStroke: '1px var(--neon)' }
            }
          >
            {item}
            <span className="inline-block px-3" style={{ color: 'var(--neon)', WebkitTextStroke: '0px' }}>✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}
