import { Player } from '@bsc/soccer-stats/util-shared-types';

export interface Game {
  id: string;
  name: string;
  date: string;
  location: string;
  players: string[];
}

export enum gameFetchStatus {
  gamesLoading = 'gamesLoading',
  gamesRetrying = 'gamesRetrying',
  gamesFailed = 'gamesFailed',
  gamesLoaded = 'gamesLoaded'
}

export enum playerFetchStatus {
  playersLoading = 'playersLoading',
  playersRetrying = 'playersRetrying',
  playersFailed = 'playersFailed',
  playersLoaded = 'playersLoaded'
}

export enum deleteGameStatus {
  deleteGamePending = 'deleteGamePending',
  deleteGameFinished = 'deleteGameFinished',
  deleteGameFailed = 'deleteGameFailed',
  notStarted = 'notStarted'
}

// Will need to elevate this object and combine with players
export interface GameStatsState {
  games: Game[];
  gameFetchStatus: gameFetchStatus;
  selectedGame: string | undefined;
  deleteGameStatus: deleteGameStatus;
  players: Player[];
  playerFetchStatus: playerFetchStatus;
}
