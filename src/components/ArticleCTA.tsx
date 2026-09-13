import Link from 'next/link'
import { WORKSHOPS, type Workshop } from '@/lib/data'
import { getDiscipline, type Discipline } from '@/lib/disiplinler'

/**
 * Makale sonu CTA.
 *
 * İki hedef birden: (1) en yakın AKTİF program, (2) o konunun disiplin
 * landing sayfası ("oyunculuk kursu istanbul" gibi ticari sorguların
 * hedef sayfası). Blog trafiği eskiden yalnızca programa akıyordu, hub
 * sayfalarına hiç link vermiyordu — oysa Google'ın "bu site bu konuda
 * otorite" sinyali tam olarak makale → hub bağından geliyor.
 *
 * Eşleme önce etiketlere, sonra kategoriye bakıyor. Program pasifse
 * (camera-praxis, oyuncunun-mevcudiyeti KAPALI) hub'ın ilk aktif
 * programına düşüyor; hiçbiri yoksa yalnızca hub'a yönlendiriyor.
 */

type Rule = { match: RegExp; hub: string; program?: string }

const DANS: Rule    = { match: /jazz|koreograf|\bdans|dance/i,                                hub: 'dans-kursu-istanbul',            program: 'broadway-musical-dance' }
const MUZIKAL: Rule = { match: /müzikal|muzikal|musical|broadway|\bşan\b|şarkı|sarki|vokal/i,  hub: 'muzikal-tiyatro-kursu-istanbul', program: 'techne-musical-lab' }

// Sıra önemli — ilk eşleşen kazanır. Daha özgül olanlar önce, en genel
// olan (oyunculuk) en sonda; yoksa "oyunculuk" geçen her etiketi yutuyor.
const TAG_RULES: Rule[] = [
  { match: /yazar|dramaturj|oyun yaz|senaryo|kurmaca|devising/i,        hub: 'oyun-yazarligi-kursu-istanbul',       program: 'auteur-lab' },
  // "genç seyirci" gibi sektör konuları youth'a düşmesin: yaş grubu sinyali şart.
  { match: /youth|çocuk|cocuk|gençler (için|de)|gençlere|ergen|lise|veli|10[–-]1[47]|15[–-]17/i,
    hub: 'gencler-icin-ingilizce-drama-istanbul', program: 'english-drama-youth' },
  DANS, MUZIKAL, // ikisi de eşleşirse aşağıda etiket sayısıyla ayrılıyor
  { match: /konuşma kulüb|konusma kulub|speaking/i,                      hub: 'ingilizce-konusma-kulubu-istanbul',   program: 'english-drama-lab' },
  { match: /ingilizce oyunculuk|english acting/i,                        hub: 'ingilizce-oyunculuk-istanbul',        program: 'english-drama-final-project' },
  { match: /audition|casting|self.?tape|showreel/i,                      hub: 'audition-hazirlik-atolyesi-istanbul' },
  { match: /kamera|dizi|film|\bset\b/i,                                  hub: 'kamera-onu-oyunculuk-istanbul' },
  { match: /ingilizce|i̇ngilizce|english/i,                              hub: 'ingilizce-drama-istanbul',            program: 'english-drama-lab' },
  { match: /yaratıcı drama|yaratici drama/i,                             hub: 'yaratici-drama-istanbul' },
  { match: /oyuncu|stanislavski|meisner|chekhov|grotowski|lecoq|viewpoints|karakter|sahne|doğaçlama|dogaclama|mevcudiyet|nefes|monolog|seçme|secme|ensemble|fiziksel|verbatim|forum tiyatro/i,
    hub: 'oyunculuk-kursu-istanbul' },
]

function matchRule(tags: string[]): Rule | undefined {
  const text = tags.join(' ')
  const rule = TAG_RULES.find((r) => r.match.test(text))
  // Dans ile müzikal iç içe: "müzikal dans" dansa, "müzikal tiyatro kursu" müzikale.
  // Hangisi daha çok etikette geçiyorsa o; eşitlikte dans (daha özgül terim).
  if (rule === DANS || rule === MUZIKAL) {
    const nDans = tags.filter((t) => DANS.match.test(t)).length
    const nMuz  = tags.filter((t) => MUZIKAL.match.test(t)).length
    return nMuz > nDans ? MUZIKAL : DANS
  }
  return rule
}

// Etiketler karar veremezse kategori.
const CATEGORY_HUB: Record<string, string> = {
  'Dans & Müzikal':  'muzikal-tiyatro-kursu-istanbul',
  'İngilizce Drama': 'ingilizce-drama-istanbul',
  'Yaratıcı Drama':  'yaratici-drama-istanbul',
  'Yazarlık':        'oyun-yazarligi-kursu-istanbul',
  'Dramaturji':      'oyun-yazarligi-kursu-istanbul',
  'Oyunculuk':       'oyunculuk-kursu-istanbul',
  'Teknik':          'oyunculuk-kursu-istanbul',
  'Pedagoji':        'oyunculuk-kursu-istanbul',
  'Tiyatro':         'yetiskinler-icin-tiyatro-kursu-istanbul',
  'Sektör':          'yetiskinler-icin-tiyatro-kursu-istanbul',
  'Kültür':          'yetiskinler-icin-tiyatro-kursu-istanbul',
}

const FALLBACK_HUB = 'yetiskinler-icin-tiyatro-kursu-istanbul'

function activeWorkshop(slug?: string): Workshop | undefined {
  if (!slug) return undefined
  return WORKSHOPS.find((w) => w.slug === slug && w.active && !w.archived)
}

/** Makale etiket + kategorisinden hedef hub ve (varsa) aktif programı çöz. */
export function resolveArticleCta(tags: string[], category?: string): { hub?: Discipline; program?: Workshop } {
  const rule = matchRule(tags)

  const hubSlug = rule?.hub ?? (category ? CATEGORY_HUB[category] : undefined) ?? FALLBACK_HUB
  const hub = getDiscipline(hubSlug)

  // Kural programı aktifse o; değilse hub'ın listelediği ilk aktif program.
  const program =
    activeWorkshop(rule?.program) ??
    hub?.workshopSlugs.map(activeWorkshop).find(Boolean)

  return { hub, program }
}

export function ArticleCTA({ tags, category }: { tags: string[]; category?: string }) {
  const { hub, program: w } = resolveArticleCta(tags, category)
  const start = w?.schedule?.[0]

  return (
    <section className="px-4 md:px-10 py-14 border-t border-border bg-bgAlt">
      <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">okumaktan yapmaya</p>

      {w ? (
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end max-w-4xl">
          <div>
            <h2
              className="font-display text-fg mb-3"
              style={{ fontSize: 'clamp(24px,3.5vw,44px)', letterSpacing: '0.02em', lineHeight: 1.05 }}
            >
              {w.title}
            </h2>
            <p className="font-body text-[13px] text-stone leading-relaxed mb-4 max-w-xl">{w.tagline}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              {start && <span className="text-neon">{start.date}{start.time ? ` · ${start.time}` : ''}</span>}
              <span className="text-stone">{w.duration}</span>
              <span className="text-stone">{w.venue}</span>
            </div>
          </div>
          <Link
            href={`/atolyeler/${w.slug}`}
            className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200 whitespace-nowrap"
            data-hover
          >
            programı incele →
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl">
          <h2
            className="font-display text-fg mb-6"
            style={{ fontSize: 'clamp(24px,3.5vw,44px)', letterSpacing: '0.02em', lineHeight: 1.05 }}
          >
            BU KONUYU SAHNEDE ÇALIŞMAK İSTER MİSİN?
          </h2>
          <Link
            href={hub ? `/${hub.slug}` : '/atolyeler'}
            className="inline-block font-mono text-[12px] tracking-[0.16em] uppercase bg-neon text-bg px-6 py-3.5 hover:bg-fg transition-colors duration-200"
            data-hover
          >
            programları gör →
          </Link>
        </div>
      )}

      {/* Disiplin hub'ı — makaleden ticari landing sayfasına iç link.
          Programdan farklı bir hedef; hub o konunun İstanbul genelindeki
          tüm programlarını, semtleri ve SSS'i topluyor. */}
      {hub && (
        <div className="mt-8 pt-6 border-t border-border max-w-4xl">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim block mb-2">bu yazının alanı</span>
          <Link href={`/${hub.slug}`} className="font-mono text-[12px] text-stone hover:text-neon transition-colors" data-hover>
            {hub.label} — İstanbul →
          </Link>
        </div>
      )}
    </section>
  )
}
