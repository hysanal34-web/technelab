'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [light, setLight] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLight(document.documentElement.classList.contains('light'))
  }, [])

  function toggle() {
    const next = !light
    setLight(next)
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('theme', next ? 'light' : 'dark')
  }

  if (!mounted) return <div className="w-8 h-5" />

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1.5 group"
      aria-label={light ? 'Karanlık temaya geç' : 'Aydınlık temaya geç'}
      data-hover
    >
      {/* Track */}
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 border ${
          light
            ? 'bg-fg/10 border-fg/20'
            : 'bg-neon/15 border-neon/30'
        }`}
      >
        {/* Thumb */}
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
            light
              ? 'left-5 bg-fg'
              : 'left-0.5 bg-neon'
          }`}
        />
      </div>
      {/* Icon */}
      <span className="text-[11px] select-none text-fg/50 group-hover:text-fg transition-colors duration-200">
        {light ? '☀' : '☾'}
      </span>
    </button>
  )
}
