import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameStatsState } from '../../types';

export const getCount = createSelector(
  createFeatureSelector<GameStatsState>('games'),
  state => state.count
);
