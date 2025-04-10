import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText, ThemedText2 } from "@/components/Themes/text";
import { ThemedInput } from "@/components/Themes/textInput";
import { brandColor } from "@/constants/Colors";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { ThemedSafeAreaView } from "@/components/Themes/view";
import { useAppDispatch } from "@/redux/store";
import { resetPassword } from "@/redux/slice/forgot-passord";
import { isPasswordValid } from "@/utils/passwordValidate";

const Reset = ({ email }: { email: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const dispatch = useAppDispatch();

  const toggleSecureEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };

  const toggleSecureConfirmEntry = () => {
    setSecureConfirmTextEntry((prev) => !prev);
  };

  const handleNextBtn = async () => {
    if (!password || !confirmPassword) {
      Toast.show({
        type: "info",
        text1: "Input All fields",
        visibilityTime: 5000,
      });
    } else if (!isPasswordValid(password)) {
      Toast.show({
        type: "info",
        text1: "Invalid Password",
        visibilityTime: 5000,
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: "info",
        text1: "Password Must Match",
        visibilityTime: 5000,
      });
    } else {
      await dispatch(
        resetPassword({
          email,
          password,
        })
      );
      setSecureTextEntry(false);
      setSecureConfirmTextEntry(false);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <ThemedSafeAreaView style={styles.page}>
      <View style={styles.pageContent}>
        <View>
          <ThemedText style={styles.bigTitle}>Reset Password</ThemedText>
          <ThemedText2 style={styles.smallTitle}>
            Please enter your new password
          </ThemedText2>
        </View>

        <View style={{ gap: 10, marginVertical: 10 }}>
          <ThemedText2 style={styles.label}>Email Addresss</ThemedText2>
          <ThemedText style={styles.input}>{email}</ThemedText>
        </View>

        <View style={{ gap: 10 }}>
          <ThemedText2 style={styles.label}>Password</ThemedText2>
          <View>
            <ThemedInput
              style={[
                styles.input,
                {
                  paddingRight: 50,
                },
              ]}
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={toggleSecureEntry}
              style={{
                position: "absolute",
                right: 8,
                top: 6,
              }}
            >
              <Ionicons
                name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <ThemedText2 style={styles.label}>Confirm Password</ThemedText2>
          <View>
            <ThemedInput
              style={[
                styles.input,
                {
                  paddingRight: 50,
                },
              ]}
              secureTextEntry={secureConfirmTextEntry}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={toggleSecureConfirmEntry}
              style={{
                position: "absolute",
                right: 8,
                top: 6,
              }}
            >
              <Ionicons
                name={
                  secureConfirmTextEntry ? "eye-off-outline" : "eye-outline"
                }
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => router.push(`(auth)/(login)/${email}`)}
          style={styles.loginCont}
        >
          <ThemedText style={styles.login}>Remeber Password?</ThemedText>
          <Text
            style={[
              styles.login,
              {
                color: brandColor,
                marginBottom: 20,
              },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextCont} onPress={handleNextBtn}>
        <Text style={styles.nextText}>Reset Password</Text>
      </TouchableOpacity>
    </ThemedSafeAreaView>
  );
};

export default Reset;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },

  pageContent: {
    gap: 20,
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

  label: {
    fontFamily: "As500",
    fontSize: 11,
    textTransform: "uppercase",
  },

  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "As600",
    fontSize: 13,
    borderRadius: 5,
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

  loginCont: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    paddingRight: 10,
  },

  login: {
    fontFamily: "As450",
    fontSize: 11,
  },
});
