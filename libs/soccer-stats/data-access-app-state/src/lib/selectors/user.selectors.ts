import { User } from '@bsc/shared/data-access-auth';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../state.types';

export const getCurrentUser = createSelector(
  createFeatureSelector<AppState, User | null>('user'),
  user => user
);
