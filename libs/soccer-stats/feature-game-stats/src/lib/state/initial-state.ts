import { gameFetchStatus, GameStatsState } from '../types';

export const initialState: GameStatsState = {
  games: [],
  gameFetchStatus: gameFetchStatus.gamesLoading
};
