import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";

import "react-native-reanimated";

import "@/src/styles/global.css";
import { SafeAreaView, StatusBar } from "react-native";
import { Loading } from "../components/Loading";
import { Players } from "../screens/Players";

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

      <Players />
    </>
  );
}
