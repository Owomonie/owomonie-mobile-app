import { StyleSheet } from "react-native";
import { useState } from "react";

import { ThemedView } from "../Themes/view";
import HomeHeader from "./header";
import HomeBalanceCard from "./balanceCard";
import HomeAcccountTitle from "./acccountTitle";
import HomeIndividualAccounts from "./individualAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BankDetails } from "@/utils/types";
import HomeAddNewAccount from "./addNewAccount";

const HomePage = () => {
  const [activeTitle, setActiveTitle] = useState("all");
  const banks = useSelector(
    (state: RootState) => state.banks.allBanks as BankDetails[]
  );

  return (
    <ThemedView style={styles.page}>
      <HomeHeader />
      {banks.length > 0 ? (
        <>
          <HomeAcccountTitle
            activeTitle={activeTitle}
            setActiveTitle={setActiveTitle}
          />
          {activeTitle === "all" && (
            <HomeBalanceCard activeTitle={activeTitle} />
          )}
          {activeTitle === "individual" && <HomeIndividualAccounts />}
        </>
      ) : (
        <HomeAddNewAccount />
      )}
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
