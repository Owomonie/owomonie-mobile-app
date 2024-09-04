import ForgetSuccess from "@/components/Auth/Forget/success";
import { Stack, useLocalSearchParams } from "expo-router";

const ForgetSuccessScreen = () => {
  const { id: email } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ForgetSuccess email={email} />
    </>
  );
};

export default ForgetSuccessScreen;
