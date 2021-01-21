import { createFeatureSelector, createSelector } from '@ngrx/store';
import { playerSelectorName } from '../constants';

import { PlayerStatsState } from '../state.types';

const gamesStatsSelector = createFeatureSelector<PlayerStatsState>(
  playerSelectorName
);

export const getPlayers = createSelector(
  gamesStatsSelector,
  state => state.players
);
