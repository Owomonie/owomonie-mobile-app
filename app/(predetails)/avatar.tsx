import React from "react";
import { Stack } from "expo-router";
import Avatar from "@/components/PreDetails/avatar";

const AvatarScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Avatar />
    </>
  );
};

export default AvatarScreen;
