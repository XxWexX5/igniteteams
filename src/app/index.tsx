import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";

import { Alert, FlatList, View } from "react-native";

import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Group } from "@storage/group/groupCreate";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);

  function handleCreateGroup() {
    router.navigate("/new");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Carregar turmas", "Não foi possível carregar as turmas.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(nameGroup: string) {
    router.navigate(`/players?nameGroup=${nameGroup}`);
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

        {isLoading ? (
          <View className="flex-1">
            <Loading />
          </View>
        ) : (
          <View className="flex-1 mb-[3vh] mt-[5vh]">
            <FlatList
              data={groups}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <GroupCard
                  title={item.title}
                  onPress={() => handleOpenGroup(item.title)}
                />
              )}
              ItemSeparatorComponent={() => <View className="h-[2vh]"></View>}
              ListEmptyComponent={() => (
                <ListEmpty message="Que tal cadastrar uma turma?" />
              )}
              contentContainerStyle={groups.length === 0 && { flex: 1 }}
            />
          </View>
        )}

        <Button onPress={handleCreateGroup}>Criar nova turma</Button>
      </Container>
    </View>
  );
}
