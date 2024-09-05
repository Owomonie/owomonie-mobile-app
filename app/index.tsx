import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import Spinner from "@/components/Spinner";

const Home = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("completedOnboarding");
        if (status === "Done") {
          setIsOnboardingComplete(true);
        } else {
          setIsOnboardingComplete(false);
        }
      } catch (error) {
        console.error("Failed to fetch onboarding status", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isOnboardingComplete) {
    //@ts-ignore
    return <Redirect href={`(auth)/(login)/(auth)`} />;
  }

  return <Redirect href={`(onboarding)`} />;
};

export default Home;
