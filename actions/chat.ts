'use server';

import { saveChat, saveMessages, getChatsByUserId } from '@/utils/db/queries';
import { decrypt } from '@/utils/session';
import { cookies } from 'next/headers';

export const changeModelId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set('modelId', id);
};

export const saveChatAction = async (id: string, title: string) => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')!.value;
  const { userId } = await decrypt(session);
  await saveChat({ id, userId: userId + '', title });
};

export const saveMessageAction = async (
  chatId: string,
  role: string,
  content: string,
  createdAt: string,
) => {
  return await saveMessages({ chatId, role, content, createdAt });
};

export const getChatHistory = async () => {
  console.log('getChatHistory');
  const cookieStore = await cookies();
  const session = cookieStore.get('session')!.value;
  const { userId } = await decrypt(session);
  return await getChatsByUserId({ id: userId + '' });
};
