import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import OnboardingGestures from "./gestures";
import { useState } from "react";
import { onboardingSteps } from "./data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ThemedView } from "../Themes/view";
import { brandColor } from "@/constants/Colors";
import { ThemedText } from "../Themes/text";
import { useTheme } from "@/context/ThemeContext";

const Onboarding = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const { isDarkMode } = useTheme();

  const isLastScreen = screenIndex === onboardingSteps.length - 1;

  const onContinue = async () => {
    if (isLastScreen) {
      return;
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      return;
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const handleCreate = async () => {
    await AsyncStorage.setItem("completedOnboarding", "Done");
    router.push("/(auth)/(register)/new-email");
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem("completedOnboarding", "Done");
    router.push("/(auth)");
  };

  return (
    <ThemedView style={styles.page}>
      <OnboardingGestures
        onBack={onBack}
        onContinue={onContinue}
        screenIndex={screenIndex}
      />
      {!isLastScreen ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn1,
              {
                borderColor: isDarkMode ? "#ffffff" : brandColor,
              },
            ]}
            onPress={() => setScreenIndex(2)}
          >
            <Text
              style={[
                styles.btn1Text,
                {
                  color: isDarkMode ? "#ffffff" : brandColor,
                },
              ]}
            >
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn2} onPress={onContinue}>
            <Text style={styles.btn2Text}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <TouchableOpacity
            style={styles.createContainer}
            onPress={handleCreate}
          >
            <Text style={styles.createText}>Create New Account</Text>
          </TouchableOpacity>
          <View style={styles.alreadyContainer}>
            <ThemedText style={styles.alreadyText}>
              Already have an account?
            </ThemedText>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ThemedView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    flex: 1,
    position: "relative",
  },

  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    position: "absolute",
    bottom: 50,
  },

  btn1: {
    borderWidth: 1,
    paddingHorizontal: 40,
    borderRadius: 50,
    paddingVertical: 12,
  },

  btn2: {
    paddingVertical: 12,
    backgroundColor: brandColor,
    borderRadius: 50,
    flex: 1,
  },

  btn1Text: {
    textAlign: "center",
    fontFamily: "As700",
    fontSize: 16,
  },

  btn2Text: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },

  loginContainer: {
    paddingHorizontal: 20,
    gap: 15,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },

  createContainer: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
  },

  createText: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },

  alreadyContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  alreadyText: {
    fontFamily: "As500",
    fontSize: 13,
  },

  loginText: {
    color: brandColor,
    fontFamily: "As700",
    fontSize: 13,
  },
});
