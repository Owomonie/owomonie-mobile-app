import {
  Alert,
  BackHandler,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/Themes/text";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import Login from "@/components/Auth/Login";

const LoginScreen = () => {
  const { isDarkMode } = useTheme();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  // const handleBackPress = () => {
  //   Alert.alert("OwoMonie", "Are you sure you want to quit the app?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel",
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() },
  //   ]);
  //   return true;
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     BackHandler.addEventListener("hardwareBackPress", handleBackPress);

  //     return () => {
  //       BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  //     };
  //   }, [])
  // );

  return (
    <>
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
              >
                {/* Create Account */}
              </ThemedText>
            </View>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //     // onPress={handleBackPress}
          //     style={{ marginRight: 30 }}
          //   >
          //     <Ionicons
          //       name="arrow-back"
          //       size={24}
          //       color={isDarkMode ? "#F6F5FF" : "#000000"}
          //     />
          //   </TouchableOpacity>
          // ),
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
