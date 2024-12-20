import styles from './page.module.css';
import Sidebar from '@/components/sidebar';
import Chat from '@/components/chat';
import { cookies } from 'next/headers';
import { decrypt } from '@/utils/session';

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  let user = { email: '', userId: '' };

  if (session) {
    const payload = (await decrypt(session)) || {};

    // @ts-ignore
    user = { email: payload.email, userId: payload.userId };
  }

  return (
    <div className={styles.page}>
      <Sidebar user={user} />
      <Chat />
    </div>
  );
}
