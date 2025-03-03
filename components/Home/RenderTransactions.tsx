import { Transaction } from "@/utils/types";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { ThemedView2 } from "../Themes/view";
import { ThemedText } from "../Themes/text";

export const RenderTransactions = memo(
  ({
    transaction,
    loading,
    colorMode,
  }: {
    transaction: Transaction;
    loading: boolean;
    colorMode: "light" | "dark";
  }) => {
    return (
      <View style={styles.transactionCont}>
        <View style={styles.descCont}>
          <Skeleton show={loading} radius={"round"} colorMode={colorMode}>
            <ThemedView2 style={styles.transImgCont}>
              <Image
                source={{ uri: transaction.categoryUri }}
                style={styles.transImg}
              />
            </ThemedView2>
          </Skeleton>
          <View style={styles.descTextCont}>
            <Skeleton show={loading} radius={"square"} colorMode={colorMode}>
              <ThemedText style={styles.categoryText}>
                {transaction.category}
              </ThemedText>
            </Skeleton>
            <Skeleton show={loading} radius={"square"} colorMode={colorMode}>
              <Text style={styles.bankText}>{transaction.bankName}</Text>
            </Skeleton>
          </View>
        </View>
        <Skeleton show={loading} radius={"square"} colorMode={colorMode}>
          <Text
            style={[
              styles.amount,
              {
                color: transaction.type === "Debit" ? "#C93232" : "#1FB03F",
              },
            ]}
          >
            {transaction.type === "Debit" ? "-" : "+"}£{transaction.amount}
          </Text>
        </Skeleton>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  transactionCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    alignItems: "center",
    marginVertical: 7,
  },

  descCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  transImgCont: {
    width: 45,
    height: 45,
    padding: 10,
    borderRadius: 30,
  },

  transImg: {
    width: "100%",
    height: "100%",
  },

  descTextCont: {
    gap: 3,
  },

  categoryText: {
    fontFamily: "As450",
    fontSize: 15,
  },

  bankText: {
    fontFamily: "As450",
    fontSize: 10,
    color: "#898989",
    minHeight: 15,
  },
  amount: {
    fontFamily: "As450",
    fontSize: 12,
  },
});
