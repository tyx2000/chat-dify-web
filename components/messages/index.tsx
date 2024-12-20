'use client';

import styles from './index.module.css';
import { SparklesIcon } from '../icons';
import Input from '../input';
import { Fragment } from 'react';

export default function Messages() {
  const onUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = async (e) => {};
  };

  const onSend = async () => {
    const textarea = document.getElementById(
      'messageTa',
    ) as HTMLTextAreaElement;
    const message = textarea.value;
    console.log({ message });
    if (!message) return;

    const messageContainerEndTarget = document.createElement('div')!;
    const messageContainer = document.getElementById('messageContainer')!;
    const messageItem = document.createElement('div');
    const messageContent = document.createElement('div');
    messageItem.classList.add(styles.messageItem, styles.local);
    messageContent.classList.add(styles.localContent);
    messageContent.innerText = message;
    messageItem.appendChild(messageContent);
    messageContainer.appendChild(messageItem);
    messageContainer.appendChild(messageContainerEndTarget);

    messageContainerEndTarget.scrollIntoView({ behavior: 'smooth' });

    textarea.value = '';
    textarea.focus();
    messageContainer.removeChild(messageContainerEndTarget);
  };

  return (
    <Fragment>
      <div className={styles.chatContent}>
        <div className={styles.container} id="messageContainer">
          {/* {new Array(100).fill(1).map((item, index) => (
            <div
              key={item + index}
              className={[
                styles.messageItem,
                index % 2 == 0 ? styles.local : styles.remote,
              ].join(' ')}
            >
              {index % 2 !== 0 && (
                <div className={styles.sparklesIcon}>
                  <SparklesIcon />
                </div>
              )}
              <div
                className={
                  index % 2 == 0 ? styles.localContent : styles.remoteContent
                }
              >
                {item + index}
              </div>
            </div>
          ))} */}
          {/* <div id="messageContainerEndTarget"></div> */}
        </div>
      </div>
      <Input onSend={onSend} onUpload={onUpload} />
    </Fragment>
  );
}
