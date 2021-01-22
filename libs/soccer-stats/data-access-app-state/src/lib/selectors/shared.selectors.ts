import { AppState } from '../state.types';

export const getGames = (state: AppState) => state.games;
export const getPlayers = (state: AppState) => state.players;
