import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  ackAddPlayerStatus,
  AppState,
  initiateAddPlayerRequest,
  addPlayerStatusMessages,
  getAddPlayerStatus
} from '@bsc/soccer-stats/data-access-app-state';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'bsc-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnDestroy {
  playerInput = new FormControl('', Validators.required);
  addPlayerStatus = this.store.select(getAddPlayerStatus);
  addPlayerStatusMessages = addPlayerStatusMessages;
  addPlayerSub = this.addPlayerStatus
    .pipe(
      filter(status => status === this.addPlayerStatusMessages.addPlayerSuccess)
    )
    .subscribe(() => {
      this.store.dispatch(ackAddPlayerStatus());
      this.dialogRef.close();
    });

  constructor(
    private dialogRef: MatDialogRef<AddPlayerComponent>,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.addPlayerSub.unsubscribe();
  }

  save() {
    this.store.dispatch(
      initiateAddPlayerRequest({ player: this.playerInput.value })
    );
  }
}
