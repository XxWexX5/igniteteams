import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

type ButtonIconProps = TouchableOpacityProps & {
  type: "primary" | "secondary";
  icon: keyof typeof MaterialIcons.glyphMap;
};

import { colors } from "@/src/theme";

export function ButtonIcon({ type, icon, ...rest }: ButtonIconProps) {
  return (
    <TouchableOpacity
      className="size-[6vw] justify-center items-center"
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={type === "primary" ? colors.primary[500] : colors.secondary[500]}
      />
    </TouchableOpacity>
  );
}
