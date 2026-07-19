import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WORKSHOPS, SITE_META } from '@/lib/data'
import { submitRegistration } from './actions'
import RegistrationForm from '@/components/RegistrationForm'
import YouthRegistrationForm from '@/components/YouthRegistrationForm'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return WORKSHOPS.filter((w) => w.active).map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = WORKSHOPS.find((w) => w.slug === slug)
  if (!w) return {}
  return {
    title: `Başvuru — ${w.title} · ${w.sub}`,
    description: `${w.title} programına başvurun. ${w.venue} · ${w.duration}`,
    alternates: { canonical: `${SITE_META.url}/atolyeler/${slug}/kayit` },
    robots: { index: false },
  }
}

export default async function KayitPage({ params }: Props) {
  const { slug } = await params
  const w = WORKSHOPS.find((w) => w.slug === slug && w.active)
  if (!w) notFound()

  // Bind slug into the server action so the client component receives
  // a (formData) => Promise<FormState> signature
  const boundAction = submitRegistration.bind(null, slug)

  const workshopMin = {
    slug:       w.slug,
    title:      w.title,
    sub:        w.sub,
    category:   w.category,
    venue:      w.venue,
    duration:   w.duration,
    instructor: w.instructor,
  }

  return (
    <>
      {/* Neon top rule */}
      <div className="h-[2px] w-full bg-neon" />

      {w.slug === 'english-drama-youth' ? (
        <YouthRegistrationForm workshop={workshopMin} action={boundAction} />
      ) : (
        <RegistrationForm workshop={workshopMin} action={boundAction} />
      )}
    </>
  )
}
