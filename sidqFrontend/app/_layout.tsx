import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/OnboardingScreen" />
      <Stack.Screen name="home/HomePage" />
      <Stack.Screen name="auth/SignUpScreen" />
    </Stack>
  );
}
