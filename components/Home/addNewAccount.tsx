import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { brandColor } from "@/constants/Colors";
import { ThemedText } from "../Themes/text";
import { useAppDispatch } from "@/redux/store";
import { getBankLinkToken } from "@/redux/slice/bank";

type AddAccountProps = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const HomeAddNewAccount = ({ setModalVisible }: AddAccountProps) => {
  const dispatch = useAppDispatch();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Function to handle the fade animation
    const startBlinking = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startBlinking();

    return () => {
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim]);

  const handleAddBank = async () => {
    await dispatch(getBankLinkToken());
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAddBank}>
        <Animated.View style={[styles.bg2, { opacity: fadeAnim }]}>
          <View style={styles.bg1}>
            <AntDesign name="plus" size={40} color="white" />
          </View>
        </Animated.View>
      </TouchableOpacity>
      <ThemedText style={styles.text}>Tap to link new account</ThemedText>
    </View>
  );
};

export default HomeAddNewAccount;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    height: "80%",
    borderColor: brandColor,
    justifyContent: "center",
    marginVertical: 40,
    marginHorizontal: 20,
    alignItems: "center",
    borderStyle: "dashed",
    borderRadius: 6,
    gap: 20,
  },

  bg1: {
    padding: 10,
    backgroundColor: brandColor,
    borderRadius: 50,
  },

  bg2: {
    padding: 15,
    backgroundColor: "#DEEEFD",
    borderRadius: 100,
  },

  text: {
    fontFamily: "As450",
    fontSize: 15,
    textAlign: "center",
  },
});
