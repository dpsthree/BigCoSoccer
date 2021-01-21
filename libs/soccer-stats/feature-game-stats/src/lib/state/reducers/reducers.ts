import { ActionReducerMap } from '@ngrx/store';

import { playersReducer, playersFetchReducer } from './players.reducer';

import { GameStatsState } from '../../types';

import {
  gamesFetchReducer,
  gamesReducer,
  selectedGameReducer,
  deleteGameStatusReducer
} from './games.reducer';

export const gameStatsReducer: ActionReducerMap<GameStatsState> = {
  games: gamesReducer,
  gameFetchStatus: gamesFetchReducer,
  selectedGame: selectedGameReducer,
  deleteGameStatus: deleteGameStatusReducer,
  players: playersReducer,
  playerFetchStatus: playersFetchReducer,
};
