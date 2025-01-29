import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { View, Text, TextInput } from "react-native";

import { UsersThree } from "phosphor-react-native";

import { colors } from "@/src/theme";
import { Button } from "@/src/components/Button";

export function NewGroup() {
  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header hasBack />

        <View className="flex-1 items-center justify-center -mt-[13vh]">
          <UsersThree color={colors.primary[700]} size={70} />

          <View className="w-full gap-[.85vh] justify-center items-center mt-[3vh] mb-[2vh]">
            <Text className="text-neutral-full font-bold text-lg">
              Nova Turma
            </Text>

            <Text className="text-neutral-300 text-sm">
              crie uma turma para adicionar pessoas
            </Text>

            <TextInput
              className="mt-[3vh] bg-neutral-700 w-full h-[7vh] rounded-[1.5vw] px-[5vw] text-neutral-full"
              placeholder="Nome da turma"
            />
          </View>

          <Button>Criar</Button>
        </View>
      </Container>
    </View>
  );
}
