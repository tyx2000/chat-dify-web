'use server';

import { title } from 'process';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:tyxu4459@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

let subscription: PushSubscription | null = null;

export const subscribeUser = async (sub: PushSubscription) => {
  subscription = sub;
  return { success: true };
};

export const unsubscribeUser = async () => {
  subscription = null;
  return { success: false };
};

export const sendNotification = async (message: string) => {
  if (!subscription) {
    throw new Error('no subscription available');
  }

  try {
    await webpush.sendNotification(
      // @ts-ignore
      subscription,
      JSON.stringify({
        title: 'test notification',
        body: message,
        icon: '/icon.png',
      }),
    );
    return { success: true };
  } catch (error) {
    console.error('push notification error', error);
    return { success: false, error: 'failed to push' };
  }
};
