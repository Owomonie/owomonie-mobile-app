import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch } from "@/redux/store";
import { brandColor } from "@/constants/Colors";

export default function UserLayout() {
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#0F0F0F" : "#F7F7F7",
          borderBlockColor: isDarkMode ? "#0F0F0F" : "#F7F7F7",
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
            <Entypo
              name="home"
              size={17}
              color={focused ? brandColor : "#5F5F5F"}
              style={{
                padding: 5,
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
            <MaterialCommunityIcons
              name="steering"
              size={17}
              color={focused ? brandColor : "#5F5F5F"}
              style={{
                padding: 5,
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
            <MaterialIcons
              name="analytics"
              size={17}
              color={focused ? brandColor : "#5F5F5F"}
              style={{
                padding: 5,
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
            <AntDesign
              name="wallet"
              size={17}
              color={focused ? brandColor : "#5F5F5F"}
              style={{
                padding: 5,
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
            <AntDesign
              name="setting"
              size={17}
              color={focused ? brandColor : "#5F5F5F"}
              style={{
                padding: 5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
