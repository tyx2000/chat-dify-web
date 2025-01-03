/**
 * 问题：express使用express.json()中间件获取post请求body参数，使sse无法正常发送数据
 * const content =
  'a quick fox jumps over the lazy dog a quick fox jumps over the lazy dog a quick fox jumps over the lazy dog a quick fox jumps over the lazy dog';

app.post('/dify-sse', (req, res) => {
  console.log('rrrrrrr', req.query.conversation_id);

  const { conversation_id } = req.query;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const randomString = () => Math.random().toString(36).slice(2);
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  let task_id = `t_${randomString()}`,
    start = 0;

  const timerId = setInterval(() => {
    const answer = content.slice(start, start + 5);
    const id = `m_${randomString()}`;

    start += 5;
    const nextAnswer = content.slice(start, start + 5);

    console.log({ answer, id, start, nextAnswer });

    sendEvent({
      event: nextAnswer ? 'message' : 'message_end',
      task_id: conversation_id || task_id,
      id,
      answer,
    });

    if (!nextAnswer) clearInterval(timerId);
  }, 100);

  req.on('close', () => {
    clearInterval(timerId);
    res.end();
  });
});
 */

const streamFetch = async (
  query: string,
  conversation_id: string,
  callback: Function,
) =>
  // fetch(process.env.DIFY_APP_HOST!, {
  fetch('http://localhost:8080/dify-sse?conversation_id=' + conversation_id, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.DIFY_APP_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {},
      query,
      conversation_id,
      response_mode: 'streaming',
      user: process.env.DIFY_USER_NAME!,
    }),
  })
    .then((response) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      function read() {
        reader?.read().then(({ value, done }) => {
          if (done) {
            callback({ event: 'message_end' });
            return;
          }

          const chunk = decoder.decode(value, { stream: true });

          // data: {"event": "message", "task_id": "900bbd43-dc0b-4383-a372-aa6e6c414227", "id": "663c5084-a254-4040-8ad3-51f2a3c1a77c", "answer": "Hi", "created_at": 1705398420}\n\n
          chunk.split('\n\n').forEach((event) => {
            const jsonData = event.substring(5).trim();
            if (jsonData) {
              try {
                const message = JSON.parse(jsonData);
                callback(message);
              } catch (error) {
                callback();
              }
            } else {
              callback();
            }
          });

          read();
        });
      }

      read();
    })
    .catch((error) => {
      callback({ event: 'fetch_error' });
    });

export default streamFetch;
