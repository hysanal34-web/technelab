'use client'
import Link from 'next/link'
import { DISTRICTS } from '@/lib/semtler'
import { WORKSHOPS } from '@/lib/data'

/**
 * Hero'nun hemen altında duran disiplin navigasyonu.
 *
 * 7 ayrı satır yerine 4 anlamlı grup: Oyunculuk → Yaratıcı Drama → Dans & Müzikal → Yazarlık.
 * Her grubun birincil bağlantısı o alandaki ana disiplin sayfasına gider;
 * ilişkili ikinci disiplin sayfalara ufak chip'lerle ulaşılır.
 * SEO URL'leri değişmiyor — sadece görsel sunum birleşiyor.
 */

const GROUPS: {
  label: string
  eyebrow: string
  href: string
  related: { label: string; href: string }[]
  workshopSlugs: string[]
}[] = [
  {
    label: 'Oyunculuk Eğitimi',
    eyebrow: 'SAHNE · BEDEN · SES',
    href: '/oyunculuk-kursu-istanbul',
    related: [{ label: 'kamera önü', href: '/kamera-onu-oyunculuk-istanbul' }],
    workshopSlugs: ['oyuncunun-mevcudiyeti', 'camera-praxis', 'english-drama-final-project'],
  },
  {
    label: 'Yaratıcı Drama',
    eyebrow: 'OYUN · DOĞAÇLAMA · GRUP',
    href: '/yaratici-drama-istanbul',
    related: [{ label: 'ingilizce drama', href: '/ingilizce-drama-istanbul' }],
    workshopSlugs: ['english-drama-lab', 'english-drama-youth'],
  },
  {
    label: 'Dans & Müzikal',
    eyebrow: 'BROADWAY · ŞAN · SAHNE',
    href: '/dans-kursu-istanbul',
    related: [{ label: 'müzikal tiyatro', href: '/muzikal-tiyatro-kursu-istanbul' }],
    workshopSlugs: ['techne-musical-lab', 'broadway-musical-dance'],
  },
  {
    label: 'Yazarlık',
    eyebrow: 'DRAMATURJİ · METİN · YAPI',
    href: '/oyun-yazarligi-kursu-istanbul',
    related: [],
    workshopSlugs: ['auteur-lab'],
  },
]

export function DisciplineGrid() {
  const countFor = (slugs: string[]) =>
    slugs.filter((s) => WORKSHOPS.some((w) => w.slug === s && w.active && !w.archived)).length
  // Toplam aktif program sayısı tek kaynaktan — metin data.ts ile çelişmesin
  const aktifSayi = WORKSHOPS.filter((w) => w.active && !w.archived).length
  const SAYI_TR: Record<number, string> = { 1: 'bir', 2: 'iki', 3: 'üç', 4: 'dört', 5: 'beş', 6: 'altı', 7: 'yedi', 8: 'sekiz', 9: 'dokuz' }

  return (
    <section
      className="border-b border-border bg-bg"
      aria-labelledby="disiplinler-heading"
    >
      <div className="px-4 md:px-14 pt-16 pb-4">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-3">
          — ne çalışıyoruz
        </p>
        <h2
          id="disiplinler-heading"
          className="font-display text-fg leading-none mb-4"
          style={{ fontSize: 'clamp(26px, 4.2vw, 56px)', letterSpacing: '0.02em' }}
        >
          İSTANBUL&apos;DA TİYATRO,<br />DANS &amp; YAZARLIK ATÖLYELERİ
        </h2>
        <p className="font-mono text-[13px] text-stone max-w-2xl leading-relaxed">
          Pera ve Kadıköy&apos;de, on iki kişiyi geçmeyen gruplarda — dört alan, {SAYI_TR[aktifSayi] ?? aktifSayi} program.
        </p>
      </div>

      {/* Disiplin grupları */}
      <div className="px-4 md:px-14 pb-14">
        <ul className="border-t border-border">
          {GROUPS.map((g) => {
            const n = countFor(g.workshopSlugs)
            return (
              <li key={g.href} className="border-b border-border">
                <div className="py-5 md:py-6">
                  {/* Ana satır */}
                  <Link
                    href={g.href}
                    data-hover
                    className="group flex items-baseline justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                      <span
                        className="font-display text-fg group-hover:text-neon transition-colors leading-none whitespace-nowrap"
                        style={{ fontSize: 'clamp(18px, 2.4vw, 34px)', letterSpacing: '0.01em' }}
                      >
                        {g.label.toLocaleUpperCase('tr-TR')}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim hidden md:block truncate">
                        {g.eyebrow}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-4 md:gap-6 shrink-0">
                      <span className="font-mono text-[11px] tracking-[0.12em] text-stone whitespace-nowrap">
                        {n} program
                      </span>
                      <span
                        className="font-mono text-[13px] text-dim group-hover:text-neon group-hover:translate-x-1 transition-all duration-200"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </Link>

                  {/* İlişkili disiplin — ufak chip */}
                  {g.related.length > 0 && (
                    <div className="flex items-center gap-3 mt-2.5">
                      <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim">
                        ayrıca
                      </span>
                      {g.related.map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          data-hover
                          className="font-mono text-[11px] tracking-[0.14em] uppercase text-stone hover:text-neon border border-border hover:border-neon/50 px-2.5 py-1 transition-colors"
                        >
                          {r.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        {/* Lokasyon şeridi */}
        <div className="mt-10 pt-8 border-t border-border">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim block mb-4">
            lokasyonlar
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {DISTRICTS.map((x) => (
              <Link
                key={x.slug}
                href={`/${x.slug}`}
                data-hover
                className="font-mono text-[11px] tracking-[0.12em] uppercase border border-border text-stone px-3.5 py-2 hover:border-neon hover:text-neon transition-colors"
              >
                {x.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
