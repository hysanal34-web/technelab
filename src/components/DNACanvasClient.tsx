'use client'
import dynamic from 'next/dynamic'

const DNACanvas = dynamic(
  () => import('@/components/DNACanvas').then((m) => m.DNACanvas),
  { ssr: false }
)

export function DNACanvasClient() {
  return <DNACanvas />
}
