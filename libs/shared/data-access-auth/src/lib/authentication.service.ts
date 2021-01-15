import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthenticationConfigToken } from './tokens';
import { AuthenticationConfig, User } from './types';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    @Inject(AuthenticationConfigToken) private config: AuthenticationConfig
  ) {}

  private _currentUser = new Subject<User | null>();
  readonly currentUser = this._currentUser.asObservable();
  currentUserSnapshot: User | null = null;

  /**
   * Sends the username and password to the previously configured authentication
   * sever. This example mocks out the mechanics of an actual authentication server
   * for the sake of demonstration, but the principles of how this is wired together
   * remain the same.
   *
   * @param username The username of the user requesting authorization.
   * @param password The password of the user requesting authorization.
   * @return returns a promise that resolves or rejects based on the result
   * of the request. This could be enhanced to provide more robust results
   * once the backing authentication interface is known.
   */
  login(username: string, password: string): Promise<void> {
    // Form AJAX request, perform third party intergration, or platform redirection here

    // Faking login and assuming that all logins succeed
    // provided that a username and password are supplied
    // and we are in dev mode.
    if (username && password && this.config.dev) {
      this.currentUserSnapshot = {
        username,
        displayName: 'Paul',
        avatarUrl: 'fakeUrl'
      };
      this._currentUser.next(this.currentUserSnapshot);

      return Promise.resolve();
    } else {
      // Assume the current user state should be flushed.
      // App authors will typically choose to redirect to login
      // If the user is no longer valide
      this.currentUserSnapshot = null;
      this._currentUser.next(this.currentUserSnapshot);
      return Promise.reject();
    }
  }

  /**
   * Clears any external state related to a user session.
   *
   * This example continues with the theme of mocking the authentication
   * provider.
   */
  logout() {
    // Unlike login, in the logout flow, the first thing that occurs is to
    // set the current user. Notice that there is no app redirection or
    // navigation. It is the responsibility of the app author to determine
    // how to respond to the fact that a user has logged out.
    this.currentUserSnapshot = null;
    this._currentUser.next(this.currentUserSnapshot);
  }
}
