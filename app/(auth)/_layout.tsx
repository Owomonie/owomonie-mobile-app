import { Stack, Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Tabs.Screen name="(login)/[id]" />
    </Stack>
  );
}
