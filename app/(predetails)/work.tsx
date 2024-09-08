import React from "react";
import { Stack } from "expo-router";
import Work from "@/components/PreDetails/work";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const WorkScreen = () => {
  const loading = useSelector((state: RootState) => state.updateUser.loading);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading && <Spinner />}
      <Work />
    </>
  );
};

export default WorkScreen;
