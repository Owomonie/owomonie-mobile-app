import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

export const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "green",
        width: "90%",
        height: 50,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontFamily: "As700",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: "white",
      }}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "red",
        width: "90%",
        height: 50,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontFamily: "As700",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: "white",
      }}
    />
  ),

  info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "orange",
        width: "90%",
        height: 50,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        textAlign: "center",
        padding: 10,
        color: "white",
        fontFamily: "As700",
      }}
    />
  ),
};
