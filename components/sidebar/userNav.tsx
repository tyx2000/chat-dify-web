import styles from './index.module.css';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import { ChevronDownIcon } from '../icons';
import { logout } from '@/actions/user';

export default function UserNav({
  user,
}: {
  user: { email?: string; userId?: string };
}) {
  return (
    <div className={styles.userEmail}>
      <div className={styles.email}>
        <Image
          src={Logo}
          alt={user.email ?? 'User Avatar'}
          width={24}
          height={24}
        />
        <div>{user?.email}</div>
      </div>
      <div className={styles.arrowIcon}>
        <ChevronDownIcon />
      </div>

      <div className={styles.options}>
        <div>Switch Theme</div>
        <div onClick={logout}>Logout</div>
      </div>
    </div>
  );
}
