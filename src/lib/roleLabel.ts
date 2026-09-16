// ══════════════════════════════════════════════════════════════════
// UNVAN ETİKETİ — kartlarda gösterilen rol satırı
//
// Bağımsız tutuluyor: hem server component'lar (DisciplinePage,
// /ekip/[slug]) hem de client component (TeamGrid) kullanıyor.
// ekip.ts içine konsaydı, TEAM dizisi de istemci paketine girerdi.
// ══════════════════════════════════════════════════════════════════

/**
 * `role` alanı "Dr. · Öğretim Üyesi · Eğitmen" gibi çok parçalı yazılıyor.
 * Kartlarda daha önce `role.split('·')[0]` kullanılıyordu; bu, doktoralı ve
 * öğretim üyesi eğitmenlerin unvanını yalnızca "Dr."a indiriyor — yani en
 * güçlü güven sinyalini sayfadan siliyordu.
 *
 * Kural: sondaki "Eğitmen" etiketini at (eğitmen listesinde zaten gereksiz),
 * kalanı olduğu gibi göster. Tek parça "Eğitmen" ise aynen kalır.
 *
 *   'Dr. · Öğretim Üyesi · Eğitmen'              → 'Dr. · Öğretim Üyesi'
 *   'Kurucu · Genel Sanat Yönetmeni · Eğitmen'   → 'Kurucu · Genel Sanat Yönetmeni'
 *   'Ödüllü Koreograf · Öğretim Görevlisi · Eğitmen' → 'Ödüllü Koreograf · Öğretim Görevlisi'
 *   'Eğitmen'                                    → 'Eğitmen'
 */
export function displayRole(role: string): string {
  const parts = role.split('·').map((s) => s.trim()).filter(Boolean)
  if (parts.length === 0) return 'Eğitmen'
  const trimmed =
    parts.length > 1 && parts[parts.length - 1] === 'Eğitmen' ? parts.slice(0, -1) : parts
  return trimmed.join(' · ')
}
