import { Inject, Injectable } from '@angular/core';

import { AuthenticationService } from '@bsc/shared/data-access-auth';

import { AuthorizationConfigToken } from './tokens';
import { AuthorizationConfig } from './types';

@Injectable({ providedIn: 'root' })
/**
 * Provides methods for determining access to features
 */
export class AuthorizationService {
  constructor(
    @Inject(AuthorizationConfigToken) private config: AuthorizationConfig,
    private authenticationService: AuthenticationService
  ) {}

  /**
   * checkRouteAccess will look at the logged in user and check to see
   * if they have access to the route as specified by the supplied name.
   *
   * In a real project this could be achieved a number of ways, mostly
   * dependent on a combination of the identity server and the business
   * needs. If the server needs to verify every request then HTTP would
   * be used and an observable would be returned.
   *
   * For this example we will assume that the user identity definition
   * contains sufficient information to validate the request.
   *
   * Note that this service does not contain any knowledge of routing structure,
   * or what to do if a request is denied. It has the responsibility for
   * simply providing the "yes" or "no" answer or passing the answer back
   * from an authorization service.
   *
   * @param route The route to determine if access should be granted
   * @returns A boolean response indicating if the user has access to the route
   */
  checkRouteAccess(route: string): boolean {
    // For now, allow all access in dev mode once the user is logged in
    if (
      this.config.dev &&
      this.authenticationService.currentUserSnapshot &&
      route
    ) {
      return true;
    }
    return false;
  }
}
