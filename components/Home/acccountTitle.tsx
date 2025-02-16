import { brandColor } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemedView } from "../Themes/view";

type HomeAccountTitleProps = {
  activeTitle: string;
  setActiveTitle: (title: "all" | "individual") => void;
};

const HomeAcccountTitle = ({
  activeTitle,
  setActiveTitle,
}: HomeAccountTitleProps) => {
  return (
    <ThemedView style={styles.container}>
      {/* All Accounts Button */}
      <TouchableOpacity onPress={() => setActiveTitle("all")}>
        <Text
          style={[
            styles.text,
            { color: activeTitle === "all" ? brandColor : "#898989" },
          ]}
        >
          All Accounts
        </Text>
      </TouchableOpacity>

      <Entypo name="dot-single" size={20} color="#898989" />

      {/* Individual Accounts Button */}
      <TouchableOpacity onPress={() => setActiveTitle("individual")}>
        <Text
          style={[
            styles.text,
            { color: activeTitle === "individual" ? brandColor : "#898989" },
          ]}
        >
          Individual Accounts
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default HomeAcccountTitle;

const styles = StyleSheet.create({
  container: {
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  text: {
    fontFamily: "As450",
    fontSize: 14,
  },
});
