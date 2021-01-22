import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CardWithName, Player } from '@bsc/soccer-stats/data-access-app-state';

import { AddCardToGameComponent } from '../add-card-to-game/add-card-to-game.component';
import { GameModalTransfer } from '../types';

@Component({
  selector: 'bsc-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() cards!: CardWithName[];
  @Input() gameId!: string;
  @Input() players!: Player[];
  displayedColumns = ['player', 'color', 'minute'];
  constructor(private dialog: MatDialog) {}

  addCard() {
    const game: GameModalTransfer = {
      id: this.gameId,
      players: this.players
    };
    this.dialog.open(AddCardToGameComponent, { data: game }).afterClosed();
  }
}
