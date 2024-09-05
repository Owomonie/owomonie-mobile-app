import { Image, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/Themes/text";
import CreateNewEmail from "@/components/Auth/CreateAccount/email";
import Spinner from "@/components/Spinner";

const CreateVerificationScreen = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* <Spinner /> */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#0E0E0E" : "#F6F5FF",
          },
          headerTintColor: isDarkMode ? "#ffffff" : "#000000",
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
      <CreateNewEmail />
    </>
  );
};

export default CreateVerificationScreen;
