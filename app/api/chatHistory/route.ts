import { cookies } from 'next/headers';
import { getChatHistory } from '@/actions/chat';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    return Response.json({
      status: 401,
      body: { message: 'Unauthorized' },
    });
  } else {
    const chats = await getChatHistory();
    return Response.json(chats);
  }
}
