import { ThemedText } from "@/components/Themes/text";
import { ThemedView } from "@/components/Themes/view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const More = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/(auth)/(login)/(auth)");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ThemedView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <ThemedText>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
};

export default More;
