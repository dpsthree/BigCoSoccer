import { createSelector } from '@ngrx/store';

import { AppState, cardTypes } from '../state.types';
import { getGames } from './shared.selectors';

export const getAddPlayerStatus = (state: AppState) => state.addPlayerStatus;
export const getSelectedPlayer = (state: AppState) => state.selectedPlayer;
export const getDeletePlayerStatus = (state: AppState) =>
  state.deletePlayerStatus;
export const getPlayersFetchStatus = (state: AppState) => state.playerFetchStatus;
export const getGameBreakdownForSelectedPlayer = createSelector(
  getSelectedPlayer,
  player => {
    if (player) {
      return player.games.map(game => ({
        name: game.name,
        location: game.location,
        date: game.date,
        shots: player.shotsOnGoal.filter(shot => shot.game === game.id).length,
        goals: player.shotsOnGoal
          .filter(shot => shot.game === game.id)
          .filter(sog => sog.scored).length,
        assists: player.assists.filter(shot => shot.game === game.id).length,
        redCard:
          player.cards.filter(
            card => card.game === game.id && card.cardType === cardTypes.red
          ).length > 0,
        yellowCard:
          player.cards.filter(
            card => card.game === game.id && card.cardType === cardTypes.yellow
          ).length > 0
      }));
    } else {
      return undefined;
    }
  }
);

export const getCanDeleteSelectedPlayer = createSelector(
  getSelectedPlayer,
  getGames,
  (player, games) => {
    if (player) {
      return !games.find(game => game.players.find(p => p === player.id));
    } else {
      return true;
    }
  }
);
