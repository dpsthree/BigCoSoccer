import { InjectionToken } from '@angular/core';
import { AuthenticationConfig } from './types';

export const AuthenticationConfigToken: InjectionToken<AuthenticationConfig> = new InjectionToken<AuthenticationConfig>(
  'AuthenticationConfig'
);
