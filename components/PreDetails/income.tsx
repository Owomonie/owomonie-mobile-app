import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../Themes/view";
import { ThemedText, ThemedText2 } from "../Themes/text";
import ProgressBar from "./progress-bar";
import { brandColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/redux/store";
import { updateUserIncomeRange } from "@/redux/slice/update-user-details";

const incomeList = [
  "₦0 - ₦100,000 per month",
  "₦100,000 - ₦250,000 per month",
  "₦250,000 - ₦500,000 per month",
  "₦500,000 - ₦1,000,000 per month",
  "₦1,000,000 and above per month",
];

const Income = () => {
  const [selectedIncome, setSelectedIncome] = useState("");
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();

  const handleIncomeSelect = (Income: string) => {
    setSelectedIncome(Income);
  };

  const handleNextBtn = () => {
    if (!selectedIncome) {
      Toast.show({
        type: "info",
        text1: "Select Income Range",
        visibilityTime: 5000,
      });
    } else {
      dispatch(
        updateUserIncomeRange({
          incomeRange: selectedIncome,
        })
      );
    }
  };

  return (
    <ThemedView style={styles.page}>
      <View>
        <ProgressBar progress={4} />
        <View style={styles.stepsCont}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={isDarkMode ? "#FCFCFC" : "#0F0F0F"}
            />
          </TouchableOpacity>
          <ThemedText style={styles.steps}>4/5 Steps</ThemedText>
        </View>
        <Image
          source={require("../../assets/preDetails/image.png")}
          style={styles.image}
        />
      </View>
      <View>
        <ThemedText style={styles.title}>
          What is your income range monthly? 🤑
        </ThemedText>
        <View style={styles.buttonContainer}>
          {incomeList.map((income) => (
            <TouchableOpacity
              key={income}
              style={[
                styles.button,
                {
                  backgroundColor: isDarkMode ? "#151515" : "#DEEEFD",
                  borderColor:
                    selectedIncome === income ? brandColor : "transparent",
                  borderWidth: selectedIncome === income ? 3 : 0,
                },
              ]}
              onPress={() => handleIncomeSelect(income)}
            >
              <ThemedText style={[styles.buttonText]}>{income}</ThemedText>
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
    </ThemedView>
  );
};

export default Income;

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
    marginVertical: 30,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 5,
    paddingVertical: 15,
  },

  buttonText: {
    fontFamily: "As550",
    fontSize: 12,
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
