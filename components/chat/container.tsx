'use client';

import { ReactNode, useContext } from 'react';
import styles from './index.module.css';
import { SystemContext } from '../systemContext';
import useIsMobile from '@/hooks/useIsMobile';

export default function Container({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { sidePanel, toggleSidePanel } = useContext(SystemContext);

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
