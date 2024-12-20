'use client';

import styles from './index.module.css';
import { useState } from 'react';

export default function ChatHistory({
  user,
}: {
  user: { userId?: string; email?: string };
}) {
  const [history, setHistory] = useState([]);

  return (
    <div className={styles.chatHistory}>
      {history.length === 0 ? (
        <div className={styles.notLoginTip}>
          {user?.email
            ? 'Your conversations will appear here once you start chatting!'
            : 'login to save and visit previous conversation!'}
        </div>
      ) : null}
    </div>
  );
}
