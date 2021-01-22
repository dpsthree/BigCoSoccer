import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  mergeMap,
  switchMap,
  take,
  takeWhile,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import {
  LoadResultStatus,
  waitForResults
} from '@bsc/shared/util-async-helpers';

import {
  initiateAddPlayerRequest,
  initiateChangePlayerNameRequest,
  initiateDeletePlayerRequest,
  markAddPlayerRequestFailed,
  markAddPlayerRequestInProgress,
  markAddPlayerRequestRetrying,
  markAddPlayerRequestSuccess,
  markChangePlayerNameComplete,
  markDeletePlayerRequestFailed,
  markDeletePlayerRequestInProgress,
  markDeletePlayerRequestRetrying,
  markDeletePlayerRequestSuccess,
  markPlayersRequestFailed,
  markPlayersRequestInProgress,
  markPlayersRequestRetrying,
  markPlayersRequestSuccess,
  requestInitialPlayerList,
  selectedPlayerDetailsChanged,
  selectedPlayerIdChanged
} from '../actions/player.actions';
import { PlayerService } from '../services/player.service';
import { combineLatest, of } from 'rxjs';
import {
  AppState,
  Game,
  Player,
  PlayerWithStats,
  ShotOnGoal,
  ShotOnGoalWithNames
} from '../state.types';
import { Store } from '@ngrx/store';
import { getGames, getPlayers } from '../selectors/shared.selectors';

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
      ofType(markAddPlayerRequestSuccess, markDeletePlayerRequestSuccess),
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

  fetchPlayerStats = createEffect(() => {
    return this.actions.pipe(
      ofType(selectedPlayerIdChanged, markChangePlayerNameComplete),
      switchMap(action => {
        console.log('fetching for', action.playerId);
        return combineLatest([
          of(action),
          this.store.select(getGames).pipe(tap(() => console.log('fired 1'))),
          this.store.select(getPlayers).pipe(tap(() => console.log('fired 2'))),
          this.playersService
            .getPlayerShots(action.playerId)
            .pipe(tap(som => console.log('heard som', som)))
            .pipe(waitForResults())
            .pipe(tap(() => console.log('fired 3'))),
          this.playersService
            .getPlayerCards(action.playerId)
            .pipe(waitForResults())
            .pipe(tap(() => console.log('fired 4'))),
          this.playersService
            .getPlayerAssists(action.playerId)
            .pipe(waitForResults())
            .pipe(tap(() => console.log('fired 5')))
        ]).pipe(take(1));
      }),
      map(([action, games, players, shots, cards, assists]) => {
        console.log('got from all sources');
        const playerDetails = formPlayer(players, action.playerId);
        const shotDetails = formShots(players, action.playerId, shots);
        const assistDetails = formShots(players, action.playerId, assists);
        const playerGames = formPlayerGames(games, action.playerId);
        return {
          ...playerDetails,
          games: playerGames,
          shotsOnGoal: shotDetails,
          cards,
          assists: assistDetails
        } as PlayerWithStats;
      }),
      map(player =>
        selectedPlayerDetailsChanged({ selectedPlayerWithStats: player })
      )
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
    );
  });

  deletePlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateDeletePlayerRequest),
      mergeMap(({ playerId }) => this.playersService.deletePlayer(playerId)),
      map(requestUpdate => {
        switch (requestUpdate.status) {
          case LoadResultStatus.IN_PROGRESS:
            return markDeletePlayerRequestInProgress();
          case LoadResultStatus.RETRYING:
            return markDeletePlayerRequestRetrying();
          case LoadResultStatus.SUCCESS:
            return markDeletePlayerRequestSuccess();
          default:
            return markDeletePlayerRequestFailed();
        }
      })
    );
  });

  changePlayerName = createEffect(() => {
    return this.actions.pipe(
      ofType(initiateChangePlayerNameRequest),
      mergeMap(({ playerId, name }) =>
        this.playersService.changePlayerName(playerId, name)
      ),
      waitForResults(),
      map(results => {
        return markChangePlayerNameComplete({ playerId: results.id });
      })
    );
  });

  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private playersService: PlayerService
  ) {}
}

function formPlayer(players: Player[], id: string): Player | undefined {
  return players.find(p => p.id === id);
}

function formShots(
  players: Player[],
  playerId: string,
  shots: ShotOnGoal[]
): ShotOnGoalWithNames[] {
  const player = formPlayer(players, playerId);
  return shots
    .map(shot => {
      const assist = formPlayer(players, shot.assist);
      return {
        ...shot,
        playerName: player?.name || '',
        assistName: assist?.name || ''
      };
    })
    .filter(shot => !!shot);
}

function formPlayerGames(games: Game[], id: string): Game[] {
  return games.filter(g => g.players.includes(id));
}
