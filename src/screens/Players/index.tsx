import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { View } from "react-native";

export function Players() {
  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header hasBack />

        <Highlight
          title="Nome da turma"
          subtitle="adicione agalera e separe os times"
        />
      </Container>
    </View>
  );
}
