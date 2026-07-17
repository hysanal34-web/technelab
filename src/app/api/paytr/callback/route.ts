import { NextRequest, NextResponse } from 'next/server'
import { verifyPayTRCallback } from '@/lib/paytr'

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()
    const merchantOid = body.get('merchant_oid') as string
    const status      = body.get('status') as string
    const totalAmount = body.get('total_amount') as string
    const hash        = body.get('hash') as string

    if (!merchantOid || !status || !hash) {
      return new NextResponse('PAYTR_INVALID', { status: 400 })
    }

    const valid = verifyPayTRCallback(merchantOid, status, totalAmount, hash)
    if (!valid) {
      console.error('[PayTR callback] Hash doğrulaması başarısız:', merchantOid)
      return new NextResponse('PAYTR_INVALID_HASH', { status: 400 })
    }

    if (status === 'success') {
      // TODO: veritabanında siparişi güncelle, e-posta gönder
      console.log(`[PayTR] Ödeme başarılı: ${merchantOid}, tutar: ${totalAmount}`)
      // Örnek: await db.orders.update({ oid: merchantOid, status: 'paid' })
    } else {
      console.log(`[PayTR] Ödeme başarısız: ${merchantOid}`)
    }

    // PayTR bu yanıtı bekler
    return new NextResponse('OK', { status: 200 })
  } catch (e) {
    console.error('[PayTR callback]', e)
    return new NextResponse('ERROR', { status: 500 })
  }
}
