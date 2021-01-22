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
  'selectedGameIdChanged',
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
  'markDeleteGameRequestSuccess'
);
export const ackDeleteGameStatus = createAction('ackDeleteGameStatus');

export const initiateDeleteGameRequest = createAction(
  'initiateDeleteGameRequest',
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

export const initiateAddPlayerToGameRequest = createAction(
  'initiateAddPlayerToGameRequest',
  props<{game: string, player: string}>()
);

export const markAddPlayerToGameRequestInProgress = createAction(
  'markAddPlayerToGameRequestInProgress'
);
export const markAddPlayerToGameRequestRetrying = createAction(
  'markAddPlayerToGameRequestRetrying'
);
export const markAddPlayerToGameRequestFailed = createAction(
  'markAddPlayerToGameRequestFailed'
);
export const markAddPlayerToGameRequestSuccess = createAction(
  'markAddPlayerToGameRequestSuccess'
);
export const ackAddPlayerToGameStatus = createAction('ackAddPlayerToGameStatus');
