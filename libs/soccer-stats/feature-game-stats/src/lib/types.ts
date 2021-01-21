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

export interface GameStatsState {
  games: Game[];
  gameFetchStatus: gameFetchStatus;
}
