import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";

import Spinner from "@/components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserLayout() {
  const { isDarkMode } = useTheme();
  const loadingLogout = useSelector((state: RootState) => state.logout.loading);
  const loadingUser = useSelector(
    (state: RootState) => state.userDetails.loading
  );
  const loadingBanks = useSelector((state: RootState) => state.banks.loading);

  return (
    <View style={{ flex: 1 }}>
      {(loadingLogout || loadingUser || loadingBanks) && <Spinner />}

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#0F0F0F" : "#F6F5FF",
            borderBlockColor: isDarkMode ? "#0F0F0F" : "#F6F5FF",
            paddingBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="(home)/index"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? brandColor : "#5F5F5F",
                  fontFamily: "As550",
                }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/tabs/focused/home.png")
                    : require("../../assets/tabs/unfocused/home.png")
                }
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(track)/index"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? brandColor : "#5F5F5F",
                  fontFamily: "As550",
                }}
              >
                Track
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/tabs/focused/track.png")
                    : require("../../assets/tabs/unfocused/track.png")
                }
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(analytics)/index"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? brandColor : "#5F5F5F",
                  fontFamily: "As550",
                }}
              >
                Analytics
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/tabs/focused/analytical.png")
                    : require("../../assets/tabs/unfocused/analytic.png")
                }
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(wallet)/index"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? brandColor : "#5F5F5F",
                  fontFamily: "As550",
                }}
              >
                Wallet
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/tabs/focused/wallet.png")
                    : require("../../assets/tabs/unfocused/wallet.png")
                }
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(more)/index"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? brandColor : "#5F5F5F",
                  fontFamily: "As550",
                }}
              >
                More
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/tabs/focused/more.png")
                    : require("../../assets/tabs/unfocused/more.png")
                }
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
