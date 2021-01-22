import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { LoadResultStatus } from '@bsc/shared/util-async-helpers';

import {
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess
} from '../actions/player.actions';
import { PlayerService } from '../services/player.service';
import { gamesStatsFeatureInitialized } from '../actions/game.actions';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  fetchPlayers = createEffect(() => {
    return this.actions.pipe(
      ofType(gamesStatsFeatureInitialized),
      switchMap(() => this.playersService.getPlayers()),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markPlayersRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markPlayersRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markPlayersRequestSuccess({
              players: requestUpdate.results
            });
          default:
            return markPlayersRequestFailed();
        }
      })
    );
  });

  constructor(
    private actions: Actions,
    private playersService: PlayerService
  ) {}

  ngrxOnInitEffects(): Action {
    return gamesStatsFeatureInitialized();
  }
}
