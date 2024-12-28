import { createContext, useState, useEffect, ReactNode } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/config/notification";

type NotificationContextType = {};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const getPushToken = async () => {
      registerForPushNotificationsAsync().then((token) => console.log(token));
      // Now send the push token to the backend to save in the database
      //    await savePushToken(token.data);
    };

    getPushToken();
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};
