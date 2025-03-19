'use client';

import styles from './index.module.css';
import { SparklesIcon } from '../icons';
import Input from '../input';
import { Fragment } from 'react';
import streamFetch from '@/utils/streamFetch';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { saveChatAction, saveMessageAction } from '@/actions/chat';
import { redirect, RedirectType } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';

export default function Messages({
  id,
  messages,
}: {
  id?: string;
  messages?: { chatId: string; content: string; id: string; role: string }[];
}) {
  const isMobile = useIsMobile();
  const [conversatinId, setConversationId] = useState(id || '');

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

    // messageContainer.insertAdjacentElement('beforeend', messageItem);
    // messageContainer.insertAdjacentElement(
    //   'beforeend',
    //   messageContainerEndTarget,
    // );
    messageContainer.appendChild(messageItem);
    messageContainer.appendChild(messageContainerEndTarget);

    messageContainerEndTarget.scrollIntoView({ behavior: 'smooth' });
    messageContainer.removeChild(messageContainerEndTarget);

    textarea.value = '';
    isMobile ? textarea.blur() : textarea.focus();

    // render LLM response text
    renderResponse(message);
  };

  const renderResponse = (localMessage: string) => {
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
      localMessage,
      conversatinId,
      async (
        message:
          | {
              event: 'message' | 'message_end';
              task_id: string;
              message_id: string;
              answer: string;
            }
          | undefined,
      ) => {
        if (message) {
          const { event, task_id, answer } = message;
          setConversationId(task_id);

          messageContent.innerText += answer;
          messageContainerEndTarget.scrollIntoView({ behavior: 'smooth' });
          if (event === 'message_end') {
            messageContainer.removeChild(messageContainerEndTarget);

            if (id) {
              await saveMessageAction(id, 'local', localMessage);
              await saveMessageAction(id, 'remote', messageContent.innerText);
            } else {
              const res = await saveChatAction('Dify' + Date.now());
              if (res && res.data && res.data[0]) {
                const { id: chatId, title } = res.data[0];
                await saveMessageAction(chatId, 'local', localMessage);
                await saveMessageAction(
                  chatId,
                  'remote',
                  messageContent.innerText,
                );

                redirect(`/chat/${chatId}`, RedirectType.replace);
              }
            }
          }
        }
      },
    );
  };

  return (
    <Fragment>
      <div className={styles.messageContainer}>
        <div className={styles.container} id="messageContainer">
          {!messages || messages.length === 0
            ? null
            : messages.map((msg) => (
                <div
                  key={msg.id}
                  className={[styles.messageItem, styles[msg.role]].join(' ')}
                >
                  {msg.role === 'remote' && (
                    <div className={styles.sparklesIcon}>
                      <SparklesIcon />
                    </div>
                  )}
                  <div
                    className={[
                      styles.messageContent,
                      styles[`${msg.role}Content`],
                    ].join(' ')}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Input onSend={onSend} onUpload={onUpload} />
    </Fragment>
  );
}
