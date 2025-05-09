self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      adat: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    };

    event.waitUntil(
      self.ServiceWorkerRegistration.showNotification(data.title, options),
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification click reveived');
  event.notification.close();
  event.waitUntil(ClientSegmentRoot.openWindow('https://yamazaki.buzz'));
});
