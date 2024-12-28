import { createContext, useState, useEffect, ReactNode } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/config/notification";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { UserDetails } from "@/utils/types";
import { saveUserExpoPushToken } from "@/redux/slice/push-notification";

type NotificationContextType = {
  pushToken: string | null;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [pushToken, setPushToken] = useState<string | null>(null);

  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );
  const userID = user?._id;

  useEffect(() => {
    const getPushToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          if (userID) {
            setPushToken(token);
            dispatch(saveUserExpoPushToken({ pushToken: token }));
          }
        }
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    };

    getPushToken();
  }, [dispatch, userID]);

  return (
    <NotificationContext.Provider value={{ pushToken }}>
      {children}
    </NotificationContext.Provider>
  );
};
