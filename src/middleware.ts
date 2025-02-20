import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/_next/static/chunks/:path*',
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const originalPathname = url.pathname;

  const decodedPathParts = originalPathname.split('/').map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  });

  const decodedPathname = decodedPathParts.join('/');

  if (decodedPathname === originalPathname) {
    return NextResponse.next();
  }

  url.pathname = decodedPathname;
  return NextResponse.rewrite(url);
}
