import styles from './index.module.css';
import { PaperclipIcon, ArrowUpIcon } from '../icons';

export default function Input({
  onSend,
  onUpload,
}: {
  onSend: () => void;
  onUpload: () => void;
}) {
  return (
    <div className={styles.input}>
      <div className={styles.container}>
        <textarea
          name="message"
          id="messageTa"
          className={styles.messageTa}
          placeholder="Ask Something"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <div className={styles.action}>
          <div title="upload file" onClick={onUpload}>
            <PaperclipIcon />
          </div>
          <div title="send" onClick={onSend}>
            <ArrowUpIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
