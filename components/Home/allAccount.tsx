import { RootState } from "@/redux/store";
import { BankDetails } from "@/utils/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const HomeAllAccounts = () => {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => setShowBalance(!showBalance);

  const banks = useSelector(
    (state: RootState) => state.banks.allBanks as BankDetails[]
  );

  const firstEightBanks = banks?.slice(0, 8);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Balance</Text>
      <View style={styles.logoContainer}>
        {firstEightBanks?.map((bank) => (
          <Image
            key={bank._id}
            source={{ uri: bank.bankLogo }}
            style={styles.logos}
          />
        ))}
        {banks?.length > 8 && (
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={20}
            color="white"
          />
        )}
      </View>
      {showBalance ? (
        <Text style={styles.balance}>₦134,623,896.00</Text>
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
    flexWrap: "wrap",
    gap: 7,
    marginTop: 15,
    marginBottom: 20,
  },

  logos: {
    height: 24,
    width: 24,
    borderRadius: 4,
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
    bottom: -10,
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
