import { createReducer } from '@ngrx/store';

import { initialState } from '../initial-state';

export const gamesReducer = createReducer(
  initialState.games
);
