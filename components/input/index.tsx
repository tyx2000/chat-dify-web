import styles from './index.module.css';
import { PaperclipIcon, ArrowUpIcon } from '../icons';

export default function Input() {
  return (
    <div className={styles.input}>
      <div className={styles.container}>
        <textarea
          name="message"
          id="messageTa"
          placeholder="Send a message..."
        />
        <div className={styles.action}>
          <div title="upload file">
            <PaperclipIcon />
          </div>
          <div title="send">
            <ArrowUpIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
