import { createReducer, on } from '@ngrx/store';
import { Game, gameFetchStatus } from '../../types';
import {
  markGamesRequestFailed,
  markGamesRequestInProgress,
  markGamesRequestRetrying,
  markGamesRequestSuccess
} from '../actions/games.actions';

import { initialState } from '../initial-state';

// Demonstrating reducers with and without stand alone functions
// for when the time comes to test the reducer logic
export const gamesReducer = createReducer(
  initialState.games,
  on(markGamesRequestInProgress, resetGames),
  on(markGamesRequestSuccess, (_, action) => {
    return populateGames(action.games);
  })
);

export const gamesFetchReducer = createReducer(
  initialState.gameFetchStatus,
  on(markGamesRequestInProgress, () => gameFetchStatus.gamesLoading),
  on(markGamesRequestRetrying, () => gameFetchStatus.gamesRetrying),
  on(markGamesRequestSuccess, () => gameFetchStatus.gamesLoaded),
  on(markGamesRequestFailed, () => gameFetchStatus.gamesFailed)
);

function resetGames(): Game[] {
  return [];
}

function populateGames(games: Game[]) {
  return games;
}
