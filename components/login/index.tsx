'use client';

import styles from './index.module.css';

export default function Login({ mode }: { mode: 'login' | 'register' }) {
  return (
    <div className={styles.login}>
      <form action="" className={styles.loginForm}></form>
    </div>
  );
}
