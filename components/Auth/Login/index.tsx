import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/Themes/view";
import { ThemedText, ThemedText2, ThemedText3 } from "@/components/Themes/text";
import { brandColor } from "@/constants/Colors";
import { ThemedInput } from "@/components/Themes/textInput";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slice/login";

const Login = ({ regEmail }: { regEmail?: string }) => {
  const [email, setEmail] = useState(
    !regEmail || regEmail === "(auth)" ? "" : regEmail
  );

  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const dispatch = useAppDispatch();

  const toggleSecureEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: "info",
        text1: "Input All fields",
        visibilityTime: 5000,
      });
    } else {
      dispatch(
        loginUser({
          email,
          password,
        })
      );
    }
  };

  return (
    <ThemedView style={styles.page}>
      <View>
        <View>
          <ThemedText style={styles.title}>Welcome back</ThemedText>
          <ThemedText2 style={styles.subTitle}>
            Enter your details to login
          </ThemedText2>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ gap: 10 }}>
            <ThemedText3 style={styles.label}>Email Address</ThemedText3>
            <ThemedInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ gap: 10, marginTop: 30 }}>
            <ThemedText3 style={styles.label}>Password</ThemedText3>
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
              <TouchableOpacity
                // @ts-ignore
                onPress={() => router.push("(auth)/(forget)/send-token")}
              >
                <ThemedText style={styles.forget}>Forgot password ?</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => router.push("(auth)/(register)/new-email")}
        >
          <Text style={styles.create}>Create new account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtnCont} onPress={handleLogin}>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
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

  loginBtnCont: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
    marginVertical: 30,
  },

  loginBtn: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },

  label: {
    fontFamily: "As350",
    fontSize: 10,
    textTransform: "uppercase",
  },

  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "As600",
    fontSize: 13,
    borderRadius: 5,
  },

  forget: {
    textAlign: "right",
    marginVertical: 20,
    fontFamily: "As450",
    fontSize: 11,
    textDecorationLine: "underline",
    paddingBottom: 5,
  },

  create: {
    color: brandColor,
    fontFamily: "As550",
    fontSize: 13,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
