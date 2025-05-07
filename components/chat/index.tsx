import Header from '../header';
import Messages from '../messages';
import { cookies } from 'next/headers';
import { models, DEFAULT_MODEL_NAME } from '@/constances/models';
import Container from './container';

export default async function Chat({
  id,
  messages,
}: {
  id?: string;
  messages?: { chatId: string; content: string; id: string; role: string }[];
}) {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('modelId')?.value;
  const token = cookieStore.get('session')?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <Container>
      <Header selectedModelId={selectedModelId} token={token} />
      <Messages id={id} messages={messages} />
    </Container>
  );
}
