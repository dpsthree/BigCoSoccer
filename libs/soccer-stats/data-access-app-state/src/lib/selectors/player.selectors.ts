import { AppState } from '../state.types';

export const getPlayers = (state: AppState) => state.players;
export const getAddPlayerStatus = (state: AppState) => state.addPlayerStatus;
