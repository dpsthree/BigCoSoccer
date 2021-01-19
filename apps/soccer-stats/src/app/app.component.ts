import { Component } from '@angular/core';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';

import {
  AppState,
  getCurrentUser
} from '@bsc/soccer-stats/data-access-app-state';
import { LogInOutService } from '@bsc/soccer-stats/data-access-log-in-out';

@Component({
  selector: 'bsc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser = this.store.pipe(select(getCurrentUser));

  constructor(
    private store: Store<AppState>,
    private logInOut: LogInOutService
  ) {}

  logout() {
    this.logInOut.logout();
  }
}
