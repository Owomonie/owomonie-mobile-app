import { Alert, BackHandler, Image, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useSelector } from "react-redux";

import { ThemedText } from "@/components/Themes/text";
import { useTheme } from "@/context/ThemeContext";
import Login from "@/components/Auth/Login";
import Spinner from "@/components/Spinner";
import { RootState, useAppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slice/login";
import { registerForPushNotificationsAsync } from "@/config/notification";

const LoginScreen = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const loading = useSelector((state: RootState) => state.login.loading);
  const loading2 = useSelector(
    (state: RootState) => state.pushNotifications.loading
  );

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
      const loginWithFingerPrint = async () => {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");
        if (!email || !password) {
          return;
        } else {
          checkBiometricAuthentication(email, password);
        }
      };
      loginWithFingerPrint();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  const checkBiometricAuthentication = async (
    email: string,
    password: string
  ) => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const biometricsAvailable = await LocalAuthentication.isEnrolledAsync();
        if (biometricsAvailable) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login to Owomonie with your fingerprint",
          });

          if (result.success) {
            dispatch(loginUser({ email, password }));
          } else {
            console.log("Fingerprint authentication stopped by user");
          }
        } else {
          console.log("No biometrics enrolled");
        }
      } else {
        console.log("Device doesn't support biometric authentication");
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
    }
  };

  return (
    <>
      {(loading || loading2) && <Spinner />}
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
