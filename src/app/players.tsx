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
import { View, FlatList, Text, Alert } from "react-native";
import { AppError } from "../utils/AppError";
import { playerAddByGroup } from "../storage/player/playerAddByGroup";
import { playersGetByGroup } from "../storage/player/playersGetByGroup";

type Player = {
  name: string;
};

type Team = {
  id: string;
  name: string;
  isActive: boolean;
  players: Player[];
};

type RouteParams = {
  nameGroup: string;
};

export default function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const { nameGroup } = useLocalSearchParams<RouteParams>();

  const [teams, setTeams] = useState<Team[]>([
    { id: "time-a", name: "TIME A", isActive: true, players: [] },
    { id: "time-b", name: "TIME B", isActive: false, players: [] },
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

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const teamActived = teams.filter((team) => team.isActive)[0];

    const newPlayer = {
      name: newPlayerName,
      team: teamActived.name,
    };

    try {
      await playerAddByGroup(newPlayer, nameGroup);

      const players = await playersGetByGroup(nameGroup);
      console.log(players);
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo pessoa", error.message);
      }

      console.log(error);
      Alert.alert("Nova pessoa", "Não foi possível adicionar.");
    }
  }

  return (
    <View className="flex-1 w-screen h-screen bg-neutral-600 py-[3vh]">
      <Container>
        <Header hasBack />

        <Highlight
          title={nameGroup}
          subtitle="adicione agalera e separe os times"
        />

        <View className="w-full bg-neutral-700 flex-row items-center justify-center px-[5vw] rounded-[1.5vw]">
          <Input
            onChangeText={setNewPlayerName}
            placeholder="Nome da pessoa"
            autoCorrect={false}
          />

          <ButtonIcon onPress={handleAddPlayer} icon="add" type="primary" />
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
            if (item.isActive && item?.players.length > 0) {
              return <PlayerCard name={item?.players[0]?.name} />;
            }

            return null;
          }}
          ListEmptyComponent={({ item }) => {
            if (item?.players?.length <= 0) {
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
