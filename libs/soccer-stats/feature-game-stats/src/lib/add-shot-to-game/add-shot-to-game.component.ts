import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  ackAddShotStatus,
  AppState,
  initiateAddShotRequest,
  getAddShotStatus,
  addShotStatusMessages
} from '@bsc/soccer-stats/data-access-app-state';

import { GameModalTransfer } from '../types';

function CantAssistYourselfValidator(group: FormGroup) {
  const player = group.get('player');
  const assist = group.get('assist');
  if (player && assist && player.value === assist.value) {
    return {
      cantAssistYourself: true
    };
  }
  return null;
}

@Component({
  selector: 'bsc-add-shot-to-game',
  templateUrl: './add-shot-to-game.component.html',
  styleUrls: ['./add-shot-to-game.component.scss']
})
export class AddShotToGameComponent {
  addShotStatus = this.store.select(getAddShotStatus);
  shotForm = this.fb.group(
    {
      player: ['', Validators.required],
      assist: [''],
      scored: [true, Validators.required],
      minute: [0, Validators.required]
    },
    {
      validators: [CantAssistYourselfValidator]
    }
  );
  addShotSub: Subscription;
  addShotStatusMessages = addShotStatusMessages;

  constructor(
    dialogRef: MatDialogRef<AddShotToGameComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public game: GameModalTransfer
  ) {
    this.addShotSub = this.addShotStatus
      .pipe(
        filter(status => status === this.addShotStatusMessages.addShotSuccess)
      )
      .subscribe(() => {
        store.dispatch(ackAddShotStatus());
        dialogRef.close();
      });
  }

  save() {
    this.store.dispatch(
      initiateAddShotRequest({
        game: this.game.id,
        ...this.shotForm.value
      })
    );
  }
}
