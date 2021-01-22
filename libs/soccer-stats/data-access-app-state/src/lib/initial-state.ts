import {
  addGameStatusMessages,
  addPlayerToGameStatusMessages,
  addShotStatusMessages,
  AppState,
  deleteGameStatus,
  gameFetchStatus,
  playerFetchStatus
} from './state.types';

export const initialState: AppState = {
  user: null,
  games: [],
  gameFetchStatus: gameFetchStatus.gamesLoading,
  selectedGame: undefined,
  deleteGameStatus: deleteGameStatus.notStarted,
  players: [],
  playerFetchStatus: playerFetchStatus.playersLoading,
  addGameStatus: addGameStatusMessages.notStarted,
  addPlayerToGameStatus: addPlayerToGameStatusMessages.notStarted,
  addShotStatus: addShotStatusMessages.notStarted
};
