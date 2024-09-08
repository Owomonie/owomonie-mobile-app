import React from "react";
import { Stack } from "expo-router";
import Age from "@/components/PreDetails/age";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const AgeScreen = () => {
  const loading = useSelector((state: RootState) => state.updateUser.loading);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading && <Spinner />}

      <Age />
    </>
  );
};

export default AgeScreen;
