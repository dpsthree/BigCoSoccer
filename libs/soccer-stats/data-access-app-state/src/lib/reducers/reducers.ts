import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state.types';

import { userReducer } from './user.reducer';
import { playersReducer, playersFetchReducer, addPlayerStatusReducer } from './player.reducer';
import {
  gamesFetchReducer,
  gamesReducer,
  selectedGameReducer,
  deleteGameStatusReducer,
  addGameStatusReducer,
  addPlayerToGameStatusReducer,
  addShotStatusReducer,
  addCardStatusReducer
} from './game.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  games: gamesReducer,
  gameFetchStatus: gamesFetchReducer,
  selectedGame: selectedGameReducer,
  deleteGameStatus: deleteGameStatusReducer,
  players: playersReducer,
  playerFetchStatus: playersFetchReducer,
  addGameStatus: addGameStatusReducer,
  addPlayerToGameStatus: addPlayerToGameStatusReducer,
  addShotStatus: addShotStatusReducer,
  addCardStatus: addCardStatusReducer,
  addPlayerStatus: addPlayerStatusReducer
};
