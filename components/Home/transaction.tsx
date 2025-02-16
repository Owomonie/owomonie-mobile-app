import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../Themes/text";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Transaction } from "@/utils/types";
import { brandColor } from "@/constants/Colors";
import { ThemedView } from "./../Themes/view";

const HomeTransactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.banks.transactionData as Transaction[]
  );

  return (
    <View style={styles.container}>
      <View style={styles.txnHeader}>
        <ThemedText style={styles.txnHeaderText1}>Transactions</ThemedText>
        <TouchableOpacity>
          <Text style={styles.txnHeaderText2}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "#898989" }}>
        <ThemedText>Today</ThemedText>
      </View>
    </View>
  );
};

export default HomeTransactions;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  txnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  txnHeaderText1: {
    fontFamily: "As550",
    fontSize: 18,
  },

  txnHeaderText2: {
    fontFamily: "As450",
    fontSize: 13,
    color: brandColor,
  },
});
