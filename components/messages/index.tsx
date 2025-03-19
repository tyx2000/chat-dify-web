'use client';

import styles from './index.module.css';
import { SparklesIcon } from '../icons';
import Input from '../input';
import { Fragment } from 'react';
import streamFetch from '@/utils/streamFetch';
// import { createRoot } from 'react-dom/client';
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

  const scrollListToEnd = () => {
    const listContainer = document.getElementById('messageContainer');
    if (listContainer) {
      const endTarget = document.createElement('div');
      listContainer.appendChild(endTarget);
      endTarget.scrollIntoView({ behavior: 'smooth' });
      listContainer.removeChild(endTarget);
    }
  };

  const insertMessage = (type: 'local' | 'remote', text: string) => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      const isLocal = type === 'local';
      const messageItem = document.createElement('div');
      const messageContent = document.createElement('div');
      messageItem.classList.add(
        styles.messageItem,
        isLocal ? styles.local : styles.remote,
      );
      messageContent.classList.add(
        isLocal ? styles.localContent : styles.remoteContent,
      );
      if (isLocal) {
        messageContent.innerText = text;
      } else {
        // const spark = document.createElement('div');
        // spark.classList.add(styles.sparklesIcon);
        // const root = createRoot(spark);
        // root.render(<SparklesIcon />);
        // messageItem.appendChild(spark);
      }
      messageItem.appendChild(messageContent);
      messageContainer.appendChild(messageItem);

      if (isLocal) {
        scrollListToEnd();
        return {};
      } else {
        return { messageContainer, messageContent };
      }
    } else {
      return {};
    }
  };

  const onUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = async (e) => {};
  };

  const onSend = async () => {
    const textarea = document.getElementById(
      'messageInputArea',
    ) as HTMLTextAreaElement;
    const message = textarea.value.trim();

    if (!message) {
      textarea.value = '';
      textarea.focus();
      return;
    }

    insertMessage('local', message);
    textarea.value = '';
    isMobile ? textarea.blur() : textarea.focus();

    // render LLM response text
    renderResponse(message);
  };

  const renderResponse = (localMessage: string) => {
    const { messageContainer, messageContent } = insertMessage('remote', '');
    messageContainer &&
      messageContent &&
      streamFetch(
        localMessage,
        conversatinId,
        async (
          message:
            | {
                event: 'fetch_error' | 'message' | 'message_end';
                task_id: string;
                message_id: string;
                answer: string;
              }
            | undefined,
        ) => {
          if (message) {
            let { event, task_id, answer } = message;

            if (event === 'fetch_error') {
              answer = '网络错误🙅';
            }
            setConversationId(task_id);

            messageContent.innerText += answer;
            scrollListToEnd();
            if (event === 'message_end') {
              scrollListToEnd();
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
          } else {
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
