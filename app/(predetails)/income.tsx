import React from "react";
import { Stack } from "expo-router";
import Income from "@/components/PreDetails/income";

const IncomeScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Income />
    </>
  );
};

export default IncomeScreen;
