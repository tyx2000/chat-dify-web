'use server';

import { cookies } from 'next/headers';

export const changeModelId = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set('modelId', id);
};
