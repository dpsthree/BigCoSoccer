import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeWhile } from 'rxjs/operators';

import { LoadResultStatus } from '@bsc/shared/util-async-helpers';

import {
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess,
  requestInitialPlayerList
} from '../actions/player.actions';
import { PlayerService } from '../services/player.service';

@Injectable()
export class PlayerEffects {
  fetchPlayers = createEffect(() => {
    return this.actions.pipe(
      ofType(requestInitialPlayerList),
      switchMap(() => this.playersService.getPlayers()),
      takeWhile(
        requestUpdate => requestUpdate.status !== LoadResultStatus.SUCCESS,
        true
      ),
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
}
