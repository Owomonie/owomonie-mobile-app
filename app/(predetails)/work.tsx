import React from "react";
import { Stack } from "expo-router";
import Work from "@/components/PreDetails/work";

const WorkScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Work />
    </>
  );
};

export default WorkScreen;
