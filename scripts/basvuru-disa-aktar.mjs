/**
 * Vercel Blob'daki başvuruları CSV'ye çıkarır (site formları: tanışma + program).
 *
 * Panelden CSV indirmekle aynı veri, ama burada program bazında ayrılıyor ve
 * Meta müşteri listesi sütun düzeninde yazılıyor.
 *
 * Çalıştırma:  node scripts/basvuru-disa-aktar.mjs [cikti-klasoru]
 * Token .env.local'den okunuyor, ekrana basılmıyor.
 *
 * ÇIKTI DEPOYA YAZILMAZ: müşteri verisi, varsayılan hedef ~/Desktop/META-YUKLEME.
 */
import { list, get } from '@vercel/blob'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import os from 'node:os'

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..')
const CIKTI = process.argv[2] || join(os.homedir(), 'Desktop', 'META-YUKLEME')

// .env.local'i elle oku: next dışında çalışıyoruz
for (const satir of readFileSync(join(KOK, '.env.local'), 'utf8').split('\n')) {
  const m = satir.match(/^([A-Z_]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('BLOB_READ_WRITE_TOKEN yok (.env.local)')
  process.exit(1)
}

const SEGMENT = {
  'english-drama-lab': 'edl',
  'english-drama-acting-focus': 'edl',
  'english-drama-final-performance': 'edl',
  'english-drama-youth': 'youth',
  'techne-musical-lab': 'musical',
  'broadway-musical-dance': 'broadway',
  'camera-praxis': 'praxis',
  'oyuncunun-mevcudiyeti': 'praxis',
  'auteur-lab': 'auteur',
}
const segmentAdi = (slug = '') => SEGMENT[slug] || (slug.startsWith('english-drama') ? 'edl' : 'diger')

const telefon = (ham = '') => {
  const d = String(ham).replace(/\D/g, '')
  if (d.length === 10 && d.startsWith('5')) return '+90' + d
  if (d.length === 11 && d.startsWith('05')) return '+90' + d.slice(1)
  if (d.length === 12 && d.startsWith('905')) return '+' + d
  return d.length >= 11 ? '+' + d : ''
}
const eposta = (ham = '') => {
  const e = String(ham).trim().toLowerCase()
  return /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(e) ? e : ''
}
const sadelestir = (t = '') =>
  t.replace(/İ/g, 'I').replace(/ı/g, 'i').replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g').replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o').replace(/Ç/g, 'C').replace(/ç/g, 'c')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const adSoyad = (t) => {
  const p = sadelestir(t).split(/\s+/).filter(Boolean)
  if (!p.length) return ['', '']
  return p.length === 1 ? [p[0], ''] : [p[0], p.slice(1).join(' ')]
}

async function tumBasvurular() {
  const kayitlar = []
  let cursor
  do {
    const r = await list({ prefix: 'basvurular/', cursor, limit: 1000, token: process.env.BLOB_READ_WRITE_TOKEN })
    cursor = r.hasMore ? r.cursor : undefined
    // Depo özel: herkese açık URL 403 döner, token'lı get() gerekiyor.
    const parcalar = []
    for (let i = 0; i < r.blobs.length; i += 25) parcalar.push(r.blobs.slice(i, i + 25))
    for (const parca of parcalar) {
      const sonuc = await Promise.all(parca.map(async (b) => {
        try {
          const o = await get(b.pathname, { access: 'private', useCache: false, token: process.env.BLOB_READ_WRITE_TOKEN })
          if (!o || o.statusCode !== 200) return null
          return JSON.parse(await new Response(o.stream).text())
        } catch { return null }
      }))
      kayitlar.push(...sonuc.filter(Boolean))
    }
  } while (cursor)
  return kayitlar
}

const csv = (satirlar) =>
  ['email,phone,fn,ln,country', ...satirlar.map((s) => `${s.email},${s.phone},${s.fn},${s.ln},tr`)].join('\n') + '\n'

function yaz(yol, satirlar) {
  if (!satirlar.length) return
  mkdirSync(dirname(yol), { recursive: true })
  writeFileSync(yol, csv(satirlar))
}

const hepsi = await tumBasvurular()
const kutular = { kayitli: {}, ilgilenen: {} }
const gorulen = new Set()
let atlanan = 0

for (const b of hepsi) {
  if (b.kaynak === 'bulten') continue              // bülten ayrı iş, kitleye girmez
  const tel = telefon(b.telefon)
  const mail = eposta(b.email)
  if (!tel && !mail) { atlanan++; continue }
  const anahtar = tel || mail
  if (gorulen.has(anahtar)) continue
  gorulen.add(anahtar)

  const seg = segmentAdi(b.slug)
  const youth = seg === 'youth'
  const [fn, ln] = youth ? ['', ''] : adSoyad(b.ad)   // Youth: isim çocuğun, yazılmaz
  const kutu = b.durum === 'kayit_oldu' ? 'kayitli' : 'ilgilenen'
  ;(kutular[kutu][seg] ||= []).push({ email: mail, phone: tel, fn, ln })
}

const ozet = []
for (const kutu of ['kayitli', 'ilgilenen']) {
  for (const [seg, satirlar] of Object.entries(kutular[kutu])) {
    yaz(join(CIKTI, 'segment-site', `${kutu}-${seg}.csv`), satirlar)
    ozet.push([kutu, seg, satirlar.length])
  }
}

console.log(`blob kaydı: ${hepsi.length} · anahtarsız atlanan: ${atlanan}`)
for (const [kutu, seg, n] of ozet.sort()) console.log(`${kutu.padEnd(10)}${seg.padEnd(10)}${n}`)
console.log('çıktı:', join(CIKTI, 'segment-site'))
