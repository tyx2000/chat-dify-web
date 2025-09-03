import styles from './index.module.css';
import { PaperclipIcon, ArrowUpIcon, StopIcon } from '../icons';

export default function Input({
  onSend,
  onUpload,
  responseRendering,
}: {
  responseRendering: boolean;
  onSend: () => void;
  onUpload: () => void;
}) {
  return (
    <div className={styles.input}>
      <div className={styles.container}>
        <textarea
          name="message"
          id="messageInputArea"
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
          <div
            title={responseRendering ? 'stop' : 'send'}
            onClick={onSend}
            className={
              responseRendering ? styles.stopButton : styles.sendButton
            }
          >
            {responseRendering ? <StopIcon /> : <ArrowUpIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
