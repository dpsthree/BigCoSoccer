import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  map,
  mergeMap,
  switchMap,
  take,
  takeWhile,
  withLatestFrom
} from 'rxjs/operators';

import {
  LoadResultStatus,
  waitForResults
} from '@bsc/shared/util-async-helpers';

import { GameService } from '../services/game.service';
import {
  initiateDeleteGameRequest,
  requestInitialGameList,
  markGamesRequestFailed,
  markGamesRequestInProgress,
  markGamesRequestRetrying,
  markGamesRequestSuccess,
  markDeleteGameRequestFailed,
  markDeleteGameRequestSuccess,
  markDeleteGameRequestRetrying,
  markDeleteGameRequestInProgress,
  selectedGameIdChanged,
  selectedGameDetailsChanged
} from '../actions/game.actions';
import { combineLatest, Observable, of } from 'rxjs';
import {
  AppState,
  Card,
  Game,
  GameWithEvents,
  Player,
  ShotOnGoal
} from '../state.types';
import { getGames } from '../selectors/game.selectors';
import { getPlayers } from '../selectors/player.selectors';

@Injectable()
export class GameEffects {
  fetchGames = createEffect(() => {
    return this.actions.pipe(
      ofType(requestInitialGameList),
      switchMap(() => this.gameService.getGames()),
      takeWhile(
        requestUpdate => requestUpdate.status !== LoadResultStatus.SUCCESS,
        true
      ),
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

  fetchGameDetails = createEffect(() => {
    return this.actions.pipe(
      ofType(selectedGameIdChanged),
      switchMap(action => {
        console.log('switching');
        return of(action).pipe(
          withLatestFrom(
            this.store.select(getGames),
            this.store.select(getPlayers)
          )
        );
      }),
      map(([action, games, players]) => ({
        game: games.find(game => action.selectedGameId === game.id),
        players
      })),
      switchMap(({ game, players }) => this.gatherGameDetails(game, players)),
      map(game => selectedGameDetailsChanged({ selectedGameWithEvents: game }))
    );
  });

  deleteGame = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateDeleteGameRequest),
      mergeMap(({ gameId }) => this.gameService.deleteGame(gameId)),
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
    private store: Store<AppState>,
    private gameService: GameService
  ) {}

  gatherGameDetails(
    game: Game | undefined,
    players: Player[]
  ): Observable<GameWithEvents | undefined> {
    if (game) {
      return combineLatest([
        this.gameService.getShotsForGame(game.id).pipe(waitForResults()),
        this.gameService.getCardsForGame(game.id).pipe(waitForResults())
      ]).pipe(
        map(([shots, cards]) =>
          buildGameWithEvents(game, players, shots, cards)
        )
      );
    } else {
      return of(undefined);
    }
  }
}

function buildGameWithEvents(
  game: Game | undefined,
  playerDetails: Player[],
  shots: ShotOnGoal[],
  cards: Card[]
): GameWithEvents {
  const shotsWithNames = shots.map(s => ({
    ...s,
    playerName: playerDetails.find(p => p.id === s.player)?.name,
    assistName: s.assist
      ? playerDetails.find(p => p.id === s.assist)?.name
      : 'None'
  }));
  const cardsWithNames = cards.map(c => ({
    ...c,
    playerName: playerDetails.find(p => p.id === c.player)?.name
  }));
  return {
    ...game,
    playerDetails,
    shots: shotsWithNames,
    cards: cardsWithNames
  } as GameWithEvents;
}
