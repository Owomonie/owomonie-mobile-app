import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Antonio_700Bold } from "@expo-google-fonts/antonio";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/Toast";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { StatusBar } from "expo-status-bar";
import { NotificationProvider } from "@/providers/NotificationProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    As700: require("../assets/fonts/Aspekta/Aspekta-700.ttf"),
    As600: require("../assets/fonts/Aspekta/Aspekta-600.ttf"),
    As550: require("../assets/fonts/Aspekta/Aspekta-550.ttf"),
    As500: require("../assets/fonts/Aspekta/Aspekta-500.ttf"),
    As450: require("../assets/fonts/Aspekta/Aspekta-450.ttf"),
    As350: require("../assets/fonts/Aspekta/Aspekta-350.ttf"),
    An700: Antonio_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NotificationProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <Toast config={toastConfig} />
        </NotificationProvider>
      </Provider>
    </ThemeProvider>
  );
}
