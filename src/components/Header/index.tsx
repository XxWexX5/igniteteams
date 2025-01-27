import { View } from "react-native";

import Logo from "@assets/images/logo.svg";

export function Header() {
  return (
    <View className="justify-center items-center">
      <Logo />
    </View>
  );
}
