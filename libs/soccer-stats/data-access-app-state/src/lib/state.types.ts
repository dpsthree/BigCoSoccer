import { User } from '@bsc/shared/data-access-auth';

export interface AppState {
  user: User | null;
  players: Player[];
  playerFetchStatus: playerFetchStatus;
  games: Game[];
  gameFetchStatus: gameFetchStatus;
  selectedGame: GameWithEvents | undefined;
  deleteGameStatus: deleteGameStatus;
  addGameStatus: addGameStatusMessages;
  addPlayerToGameStatus: addPlayerToGameStatusMessages;
  addShotStatus: addShotStatusMessages;
  addCardStatus: addCardStatusMessages;
  addPlayerStatus: addPlayerStatusMessages;
  selectedPlayer: PlayerWithStats | undefined;
  deletePlayerStatus: deletePlayerStatus;
}

export interface Game {
  id: string;
  name: string;
  date: string;
  location: string;
  players: string[];
}

export interface GameWithEvents extends Game {
  shots: ShotOnGoalWithNames[];
  cards: CardWithName[];
  playerDetails: Player[];
}

export interface Card {
  id: string;
  cardType: 'red' | 'yellow';
  game: string;
  player: string;
  minute: number;
}

export interface CardWithName extends Card {
  playerName: string;
}

export interface ShotOnGoalWithNames extends ShotOnGoal {
  playerName: string;
  assistName: string;
}

export interface ShotOnGoal {
  id: string;
  player: string;
  game: string;
  assist: string;
  scored: boolean;
  minute: number;
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

export enum addGameStatusMessages {
  addGameInProgress = 'addGameInProgress',
  addGameRetrying = 'addGameRetrying',
  addGameFailed = 'addGameFailed',
  addGameSuccess = 'addGameSuccess',
  notStarted = 'notStarted'
}

// "the the game" as opposed to "to the system"
export enum addPlayerToGameStatusMessages {
  addPlayerToGameInProgress = 'addPlayerToGameInProgress',
  addPlayerToGameRetrying = 'addPlayerToGameRetrying',
  addPlayerToGameFailed = 'addPlayerToGameFailed',
  addPlayerToGameSuccess = 'addPlayerToGameSuccess',
  notStarted = 'notStarted'
}

// "to the system" as opposed to "to the game"
export enum addPlayerStatusMessages {
  addPlayerInProgress = 'addPlayerInProgress',
  addPlayerRetrying = 'addPlayerRetrying',
  addPlayerFailed = 'addPlayerFailed',
  addPlayerSuccess = 'addPlayerSuccess',
  notStarted = 'notStarted'
}

export enum addShotStatusMessages {
  addShotInProgress = 'addShotInProgress',
  addShotRetrying = 'addShotRetrying',
  addShotFailed = 'addShotFailed',
  addShotSuccess = 'addShotSuccess',
  notStarted = 'notStarted'
}

export enum addCardStatusMessages {
  addCardInProgress = 'addCardInProgress',
  addCardRetrying = 'addCardRetrying',
  addCardFailed = 'addCardFailed',
  addCardSuccess = 'addCardSuccess',
  notStarted = 'notStarted'
}

export enum deletePlayerStatus {
  deletePlayerPending = 'deletePlayerPending',
  deletePlayerFinished = 'deletePlayerFinished',
  deletePlayerFailed = 'deletePlayerFailed',
  notStarted = 'notStarted'
}

export interface Player {
  id: string;
  name: string;
}

export enum cardTypes {
  red = 'red',
  yellow = 'yellow'
}

export interface PlayerWithStats extends Player {
  games: Game[];
  shotsOnGoal: ShotOnGoalWithNames[];
  cards: Card[];
  assists: ShotOnGoalWithNames[];
}
