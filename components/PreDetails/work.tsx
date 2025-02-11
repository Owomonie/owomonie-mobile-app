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
import { updateUserWorkType } from "@/redux/slice/update-user-details";

const workList = [
  "Tech",
  "Creative",
  "Media/Art",
  "Self employed",
  "9 to 5",
  "Others",
];

const Work = () => {
  const [selectedWork, setSelectedWork] = useState("");
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();

  const handleWorkSelect = (work: string) => {
    setSelectedWork(work);
  };

  const handleNextBtn = () => {
    if (!selectedWork) {
      Toast.show({
        type: "info",
        text1: "Select Work Type",
        visibilityTime: 5000,
      });
    } else {
      dispatch(
        updateUserWorkType({
          workType: selectedWork,
        })
      );
    }
  };

  return (
    <ThemedSafeAreaView style={styles.page}>
      <View>
        <ProgressBar progress={3} />
        <View style={styles.stepsCont}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={isDarkMode ? "#FCFCFC" : "#0F0F0F"}
            />
          </TouchableOpacity>
          <ThemedText style={styles.steps}>3/5 Steps</ThemedText>
        </View>
        <Image
          source={require("../../assets/preDetails/image.png")}
          style={styles.image}
        />
      </View>
      <View>
        <ThemedText style={styles.title}>
          How would you describe your work? 🧠
        </ThemedText>
        <View style={styles.buttonContainer}>
          {workList.map((work) => (
            <TouchableOpacity
              key={work}
              style={[
                styles.button,
                {
                  backgroundColor: isDarkMode ? "#151515" : "#DEEEFD",
                  borderColor:
                    selectedWork === work ? brandColor : "transparent",
                  borderWidth: selectedWork === work ? 3 : 0,
                },
              ]}
              onPress={() => handleWorkSelect(work)}
            >
              <ThemedText style={[styles.buttonText]}>{work}</ThemedText>
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

export default Work;

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
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },

  button: {
    backgroundColor: "black",
    height: 60,
    width: 85,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 10,
  },

  buttonText: {
    fontFamily: "As550",
    fontSize: 12,
    width: 60,
    textAlign: "center",
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
