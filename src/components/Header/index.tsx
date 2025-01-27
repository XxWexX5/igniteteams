import { View } from "react-native";

import Logo from "@assets/images/logo.svg";

import { CaretLeft } from "phosphor-react-native";

import { colors } from "@/src/theme";

interface HeaderProps {
  hasBack?: boolean;
}

export function Header({ hasBack = false }: HeaderProps) {
  return (
    <View className="justify-center items-center flex-row">
      {hasBack && (
        <View className="flex-1">
          <CaretLeft color={colors.neutral.full} size={32} />
        </View>
      )}

      <View>
        <Logo />
      </View>
    </View>
  );
}
