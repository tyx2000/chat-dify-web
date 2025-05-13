'use client';

import styles from './index.module.css';
import { PlusIcon } from '../icons';
import ChatHistory from './chatHistory';
import UserNav from './userNav';
import { Suspense } from 'react';
import Link from 'next/link';
import { SidebarLeftIcon } from '../icons';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function SidePanel({
  user,
}: {
  user: { email: string; userId: string };
}) {
  const { sidePanel, toggleSidePanel } = useGlobalStore();

  return (
    <div
      className={[styles.sidebar, sidePanel ? '' : styles.hideSidebar].join(
        ' ',
      )}
    >
      <div className={styles.sidebarHeader}>
        <h3>ChatCat</h3>

        <div className={styles.sidebarHeaderAction}>
          <Link href="/" aria-label="start a new conversation">
            <PlusIcon />
          </Link>
          <div onClick={() => toggleSidePanel()}>
            <SidebarLeftIcon />
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatHistory user={user} />
      </Suspense>
      {user?.email && <UserNav user={user} />}
    </div>
  );
}
