/**
 * Makale gövdesindeki SSS bölümünden FAQPage JSON-LD üretir.
 * Beklenen biçim: "## Sık sorulan sorular" (ya da "Sıkça sorulan sorular",
 * "Frequently asked questions", "FAQ") başlığı altında
 *   **Soru?**
 *   Cevap paragrafı.
 * Bölüm bir sonraki "## " başlığında biter. Biçim tutmazsa boş dizi döner.
 */
export type FaqItem = { q: string; a: string }

const HEADING = /^##\s+(s[ıi]k(ça)?\s+sorulan\s+sorular|frequently\s+asked\s+questions|faq)\s*$/im

function plain(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractFaq(content: string): FaqItem[] {
  const m = HEADING.exec(content)
  if (!m) return []
  const rest = content.slice(m.index + m[0].length)
  const end = rest.search(/^##\s/m)
  const section = end === -1 ? rest : rest.slice(0, end)
  const items: FaqItem[] = []
  const re = /^\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=^\*\*.+?\*\*\s*$|(?![\s\S]))/gm
  let x: RegExpExecArray | null
  while ((x = re.exec(section))) {
    const q = plain(x[1])
    const a = plain(x[2])
    if (q && a && q.length < 200) items.push({ q, a })
  }
  return items
}

export function faqJsonLd(items: FaqItem[]) {
  if (items.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
