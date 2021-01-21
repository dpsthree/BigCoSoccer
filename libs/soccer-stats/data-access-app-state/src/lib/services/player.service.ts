import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { loadWithRetry } from '@bsc/shared/util-async-helpers';
import { BaseUrl } from '@bsc/shared/util-config-tokens';
import { Player } from '@bsc/soccer-stats/util-shared-types';

import { playersEndpoint } from '../constants';

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
}
