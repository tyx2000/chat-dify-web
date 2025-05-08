'use server';

import { cookies } from 'next/headers';
import { saveChat, saveMessages } from '@/utils/db/queries';
import { getUserInfo } from '@/utils/session';

export const changeModelId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set('modelId', id);
};

export const saveChatAction = async (title: string) => {
  if (title) {
    const { userId } = await getUserInfo();
    const res = await saveChat(title, userId + '');
    return res;
  } else {
    return { data: undefined };
  }
};

export const saveMessagesAction = async (
  messages: {
    chatId: string;
    role: string;
    content: string;
    createdAt: Date;
  }[],
) => {
  const res = await saveMessages(messages);
  return res;
};
