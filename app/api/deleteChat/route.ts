import { deleteChatById } from '@/utils/db/queries';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id')!;

  const { data, error } = await deleteChatById({ id });

  return Response.json({ data, error });
}
