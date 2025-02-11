import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { ThemedSafeAreaView } from "../Themes/view";
import { ThemedText, ThemedText2 } from "../Themes/text";
import ProgressBar from "./progress-bar";
import { brandColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/redux/store";
import { updateUserGender } from "@/redux/slice/update-user-details";

const genderList = ["Male", "Female", "Others"];

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const { isDarkMode } = useTheme();

  const dispatch = useAppDispatch();

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleNextBtn = () => {
    if (!selectedGender) {
      Toast.show({
        type: "info",
        text1: "Select Gender",
        visibilityTime: 5000,
      });
    } else {
      dispatch(
        updateUserGender({
          gender: selectedGender,
        })
      );
    }
  };

  return (
    <ThemedSafeAreaView style={styles.page}>
      <View>
        <ProgressBar progress={1} />
        <ThemedText style={styles.steps}>1/5 Steps</ThemedText>
        <Image
          source={require("../../assets/preDetails/image.png")}
          style={styles.image}
        />
      </View>
      <View>
        <ThemedText style={styles.title}>Select Your Gender 😀</ThemedText>
        <View style={styles.buttonContainer}>
          {genderList.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.button,
                {
                  backgroundColor: isDarkMode ? "#151515" : "#DEEEFD",
                  borderColor:
                    selectedGender === gender ? brandColor : "transparent",
                  borderWidth: selectedGender === gender ? 3 : 0,
                },
              ]}
              onPress={() => handleGenderSelect(gender)}
            >
              <ThemedText style={[styles.buttonText]}>{gender}</ThemedText>
            </TouchableOpacity>
          ))}
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
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ThemedSafeAreaView>
  );
};

export default Gender;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  steps: {
    textAlign: "right",
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
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "black",
    height: 60,
    width: 85,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  buttonText: {
    fontFamily: "As550",
    fontSize: 12,
  },

  title: {
    fontFamily: "As550",
    fontSize: 24,
  },

  infoCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
