'use client';

import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from '@/actions/notification';
import { urlBase64ToUint8Array } from '@/utils/tools';
import { useEffect, useState } from 'react';

const PushNotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  };

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  };

  const unsubscribeFromPush = async () => {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  };

  const sendTestNotification = async () => {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  };

  if (!isSupported) {
    return <p>Push Notification are not supported in this browser</p>;
  }

  return (
    <div>
      <h3>Push notification</h3>
      {subscription ? (
        <>
          <p>you are subscribed to push notification</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>send test</button>
        </>
      ) : (
        <>
          <p>You are not subscribe to push notification</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
};

export default PushNotificationManager;
