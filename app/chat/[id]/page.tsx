import { getChatById, getMessagesByChatId } from '@/utils/db/queries';
import { notFound, redirect } from 'next/navigation';
import { getUserInfo } from '@/utils/session';
import Chat from '@/components/chat';
import SidePanel from '@/components/sidePanel';
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

  const { userId, email } = await getUserInfo();

  if (!userId) {
    redirect('/login');
  } else {
    // @ts-ignore
    if (chat.data[0].userId !== userId) {
      return notFound();
    }
  }

  const messages = await getMessagesByChatId({ id });

  return (
    <div className={styles.page}>
      {/* @ts-ignore */}
      <SidePanel user={{ userId, email }} />
      <Chat id={id} messages={messages.data || []} />
    </div>
  );
}
