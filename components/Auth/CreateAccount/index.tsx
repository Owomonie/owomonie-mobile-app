import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/Themes/view";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText, ThemedText2 } from "@/components/Themes/text";
import { ThemedInput } from "@/components/Themes/textInput";
import { brandColor } from "@/constants/Colors";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };

  const handleNextBtn = () => {
    if (
      !userName ||
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword
    ) {
      Toast.show({
        type: "info",
        text1: "Input All fields",
        visibilityTime: 5000,
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: "info",
        text1: "Password Must Match",
        visibilityTime: 5000,
      });
    } else {
      //@ts-ignore
      router.push(`/(auth)/(create-verification)/${email}`);
    }
  };

  return (
    <ThemedView style={styles.page}>
      <View>
        <ThemedText style={styles.bigTitle}>Let’s get you started</ThemedText>
        <ThemedText2 style={styles.smallTitle}>
          Fill in your details below
        </ThemedText2>
      </View>

      <View style={styles.nameContainer}>
        <View style={{ flex: 1, gap: 10 }}>
          <ThemedText2 style={styles.label}>First Name</ThemedText2>
          <ThemedInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <ThemedText2 style={styles.label}>Last Name</ThemedText2>
          <ThemedInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <ThemedText2 style={styles.label}>Username</ThemedText2>
        <ThemedInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={{ gap: 10 }}>
        <ThemedText2 style={styles.label}>Email Addresss</ThemedText2>
        <ThemedInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
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
            secureTextEntry={secureTextEntry}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
      <TouchableOpacity style={styles.nextCont} onPress={handleNextBtn}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
    justifyContent: "flex-start",
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

  nameContainer: {
    flexDirection: "row",
    gap: 15,
  },

  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "As600",
    fontSize: 13,
  },

  nextCont: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
    marginVertical: 30,
  },

  nextText: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
