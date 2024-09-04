import { Image, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/Themes/text";
import ForgetEmail from "@/components/Auth/Forget";

const ForgetEmailScreen = () => {
  const { isDarkMode } = useTheme();

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
                  ? require("../../../assets/auth/darkCreateIcon.png")
                  : require("../../../assets/auth/whiteCreateIcon.png")
              }
            />
          ),
        }}
      />
      <ForgetEmail />
    </>
  );
};

export default ForgetEmailScreen;
