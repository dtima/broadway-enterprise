import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for Broadway Enterprise
// Handles locale routing and basic security headers
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle locale routing
  const locales = ['en', 'fr'];
  const defaultLocale = 'en';
  
  // Check if pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Redirect to default locale if no locale in pathname
  // Skip locale redirect for static assets (images, favicon, etc.)
  if (!pathnameHasLocale && 
      !pathname.startsWith('/api/') && 
      !pathname.startsWith('/_next/') &&
      !pathname.startsWith('/images/') &&
      !pathname.startsWith('/favicon.ico') &&
      !pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)) {
    const locale = defaultLocale;
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }
  
  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (static images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
