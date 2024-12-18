import styles from './index.module.css';
import { UserIcon, BotIcon } from '../icons';

export default function Messages() {
  return (
    <div className={styles.messages}>
      <div className={styles.container}>
        {new Array(100).fill(1).map((item, index) => (
          <div
            key={item + index}
            className={[
              styles.messageItem,
              index % 2 == 0 ? styles.local : styles.remote,
            ].join(' ')}
          >
            {index % 2 !== 0 && (
              <div className={styles.role}>
                <BotIcon />
              </div>
            )}
            <div
              className={
                index % 2 == 0 ? styles.localContent : styles.remoteContent
              }
            >
              {item + index}
            </div>
            {index % 2 === 0 && (
              <div className={styles.role}>
                <UserIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
