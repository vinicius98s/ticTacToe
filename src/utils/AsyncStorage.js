import { AsyncStorage } from "react-native";

const GAMES_PLAYED_KEY = "@ticTacToe:gamesPlayed";

export async function getGamesPlayed() {
  try {
    return (await AsyncStorage.getItem(GAMES_PLAYED_KEY)) || 0;
  } catch (error) {
    return error;
  }
}

export async function addNewGamePlayed() {
  try {
    const currentGamesPlayed = await AsyncStorage.getItem(GAMES_PLAYED_KEY);
    const newGamesPlayed = ((Number(currentGamesPlayed) || 0) + 1).toString();

    console.log("new games", newGamesPlayed);

    await AsyncStorage.setItem(GAMES_PLAYED_KEY, newGamesPlayed);
  } catch (error) {
    return error;
  }
}
