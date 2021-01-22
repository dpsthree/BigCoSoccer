import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import {
  AppState,
  getPlayers,
  requestInitialGameList,
  requestInitialPlayerList
} from '@bsc/soccer-stats/data-access-app-state';

import { AddPlayerComponent } from '../add-player/add-player.component';

@Component({
  selector: 'bsc-player-stats-page',
  templateUrl: './player-stats-page.component.html',
  styleUrls: ['./player-stats-page.component.scss']
})
export class PlayerStatsPageComponent {
  players = this.store.select(getPlayers);

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    store.dispatch(requestInitialGameList());
    store.dispatch(requestInitialPlayerList());
  }

  addPlayer() {
    this.dialog.open(AddPlayerComponent);
  }
}
