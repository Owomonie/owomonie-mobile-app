import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";
import { Skeleton } from "moti/skeleton";

import { ThemedView2 } from "../Themes/view";
import { ThemedText } from "../Themes/text";
import { RootState, useAppDispatch } from "@/redux/store";
import { Transaction, TransactionData } from "@/utils/types";
import { getTransactions } from "@/redux/slice/bank";
import { useTheme } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";

import { RenderTransactions } from "./RenderTransactions";
import { formatDate } from "@/utils/formatTime";

const HomeTransactions = ({
  skeletalLoading,
}: {
  skeletalLoading: boolean;
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { isDarkMode } = useTheme();
  const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

  const dispatch = useAppDispatch();

  const loadingTransactions = useSelector(
    (state: RootState) => state.banks.transactionLoading
  );

  const transactions = useSelector(
    (state: RootState) =>
      state.banks.transactionData.transactionsData as TransactionData[]
  );

  const recentTransactions = transactions.slice(0, 20);

  const sectionedData = recentTransactions.map((group) => ({
    title: formatDate(group.date),
    data: group.transactions,
  }));

  const renderTransaction = useCallback(
    ({ item }: { item: Transaction }) => {
      return (
        <RenderTransactions
          key={item.id}
          colorMode={colorMode}
          transaction={item}
          loading={false}
        />
      );
    },
    [colorMode, loadingTransactions]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await dispatch(getTransactions({ token, page: 1 }));
    }
    setRefreshing(false);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.txnHeader}>
        <ThemedText style={styles.txnHeaderText1}>
          Recent Transactions
        </ThemedText>
        <TouchableOpacity
          onPress={() =>
            // @ts-ignore
            router.push("/(user)/(home)/(all-transactions)")
          }
        >
          <Text style={styles.txnHeaderText2}>See all</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sectionedData}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderTransaction}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedView2 style={styles.dateCont}>
            <Skeleton show={false} radius={"square"} colorMode={colorMode}>
              <ThemedText style={styles.dateTitle}>{title}</ThemedText>
            </Skeleton>
          </ThemedView2>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.noTrans}>
            No Transaction Available
          </ThemedText>
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        initialNumToRender={20}
        maxToRenderPerBatch={20}
      />
      {loadingTransactions && <ActivityIndicator size="large" />}
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
    fontSize: 12,
    color: brandColor,
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
