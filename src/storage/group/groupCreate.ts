import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "../storageConfig";

import { groupsGetAll } from "./groupsGetAll";

import { AppError } from "@/src/utils/AppError";

type Group = {
    id: string;
    title: string;
  };

export async function groupCreate(newGroup: Group) {
    try {
        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.filter((group: Group) => group.title === newGroup.title).length > 0;

        if(groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome.')
        }

        const storage = JSON.stringify([...storedGroups, newGroup]);

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch(error) {
        throw error;
    }
}