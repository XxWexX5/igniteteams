import { Text, View } from "react-native";

import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export function Groups() {
  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600">
      <Header />
    </View>
  );
}
