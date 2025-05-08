import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { url, nextUrl } = request;
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value || '';

  const pathname = nextUrl.pathname;
  const isLogin = !!session;
  const isOnLoginPage = pathname === '/login';
  const isOnRegisterPage = pathname === '/register';

  if (isLogin && (isOnLoginPage || isOnRegisterPage)) {
    return Response.redirect(new URL('/', nextUrl as unknown as URL));
  }

  // console.log('middleware', { session, pathname: nextUrl.pathname });
}

export const config = {
  matcher: ['/', '/login', '/register'],
};
