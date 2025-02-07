import { Button } from "@/src/components/Button";
import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Container } from "@/src/components/Container";
import { Filter } from "@/src/components/Filter";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { Input } from "@/src/components/Input";
import { ListEmpty } from "@/src/components/ListEmpty";
import { PlayerCard } from "@/src/components/PlayerCard";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, FlatList, Text } from "react-native";

type Player = {
  name: string;
};

type Team = {
  id: string;
  name: string;
  isActive: boolean;
  players: Player[];
};

export default function Players() {
  const { nameGroup } = useLocalSearchParams();

  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "time a",
      isActive: false,
      players: [{ name: "Wevison" }],
    },
    {
      id: "2",
      name: "time b",
      isActive: false,
      players: [],
    },
    {
      id: "3",
      name: "time c",
      isActive: false,
      players: [{ name: "Rodrigo" }],
    },
    {
      id: "4",
      name: "time d",
      isActive: false,
      players: [{ name: "Chrollo" }],
    },
  ]);

  function handleActiveTeam(id: string) {
    const data = teams.map((team) => {
      if (team.id === id) {
        return { ...team, isActive: !team.isActive };
      }

      return { ...team, isActive: false };
    });

    setTeams(data);
  }

  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header hasBack />

        <Highlight
          title={(nameGroup as string) || ""}
          subtitle="adicione agalera e separe os times"
        />

        <View className="w-full bg-neutral-700 flex-row items-center justify-center px-[5vw] rounded-[1.5vw]">
          <Input placeholder="Nome da pessoa" autoCorrect={false} />

          <ButtonIcon icon="add" type="primary" />
        </View>

        <View className="flex-row items-center my-[3.5vh]">
          <FlatList
            data={teams}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Filter
                isActive={item.isActive}
                onPress={() => handleActiveTeam(item.id)}
              >
                {item.name}
              </Filter>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-[4vw]"></View>}
          />

          <Text className="text-neutral-full font-bold text-sm ml-[6vw]">
            {teams.length}
          </Text>
        </View>

        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.isActive && item.players.length > 0) {
              return <PlayerCard name={item?.players[0]?.name} />;
            }

            return null;
          }}
          ListEmptyComponent={({ item }) => {
            if (item.players.length <= 0) {
              return <ListEmpty message="Não há pessoas neste time" />;
            }
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            teams.length === 0 && { flex: 1 },
          ]}
        />

        <Button type="secondary" className="mb-[2vh]">
          Remover turma
        </Button>
      </Container>
    </View>
  );
}
