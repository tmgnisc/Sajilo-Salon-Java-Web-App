import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Routes that require authentication
const protectedRoutes = [
  '/admin',
  '/superadmin',
  '/profile',
  '/bookings',
  '/notifications'
]

// Routes that should redirect to dashboard if already authenticated
const authRoutes = [
  '/auth'
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  const { pathname } = request.nextUrl

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check role-based access
    if (pathname.startsWith('/admin') && decoded.role !== 'SALON_OWNER' && decoded.role !== 'ADMIN') {
      // Redirect to home if not authorized for admin routes
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Check superadmin access
    if (pathname.startsWith('/superadmin') && decoded.role !== 'SUPERADMIN') {
      // Redirect to home if not authorized for superadmin routes
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isAuthRoute && token) {
    // User is already authenticated, redirect to appropriate dashboard
    const decoded = verifyToken(token)
    if (decoded) {
      if (decoded.role === 'SUPERADMIN') {
        return NextResponse.redirect(new URL('/superadmin', request.url))
      } else if (decoded.role === 'SALON_OWNER' || decoded.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 