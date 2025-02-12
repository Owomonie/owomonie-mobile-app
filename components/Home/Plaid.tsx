import { RootState, useAppDispatch } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  create,
  open,
  dismissLink,
  LinkSuccess,
  LinkExit,
  LinkIOSPresentationStyle,
  LinkLogLevel,
} from "react-native-plaid-link-sdk";
import { useSelector } from "react-redux";
import { ThemedSafeAreaView } from "../Themes/view";
import { brandColor } from "@/constants/Colors";
import { exchangeLinkToken } from "@/redux/slice/bank";

type PlaidProps = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const Plaid = ({ setModalVisible }: PlaidProps) => {
  const dispatch = useAppDispatch();

  const linkToken = useSelector((state: RootState) => state.banks.linkToken);

  useEffect(() => {
    if (linkToken) {
      const tokenConfiguration = createLinkTokenConfiguration(linkToken);
      create(tokenConfiguration);
    }
  }, [linkToken]);

  const createLinkTokenConfiguration = (
    token: string,
    noLoadingState: boolean = false
  ) => {
    return {
      token: token,
      noLoadingState: noLoadingState,
    };
  };

  const onSuccess = async (success: LinkSuccess) => {
    // console.log(success.metadata);
    if (success.publicToken) {
      await dispatch(
        exchangeLinkToken({
          publicToken: success.publicToken,
          numberOfAccounts: success.metadata?.accounts?.length ?? 0,
          bankName: success.metadata?.institution?.name.split(" -")[0],
        })
      );
    }
  };

  const onExit = (linkExit: LinkExit) => {
    // console.log("Exit: ", linkExit);
    dismissLink();
  };

  const createLinkOpenProps = () => {
    return {
      onSuccess,
      onExit,
      iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
      logLevel: LinkLogLevel.ERROR,
    };
  };

  const handleOpenLink = () => {
    setModalVisible(false);
    const openProps = createLinkOpenProps();
    open(openProps);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleOpenLink} style={styles.textCont}>
        <Text style={styles.text}>Click Here to Continue</Text>
      </TouchableOpacity>
    </ThemedSafeAreaView>
  );
};

export default Plaid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textCont: {
    paddingVertical: 10,
    backgroundColor: brandColor,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 10,
  },

  text: {
    fontSize: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
