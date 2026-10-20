import { NextRequest, NextResponse } from 'next/server'
import { waImzaDogrula, waOlaylariniCoz } from '@/lib/whatsappWebhook'
import { waKaydet, kimlikOzeti } from '@/lib/olcumStore'
import { telefonNormalize } from '@/lib/metaCapiYuk'

/**
 * WhatsApp Business Platform (Cloud API) webhook.
 *
 * PASİF: Aşağıdaki iki değişken tanımlanana kadar 404 döner.
 *   WHATSAPP_VERIFY_TOKEN → Meta uygulama panelinde webhook kurarken
 *                           yazacağın, kendi belirlediğin rastgele metin.
 *   WHATSAPP_APP_SECRET   → Meta uygulamasının "App Secret" değeri.
 *                           Her POST'un imzası bununla doğrulanır.
 *
 * Kurulum adımları: docs/olcum/META-OLCUM.md → "WhatsApp".
 * Webhook adresi: https://www.technelabistanbul.com/api/whatsapp/webhook
 * Abone olunacak alanlar: messages (ve WhatsApp Business uygulamasıyla
 * birlikte kullanılıyorsa smb_message_echoes).
 */

export async function GET(req: NextRequest) {
  const beklenen = process.env.WHATSAPP_VERIFY_TOKEN
  if (!beklenen) return new NextResponse(null, { status: 404 })
  const p = req.nextUrl.searchParams
  if (p.get('hub.mode') === 'subscribe' && p.get('hub.verify_token') === beklenen) {
    return new NextResponse(p.get('hub.challenge') ?? '', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }
  return new NextResponse(null, { status: 403 })
}

export async function POST(req: NextRequest) {
  const gizli = process.env.WHATSAPP_APP_SECRET
  if (!gizli) return new NextResponse(null, { status: 404 })

  const ham = await req.text()
  if (!waImzaDogrula(ham, req.headers.get('x-hub-signature-256'), gizli)) {
    return new NextResponse(null, { status: 401 })
  }

  try {
    const olaylar = waOlaylariniCoz(JSON.parse(ham))
    await Promise.all(
      olaylar.map((o) => {
        const kisi = kimlikOzeti(telefonNormalize(o.numara))
        if (!kisi) return Promise.resolve(false)
        return waKaydet({
          yon: o.yon,
          zaman: new Date(o.zamanMs).toISOString(),
          kisi,
          reklamdan: o.reklamdan || undefined,
          reklamKimligi: o.reklamKimligi,
        })
      }),
    )
  } catch (err) {
    // Meta 200 almazsa aynı bildirimi tekrar tekrar yollar; ayrıştırma hatası
    // tekrar denemeyle düzelmez. Logla ve kabul et.
    console.error('[whatsapp] webhook işlenemedi:', (err as Error)?.message)
  }
  return new NextResponse(null, { status: 200 })
}
