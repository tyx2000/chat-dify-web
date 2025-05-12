import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // csp
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'nonce-${nonce}';
  image-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  from-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  // const { url, nextUrl } = request;
  // const cookieStore = await cookies();
  // const session = cookieStore.get('session')?.value || '';

  // const pathname = nextUrl.pathname;
  // const isLogin = !!session;
  // const isOnLoginPage = pathname === '/login';
  // const isOnRegisterPage = pathname === '/register';

  // if (isLogin && (isOnLoginPage || isOnRegisterPage)) {
  //   return Response.redirect(new URL('/', nextUrl as unknown as URL));
  // }

  // console.log('middleware', { session, pathname: nextUrl.pathname });
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        {
          type: 'header',
          key: 'next-router-prefetch',
        },
        {
          type: 'header',
          key: 'purpose',
          value: 'prefetch',
        },
      ],
    },
  ],
};
