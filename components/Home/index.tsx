import { StyleSheet } from "react-native";
import { useState } from "react";

import { ThemedView } from "../Themes/view";
import HomeHeader from "./header";
import HomeBalanceCard from "./balanceCard";
import HomeAcccountTitle from "./acccountTitle";
import HomeIndividualAccounts from "./individualAccount";

const HomePage = () => {
  const [activeTitle, setActiveTitle] = useState("all");

  return (
    <ThemedView style={styles.page}>
      <HomeHeader />
      <HomeAcccountTitle
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />
      {activeTitle === "all" && <HomeBalanceCard activeTitle={activeTitle} />}
      {activeTitle === "individual" && <HomeIndividualAccounts />}
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
  },
});
