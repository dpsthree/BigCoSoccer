import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { LoadResultStatus } from '@bsc/shared/util-async-helpers';

import { GameStatsService } from '../../game-stats.service';
import {
  gamesStatsFeatureInitialized,
  markGamesRequestFailed,
  markGamesRequestInProgress,
  markGamesRequestRetrying,
  markGamesRequestSuccess
} from '../actions/games.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class GamesEffects implements OnInitEffects {

  init = createEffect(() => {
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

  constructor(
    private actions: Actions,
    private gameStatsService: GameStatsService
  ) {}

  ngrxOnInitEffects(): Action {
    return gamesStatsFeatureInitialized();
  }
}
