import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";

import RegisterSuccess from "@/components/Auth/CreateAccount/success";
import { useCallback } from "react";
import { Alert, BackHandler } from "react-native";

const RegisterSuccessScreen = () => {
  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const handleBackPress = () => {
    Alert.alert("OwoMonie", "Registration Successful, Set Up Profile", [
      {
        text: "Back",
        onPress: () => null,
        style: "cancel",
      },
      { text: "QUIT APP", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <RegisterSuccess email={email} />
    </>
  );
};

export default RegisterSuccessScreen;
