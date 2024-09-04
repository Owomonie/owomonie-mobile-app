import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/Themes/view";
import { ThemedText, ThemedText2 } from "@/components/Themes/text";
import { ThemedInput } from "@/components/Themes/textInput";
import { brandColor } from "@/constants/Colors";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CreateNewEmail = () => {
  const [email, setEmail] = useState("");

  const handleSendOTP = () => {
    if (!email) {
      Toast.show({
        type: "info",
        text1: "Email is Required",
        visibilityTime: 5000,
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "info",
        text1: "Invalid Email",
        visibilityTime: 5000,
      });
    } else {
      router.push(`/(auth)/(register)/(new-email-verification)/${email}`);
    }
  };

  return (
    <ThemedView style={styles.page}>
      <View>
        <View>
          <ThemedText style={styles.bigTitle}>Let’s get you started</ThemedText>
          <ThemedText2 style={styles.smallTitle}>
            Input your email address
          </ThemedText2>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <ThemedInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.verifyCont} onPress={handleSendOTP}>
        <Text style={styles.verifyText}>Send OTP</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default CreateNewEmail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },

  bigTitle: {
    fontFamily: "As700",
    fontSize: 25,
    marginVertical: 10,
  },

  smallTitle: {
    fontFamily: "As600",
    fontSize: 13,
  },

  inputContainer: {
    marginVertical: 50,
  },

  label: {
    fontFamily: "As350",
    fontSize: 10,
    color: "#898989",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  input: {
    fontFamily: "As450",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  verifyCont: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
    marginVertical: 30,
  },

  verifyText: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
