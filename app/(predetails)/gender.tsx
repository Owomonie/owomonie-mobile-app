import React from "react";
import { Stack } from "expo-router";
import Gender from "@/components/PreDetails/gender";

const GenderScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Gender />
    </>
  );
};

export default GenderScreen;
