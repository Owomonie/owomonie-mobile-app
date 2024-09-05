import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

const Spinner = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  const visible = true;

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      setIsLoading(false);
      rotation.setValue(0);
    }
  }, [visible]);

  if (!isLoading) return null;

  const rotate = rotation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0deg", "360deg", "0deg"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../../assets/images/logo.png")}
          style={[styles.logo, { transform: [{ rotate }] }]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
  },
});

export default Spinner;
