import { NextRequest, NextResponse } from 'next/server'
import { IZIN_CEREZI, KAYNAK_CEREZI, ZIYARETCI_CEREZI, izniCoz, kaynagiCoz } from '@/lib/izin'
import { tiklamaKaydet, kimlikOzeti, type TiklamaTuru } from '@/lib/olcumStore'

/**
 * Sitenin kendi tıklama sayacı: WhatsApp, telefon ve form başlangıcı.
 *
 * NEDEN META'YA GÜVENMİYORUZ: piksel yalnızca izin verenlerde çalışıyor ve
 * reklam engelleyici onu kesiyor. "Kaç kişi WhatsApp'a tıkladı" sorusunun
 * cevabı burada, kendi kayıtlarımızda.
 *
 * İZİN: Kayıt her zaman tutulur ama izin yoksa yalnızca tür, sayfa, buton ve
 * zaman saklanır. Ziyaretçi kimliği (tekil sayım) analitik izniyle, reklam
 * kaynağı analitik ya da pazarlama izniyle eklenir. IP saklanmaz.
 *
 * KÖTÜYE KULLANIM: yalnızca kendi alan adımızdan gelen istek kabul edilir,
 * gövde 2 KB ile sınırlı, bot tarayıcılar yok sayılır. Kayıt sayısını şişirmek
 * isteyen biri için bu kesin bir engel değil; panel bu sayıların "tarayıcı
 * beyanı, doğrulanmamış" olduğunu ayrıca yazıyor.
 */

const TURLER: TiklamaTuru[] = ['whatsapp', 'telefon', 'form_baslangic']
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headlesschrome|lighthouse/i

function metin(v: unknown, max: number): string | undefined {
  if (typeof v !== 'string') return undefined
  const t = v.trim().slice(0, max)
  return t || undefined
}

export async function POST(req: NextRequest) {
  // Beacon cevabı okunmuyor; her durumda 204 dön, bilgi sızdırma.
  const bos = new NextResponse(null, { status: 204 })
  try {
    const kaynakAdres = req.headers.get('origin') || req.headers.get('referer') || ''
    const host = req.headers.get('host') || ''
    if (!kaynakAdres || !host || new URL(kaynakAdres).host !== host) return bos
    if (BOT.test(req.headers.get('user-agent') || '')) return bos

    const ham = await req.text()
    if (ham.length > 2048) return bos
    const g = JSON.parse(ham) as Record<string, unknown>
    const tur = g.tur as TiklamaTuru
    if (!TURLER.includes(tur)) return bos

    const izin = izniCoz(req.cookies.get(IZIN_CEREZI)?.value) ?? { analitik: false, pazarlama: false, zaman: 0 }
    const kaynak = izin.analitik || izin.pazarlama ? kaynagiCoz(req.cookies.get(KAYNAK_CEREZI)?.value) : null

    await tiklamaKaydet({
      tur,
      zaman: new Date().toISOString(),
      sayfa: metin(g.sayfa, 200) ?? '/',
      cta: metin(g.cta, 80),
      form: metin(g.form, 60),
      kimlik: metin(g.kimlik, 80),
      ziyaretci: izin.analitik ? kimlikOzeti(req.cookies.get(ZIYARETCI_CEREZI)?.value) : undefined,
      kaynak: kaynak?.son ?? undefined,
      izin: { analitik: izin.analitik, pazarlama: izin.pazarlama },
    })
  } catch {
    /* bozuk gövde: yok say */
  }
  return bos
}
