import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { BaseUrl } from '@bsc/shared/util-config-tokens';
import { loadWithRetry } from '@bsc/shared/util-async-helpers';

import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation
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

  deleteGame(gameId: string) {
    return loadWithRetry(() =>
      this.http.delete<void>(`${this.baseUrl}${gameEndpointLocation}/${gameId}`)
    );
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
