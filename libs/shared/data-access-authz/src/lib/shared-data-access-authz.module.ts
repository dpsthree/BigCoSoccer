import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationConfig } from './types';
import { AuthorizationConfigToken } from './tokens';

@NgModule({
  imports: [CommonModule]
})
/**
 * This library encapsulates the details of authorization (authz)
 * Authentication (auth) is handled separately.
 *
 * Specifically, it handles the details related to providing
 * authorization of route and API access. Specifically, it handles
 * requests for authorization by the application based on the current
 * user and desired route supplied to a method. For API access it
 * exposes methods that can be used from interceptors to attach
 * the user identity to a request.
 */
export class SharedDataAccessAuthzModule {
  static forRoot(
    config: AuthorizationConfig
  ): ModuleWithProviders<SharedDataAccessAuthzModule> {
    return {
      ngModule: SharedDataAccessAuthzModule,
      // Capture the provided configuration data in an Injection Token
      providers: [
        {
          provide: AuthorizationConfigToken,
          useValue: config
        }
      ]
    };
  }
}
