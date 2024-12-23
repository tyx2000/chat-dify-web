const streamFetch = async (
  query: string,
  conversation_id: string,
  callback: Function,
) =>
  fetch(process.env.DIFY_APP_HOST!, {
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
