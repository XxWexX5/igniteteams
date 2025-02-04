import { TouchableOpacity, View } from "react-native";

import Logo from "@assets/images/logo.svg";

import { CaretLeft } from "phosphor-react-native";

import { colors } from "@/src/theme";

import { router } from "expo-router";

interface HeaderProps {
  hasBack?: boolean;
}

export function Header({ hasBack }: HeaderProps) {
  function back() {
    router.back();
  }

  return (
    <View className="justify-center items-center flex-row">
      {hasBack && (
        <TouchableOpacity className="flex-1" onPress={back}>
          <CaretLeft color={colors.neutral.full} size={32} />
        </TouchableOpacity>
      )}

      <View>
        <Logo />
      </View>
    </View>
  );
}
