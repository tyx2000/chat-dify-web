'use client';

import { useContext } from 'react';
import styles from './index.module.css';
import { SystemContext } from '../systemContext';
import { PlusIcon } from '../icons';

export default function Sidebar() {
  const { openSidebar, token } = useContext(SystemContext);
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
      {!token && (
        <div className={styles.notLoginTip}>
          login to save and visit previous conversation!
        </div>
      )}
    </div>
  );
}
