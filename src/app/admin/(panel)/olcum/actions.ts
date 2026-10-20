'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { ADMIN_COOKIE, oturumGecerliMi } from '@/lib/adminAuth'
import { eskiKayitlariSil } from '@/lib/olcumStore'

/** Saklama süresini aşan ölçüm kayıtlarını siler. Middleware'e ek olarak oturum burada da doğrulanır. */
export async function eskileriTemizle(): Promise<void> {
  const c = await cookies()
  if (!(await oturumGecerliMi(c.get(ADMIN_COOKIE)?.value))) return
  const silinen = await eskiKayitlariSil()
  console.info('[olcum] eski kayıt silindi:', silinen)
  revalidatePath('/admin/olcum')
}
