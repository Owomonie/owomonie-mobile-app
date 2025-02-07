import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { RootState } from "@/redux/store";
import { BankDetails } from "@/utils/types";
import HomeBalanceCard from "./balanceCard";

const RenderIndividualAccounts = ({ item }: { item: BankDetails }) => {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => setShowBalance(!showBalance);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: item.bankLogo }} style={styles.logos} />
        <Text style={styles.title}>{item.bankName}</Text>
      </View>

      <Text style={styles.title}>Account Balance</Text>
      {showBalance ? (
        <Text style={styles.balance}>₦29,873,465.50</Text>
      ) : (
        <View style={styles.balanceHiddenContainer}>
          <Text style={styles.balance}>₦</Text>
          <View style={styles.starsContainer}>
            <Text style={styles.balance}>******</Text>
          </View>
        </View>
      )}
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
  const banks = useSelector(
    (state: RootState) => state.banks.allBanks as BankDetails[]
  );

  if (banks.length > 0) {
    return (
      <FlashList
        data={banks}
        renderItem={({ item }) => (
          <HomeBalanceCard activeTitle="individual">
            <RenderIndividualAccounts item={item} />
          </HomeBalanceCard>
        )}
        estimatedItemSize={200}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }
};

export default HomeIndividualAccounts;

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },

  title: {
    fontFamily: "As350",
    color: "#FFFFFF",
  },

  logoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  logos: {
    height: 50,
    width: 50,
    borderRadius: 10,
    padding: 4,
    backgroundColor: "white",
  },

  balance: {
    color: "white",
    fontSize: 30,
    fontFamily: "As550",
  },

  showIcon: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },

  balanceHiddenContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  starsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
