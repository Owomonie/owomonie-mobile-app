import { brandColor } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { ThemedText } from "../Themes/text";

const HomeAddNewAccount = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Function to handle the fade animation
    const startBlinking = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startBlinking();

    return () => {
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bg2, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.bg1}>
          <AntDesign name="plus" size={50} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <ThemedText style={styles.text}>Tap to link new account</ThemedText>
    </View>
  );
};

export default HomeAddNewAccount;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    height: "80%",
    borderColor: brandColor,
    justifyContent: "center",
    marginVertical: 40,
    alignItems: "center",
    borderStyle: "dashed",
    borderRadius: 6,
    gap: 20,
  },

  bg1: {
    padding: 20,
    backgroundColor: brandColor,
    borderRadius: 50,
  },

  bg2: {
    padding: 30,
    backgroundColor: "#DEEEFD",
    borderRadius: 100,
  },

  text: {
    fontFamily: "As450",
    fontSize: 15,
    textAlign: "center",
  },
});
