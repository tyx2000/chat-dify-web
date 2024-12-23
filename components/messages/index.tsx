'use client';

import styles from './index.module.css';
import { SparklesIcon } from '../icons';
import Input from '../input';
import { Fragment } from 'react';
import streamFetch from '@/utils/streamFetch';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { saveChatAction, saveMessageAction } from '@/actions/chat';

export default function Messages() {
  const [taskId, setTaskId] = useState('');
  const [conversatinId, setConversationId] = useState('');

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
    const message = textarea.value.trim();
    console.log({ message });
    if (!message) {
      textarea.value = '';
      textarea.focus();
      return;
    }

    // insert user input
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
    messageContainer.removeChild(messageContainerEndTarget);

    textarea.value = '';
    textarea.focus();

    // render LLM response text
    renderResponse(message);
  };

  const renderResponse = (message: string) => {
    const messageContainerEndTarget = document.createElement('div')!;
    const messageContainer = document.getElementById('messageContainer')!;

    const roleEl = document.createElement('div');
    roleEl.classList.add(styles.sparklesIcon);
    const role = createRoot(roleEl);
    role.render(<SparklesIcon />);

    const messageItem = document.createElement('div');
    const messageContent = document.createElement('div');

    messageItem.classList.add(styles.messageItem, styles.remote);
    messageContent.classList.add(styles.remoteContent);

    messageItem.appendChild(roleEl);
    messageItem.appendChild(messageContent);
    messageContainer.appendChild(messageItem);
    messageContainer.appendChild(messageContainerEndTarget);

    // messageContainerEndTarget.scrollIntoView({ behavior: 'smooth' });
    // messageContainer.removeChild(messageContainerEndTarget);

    streamFetch(
      message,
      conversatinId,
      (
        message: {
          event: 'message' | 'message_end';
          task_id: string;
          message_id: string;
          conversation_id: string;
          answer: string;
          created_at: number;
        } | null,
      ) => {
        if (message) {
          const {
            event,
            task_id,
            message_id,
            conversation_id,
            answer,
            created_at,
          } = message;
          setTaskId(task_id);
          setConversationId(conversation_id);
          !messageContent.innerText &&
            saveChatAction(conversation_id, 'Chat with Dify');
          if (event === 'message') {
            messageContent.innerText += answer;
            messageContainerEndTarget.scrollIntoView({ behavior: 'smooth' });
          } else if (event === 'message_end') {
            messageContainer.removeChild(messageContainerEndTarget);
            saveMessageAction(
              conversation_id,
              'remote',
              messageContent.innerText,
              created_at + '',
            );
          }
        }
      },
    );
  };

  return (
    <Fragment>
      <div className={styles.messageContainer}>
        <div className={styles.container} id="messageContainer"></div>
      </div>
      <Input onSend={onSend} onUpload={onUpload} />
    </Fragment>
  );
}
