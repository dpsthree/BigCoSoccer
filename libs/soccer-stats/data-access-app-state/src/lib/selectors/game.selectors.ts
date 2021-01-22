import { createSelector } from '@ngrx/store';

import { Player, AppState, GameWithEvents } from '../state.types';
import { getPlayers } from './shared.selectors';

export const getSelectedGame = (state: AppState) => state.selectedGame;

export const getPlayersNotInGame = createSelector(
  getSelectedGame,
  getPlayers,
  playersNotInAGame
);

export const getDeleteGameStatus = (state: AppState) => state.deleteGameStatus;
export const getAddGameStatus = (state: AppState) => state.addGameStatus;
export const getAddPlayerToGameStatus = (state: AppState) =>
  state.addPlayerToGameStatus;

export const getAddShotStatus = (state: AppState) => state.addShotStatus;

export const getAddCardStatus = (state: AppState) => state.addCardStatus;

function playersNotInAGame(
  game: GameWithEvents | undefined,
  players: Player[]
) {
  if (game) {
    return players.filter(
      player => !game.players.find(playerId => playerId === player.id)
    );
  } else {
    return players;
  }
}
