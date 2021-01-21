import { deleteGameStatus, gameFetchStatus, GameStatsState, playerFetchStatus } from '../types';

export const initialState: GameStatsState = {
  games: [],
  gameFetchStatus: gameFetchStatus.gamesLoading,
  selectedGame: undefined,
  deleteGameStatus: deleteGameStatus.notStarted,
  players: [],
  playerFetchStatus: playerFetchStatus.playersLoading,
};
