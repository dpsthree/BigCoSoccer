import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { BaseUrl } from '@bsc/shared/util-config-tokens';
import { loadWithRetry } from '@bsc/shared/util-async-helpers';

import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation,
  shotEndpointLocation
} from '../constants';
import { Card, Game, ShotOnGoal } from '../state.types';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  getGames() {
    return loadWithRetry(() =>
      this.http.get<Game[]>(`${this.baseUrl}${gameEndpointLocation}`)
    );
  }

  getGame(gameId: string) {
    return loadWithRetry(() =>
      this.http.get<Game>(`${this.baseUrl}${gameEndpointLocation}/${gameId}`)
    );
  }

  deleteGame(gameId: string) {
    return loadWithRetry(() =>
      this.http.delete<void>(`${this.baseUrl}${gameEndpointLocation}/${gameId}`)
    );
  }

  addGame(game: Partial<Game>) {
    return loadWithRetry(() =>
      this.http.post<Game>(`${this.baseUrl}${gameEndpointLocation}`, game)
    );
  }

  addPlayerToGame(game: Game, player: string) {
    return loadWithRetry(() =>
      this.http.put(`${this.baseUrl}${gameEndpointLocation}/${game.id}`, {
        ...game,
        players: [...game.players, player]
      })
    );
  }

  addShot(shot: Partial<ShotOnGoal>){
    return loadWithRetry(() =>this.http.post(`${this.baseUrl}${shotEndpointLocation}`, shot))
  }

  getShotsForGame(gameId: string) {
    return loadWithRetry(() =>
      this.http.get<ShotOnGoal[]>(
        `${this.baseUrl}${goalEndpointLocation}?game=${gameId}`
      )
    );
  }

  getCardsForGame(gameId: string) {
    return loadWithRetry(() =>
      this.http.get<Card[]>(
        `${this.baseUrl}${cardEndpointLocation}?game=${gameId}`
      )
    );
  }
}
