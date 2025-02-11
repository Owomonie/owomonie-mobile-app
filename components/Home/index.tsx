import { StyleSheet } from "react-native";
import { useState } from "react";

import HomeHeader from "./header";
import HomeAcccountTitle from "./acccountTitle";
import HomeIndividualAccounts from "./individualAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Bank } from "@/utils/types";
import HomeAddNewAccount from "./addNewAccount";
import HomeAllAccounts from "./allAccount";
import { ThemedSafeAreaView } from "../Themes/view";

const HomePage = () => {
  const [activeTitle, setActiveTitle] = useState("all");
  const banks = useSelector(
    (state: RootState) => state.banks.bankData?.banks as Bank[]
  );

  return (
    <ThemedSafeAreaView style={styles.page}>
      <HomeHeader />
      {banks.length > 0 ? (
        <>
          <HomeAcccountTitle
            activeTitle={activeTitle}
            setActiveTitle={setActiveTitle}
          />
          {activeTitle === "all" && <HomeAllAccounts />}
          {activeTitle === "individual" && <HomeIndividualAccounts />}
        </>
      ) : (
        <HomeAddNewAccount />
      )}
    </ThemedSafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
