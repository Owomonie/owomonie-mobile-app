import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

import Spinner from "@/components/Spinner";
import { RootState, useAppDispatch } from "@/redux/store";
import { getUserDetails } from "@/redux/slice/get-user-details";
import { useSelector } from "react-redux";
import { registerForPushNotificationsAsync } from "@/config/notification";
import { saveExpoPushToken } from "@/redux/slice/push-notification";
import { getAllBanks } from "@/redux/slice/bank";

const Home = () => {
  const [tokenExist, setTokenExist] = useState<boolean | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadingUserDetails = useSelector(
    (state: RootState) => state.userDetails.loading
  );
  const loadingPushNotification = useSelector(
    (state: RootState) => state.pushNotifications.loading
  );
  const loadingBanks = useSelector((state: RootState) => state.banks.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenAndOnboarding = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setTokenExist(!!token);

        if (token) {
          dispatch(getUserDetails({ token }));
          dispatch(getAllBanks({ token }));
        }

        const status = await AsyncStorage.getItem("completedOnboarding");
        setIsOnboardingComplete(status === "Done");
      } catch (error) {
        console.error("Failed to fetch token or onboarding status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenAndOnboarding();
  }, []);

  useEffect(() => {
    if (!isOnboardingComplete) {
      const saveNewDevicePushToken = async () => {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          await dispatch(saveExpoPushToken({ pushToken: token }));
        }
      };
      saveNewDevicePushToken();
    }
  }, []);

  if (
    isLoading ||
    loadingPushNotification ||
    loadingUserDetails ||
    loadingBanks
  ) {
    return <Spinner />;
  }

  if (isOnboardingComplete && !tokenExist) {
    //@ts-ignore
    return <Redirect href={`(auth)/(login)/(auth)`} />;
  }
  if (!isOnboardingComplete && !tokenExist) {
    // @ts-ignore
    return <Redirect href={`(onboarding)`} />;
  }
};

export default Home;
