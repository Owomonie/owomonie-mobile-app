import React from "react";
import { Stack } from "expo-router";
import Age from "@/components/PreDetails/age";

const AgeScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Age />
    </>
  );
};

export default AgeScreen;
