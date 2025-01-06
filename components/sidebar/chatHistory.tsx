import useSWR, { useSWRConfig } from 'swr';
import styles from './index.module.css';
import { fetcher } from '@/utils/tools';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { TrashIcon, PenIcon } from '../icons';
import useSWRMutation from 'swr/mutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ChatRecord = ({
  id,
  title,
  isCurrent,
}: {
  id: string;
  title: string;
  isCurrent: boolean;
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger } = useSWRMutation(`/api/deleteChat?id=${id}`, fetcher);
  const recordOption = (e: any, option: 'edit' | 'delete') => {
    e.preventDefault();
    if (option === 'delete') {
      toast.promise(trigger, {
        loading: 'Loading...',
        success: () => {
          isCurrent && router.replace('/');
          mutate('/api/chatHistory');
          return 'delete successfully';
        },
        error: 'failed to delete chat',
      });
    }
  };

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={[
          styles.chatRecord,
          isCurrent ? styles.currentChat : '',
        ].join(' ')}
      >
        {title}
        <div className={styles.recordOption}>
          <div onClick={(e) => recordOption(e, 'edit')}>
            <PenIcon />
          </div>
          <div onClick={(e) => recordOption(e, 'delete')}>
            <TrashIcon />
          </div>
        </div>
      </div>
    </Link>
  );
};

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
                  <ChatRecord
                    key={d.id}
                    {...d}
                    isCurrent={pathname.includes(d.id)}
                  />
                ))
          : 'login to save and visit previous conversation!'}
      </div>
    </div>
  );
}
