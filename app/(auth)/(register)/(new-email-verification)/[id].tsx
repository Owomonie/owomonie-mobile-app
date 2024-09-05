import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedScrollView } from "@/components/Themes/scrollview";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/Themes/text";
import { Ionicons } from "@expo/vector-icons";
import Verification from "@/components/Auth/Verification";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const CreateVerificationScreen = () => {
  const { isDarkMode } = useTheme();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const loading = useSelector(
    (state: RootState) => state.createAccount.loading
  );

  return (
    <>
      {loading && <Spinner />}

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#0E0E0E" : "#F6F5FF",
          },
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
          headerTintColor: isDarkMode ? "#ffffff" : "#000000",
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
