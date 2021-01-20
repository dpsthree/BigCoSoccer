import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { GameStatsState } from '../types';
import { getGames } from '../state/selectors/games.selectors';
import { AddGameComponent } from '../add-game/add-game.component';

@Component({
  selector: 'bsc-game-stats-page',
  templateUrl: './game-stats-page.component.html',
  styleUrls: ['./game-stats-page.component.scss']
})
export class GameStatsPageComponent {
  games = this.store.pipe(select(getGames));

  constructor(
    private store: Store<GameStatsState>,
    private dialog: MatDialog
  ) {}

  addGame() {
    this.dialog.open(AddGameComponent);
  }
}
