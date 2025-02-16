import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../Themes/text";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Transaction } from "@/utils/types";

const HomeTransactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.banks.transactionData as Transaction[]
  );

  console.log(transactions);
  return <ThemedText>HomeTransactions</ThemedText>;
};

export default HomeTransactions;

const styles = StyleSheet.create({});
