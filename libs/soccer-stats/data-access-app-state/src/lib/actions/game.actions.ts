import { createAction, props } from '@ngrx/store';

import { Game, GameWithEvents } from '../state.types';

export const requestInitialGameList = createAction(
  'requestInitialGameList'
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
export const selectedGameDetailsChanged = createAction(
  'selectedGameDetailsChanged',
  props<{ selectedGameWithEvents: GameWithEvents | undefined }>()
);

export const selectedGameIdChanged = createAction(
  'selectedGameChanged',
  props<{ selectedGameId: string }>()
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
