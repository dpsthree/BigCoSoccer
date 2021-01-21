import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { BaseUrl } from '@bsc/shared/util-config-tokens';
import { loadWithRetry } from '@bsc/shared/util-async-helpers';

import { gameEndpointLocation } from './constants';
import { Game } from './types';

@Injectable({ providedIn: 'root' })
export class GameStatsService {
  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  getGames() {
    return loadWithRetry(() =>
      this.http.get<Game[]>(`${this.baseUrl}${gameEndpointLocation}`)
    );
  }
}
