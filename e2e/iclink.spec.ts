import { test, expect } from '@playwright/test'
import { getAllArticles } from '../src/lib/mdx'
import { ilgiliMakaleler } from '../src/lib/ilgiliMakaleler'

/**
 * İç link dağılımı.
 *
 * NEDEN VAR: "ilgili yazılar" bloğu önce `aynı kategori → en yeni 3` seçiyordu.
 * 26 Eylül 2026'da ölçüldüğünde 90 makalenin 60'ı bu bloktan hiç link almıyordu;
 * link gücü her kategorinin en yeni üç yazısında birikiyordu. Kategoride tek
 * yazı varsa (Oyunculuk, Pedagoji, Tiyatro) blok tamamen boş kalıyordu.
 *
 * Bu testler dağılımı koruyor. Kırmızı verirse `ilgiliMakaleler.ts` içindeki
 * halka mantığı ya da kategori eşlemesi bozulmuş demektir.
 */

const hepsi = getAllArticles()

function gelenLinkler() {
  const gelen: Record<string, number> = {}
  hepsi.forEach((a) => (gelen[a.slug] = 0))
  for (const a of hepsi) {
    for (const x of ilgiliMakaleler(hepsi, a.slug, a.category, 3)) {
      if (x.slug in gelen) gelen[x.slug]++
    }
  }
  return gelen
}

test.describe('iç link dağılımı', () => {
  test('her makale en az bir gelen link alıyor', () => {
    const gelen = gelenLinkler()
    const yetim = Object.entries(gelen)
      .filter(([, n]) => n === 0)
      .map(([s]) => s)

    expect(
      yetim,
      'Bu makalelere hiçbir yerden link gitmiyor. Arama motoru için görünmez sayılırlar.',
    ).toEqual([])
  })

  test('link gücü birkaç sayfada birikmiyor', () => {
    const gelen = gelenLinkler()
    const v = Object.values(gelen)
    const max = Math.max(...v)

    // Üst sınır makale sayısıyla ölçekleniyor: küme yapısı değişince eşik de
    // kaysın, ama bir sayfa toplam linkin çeyreğinden fazlasını toplamasın.
    const sinir = Math.ceil(hepsi.length * 0.25)
    const enCok = Object.entries(gelen).filter(([, n]) => n === max)

    expect(
      max,
      `En çok link alan sayfa(lar): ${enCok.map(([s]) => s).join(', ')} (${max} link, sınır ${sinir})`,
    ).toBeLessThanOrEqual(sinir)
  })

  test('kümeler arası geçiş var', () => {
    let capraz = 0
    for (const a of hepsi) {
      for (const x of ilgiliMakaleler(hepsi, a.slug, a.category, 3)) {
        if (x.category !== a.category) capraz++
      }
    }
    // Üç slotun biri komşu kümeye ayrılmış durumda; hepsi dolamasa bile
    // toplamın en az beşte biri kümeler arasında olmalı.
    expect(
      capraz,
      'Hiçbir link kümeler arasında geçmiyor. Yöntem yazıları ticari kümeyi beslemiyor.',
    ).toBeGreaterThan(hepsi.length * 0.6)
  })

  test('seçim deterministik ve kendine link yok', () => {
    for (const a of hepsi) {
      const bir = ilgiliMakaleler(hepsi, a.slug, a.category, 3)
      const iki = ilgiliMakaleler(hepsi, a.slug, a.category, 3)

      expect(bir.map((x) => x.slug), `${a.slug} için seçim build'ler arası değişiyor`)
        .toEqual(iki.map((x) => x.slug))
      expect(bir.map((x) => x.slug), `${a.slug} kendine link veriyor`).not.toContain(a.slug)
      expect(new Set(bir.map((x) => x.slug)).size, `${a.slug} aynı yazıyı iki kez gösteriyor`)
        .toBe(bir.length)
    }
  })
})
