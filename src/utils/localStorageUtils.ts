import { Match, Player } from "../types";

// 定数としてキーを定義
const PLAYERS_KEY = "players";
const PREVIOUS_PLAYERS_KEY = "previousPlayers";
const MATCHES_KEY = "matches";

// 共通のローカルストレージ取得関数
const getFromLocalStorage = <T>(key: string): T | false => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (error) {
    console.error(`Error getting ${key} from localStorage`, error);
  }
  return false;
};

// 共通のローカルストレージ保存関数
const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

export const savePlayersToLocalStorage = (players: Player[]) => {
  saveToLocalStorage(PLAYERS_KEY, players);
};

export const getPlayersFromLocalStorage = (): Player[] | false => {
  return getFromLocalStorage<Player[]>(PLAYERS_KEY);
};

export const savePreviousPlayersToLocalStorage = (players: Player[]) => {
  saveToLocalStorage(PREVIOUS_PLAYERS_KEY, players);
};

export const getPreviousPlayersFromLocalStorage = (): Player[] | false => {
  return getFromLocalStorage<Player[]>(PREVIOUS_PLAYERS_KEY);
};

export const saveMatchesToLocalStorage = (matches: Match[]) => {
  const newMatchesForLocalStorage = matches.map((match) => {
    if (match.isEnd) {
      return { ...match, editable: false };
    }
    return match;
  });
  saveToLocalStorage(MATCHES_KEY, newMatchesForLocalStorage);
};

export const getMatchesFromLocalStorage = (): Match[] | false => {
  return getFromLocalStorage<Match[]>(MATCHES_KEY);
};
