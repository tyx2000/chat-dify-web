import { ReactNode } from 'react';
import InstallPrompt from './installPrompt';
import PushNotificationManager from './pushNotificationManager';

const PWANotification = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <InstallPrompt />
      <PushNotificationManager />
      {children}
    </>
  );
};

export default PWANotification;
