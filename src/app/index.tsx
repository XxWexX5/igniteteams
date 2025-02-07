import { useState } from "react";

import { FlatList, View } from "react-native";

import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { GroupCard } from "@/src/components/GroupCard";
import { ListEmpty } from "@/src/components/ListEmpty";
import { Button } from "@/src/components/Button";
import { router } from "expo-router";

type Group = {
  id: string;
  title: string;
};

export default function Index() {
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", title: "Turma dos lolzeras" },
    { id: "2", title: "Turma dos lolzeras" },
    { id: "3", title: "Turma dos lolzeras" },
    { id: "4", title: "Turma dos lolzeras" },
    { id: "5", title: "Turma dos lolzeras" },
    { id: "6", title: "Turma dos lolzeras" },
  ]);

  function handleCreateGroup() {
    router.navigate("/new");
  }

  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header />

        <Highlight title="Turmas" subtitle="jogue com a sua turma" />

        <View className="flex-1 mb-[3vh]">
          <FlatList
            data={groups}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GroupCard title={item.title} />}
            ItemSeparatorComponent={() => <View className="h-[2vh]"></View>}
            ListEmptyComponent={() => (
              <ListEmpty message="Que tal cadastrar uma turma?" />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
          />
        </View>

        <Button onPress={handleCreateGroup}>Criar nova turma</Button>
      </Container>
    </View>
  );
}
