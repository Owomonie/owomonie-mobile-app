import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useContext,
} from "react";
import * as Notifications from "expo-notifications";

import { RootState, useAppDispatch } from "@/redux/store";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { UserDetails } from "@/utils/types";

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

  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );

  useEffect(() => {
    const getNotifications = async () => {
      try {
        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            const { notification } = response;

            if (!user._id) {
              router.push("/(auth)/(login)/(auth)");
            } else {
              if (!user.gender) {
                router.push("/(predetails)/gender");
              } else {
                router.push("/(user)/(home)");
                // Navigate user to any screen based on the notification.
              }
            }
          });
      } catch (error) {
        console.error("Error getting Notification", error);
      }
    };

    getNotifications();

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [dispatch]);

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
