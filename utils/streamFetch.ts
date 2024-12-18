const streamFetch = async (query: string, callback: Function) =>
  fetch(process.env.DIFY_APP_HOST!, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.DIFY_APP_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {},
      query,
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
          chunk.split('\n\n').forEach((event) => {
            const jsonData = event.substring(5).trim();
            if (jsonData) {
              try {
                const message = JSON.parse(jsonData);
                callback({ event: 'message', message });
              } catch (error) {
                callback({ event: 'message_error' });
              }
            } else {
              callback({ event: 'message', message: '' });
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
