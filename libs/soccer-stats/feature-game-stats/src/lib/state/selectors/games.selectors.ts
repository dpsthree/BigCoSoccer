import { createSelector, createFeatureSelector } from '@ngrx/store';

import { featureSelectorName } from '../../constants';
import { GameStatsState } from '../../types';

const gamesStatsSelector = createFeatureSelector<GameStatsState>(
  featureSelectorName
);

export const getGames = createSelector(
  gamesStatsSelector,
  state => state.games
);
