import type { OlcumDonusum, OlcumTiklama, WaKayit, DonusumTuru } from '@/lib/olcumStore'
import { kanalEtiketi } from '@/lib/izin'
import { waGorusmeOzeti } from '@/lib/whatsappWebhook'

/**
 * Ölçüm panelinin hesapları — saf fonksiyonlar (depo ya da ağ yok).
 *
 * İKİ SAYI HER ZAMAN AYRI: "toplam" işlem sayısıdır (aynı kişi iki form
 * doldurursa 2). "Tekil" farklı kişi sayısıdır; yalnızca kimliği bilinen
 * kayıtlar üzerinden hesaplanır, kimliksiz kayıtlar ayrıca belirtilir.
 * Hiçbir sayı tahminle tamamlanmaz.
 */

export const DONUSUM_ETIKET: Record<DonusumTuru, string> = {
  iletisim: 'İletişim formu (Contact)',
  tanisma: 'Tanışma günü / randevu (Schedule)',
  program: 'Program başvurusu (CompleteRegistration)',
  bulten: 'Bülten (Subscribe)',
  bekleme: 'Bekleme listesi',
}

export const FORM_TURU: Record<string, DonusumTuru> = {
  iletisim_formu: 'iletisim',
  tanisma_gunu: 'tanisma',
  program_basvurusu: 'program',
  bulten: 'bulten',
  bekleme_listesi: 'bekleme',
}

export type Sayim = { toplam: number; tekil: number; kimliksiz: number }

function say<T>(kayitlar: T[], kimlik: (k: T) => string | undefined): Sayim {
  const set = new Set<string>()
  let kimliksiz = 0
  for (const k of kayitlar) {
    const id = kimlik(k)
    if (id) set.add(id)
    else kimliksiz++
  }
  return { toplam: kayitlar.length, tekil: set.size, kimliksiz }
}

function grupla<T>(kayitlar: T[], anahtar: (k: T) => string): [string, T[]][] {
  const m = new Map<string, T[]>()
  for (const k of kayitlar) {
    const a = anahtar(k)
    m.set(a, [...(m.get(a) ?? []), k])
  }
  return [...m.entries()].sort((a, b) => b[1].length - a[1].length)
}

export function raporHazirla(d: OlcumDonusum[], t: OlcumTiklama[], wa: WaKayit[], waBagli: boolean) {
  const turlu = (tur: DonusumTuru) => d.filter((x) => x.tur === tur)
  const donusum = Object.fromEntries(
    (Object.keys(DONUSUM_ETIKET) as DonusumTuru[]).map((tur) => [tur, say(turlu(tur), (x) => x.kisi)]),
  ) as Record<DonusumTuru, Sayim>

  const tiklama = {
    whatsapp: say(t.filter((x) => x.tur === 'whatsapp'), (x) => x.ziyaretci),
    telefon: say(t.filter((x) => x.tur === 'telefon'), (x) => x.ziyaretci),
  }

  // Form başlatıp tamamlamayan — yalnızca analitik izni veren ziyaretçilerde
  // ölçülebilir (ziyaretçi kimliği gerekiyor).
  const formlar = Object.entries(FORM_TURU).map(([form, tur]) => {
    const baslayan = t.filter((x) => x.tur === 'form_baslangic' && x.form === form)
    const tamamlayan = turlu(tur)
    const tamamlayanZ = new Set(tamamlayan.map((x) => x.ziyaretci).filter(Boolean) as string[])
    const baslayanZ = new Set(baslayan.map((x) => x.ziyaretci).filter(Boolean) as string[])
    const terk = [...baslayanZ].filter((z) => !tamamlayanZ.has(z)).length
    return { form, baslatma: baslayan.length, tamamlama: tamamlayan.length, izinliBaslayan: baslayanZ.size, izinliTerk: terk }
  })

  // İletişim kurup randevu oluşturmayan (kişi kimliğiyle, formlar üzerinden).
  const randevuKisi = new Set(turlu('tanisma').map((x) => x.kisi).filter(Boolean) as string[])
  const iletisimKisi = new Set(turlu('iletisim').map((x) => x.kisi).filter(Boolean) as string[])
  const iletisimRandevusuz = [...iletisimKisi].filter((k) => !randevuKisi.has(k)).length

  // WhatsApp (yalnızca webhook bağlıysa).
  let whatsapp: null | (ReturnType<typeof waGorusmeOzeti> & { randevuya: number; nitelikli: number }) = null
  if (waBagli) {
    const oz = waGorusmeOzeti(wa)
    const tanismaTel = turlu('tanisma').filter((x) => x.telefonKimligi)
    const nitelikliTel = [...tanismaTel, ...turlu('program').filter((x) => x.telefonKimligi)]
    const sonra = (liste: OlcumDonusum[]) =>
      [...oz.ilkMesaj.entries()].filter(([kisi, ilk]) =>
        liste.some((x) => x.telefonKimligi === kisi && Date.parse(x.zaman) >= ilk),
      ).length
    whatsapp = { ...oz, randevuya: sonra(tanismaTel), nitelikli: sonra(nitelikliTel) }
  }

  const tabloSatiri = (liste: OlcumDonusum[]) => {
    const satir: Record<string, number> = { toplam: liste.length }
    for (const tur of Object.keys(DONUSUM_ETIKET)) satir[tur] = liste.filter((x) => x.tur === tur).length
    return satir
  }
  const kanal = grupla(d, (x) => kanalEtiketi(x.kaynak?.son)).map(([k, l]) => ({ ad: k, ...tabloSatiri(l) }))
  const kampanya = grupla(
    d.filter((x) => x.kaynak?.son.c),
    (x) => `${x.kaynak!.son.c}${x.kaynak!.son.s ? ` · ${x.kaynak!.son.s}` : ''}`,
  ).map(([k, l]) => ({ ad: k, ...tabloSatiri(l) }))
  const sayfa = grupla(d, (x) => x.sayfa).map(([k, l]) => ({ ad: k, ...tabloSatiri(l) }))
  const tiklamaSayfa = grupla(
    t.filter((x) => x.tur !== 'form_baslangic'),
    (x) => `${x.tur === 'whatsapp' ? 'WhatsApp' : 'Telefon'} · ${x.cta ?? x.sayfa}`,
  ).map(([k, l]) => ({ ad: k, sayi: l.length }))

  const capi = grupla(d.filter((x) => x.olaylar.length > 0), (x) => x.capi).map(([k, l]) => ({ ad: k, sayi: l.length }))
  const izinsizDonusum = d.filter((x) => !x.izin.analitik && !x.izin.pazarlama).length

  return { donusum, tiklama, formlar, iletisimRandevusuz, whatsapp, kanal, kampanya, sayfa, tiklamaSayfa, capi, izinsizDonusum }
}
