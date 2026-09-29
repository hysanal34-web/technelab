import { redirect } from 'next/navigation'

/**
 * /sahne — 30 Eylül 2026'da ana sayfa hero'sunun önizlemesiydi; sahne ana
 * sayfaya taşındı. Paylaşılmış linkler kırılmasın diye ana sayfaya yönlenir.
 */
export default function SahnePage() {
  redirect('/')
}
