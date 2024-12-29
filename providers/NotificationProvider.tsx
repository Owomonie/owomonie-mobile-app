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
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { UserDetails } from "@/utils/types";
import {
  saveUnauthenticatedUserExpoPushToken,
  saveUserExpoPushToken,
} from "@/redux/slice/push-notification";
import { SchedulableTriggerInputTypes } from "expo-notifications";

type NotificationContextType = {
  pushAuthToken: string | null;
  pushUnauthToken: string | null;
  notification: Notifications.Notification | undefined;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [pushAuthToken, setPushAuthToken] = useState<string | null>(null);
  const [pushUnauthToken, setPushUnauthToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );
  const userID = user?._id;

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    const getPushToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          if (userID) {
            setPushAuthToken(token);
            await dispatch(saveUserExpoPushToken({ pushToken: token }));
          } else {
            setPushUnauthToken(token);
            await dispatch(
              saveUnauthenticatedUserExpoPushToken({ pushToken: token })
            );
          }
        }

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            const { notification, actionIdentifier } = response;

            console.log("Notification Response:", notification);
            console.log("Action Identifier:", actionIdentifier);
          });
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    };

    getPushToken();

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [dispatch, userID]);

  return (
    <NotificationContext.Provider
      value={{ pushAuthToken, notification, pushUnauthToken }}
    >
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
