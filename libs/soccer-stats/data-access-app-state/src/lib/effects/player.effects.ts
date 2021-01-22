import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, takeWhile } from 'rxjs/operators';

import { LoadResultStatus } from '@bsc/shared/util-async-helpers';

import {
  initiateAddPlayerRequest,
  markAddPlayerRequestFailed,
  markAddPlayerRequestInProgress,
  markAddPlayerRequestRetrying,
  markAddPlayerRequestSuccess,
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess,
  requestInitialPlayerList
} from '../actions/player.actions';
import { PlayerService } from '../services/player.service';

@Injectable()
export class PlayerEffects {
  fetchInitialPlayers = createEffect(() => {
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

  fetchPlayers = createEffect(() => {
    return this.actions.pipe(
      ofType(markAddPlayerRequestSuccess),
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

  addPlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateAddPlayerRequest),
      mergeMap(action => this.playersService.addPlayer(action.player)),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markAddPlayerRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markAddPlayerRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markAddPlayerRequestSuccess();
          default:
            return markAddPlayerRequestFailed();
        }
      })
    )
  })

  constructor(
    private actions: Actions,
    private playersService: PlayerService
  ) {}
}
