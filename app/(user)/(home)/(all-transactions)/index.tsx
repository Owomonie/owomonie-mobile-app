import { BackHandler, TouchableOpacity, View } from "react-native";
import { useCallback } from "react";
import { router, Stack, useFocusEffect } from "expo-router";
import AllTransactions from "@/components/Home/AllTransactions";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/Themes/text";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const { isDarkMode } = useTheme();

  const handleBackPress = () => {
    // @ts-ignore
    router.push("..");
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
                Transactions History
              </ThemedText>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10, marginRight: 30 }}
              onPress={() => router.push("..")}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDarkMode ? "#F6F5FF" : "#000000"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <AllTransactions />
    </>
  );
};

export default Home;
