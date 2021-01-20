export interface Game {
  id: string;
  name: string;
  date: string;
  location: string;
  players: string[];
}

export interface GameStatsState {
  games: Game[];
}
