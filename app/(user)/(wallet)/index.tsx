import { ThemedText } from "@/components/Themes/text";
import { ThemedSafeAreaView } from "@/components/Themes/view";
import { Stack } from "expo-router";

const Wallet = () => {
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
        <ThemedText>Wallet</ThemedText>
      </ThemedSafeAreaView>
    </>
  );
};

export default Wallet;
