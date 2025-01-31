import { StyleSheet } from "react-native";
import { useState } from "react";

import { ThemedView } from "../Themes/view";
import HomeHeader from "./header";
import HomeBalanceCard from "./balanceCard";
import HomeAcccountTitle from "./acccountTitle";

const HomePage = () => {
  const [activeTitle, setActiveTitle] = useState("all");

  return (
    <ThemedView style={styles.page}>
      <HomeHeader />
      <HomeAcccountTitle
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />
      <HomeBalanceCard activeTitle={activeTitle} />
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
  },
});
