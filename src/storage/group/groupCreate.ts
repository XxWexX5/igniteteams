import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "../storageConfig";

import { groupsGetAll } from "./groupsGetAll";

type Group = {
    id: string;
    title: string;
  };

export async function groupCreate(newGroup: Group) {
    try {
        const storedGroups = await groupsGetAll();

        const storage = JSON.stringify([...storedGroups, newGroup]);

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch(error) {
        throw error;
    }
}