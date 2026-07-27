'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  if (!mounted) return <div className="w-8 h-5" />

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1.5 group"
      aria-label={dark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
      data-hover
    >
      {/* Track */}
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 border ${
          dark
            ? 'bg-neon/15 border-neon/30'
            : 'bg-fg/10 border-fg/20'
        }`}
      >
        {/* Thumb */}
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
            dark
              ? 'left-5 bg-neon'
              : 'left-0.5 bg-fg'
          }`}
        />
      </div>
      {/* Icon */}
      <span className="text-[11px] select-none text-fg/50 group-hover:text-fg transition-colors duration-200">
        {dark ? '☀' : '☾'}
      </span>
    </button>
  )
}
