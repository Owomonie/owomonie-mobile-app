import React from "react";
import { Stack } from "expo-router";
import Avatar from "@/components/PreDetails/avatar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const AvatarScreen = () => {
  const loading = useSelector((state: RootState) => state.updateUser.loading);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading && <Spinner />}

      <Avatar />
    </>
  );
};

export default AvatarScreen;
