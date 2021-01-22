import { createAction, props } from '@ngrx/store';

import { Game, GameWithEvents } from '../state.types';

export const requestInitialGameList = createAction('requestInitialGameList');

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
export const ackDeleteGameStatus = createAction('ackDeleteGameStatus');

export const initiateDeleteGameRequest = createAction(
  'deleteGameRequest',
  props<{ gameId: string }>()
);

export const initiateAddGameRequest = createAction(
  'initiateAddGameRequest',
  props<Partial<Game>>()
);

export const markAddGameRequestInProgress = createAction(
  'markAddGameRequestInProgress'
);
export const markAddGameRequestRetrying = createAction(
  'markAddGameRequestRetrying'
);
export const markAddGameRequestFailed = createAction(
  'markAddGameRequestFailed'
);
export const markAddGameRequestSuccess = createAction(
  'markAddGameRequestSuccess'
);
export const ackAddGameStatus = createAction('ackAddGameStatus');
