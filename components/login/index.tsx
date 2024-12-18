'use client';

import { login, register } from '@/actions/user';
import styles from './index.module.css';
import Logo from './logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Login({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login';
  const buttonText = isLogin ? 'LoGin' : 'ReGister';

  return (
    <div className={styles.login}>
      <div action={isLogin ? login : register} className={styles.loginForm}>
        <Image src={Logo} alt="logo" width={120} height={120} />
        <h3 className={styles.title}>{buttonText}</h3>
        <div className={styles.tip}>
          {isLogin
            ? 'Use Your email and Password to loGin'
            : 'Create an account with Your email and Password'}
        </div>
        <div className={styles.field}>
          <div>Email Address</div>
          <input type="email" autoComplete="off" name="email" />
        </div>
        <div className={styles.field}>
          <div>Password</div>
          <input type="password" autoComplete="off" name="password" />
        </div>
        <button type="submit" className={styles.actionButton}>
          {buttonText}
        </button>
        <div className={styles.switch}>
          {isLogin ? 'Dont' : 'AlreadY'} have an account?&nbsp;
          <Link
            href={isLogin ? '/register' : '/login'}
            replace
            className={styles.router}
          >
            {isLogin ? 'ReGister' : 'LoGin'}
            &nbsp;
          </Link>
          {isLogin ? 'for free' : 'instead'}.
        </div>
      </div>
    </div>
  );
}
