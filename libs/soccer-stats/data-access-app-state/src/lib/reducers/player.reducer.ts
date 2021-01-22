import { createReducer, on } from '@ngrx/store';

import {
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess
} from '../actions/player.actions';
import { playerFetchStatus, Player } from '../state.types';
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

function resetPlayers(): Player[] {
  return [];
}

function populatePlayers(players: Player[]) {
  return players;
}
