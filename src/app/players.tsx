import { useEffect, useState, useRef } from "react";
import { View, FlatList, Text, Alert, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/src/components/Button";
import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Container } from "@/src/components/Container";
import { Filter } from "@/src/components/Filter";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { Input } from "@/src/components/Input";
import { ListEmpty } from "@/src/components/ListEmpty";
import { PlayerCard } from "@/src/components/PlayerCard";

import { AppError } from "../utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetsByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../storage/group/groupRemoveByName";

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
  const newPlayerNameInputRef = useRef<TextInput>(null);

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

  async function fetchPlayersByTeam() {
    try {
      const teamActived = teams.find((team) => team.isActive);
      const teamNoActived = teams.find((team) => !team.isActive);

      if (!teamActived || !teamNoActived) {
        Alert.alert("Pessoas", "Times ativos/inativos não encontrados.");
        return;
      }

      const [playersByTeamActived, playersByTeamNoActived] = await Promise.all([
        playersGetsByGroupAndTeam(nameGroup, teamActived.name),
        playersGetsByGroupAndTeam(nameGroup, teamNoActived.name),
      ]);

      const dataPlayers = teams.map((team) => ({
        ...team,
        players: team.isActive ? playersByTeamActived : playersByTeamNoActived,
      }));

      setTeams(dataPlayers);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possível buscar os jogadores.");
    }
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
      team: teamActived?.name,
    };

    try {
      await playerAddByGroup(newPlayer, nameGroup);
      setNewPlayerName("");
      fetchPlayersByTeam();
      newPlayerNameInputRef.current?.blur();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo pessoa", error.message);
      }

      console.log(error);
      Alert.alert("Nova pessoa", "Não foi possível adicionar.");
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, nameGroup);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover esta pessoa.");
    }
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(nameGroup);

      router.navigate("/");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover grupo", "Não foi possível remover este grupo.");
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "default",
        onPress: () => {
          removeGroup();
        },
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, []);

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
            value={newPlayerName}
            inputRef={newPlayerNameInputRef}
            placeholder="Nome da pessoa"
            autoCorrect={false}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
          />

          <ButtonIcon onPress={handleAddPlayer} icon="add" theme="primary" />
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
                {item?.name}
              </Filter>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-[4vw]"></View>}
          />

          <Text className="text-neutral-full font-bold text-sm ml-[6vw]">
            {teams?.filter((team) => team.isActive)[0]?.players.length}
          </Text>
        </View>

        <FlatList
          data={teams?.filter((team) => team.isActive)[0]?.players}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
            return (
              <PlayerCard
                name={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            );
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

        <Button
          type="secondary"
          className="mb-[2vh]"
          onPress={handleGroupRemove}
        >
          Remover turma
        </Button>
      </Container>
    </View>
  );
}
