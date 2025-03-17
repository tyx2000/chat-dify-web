'use client';

import { useContext } from 'react';
import styles from './index.module.css';
import { SystemContext } from '../systemContext';
import { PlusIcon } from '../icons';
import ChatHistory from './chatHistory';
import UserNav from './userNav';
import { Suspense } from 'react';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';
// import useClickOutside from '@/hooks/useClickOutside';

export default function Sidebar({
  user,
}: {
  user: { email?: string; userId?: string };
}) {
  const isMobile = useIsMobile();
  const { openSidebar, toggleSidebar } = useContext(SystemContext);

  return (
    <div
      className={[
        styles.sidebar,
        openSidebar ? '' : styles.hideSidebar,
        isMobile && openSidebar ? styles.fixSidebar : '',
      ].join(' ')}
    >
      <div className={styles.sidebarHeader}>
        <h3>ChatCat</h3>
        <Link href="/">
          <PlusIcon />
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatHistory user={user} />
      </Suspense>
      {user?.email && <UserNav user={user} />}
    </div>
  );
}
