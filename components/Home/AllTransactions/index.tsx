import { useTheme } from "@/context/ThemeContext";
import { getTransactions } from "@/redux/slice/bank";
import { RootState, useAppDispatch } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { Transaction, TransactionData } from "@/utils/types";
import { ThemedView, ThemedView2 } from "@/components/Themes/view";
import { Skeleton } from "moti/skeleton";
import { ThemedText } from "@/components/Themes/text";
import { RenderTransactions } from "../RenderTransactions";
import { formatDate } from "@/utils/formatTime";

const AllTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { isDarkMode } = useTheme();
  const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";

  const dispatch = useAppDispatch();

  const loadingTransactions = useSelector(
    (state: RootState) => state.banks.transactionLoading
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await dispatch(getTransactions({ token, page: 1 }));
    }
    setRefreshing(false);
  }, [dispatch]);

  const totalPages = parseInt(
    useSelector((state: RootState) => state.banks.transactionData.totalPages)
  );

  const loadNextTransactions = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    if (token && currentPage < totalPages) {
      console.log(currentPage);
      await dispatch(getTransactions({ token, page: currentPage + 1 }));
      setCurrentPage(currentPage + 1);
    }
  }, [dispatch, currentPage, totalPages]);

  const transactions = useSelector(
    (state: RootState) =>
      state.banks.transactionData.transactionsData as TransactionData[]
  );

  const sectionedData = transactions.map((group) => ({
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

  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: 50,
      offset: 50 * index,
      index,
    }),
    []
  );

  return (
    <ThemedView style={{ flex: 1 }}>
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
        getItemLayout={getItemLayout}
        ListEmptyComponent={
          <ThemedText style={styles.noTrans}>
            No Transaction Available
          </ThemedText>
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadNextTransactions}
        // onEndReachedThreshold={0.1}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        removeClippedSubviews={true}
      />
      {loadingTransactions && <ActivityIndicator size="large" />}
    </ThemedView>
  );
};

export default AllTransactions;

const styles = StyleSheet.create({
  noTrans: {
    textAlign: "center",
    fontFamily: "As450",
    fontSize: 20,
    paddingVertical: 100,
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
});
