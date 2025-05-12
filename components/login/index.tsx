'use client';

import { login, register } from '@/actions/user';
import styles from './index.module.css';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '../loading';

export default function Login({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login';
  const buttonText = isLogin ? 'Login' : 'Register';

  const [state, action, pending] = useActionState(
    isLogin ? login : register,
    undefined,
  );

  useEffect(() => {
    if (state?.status === 'failed') {
      toast.error(state?.error || 'network_error');
    }
    if (state?.status === 'success') {
      toast.success('login_success');
      redirect('/', RedirectType.replace);
    }
  }, [state?.status]);

  return (
    <div className={styles.login}>
      <form action={action} className={styles.loginForm}>
        <Image src={Logo} alt="logo" width={120} height={120} />
        <h3 className={styles.title}>{buttonText}</h3>
        <div className={styles.tip}>
          {isLogin
            ? 'Use your email and password to login'
            : 'Create an account with Your email and password'}
        </div>
        <div className={styles.field}>
          <div className={styles.inputLabel}>Email Address</div>
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            className={styles.emailInput}
            placeholder="user@amer.com"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.inputLabel}>Password</div>
          <input
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            className={styles.passwordInput}
          />
        </div>
        <button
          disabled={pending}
          type="submit"
          className={styles.actionButton}
        >
          {pending && <Loading />}
          <div>{buttonText}</div>
        </button>
        <div className={styles.switch}>
          {isLogin ? 'Dont' : 'Already'} have an account?&nbsp;
          <Link
            href={isLogin ? '/register' : '/login'}
            replace
            className={styles.router}
            aria-label="switch to login or register"
          >
            {isLogin ? 'Register' : 'Login'}
            &nbsp;
          </Link>
          {isLogin ? 'for free' : 'instead'}.
        </div>
      </form>
    </div>
  );
}
