import ForgetSuccess from "@/components/Auth/Forget/success";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler } from "react-native";

const ForgetSuccessScreen = () => {
  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const handleBackPress = () => {
    Alert.alert("OwoMonie", "Password reset successful, Procceed to login", [
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
      <ForgetSuccess email={email} />
    </>
  );
};

export default ForgetSuccessScreen;
