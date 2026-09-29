import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'
import { SahneHero } from '@/components/sahne/SahneHero'
import { BuHafta } from '@/components/sahne/BuHafta'
import { sahneProgramlari } from '@/components/sahne/sahneVeri'
import { DisciplineGrid } from '@/components/DisciplineGrid'
import { InstructorStrip } from '@/components/InstructorStrip'

/**
 * /sahne — yeni ana sayfa hero'sunun ÖNİZLEMESİ. Onay gelene kadar ana sayfa
 * değişmiyor; burası indekslenmiyor. Onaydan sonra SahneHero page.tsx'e taşınır
 * ve bu rota silinir.
 */
export const metadata: Metadata = {
  title: 'Sahne — önizleme',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_META.url}/sahne` },
}

// Tanışma günleri tarih okuyor; sayfa build zamanında donmasın.
export const revalidate = 3600

export default function SahnePage() {
  const programs = sahneProgramlari()
  return (
    <>
      <SahneHero programs={programs} />
      <BuHafta />
      <DisciplineGrid />
      <InstructorStrip />
    </>
  )
}
