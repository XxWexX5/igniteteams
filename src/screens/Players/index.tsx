import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { Input } from "@/src/components/Input";
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

        <View className="w-full bg-neutral-700 flex-row items-center justify-center px-[5vw] rounded-[1.5vw]">
          <Input placeholder="Nome da pessoa" autoCorrect={false} />

          <ButtonIcon icon="add" type="primary" />
        </View>
      </Container>
    </View>
  );
}
