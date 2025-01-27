import { View } from "react-native";

import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";

export function Groups() {
  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 pt-[3vh]">
      <Container>
        <Header />

        <Highlight title="Turmas" subtitle="jogue com a sua turma" />
      </Container>
    </View>
  );
}
