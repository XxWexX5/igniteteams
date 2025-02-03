import { ReactNode } from "react";

import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  type?: "primary" | "secondary";
  children: ReactNode;
};

export function Button({
  type = "primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`flex-1 w-full min-h-[7vh] max-h-[7vh] rounded-[1.5vw] justify-center items-center ${
        type === "primary" ? "bg-primary-700" : "bg-secondary-700"
      }
      ${className}`}
      {...rest}
    >
      <Text className="text-md text-neutral-full">{children}</Text>
    </TouchableOpacity>
  );
}
