import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { loadWithRetry } from '@bsc/shared/util-async-helpers';
import { BaseUrl } from '@bsc/shared/util-config-tokens';

import { playersEndpoint } from '../constants';
import { Player } from '../state.types';

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
}
