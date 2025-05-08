'use client';

import { useContext } from 'react';
import styles from './index.module.css';
import { SystemContext } from '../systemContext';
import { PlusIcon } from '../icons';
import ChatHistory from './chatHistory';
import UserNav from './userNav';
import { Suspense } from 'react';
import Link from 'next/link';
import { SidebarLeftIcon } from '../icons';

export default function SidePanel({
  user,
}: {
  user: { email: string; userId: string };
}) {
  const { sidePanel, toggleSidePanel } = useContext(SystemContext);

  return (
    <div
      className={[styles.sidebar, sidePanel ? '' : styles.hideSidebar].join(
        ' ',
      )}
    >
      <div className={styles.sidebarHeader}>
        <h3>ChatCat</h3>

        <div className={styles.sidebarHeaderAction}>
          <Link href="/">
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
