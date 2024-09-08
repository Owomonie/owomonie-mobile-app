import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../Themes/view";
import { ThemedText, ThemedText2 } from "../Themes/text";
import ProgressBar from "./progress-bar";
import { brandColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { updateUserAvatar } from "@/redux/slice/update-user-details";
import { useAppDispatch } from "@/redux/store";

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

const Avatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>();
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageSourcePropType;
    index: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isDarkMode ? "#151515" : "#DEEEFD",
          borderColor: selectedAvatar === index ? brandColor : "transparent",
          borderWidth: selectedAvatar === index ? 3 : 0,
        },
      ]}
      onPress={() => handleAvatarSelect(index)}
    >
      <Image source={item} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  const handleNextBtn = () => {
    if (!selectedAvatar) {
      Toast.show({
        type: "info",
        text1: "Select Avatar",
        visibilityTime: 5000,
      });
    } else {
      dispatch(
        updateUserAvatar({
          avatarNum: selectedAvatar,
        })
      );
    }
  };

  return (
    <ThemedView style={styles.page}>
      <View>
        <ProgressBar progress={5} />
        <View style={styles.stepsCont}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={isDarkMode ? "#FCFCFC" : "#0F0F0F"}
            />
          </TouchableOpacity>
          <ThemedText style={styles.steps}>5/5 Steps</ThemedText>
        </View>
        <Image
          source={require("../../assets/preDetails/image.png")}
          style={styles.image}
        />
      </View>
      <View>
        <ThemedText style={styles.title}>
          Choose your preferred account avatar
        </ThemedText>
        <View style={styles.infoCont}>
          <AntDesign
            name="exclamationcircleo"
            size={10}
            color={isDarkMode ? "#FCFCFC" : "#0F0F0F"}
          />
          <ThemedText2 style={styles.info}>
            You can edit your profile in account settings
          </ThemedText2>
        </View>
        <View style={{ height: 300 }}>
          <FlatList
            data={avatarList}
            renderItem={({ item, index }) =>
              renderItem({
                item,
                index: index.toString(),
              })
            }
            keyExtractor={(item) => item.toString()}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.buttonContainer}
          />
        </View>
      </View>
      <View>
        <View style={styles.infoCont}>
          <AntDesign
            name="exclamationcircleo"
            size={10}
            color={isDarkMode ? "#FCFCFC" : "#0F0F0F"}
          />
          <ThemedText2 style={styles.info}>
            You can edit your profile in account settings
          </ThemedText2>
        </View>
        <TouchableOpacity style={styles.nextCont} onPress={handleNextBtn}>
          <Text style={styles.nextText}>Let's go</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  stepsCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  steps: {
    fontSize: 12,
    fontFamily: "As350",
  },

  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
    alignSelf: "flex-end",
  },

  buttonContainer: {
    flexGrow: 1,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  button: {
    borderRadius: 8,
    marginVertical: 10,
    width: "30%",
    aspectRatio: 1,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontFamily: "As550",
    fontSize: 24,
  },

  infoCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
  },

  info: {
    fontFamily: "As450",
    fontSize: 10,
  },

  nextCont: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
  },

  nextText: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
