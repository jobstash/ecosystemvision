import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/_next/static/chunks/:path*', '/organizations/:slug/details'],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Handle organization details redirect
  const orgDetailsMatch = pathname.match(/^\/organizations\/([^/]+)\/details$/);
  if (orgDetailsMatch) {
    const slug = orgDetailsMatch[1];
    const newUrl = new URL(`/organizations/info/${slug}`, request.url);
    return NextResponse.redirect(newUrl, 308); // 308 Permanent Redirect
  }

  // Static chunk decoding check
  if (pathname.startsWith('/_next/static/chunks/')) {
    const originalPathname = pathname;
    const decodedPathParts = originalPathname.split('/').map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    });
    const decodedPathname = decodedPathParts.join('/');

    if (decodedPathname !== originalPathname) {
      url.pathname = decodedPathname;
      return NextResponse.rewrite(url);
    }
  }

  // Allow other requests to pass through
  return NextResponse.next();
}
