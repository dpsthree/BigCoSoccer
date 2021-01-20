import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameStatsState } from '../../types';

const gamesStatsSelector = createFeatureSelector<GameStatsState>('games');

export const getGames = createSelector(
  gamesStatsSelector,
  state => state.games
);
