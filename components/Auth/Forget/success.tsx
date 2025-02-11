import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedSafeAreaView } from "@/components/Themes/view";
import { ThemedText, ThemedText2 } from "@/components/Themes/text";
import { brandColor } from "@/constants/Colors";
import { router } from "expo-router";

const ForgetSuccess = ({ email }: { email: string }) => {
  const handleSetUp = () => {
    // @ts-ignore
    router.push(`/(auth)/(login)/${email}`);
  };

  return (
    <ThemedSafeAreaView style={styles.page}>
      <View style={styles.imageCont}>
        <Image
          style={styles.image}
          source={require("../../../assets/auth/forgetSuccess.png")}
        />
        <View style={styles.textCont}>
          <ThemedText style={styles.text1}>Password Reset</ThemedText>
          <ThemedText2 style={styles.text2}>
            You have successfully reset your password, click “Login” to continue
          </ThemedText2>
        </View>
      </View>
      <TouchableOpacity style={styles.setupCont} onPress={handleSetUp}>
        <Text style={styles.setupText}>Login</Text>
      </TouchableOpacity>
    </ThemedSafeAreaView>
  );
};

export default ForgetSuccess;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },

  imageCont: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    objectFit: "scale-down",
    width: 200,
  },

  textCont: {
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },

  text1: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "As550",
  },

  text2: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "As450",
  },

  setupCont: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
    marginVertical: 30,
  },

  setupText: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
