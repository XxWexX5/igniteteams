import { View, Text } from "react-native";

interface HighlightProps {
  title: string;
  subtitle: string;
}

export function Highlight({ title, subtitle }: HighlightProps) {
  return (
    <View className="w-full mt-[5vh] gap-[.85vh]">
      <Text className="text-neutral-full text-center text-xl font-bold">
        {title}
      </Text>

      <Text className="text-neutral-300 text-center text-md">{subtitle}</Text>
    </View>
  );
}
