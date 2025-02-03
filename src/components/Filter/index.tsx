import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type FilterProps = TouchableOpacityProps & {
  isActive?: boolean;
  children?: ReactNode;
};

export function Filter({ isActive, children, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      className={`items-center justify-center ${
        isActive && "border border-primary-500"
      } w-[18vw] h-[5vh] rounded-[1.5vw]`}
      {...rest}
    >
      <Text className="text-neutral-full uppercase">{children}</Text>
    </TouchableOpacity>
  );
}
