import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Player } from '@bsc/soccer-stats/util-shared-types';
import { getPlayers } from '@bsc/soccer-stats/data-access-app-state';

import { featureSelectorName } from '../../constants';
import { Game, GameStatsState } from '../../types';

const gamesStatsSelector = createFeatureSelector<GameStatsState>(
  featureSelectorName
);

export const getGames = createSelector(
  gamesStatsSelector,
  state => state.games
);

export const getSelectedGameId = createSelector(
  gamesStatsSelector,
  state => state.selectedGame
);

export const getSelectedGame = createSelector(
  getGames,
  getSelectedGameId,
  (games: Game[], selectedGame: string | undefined) =>
    games.find(game => selectedGame && game.id === selectedGame)
);

export const getPlayersNotInGame = createSelector(
  getSelectedGame,
  getPlayers,
  playersNotInAGame
);

export const getDeleteGameStatus = createSelector(
  gamesStatsSelector,
  state => state.deleteGameStatus
);

function playersNotInAGame(game: Game | undefined, players: Player[]) {
  if (game) {
    return players.filter(
      player => !game.players.find(playerId => playerId === player.id)
    );
  } else {
    return players;
  }
}
