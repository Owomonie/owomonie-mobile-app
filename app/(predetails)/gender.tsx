import React, { useCallback } from "react";
import { Stack, useFocusEffect } from "expo-router";
import Gender from "@/components/PreDetails/gender";
import { Alert, BackHandler } from "react-native";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const GenderScreen = () => {
  const loading = useSelector((state: RootState) => state.updateUser.loading);

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
      {loading && <Spinner />}
      <Gender />
    </>
  );
};

export default GenderScreen;
