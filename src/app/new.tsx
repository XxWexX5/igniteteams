import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { View, Text } from "react-native";

import { UsersThree } from "phosphor-react-native";

import { colors } from "@/src/theme";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";

import { router } from "expo-router";

export default function New() {
  function handleCreate() {
    router.navigate("/players");
  }

  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header hasBack />

        <View className="flex-1 items-center justify-center -mt-[13vh]">
          <UsersThree color={colors.primary[700]} size={70} />

          <View className="w-full gap-[.85vh] justify-center items-center mt-[2.5vh] mb-[2vh]">
            <Text className="text-neutral-full font-bold text-xl">
              Nova Turma
            </Text>

            <Text className="text-neutral-300 text-sm">
              crie uma turma para adicionar pessoas
            </Text>

            <Input />
          </View>

          <Button onPress={handleCreate}>Criar</Button>
        </View>
      </Container>
    </View>
  );
}
