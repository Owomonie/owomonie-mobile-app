import { RootState } from "@/redux/store";
import { Bank } from "@/utils/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import HomeBalanceCard from "./balanceCard";

const HomeAllAccounts = () => {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => setShowBalance(!showBalance);

  const banks = useSelector(
    (state: RootState) => state.banks.bankData?.banks as Bank[]
  );

  const totalBalance = useSelector(
    (state: RootState) => state.banks.bankData?.balance
  );

  const sortedBanks = [...banks]?.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <HomeBalanceCard activeTitle="all">
      <View style={styles.container}>
        <Text style={styles.title}>Total Balance</Text>
        <View style={styles.logoContainer}>
          {sortedBanks.length > 0 &&
            sortedBanks?.map((bank) => (
              <Image
                key={bank.id}
                source={{ uri: bank.logo }}
                style={[
                  styles.logos,
                  {
                    backgroundColor: bank?.logo?.includes("revolut")
                      ? "white"
                      : undefined,
                  },
                ]}
              />
            ))}
        </View>
        {showBalance ? (
          <Text style={styles.balance}>£{totalBalance}</Text>
        ) : (
          <View style={styles.balanceHiddenContainer}>
            <Text style={styles.balance}>£</Text>
            <Text style={[styles.balance, { marginTop: 7 }]}>******</Text>
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
    </HomeBalanceCard>
  );
};

export default HomeAllAccounts;

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
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 9,
    marginBottom: 15,
  },

  logos: {
    height: 30,
    width: 30,
    borderRadius: 4,
    objectFit: "contain",
    marginBottom: 5,
  },

  balance: {
    color: "white",
    fontSize: 30,
    fontFamily: "As550",
  },

  showIcon: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },

  balanceHiddenContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
