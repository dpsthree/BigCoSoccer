import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, pluck, tap } from 'rxjs/operators';

import {
  AppState,
  deletePlayerStatus,
  getDeletePlayerStatus,
  getSelectedPlayer,
  selectedPlayerIdChanged,
  ackDeletePlayerStatus,
  initiateDeletePlayerRequest,
  getGameBreakdownForSelectedPlayer,
  getCanDeleteSelectedPlayer,
  initiateChangePlayerNameRequest
} from '@bsc/soccer-stats/data-access-app-state';

import { selectedPlayerIdRouteParamName } from '../constants';

@Component({
  selector: 'bsc-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnDestroy {
  playerIdSub = this.ar.params
    .pipe(pluck<unknown, string>(selectedPlayerIdRouteParamName))
    .subscribe(id => {
      this.store.dispatch(selectedPlayerIdChanged({ playerId: id })),
        (this.selectedPlayerId = id);
    });

  deletePlayerStatus = deletePlayerStatus;

  displayedColumns = [
    'gameName',
    'location',
    'date',
    'goals',
    'shots',
    'shotAverage',
    'assists',
    'yellowCard',
    'redCard'
  ];

  player = this.store.pipe(select(getSelectedPlayer));
  deleting = this.store.pipe(select(getDeletePlayerStatus)).pipe(
    tap(status => {
      if (status === deletePlayerStatus.deletePlayerFinished) {
        this.router.navigate(['players']);
        this.store.dispatch(ackDeletePlayerStatus());
      }
    })
  );
  playerGameTableData = this.store.pipe(
    select(getGameBreakdownForSelectedPlayer)
  );

  canDelete = this.store.pipe(
    select(getCanDeleteSelectedPlayer),
    map(canDelete =>
      canDelete ? undefined : 'Cannot delete a player that has games'
    )
  );
  private selectedPlayerId: string | undefined;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy() {
    this.playerIdSub.unsubscribe();
  }

  updateName(newName: string) {
    if (this.selectedPlayerId) {
      this.store.dispatch(
        initiateChangePlayerNameRequest({
          playerId: this.selectedPlayerId,
          name: newName
        })
      );
    }
  }

  delete() {
    if (this.selectedPlayerId) {
      this.store.dispatch(
        initiateDeletePlayerRequest({ playerId: this.selectedPlayerId })
      );
    }
  }
}
