import { createAction, props } from '@ngrx/store';

import { Player } from '@bsc/soccer-stats/util-shared-types';

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
