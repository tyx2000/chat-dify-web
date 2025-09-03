import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, response: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const conversation_id = searchParams.get('conversation_id');
  console.log({ conversation_id });

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (data: any) => {
        const dataStr = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(dataStr));
      };
      let count = 0;
      const interval = setInterval(() => {
        count++;
        sendEvent({
          type: 'message',
          time: Date.now(),
          count,
          message: `这是第${count}条消息`,
        });
        if (count % 3 === 0) {
          sendEvent({ type: 'checkpoint', count });
        }
        if (count >= 10) {
          clearInterval(interval);
          sendEvent({ type: 'complete' });
          controller.close();
        }
      }, 200);
    },
    cancel() {
      console.log('SSE stream canceled');
    },
  });

  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');
  headers.set('Access-Control-Allow-Origin', '*');

  return new NextResponse(stream, { headers });
}

export const dynamic = 'force-dynamic';
