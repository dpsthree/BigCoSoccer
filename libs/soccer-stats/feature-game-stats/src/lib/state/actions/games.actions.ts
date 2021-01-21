import { createAction, props } from '@ngrx/store';

import { Game } from '../../types';

export const gamesStatsFeatureInitialized = createAction(
  'gamesStatsFeatureInitialized'
);

export const markGamesRequestInProgress = createAction(
  'markGamesRequestInProgress'
);
export const markGamesRequestRetrying = createAction(
  'markGamesRequestRetrying'
);
export const markGamesRequestFailed = createAction('markGamesRequestFailed');
export const markGamesRequestSuccess = createAction(
  'markGamesRequestSuccess',
  props<{ games: Game[] }>()
);
