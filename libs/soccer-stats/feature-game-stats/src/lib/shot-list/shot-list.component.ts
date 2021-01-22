import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ShotOnGoalWithNames,
  Player
} from '@bsc/soccer-stats/data-access-app-state';

import { AddShotToGameComponent } from '../add-shot-to-game/add-shot-to-game.component';
import { GameModalTransfer } from '../types';

@Component({
  selector: 'bsc-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.scss']
})
export class ShotListComponent {
  @Input() shots!: ShotOnGoalWithNames[];
  @Input() gameId!: string;
  @Input() players!: Player[];
  displayedColumns = ['player', 'assist', 'successful', 'minute'];
  constructor(private dialog: MatDialog) {}

  addShot() {
    const game: GameModalTransfer = {
      id: this.gameId,
      players: this.players
    };
    this.dialog.open(AddShotToGameComponent, { data: game }).afterClosed();
  }
}
