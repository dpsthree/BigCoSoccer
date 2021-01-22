import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { loadWithRetry } from '@bsc/shared/util-async-helpers';
import { BaseUrl } from '@bsc/shared/util-config-tokens';

import {
  cardEndpointLocation,
  goalEndpointLocation,
  playersEndpoint
} from '../constants';
import { Card, Player, ShotOnGoal } from '../state.types';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  getPlayers() {
    return loadWithRetry(() =>
      this.http.get<Player[]>(`${this.baseUrl}${playersEndpoint}`)
    );
  }

  addPlayer(player: string) {
    return loadWithRetry(() =>
      this.http.post<Player>(`${this.baseUrl}${playersEndpoint}`, {
        name: player
      })
    );
  }

  getPlayerShots(id: string) {
    return loadWithRetry(() =>
      this.http.get<ShotOnGoal[]>(
        `${this.baseUrl}${goalEndpointLocation}?player=${id}`
      )
    );
  }

  getPlayerCards(id: string) {
    return loadWithRetry(() =>
      this.http.get<Card[]>(
        `${this.baseUrl}${cardEndpointLocation}?player=${id}`
      )
    );
  }

  getPlayerAssists(id: string) {
    return loadWithRetry(() =>
      this.http.get<ShotOnGoal[]>(
        `${this.baseUrl}${goalEndpointLocation}?assist=${id}`
      )
    );
  }

  deletePlayer(id: string) {
    return loadWithRetry(() =>
      this.http.delete<void>(`${this.baseUrl}${playersEndpoint}/${id}`)
    );
  }

  changePlayerName(id: string, name: string) {
    return loadWithRetry(() =>
      this.http.put<Player>(`${this.baseUrl}${playersEndpoint}/${id}`, {
        id,
        name
      })
    );
  }
}
