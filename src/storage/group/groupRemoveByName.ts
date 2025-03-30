import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { groupsGetAll } from './groupsGetAll';

import { Group } from './groupCreate';

export async function groupRemoveByName(nameGroup: string) {
    try {
        const storedGroups = await groupsGetAll();

        const groups = storedGroups.filter((group: Group) => group.title !== nameGroup);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${nameGroup}`);
    } catch(error) {
        throw error;
    }
}