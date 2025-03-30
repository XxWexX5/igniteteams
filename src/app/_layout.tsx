import { useEffect } from "react";

import { Stack } from "expo-router";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";

import "@/src/styles/global.css";

import { SafeAreaView, StatusBar } from "react-native";

import { Loading } from "@components/Loading";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/roboto.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView className="bg-neutral-600" />

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="new" />
        <Stack.Screen name="players" />
      </Stack>
    </>
  );
}
