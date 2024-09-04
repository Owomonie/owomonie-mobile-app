import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Onboarding from "@/components/Onboarding";

export default function OnboardingScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Onboarding />
    </GestureHandlerRootView>
  );
}
