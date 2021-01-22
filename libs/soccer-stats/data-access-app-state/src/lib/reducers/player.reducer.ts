import { createReducer, on } from '@ngrx/store';

import {
  ackAddPlayerStatus,
  markAddPlayerRequestFailed,
  markAddPlayerRequestInProgress,
  markAddPlayerRequestRetrying,
  markAddPlayerRequestSuccess,
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess
} from '../actions/player.actions';
import {
  playerFetchStatus,
  Player,
  addPlayerStatusMessages
} from '../state.types';
import { initialState } from '../initial-state';

export const playersReducer = createReducer(
  initialState.players,
  on(markPlayersRequestInProgress, resetPlayers),
  on(markPlayersRequestSuccess, (_, action) => {
    return populatePlayers(action.players);
  })
);

export const playersFetchReducer = createReducer(
  initialState.playerFetchStatus,
  on(markPlayersRequestInProgress, () => playerFetchStatus.playersLoading),
  on(markPlayersRequestRetrying, () => playerFetchStatus.playersRetrying),
  on(markPlayersRequestSuccess, () => playerFetchStatus.playersLoaded),
  on(markPlayersRequestFailed, () => playerFetchStatus.playersFailed)
);

export const addPlayerStatusReducer = createReducer(
  initialState.addPlayerStatus,
  on(
    markAddPlayerRequestInProgress,
    () => addPlayerStatusMessages.addPlayerInProgress
  ),
  on(
    markAddPlayerRequestRetrying,
    () => addPlayerStatusMessages.addPlayerRetrying
  ),
  on(markAddPlayerRequestFailed, () => addPlayerStatusMessages.addPlayerFailed),
  on(
    markAddPlayerRequestSuccess,
    () => addPlayerStatusMessages.addPlayerSuccess
  ),
  on(ackAddPlayerStatus, () => addPlayerStatusMessages.notStarted)
);

function resetPlayers(): Player[] {
  return [];
}

function populatePlayers(players: Player[]) {
  return players;
}
