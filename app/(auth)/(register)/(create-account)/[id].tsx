import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import CreateAccount from "@/components/Auth/CreateAccount";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/Themes/text";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const CreateAccountScreen = () => {
  const { isDarkMode } = useTheme();

  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  const loading = useSelector(
    (state: RootState) => state.createAccount.loading
  );

  const handleBackPress = () => {
    Alert.alert(
      "OwoMonie",
      "Are you sure you want to cancel registration and quit the app?",
      [
        {
          text: "Back",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]
    );
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
              >
                {/* Create Account */}
              </ThemedText>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackPress}
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
      <CreateAccount email={email} />
    </>
  );
};

export default CreateAccountScreen;
