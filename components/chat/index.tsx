import styles from './index.module.css';
import Header from '../header';
import Messages from '../messages';
import Input from '../input';
import { cookies } from 'next/headers';
import { models, DEFAULT_MODEL_NAME } from '@/constances/models';

export default async function Chat() {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('modelId')?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <div className={styles.chat}>
      <Header selectedModelId={selectedModelId} />
      <Messages />
      <Input />
    </div>
  );
}
