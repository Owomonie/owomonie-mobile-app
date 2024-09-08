import React from "react";
import { View, StyleSheet } from "react-native";
import { brandColor } from "@/constants/Colors";

const ProgressBar = ({ progress }: { progress: number }) => {
  const progressSegments = Math.min(Math.max(progress, 0), 5);

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                backgroundColor:
                  index < progressSegments ? brandColor : "#EAEAEA",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    paddingRight: 10,
  },
  progressBar: {
    flexDirection: "row",
    width: "100%",
    height: 4,
    justifyContent: "space-between",
    gap: 5,
  },
  segment: {
    height: "100%",
    width: "20%", // Each segment will take 20% of the width
  },
});

export default ProgressBar;
