import { Text, View } from "react-native";

import { UsersThree } from "phosphor-react-native";
import { colors } from "@/src/theme";

interface ListEmptyProps {
  message: string;
}

export function ListEmpty({ message }: ListEmptyProps) {
  return (
    <View className="flex-1 justify-center items-center gap-[2vh]">
      <UsersThree color={colors.neutral[300]} size="50vw" />

      <Text className="text-center text-sm text-neutral-300">{message}</Text>
    </View>
  );
}
