import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { RootState, useAppDispatch } from "@/redux/store";
import { Transaction } from "@/utils/types";
import { ThemedView2 } from "../Themes/view";
import { ThemedText } from "../Themes/text";
import { useState, useCallback, useMemo, memo } from "react";
import { getTransactions } from "@/redux/slice/bank";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import { Skeleton } from "moti/skeleton";
import { formatDate } from "@/utils/formatTime";

const RenderTransactions = memo(
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

const HomeTransactions = ({
  skeletalLoading,
}: {
  skeletalLoading: boolean;
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { isDarkMode } = useTheme();
  const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

  const dispatch = useAppDispatch();

  const loadingTransactions = useSelector(
    (state: RootState) => state.banks.transactionLoading
  );

  const transactions = useSelector(
    (state: RootState) =>
      state.banks.transactionData.transactions as Transaction[]
  );

  const totalPages = parseInt(
    useSelector((state: RootState) => state.banks.transactionData.totalPages)
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await dispatch(getTransactions({ token, page: 1 }));
      setCurrentPage(1);
    }
    setRefreshing(false);
  }, [dispatch]);

  const loadNextTransactions = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    if (token && currentPage < totalPages) {
      await dispatch(getTransactions({ token, page: currentPage + 1 }));
      setCurrentPage(currentPage + 1);
    }
  }, [dispatch, currentPage, totalPages]);

  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach((transaction) => {
      if (!groups[transaction.date]) {
        groups[transaction.date] = [];
      }
      groups[transaction.date].push(transaction);
    });
    return groups;
  }, [transactions]);

  const renderItem = useCallback(
    ({ item }: { item: { date: string; transactions: Transaction[] } }) => (
      <>
        <ThemedView2 style={styles.dateCont}>
          <Skeleton
            show={loadingTransactions || skeletalLoading}
            radius={"square"}
            colorMode={colorMode}
          >
            <ThemedText style={styles.dateTitle}>
              {formatDate(item.date)}
            </ThemedText>
          </Skeleton>
        </ThemedView2>
        {item.transactions.map((transaction) => (
          <RenderTransactions
            key={transaction.id}
            colorMode={colorMode}
            transaction={transaction}
            loading={loadingTransactions || skeletalLoading}
          />
        ))}
      </>
    ),
    [colorMode, loadingTransactions, skeletalLoading]
  );

  const data = useMemo(() => {
    return Object.keys(groupedTransactions).map((date) => ({
      date,
      transactions: groupedTransactions[date],
    }));
  }, [groupedTransactions]);

  return (
    <View style={styles.container}>
      <View style={styles.txnHeader}>
        <ThemedText style={styles.txnHeaderText1}>Transactions</ThemedText>
      </View>

      <FlashList
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        ListEmptyComponent={
          <ThemedText style={styles.noTrans}>
            No Transaction Available
          </ThemedText>
        }
        showsVerticalScrollIndicator={false}
        estimatedItemSize={2000}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadNextTransactions}
        onEndReachedThreshold={0.8}
      />
      {loadingTransactions && <ActivityIndicator />}
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

  dateCont: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginVertical: 5,
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
