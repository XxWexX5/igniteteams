import { View } from "react-native";

import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";

export function Groups() {
  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600">
      <Container>
        <Header hasBack />
      </Container>
    </View>
  );
}
