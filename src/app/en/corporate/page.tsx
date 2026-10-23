import type { Metadata } from 'next'
import { B2BLanding } from '@/components/B2BLanding'
import { b2bHub } from '@/lib/b2b'
import { b2bMetadata } from '@/lib/b2bMeta'

const p = b2bHub('en/corporate')
export const metadata: Metadata = b2bMetadata(p)

export default function Page() {
  return (
    <div lang="en">
      <B2BLanding p={p} />
    </div>
  )
}
