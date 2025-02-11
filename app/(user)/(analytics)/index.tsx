import { ThemedText } from "@/components/Themes/text";
import { ThemedSafeAreaView } from "@/components/Themes/view";
import { Stack } from "expo-router";

const Analytics = () => {
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
        <ThemedText>Analytics</ThemedText>
      </ThemedSafeAreaView>
    </>
  );
};

export default Analytics;
