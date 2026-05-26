import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login']
const PROTECTED_ROOT = '/dashboard'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const authRaw = request.cookies.get('auth-storage')?.value
  let isAuthenticated = false

  if (authRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authRaw))
      isAuthenticated = parsed?.state?.isAuthenticated === true
    } catch {
      // invalid cookie — treat as unauthenticated
    }
  }

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r))

  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL(PROTECTED_ROOT, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
