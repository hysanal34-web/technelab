'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'tr' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangCtx = createContext<LangContextValue>({ lang: 'tr', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('tr')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Lang | null
      if (stored === 'en') setLangState('en')
    } catch {}
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}
