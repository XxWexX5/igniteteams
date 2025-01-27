import { ActivityIndicator, View } from "react-native";

import { colors } from "@/src/theme";

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center bg-neutral-600">
      <ActivityIndicator color={colors.primary[700]} size="large" />
    </View>
  );
}
