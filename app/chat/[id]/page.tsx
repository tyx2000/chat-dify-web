import { getChatById, getMessagesByChatId } from '@/utils/db/queries';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { decrypt } from '@/utils/session';
import { DEFAULT_MODEL_NAME, models } from '@/constances/models';
import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';
import styles from '@/app/page.module.css';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = await getChatById({ id });

  // TODO get there by sharing, howt to?

  if (!chat || !chat?.data?.length) {
    notFound();
  }

  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  let user = { email: '', userId: '' };

  if (!session) {
    redirect('/login');
  } else {
    const { userId, email } = await decrypt(session);

    //@ts-ignore
    user = { email, userId };

    // @ts-ignore
    if (chat.data[0].userId !== userId) {
      return notFound();
    }
  }

  const messages = await getMessagesByChatId({ id });
  const modelIdFromCookie = cookieStore.get('modelId')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <div className={styles.page}>
      <Sidebar user={user} />
      <Chat id={id} messages={messages.data || []} />
    </div>
  );
}
