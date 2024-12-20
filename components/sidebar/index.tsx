'use client';

import { useContext } from 'react';
import styles from './index.module.css';
import { SystemContext } from '../systemContext';
import { PlusIcon, ChevronDownIcon } from '../icons';
import ChatHistory from './chatHistory';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import UserNav from './userNav';

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
      <ChatHistory user={user} />
      {user?.email && <UserNav user={user} />}
    </div>
  );
}
