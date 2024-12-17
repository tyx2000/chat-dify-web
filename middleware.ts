import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { url, nextUrl } = request;
  const cookieStore = await cookies();
  const token = cookieStore.get('dify-token');
  const modelId = cookieStore.get('modelId');

  console.log({ token, modelId });
}

export const config = {
  matcher: ['/'],
};
