import {
  addCardStatusMessages,
  addGameStatusMessages,
  addPlayerStatusMessages,
  addPlayerToGameStatusMessages,
  addShotStatusMessages,
  AppState,
  deleteGameStatus,
  deletePlayerStatus,
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
  addShotStatus: addShotStatusMessages.notStarted,
  addCardStatus: addCardStatusMessages.notStarted,
  addPlayerStatus: addPlayerStatusMessages.notStarted,
  selectedPlayer: undefined,
  deletePlayerStatus: deletePlayerStatus.notStarted
};
