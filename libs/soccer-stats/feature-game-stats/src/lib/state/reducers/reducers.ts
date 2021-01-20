import { ActionReducerMap } from '@ngrx/store';

import { GameStatsState } from '../../types';
import { countReducer } from './count.reducer';

export const gameStatsReducers: ActionReducerMap<GameStatsState> = {
  count: countReducer
};
