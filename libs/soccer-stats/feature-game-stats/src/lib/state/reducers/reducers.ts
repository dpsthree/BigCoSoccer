import { ActionReducerMap } from '@ngrx/store';

import { GameStatsState } from '../../types';
import { gamesReducer } from './games.reducer';

export const gameStatsReducers: ActionReducerMap<GameStatsState> = {
  games: gamesReducer
};
