import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { LoadResultStatus } from '@bsc/shared/util-async-helpers';
import {
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess
} from '@bsc/soccer-stats/data-access-app-state';

import { GameStatsService } from '../../game-stats.service';
import {
  initiateDeleteGameRequest,
  gamesStatsFeatureInitialized,
  markGamesRequestFailed,
  markGamesRequestInProgress,
  markGamesRequestRetrying,
  markGamesRequestSuccess,
  markDeleteGameRequestFailed,
  markDeleteGameRequestSuccess,
  markDeleteGameRequestRetrying,
  markDeleteGameRequestInProgress
} from '../actions/games.actions';
import { Action } from '@ngrx/store';
import { PlayerService } from '@bsc/soccer-stats/data-access-app-state';

@Injectable()
export class GamesEffects implements OnInitEffects {
  fetchGames = createEffect(() => {
    return this.actions.pipe(
      ofType(gamesStatsFeatureInitialized),
      switchMap(() => this.gameStatsService.getGames()),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markGamesRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markGamesRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markGamesRequestSuccess({ games: requestUpdate.results });
          default:
            return markGamesRequestFailed();
        }
      })
    );
  });

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

  deleteGame = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateDeleteGameRequest),
      mergeMap(({ gameId }) => this.gameStatsService.deleteGame(gameId)),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markDeleteGameRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markDeleteGameRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markDeleteGameRequestSuccess();
          default:
            return markDeleteGameRequestFailed();
        }
      })
    );
  });

  constructor(
    private actions: Actions,
    private gameStatsService: GameStatsService,
    private playersService: PlayerService
  ) {}

  ngrxOnInitEffects(): Action {
    return gamesStatsFeatureInitialized();
  }
}
