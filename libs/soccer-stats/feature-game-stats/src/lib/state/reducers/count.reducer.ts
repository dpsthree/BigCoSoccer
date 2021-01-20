import { createReducer, on } from '@ngrx/store';

import { incrementCount } from '../actions/count.actions';
import { initialState } from '../initial-state';

export const countReducer = createReducer(
  initialState.count,
  on(incrementCount, state => (state += 1))
);
