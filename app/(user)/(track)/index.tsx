import { ThemedText } from "@/components/Themes/text";
import { ThemedSafeAreaView } from "@/components/Themes/view";
import { Stack } from "expo-router";

const Track = () => {
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
        <ThemedText>Track</ThemedText>
      </ThemedSafeAreaView>
    </>
  );
};

export default Track;
