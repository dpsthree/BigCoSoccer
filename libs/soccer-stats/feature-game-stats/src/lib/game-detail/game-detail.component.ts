import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { pluck, tap } from 'rxjs/operators';

import {
  initiateDeleteGameRequest,
  getDeleteGameStatus,
  getPlayersNotInGame,
  getSelectedGame,
  deleteGameStatus,
  AppState,
  selectedGameIdChanged,
  ackDeleteGameStatus
} from '@bsc/soccer-stats/data-access-app-state';

import { selectedGameIdRouteParamName } from '../constants';

@Component({
  selector: 'bsc-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnDestroy {
  gameIdSub = this.ar.params
    .pipe(pluck<unknown, string>(selectedGameIdRouteParamName))
    .subscribe(id => {
      this.store.dispatch(selectedGameIdChanged({ selectedGameId: id }));
      this.selectedGameId = id;
    });

  deleteGameStatus = deleteGameStatus;
  gameDetails = this.store.pipe(select(getSelectedGame));
  deleting = this.store.pipe(select(getDeleteGameStatus)).pipe(
    tap(status => {
      if (status === deleteGameStatus.deleteGameFinished) {
        this.router.navigate(['games']);
        this.store.dispatch(ackDeleteGameStatus());
      }
    })
  );
  playersNotInGame = this.store.pipe(select(getPlayersNotInGame));
  private selectedGameId: string | undefined;
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  delete() {
    if (this.selectedGameId) {
      this.store.dispatch(
        initiateDeleteGameRequest({ gameId: this.selectedGameId })
      );
    }
  }

  ngOnDestroy() {
    this.gameIdSub.unsubscribe();
  }
}
