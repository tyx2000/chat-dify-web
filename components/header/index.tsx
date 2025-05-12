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
  const { sidePanel, toggleSidePanel } = useContext(SystemContext);

  const shareChat = () => {
    console.log({ pathname });
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftButtons}>
        {!sidePanel && (
          <div
            className={styles.sidebarButton}
            onClick={() => toggleSidePanel()}
          >
            <SidebarLeftIcon />
          </div>
        )}
        {!sidePanel && (
          <Link
            className={styles.plusIcon}
            href="/"
            aria-label="start a new conversation"
          >
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
        <Link href="/login" aria-label="to login">
          <div className={styles.loginButton}>Login</div>
        </Link>
      )}
    </div>
  );
}
