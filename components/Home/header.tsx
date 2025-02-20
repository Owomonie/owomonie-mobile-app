import { Image, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ThemedText } from "../Themes/text";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { brandColor } from "@/constants/Colors";
import { UserDetails } from "@/utils/types";
import { Skeleton } from "moti/skeleton";
import { getUserDetails } from "@/redux/slice/get-user-details";
import AsyncStorage from "@react-native-async-storage/async-storage";

const avatarList = [
  require("../../assets/preDetails/avatars/1.png"),
  require("../../assets/preDetails/avatars/2.png"),
  require("../../assets/preDetails/avatars/3.png"),
  require("../../assets/preDetails/avatars/4.png"),
  require("../../assets/preDetails/avatars/5.png"),
  require("../../assets/preDetails/avatars/6.png"),
  require("../../assets/preDetails/avatars/7.png"),
  require("../../assets/preDetails/avatars/8.png"),
  require("../../assets/preDetails/avatars/9.png"),
  require("../../assets/preDetails/avatars/10.png"),
  require("../../assets/preDetails/avatars/11.png"),
  require("../../assets/preDetails/avatars/12.png"),
];

const HomeHeader = () => {
  const { isDarkMode } = useTheme();
  const [skeletalLoading, setSkeletalLoading] = useState<boolean>(true);
  const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setSkeletalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(getUserDetails({ token }));
      }
    };

    fetchData();
  }, [dispatch]);

  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );

  const loading = useSelector((state: RootState) => state.userDetails.loading);

  const avatarIndex = parseInt(user.avatar);
  const avatarSource = avatarList[avatarIndex];
  return (
    <View style={styles.headerCont}>
      <View>
        <ThemedText style={styles.hello}>Hello!</ThemedText>
        <Skeleton
          show={loading || skeletalLoading}
          radius={"round"}
          colorMode={colorMode}
        >
          <ThemedText style={styles.name}>
            {user.firstName} {user.lastName}
          </ThemedText>
        </Skeleton>
      </View>

      <View style={styles.iconCont}>
        <Ionicons
          name="notifications-outline"
          size={21}
          color={!isDarkMode ? "#0F0F0F" : "#F6F5FF"}
          style={{
            padding: 6,
          }}
        />
        <Skeleton
          show={loading || skeletalLoading}
          radius={"round"}
          colorMode={colorMode}
        >
          <View style={styles.avatarCont}>
            <Image source={avatarSource} style={styles.avatarImage} />
          </View>
        </Skeleton>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerCont: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  hello: {
    fontSize: 19,
    fontFamily: "As550",
  },

  name: {
    fontSize: 12,
    fontFamily: "As350",
    marginVertical: 2,
    minHeight: 15,
  },

  iconCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatarCont: {
    backgroundColor: brandColor,
    width: 35,
    height: 35,
    borderRadius: 50,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});
