import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
  selectedGameDetailsChanged,
  initiateAddGameRequest,
  markAddGameRequestFailed,
  markAddGameRequestInProgress,
  markAddGameRequestRetrying,
  markAddGameRequestSuccess,
  initiateAddPlayerToGameRequest,
  markAddPlayerToGameRequestFailed,
  markAddPlayerToGameRequestInProgress,
  markAddPlayerToGameRequestRetrying,
  markAddPlayerToGameRequestSuccess,
  initiateAddShotRequest,
  markAddShotRequestInProgress,
  markAddShotRequestRetrying,
  markAddShotRequestSuccess,
  markAddShotRequestFailed,
  markAddCardRequestInProgress,
  markAddCardRequestRetrying,
  markAddCardRequestSuccess,
  markAddCardRequestFailed,
  initiateAddCardRequest
} from '../actions/game.actions';
import { combineLatest, NEVER, Observable, of } from 'rxjs';
import {
  AppState,
  Card,
  Game,
  GameWithEvents,
  Player,
  ShotOnGoal
} from '../state.types';
import { getGames, getSelectedGame } from '../selectors/game.selectors';
import { getPlayers } from '../selectors/player.selectors';

@Injectable()
export class GameEffects {
  fetchInitialGames = createEffect(() => {
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

  fetchGames = createEffect(() => {
    return this.actions.pipe(
      ofType(markDeleteGameRequestSuccess, markAddGameRequestSuccess, markAddPlayerToGameRequestSuccess ),
      switchMap(() => this.gameService.getGames()),
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
      switchMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(getGames),
            this.store.select(getPlayers)
          )
        )
      ),
      map(([action, games, allPlayers]) => {
        const game = games.find(game => action.selectedGameId === game.id);
        let players: Player[] = [];
        if (game) {
          players = allPlayers.filter(player =>
            game.players.find(gamePlayer => gamePlayer === player.id)
          );
        }

        return {
          game,
          players
        };
      }),
      switchMap(({ game, players }) => this.gatherGameDetails(game, players)),
      map(game => selectedGameDetailsChanged({ selectedGameWithEvents: game }))
    );
  });

  refreshGameDetails = createEffect(() => {
    return this.actions.pipe(
      ofType(
        markAddPlayerToGameRequestSuccess,
        markAddShotRequestSuccess,
        markAddCardRequestSuccess
      ),
      switchMap(() => this.store.select(getSelectedGame).pipe(take(1))),
      switchMap(game => {
        if (game) {
          return this.gameService.getGame(game.id).pipe(waitForResults());
        } else {
          return NEVER;
        }
      }),
      switchMap(game =>
        of(game).pipe(withLatestFrom(this.store.select(getPlayers)))
      ),
      map(([game, players]) => {
        if (game) {
          players = players.filter(player =>
            game.players.find(gamePlayer => gamePlayer === player.id)
          );
        }

        return {
          game,
          players
        };
      }),
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

  addGame = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateAddGameRequest),
      mergeMap(game => this.gameService.addGame(game)),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markAddGameRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markAddGameRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markAddGameRequestSuccess();
          default:
            return markAddGameRequestFailed();
        }
      })
    );
  });

  addPlayerToGame = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateAddPlayerToGameRequest),
      switchMap(action =>
        of(action).pipe(withLatestFrom(this.store.select(getSelectedGame)))
      ),
      map(([action, game]) => {
        if (!game) {
          throw new Error('Invalid State, game not found');
        }
        const simplifiedGame: Game = {
          date: game.date,
          id: game.id,
          name: game.name,
          location: game.location,
          players: game.players
        };
        return {
          game: simplifiedGame,
          player: action.player
        };
      }),
      mergeMap(({ game, player }) =>
        this.gameService.addPlayerToGame(game, player)
      ),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markAddPlayerToGameRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markAddPlayerToGameRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markAddPlayerToGameRequestSuccess();
          default:
            return markAddPlayerToGameRequestFailed();
        }
      })
    );
  });

  addShot = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateAddShotRequest),
      mergeMap(shot => this.gameService.addShot(shot)),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markAddShotRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markAddShotRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markAddShotRequestSuccess();
          default:
            return markAddShotRequestFailed();
        }
      })
    );
  });

  addCard = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateAddCardRequest),
      mergeMap(card => this.gameService.addCard(card)),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markAddCardRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markAddCardRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markAddCardRequestSuccess();
          default:
            return markAddCardRequestFailed();
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
    playerDetails: [...playerDetails],
    shots: shotsWithNames,
    cards: cardsWithNames
  } as GameWithEvents;
}
