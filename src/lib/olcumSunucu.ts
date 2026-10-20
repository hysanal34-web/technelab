import 'server-only'
import { cookies, headers } from 'next/headers'
import { SITE_META } from '@/lib/data'
import { IZIN_CEREZI, KAYNAK_CEREZI, ZIYARETCI_CEREZI, izniCoz, kaynagiCoz } from '@/lib/izin'
import { capiOlayiOlustur, fbcOlustur, telefonNormalize, type CapiOlayAdi, type CapiOlay } from '@/lib/metaCapiYuk'
import { capiGonder, newEventId, type CapiSonuc } from '@/lib/metaCapi'
import { donusumKaydet, kimlikOzeti, type DonusumTuru } from '@/lib/olcumStore'

/**
 * Sunucuda doğrulanmış bir dönüşümü işler: Meta CAPI'ye bildirir ve sitenin
 * kendi ölçüm kaydına yazar. Form action'ları bunu, işlem GERÇEKTEN
 * başarılı olduktan sonra (kayıt alındı, e-posta gitti) çağırır.
 *
 * RIZA KAPILARI
 *   Çerez banner'ı "pazarlama" izni  → fbp, fbc, IP, ziyaretçi kimliği gider
 *   Formdaki "reklam ölçümü" kutusu  → e-posta ve telefonun SHA-256 özeti gider
 *   İkisi de yoksa                   → Meta'ya HİÇBİR ŞEY gitmez (kayıt "atlandi")
 * 15 Ekim 2026'ya kadar e-posta/telefon özeti kutu işaretlenmese de gidiyordu;
 * bu düzeltildi.
 *
 * HASSAS VERİ: Meta'ya yalnızca olay adı, program adı ve tahmini değer gider.
 * Doğum yılı, meslek, mesaj, sağlık ya da veli bilgisi bu fonksiyona hiç
 * verilmez.
 *
 * Asla hata fırlatmaz.
 */
export async function donusumuIsle(g: {
  tur: DonusumTuru
  /** CAPI'ye gidecek standart olaylar (hepsi aynı event_id ile). Boş olabilir. */
  olaylar: CapiOlayAdi[]
  /** Tarayıcının ürettiği kimlik — piksel de bunu gönderiyor. */
  eventId?: string | null
  /** Formun gönderildiği sayfa (tarayıcıdan). Doğrulanır. */
  sayfa?: string | null
  /** Sayfa gelmezse kullanılacak yol. */
  yedekYol: string
  program?: string
  slug?: string
  email?: string
  telefon?: string
  reklamRizasi: boolean
  deger?: number
  icerikAdi?: string
  icerikKimligi?: string
  icerikKategorisi?: string
}): Promise<CapiSonuc> {
  try {
    const c = await cookies()
    const h = await headers()
    const izin = izniCoz(c.get(IZIN_CEREZI)?.value) ?? { analitik: false, pazarlama: false, zaman: 0 }
    const kaynak = izin.analitik || izin.pazarlama ? kaynagiCoz(c.get(KAYNAK_CEREZI)?.value) : null
    const ziyaretci = izin.analitik ? c.get(ZIYARETCI_CEREZI)?.value : undefined

    const eventId = g.eventId && /^[\w\-:.]{8,80}$/.test(g.eventId) ? g.eventId : newEventId()
    const sayfa = guvenliSayfa(g.sayfa, g.yedekYol)

    // fbc: önce pikselin çerezi; yoksa yakalanan fbclid + tıklama zamanından.
    const fbc =
      c.get('_fbc')?.value ||
      fbcOlustur(kaynak?.son.fb, kaynak?.son.ts) ||
      fbcOlustur(kaynak?.ilk.fb, kaynak?.ilk.ts)

    const ortak = {
      eventId,
      sayfa,
      hashliIletisim: g.reklamRizasi,
      tarayiciSinyali: izin.pazarlama,
      email: g.email,
      telefon: g.telefon,
      fbp: c.get('_fbp')?.value,
      fbc,
      ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
      tarayici: h.get('user-agent') ?? undefined,
      harici: ziyaretci,
      deger: g.deger,
      icerikAdi: g.icerikAdi,
      icerikKimligi: g.icerikKimligi,
      icerikKategorisi: g.icerikKategorisi,
    }
    const olaylar = g.olaylar
      .map((olay) => capiOlayiOlustur({ ...ortak, olay }))
      .filter((o): o is CapiOlay => o !== null)

    const capi: CapiSonuc = olaylar.length ? await capiGonder(olaylar) : 'atlandi'

    const tel = g.telefon ? telefonNormalize(g.telefon) : null
    await donusumKaydet({
      tur: g.tur,
      olaylar: g.olaylar,
      eventId,
      zaman: new Date().toISOString(),
      sayfa: new URL(sayfa).pathname,
      program: g.program,
      slug: g.slug,
      kisi: kimlikOzeti(g.email || tel),
      telefonKimligi: kimlikOzeti(tel),
      ziyaretci: kimlikOzeti(ziyaretci),
      kaynak: kaynak ?? undefined,
      izin: { analitik: izin.analitik, pazarlama: izin.pazarlama },
      reklamRizasi: g.reklamRizasi,
      capi,
    })
    return capi
  } catch (err) {
    console.error('[olcum] dönüşüm işlenemedi (form akışı etkilenmedi):', (err as Error)?.message)
    return 'hata:ic'
  }
}

/** Yalnızca kendi alan adımızdaki bir sayfa kabul edilir; sorgu dizesi atılır. */
function guvenliSayfa(gelen: string | null | undefined, yedekYol: string): string {
  const kok = new URL(SITE_META.url)
  try {
    if (gelen) {
      const u = new URL(gelen)
      const izinli = u.hostname === kok.hostname || u.hostname === kok.hostname.replace(/^www\./, '')
      if (izinli) return `${kok.origin}${u.pathname}`
    }
  } catch { /* geçersiz adres */ }
  return `${kok.origin}${yedekYol}`
}
