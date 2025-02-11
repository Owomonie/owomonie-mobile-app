import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/Themes/text";
import { ThemedSafeAreaView } from "@/components/Themes/view";
import { logOut } from "@/redux/slice/logout";
import { useAppDispatch } from "@/redux/store";

const More = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("password");
    await dispatch(logOut());
    await AsyncStorage.removeItem("token");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ThemedSafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <ThemedText>Logout</ThemedText>
        </TouchableOpacity>
      </ThemedSafeAreaView>
    </>
  );
};

export default More;
