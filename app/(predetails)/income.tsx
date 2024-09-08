import React from "react";
import { Stack } from "expo-router";
import Income from "@/components/PreDetails/income";
import Spinner from "@/components/Spinner";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const IncomeScreen = () => {
  const loading = useSelector((state: RootState) => state.updateUser.loading);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading && <Spinner />}
      <Income />
    </>
  );
};

export default IncomeScreen;
