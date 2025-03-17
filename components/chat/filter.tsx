'use client';

import { useContext } from 'react';
import styles from './index.module.css';
import useIsMobile from '@/hooks/useIsMobile';
import { SystemContext } from '../systemContext';

export default function Filter() {
  const isMobile = useIsMobile();
  const { openSidebar, toggleSidebar } = useContext(SystemContext);
  return (
    <div
      onClick={() => toggleSidebar()}
      className={isMobile && openSidebar ? styles.filter : styles.noneFilter}
    ></div>
  );
}
