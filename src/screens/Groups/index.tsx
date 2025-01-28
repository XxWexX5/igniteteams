import { useState } from "react";

import { FlatList, View } from "react-native";

import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { GroupCard } from "@/src/components/GroupCard";
import { ListEmpty } from "@/src/components/ListEmpty";

type Group = {
  id: string;
  title: string;
};

export function Groups() {
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", title: "Turma dos lolzeras" },
  ]);

  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 pt-[3vh]">
      <Container>
        <Header />

        <Highlight title="Turmas" subtitle="jogue com a sua turma" />

        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GroupCard title={item.title} />}
          ItemSeparatorComponent={() => <View className="h-[2vh]"></View>}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar uma turma?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
        />
      </Container>
    </View>
  );
}
