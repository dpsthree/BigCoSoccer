import { createAction, props } from '@ngrx/store';
import { Player, PlayerWithStats } from '../state.types';

export const markPlayersRequestInProgress = createAction(
  'markPlayersRequestInProgress'
);
export const markPlayersRequestRetrying = createAction(
  'markPlayersRequestRetrying'
);
export const markPlayersRequestFailed = createAction(
  'markPlayersRequestFailed'
);
export const markPlayersRequestSuccess = createAction(
  'markPlayersRequestSuccess',
  props<{ players: Player[] }>()
);

export const requestInitialPlayerList = createAction(
  'requestInitialPlayerList'
);

export const initiateAddPlayerRequest = createAction(
  'initiateAddPlayerRequest',
  props<{ player: string }>()
);

export const markAddPlayerRequestInProgress = createAction(
  'markAddPlayerRequestInProgress'
);
export const markAddPlayerRequestRetrying = createAction(
  'markAddPlayerRequestRetrying'
);
export const markAddPlayerRequestFailed = createAction(
  'markAddPlayerRequestFailed'
);
export const markAddPlayerRequestSuccess = createAction(
  'markAddPlayerRequestSuccess'
);
export const ackAddPlayerStatus = createAction('ackAddPlayerStatus');

export const selectedPlayerDetailsChanged = createAction(
  'selectedPlayerDetailsChanged',
  props<{ selectedPlayerWithStats: PlayerWithStats | undefined }>()
);

export const selectedPlayerIdChanged = createAction(
  'selectedPlayerIdChanged',
  props<{ playerId: string }>()
);

export const markDeletePlayerRequestInProgress = createAction(
  'markdeletePlayerRequestInProgress'
);
export const markDeletePlayerRequestRetrying = createAction(
  'markDeletePlayerRequestRetrying'
);
export const markDeletePlayerRequestFailed = createAction(
  'markDeletePlayerRequestFailed'
);
export const markDeletePlayerRequestSuccess = createAction(
  'markDeletePlayerRequestSuccess'
);
export const ackDeletePlayerStatus = createAction('ackDeletePlayerStatus');

export const initiateDeletePlayerRequest = createAction(
  'initiateDeletePlayerRequest',
  props<{ playerId: string }>()
);

export const initiateChangePlayerNameRequest = createAction(
  'initiateChangePlayerNameRequest',
  props<{ playerId: string; name: string }>()
);

export const markChangePlayerNameComplete = createAction(
  'markChangePlayerNameComplete',
  props<{ playerId: string }>()
);
