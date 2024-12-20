'use client';

import styles from './index.module.css';
import { SidebarLeftIcon } from '../icons';
import { useContext } from 'react';
import { SystemContext } from '../systemContext';
import ModelSelector from '../modelSelector';
import { PlusIcon } from '../icons';
import Link from 'next/link';

export default function Header({
  selectedModelId,
  token,
}: {
  token?: string;
  selectedModelId: string;
}) {
  const { openSidebar, toggleSidebar } = useContext(SystemContext);

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
          <div className={styles.plusIcon}>
            <PlusIcon />
          </div>
        )}
        <ModelSelector selectedModelId={selectedModelId} />
      </div>
      {token ? (
        <div className={styles.loginButton}>Share</div>
      ) : (
        <Link href="/login">
          <div className={styles.loginButton}>LoGin</div>
        </Link>
      )}
    </div>
  );
}
