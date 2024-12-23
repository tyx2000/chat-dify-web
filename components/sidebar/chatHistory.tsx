import useSWR from 'swr';
import styles from './index.module.css';
import { fetcher } from '@/utils/tools';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ChatHistory({
  user,
}: {
  user: { userId?: string; email?: string };
}) {
  const pathname = usePathname();
  const {
    data: { error, data },
    isLoading,
    mutate,
  } = useSWR(user?.userId ? '/api/chatHistory' : null, fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  if (error) {
    return <div>Failed to load chat history</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.chatHistory}>
      <div className={styles.notLoginTip}>
        {user?.email || data.length === 0
          ? 'Your conversations will appear here once you start chatting!'
          : 'login to save and visit previous conversation!'}
      </div>
    </div>
  );
}
