import { Stack, Tabs } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
