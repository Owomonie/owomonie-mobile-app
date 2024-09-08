import { ThemedText } from "@/components/Themes/text";
import { ThemedView } from "@/components/Themes/view";
import { Stack } from "expo-router";

const Wallet = () => {
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
        <ThemedText>Wallet</ThemedText>
      </ThemedView>
    </>
  );
};

export default Wallet;
