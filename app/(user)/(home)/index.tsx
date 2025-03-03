import { Alert, BackHandler } from "react-native";
import { useCallback } from "react";
import { Stack, useFocusEffect } from "expo-router";
import HomePage from "@/components/Home";

const Home = () => {
  const handleBackPress = () => {
    Alert.alert("OwoMonie", "Are you sure you want to quit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
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
      <HomePage />
    </>
  );
};

export default Home;
