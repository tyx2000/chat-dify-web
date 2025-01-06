'use client';

import styles from './index.module.css';
import { SidebarLeftIcon } from '../icons';
import { useContext } from 'react';
import { SystemContext } from '../systemContext';
import ModelSelector from '../modelSelector';
import { PlusIcon, ShareIcon } from '../icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({
  selectedModelId,
  token,
}: {
  token?: string;
  selectedModelId: string;
}) {
  const pathname = usePathname();
  const { openSidebar, toggleSidebar } = useContext(SystemContext);

  const shareChat = () => {
    console.log({ pathname });
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftButtons}>
        <div
          className={styles.sidebarButton}
          onClick={() => toggleSidebar(!openSidebar)}
        >
          <SidebarLeftIcon />
        </div>
        {!openSidebar && (
          <Link className={styles.plusIcon} href="/">
            <PlusIcon />
          </Link>
        )}
        <ModelSelector selectedModelId={selectedModelId} />
      </div>
      {token ? (
        pathname === '/' ? null : (
          <div className={styles.loginButton} onClick={shareChat}>
            Share
            <ShareIcon />
          </div>
        )
      ) : (
        <Link href="/login">
          <div className={styles.loginButton}>LoGin</div>
        </Link>
      )}
    </div>
  );
}
