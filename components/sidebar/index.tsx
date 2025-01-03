'use client';

import { useContext } from 'react';
import styles from './index.module.css';
import { SystemContext } from '../systemContext';
import { PlusIcon } from '../icons';
import ChatHistory from './chatHistory';
import UserNav from './userNav';
import { Suspense } from 'react';

export default function Sidebar({
  user,
}: {
  user: { email?: string; userId?: string };
}) {
  const { openSidebar } = useContext(SystemContext);
  return (
    <div
      className={[styles.sidebar, openSidebar ? '' : styles.hideSidebar].join(
        ' ',
      )}
    >
      <div className={styles.sidebarHeader}>
        <h3>ChatBot</h3>
        <PlusIcon />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatHistory user={user} />
      </Suspense>
      {user?.email && <UserNav user={user} />}
    </div>
  );
}
