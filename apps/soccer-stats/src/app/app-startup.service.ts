import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '@bsc/shared/data-access-auth';
import { userChange } from '@bsc/soccer-stats/data-access-app-state';

@Injectable({ providedIn: 'root' })
export class AppStartupService {
  constructor(
    private authService: AuthenticationService,
    private store: Store
  ) {}

  /**
   * connect the generic auth service to the app
   * specific ngrx state solution
   */
  startup() {
    this.authService.currentUser.subscribe(user =>
      this.store.dispatch(userChange({ user }))
    );
  }
}
