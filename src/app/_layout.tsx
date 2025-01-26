import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";

import "react-native-reanimated";

import { Groups } from "../screens/Groups";

import "@/src/styles/global.css";
import { SafeAreaView, StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar />

      <SafeAreaView className="w-screen h-screen justify-center items-center">
        <Groups />
      </SafeAreaView>
    </>
  );
}
