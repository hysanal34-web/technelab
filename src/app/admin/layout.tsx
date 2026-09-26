import type { Metadata } from 'next'

/**
 * /admin altındaki her sayfa arama motorlarına kapalı.
 *
 * Panel çerçevesi (menü, çıkış) burada DEĞİL, `(panel)/layout.tsx` içinde.
 * Sebep: giriş sayfası da /admin altında ama menüyü ve çıkış düğmesini
 * göstermemeli. Rota grubu ikisini ayırıyor, URL'ler değişmiyor.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
