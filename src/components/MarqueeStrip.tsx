export function MarqueeStrip() {
  const items = ['YARATIM','ARAŞTIRMA','ÜRETİM','BAĞIMSIZ TİYATRO','PERFORMANS','İSTANBUL','2019—']
  const rep = [...items,...items,...items,...items]
  return (
    <div className="overflow-hidden border-t border-b border-border bg-bgAlt py-2.5 select-none" aria-hidden="true">
      <div className="marquee-inner">
        {rep.map((item,i) => (
          <span key={i} className={`font-mono text-[10px] tracking-widest2 uppercase pr-10 shrink-0 ${i%2===0?'text-stone':'text-neon'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
