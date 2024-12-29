import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../Themes/view";
import HomeHeader from "./header";

const HomePage = () => {
  return (
    <ThemedView style={styles.page}>
      <HomeHeader />
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
