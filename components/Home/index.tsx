import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../Themes/view";
import { ThemedText } from "../Themes/text";

const HomePage = () => {
  return (
    <ThemedView style={styles.page}>
      <ThemedText>HomePage</ThemedText>
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
