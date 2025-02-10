import { useState, useCallback } from "react";

import { FlatList, View } from "react-native";

import { Container } from "@/src/components/Container";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { GroupCard } from "@/src/components/GroupCard";
import { ListEmpty } from "@/src/components/ListEmpty";
import { Button } from "@/src/components/Button";
import { router, useFocusEffect } from "expo-router";
import { groupsGetAll } from "../storage/group/groupsGetAll";

type Group = {
  id: string;
  title: string;
};

export default function Index() {
  const [groups, setGroups] = useState<Group[]>([]);

  function handleCreateGroup() {
    router.navigate("/new");
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      throw error;
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

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
