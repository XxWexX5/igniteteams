import { View, Text } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { ButtonIcon } from "../ButtonIcon";

interface PlayerCardProps {
  name: string;
}

export function PlayerCard({ name }: PlayerCardProps) {
  return (
    <View className="w-full h-[6vh] bg-neutral-500 flex-row items-center mb-[2vh] rounded-[1.5vw] px-[5vw]">
      <View className="flex-1 flex-row gap-2 items-center">
        <Text className="text-md text-gray-200">
          <MaterialIcons name="person" size={24} />
        </Text>

        <Text className="text-md text-gray-200">{name}</Text>
      </View>

      <ButtonIcon icon="close" type="secondary" />
    </View>
  );
}
