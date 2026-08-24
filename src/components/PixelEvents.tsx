'use client'

import { useEffect } from 'react'
import { trackViewContent, trackInitiateCheckout } from '@/components/MetaPixel'

/**
 * Sunucu component'ları Pixel olayı gönderemez (tarayıcıda çalışmıyorlar).
 * Bu küçük client component'lar program ve kayıt sayfalarına yerleştiriliyor,
 * hiçbir şey render etmiyor — sadece olay tetikliyor.
 */

type Props = { name: string; price: number; slug: string }

/** Program detay sayfasına konur — ViewContent (yeniden pazarlama havuzu) */
export function TrackProgramView({ name, price, slug }: Props) {
  useEffect(() => {
    trackViewContent(name, price, slug)
  }, [name, price, slug])
  return null
}

/** Başvuru sayfasına konur — InitiateCheckout (niyet sinyali) */
export function TrackApplicationStart({ name, price, slug }: Props) {
  useEffect(() => {
    trackInitiateCheckout(name, price, slug)
  }, [name, price, slug])
  return null
}
