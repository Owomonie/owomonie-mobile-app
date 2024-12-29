import Toast from "react-native-toast-message";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import React, { useState, useCallback } from "react";

import { ThemedText, ThemedText2, ThemedText3 } from "@/components/Themes/text";
import OTPInput from "./otp";
import { brandColor } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import { formatTime } from "@/utils/formatTime";
import { ThemedView } from "@/components/Themes/view";
import { useAppDispatch } from "@/redux/store";
import { newUserVerify, newUserVerifyOTP } from "@/redux/slice/create-account";
import {
  forgetUserVerify,
  forgetVerifyOTP,
} from "@/redux/slice/forgot-passord";
import { usePushNotification } from "@/providers/NotificationProvider";

const Verification = ({
  email,
  endPoint,
}: {
  email: string;
  endPoint: string;
}) => {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [countdown, setCountdown] = useState(120);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const dispatch = useAppDispatch();
  const { pushUnauthToken } = usePushNotification();

  useFocusEffect(
    useCallback(() => {
      if (countdown <= 0) {
        setIsResendEnabled(true);
        return;
      }

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }, [countdown])
  );

  const handleResendCode = () => {
    if (endPoint === "create") {
      dispatch(
        newUserVerify({
          email,
          resend: true,
        })
      );
    } else if (endPoint === "forget") {
      dispatch(
        forgetUserVerify({
          email,
          resend: true,
        })
      );
    }
    setCountdown(120);
    setIsResendEnabled(false);
  };

  const handleVerifyEmail = () => {
    if (!otp.join("")) {
      Toast.show({
        type: "info",
        text1: "Incomplete OTP Input",
        visibilityTime: 5000,
      });
    } else if (endPoint === "create") {
      dispatch(
        newUserVerifyOTP({
          email,
          OTP: otp.join(""),
          pushToken: pushUnauthToken,
        })
      );
    } else if (endPoint === "forget") {
      dispatch(
        forgetVerifyOTP({
          email,
          OTP: otp.join(""),
        })
      );
    }
  };

  return (
    <ThemedView style={styles.page}>
      <View>
        <ThemedText style={styles.title}>
          {endPoint === "create" ? "Email " : "Account "}
          Verification
        </ThemedText>
        <ThemedText2 style={styles.subTitle}>
          We sent an email to with your activation code to
        </ThemedText2>
        <Text style={styles.email}>{email}</Text>
        <OTPInput otp={otp} setOtp={setOtp} />
        <View style={styles.didnt}>
          <ThemedText3 style={styles.didntMsg}>
            Didn’t receive the code?
          </ThemedText3>
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={!isResendEnabled}
          >
            <Text style={[styles.resend]}>
              {isResendEnabled ? "Resend code" : `${formatTime(countdown)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.verifyCont} onPress={handleVerifyEmail}>
        <Text style={styles.verifyText}>Verify Email</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
    justifyContent: "space-between",
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

  didnt: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
    justifyContent: "center",
  },

  didntMsg: {
    fontFamily: "As350",
    fontSize: 13,
  },

  resend: {
    fontFamily: "As550",
    fontSize: 13,
    color: brandColor,
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
