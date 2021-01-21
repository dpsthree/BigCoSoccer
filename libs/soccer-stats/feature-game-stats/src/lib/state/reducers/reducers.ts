import { ActionReducerMap } from '@ngrx/store';

import { GameStatsState } from '../../types';
import { gamesFetchReducer, gamesReducer } from './games.reducer';

export const gameStatsReducer: ActionReducerMap<GameStatsState> = {
  games: gamesReducer,
  gameFetchStatus: gamesFetchReducer
};
