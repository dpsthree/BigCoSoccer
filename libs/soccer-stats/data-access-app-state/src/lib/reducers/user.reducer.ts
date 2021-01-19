import { createReducer, on } from '@ngrx/store';
import { userChange } from '../actions/user.actions';

import { initialState } from '../state';

export const userReducer = createReducer(
  initialState.user,
  on(userChange, (_, action) => action.user)
);
