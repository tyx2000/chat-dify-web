'use server';

import { saveChat, saveMessages, getChatsByUserId } from '@/utils/db/queries';
import { decrypt } from '@/utils/session';
import { cookies } from 'next/headers';

export const changeModelId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set('modelId', id);
};

export const saveChatAction = async (title: string) => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')!.value;
  const { userId } = await decrypt(session);
  return await saveChat({ userId: userId + '', title });
};

export const saveMessageAction = async (
  chatId: string,
  role: string,
  content: string,
) => {
  try {
    return await saveMessages({
      chatId,
      role,
      content,
      createdAt: new Date(),
    });
  } catch (err) {
    console.log({ err });
  }
};

export const getChatHistory = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')!.value;
  const { userId } = await decrypt(session);
  return await getChatsByUserId({ id: userId + '' });
};
