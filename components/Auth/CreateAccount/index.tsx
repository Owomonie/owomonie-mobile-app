import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedText, ThemedText2 } from "@/components/Themes/text";
import { ThemedInput } from "@/components/Themes/textInput";
import { brandColor } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { ThemedScrollView } from "@/components/Themes/scrollview";
import { useAppDispatch } from "@/redux/store";
import { registerNewUser } from "@/redux/slice/create-account";
import { isPasswordValid } from "@/utils/passwordValidate";

const CreateAccount = ({ email }: { email: string }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
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
        registerNewUser({
          email,
          userName,
          lastName,
          firstName,
          password,
        })
      );
      setSecureTextEntry(false);
      setSecureConfirmTextEntry(false);
      setPassword("");
      setConfirmPassword("");
      setUserName("");
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <ThemedScrollView style={styles.page}>
      <View style={styles.pageContent}>
        <View>
          <ThemedText style={styles.bigTitle}>Profile Information</ThemedText>
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
          <View style={styles.passwordRequirement}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.passwordInfoText}>
              At least 4 characters long
            </Text>
          </View>
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

        <View style={styles.passwordInfoBox}>
          <ThemedText2 style={styles.passwordInfoTitle}>
            Password Requirements:
          </ThemedText2>

          <View style={styles.passwordRequirement}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.passwordInfoText}>
              At least 8 characters long
            </Text>
          </View>

          <View style={styles.passwordRequirement}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.passwordInfoText}>
              At least one uppercase letter (A-Z)
            </Text>
          </View>

          <View style={styles.passwordRequirement}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.passwordInfoText}>
              At least one number (0-9)
            </Text>
          </View>

          <View style={styles.passwordRequirement}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.passwordInfoText}>
              At least one special character
            </Text>
          </View>

          <View style={styles.passwordRequirement}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.passwordInfoText}>
              Can include letters, numbers, special characters, and underscores
              (_)
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextCont} onPress={handleNextBtn}>
        <Text style={styles.nextText}>Register</Text>
      </TouchableOpacity>
    </ThemedScrollView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  pageContent: {
    gap: 20,
    marginHorizontal: 20,
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
    borderRadius: 5,
  },

  nextCont: {
    paddingVertical: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
    marginBottom: 20,
    marginHorizontal: 20,
  },

  nextText: {
    textAlign: "center",
    fontFamily: "As700",
    color: "#FFFFFF",
    fontSize: 16,
    minHeight: 20,
  },

  passwordInfoBox: {
    marginBottom: 30,
  },

  passwordInfoTitle: {
    fontSize: 14,
    fontFamily: "As700",
    marginBottom: 5,
  },

  passwordRequirement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 1,
  },

  passwordInfoText: {
    fontSize: 10,
    fontFamily: "As500",
    color: "grey",
  },
});
