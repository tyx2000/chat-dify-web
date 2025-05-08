import styles from './page.module.css';
import SidePanel from '@/components/sidePanel';
import Chat from '@/components/chat';
import { getUserInfo } from '@/utils/session';

export default async function Home() {
  const { email, userId } = await getUserInfo();

  return (
    <div className={styles.page}>
      {/* @ts-ignore */}
      <SidePanel user={{ email, userId }} />
      <Chat />
    </div>
  );
}
