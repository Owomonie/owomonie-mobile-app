import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { format, isToday, isYesterday, parseISO } from "date-fns";

import { RootState, useAppDispatch } from "@/redux/store";
import { Transaction } from "@/utils/types";
import { brandColor } from "@/constants/Colors";
import { ThemedView2 } from "./../Themes/view";
import { ThemedText } from "../Themes/text";
import { useState, useCallback, useLayoutEffect } from "react";
import { getTransactions } from "@/redux/slice/bank";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import { Skeleton } from "moti/skeleton";

const formatDate = (date: Date): string => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM dd, yyyy");
};

const groupTransactionsByDate = (
  transactions: Transaction[]
): { date: string; transactions: Transaction[]; actualDate: Date }[] => {
  const grouped = transactions.reduce((acc, transaction) => {
    const date = parseISO(transaction.date);
    const formattedDate = formatDate(date);

    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        date: formattedDate,
        transactions: [],
        actualDate: date,
      };
    }

    acc[formattedDate].transactions.push(transaction);
    return acc;
  }, {} as { [key: string]: { date: string; transactions: Transaction[]; actualDate: Date } });

  const sortedGroupedTransactions = Object.values(grouped).sort((a, b) => {
    return b.actualDate.getTime() - a.actualDate.getTime();
  });

  return sortedGroupedTransactions;
};

const RenderTransactions = ({
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
};

const HomeTransactions = () => {
  const [skeletalLoading, setSkeletalLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

  const dispatch = useAppDispatch();

  const loading = useSelector((state: RootState) => state.banks.loading);

  const transactions = useSelector(
    (state: RootState) => state.banks.transactionData as Transaction[]
  );

  useLayoutEffect(() => {
    const timer = setTimeout(() => setSkeletalLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const groupedTransactions = groupTransactionsByDate(transactions);

  // const recentTransactions = groupedTransactions?.slice(0,5);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const token = await AsyncStorage.getItem("token");
    if (token) {
      await dispatch(getTransactions({ token }));
    }

    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.txnHeader}>
        <ThemedText style={styles.txnHeaderText1}>Transactions</ThemedText>
        {/* <TouchableOpacity>
          <Text style={styles.txnHeaderText2}>See all</Text>
        </TouchableOpacity> */}
      </View>
      <FlashList
        data={groupedTransactions}
        keyExtractor={(item, index) => item.date + index.toString()}
        renderItem={({ item }) => (
          <>
            <ThemedView2 style={styles.dateCont}>
              <Skeleton
                show={loading || skeletalLoading}
                radius={"square"}
                colorMode={colorMode}
              >
                <ThemedText style={styles.dateTitle}>{item.date}</ThemedText>
              </Skeleton>
            </ThemedView2>
            <FlashList
              data={item.transactions}
              keyExtractor={(transaction) => transaction.id}
              renderItem={({ item: transaction }) =>
                RenderTransactions({
                  transaction,
                  loading: loading || skeletalLoading,
                  colorMode,
                })
              }
              estimatedItemSize={200}
            />
          </>
        )}
        estimatedItemSize={200}
        ListEmptyComponent={
          <ThemedText style={styles.noTrans}>
            No Transaction Availiable
          </ThemedText>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeTransactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  dateCont: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  dateTitle: {
    fontFamily: "As450",
    fontSize: 10,
    minHeight: 12,
    textTransform: "uppercase",
  },

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

  noTrans: {
    textAlign: "center",
    fontFamily: "As450",
    fontSize: 20,
    paddingVertical: 100,
  },
});
