import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedScrollView } from "@/components/Themes/scrollview";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/Themes/text";
import { Ionicons } from "@expo/vector-icons";
import Verification from "@/components/Auth/Verification";

const CreateVerificationScreen = () => {
  const { isDarkMode } = useTheme();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

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
          headerLeft: () => (
            <TouchableOpacity
              // onPress={handleBackPress}
              style={{ marginRight: 30 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDarkMode ? "#F6F5FF" : "#000000"}
              />
            </TouchableOpacity>
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
      <Verification email={email} endPoint="create" />
    </>
  );
};

export default CreateVerificationScreen;
