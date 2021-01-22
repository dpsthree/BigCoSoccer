import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { AppState, getGames } from '@bsc/soccer-stats/data-access-app-state';

import { AddGameComponent } from '../add-game/add-game.component';

@Component({
  selector: 'bsc-game-stats-page',
  templateUrl: './game-stats-page.component.html',
  styleUrls: ['./game-stats-page.component.scss']
})
export class GameStatsPageComponent {
  games = this.store.pipe(select(getGames));

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  addGame() {
    this.dialog.open(AddGameComponent);
  }
}
