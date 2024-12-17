import styles from './page.module.css';
import Sidebar from '@/components/sidebar';
import Chat from '@/components/chat';

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <Chat />
    </div>
  );
}
