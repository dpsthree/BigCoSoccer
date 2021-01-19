import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state.types';

import { userReducer } from './user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};
