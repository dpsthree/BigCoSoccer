import { createAction, props } from '@ngrx/store';
import { Player } from '../state.types';

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
  props<{player: string}>()
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
export const ackAddPlayerStatus = createAction(
  'ackAddPlayerStatus'
);
