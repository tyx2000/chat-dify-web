import useSWR from 'swr';
import styles from './index.module.css';
import { fetcher } from '@/utils/tools';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ChatHistory({
  user,
}: {
  user: { userId?: string; email?: string };
}) {
  const pathname = usePathname();
  const {
    data: { error, data = [] },
    isLoading,
    mutate,
  } = useSWR(user?.userId ? '/api/chatHistory' : null, fetcher, {
    fallbackData: [],
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  useEffect(() => {
    mutate();
  }, [pathname]);

  if (error) {
    return <div>Failed to load chat history</div>;
  }

  return (
    <div className={styles.chatHistory}>
      <div className={styles.notLoginTip}>
        {user?.email
          ? isLoading
            ? 'Loading...'
            : data.length === 0
              ? 'Your conversations will appear here once you start chatting!'
              : data.map((d: { id: string; title: string }) => (
                  <Link key={d.id} href={`/chat/${d.id}`}>
                    <div className={styles.chatRecord}>{d.title}</div>
                  </Link>
                ))
          : 'login to save and visit previous conversation!'}
      </div>
    </div>
  );
}
