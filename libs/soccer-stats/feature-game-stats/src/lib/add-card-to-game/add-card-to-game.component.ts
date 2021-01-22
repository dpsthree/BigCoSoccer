import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  ackAddCardStatus,
  addCardStatusMessages,
  AppState,
  cardTypes,
  getAddCardStatus,
  initiateAddCardRequest
} from '@bsc/soccer-stats/data-access-app-state';

import { cardTypesList } from '../constants';
import { GameModalTransfer } from '../types';

@Component({
  selector: 'bsc-add-card-to-game',
  templateUrl: './add-card-to-game.component.html',
  styleUrls: ['./add-card-to-game.component.scss']
})
export class AddCardToGameComponent {
  addCardStatus = this.store.select(getAddCardStatus);
  cardForm = this.fb.group({
    player: ['', Validators.required],
    cardType: [cardTypes.yellow],
    minute: [0, Validators.required]
  });
  addCardSub: Subscription;
  addCardStatusMessages = addCardStatusMessages;
  cardtypes = cardTypesList;

  constructor(
    dialogRef: MatDialogRef<AddCardToGameComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public game: GameModalTransfer
  ) {
    this.addCardSub = this.addCardStatus
      .pipe(
        filter(status => status === this.addCardStatusMessages.addCardSuccess)
      )
      .subscribe(() => {
        store.dispatch(ackAddCardStatus());
        dialogRef.close();
      });
  }

  async save() {
    this.store.dispatch(
      initiateAddCardRequest({ game: this.game.id, ...this.cardForm.value })
    );
  }
}
