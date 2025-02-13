import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { RootState } from "@/redux/store";
import HomeBalanceCard from "./balanceCard";
import { Account } from "@/utils/types";

const RenderIndividualAccounts = ({ item }: { item: Account }) => {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => setShowBalance(!showBalance);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: item.bankLogo }}
          style={[
            styles.logos,
            {
              backgroundColor:
                item?.bankName === "Revolut (UK)" ? "white" : undefined,
            },
          ]}
        />
        <Text style={[styles.title, { width: "50%" }]}>{item.bankName}</Text>
      </View>

      <View style={styles.accDetails}>
        <View>
          {showBalance ? (
            <Text style={styles.balance}>£{item.balance}</Text>
          ) : (
            <View style={styles.balanceHiddenContainer}>
              <Text style={styles.balance}>£</Text>

              <Text style={[styles.balance, { marginTop: 7 }]}>****</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={styles.accNo}>******{item.accountNo}</Text>
        </View>
      </View>

      {showBalance ? (
        <TouchableOpacity style={styles.showIcon} onPress={handleShowBalance}>
          <Ionicons name="eye-off-outline" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.showIcon} onPress={handleShowBalance}>
          <Ionicons name="eye-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const HomeIndividualAccounts = () => {
  const accounts = useSelector(
    (state: RootState) => state.banks.accountData as Account[]
  );

  const sortedAccounts = [...accounts]?.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  if (sortedAccounts.length > 0) {
    return (
      <FlashList
        data={sortedAccounts}
        renderItem={({ item }) => (
          <HomeBalanceCard activeTitle="individual">
            <RenderIndividualAccounts item={item} />
          </HomeBalanceCard>
        )}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }
};

export default HomeIndividualAccounts;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontFamily: "As350",
    color: "#FFFFFF",
  },

  logoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  logos: {
    height: 50,
    width: 50,
    borderRadius: 10,
    objectFit: "contain",
  },

  accDetails: {
    marginTop: 20,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },

  balance: {
    color: "white",
    fontSize: 24,
    fontFamily: "As550",
  },

  accNo: {
    color: "white",
    fontSize: 16,
    fontFamily: "As550",
  },

  showIcon: {
    position: "absolute",
    bottom: -18,
    right: 20,
  },

  balanceHiddenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
