import { Stack, useLocalSearchParams } from "expo-router";

import RegisterSuccess from "@/components/Auth/CreateAccount/success";

const CreateVerificationScreen = () => {
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
      <RegisterSuccess email={email} />
    </>
  );
};

export default CreateVerificationScreen;
