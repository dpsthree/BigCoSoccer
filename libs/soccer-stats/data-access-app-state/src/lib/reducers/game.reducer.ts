import { createReducer, on } from '@ngrx/store';
import {
  deleteGameStatus,
  Game,
  gameFetchStatus,
  GameWithEvents
} from '../state.types';
import {
  markDeleteGameRequestFailed,
  markDeleteGameRequestInProgress,
  markDeleteGameRequestRetrying,
  markDeleteGameRequestSuccess,
  markGamesRequestFailed,
  markGamesRequestInProgress,
  markGamesRequestRetrying,
  markGamesRequestSuccess,
  selectedGameDetailsChanged
} from '../actions/game.actions';

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

export const selectedGameReducer = createReducer(
  initialState.selectedGame,
  on(selectedGameDetailsChanged, (_, action) => action.selectedGameWithEvents),
  // Make sure that we reset the selected game if it is deleted
  on<GameWithEvents | undefined>(markDeleteGameRequestSuccess, () => undefined)
);

export const deleteGameStatusReducer = createReducer(
  initialState.deleteGameStatus,
  on(markDeleteGameRequestInProgress, () => deleteGameStatus.deleteGamePending),
  on(markDeleteGameRequestRetrying, () => deleteGameStatus.deleteGamePending),
  on(markDeleteGameRequestFailed, () => deleteGameStatus.deleteGameFailed),
  on(markDeleteGameRequestSuccess, () => deleteGameStatus.deleteGameFinished)
);

function resetGames(): Game[] {
  return [];
}

function populateGames(games: Game[]) {
  return games;
}