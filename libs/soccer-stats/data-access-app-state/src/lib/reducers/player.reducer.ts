import { createReducer, on } from '@ngrx/store';

import {
  ackAddPlayerStatus,
  ackDeletePlayerStatus,
  markAddPlayerRequestFailed,
  markAddPlayerRequestInProgress,
  markAddPlayerRequestRetrying,
  markAddPlayerRequestSuccess,
  markDeletePlayerRequestFailed,
  markDeletePlayerRequestInProgress,
  markDeletePlayerRequestRetrying,
  markDeletePlayerRequestSuccess,
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess,
  selectedPlayerDetailsChanged
} from '../actions/player.actions';
import {
  playerFetchStatus,
  Player,
  addPlayerStatusMessages,
  PlayerWithStats,
  deletePlayerStatus
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

export const deletePlayerStatusReducer = createReducer(
  initialState.deletePlayerStatus,
  on(
    markDeletePlayerRequestInProgress,
    () => deletePlayerStatus.deletePlayerPending
  ),
  on(
    markDeletePlayerRequestRetrying,
    () => deletePlayerStatus.deletePlayerPending
  ),
  on(
    markDeletePlayerRequestFailed,
    () => deletePlayerStatus.deletePlayerFailed
  ),
  on(
    markDeletePlayerRequestSuccess,
    () => deletePlayerStatus.deletePlayerFinished
  ),
  on(ackDeletePlayerStatus, () => deletePlayerStatus.notStarted)
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

export const selectedPlayerReducer = createReducer(
  initialState.selectedPlayer,
  on(
    selectedPlayerDetailsChanged,
    (_, action) => action.selectedPlayerWithStats
  ),
  // Make sure that we reset the selected Player if it is deleted
  on<PlayerWithStats | undefined>(
    markDeletePlayerRequestSuccess,
    () => undefined
  )
);

function resetPlayers(): Player[] {
  return [];
}

function populatePlayers(players: Player[]) {
  return players;
}
