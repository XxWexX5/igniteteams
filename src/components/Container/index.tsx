import { ReactNode } from "react";

import { View } from "react-native";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <View className="flex-1 h-full w-full max-w-[85vw] mx-auto">
      {children}
    </View>
  );
}
