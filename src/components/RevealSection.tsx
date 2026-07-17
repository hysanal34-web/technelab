'use client'
import { useEffect, useRef } from 'react'

export function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } },
      { threshold: 0.07 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}
