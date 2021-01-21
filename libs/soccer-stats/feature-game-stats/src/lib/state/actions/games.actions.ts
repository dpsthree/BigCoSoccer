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
export const selectedGameChanged = createAction(
  'selectedGameChanged',
  props<{ selectedGame: string }>()
);

export const markDeleteGameRequestInProgress = createAction(
  'markdeleteGameRequestInProgress'
);
export const markDeleteGameRequestRetrying = createAction(
  'markDeleteGameRequestRetrying'
);
export const markDeleteGameRequestFailed = createAction(
  'markDeleteGameRequestFailed'
);
export const markDeleteGameRequestSuccess = createAction(
  'deleteGameRequestSuccess'
);
export const initiateDeleteGameRequest = createAction(
  'deleteGameRequest',
  props<{ gameId: string }>()
);
