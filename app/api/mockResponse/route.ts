import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const searchParams = req.nextUrl.searchParams;
  const conversation_id = searchParams.get('conversation_id');
  console.log({ conversation_id });

  // Response.
}
