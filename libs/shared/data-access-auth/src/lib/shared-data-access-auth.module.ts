import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationConfig } from './types';
import { AuthenticationConfigToken } from './tokens';

@NgModule({
  imports: [CommonModule]
})
/**
 * This library encapsulates the details of the authentication (auth) handshake process.
 * Authorization (authz) is handled separately.
 *
 * It has 4 jobs:
 *  1. Provide an interface for configuring the backend auth service
 *  2. Provide app authors with a simple method for requesting a login attempt.
 *  3. Provide app authors with a simple method for requesting a logout attempt.
 *  4. Provide an observable of the current user state
 *
 * Though auth providers have very different implementations the
 * application should still view a user's session through the same abstracted representation.
 *
 * This library does not provide a UI for logging in. Any user interface should be designed
 * by the consumer of this library. The information by the user can then be supplied to this
 * library as part of the login request.
 *
 * In the case of authentication to a third party provider, it is permissable for the this
 * library to redirect to the third party accordingly. In that case, it is the responsibility
 * of the third party provider to provide the user experience for collecting the indentifying
 * details.
 *
 *
 */
export class SharedDataAccessAuthModule {
  // Allow for library consumers to provide configuration
  static forRoot(
    config: AuthenticationConfig
  ): ModuleWithProviders<SharedDataAccessAuthModule> {
    return {
      ngModule: SharedDataAccessAuthModule,
      // Capture the provided configuration data in an Injection Token
      providers: [
        {
          provide: AuthenticationConfigToken,
          useValue: config
        }
      ]
    };
  }
}
