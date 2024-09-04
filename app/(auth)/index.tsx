import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "expo-router";

const LoginScreen = () => {
  const handleBackPress = () => {
    Alert.alert("OwoMonie", "Are you sure you want to quit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
