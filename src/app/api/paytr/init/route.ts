import { NextRequest, NextResponse } from 'next/server'
import { createPayTRToken } from '@/lib/paytr'
import { WORKSHOPS, DISCOUNT_THRESHOLD, DISCOUNT_RATE } from '@/lib/data'
import { headers } from 'next/headers'
import crypto from 'crypto'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { items, customer } = await req.json()

    if (!items?.length || !customer?.email || !customer?.name || !customer?.phone) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 })
    }
    if (!EMAIL_RE.test(customer.email)) {
      return NextResponse.json({ error: 'Geçersiz e-posta adresi' }, { status: 400 })
    }
    if (!customer.kvkkConsent) {
      return NextResponse.json({ error: 'KVKK aydınlatma metni onayı gerekli' }, { status: 400 })
    }

    // ── GÜVENLİK: fiyatlar ASLA istemciden alınmaz — sunucuda, gerçek veriden hesaplanır
    const ids: number[] = [...new Set((items as { id: number }[]).map((i) => Number(i.id)))]
    const workshops = ids
      .map((id) => WORKSHOPS.find((w) => w.id === id))
      .filter((w): w is NonNullable<typeof w> => !!w && w.active)

    if (workshops.length === 0) {
      return NextResponse.json({ error: 'Geçersiz sepet' }, { status: 400 })
    }

    const subtotal = workshops.reduce((s, w) => s + w.price, 0)
    const discountRate = workshops.length >= DISCOUNT_THRESHOLD ? DISCOUNT_RATE : 0
    const total = Math.round(subtotal * (1 - discountRate))

    // İndirimi kalemlere dağıt — sepet toplamı = çekilen tutar
    const basket = workshops.map((w) => ({
      name: `${w.title} — ${w.sub}`,
      price: Math.round(w.price * (1 - discountRate)),
      count: 1,
    }))
    // Yuvarlama farkını ilk kaleme ekle
    const basketSum = basket.reduce((s, b) => s + b.price, 0)
    if (basketSum !== total && basket[0]) basket[0].price += total - basketSum

    // Gerçek IP al
    const headersList = headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      '127.0.0.1'

    // Benzersiz sipariş ID
    const merchantOid = `TL-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://technelab.ist'

    const { token } = await createPayTRToken({
      merchantOid,
      email: customer.email,
      paymentAmount: total,
      userName: String(customer.name).slice(0, 60),
      userAddress: String(customer.address || 'İstanbul').slice(0, 200),
      userPhone: String(customer.phone).slice(0, 20),
      userIp: ip,
      basket,
      okUrl:       `${siteUrl}/odeme-basarili?oid=${merchantOid}`,
      failUrl:     `${siteUrl}/sepet?fail=1`,
      callbackUrl: `${siteUrl}/api/paytr/callback`,
      testMode: process.env.NODE_ENV === 'production' ? '0' : '1',
    })

    return NextResponse.json({ token, merchantOid })
  } catch (e: any) {
    console.error('[PayTR init]', e)
    return NextResponse.json({ error: e.message || 'Sunucu hatası' }, { status: 500 })
  }
}
