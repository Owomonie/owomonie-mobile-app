import { useTheme } from "@/context/ThemeContext";
import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface OTPInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTPInput = ({ otp, setOtp }: OTPInputProps) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    const firstEmptyIndex = otp.indexOf("");
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex].focus();
    }
  }, [otp]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/\D/, ""); // Remove non-digit characters
    setOtp(newOtp);

    // Focus next input
    if (text && index < 5 - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    { nativeEvent }: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (nativeEvent.key === "Backspace" && otp[index] === "") {
      // Focus previous input if backspace is pressed
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? "#171717" : "#EDEDED",
              color: isDarkMode ? "#F6F5FF" : "#030C12",
            },
          ]}
          keyboardType="numeric"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "As600",
    padding: 10,
    borderRadius: 4,
  },
});

export default OTPInput;
