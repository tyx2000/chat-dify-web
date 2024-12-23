import { getChatById, getMessagesByChatId } from '@/utils/db/queries';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { decrypt } from '@/utils/session';
import { DEFAULT_MODEL_NAME, models } from '@/constances/models';
import Chat from '@/components/chat';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) {
    return notFound();
  } else {
    const { userId } = await decrypt(session);
    if (chat.id !== userId) {
      return notFound();
    }
  }

  const messages = await getMessagesByChatId({ id });
  const modelIdFromCookie = cookieStore.get('modelId')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return <Chat />;
}
