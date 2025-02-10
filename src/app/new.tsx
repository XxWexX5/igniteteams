import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { View, Text } from "react-native";

import { UsersThree } from "phosphor-react-native";

import { colors } from "@/src/theme";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";

import { router } from "expo-router";
import { useState } from "react";

import { groupCreate } from "@storage/group/groupCreate";

export default function New() {
  const [nameGroup, setNameGroup] = useState("");

  async function handleCreate() {
    try {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const data = { id: id, title: nameGroup };

      await groupCreate(data);

      router.push({ pathname: "/players", params: { nameGroup } });
    } catch (error) {
      throw error;
    }
  }

  function handleNameGroup(value: string) {
    setNameGroup(value);
  }

  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header hasBack />

        <View className="flex-1 items-center justify-center -mt-[13vh]">
          <UsersThree color={colors.primary[700]} size={70} />

          <View className="w-full gap-[.85vh] justify-center items-center mt-[2.5vh]">
            <Text className="text-neutral-full font-bold text-xl">
              Nova Turma
            </Text>

            <Text className="text-neutral-300 text-sm mb-[1.5vh]">
              crie uma turma para adicionar pessoas
            </Text>

            <Input value={nameGroup} onChangeText={handleNameGroup} />
          </View>

          <Button className="mt-[3vh]" onPress={handleCreate}>
            Criar
          </Button>
        </View>
      </Container>
    </View>
  );
}
