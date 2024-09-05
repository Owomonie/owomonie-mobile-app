import {
  Alert,
  BackHandler,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/Themes/text";
import { Ionicons } from "@expo/vector-icons";
import Reset from "@/components/Auth/Forget/reset";

const ResetPasswordScreen = () => {
  const { isDarkMode } = useTheme();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const handleBackPress = () => {
    Alert.alert("OwoMonie", "Kindly Input Password", [
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

          headerRight: () => (
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={
                isDarkMode
                  ? require("../../../../assets/auth/darkCreateIcon.png")
                  : require("../../../../assets/auth/whiteCreateIcon.png")
              }
            />
          ),
        }}
      />
      <Reset email={email} />
    </>
  );
};

export default ResetPasswordScreen;
