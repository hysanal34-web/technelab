import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_COOKIE, oturumGecerliMi } from '@/lib/adminAuth'

/**
 * /admin altındaki her şey çereze bakılarak korunuyor.
 *
 * NEDEN MIDDLEWARE: kontrolü sayfa sayfa yapmak, yeni bir sayfa eklerken
 * kontrolü koymayı unutmaya açık. Middleware varsayılanı "kapalı" yapıyor,
 * açık bırakılan tek yol giriş sayfası.
 *
 * Giriş sayfasının kendisi ve panel API'leri hariç tutuluyor; API'ler kendi
 * kontrollerini yapıyor (bkz. adminGuard).
 */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (pathname === '/admin/login') {
    // Zaten girişliyse giriş ekranını gösterme, panele yolla.
    if (await oturumGecerliMi(req.cookies.get(ADMIN_COOKIE)?.value)) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  if (await oturumGecerliMi(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.next()
  }

  const girisUrl = new URL('/admin/login', req.url)
  // Giriş sonrası kullanıcıyı gitmek istediği sayfaya geri gönderiyoruz.
  if (pathname !== '/admin') girisUrl.searchParams.set('devam', pathname + search)
  return NextResponse.redirect(girisUrl)
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
