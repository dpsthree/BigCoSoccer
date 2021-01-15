import { InjectionToken } from '@angular/core';
import { AuthorizationConfig } from './types';

export const AuthorizationConfigToken: InjectionToken<AuthorizationConfig> = new InjectionToken<AuthenticationConfig>(
  'AuthorizationConfig'
);
