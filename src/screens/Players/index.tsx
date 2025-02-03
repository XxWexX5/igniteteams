import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Container } from "@/src/components/Container";
import { Filter } from "@/src/components/Filter";
import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { Input } from "@/src/components/Input";
import { useState } from "react";
import { View, FlatList, Text } from "react-native";

type Team = {
  id: string;
  name: string;
  isActive: boolean;
};

export function Players() {
  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "time a", isActive: false },
    { id: "2", name: "time b", isActive: false },
    { id: "3", name: "time c", isActive: false },
    { id: "4", name: "time d", isActive: false },
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
          title="Nome da turma"
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
      </Container>
    </View>
  );
}
