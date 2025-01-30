import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../Themes/view";
import HomeHeader from "./header";
import HomeBalanceCard from "./balanceCard";

const HomePage = () => {
  return (
    <ThemedView style={styles.page}>
      <HomeHeader />
      <HomeBalanceCard />
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
  },
});
