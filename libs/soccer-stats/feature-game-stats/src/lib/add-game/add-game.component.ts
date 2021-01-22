import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  ackAddGameStatus,
  addGameStatusMessages,
  AppState,
  getAddGameStatus,
  initiateAddGameRequest
} from '@bsc/soccer-stats/data-access-app-state';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bsc-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnDestroy {
  addGameStatus = this.store.select(getAddGameStatus);
  locationInput = new FormControl('', Validators.required);
  dateInput = new FormControl('', Validators.required);
  nameInput = new FormControl('', Validators.required);
  addGameSub: Subscription;
  addGameStatusMessages = addGameStatusMessages;

  constructor(
    dialogRef: MatDialogRef<AddGameComponent>,
    private store: Store<AppState>
  ) {
    this.addGameSub = this.addGameStatus
      .pipe(filter(status => status === addGameStatusMessages.addGameSuccess))
      .subscribe(() => {
        this.store.dispatch(ackAddGameStatus());
        dialogRef.close();
      });
  }

  ngOnDestroy(): void {
    this.addGameSub.unsubscribe();
  }

  save() {
    this.store.dispatch(
      initiateAddGameRequest({
        name: this.nameInput.value,
        date: this.dateInput.value.format('YYYY-MM-DD'),
        location: this.locationInput.value,
        players: [] as string[]
      })
    );
  }
}
