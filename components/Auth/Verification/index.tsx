import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText, ThemedText2 } from "@/components/Themes/text";
import OTPInput from "./otp";

const Verification = ({
  email,
  endPoint,
}: {
  email: string;
  endPoint: string;
}) => {
  return (
    <View style={styles.page}>
      <ThemedText style={styles.title}>Verification</ThemedText>
      <ThemedText2 style={styles.subTitle}>
        We sent an email to with your activation code to
      </ThemedText2>
      <Text style={styles.email}>{email}</Text>
      <OTPInput />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  title: {
    fontFamily: "As700",
    fontSize: 25,
    marginBottom: 10,
  },

  subTitle: {
    fontFamily: "As500",
    fontSize: 13,
  },

  email: {
    color: "#C07FF6",
    marginVertical: 5,
    fontFamily: "As600",
    fontSize: 13,
    marginBottom: 70,
  },
});
