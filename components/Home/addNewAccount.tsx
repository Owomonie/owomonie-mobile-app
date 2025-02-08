import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PlaidLink from "react-native-plaid-link-sdk";

import { brandColor } from "@/constants/Colors";
import { ThemedText } from "../Themes/text";
import { RootState, useAppDispatch } from "@/redux/store";
import { getBankLinkToken } from "@/redux/slice/bank";
import { useSelector } from "react-redux";

const HomeAddNewAccount = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const linkToken = useSelector((state: RootState) => state.banks.linkToken);

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

  const onSuccess = async (publicToken: string, metadata: any) => {
    console.log("Plaid Link success", metadata);
    // Handle the success (e.g., exchange the public_token for an access token)
    setModalVisible(false); // Close the modal
  };

  const onExit = (error: any, metadata: any) => {
    console.log("Plaid Link exit", error, metadata);
    setModalVisible(false); // Close the modal on exit
  };

  const handleAddBank = async () => {
    await dispatch(getBankLinkToken());

    Alert.alert(
      "Link New Account",
      "Do you want to link a new bank account?",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setTimeout(() => {
              setModalVisible(true);
            }, 500);
          },
        },
      ],
      { cancelable: false }
    );
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

      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {linkToken && <Text>{linkToken}</Text>}
      </Modal>
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
