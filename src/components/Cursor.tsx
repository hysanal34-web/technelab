'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const el = dot.current
    if (!el) return

    let x = -100, y = -100, tx = -100, ty = -100
    let raf: number

    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      if (el) el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isHover = t.closest('a, button, [data-hover], input, textarea, label')
      el?.classList.toggle('hovering', !!isHover)
    }

    const down = () => el?.classList.add('clicking')
    const up   = () => el?.classList.remove('clicking')

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dot} className="cursor-dot hidden md:block" aria-hidden="true" />
}
