import { useState } from "react";
import { router } from "expo-router";

import { View, Text, Alert } from "react-native";

import { UsersThree } from "phosphor-react-native";

import { colors } from "@/src/theme";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";

import { AppError } from "@utils/AppError";

import { groupCreate } from "@storage/group/groupCreate";

export default function New() {
  const [nameGroup, setNameGroup] = useState("");

  async function handleCreate() {
    try {
      if (nameGroup.trim().length === 0) {
        return Alert.alert("Novo grupo", "Informe o nome da turma.");
      }

      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const data = { id: id, title: nameGroup };

      await groupCreate(data);

      router.push({ pathname: "/players", params: { nameGroup } });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo grupo", error.message);
      } else {
        Alert.alert("Novo grupo", "Não foi possível criar um novo grupo.");
      }
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
