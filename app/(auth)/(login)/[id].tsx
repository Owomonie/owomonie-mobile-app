import { Alert, BackHandler, Image, View } from "react-native";
import React, { useCallback } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/Themes/text";
import { useTheme } from "@/context/ThemeContext";
import Login from "@/components/Auth/Login";
import Spinner from "@/components/Spinner";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const LoginScreen = () => {
  const { isDarkMode } = useTheme();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const loading = useSelector((state: RootState) => state.login.loading);

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
      {loading && <Spinner />}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#0E0E0E" : "#F6F5FF",
          },
          headerBackVisible: false,
          headerTitle: () => (
            <View>
              <ThemedText
                style={{
                  fontFamily: "As700",
                  fontSize: 20,
                }}
              ></ThemedText>
            </View>
          ),

          headerRight: () => (
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={
                isDarkMode
                  ? require("../../../assets/auth/darkCreateIcon.png")
                  : require("../../../assets/auth/whiteCreateIcon.png")
              }
            />
          ),
        }}
      />
      <Login regEmail={email} />
    </>
  );
};

export default LoginScreen;
