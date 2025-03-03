import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useLayoutEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

import HomeHeader from "./Header";
import HomeAcccountTitle from "./AcccountTitle";
import HomeIndividualAccounts from "./IndividualAccount";
import HomeAddNewAccount from "./AddNewAccount";
import HomeAllAccounts from "./AllAccount";
import Plaid from "./Plaid";
import HomeTransactions from "./transaction";

import { RootState, useAppDispatch } from "@/redux/store";
import { Bank } from "@/utils/types";
import { ThemedSafeAreaView } from "../Themes/view";
import { brandColor } from "@/constants/Colors";
import { getBankLinkToken } from "@/redux/slice/bank";
import { getUserDetails } from "@/redux/slice/get-user-details";

const HomePage = () => {
  const [activeTitle, setActiveTitle] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [skeletalLoading, setSkeletalLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setSkeletalLoading(false), 1000);
    // return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(getUserDetails({ token }));
      }
    };

    fetchData();
  }, [dispatch]);

  const banks = useSelector(
    (state: RootState) => state.banks.bankData?.banks as Bank[]
  );
  const linkToken = useSelector((state: RootState) => state.banks.linkToken);

  const handleAddBank = async () => {
    await dispatch(getBankLinkToken());
    setModalVisible(true);
  };

  return (
    <ThemedSafeAreaView style={styles.page}>
      <HomeHeader skeletalLoading={skeletalLoading} />
      {banks.length > 0 ? (
        <>
          <HomeAcccountTitle
            activeTitle={activeTitle}
            setActiveTitle={setActiveTitle}
          />
          {activeTitle === "all" && (
            <HomeAllAccounts skeletalLoading={skeletalLoading} />
          )}
          {activeTitle === "individual" && (
            <HomeIndividualAccounts skeletalLoading={skeletalLoading} />
          )}

          <HomeTransactions skeletalLoading={skeletalLoading} />

          <TouchableOpacity onPress={handleAddBank} style={styles.addBg}>
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <HomeAddNewAccount setModalVisible={setModalVisible} />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {linkToken && <Plaid setModalVisible={setModalVisible} />}
      </Modal>
    </ThemedSafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 10,
  },

  addBg: {
    padding: 15,
    backgroundColor: brandColor,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
