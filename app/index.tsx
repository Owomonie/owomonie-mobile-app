import React, { useEffect, useState } from "react";
import OnboardingScreen from "./(onboarding)";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem("completedOnboarding");
      if (status === "Done") {
        setIsOnboardingComplete(true);
      } else {
        setIsOnboardingComplete(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  //   if (isOnboardingComplete) {
  //     return <Login />;
  //   }
  return <OnboardingScreen />;
};

export default Home;
