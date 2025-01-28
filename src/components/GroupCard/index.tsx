import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { UsersThree } from "phosphor-react-native";

import { colors } from "@/src/theme";

type GroupCardProps = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <TouchableOpacity
      className="w-full h-[10vh] bg-neutral-500 rounded-[1.5vw] flex-row items-center gap-[4vw] px-[8vw]"
      {...rest}
    >
      <UsersThree color={colors.primary[700]} size="32vw" weight="fill" />

      <Text className="text-neutral-full text-md">{title}</Text>
    </TouchableOpacity>
  );
}
