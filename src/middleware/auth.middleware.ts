import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES  = ['/login']
const PROTECTED_ROOT = '/dashboard'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Read auth from localStorage via cookie Zustand sets
  const authRaw = request.cookies.get('auth-storage')?.value
  let isAuthenticated = false

  if (authRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authRaw))
      isAuthenticated = parsed?.state?.isAuthenticated === true
    } catch {}
  }

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r))

  // Not logged in → trying to access protected page → send to login
  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Already logged in → trying to access login → send to dashboard
  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL(PROTECTED_ROOT, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Run middleware on all routes except static files and API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}