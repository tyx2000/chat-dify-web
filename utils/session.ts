import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { config } from 'dotenv';
import { cookies } from 'next/headers';

config({ path: '.env.local' });

const secreKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secreKey);

type UserInfo = { userId?: string; email?: string };

export const encrypt = async (payload: { userId: string; email: string }) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
};

export const decrypt = async (token: string): Promise<UserInfo> => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as UserInfo;
  } catch (error) {
    return {};
  }
};
export const changeModelId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set('modelId', id);
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')!.value;
  const { userId, email } = (await decrypt(session)) || {};
  return { userId, email };
};

export const createSession = async (payload: {
  userId: string;
  email: string;
}) => {
  const token = await encrypt(payload);
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
};

export const updateSession = async () => {
  const cookieStore = await cookies();

  const session = cookieStore.get('session')?.value;
  if (!session) return null;

  const payload = await decrypt(session);
  if (!payload) return null;

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
};
