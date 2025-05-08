import { getChatsByUserId } from '@/utils/db/queries';
import { getUserInfo } from '@/utils/session';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  // dynamic route segments /api/123
  // const slug = (await params).slug; // 123

  // query parameters /api/search?query=hello
  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get('query'); // hello

  // post body
  // const body = await req.json()

  // body formData
  // const formData = await req.formData()

  // const session = req.cookies.get('session')?.value;
  const { userId } = await getUserInfo();

  if (!userId) {
    return Response.json({
      status: 401,
      body: { message: 'Unauthorized' },
    });
  } else {
    const chats = await getChatsByUserId(userId + '');
    return Response.json(chats);
  }
}
