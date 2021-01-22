import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  ackAddPlayerToGameStatus,
  addPlayerToGameStatusMessages,
  AppState,
  getAddPlayerToGameStatus,
  initiateAddPlayerToGameRequest
} from '@bsc/soccer-stats/data-access-app-state';

import { GameModalTransfer } from '../types';

@Component({
  selector: 'bsc-add-player-to-game',
  templateUrl: './add-player-to-game.component.html',
  styleUrls: ['./add-player-to-game.component.scss']
})
export class AddPlayerToGameComponent {
  playerOptions = this.game.players;
  addPlayerStatus = this.store.select(getAddPlayerToGameStatus);
  chosenPlayer = new FormControl('', Validators.required);
  addPlayerSub: Subscription;
  addPlayerToGameStatusMessages = addPlayerToGameStatusMessages;

  constructor(
    dialogRef: MatDialogRef<AddPlayerToGameComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public game: GameModalTransfer
  ) {
    this.addPlayerSub = this.addPlayerStatus
      .pipe(
        filter(
          status =>
            status === addPlayerToGameStatusMessages.addPlayerToGameSuccess
        )
      )
      .subscribe(() => {
        this.store.dispatch(ackAddPlayerToGameStatus());
        dialogRef.close();
      });
  }

  async save() {
    this.store.dispatch(
      initiateAddPlayerToGameRequest({
        game: this.game.id,
        player: this.chosenPlayer.value
      })
    );
  }
}
