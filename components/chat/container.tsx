'use client';

import { ReactNode } from 'react';
import styles from './index.module.css';
import useIsMobile from '@/hooks/useIsMobile';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function Container({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { sidePanel, toggleSidePanel } = useGlobalStore();

  return (
    <div
      onClick={() => isMobile && sidePanel && toggleSidePanel()}
      className={[
        styles.container,
        sidePanel ? styles.showSide : styles.hideSide,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
