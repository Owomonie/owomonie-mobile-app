import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useContext,
} from "react";
import * as Notifications from "expo-notifications";

import { registerForPushNotificationsAsync } from "@/config/notification";

import { useAppDispatch } from "@/redux/store";
import { saveExpoPushToken } from "@/redux/slice/push-notification";

type NotificationContextType = {
  pushToken: string | null;
  notification: Notifications.Notification | undefined;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // useEffect(() => {
  //   const getPushToken = async () => {
  //     try {

  //       notificationListener.current =
  //         Notifications.addNotificationReceivedListener((notification) => {
  //           setNotification(notification);
  //         });

  //       responseListener.current =
  //         Notifications.addNotificationResponseReceivedListener((response) => {
  //           // const { notification, actionIdentifier } = response;
  //           // console.log("Notification Response:", notification);
  //           // console.log("Action Identifier:", actionIdentifier);
  //         });
  //     } catch (error) {
  //       console.error("Error getting push token:", error);
  //     }
  //   };

  //   getPushToken();

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, [dispatch]);

  return (
    <NotificationContext.Provider value={{ pushToken, notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const usePushNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "usePushNotification must be used within a Notification Provider"
    );
  }
  return context;
};
