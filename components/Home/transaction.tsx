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
import { parseISO } from "date-fns";

import { RootState, useAppDispatch } from "@/redux/store";
import { Transaction } from "@/utils/types";
import { brandColor } from "@/constants/Colors";
import { ThemedView2 } from "./../Themes/view";
import { ThemedText } from "../Themes/text";
import { useState, useCallback, useMemo } from "react";
import { getTransactions } from "@/redux/slice/bank";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import { Skeleton } from "moti/skeleton";
import { AntDesign } from "@expo/vector-icons";
import { formatDate } from "@/utils/formatTime";

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

  const loading = useSelector((state: RootState) => state.banks.loading);

  const transactions = useSelector(
    (state: RootState) =>
      state.banks.transactionData.transactions as Transaction[]
  );

  const totalPages = parseInt(
    useSelector((state: RootState) => state.banks.transactionData.totalPages)
  );

  const groupedTransactions = useMemo(
    () => groupTransactionsByDate(transactions),
    [transactions]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const token = await AsyncStorage.getItem("token");
    if (token) {
      await dispatch(getTransactions({ token, page: currentPage }));
    }

    setRefreshing(false);
  }, [currentPage, dispatch]);

  const loadPrevTransactions = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token && currentPage >= 1) {
      await dispatch(getTransactions({ token, page: currentPage - 1 }));
      setCurrentPage(currentPage - 1);
    }
  };

  const loadNextTransactions = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token && currentPage <= totalPages) {
      await dispatch(getTransactions({ token, page: currentPage + 1 }));
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.txnHeader}>
        <ThemedText style={styles.txnHeaderText1}>Transactions</ThemedText>
        {transactions.length > 0 && (
          <View style={styles.paginationCont}>
            <TouchableOpacity
              disabled={currentPage <= 1}
              onPress={loadPrevTransactions}
            >
              <AntDesign
                name="caretleft"
                size={20}
                color={currentPage <= 1 ? "grey" : brandColor}
              />
            </TouchableOpacity>
            <ThemedText style={styles.pageNo}>{currentPage}</ThemedText>
            <TouchableOpacity
              disabled={currentPage >= totalPages}
              onPress={loadNextTransactions}
            >
              <AntDesign
                name="caretright"
                size={20}
                color={currentPage >= totalPages ? "grey" : brandColor}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlashList
        data={groupedTransactions}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View>
            <ThemedView2 style={styles.dateCont}>
              <Skeleton
                show={loading || skeletalLoading}
                radius={"square"}
                colorMode={colorMode}
              >
                <ThemedText style={styles.dateTitle}>{item.date}</ThemedText>
              </Skeleton>
            </ThemedView2>
            {item.transactions.map((transaction) => (
              <RenderTransactions
                key={transaction.id}
                colorMode={colorMode}
                transaction={transaction}
                loading={loading || skeletalLoading}
              />
            ))}
          </View>
        )}
        estimatedItemSize={100}
        ListEmptyComponent={
          <ThemedText style={styles.noTrans}>
            No Transaction Available
          </ThemedText>
        }
        showsVerticalScrollIndicator={false}
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

  paginationCont: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginRight: 20,
  },
  pageNo: {
    fontSize: 18,
  },
});
