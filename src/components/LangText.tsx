'use client'
import type { ReactNode } from 'react'
import { useLang } from '@/contexts/LanguageContext'

/** Inline bilingual text — renders TR by default (SSR), switches to EN after hydration */
export function T({ tr, en }: { tr: ReactNode; en: ReactNode }) {
  const { lang } = useLang()
  return <>{lang === 'en' ? en : tr}</>
}
